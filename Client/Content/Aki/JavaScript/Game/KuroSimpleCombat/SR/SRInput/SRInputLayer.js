"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueInputLayer = undefined;
const InputEnums_1 = require("../../../Input/InputEnums");
const InputLayer_1 = require("../../../Input/InputLayer");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class SurvivorsRogueInputLayer extends InputLayer_1.InputLayer {
  GetLayerType() {
    return 7;
  }
  HandlePress(e, r) {
    switch (e) {
      case InputEnums_1.EInputAction.闪避:
        return;
      case InputEnums_1.EInputAction.技能1:
        this.Fwd();
        return SurvivorsRogueInputLayer.GetSwallowCommand();
    }
    return SurvivorsRogueInputLayer.GetSwallowCommand();
  }
  HandleRelease(e, r) {
    return SurvivorsRogueInputLayer.GetSwallowCommand();
  }
  HandleHold(e, r) {
    return SurvivorsRogueInputLayer.GetSwallowCommand();
  }
  Fwd() {
    var e = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubController;
    if (e) {
      e.ExecSkillAction();
    }
  }
}
exports.SurvivorsRogueInputLayer = SurvivorsRogueInputLayer;
//# sourceMappingURL=SRInputLayer.js.map