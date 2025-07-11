"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoDungeonCommandQueue = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../../../Core/Common/Log");
const Macro_1 = require("../../../../Core/Preprocessor/Macro");
class DangoDungeonCommandQueue {
  constructor() {
    this.CurCommandActionIndex = 0;
    this.ckc = false;
    this._kc = [];
    this.HFc = undefined;
    this.pR1 = new Map();
    this.kG1 = undefined;
    this.oUe = 0;
  }
  Init() {
    this.av();
  }
  AddCommand(t) {
    if (!this.ckc) {
      this._kc.push(t);
    }
  }
  Abort() {
    if (this.kG1) {
      this.kG1.IsAborted = true;
    }
    this.ckc = true;
  }
  async Execute() {
    while (this._kc.length > 0 && !this.ckc) {
      try {
        var t = cpp_1.KuroTime.GetMicroseconds64();
        this.kG1 = this._kc.shift();
        if (this.kG1.ActionIndex > 0) {
          this.CurCommandActionIndex = this.kG1.ActionIndex;
        }
        await this.kG1.Execute();
        var i = cpp_1.KuroTime.GetMicroseconds64();
        this.oUe += i - t;
        this.vR1(this.kG1.CommandType, i - t);
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("RacingBetsDungeon", 58, "DangoDungeonCommandQueue Execute异常", t, ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RacingBetsDungeon", 58, "DangoDungeonCommandQueue Execute异常", ["error", t]);
        }
      }
    }
    this.yR1();
    this.OnEnd(this.ckc);
  }
  vR1(t, i) {}
  yR1() {}
  OnEnd(t) {
    if (this.HFc) {
      this.HFc(t);
    }
    this.av();
  }
  av() {
    this.oUe = 0;
    this.CurCommandActionIndex = 0;
    this.pR1.clear();
    this.ckc = false;
    this._kc = [];
    this.HFc = undefined;
  }
  BindCommandQueueEndCallBack(t) {
    this.HFc = t;
  }
}
exports.DangoDungeonCommandQueue = DangoDungeonCommandQueue;
//# sourceMappingURL=DangoDungeonCommandQueue.js.map