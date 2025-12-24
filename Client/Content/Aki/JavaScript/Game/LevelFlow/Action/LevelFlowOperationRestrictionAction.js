"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowOperationRestrictionAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const OperationRestrictUtils_1 = require("../../LevelGamePlay/OperationRestrict/OperationRestrictUtils");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowOperationRestrictionAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.vXd = undefined;
  }
  Init(e) {
    this.vXd = e;
    return this;
  }
  OnExecute() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, "Set Player Operation Action");
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 5, "关卡事件-设置玩家操作限制", ["配置param:", this.vXd]);
    }
    OperationRestrictUtils_1.OperationRestrictUtils.SetOperationRestrictByOption(this.vXd);
    this.FinishExecute(true);
  }
}
exports.LevelFlowOperationRestrictionAction = LevelFlowOperationRestrictionAction;
//# sourceMappingURL=LevelFlowOperationRestrictionAction.js.map