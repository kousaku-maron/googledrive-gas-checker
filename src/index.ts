import { onHello, onCheckFolder } from './handler'

declare const global: {
  [x: string]: any
}

global.onCheckFolder = function() {
  return onCheckFolder()
}

global.onHello = function() {
  return onHello()
}

global.setTrigger = function() {
  ScriptApp.newTrigger('onCheckFolder')
    .timeBased()
    .atHour(20)
    .everyDays(1)
    .inTimezone('Asia/Tokyo')
    .create()

  ScriptApp.newTrigger('onCheckFolder')
    .timeBased()
    .atHour(8)
    .everyDays(1)
    .inTimezone('Asia/Tokyo')
    .create()
}
