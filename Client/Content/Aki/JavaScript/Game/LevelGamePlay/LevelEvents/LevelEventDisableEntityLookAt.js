"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventDisableEntityLookAt = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventDisableEntityLookAt extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (e) {
      ModelManager_1.ModelManager.AiModel?.DisableEntityLookAt(e.Key);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 42, "LevelEventDisableEntityLookAt 参数配置错误");
    }
  }
}
exports.LevelEventDisableEntityLookAt = LevelEventDisableEntityLookAt;
//# sourceMappingURL=LevelEventDisableEntityLookAt.js.map