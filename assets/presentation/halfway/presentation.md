# Project Mast #

![](./ship.jpg "Ship Mast") 
![](./cell.jpg "Mast Cells")

---

## Aims and Objectives ##

---

### What's the goal? ###

To create an app that will provide up to date information on every single allergen in the WHO database (~1000 allergens)

---

### What's the Plan of Attack? ###

1. Extract the WHO database
2. Create a local Database
3. Augment it with outside information
4. Represent it in an Android App!

---

## Progress to Date ##

---

### Infiltrating the WHO ###

* Actually quite difficult
* No easy download button
* Too big to download by hand (a.k.a. I'm too lazy)

---

### Weaponized Laziness ###

![](./trick.png "Tricked Rock")

---

### Attempt 1 ###

* allergen.org uses its url to store search parameters

---

* Can we make allergen.org do all the heavy lifting for us?

```
http://www.allergen.org/search.php?allergensource=peanut
```

![](./peanutsearch.png "Peanut Search")

---

### No ###
1. Technical Difficulties
2. Too Slow

---

### Attempt 2 ###

* Each allergen is stored under its own unique number, or aid (Allergen ID)

![](./id.png "Allergen ID")

* Just go through and grab each allergen!

---

```cpp
  string baseURL = "http://www.allergen.org/viewallergen.php?aid=";
  for(int i = 1; i < 902; i++) {
    ostringstream ossURL, ossFILE;
    ossURL << baseURL << i;
	string queryURL = ossURL.str();
    ossFILE << "allergen" << i << ".html";
    string fileName = ossFILE.str();

    string command = "phantomjs save_page.js " + queryURL \
	+ " > " + fileName;
    std::system(command.c_str());
  }
```

---

### What Web Pages *Really* Look Like ###

![](./id.png "Allergen ID") 

--- 

![](./actual.png "Allergen ID")

---

### Parsed ###

![](./parsed.png "Parsed")

---

### Parsing Part 2! ###

* Now that it's readable...
* ...have to parse it again into a table

---

### The Fight Gets Dirty ###

* The WHO doesn't go down without a fight
* Use commas...
* Use quotation marks...
* Omit entire sections...
* Rearrange sections...
* Randomly don't use ranges of numbers...

---

### Victory at last! ###

![](./database.png "Database")

---

## Plans for Completion ##

---

* Making good progress - should complete application on time
* About halfway done!

---
