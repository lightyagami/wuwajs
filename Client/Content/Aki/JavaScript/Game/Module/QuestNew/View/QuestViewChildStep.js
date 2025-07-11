"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestViewChildStep = undefined;
const ue_1 = require("ue");
const StepWithStatusItem_1 = require("../../BattleUi/Views/MissionView/TreeStep/StepWithStatusItem");
class QuestViewChildStep extends StepWithStatusItem_1.StepWithStatusItem {
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([5, ue_1.UISprite]);
  }
  OnStart() {
    super.OnStart();
  }
  UpdateStepInfo() {
    super.UpdateStepInfo();
    this.GetSprite(5)?.SetUIActive(!this.IsDescribeTextVisible || !this.StatusNodeVisible);
  }
  CheckCanShowStatusRoot() {
    return true;
  }
}
exports.QuestViewChildStep = QuestViewChildStep;
//# sourceMappingURL=QuestViewChildStep.js.map