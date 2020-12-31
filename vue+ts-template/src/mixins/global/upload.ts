import { Vue, Prop, Component } from 'vue-property-decorator'
import { isRangeFileSize } from '@globalUtils/verify'

import Message from '@archUtils/message'

const message = new Message()

@Component
export default class Upload extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly accepts!: string[]
  @Prop({ type: Number, default: 0 }) readonly lastUploadCount!: number
  @Prop({ type: Number, default: 0 }) readonly limit!: number
  @Prop({ type: String, default: '' }) readonly limitSize!: string
  @Prop({ type: String, default: '' }) readonly acceptsErrMsg!: string
  @Prop({
    type: String,
    default() {
      return `最多可添加 ${this.limit} 个`
    }
  })
  readonly limitErrMsg!: string

  @Prop({
    type: String,
    default() {
      return `最大支持${this.limitSize}`
    }
  })
  readonly limitSizeErrMsg!: string

  @Prop() readonly params!: any

  validator(files: File[]): boolean {
    const filesLen = files.length

    if (files.length === 0) {
      return false
    }

    const limit = this.limit
    const limitSize = this.limitSize
    const accepts = this.accepts
    const acceptsLen = this.accepts.length

    if (limit && filesLen + this.lastUploadCount > limit) {
      message.error(this.limitErrMsg)
      return false
    }

    for (let i = 0; i < filesLen; i++) {
      const file = files[i]

      if (acceptsLen > 0 && !accepts.includes(file.type)) {
        message.error(this.acceptsErrMsg || this.acceptsErr())
        return false
      }

      if (limitSize && !isRangeFileSize(file.size, limitSize)) {
        message.error(this.limitSizeErrMsg)
        return false
      }
    }

    return true
  }

  acceptsErr() {
    const types = this.accepts
      .map((item: string) => item.split('/')[1])
      .join(' 或 ')
      .replace('jpeg', 'jpg')

    return `必须是 ${types}`
  }
}
