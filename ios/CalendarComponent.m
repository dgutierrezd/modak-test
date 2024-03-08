//
//  RCTCalendarComponent.m
//  ModakTest
//
//  Created by TSO on 7/03/24.
//

#import <Foundation/Foundation.h>
#import <React/RCTLog.h>
#import "CalendarComponent.h"

#import "React/RCTBridgeModule.h"
@interface
RCT_EXTERN_MODULE(CalendarManager, NSObject)
RCT_EXTERN_METHOD(addEvent:(NSString *)title startDate:(double)startDate endDate:(double)endDate)

@end

