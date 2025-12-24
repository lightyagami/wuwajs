"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowSequenceAction = undefined;
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowSequenceAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this._Tr = [];
    this.PXd = 0;
    this.AXd = (t, s) => {
      if (s) {
        this.PXd++;
        if (this.PXd >= this._Tr.length) {
          this.FinishExecute(true);
        } else {
          (s = this._Tr[this.PXd]).BindCompleteCallBack(this.AXd);
          s.Execute();
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
    var t;
    if (this._Tr.length <= 0) {
      this.FinishExecute(true);
    } else {
      this.PXd = 0;
      (t = this._Tr[this.PXd]).BindCompleteCallBack(this.AXd);
      t.Execute();
    }
  }
  OnTick(t) {
    this._Tr[this.PXd].Tick(t);
  }
  OnReset() {
    this.PXd = 0;
    this._Tr.forEach(t => {
      t.Reset();
    });
  }
}
exports.LevelFlowSequenceAction = LevelFlowSequenceAction;
//# sourceMappingURL=LevelFlowSequenceAction.js.map