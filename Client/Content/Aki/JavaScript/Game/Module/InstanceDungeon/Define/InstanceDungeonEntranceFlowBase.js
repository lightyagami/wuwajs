"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceFlowBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
class InstanceDungeonEntranceFlowBase {
  constructor() {
    this.Lai = new Array();
    this.Dai = -1;
    this.OnCreate();
  }
  get r$t() {
    return this.Dai > 0 && this.Dai >= this.Lai.length;
  }
  Rai() {
    ++this.Dai;
    if (this.Dai < 0 || this.Dai >= this.Lai.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 16, "副本进入流程执行失败，当前步数与总步数不匹配！", ["CurrentStep", this.Dai]);
      }
    } else {
      this.Lai[this.Dai]();
    }
  }
  Reset() {
    this.Dai = -1;
  }
  ResetToBeforeLast() {
    this.Dai = this.Lai.length - 2;
  }
  Start() {
    this.Reset();
    this.Rai();
  }
  Flow() {
    if (!this.r$t) {
      this.Rai();
    }
  }
  RevertStep() {
    if (!this.r$t) {
      --this.Dai;
    }
  }
  OnEditBattleViewClose() {
    this.OnEditBattleViewCloseCall();
  }
  AddStep(t) {
    this.Lai.push(t);
  }
  OnCreate() {}
  OnEditBattleViewCloseCall() {}
}
exports.InstanceDungeonEntranceFlowBase = InstanceDungeonEntranceFlowBase;
//# sourceMappingURL=InstanceDungeonEntranceFlowBase.js.map