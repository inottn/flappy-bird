import { context as ctx } from '../info/display'
import { img as imgInfo } from '../info/config'

export function drawImage(
  img,
  x = 0,
  y = 0,
  w = img.width / imgInfo.imgsRatio,
  h = img.height / imgInfo.imgsRatio
) {
  ctx.drawImage(img, x, y, w, h)
}
