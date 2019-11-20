export type FileContent = {
  name: string
  url: string
  timestamp: number
  rowNo: number
}

export type UpdateFileContent = {
  name: string
  url: string
  timestamp: number
  rowNo?: number
}

export type FileData = {
  [id: string]: FileContent
}
