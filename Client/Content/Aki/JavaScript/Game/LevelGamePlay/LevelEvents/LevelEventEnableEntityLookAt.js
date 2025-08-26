"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEnableEntityLookAt = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnableEntityLookAt extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (e) {
      ModelManager_1.ModelManager.AiModel?.EnableEntityLookAt(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 42, "LevelEventEnableEntityLookAt 参数配置错误");
    }
  }
}
exports.LevelEventEnableEntityLookAt = LevelEventEnableEntityLookAt;
//# sourceMappingURL=LevelEventEnableEntityLookAt.js.map