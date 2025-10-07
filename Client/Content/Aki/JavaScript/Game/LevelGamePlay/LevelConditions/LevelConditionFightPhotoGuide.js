"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckFightPhotoHasTarget = exports.LevelConditionCheckFightPhotoLevelFinished = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ActivityControllerHolder_1 = require("../../Module/Activity/ActivityControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFightPhotoLevelFinished extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var r = Number(e.LimitParams?.get("LevelId"));
    var e = ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController?.GetActivityData();
    if (e) {
      for (const t of e.GetLevelGroupDataList()) {
        for (const l of t.LevelDataList) {
          if (l.LevelId === r) {
            return l.IsFinished;
          }
        }
      }
    }
    return false;
  }
}
exports.LevelConditionCheckFightPhotoLevelFinished = LevelConditionCheckFightPhotoLevelFinished;
class LevelConditionCheckFightPhotoHasTarget extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    return !!ControllerHolder_1.ControllerHolder.PhotographController.CurrentBtNode;
  }
}
exports.LevelConditionCheckFightPhotoHasTarget = LevelConditionCheckFightPhotoHasTarget;
//# sourceMappingURL=LevelConditionFightPhotoGuide.js.map