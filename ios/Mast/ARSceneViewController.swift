//
//  ARSceneViewController.swift
//  Mast
//
//  Created by Nishant Jha on 5/22/18.
//  Copyright © 2017 Nishant Jha. All rights reserved.
//

import UIKit
import ARKit

class ARSceneViewController: UIViewController {
    
    public var PDBid: String = ""
    @IBOutlet weak var arSceneView: ARSCNView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupScene()
        addARAllergen()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        arSceneView.session.pause()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        setupConfiguration()
    }
    
    func setupScene() {
        let scene = SCNScene()
        arSceneView.scene = scene
        configureLighting()
    }
    
    func setupConfiguration() {
        let configuration = ARWorldTrackingConfiguration()
        configuration.isLightEstimationEnabled = true;
        configuration.planeDetection = .horizontal
        arSceneView.session.run(configuration)
    }
    
    func addARAllergen() {
        let filename = "n" + PDBid + ".scn"
        let allergenScene = SCNScene(named: filename)
        let allergenNode = SCNNode()
        let nodeArray = allergenScene!.rootNode.childNodes
        let scale = 0.2
        let scaleVector = SCNVector3(scale, scale, scale)
        for node in nodeArray {
            node.scale = scaleVector
            addAnimation(node: node)
            allergenNode.addChildNode(node)
        }
        arSceneView.scene.rootNode.addChildNode(allergenNode)
    }
    
    func addAnimation(node: SCNNode) {
        let rotateOne = SCNAction.rotateBy(x: 0, y: CGFloat(Float.pi), z: 0, duration: 5.0)
        let repeatForever = SCNAction.repeatForever(rotateOne)
        node.runAction(repeatForever)
    }
    
    func configureLighting() {
        arSceneView.autoenablesDefaultLighting = true
        arSceneView.automaticallyUpdatesLighting = true
    }
}




