import { Scene } from '../game/scene'
import { Score } from '../score'
import { ImgsLoader, imgs } from '../game/imgs_loader'
import { SceneStart } from './scene_start'
import { canvas, context as ctx, getCanvasOffset } from '../info/display'
import { canvas as canvasInfo, img as imgInfo, img } from '../info/config'
import { detectMob, storage } from '../util/utils'
import { status } from '../info/status'
import { drawImage } from '../util/draw';

export class SceneEnd extends Scene {
  constructor(dataImg, score) {
    super()

    this.score = score
    this.dataImg = dataImg
    this.img = ImgsLoader.imgByUrl(this.dataImg)
    this.isNewScore = false
  }

  init() {
    this.handleEvent()

    if (status.storageSupportedFlag) {
      this.storageScore()
      this.maxScore = new Score(Number(storage('score_2')))

      if (this.maxScore.score <= this.score.score) {
        this.isNewScore = true
      }
    }

    this.over = imgs.imgByName('over')
    this.board = imgs.imgByName('score_board')
    this.ok = imgs.imgByName('ok')
    this.share = imgs.imgByName('share')
    this.new = imgs.imgByName('new')
    this.okX =
      canvasInfo.canvasWidth * 0.5 - (this.ok.width / img.imgsRatio / 3) * 4
    this.okY = canvasInfo.canvasHeight * 0.74
    this.shareX =
      canvasInfo.canvasWidth * 0.5 + this.share.width / img.imgsRatio / 3
    this.shareY = canvasInfo.canvasHeight * 0.74
    this.initStatus = true
  }

  storageScore() {
    if (storage('score_2') === null) storage('score_2', this.score.score)
    if (storage('score_2') < this.score.score)
      storage('score_2', this.score.score)
  }

  handleEvent() {
    const directEvent = e => {
      let t = e.type === 'touchstart' ? e.touches[0] : e
      let [x, y] = getCanvasOffset()
      x = t.clientX - x
      y = t.clientY - y
      if (
        x > this.okX &&
        x < this.okX + this.ok.width / img.imgsRatio &&
        y > this.okY &&
        y < this.okY + this.ok.height / img.imgsRatio
      ) {
        canvas.removeEventListener('click', directEvent)
        canvas.removeEventListener('touchstart', directEvent)
        canvas.classList.remove('shake', 'animated')
        this.afterScene = new SceneStart()
        this.redirect = true
      }

      if (
        x > this.shareX &&
        x < this.shareX + this.share.width / img.imgsRatio &&
        y > this.shareY &&
        y < this.shareY + this.share.height / img.imgsRatio
      ) {
        alert('这么菜还分享？回家养猪吧。')
      }
    }

    if (detectMob()) {
      canvas.addEventListener('touchstart', directEvent, false)
    } else {
      canvas.addEventListener('click', directEvent, false)
    }
  }

  draw() {
    super.draw()

    ctx.drawImage(
      this.img,
      0,
      0,
      canvasInfo.canvasWidth,
      canvasInfo.canvasHeight
    )
    drawImage(
      this.over,
      canvasInfo.canvasWidth * 0.5 - this.over.width / imgInfo.imgsRatio / 2,
      canvasInfo.canvasHeight * 0.2
    )
    drawImage(
      this.board,
      canvasInfo.canvasWidth * 0.5 - this.board.width / imgInfo.imgsRatio / 2,
      canvasInfo.canvasHeight * 0.36
    )
    drawImage(this.ok, this.okX, this.okY)
    drawImage(this.share, this.shareX, this.shareY)
    this.score.endDraw(ctx)

    if (status.storageSupportedFlag) {
      this.maxScore.maxDraw(ctx)
    }

    if (this.isNewScore) {
      drawImage(
        this.new,
        canvasInfo.canvasWidth * 0.5 -
          this.new.width / imgInfo.imgsRatio / 2 +
          44,
        canvasInfo.canvasHeight * 0.36 + 77
      )
    }
  }
}
