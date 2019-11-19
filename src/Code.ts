import Slack from './slack'
import { isOverYesterday } from './compareDate'

const endpoint = PropertiesService.getScriptProperties().getProperty('SLACK_ENDPOINT')
const username = PropertiesService.getScriptProperties().getProperty('USERNAME')
const iconEmoji = PropertiesService.getScriptProperties().getProperty('ICON_EMOJI')
const channel = PropertiesService.getScriptProperties().getProperty('PMR_CHANNEL')
const folderID = PropertiesService.getScriptProperties().getProperty('PMR_FOLDER_ID')

function sayHello() {
  const slack = new Slack(endpoint, channel, username, iconEmoji)
  const message = 'hello world！'
  slack.sendMessage(message)
}

const checkFolder = (folder: GoogleAppsScript.Drive.Folder, task?: (file: GoogleAppsScript.Drive.File) => void) => {
  const files = folder.getFiles()
  while (files.hasNext()) {
    const file = files.next()

    const updatedAt = file.getLastUpdated()
    if (isOverYesterday(updatedAt) && task) {
      task(file)
    }

    if (isOverYesterday(updatedAt)) {
      Logger.log(`${file.getName}[${file.getLastUpdated()}]`)
    }
  }

  const folders = folder.getFolders()
  while (folders.hasNext()) {
    const folder = folders.next()
    checkFolder(folder, task)
  }
}

function checkPMRFolder() {
  const slack = new Slack(endpoint, channel, username, iconEmoji)
  const folder = DriveApp.getFolderById(folderID)

  const task = (file: GoogleAppsScript.Drive.File) => {
    const message = `新しくファイルが作成・更新されています。<${file.getUrl()}|${file.getName()}>`
    slack.sendMessage(message)
  }

  checkFolder(folder, task)
}

function setTrigger() {
  ScriptApp.newTrigger('checkPMRFolder')
    .timeBased()
    .atHour(8)
    .everyDays(1)
    .inTimezone('Asia/Tokyo')
    .create()
}
