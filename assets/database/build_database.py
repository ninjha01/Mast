import csv
import html2text
import os
import pandas
from progress.bar import Bar
import re
import sqlite3
import subprocess

def main():
    num_allergens = 1500
    delimiters = ["Name", "Source", "Order",
                  "Species", "BiochemicalName", "MW(SDS-PAGE)",
                  "Allergenicity", "Allergenicityref.:",
                  "FoodAllergen", "PDBID", "Sold", "Tag", "Category"]

    #Rebuild Database
    #Todo: rebuild if num_allergens > num html files
    if not os.path.exists("./html"):
        os.makedirs("./html")
        download_webpages(num_allergens)
    
    webpage_queue = load_webpages()

    #Parse and Store Entries
    bar = Bar('Parsing    ', max=num_allergens)
    webpage_queue = load_webpages()
    entries = ""
    for webpage in webpage_queue:
        entries += process_html(webpage)
        bar.next()
    bar.finish()

    #Write to csv and database
    print("Writing to database...")
    backup_to_csv(entries, delimiters)
    write_to_database(entries, delimiters)
    print("Done!")

########################################################################
# I/O
########################################################################
##TODO: Use multiprocessing or Pool to speed up downloads
def download_webpages(num):
    base_url = "http://www.allergen.org/viewallergen.php?aid="
    base_name = "html/allergen"
    base_command = ["wget", "-q", "-O"]
    bar = Bar('Downloading', max=num)
    for i in range(1, num + 1):
        url = base_url + str(i)
        filename = base_name + str(i) + ".html"
        command = base_command + [filename, url]
        subprocess.run(command, stdout=subprocess.PIPE).stdout.decode('utf-8').splitlines()
        bar.next()
    bar.finish()
    return True  
    
def load_webpages():
    queue = []
    html_dir = "./html/"
    files =  os.listdir(html_dir)
    files.sort()
    for file in files:
        if file.endswith(".html"):
            filename = html_dir + file
            file = open(filename, "r")
            text = file.read()
            queue.append(text.splitlines())
    return queue
    
def backup_to_csv(entries, delimiters):
    csv = open("database.csv", "w+")
    header = ",".join(delimiters)
    csv.write(header + "\n")
    csv.write(entries)
    csv.close()

##TODO: eliminate need to bootstrap Allergen Table
## Currently assumes Allergens.db contains a table named Allergens
def write_to_database(entries, delimiters):
    db_filename = "Allergens.db"
    conn = sqlite3.connect(db_filename)
    import_table(conn, delimiters)
    write_version(conn)
    replace_nulls(conn, delimiters)
    conn.close()

def import_table(conn, delimiters):
    df = pandas.read_csv("./database.csv", index_col=False, dtype=str)
    df.to_sql("Allergens", conn, if_exists='replace', index=False, dtype="TEXT")

def write_version(conn):
    cursor = conn.cursor()
    version = cursor.execute("PRAGMA user_version").fetchone()[0]
    cursor.execute("PRAGMA user_version = %d" % (version + 1))
    conn.commit()
    
def replace_nulls(conn, delimiters):
    cursor = conn.cursor()
    replace_null_statement = 'UPDATE `Allergens` SET '
    for column in delimiters[0:-1]:
        replace_null_statement += '`' + column + '`= '
        replace_null_statement += 'IfNull(' + '`' + column + '`' + ',\'None\'), '
    replace_null_statement += '`' + delimiters[-1] + '`= '
    replace_null_statement += 'IfNull(' + '`' + delimiters[-1] + '`' + ',\'None\')'
    cursor.execute(replace_null_statement)
    conn.commit()
      
########################################################################
# Entry Construction
########################################################################
def process_html(html):
    trimmed = trim(html)
    text = html2text.html2text(trimmed)
    validated = validate(text)
    cleaned = clean(validated)
    entry =  build_entry(cleaned)
    return entry

def trim(html):
    start = 'Allergen name:'
    stop = '<div class="footer" id="footer">'
    active = False
    middle = ""
    for line in html:
        if start in line:
            active = True
        if stop in line:
            break
        if active:
            middle += line
    return middle

def clean(text):
    detritus = ['![](images/closed.gif)', '\- ', '[', ']', 'Lineage:']
    for detrite in detritus:
        text = text.replace(detrite, '')
    text = text.replace("pubmen", "pubmed")
    text = text.replace('"', '""')
    text = text.replace(',', "")
    text = text.replace('\n', ' ')
    
    text = re.sub("\(search.*?\) ", '', text)
    text = re.sub("\(http:.*?\)", '', text)
    return text

def validate(text):
    delimiters = ["Allergen name:", "Source:", "Order:",
                  "Species:", "Biochemical name:", "MW(SDS-PAGE):",
                  "Allergenicity:", "Allergenicity ref.:", "Food allergen:"]
    delimiters = delimiters[::-1]
    end = len(delimiters) - 1
    for i in range(end):
        next_pos = text.find(delimiters[i+1])
        if next_pos is -1:
            text = text.replace(delimiters[i], delimiters[i+1] + delimiters[i])
    return text

def build_entry(text):
    #IUIS data
    entry = build_IUIS_segment(text)
    name = entry.split('"')[1::2][0] #Splits in between quotes
    if(len(name) < 2):
        return ""
    #PDB ID
    entry += build_pdb_segment(name)
    # Inbio data
    ## Sold?
    entry += build_sold_segment(name)
    ## Tag?
    entry += build_tag_segment(name)
    ## Category?
    entry += build_category_segment(name)
    entry += "\n"
    return entry

def build_IUIS_segment(text):
    # Allergen.org data
    delimiters = ["Allergen name:", "Source:", "Order:",
                  "Species:", "Biochemical name:", "MW(SDS-PAGE):",
                  "Allergenicity:", "Allergenicity ref.:", "Food allergen:", "Date Created"]
    end = len(delimiters) - 1
    IUIS_segment = ""
    for i in range(end):
        start_pos = text.find(delimiters[i]) + len(delimiters[i]) + 1
        end_pos = text.find(delimiters[i+1])
        line = '"' + text[start_pos:end_pos].strip() + '",'
        IUIS_segment += line.strip()
    return IUIS_segment

##TODO: generalize segment building
def build_pdb_segment(name):
    pdbs = open("pdbs.csv", "r")
    found = False
    pdb_segment = '"'
    for line in pdbs:
        line = line.split(",")
        if name in line[0]:
            found = True
            pdb_id = line[1]
            break
    if found:
        pdb_segment += pdb_id.strip() + '",'
    else:
        pdb_segment += "None" + '",'
    return pdb_segment

def build_sold_segment(name):
    sold = open("sold.txt", "r").read()
    sold_segment = ""
    if name in sold:
        sold_segment += '"Yes","'
    else:
        sold_segment += '"No","'
    return sold_segment

def build_tag_segment(name):
    tags = ["Biotin", "Natural", "Recombinant", "LoToX"]
    tag_segment = ""
    for tag in tags:
        file = open("tags/" + tag + ".txt", "r")
        if name in file.read():
            tag_segment += tag + '\,'
    tag_segment += '",'
    return tag_segment

def build_category_segment(name):
    categories = open("categories.csv", "r")
    found = False
    category_segment = '"'
    prefix = " ".join(name.split(" ")[0:2])
    for line in categories:
        line = line.split(",")
        if prefix in line[0]:
            found = True
            category = line[1]
            break
    if found:
        category_segment += category.strip() + '",'
    else:
        category_segment += "Other" + '",'
    return category_segment

if __name__=="__main__":
   main()
