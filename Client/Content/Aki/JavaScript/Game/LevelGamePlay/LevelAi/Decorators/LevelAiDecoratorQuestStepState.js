"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiDecoratorQuestStepState = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorQuestStepState extends LevelAiDecorator_1.LevelAiDecorator {
  constructor() {
    super(...arguments);
    this.fIe = e => {
      var t = this.Params;
      if (t && e && t.QuestId === e.TreeConfigId && t.ChildQuestId === e.NodeId) {
        t = this.CheckCondition(1);
        this.NotifyEventBasedCondition(t);
      }
    };
  }
  OnExecutionStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.fIe);
  }
  OnExecutionFinish() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.fIe);
  }
  CheckCondition(e) {
    var t = this.Params;
    if (!t) {
      return false;
    }
    let r = false;
    switch (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t.QuestId)) {
      case 0:
      case 1:
        r = false;
        break;
      case 3:
        r = true;
        break;
      case 2:
        var n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.QuestId)?.GetNode(t.ChildQuestId);
        r = n?.IsSuccess ?? false;
    }
    if ((t.Compare ?? "Eq") === "Eq") {
      return r;
    } else {
      return !r;
    }
  }
}
exports.LevelAiDecoratorQuestStepState = LevelAiDecoratorQuestStepState;
//# sourceMappingURL=LevelAiDecoratorQuestStepState.js.map