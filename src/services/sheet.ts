import { FileData, UpdateFileContent } from '../entities'

export class FileDataSheet {
  sheetID: string
  sheetName: string
  sheet?: GoogleAppsScript.Spreadsheet.Sheet

  constructor(sheetID: string, sheetName: string) {
    this.sheetID = sheetID
    this.sheetName = sheetName

    const spreadSheet = SpreadsheetApp.openById(sheetID)
    const sheet = spreadSheet.getSheetByName(sheetName)

    if (sheet) {
      this.sheet = sheet
    }
  }

  getFileData() {
    const fileData: FileData = {}
    if (!this.sheet) {
      console.warn('not found sheet.')
      return fileData
    }

    const data = this.sheet.getDataRange().getValues()
    data.map(row => {
      const id = row[0] as string
      const name = row[1] as string
      const url = row[2] as string
      const timestamp = row[3] as number
      const rowNo = row[4] as number

      if (id) {
        fileData[id] = { name, url, timestamp, rowNo }
      }
    })

    return fileData
  }

  updateFileContent(id: string, fileContent: UpdateFileContent) {
    if (!this.sheet) {
      console.warn('not found sheet.')
      return
    }

    const fileData = this.getFileData()
    const currentFileContent = fileData[id]

    if (currentFileContent) {
      // this.sheet.getRange(currentFileContent.rowNo, 1).setValue(id)
      this.sheet.getRange(currentFileContent.rowNo, 2).setValue(fileContent.name)
      this.sheet.getRange(currentFileContent.rowNo, 3).setValue(fileContent.url)
      this.sheet.getRange(currentFileContent.rowNo, 4).setValue(fileContent.timestamp)
      // this.sheet.getRange(currentFileContent.rowNo, 5).setValue(fileContent.rowNo)
      return
    }

    const appendRowNo = this.sheet.getLastRow() + 1

    this.sheet.getRange(appendRowNo, 1).setValue(id)
    this.sheet.getRange(appendRowNo, 2).setValue(fileContent.name)
    this.sheet.getRange(appendRowNo, 3).setValue(fileContent.url)
    this.sheet.getRange(appendRowNo, 4).setValue(fileContent.timestamp)
    this.sheet.getRange(appendRowNo, 5).setValue(appendRowNo)
  }
}
