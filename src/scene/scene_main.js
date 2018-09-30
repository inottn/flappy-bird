import { detectMob, randomBetweenNumbers } from "../util/utils";
import { canvas, context as ctx } from "../info/display";
import { canvas as canvasInfo, pipe, img as imgInfo } from "../info/config";
import { Scene } from "../game/scene";
import { SceneEnd } from "./scene_end";
import { imgs } from "../game/imgs_loader";
import { Bird } from "../bird";
import { Ground } from "../background/ground";
import { Pipe } from "../pipe";
import { Score } from "../score";
import { drawImage } from "../util/draw";

export class SceneMain extends Scene {
  constructor() {
    super()
  }

  init() {
    this.handleEvent()

    this.bird = new Bird(canvasInfo.canvasWidth * 0.2, canvasInfo.canvasHeight * 0.5)
    this.ground = new Ground()
    this.bg = imgs.imgByName('start_bg')
    this.tap = imgs.imgByName('tap')
    this.ready = imgs.imgByName('ready')
    this.pipe1 = new Pipe(
      pipe.initX,
      canvasInfo.canvasHeight - 64 - 1
    )
    this.pipe2 = new Pipe(
      pipe.initX + pipe.levelSpacing,
      canvasInfo.canvasHeight - 64 - 1
    )
    this.pipe3 = new Pipe(
      pipe.initX + 2 * pipe.levelSpacing,
      canvasInfo.canvasHeight - 64 - 1
    )
    this.pipes = [this.pipe1, this.pipe2, this.pipe3]
    this.score = new Score(0)
    this.isReady = true
    this.isEnd = false
    this.initStatus = true
  }

  handleEvent() {
    const readyChange = () => {
      this.isReady = false
      if (!this.isEnd) {
        this.bird.jump()
      }
    }

    if (detectMob()) {
      canvas.addEventListener('touchstart', readyChange, false)
      pipe.levelSpacing = 240
    } else {
      canvas.addEventListener('click', readyChange, false)
    }

    canvas.addEventListener(
      'touchmove',
      e => {
        e.preventDefault()
      },
      false
    )
  }

  calculateScore() {
    this.pipes.forEach(function(p) {
      if (this.bird.x > p.x + p.bw && p.scoreFlag) {
        p.scoreFlag = false
        this.score.update()
      }
    }, this)
  }

  endChange() {
    this.pipes.forEach(function(p) {
      if (p.collisionWithBird(this.bird)) {
        this.isEnd = true
      }
    }, this)

    if (this.bird.y + this.bird.h >= canvasInfo.canvasHeight - 64) {
      this.isEnd = true
    }

    if (
      this.isEnd &&
      this.bird.y >= canvasInfo.canvasHeight - 64 - this.bird.h &&
      this.bird.rotationAngle == 90
    ) {
      let dataImg = canvas.toDataURL('image/png')
      this.afterScene = new SceneEnd(dataImg, this.score)
      this.redirect = true
    }
  }

  update() {
    if (this.isEnd) {
      canvas.classList.add('shake', 'animated')
      this.bird.update()
    } else if (!this.isReady) {
      this.ground.moveLeft()
      this.bird.update()
      this.pipe1.moveLeft()
      this.pipe2.moveLeft()
      this.pipe3.moveLeft()
    } else {
      this.ground.moveLeft()
    }

    this.pipes.forEach(function(p) {
      if (p.x + p.bw < 0) {
        p.x = pipe.levelSpacing * 3 - p.bw
        p.bh = randomBetweenNumbers(
          pipe.minHeight,
          canvasInfo.canvasHeight -
            64 -
            pipe.minHeight -
            pipe.verticalSpacing
        )
        p.scoreFlag = true
      }
    }, this)

    this.calculateScore()
    this.endChange()
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

    if (this.isReady) {
      drawImage(
        this.tap,
        canvasInfo.canvasWidth * 0.5 - this.tap.width / imgInfo.imgsRatio / 2,
        canvasInfo.canvasHeight * 0.5
      )
      drawImage(
        this.ready,
        canvasInfo.canvasWidth * 0.5 - this.ready.width / imgInfo.imgsRatio / 2,
        canvasInfo.canvasHeight * 0.2
      )
    } else {
      this.pipe1.draw()
      this.pipe1.flip()
      this.pipe2.draw()
      this.pipe2.flip()
      this.pipe3.draw()
      this.pipe3.flip()
    }

    if (!this.isEnd) {
      this.score.draw()
    }

    this.bird.draw()
  }
}
