"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiDecoratorEntityState = undefined;
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
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
    var e;
    var t = this.Params;
    if (t && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.EntityId))?.Valid) {
      t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.State);
      e.Entity.GetComponent(206)?.AddTagAddOrRemoveListener(t, this.gIe);
    }
  }
  OnExecutionFinish() {
    var e;
    var t = this.Params;
    if (t && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.EntityId))?.Valid) {
      t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.State);
      e.Entity.GetComponent(206)?.RemoveTagAddOrRemoveListener(t, this.gIe);
    }
  }
  CheckCondition(e) {
    var t;
    var a = this.Params;
    return !!a && !!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a.EntityId))?.Valid && !!(t = t.Entity.GetComponent(206)) && (t = t.ContainsTagByName(a.State), a.Compare === "Eq" ? t : !t);
  }
}
exports.LevelAiDecoratorEntityState = LevelAiDecoratorEntityState;
//# sourceMappingURL=LevelAiDecoratorEntityState.js.map