import { canvas } from './info/config'
import { status } from './info/status'
import { detectMob } from './util/utils'
import { Game } from './game/game'
import { SceneStart } from './scene/scene_start'

const __main = function() {
  if (detectMob()) {
    canvas.canvasWidth = window.innerWidth
    canvas.canvasHeight = window.innerHeight
  }

  if (!status.storageSupportedFlag) {
    alert('您的浏览器版本过低或开启无痕模式，部分功能无法实现')
  }

  const sceneStart = new SceneStart()
  const game = Game.instance(sceneStart)
  game.__start()
}

__main()
