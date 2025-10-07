"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckFightPhotoLevelFinished = undefined;
const ActivityControllerHolder_1 = require("../../Module/Activity/ActivityControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFightPhotoLevelFinished extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var t = Number(e.LimitParams?.get("LevelId"));
    var e = ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController?.GetActivityData();
    if (e) {
      for (const r of e.GetLevelGroupDataList()) {
        for (const i of r.LevelDataList) {
          if (i.LevelId === t) {
            return i.IsFinished;
          }
        }
      }
    }
    return false;
  }
}
exports.LevelConditionCheckFightPhotoLevelFinished = LevelConditionCheckFightPhotoLevelFinished;
//# sourceMappingURL=LevelConditionFightPhotoGuide.js.map