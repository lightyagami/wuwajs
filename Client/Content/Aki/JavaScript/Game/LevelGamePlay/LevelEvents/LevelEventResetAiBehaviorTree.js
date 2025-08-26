"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventResetAiBehaviorTree = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventResetAiBehaviorTree extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (e) {
      ModelManager_1.ModelManager.AiModel?.ResetAiBehaviorTree(e.Key);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 42, "LevelEventResetAiBehaviorTree 参数配置错误");
    }
  }
}
exports.LevelEventResetAiBehaviorTree = LevelEventResetAiBehaviorTree;
//# sourceMappingURL=LevelEventResetAiBehaviorTree.js.map