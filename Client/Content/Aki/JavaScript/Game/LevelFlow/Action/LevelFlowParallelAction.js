"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowParallelAction = undefined;
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowParallelAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this._Tr = [];
    this.Ysm = new Set();
    this.AXd = (t, e) => {
      if (e) {
        this.Ysm.add(t);
        if (this.Ysm.size >= this._Tr.length) {
          this.FinishExecute(true);
        }
      } else {
        this.FinishExecute(false);
      }
    };
  }
  Init(t) {
    this._Tr = t;
    return this;
  }
  OnExecute() {
    if (this._Tr.length <= 0) {
      this.FinishExecute(true);
    } else {
      this.Ysm.clear();
      for (const t of this._Tr) {
        t.BindCompleteCallBack(this.AXd);
        t.Execute();
      }
    }
  }
  OnTick(t) {
    for (const e of this._Tr) {
      e.Tick(t);
    }
  }
  OnReset() {
    this._Tr.forEach(t => {
      t.Reset();
    });
    this.Ysm.clear();
  }
}
exports.LevelFlowParallelAction = LevelFlowParallelAction;
//# sourceMappingURL=LevelFlowParallelAction.js.map