"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbToggleTimerPauseState = undefined;
class FbToggleTimerPauseState {
  constructor(t) {
    this.FbDataInternal = t;
    this.wEh = false;
    this.PEh = undefined;
    this.st_ = false;
    this.at_ = false;
  }
  static Create(t) {
    if (t) {
      return new FbToggleTimerPauseState(t);
    }
  }
  get TimerType() {
    if (!this.wEh) {
      this.wEh = true;
      this.PEh = this.FbDataInternal.timerType();
    }
    return this.PEh;
  }
  get IsPause() {
    if (!this.st_) {
      this.st_ = true;
      this.at_ = this.FbDataInternal.isPause();
    }
    return this.at_;
  }
}
exports.FbToggleTimerPauseState = FbToggleTimerPauseState;
//# sourceMappingURL=FbToggleTimerPauseState.js.map