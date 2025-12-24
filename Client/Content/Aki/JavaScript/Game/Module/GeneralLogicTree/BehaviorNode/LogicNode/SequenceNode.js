"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceNode = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GameBudgetCenterRoleController_1 = require("../../../GameBudget/GameBudgetCenterRoleController");
const LogicNodeBase_1 = require("./LogicNodeBase");
class SequenceNode extends LogicNodeBase_1.LogicNodeBase {
  constructor(e) {
    super(e);
    this.NodeType = "Sequence";
  }
  OnNodeActive() {
    super.OnNodeActive();
    var e = this.Config;
    if (e && e.PerformanceSetting?.EnableOptimize) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangePerformanceLimitMode, true, false);
    }
    if (this.Config.BudgetCameraType === "Role") {
      if (e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) {
        if ((e = e.Entity.GetComponent(1)?.Owner)?.IsValid()) {
          GameBudgetCenterRoleController_1.GameBudgetCenterRoleController.SetCenterRole(e);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 24, "SetRoleAsCameraToGameBudget: Current entity's actor is not valid!");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 24, "SetRoleAsCameraToGameBudget: ModelManager.FormationModel!.GetCurrentEntity is undefined!");
      }
    }
  }
  OnNodeDeActive(e) {
    super.OnNodeDeActive(e);
    e = this.Config;
    if (e && e.PerformanceSetting?.EnableOptimize) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangePerformanceLimitMode, false, false);
    }
  }
}
exports.SequenceNode = SequenceNode;
//# sourceMappingURL=SequenceNode.js.map