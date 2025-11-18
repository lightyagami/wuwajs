"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnSceneItemDurabilityEmpty = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnSceneItemDurabilityEmpty extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, t, ...n) {
    return !!e.LimitParams && (!(e = e.LimitParams.get("EntityTemplateId")) || !(e = Number(e), isNaN(e) || n[0]?.GetComponent(0)?.GetTemplateId() !== e));
  }
}
exports.LevelConditionOnSceneItemDurabilityEmpty = LevelConditionOnSceneItemDurabilityEmpty;
//# sourceMappingURL=LevelConditionOnSceneItemDurabilityEmpty.js.map