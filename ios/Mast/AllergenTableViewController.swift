//
//  AllergenTableViewController.swift
//  Mast
//
//  Created by Nishant Jha on 10/15/17.
//  Copyright © 2017 Nishant Jha. All rights reserved.
//

import UIKit

class AllergenTableViewController: UITableViewController {

    
    @IBOutlet weak var notFound: UITextView!
    var allergens = [Allergen]()
    let mHelper = DatabaseHelper()
    var allergenToPass: Allergen!
    var query: String!
    
    let delimiters = ["Name", "Source", "Order",
        "Species", "BiochemicalName", "MW(SDS-PAGE)",
        "Allergenicity", "Allergenicityref.:",
        "FoodAllergen", "PDBID", "Sold", "Tag", "Category"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.initBackButtion()
        self.populateTable()
    }
    
    func populateTable() {
        let queryFields = getQueryFields(query: query)
        let sqlQuery = mHelper.buildAllergenQuery(query: self.query, fields: queryFields)
        allergens = parseResponse(response: mHelper.runQueryGetAllergens(queryString: sqlQuery))
        
        if queryFields == ["Category"] {
            let sorted = allergens.sorted {$0.name.localizedStandardCompare($1.name) == .orderedAscending}
            allergens = sorted
        }
        if(allergens.count > 0) {
            notFound.text = "Search Query: " + query
            notFound.isHidden = false
        }
        tableView.rowHeight = UITableView.automaticDimension
        tableView.estimatedRowHeight = 140
    }
    
    func getQueryFields(query: String) -> [String] {
        let cleanedQuery = query.lowercased()
        //TODO: Allergen name
        //let namePatternString = "...{1,4} .{1,2} [0-9]{1,2}";
        //Tag
        let tags = ["recombinant", "natural", "lotox", "biotin"]
        if tags.contains(cleanedQuery){
            return ["Tag"]
        }
        
        //Category
        let categories = ["animal", "cockroach", "dust mite",
                    "food", "mold", "pollen", "venom", "other", "latex"]
        if categories.contains(cleanedQuery) {
            return ["Category"]
        }
        //Else
        return delimiters;
    }
    
    
    func initBackButtion() {
        let backItem = UIBarButtonItem()
        backItem.title = "Back"
        backItem.tintColor = UIColor.white
        self.navigationItem.backBarButtonItem = backItem
    }

    public func parseResponse(response: [[String]]) -> [Allergen]{
        
        var parsedAllergens = [Allergen]()
        if(response.count > 0) {
            for i in 0...(response.count - 1) {
                parsedAllergens.append(Allergen(name: response[i][0], source: response[i][1],
                                                order: response[i][2], species: response[i][3],
                                                bName: response[i][4], mw: response[i][5],
                                                aIcity: response[i][6], aRef: response[i][7],
                                                food: response[i][8], PDBid: response[i][9],
                                                sold: (response[i][10] == "Yes"), category: response[i][11]))
            }
        } else {
            
            notFound.isHidden = false
        }
        return parsedAllergens
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return allergens.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cellIdentifier = "AllergenTableViewCell"

        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? AllergenTableViewCell  else {
            fatalError("The dequeued cell is not an instance of MealTableViewCell.")
        }
        
        let allergen = allergens[indexPath.row]
        // Configure the cell...
        cell.nameLabel.text = allergen.name
        cell.allergen = allergen
        let filename = "n" + allergen.PDBid
        if (Bundle.main.path(forResource: filename, ofType: "scn") != nil) {
            cell.nameLabel.textColor = UIColor.red
        } else {
            cell.nameLabel.textColor = UIColor.black
        }
        return cell
    }
   
    // MARK: - Navigation

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {

        // Get Cell Label
        let indexPath = tableView.indexPathForSelectedRow!
        let currentCell = tableView.cellForRow(at: indexPath)! as! AllergenTableViewCell

        self.allergenToPass = currentCell.allergen
        performSegue(withIdentifier: "cellToInfo", sender: self)
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {

            let destinationVC = segue.destination as! SearchViewController
            destinationVC.allergen = self.allergenToPass
     }
    
    //Reset Navbar on exit
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        self.navigationController?.navigationBar.setBackgroundImage(nil, for: UIBarMetrics.default)
        self.navigationController?.navigationBar.shadowImage = nil
    }
}
