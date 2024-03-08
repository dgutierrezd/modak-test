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
  @objc func addEvent(_ title: String, startDate: NSNumber, endDate: NSNumber) {
      let eventStore = EKEventStore()

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
              } catch let error as NSError {
                  print("Failed to save event: \(error)")
              }
          } else {
              print("Permission denied or error: \(error)")
          }
      }
  }
}
