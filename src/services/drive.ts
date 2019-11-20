import { FileData } from '../entities'

export const checkFolder = (
  folder: GoogleAppsScript.Drive.Folder,
  fileData: FileData,
  task?: (file: GoogleAppsScript.Drive.File) => void
) => {
  const files = folder.getFiles()
  while (files.hasNext()) {
    const file = files.next()
    const timestamp = file.getLastUpdated().getTime()

    const fileContent = fileData[file.getId()]

    if (!fileContent && task) {
      task(file)
    }

    if (fileContent && fileContent.timestamp !== timestamp && task) {
      task(file)
    }
  }

  const folders = folder.getFolders()
  while (folders.hasNext()) {
    const folder = folders.next()
    checkFolder(folder, fileData, task)
  }
}
