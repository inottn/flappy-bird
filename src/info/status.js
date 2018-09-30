import { isStorageSupported } from '../util/utils'

export const status = {
  imgsLoad: false,
  storageSupportedFlag: isStorageSupported()
}