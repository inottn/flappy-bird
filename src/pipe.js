import { imgs } from './game/imgs_loader'
import { img, pipe, canvas } from './info/config'
import { context as ctx } from './info/display'
import { randomBetweenNumbers, collision } from './util/utils'

export class Pipe {
  constructor(x, y) {
    this.headImg = imgs.imgByName('pipe_head')
    this.bodyImg = imgs.imgByName('pipe_body')
    this.x = x
    this.y = y
    this.hw = this.headImg.width / img.imgsRatio
    this.bw = this.bodyImg.width / img.imgsRatio
    this.hh = this.headImg.height / img.imgsRatio
    this.bh = randomBetweenNumbers(
      pipe.minHeight,
      canvas.canvasHeight - 64 - pipe.minHeight - pipe.verticalSpacing
    )
    this.speed = pipe.speed
    this.scoreFlag = true
  }

  collisionWithBird(bird) {
    let pTop = {
        x: this.x,
        y: 0,
        w: this.bw,
        h: canvas.canvasHeight - this.bh - pipe.verticalSpacing - 64 - this.hh
      },
      pBottom = {
        x: this.x,
        y: canvas.canvasHeight - this.bh - 64 - this.hh,
        w: this.bw,
        h: this.bh + this.hh
      }
    return collision(bird, pTop) || collision(bird, pBottom)
  }

  flip() {
    let t1 =
      canvas.canvasHeight - 64 - this.bh - 2 * this.hh - pipe.verticalSpacing
    let t2 = canvas.canvasHeight - 64 - this.hh - t1
    let t3 = canvas.canvasHeight - 64 - this.bh - this.hh
    ctx.save()
    ctx.translate(0, this.y - this.bh - this.hh + 1)
    ctx.scale(1, -1)
    ctx.translate(0, -(this.y + 1) + t3)

    for (
      let i = 0;
      i <
      canvas.canvasHeight - this.bh - pipe.verticalSpacing - 64 - 2 * this.hh;
      i++
    ) {
      ctx.drawImage(this.bodyImg, this.x, this.y - i, this.bw, 1)
    }
    ctx.drawImage(this.headImg, this.x - 3, t2, this.hw, this.hh)

    ctx.restore()
  }

  moveLeft() {
    this.x -= this.speed
  }

  draw() {
    for (let i = 0; i < this.bh; i++) {
      ctx.drawImage(this.bodyImg, this.x, this.y - i, this.bw, 1)
    }
    ctx.drawImage(
      this.headImg,
      this.x - 3,
      this.y - this.bh - this.hh + 1,
      this.hw,
      this.hh
    )
  }
}
