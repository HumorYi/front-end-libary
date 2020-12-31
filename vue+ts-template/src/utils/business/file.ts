export const getUploadConfig = (fileObj: {
  [key: string]: (string | File)[]
}): { files: File[]; map: Map<number, { key: string; i: number }> } => {
  const uploadFiles: File[] = []

  const fileObjMap = new Map()
  let uploadFileIndex = 0

  Object.keys(fileObj).forEach((key: string) => {
    const files = fileObj[key]

    files.forEach((file: string | File, i: number) => {
      if (typeof file !== 'string') {
        uploadFiles.push(file as File)

        fileObjMap.set(uploadFileIndex, { key, i })
        uploadFileIndex++
      }
    })
  })

  return {
    files: uploadFiles,
    map: fileObjMap
  }
}

export const uploadSuccessCb = (
  fileObj: {
    [key: string]: (string | File)[]
  },
  fileObjMap: Map<number, { key: string; i: number }>
) => (i: number, Key: string) => {
  const obj = fileObjMap.get(i)

  if (obj) {
    fileObj[obj.key][obj.i] = Key
  }
}
