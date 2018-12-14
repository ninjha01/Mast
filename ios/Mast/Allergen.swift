//
//  Allergen.swift
//  Mast
//
//  Created by Nishant Jha on 10/15/17.
//  Copyright © 2017 Nishant Jha. All rights reserved.

import Foundation

class Allergen {
    
    var name: String = ""
    var source: String = ""
    var order: String = ""
    var species: String = ""
    var bName: String = ""
    var mw: String = ""
    var aIcity: String = ""
    var aRef: String = ""
    var food: String = ""
    var PDBid: String = ""
    var sold : Bool = false
    var category: String = "None"
    
    public var description: String {
        return self.name + ", " + self.PDBid
    }
    
    init(name: String, source: String, order: String, species: String,
         bName: String, mw: String, aIcity: String, aRef: String,
         food: String, PDBid: String, sold: Bool, category: String) {
        
        self.name = name;
        self.source = source;
        self.order = order;
        self.species = species;
        self.bName = bName;
        self.mw = mw;
        self.aIcity = aIcity;
        self.aRef = aRef;
        self.food = food;
        self.PDBid = PDBid;
        self.sold = sold;
        if(category.contains("None")) {
            self.category = "Other,"
        }
        else {
            self.category = category
        }
    }
    
    init() {
        self.name = "Nishant";
        self.source = "Jha";
        self.order = "Mage";
        self.species = "Human";
        self.bName = "Homo Sapiens";
        self.mw = "300 kDa";
        self.aIcity = "Yup!";
        self.aRef = "www.zombo.com";
        self.food = "Yes";
        self.PDBid = "HELP"
        self.sold = true;
        self.category = "None"
    }
}

