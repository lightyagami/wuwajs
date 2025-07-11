"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsInteractionUtils_1 = require("../Module/Interaction/TsInteractionUtils");
class LevelGeneralBpBridge extends UE.Object {
  Constructor() {}
  HandleCoditionInteractOption(e, t, n, r) {
    return false;
  }
  TriggerLevelGeneralEvents(e, t) {}
  HandleConditionalEventListen(e) {}
  HandleConditionPush(e) {}
  OpenInteractHints() {
    TsInteractionUtils_1.TsInteractionUtils.OpenInteractHintView();
  }
  CloseInteractHints() {
    TsInteractionUtils_1.TsInteractionUtils.CloseInteractHintView();
  }
}
exports.default = LevelGeneralBpBridge;
//# sourceMappingURL=LevelGeneralBpBridge.js.map