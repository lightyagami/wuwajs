"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiDecoratorEntityState = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorEntityState extends LevelAiDecorator_1.LevelAiDecorator {
  constructor() {
    super(...arguments);
    this.gIe = () => {
      var e = this.CheckCondition(1);
      this.NotifyEventBasedCondition(e);
    };
  }
  OnExecutionStart() {
    var e = this.Params;
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId))?.Valid) {
      EventSystem_1.EventSystem.AddWithTarget(e.Entity, EventDefine_1.EEventName.OnGameplayTagChanged, this.gIe);
    }
  }
  OnExecutionFinish() {
    var e = this.Params;
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId))?.Valid) {
      EventSystem_1.EventSystem.RemoveWithTarget(e.Entity, EventDefine_1.EEventName.OnGameplayTagChanged, this.gIe);
    }
  }
  CheckCondition(e) {
    var t;
    var r = this.Params;
    return !!r && !!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r.EntityId))?.Valid && !!(t = t.Entity.GetComponent(197)) && (t = t.ContainsTagByName(r.State), r.Compare === "Eq" ? t : !t);
  }
}
exports.LevelAiDecoratorEntityState = LevelAiDecoratorEntityState;
//# sourceMappingURL=LevelAiDecoratorEntityState.js.map