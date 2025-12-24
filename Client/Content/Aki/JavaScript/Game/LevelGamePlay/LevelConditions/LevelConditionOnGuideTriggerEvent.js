"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnGuideTriggerEvent = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnGuideTriggerEvent extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r, ...n) {
    return !!e?.LimitParams && (e = e.LimitParams.get("Name"), n[0] === e);
  }
}
exports.LevelConditionOnGuideTriggerEvent = LevelConditionOnGuideTriggerEvent;
//# sourceMappingURL=LevelConditionOnGuideTriggerEvent.js.map