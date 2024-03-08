//
//  CalendarComponent.swift
//  ModakTest
//
//  Created by TSO on 7/03/24.
//

import Foundation

import EventKit

@objc(CalendarManager)
class CalendarManager: NSObject {
  
  @available(iOS 17.0, *)
  @objc func addEvent(_ title: String, startDate: NSNumber, endDate: NSNumber, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    
    let eventStore = EKEventStore()
    
    DispatchQueue.global().async {
      var success = true
      
      eventStore.requestFullAccessToEvents { (granted, error) in
        if granted && error == nil {
          let event = EKEvent(eventStore: eventStore)
          event.title = title
          event.startDate = Date(timeIntervalSince1970: startDate.doubleValue / 1000)
          event.endDate = Date(timeIntervalSince1970: endDate.doubleValue / 1000)
          event.calendar = eventStore.defaultCalendarForNewEvents
          
          do {
            try eventStore.save(event, span: .thisEvent)
            print("Event saved successfully")
            success = true
          } catch let error as NSError {
            print("Failed to save event: \(error)")
            success = false
          }
        } else {
          print("Permission denied or error: \(error)")
          success = false
        }
      }
      
      if success {
        resolver(true)
      } else {
        let error = NSError(domain: "YourDomain", code: 0, userInfo: nil)
        rejecter("error_code", "Failed to add event", error)
      }
    }
  }
}
