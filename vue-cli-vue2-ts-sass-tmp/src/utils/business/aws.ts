/* import AWS from 'aws-sdk'
import { PutObjectOutput, PutObjectRequest } from 'aws-sdk/clients/s3'
import { ClientConfiguration } from 'aws-sdk/clients/acm'

import Message from '@archUtils/message'
import Loading from '@archUtils/loading'
const message = new Message()
const loading = new Loading()

type Upload = {
  files: File[]
  option: ClientConfiguration
  params: PutObjectRequest
  // 后台生成文件名唯一标识
  Keys: string[]
  cb?: Function
  loadingConfig?: {}
  errorMsg?: string
}

export const awsUpload = async ({
  files,
  option,
  params,
  Keys,
  cb,
  loadingConfig = {},
  errorMsg = '文件上传失败，请联系管理员，谢谢！'
}: Upload) => {
  const s3 = new AWS.S3(option)

  const tasks = () => {
    return files.map(
      (file: File, i: number): Promise<any> => {
        const Key = Keys[i]
        const extendParams = Object.assign(
          { ContentType: file['type'], Body: file },
          params,
          { Key }
        )

        return new Promise((resolve, reject) => {
          s3.putObject(extendParams, (err: Error, data: PutObjectOutput) => {
            if (err) {
              reject(err)
            } else {
              cb && cb(i, Key, data)
              resolve(data)
            }
          })
        })
      }
    )
  }

  loading.open(loadingConfig)

  await Promise.all(tasks()).catch(err => {
    loading.close()

    errorMsg && message.error(errorMsg)

    throw new Error(err)
  })

  loading.close()
}
 */
