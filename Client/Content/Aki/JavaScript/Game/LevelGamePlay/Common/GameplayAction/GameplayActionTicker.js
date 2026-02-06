"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayActionTicker = undefined;
class GameplayActionTicker {
  constructor() {
    this.ActionList = new Array();
  }
  PushAction(t) {
    this.ActionList.push(t);
  }
  TickAction(s) {
    for (let t = 0; t < this.ActionList.length;) {
      var e = this.ActionList[t];
      if (e.IsFinish()) {
        this.ActionList.splice(t, 1);
      } else {
        e.TickAction(s);
        t++;
      }
    }
  }
  Clear() {
    this.ActionList.length = 0;
  }
}
exports.GameplayActionTicker = GameplayActionTicker;
//# sourceMappingURL=GameplayActionTicker.js.map