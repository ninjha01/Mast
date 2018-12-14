//
//  SearchViewController.swift
//  Mast
//
//  Created by Nishant Jha on 10/16/17.
//  Copyright © 2017 Nishant Jha. All rights reserved.
//

import UIKit
import WebKit
import AVKit
import AVFoundation
import MessageUI
import ARKit

class SearchViewController: UIViewController, MFMailComposeViewControllerDelegate {

    public var allergen: Allergen!
    
    @IBOutlet weak var videoViewContainer: UIView!
    @IBOutlet weak var buyButton: UIButton!
    @IBOutlet weak var arButton: UIButton!
    
    @IBOutlet weak var resultScrollView: UIScrollView!
    @IBOutlet weak var nameTextView: UITextView!
    @IBOutlet weak var sourceTextView: UITextView!
    @IBOutlet weak var orderTextView: UITextView!
    @IBOutlet weak var speciesTextView: UITextView!
    @IBOutlet weak var bNameTextView: UITextView!
    @IBOutlet weak var mwTextView: UITextView!
    @IBOutlet weak var aIcityTextView: UITextView!
    @IBOutlet weak var aRefTextView: UITextView!
    @IBOutlet weak var foodTextView: UITextView!
    
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var sourceLabel: UILabel!
    @IBOutlet weak var orderLabel: UILabel!
    @IBOutlet weak var speciesLabel: UILabel!
    @IBOutlet weak var bNameLabel: UILabel!
    @IBOutlet weak var mwLabel: UILabel!
    @IBOutlet weak var aIcityLabel: UILabel!
    @IBOutlet weak var aRefLabel: UILabel!
    @IBOutlet weak var foodLabel: UILabel!

    
    private var player: AVQueuePlayer?
    private var looper: AVPlayerLooper?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        DispatchQueue.main.async() { //UI Thread
            self.initTextViews()
            self.initBuyButton()
            self.initARButton()
            self.styleByCategory(category: self.allergen.category)
            self.videoViewContainer.isHidden = false
            self.playVideo()
        }
    }
    
    func styleByCategory(category: String) {
        let cleanedCategory = category.lowercased().replacingOccurrences(of: " ", with: "_").replacingOccurrences(of: ",", with: "")
        styleLabels(category: cleanedCategory)
        styleNavBar(category: cleanedCategory)
    }
    
    func styleNavBar(category: String) {
        let imageName = "navbar_" + category + ".png"
        self.navigationController!.navigationBar.setBackgroundImage(UIImage(named: imageName), for: .default)
        return
    }

    func styleLabels(category: String) {
        
        let imageName = "long_label_" + category + ".png"
        let labelImage = UIImage(named: imageName)
        var resizedLabelImage: UIImage
        
        let labels = [nameLabel, sourceLabel, orderLabel, speciesLabel, bNameLabel, mwLabel, aIcityLabel, aRefLabel, foodLabel]
        
        for label in labels {
            label!.sizeToFit()
            resizedLabelImage = resizeToFit(image: labelImage!, label: label!)
            label!.backgroundColor = UIColor(patternImage: resizedLabelImage)
        }
        return
    }

    func resizeToFit(image: UIImage, label: UILabel) -> UIImage {
        let width = label.frame.size.width
        let height = label.frame.size.height
        let imageSize = CGSize(width: width, height: height)
        UIGraphicsBeginImageContext(imageSize)
        image.draw(in: CGRect(origin: .zero, size: imageSize))
        let newImage: UIImage = UIGraphicsGetImageFromCurrentImageContext()!
        UIGraphicsEndImageContext();
        return newImage
    }
    
    func initBuyButton() {
        if(self.allergen.sold) {
            self.buyButton.isHidden = false
        } else{
            let size = CGSize(width: 0.0, height: 0.0)
            self.buyButton.draw(CGRect(origin: .zero, size: size))
        }
    }
    
    @IBAction func buyButtonClicked(_ sender: Any) {
        let purchaseUrlString = "https://inbio.com/index.php?route=product/search&search=" + self.allergen.name.replacingOccurrences(of: " ", with: "%20")
        let purchaseUrl = URL(string: purchaseUrlString)
        UIApplication.shared.open(purchaseUrl!, options: convertToUIApplicationOpenExternalURLOptionsKeyDictionary([:]), completionHandler: nil)
    }
    
    func initARButton() {
        let filename = "n" + allergen.PDBid + ".scn"
        let allergenScene = SCNScene(named: filename)
        if (allergenScene != nil) {
            arButton.isHidden = false
        }
    }
    
    @IBAction func arButtonClicked(_ sender: Any) {
        performSegue(withIdentifier: "entryToAR", sender: self)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        let destinationVC = segue.destination as! ARSceneViewController
        destinationVC.PDBid = self.allergen.PDBid
    }
    
    
    func initTextViews() {
        let textViews: [UITextView] = [nameTextView, sourceTextView, orderTextView, speciesTextView, bNameTextView, mwTextView, aIcityTextView, aRefTextView, foodTextView]
        let allergenText: [String] = [allergen.name, allergen.source, allergen.order, allergen.species, allergen.bName, allergen.mw,
                            allergen.aIcity, allergen.aRef, allergen.food]
        var i = 0
        while (i < textViews.count) {
            textViews[i].text = allergenText[i]
            textViews[i].sizeToFit()
            textViews[i].isEditable = false
            i += 1
        }
        
        //Handle aRef URL
        let aRef = "http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?cmd=Retrieve&db=pubmed&dopt=AbstractPlus&list_uids=" + allergen.aRef
        aRefTextView.text = aRef
        aRefTextView.dataDetectorTypes = .all
    }
    
    func playVideo() {
        var mp4Name = "not_found"
        if(allergen.PDBid != "None" ) {
            mp4Name = "n" + allergen.PDBid.lowercased()
        }
        
        let mp4URL = Bundle.main.url(forResource: mp4Name, withExtension: "mp4")
        
        // initialize the video player with the url
        self.player = AVQueuePlayer(url: mp4URL!)
        looper = AVPlayerLooper(player: self.player!, templateItem: AVPlayerItem(asset: AVAsset(url: mp4URL!)))
        
        // create a video layer for the player
        let layer: AVPlayerLayer = AVPlayerLayer(player: player)
        
        // make the layer the same size as the container view
        layer.frame = videoViewContainer.bounds
        
        // make the video fill the layer as much as possible while keeping its aspect size
        layer.videoGravity = AVLayerVideoGravity.resizeAspect
        
        // add the layer to the container view
        videoViewContainer.layer.addSublayer(layer)
        self.player?.play()
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func sendEmail(sender: AnyObject) {
        let composer = MFMailComposeViewController()
        
        if MFMailComposeViewController.canSendMail() {
            composer.mailComposeDelegate = self
            composer.setToRecipients(["ninjha01@gmail.com"])
            composer.setSubject(allergen.name + ": Feedback")
            composer.setMessageBody("", isHTML: false)
            present(composer, animated: true, completion: nil)
        }
    }
    
    func mailComposeController(_ controller: MFMailComposeViewController, didFinishWith result: MFMailComposeResult, error: Error?) {
        controller.dismiss(animated: true, completion: nil)
    }
}

extension UIImage
{
    func imageWithSize(width: CGFloat, height: CGFloat) -> UIImage
    {
        var scaledImageRect = CGRect.zero
        
        let aspectWidth:CGFloat = width / self.size.width
        let aspectHeight:CGFloat = height / self.size.height
        
        //max - scaleAspectFill | min - scaleAspectFit
        let aspectRatio:CGFloat = max(aspectWidth, aspectHeight)
        
        scaledImageRect.size.width = self.size.width * aspectRatio
        scaledImageRect.size.height = self.size.height * aspectRatio
        scaledImageRect.origin.x = (size.width - scaledImageRect.size.width) / 2.0
        scaledImageRect.origin.y = (size.height - scaledImageRect.size.height) / 2.0
        
        UIGraphicsBeginImageContextWithOptions(size, false, 0)
        
        self.draw(in: scaledImageRect)
        
        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return scaledImage!
    }
}

// Helper function inserted by Swift 4.2 migrator.
fileprivate func convertToUIApplicationOpenExternalURLOptionsKeyDictionary(_ input: [String: Any]) -> [UIApplication.OpenExternalURLOptionsKey: Any] {
	return Dictionary(uniqueKeysWithValues: input.map { key, value in (UIApplication.OpenExternalURLOptionsKey(rawValue: key), value)})
}
