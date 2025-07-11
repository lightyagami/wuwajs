"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventCalculateVar = undefined;
const Log_1 = require("../../../Core/Common/Log");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralNetworks_1 = require("../LevelGeneralNetworks");
class LevelEventCalculateVar extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l, r) {
    if (e) {
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestDoAction(r, l);
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 7, "LevelEventCalculateVar, 对变量进行运算参数为空");
      }
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventCalculateVar = LevelEventCalculateVar;
//# sourceMappingURL=LevelEventCalculateVar.js.map