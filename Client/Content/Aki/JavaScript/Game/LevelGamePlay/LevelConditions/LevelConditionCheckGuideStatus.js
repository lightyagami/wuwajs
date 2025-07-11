"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckGuideStatus = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckGuideStatus extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (!e.LimitParams || !e.LimitParamsOpe) {
      return false;
    }
    var t = e.LimitParams.get("GuideGroupId");
    var a = e.LimitParams.get("Status");
    let s = e.LimitParamsOpe.get("Status");
    if (!t || !a) {
      return false;
    }
    s = s || "";
    return ModelManager_1.ModelManager.GuideModel.CheckGroupStatus(parseInt(t), parseInt(a), s);
  }
}
exports.LevelConditionCheckGuideStatus = LevelConditionCheckGuideStatus;
//# sourceMappingURL=LevelConditionCheckGuideStatus.js.map