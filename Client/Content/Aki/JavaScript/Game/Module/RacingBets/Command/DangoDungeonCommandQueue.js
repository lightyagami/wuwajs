"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoDungeonCommandQueue = void 0;
const cpp_1 = require("cpp"),
  Log_1 = require("../../../../Core/Common/Log"),
  Macro_1 = require("../../../../Core/Preprocessor/Macro");
class DangoDungeonCommandQueue {
  constructor() {
    this.CurCommandActionIndex = 0, this.ckc = !1, this._kc = [], this.HFc = void 0, this.Wb1 = new Map, this.nG1 = void 0, this.oUe = 0
  }
  Init() {
    this.av()
  }
  AddCommand(t) {
    this.ckc || this._kc.push(t)
  }
  Abort() {
    this.nG1 && (this.nG1.IsAborted = !0), this.ckc = !0
  }
  async Execute() {
    for (; 0 < this._kc.length && !this.ckc;) try {
      var t = cpp_1.KuroTime.GetMicroseconds64(),
        i = (this.nG1 = this._kc.shift(), 0 < this.nG1.ActionIndex && (this.CurCommandActionIndex = this.nG1.ActionIndex), await this.nG1.Execute(), cpp_1.KuroTime.GetMicroseconds64());
      this.oUe += i - t, this.Qb1(this.nG1.CommandType, i - t)
    } catch (t) {
      t instanceof Error ? Log_1.Log.CheckError() && Log_1.Log.ErrorWithStack("RacingBetsDungeon", 58, "DangoDungeonCommandQueue Execute异常", t, ["error", t.message]) : Log_1.Log.CheckError() && Log_1.Log.Error("RacingBetsDungeon", 58, "DangoDungeonCommandQueue Execute异常", ["error", t])
    }
    this.Kb1(), this.OnEnd(this.ckc)
  }
  Qb1(t, i) {}
  Kb1() {}
  OnEnd(t) {
    this.HFc && this.HFc(t), this.av()
  }
  av() {
    this.oUe = 0, this.CurCommandActionIndex = 0, this.Wb1.clear(), this.ckc = !1, this._kc = [], this.HFc = void 0
  }
  BindCommandQueueEndCallBack(t) {
    this.HFc = t
  }
}
exports.DangoDungeonCommandQueue = DangoDungeonCommandQueue;
//# sourceMappingURL=DangoDungeonCommandQueue.js.map