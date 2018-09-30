import { imgs } from './game/imgs_loader'
import { img, canvas } from './info/config'
import { context as ctx } from './info/display'

export class Score {
  constructor(score) {
    this.score = score
    this.imgs = {
      score_0: imgs.imgByName('score_0'),
      score_1: imgs.imgByName('score_1'),
      score_2: imgs.imgByName('score_2'),
      score_3: imgs.imgByName('score_3'),
      score_4: imgs.imgByName('score_4'),
      score_5: imgs.imgByName('score_5'),
      score_6: imgs.imgByName('score_6'),
      score_7: imgs.imgByName('score_7'),
      score_8: imgs.imgByName('score_8'),
      score_9: imgs.imgByName('score_9')
    }
    this.w = this.imgs.score_0.width / img.imgsRatio
    this.h = this.imgs.score_0.height / img.imgsRatio
    this.handle()
  }

  handle() {
    this.scoreString = this.score.toString()
    this.scoreLength = this.scoreString.length
    this.scoreArray = []

    for (let s of this.scoreString) {
      this.scoreArray.push(s)
    }
  }

  update() {
    this.score += 1
    this.handle()
  }

  draw() {
    this.scoreArray.forEach(function(e, i) {
      ctx.drawImage(
        this.imgs['score_' + e],
        canvas.canvasWidth * 0.5 +
          i * 20 -
          this.w / 2 -
          (this.scoreLength * this.w) / 2,
        20,
        this.w,
        this.h
      )
    }, this)
  }

  endDraw() {
    this.scoreArray.forEach(function(e, i) {
      ctx.drawImage(
        this.imgs['score_' + e],
        canvas.canvasWidth * 0.5 +
          130 +
          i * 20 -
          this.w / 2 -
          this.scoreLength * this.w,
        canvas.canvasHeight * 0.36 + 46,
        this.w,
        this.h
      )
    }, this)
  }

  maxDraw() {
    this.scoreArray.forEach(function(e, i) {
      ctx.drawImage(
        this.imgs['score_' + e],
        canvas.canvasWidth * 0.5 +
          130 +
          i * 20 -
          this.w / 2 -
          this.scoreLength * this.w,
        canvas.canvasHeight * 0.36 + 104,
        this.w,
        this.h
      )
    }, this)
  }
}
