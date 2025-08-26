"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetAiBehaviorTree = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetAiBehaviorTree extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (e) {
      ModelManager_1.ModelManager.AiModel?.SetAiBehaviorTree(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 42, "LevelEventSetAiBehaviorTree 参数配置错误");
    }
  }
}
exports.LevelEventSetAiBehaviorTree = LevelEventSetAiBehaviorTree;
//# sourceMappingURL=LevelEventSetAiBehaviorTree.js.map