"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerGroupAction = undefined;
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerGroupAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(s) {
    super();
    this._Tr = [];
    this._Tr = s;
  }
  OnStart() {
    if (this._Tr.length === 0) {
      this.Done = true;
    } else {
      for (const s of this._Tr) {
        s.Start();
      }
    }
  }
  OnTick(s) {
    for (const o of this._Tr) {
      o.Tick(s);
    }
    if (this._Tr.every(s => s.IsDone())) {
      this.Done = true;
    }
  }
  OnFinish() {
    for (const s of this._Tr) {
      s.Finish();
    }
  }
}
exports.GuessJokerGroupAction = GuessJokerGroupAction;
//# sourceMappingURL=GuessJokerGroupAction.js.map