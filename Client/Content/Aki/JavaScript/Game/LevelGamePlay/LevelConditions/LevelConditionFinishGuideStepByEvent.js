"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnViewReadyForGuide = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnViewReadyForGuide extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r, ...s) {
    return e.LimitParams.get("Tag") === s[0];
  }
}
exports.LevelConditionOnViewReadyForGuide = LevelConditionOnViewReadyForGuide;
//# sourceMappingURL=LevelConditionFinishGuideStepByEvent.js.map