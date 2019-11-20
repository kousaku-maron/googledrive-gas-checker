import { UpdateFileContent } from './entities'
import { createSlackInstance } from './services/slack'
import { checkFolder } from './services/drive'
import { FileDataSheet } from './services/sheet'

const endpoint = PropertiesService.getScriptProperties().getProperty('SLACK_ENDPOINT')
const username = PropertiesService.getScriptProperties().getProperty('USERNAME')
const iconEmoji = PropertiesService.getScriptProperties().getProperty('ICON_EMOJI')
const channel = PropertiesService.getScriptProperties().getProperty('CHANNEL')

const folderID = PropertiesService.getScriptProperties().getProperty('FOLDER_ID')
const sheetID = PropertiesService.getScriptProperties().getProperty('SHEET_ID')
const sheetName = PropertiesService.getScriptProperties().getProperty('SHEET_NAME')

export const onHello = () => {
  if (!endpoint || !channel || !username) return
  const slack = createSlackInstance(endpoint, channel, username, iconEmoji)
  const message = 'hello world！'
  slack.sendMessage(message)
}

export const onCheckFolder = () => {
  if (!endpoint || !channel || !username || !folderID || !sheetID || !sheetName) return
  const slack = createSlackInstance(endpoint, channel, username, iconEmoji)
  const sheet = new FileDataSheet(sheetID, sheetName)
  const folder = DriveApp.getFolderById(folderID)
  const fileData = sheet.getFileData()

  const task = (file: GoogleAppsScript.Drive.File) => {
    const message = `新しくファイルが作成・更新されています。<${file.getUrl()}|${file.getName()}>`
    slack.sendMessage(message)

    const fileID = file.getId()
    const fileContent: UpdateFileContent = {
      name: file.getName(),
      url: file.getUrl(),
      timestamp: file.getLastUpdated().getTime()
    }

    sheet.updateFileContent(fileID, fileContent)
  }

  checkFolder(folder, fileData, task)
}
