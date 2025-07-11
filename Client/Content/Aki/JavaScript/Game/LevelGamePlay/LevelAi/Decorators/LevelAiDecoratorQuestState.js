"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiDecoratorQuestState = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorQuestState extends LevelAiDecorator_1.LevelAiDecorator {
  constructor() {
    super(...arguments);
    this.DSe = e => {
      var t = this.Params;
      if (t && t.QuestId === e) {
        t = this.CheckCondition(1);
        this.NotifyEventBasedCondition(t);
      }
    };
  }
  OnExecutionStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
  }
  OnExecutionFinish() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
  }
  CheckCondition(e) {
    var t = this.Params;
    if (!t) {
      return false;
    }
    var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t.QuestId);
    let s = false;
    switch (t.Compare) {
      case "Eq":
        s = r === t.State;
        break;
      case "Ne":
        s = r !== t.State;
        break;
      case "Ge":
        s = r >= t.State;
        break;
      case "Gt":
        s = r > t.State;
        break;
      case "Le":
        s = r <= t.State;
        break;
      case "Lt":
        s = r < t.State;
    }
    return s;
  }
}
exports.LevelAiDecoratorQuestState = LevelAiDecoratorQuestState;
//# sourceMappingURL=LevelAiDecoratorQuestState.js.map