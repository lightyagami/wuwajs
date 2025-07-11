"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QteAnimItem = undefined;
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const START_ANIM_TIME = 400;
const ANIM_START = "Start";
const ANIM_LOOP = "Loop";
const ANIM_CLOSE = "Close";
const ANIM_PRESS = "Press";
class QteAnimItem {
  constructor() {
    this.HOi = undefined;
    this.SPe = undefined;
    this.xOi = undefined;
    this.jOi = undefined;
  }
  Init(i) {
    this.HOi = i;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.HOi);
  }
  StartAnim(i = 0) {
    this.NOi();
    if (i > TimerSystem_1.MIN_TIME) {
      this.xOi = TimerSystem_1.TimerSystem.Delay(() => {
        this.xOi = undefined;
        this.StartAnim();
      }, i);
    } else {
      this.jOi = ANIM_START;
      this.Gti(this.jOi);
      this.xOi = TimerSystem_1.TimerSystem.Delay(() => {
        this.xOi = undefined;
        this.jOi = ANIM_LOOP;
        this.Gti(this.jOi);
      }, START_ANIM_TIME);
    }
  }
  StopAnim() {
    this.NOi();
    this.SPe.StopSequenceByKey(this.jOi);
    this.jOi = undefined;
    this.Gti(ANIM_CLOSE);
  }
  PressAnim() {
    this.Gti(ANIM_PRESS);
  }
  Gti(i) {
    this.SPe.PlaySequencePurely(i);
  }
  NOi() {
    if (this.xOi) {
      TimerSystem_1.TimerSystem.Remove(this.xOi);
      this.xOi = undefined;
    }
  }
  Clear() {
    this.NOi();
  }
}
exports.QteAnimItem = QteAnimItem;
//# sourceMappingURL=QteAnimItem.js.map