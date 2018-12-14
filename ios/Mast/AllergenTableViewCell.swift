//
//  AllergenTableViewCell.swift
//  Mast
//
//  Created by Nishant Jha on 10/15/17.
//  Copyright © 2017 Nishant Jha. All rights reserved.
//

import UIKit

class AllergenTableViewCell: UITableViewCell {

    //MARK: Properties
    @IBOutlet weak var nameLabel: UILabel!
    
    var myURL: String = ""
    var allergen: Allergen!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
     }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }
}
