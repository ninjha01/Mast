//
//  AWSHelper.swift
//  Mast
//
//  Created by Nishant Jha on 12/12/18.
//  Copyright © 2018 Nishant Jha. All rights reserved.
//

import Foundation
import AWSS3

class AWSHelper {
    
    var credentialsProvider: AWSStaticCredentialsProvider
    
    init() {
        let accessKey = "AKIAJQJWAP46UP57CGBQ"
        let secretKey = "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"
        self.credentialsProvider = AWSStaticCredentialsProvider(accessKey: accessKey, secretKey: secretKey)
        let configuration = AWSServiceConfiguration(region: AWSRegionType.USEast1, credentialsProvider: credentialsProvider)
        AWSServiceManager.default().defaultServiceConfiguration = configuration
    }
    
    public func downloadFromS3(s3BucketName: String, s3KeyName: String, fileURL: String) {
        let transferUtility = AWSS3TransferUtility.default()
        let expression = AWSS3TransferUtilityDownloadExpression()
        expression.progressBlock = {(task, progress) in
            DispatchQueue.main.async {
                debugPrint(("Progress is: %f", progress))
            }
        }
        
        transferUtility.download(to: URL(string: fileURL)!, bucket: s3BucketName, key: s3KeyName, expression: expression).continueWith { (task) -> AnyObject? in
            if let error = task.error {
                debugPrint("Error: %@",error.localizedDescription);
            }
            if let result = task.result {
                debugPrint("Starting Download", result)
            }
            return nil;
        }
    }
}
