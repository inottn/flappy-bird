import { context as ctx } from '../info/display'
import { imgs } from '../game/imgs_loader';
import { canvas, img, ground } from '../info/config';

export class Ground {
  constructor(x = 0, y = canvas.canvasHeight - 64) {
    this.img = imgs.imgByName('ground')
    this.x = x
    this.y = y
    this.w = this.img.width / img.imgsRatio
    this.h = this.img.height / img.imgsRatio
    this.groundCount = canvas.canvasWidth / 19 + 3
    this.time = 20
  }

  moveLeft() {
    this.time--
    this.x -= ground.speed
    if (this.time === 0) {
      this.time = 20
      this.x += ground.speed * 20
    }
  }

  draw() {
    for (let i = 0; i < this.groundCount; i++) {
      ctx.drawImage(this.img, this.x + i * 19, this.y, this.w, this.h)
    }
  }
}
