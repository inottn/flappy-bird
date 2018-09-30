import { ImgsLoader } from './imgs_loader'
import { context as ctx } from '../info/display';
import { img as imgInfo } from '../info/config';

export class Animation {
  constructor(imgsPath) {
    this.imgsPath = imgsPath
    this.imgsObj = this.imgsChange()
    this.currentImgIndex = 0
    this.currentImgObj = this.imgsObj[this.currentImgIndex]
    this.switchSpeed = 4
  }

  imgsChange() {
    return this.imgsPath.map(function(e) {
      return ImgsLoader.imgByUrl(e)
    }, this)
  }

  update() {
    if (this.switchSpeed == 0) {
      this.currentImgIndex = (this.currentImgIndex + 1) % this.imgsObj.length
      this.currentImgObj = this.imgsObj[this.currentImgIndex]
      this.switchSpeed = 4
    }
    this.switchSpeed--
  }

  draw(
    x = 0,
    y = 0,
    w = this.imgsObj[0].width / imgInfo.imgsRatio,
    h = this.imgsObj[0].height / imgInfo.imgsRatio
  ) {
    ctx.drawImage(this.currentImgObj, x, y, w, h)
    this.update()
  }
}
