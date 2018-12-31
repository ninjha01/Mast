## The App for Allergens ##

 N. Jha, S. Agah, M.D. Chapman
 
Department of Computer Science, University of Virginia, Charlottesville, VA 22903, USA  
INDOOR Biotechnologies, Inc., Charlottesville, VA 22903, USA

**Rationale:** Many existing web technologies have made the jump to mobile devices. Scientific resources, however, have been slow to follow. Current allergen databases are a powerful source of bioinformatics knowledge, but their utility is diminished by a lack of accessibility. Most productive science occurs at the lab bench, away from desktop computers but accessible to mobile devices. Our aim was to develop an Android application that could provide up to date information about allergens and be immediately accessible.

**Methods:** A C++ program was written to download HTML content from [Allergen.org][allergens]. These HTML files were processed through the command-line tools `grep` and `sed`, as well as through a Python program. The entries were then validated and parsed into a SQLite database. Finally, a user interface was written in XML format with underlying logic written in Java. The source code is made freely available [on github.com][github]. 

**Results:** An Android application that will automatically update as new information is added to the WHO/ISIS allergen nomenclature database was successfully developed. This was made possible by constructing a web scraper that would periodically create a local, searchable database using the technologies outlined above. The app replicates functionality present in the WHO/IUIS website; allergens can be searched by name, taxonomy, source, or biochemical name. All information contained in the online database is stored in the application locally, so users are not required to maintain an internet connection - functionality that will never be present in the webpage-based implementation. 

**Conclusions:** With the rise of mobile computing, scientists should expect their tools to accompany them wherever they go, whether it be the desk or the bench. The App for Allergens updates and improves a valuable bioinformatics resource, the WHO/IUIS allergen database, for allergy/immunology research. In addition, it provides an upgradeable, extendible platform that can quickly absorb changes in the database, as well as provide new features (e.g. 3D structures and offline access) and research capabilities.

[allergens]: http://www.allergen.org 
[github]: http://www.github.com/ninjha01/Mast 
