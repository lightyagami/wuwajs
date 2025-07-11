"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetVar = undefined;
const Log_1 = require("../../../Core/Common/Log");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralNetworks_1 = require("../LevelGeneralNetworks");
class LevelEventSetVar extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r, t) {
    if (e) {
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestDoAction(t, r);
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 7, "LevelEventSetVar, 设定变量的值参数为空");
      }
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventSetVar = LevelEventSetVar;
//# sourceMappingURL=LevelEventSetVar.js.map