import { canvas as canvasInfo, img as imgInfo } from '../info/config'
import { canvas, context as ctx, getCanvasOffset } from '../info/display'
import { detectMob } from '../util/utils'
import { Scene } from '../game/scene'
import { SceneMain } from './scene_main'
import { Bird } from '../bird'
import { Ground } from '../background/ground'
import { imgs } from '../game/imgs_loader'
import { drawImage } from '../util/draw';

export class SceneStart extends Scene {
  constructor() {
    super()
  }

  init() {
    this.ground = new Ground()
    this.bg = imgs.imgByName('start_bg')
    this.logo = imgs.imgByName('logo')
    this.start = imgs.imgByName('start')
    this.startX =
      canvasInfo.canvasWidth * 0.5 -
      (this.start.width / imgInfo.imgsRatio / 3) * 4
    this.startY = canvasInfo.canvasHeight * 0.74

    this.bird = new Bird()
    this.initStatus = true

    this.handleEvent()
  }

  handleEvent() {
    const directEvent = e => {
      let t = e.type === 'touchstart' ? e.touches[0] : e
      let [x, y] = getCanvasOffset()
      x = t.clientX - x
      y = t.clientY - y
      if (
        x > this.startX &&
        x < this.startX + this.start.width / imgInfo.imgsRatio &&
        y > this.startY &&
        y < this.startY + this.start.height / imgInfo.imgsRatio
      ) {
        canvas.removeEventListener('click', directEvent)
        canvas.removeEventListener('touchstart', directEvent)
        this.afterScene = new SceneMain()
        this.redirect = true
      }
    }

    if (detectMob()) {
      canvas.addEventListener('touchstart', directEvent, false)
    } else {
      canvas.addEventListener('click', directEvent, false)
    }
  }

  update() {
    this.ground.moveLeft()
  }

  draw() {
    super.draw()

    if (!this.bird.initStatus) return

    drawImage(
      this.bg,
      0,
      0,
      canvasInfo.canvasWidth,
      canvasInfo.canvasHeight - this.ground.h / imgInfo.imgsRatio
    )
    this.ground.draw()
    drawImage(
      this.logo,
      canvasInfo.canvasWidth * 0.5 - this.logo.width / imgInfo.imgsRatio / 2 - 26,
      canvasInfo.canvasHeight * 0.2
    )
    drawImage(this.start, this.startX, this.startY)

    this.bird.draw(
      canvasInfo.canvasWidth * 0.5 - this.bird.w / 2 + 140,
      canvasInfo.canvasHeight * 0.22
    )
  }
}
