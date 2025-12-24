"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionMotorMovieModeStateChange = undefined;
const Log_1 = require("../../../Core/Common/Log");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionMotorMovieModeStateChange extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...t) {
    var r = e?.LimitParams?.get("State");
    if (r) {
      [t] = t;
      return (t ? 1 : 0) === Number(r);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 95, "条件：检查摩托车状态 需要配置状态作为参数", ["condition id", e?.Id]);
      }
      return false;
    }
  }
}
exports.LevelConditionMotorMovieModeStateChange = LevelConditionMotorMovieModeStateChange;
//# sourceMappingURL=LevelConditionMotorMovieModeStateChange.js.map