"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionSelfTagCheck = undefined;
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionSelfTagCheck extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, l) {
    return !!e.LimitParams && !!l && !!(e = e.LimitParams.get("Tag")) && l.Tags.Contains(FNameUtil_1.FNameUtil.GetDynamicFName(e));
  }
}
exports.LevelConditionSelfTagCheck = LevelConditionSelfTagCheck;
//# sourceMappingURL=LevelConditionSelfTagCheck.js.map