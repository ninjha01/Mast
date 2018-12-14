//
//  MainViewController.swift
//  Mast
//
//  Created by Nishant Jha on 9/26/17.
//  Copyright © 2017 Nishant Jha. All rights reserved.
//

import UIKit

class MainViewController:  UIViewController, UISearchBarDelegate {

    @IBOutlet weak var mySearchBar: UISearchBar!
    
    @IBOutlet weak var animalButton: UIButton!
    @IBOutlet weak var cockroachButton: UIButton!
    @IBOutlet weak var dustButton: UIButton!
    @IBOutlet weak var foodButton: UIButton!
    @IBOutlet weak var moldButton: UIButton!
    @IBOutlet weak var pollenButton: UIButton!
    @IBOutlet weak var venomButton: UIButton!
    @IBOutlet weak var otherButton: UIButton!
    @IBOutlet weak var latexButton: UIButton!
    
    @IBOutlet weak var animalButtonLabel: UILabel!
    @IBOutlet weak var cockroachButtonLabel: UILabel!
    @IBOutlet weak var dustButtonLabel: UILabel!
    @IBOutlet weak var foodButtonLabel: UILabel!
    @IBOutlet weak var moldButtonLabel: UILabel!
    @IBOutlet weak var pollenButtonLabel: UILabel!
    @IBOutlet weak var venomButtonLabel: UILabel!
    @IBOutlet weak var otherButtonLabel: UILabel!
    @IBOutlet weak var latexButtonLabel: UILabel!
    
    var myButtons: [UIButton] = []
    var myButtonLabels: [UILabel] = []
    var buttonQueryMap: [UIButton : String] = [:]
    var allergens: [Allergen]!
    var filteredAllergens: [Allergen]!
    var query: String!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.title = "Allergen Guru"
        DispatchQueue.main.async() {
            self.initNavBar()
            self.prepButtons()
            self.prepForQueries()
        }
        definesPresentationContext = true
        prepKeyboard()
    }
    
    func prepButtons() {
        myButtons = [self.animalButton, self.cockroachButton, self.dustButton,
                     self.foodButton, self.moldButton, self.pollenButton,
                     self.venomButton, self.otherButton, self.latexButton]
        
        self.animalButton.contentMode = UIView.ContentMode.scaleAspectFit
        let myQueries = ["Animal", "Cockroach", "Dust Mite", "Food", "Mold", "Pollen", "Venom", "Other", "Latex"]
        var i = 0
        for button in myButtons {
            buttonQueryMap[button] = myQueries[i]
            i += 1
            button.addTarget(self, action: #selector(buttonAction), for: .touchUpInside)
        }
        resizeButtonLabels()
    }
    
    func resizeButtonLabels() {
        myButtonLabels = [self.animalButtonLabel, self.cockroachButtonLabel, self.dustButtonLabel,
                         self.foodButtonLabel, self.moldButtonLabel, self.pollenButtonLabel,
                         self.venomButtonLabel, self.otherButtonLabel, self.latexButtonLabel]
        var minSize = getFontSizeForLabel(myButtonLabels[0])
        var currentFontSize: CGFloat
        for buttonLabel in myButtonLabels {
            currentFontSize = getFontSizeForLabel(buttonLabel)
            if minSize > currentFontSize {
                minSize = currentFontSize
            }
        }
        
        for buttonLabel in myButtonLabels {
            buttonLabel.adjustsFontSizeToFitWidth = false;
            buttonLabel.font = buttonLabel.font.withSize(minSize)
        }
    }
    
    func getFontSizeForLabel(_ label: UILabel) -> CGFloat {
        let text: NSMutableAttributedString = NSMutableAttributedString(attributedString: label.attributedText!)
        text.setAttributes([kCTFontAttributeName as NSAttributedString.Key: label.font], range: NSMakeRange(0, text.length))
        let context: NSStringDrawingContext = NSStringDrawingContext()
        context.minimumScaleFactor = label.minimumScaleFactor
        text.boundingRect(with: label.frame.size, options: NSStringDrawingOptions.usesLineFragmentOrigin, context: context)
        let adjustedFontSize: CGFloat = label.font.pointSize * context.actualScaleFactor
        return adjustedFontSize
    }
    
    //Action
    @objc func buttonAction(sender: UIButton!) {
        self.query = buttonQueryMap[sender]
        performSegue(withIdentifier: "searchToTable", sender: self)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func prepForQueries() {
        let mHelper = DatabaseHelper()
        let query = mHelper.buildAllergenQuery(query: "", fields: [""])
        let a = AllergenTableViewController()
        allergens = a.parseResponse(response: mHelper.runQueryGetAllergens(queryString: query))
    }
    
    func initNavBar() {
        
        navigationController?.navigationBar.barTintColor = UIColor.init(red: 20.0/255.0, green: 181/255.0, blue: 191/255.0, alpha: 1)
        navigationController?.navigationBar.titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.white]
        
        let backItem = UIBarButtonItem()
        backItem.title = "Back"
        backItem.tintColor = UIColor.white
        self.navigationItem.backBarButtonItem = backItem
        
        mySearchBar.delegate = self
    }
    
    func searchBarSearchButtonClicked(_ mySearchBar: UISearchBar)  {
        
        self.query = mySearchBar.text;
        performSegue(withIdentifier: "searchToTable", sender: self)
    }

    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        let destinationVC = segue.destination as! AllergenTableViewController
        destinationVC.query = self.query
    }
    
    func prepKeyboard() {
        let tap = UITapGestureRecognizer(target: self.view, action: #selector(UIView.endEditing(_:)))
        tap.cancelsTouchesInView = false
        self.view.addGestureRecognizer(tap)
    }
}

import Foundation
import ObjectiveC

extension UIImageView
{
    struct Static {
        static var searchTerm = "Other"
    }
    var myInfo:AnyObject? {
        get {
            return objc_getAssociatedObject( self, &Static.searchTerm ) as AnyObject?
        }
        set {
            objc_setAssociatedObject( self, &Static.searchTerm,  newValue, .OBJC_ASSOCIATION_RETAIN)
        }
    }
}

