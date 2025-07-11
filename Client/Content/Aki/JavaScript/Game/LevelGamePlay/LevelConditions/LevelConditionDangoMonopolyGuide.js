"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnDangoMonopolyCameraFocusOnMainDango = exports.LevelConditionOnDangoMonopolyViewShowProcessEnd = exports.LevelConditionOnDangoMonopolyViewStart = exports.LevelConditionOnDangoMonopolyMoveStop = exports.LevelConditionCheckDangoMonopolyHasFinishedRound = undefined;
const ActivityDangoMonopolyController_1 = require("../../Module/Activity/ActivityContent/DangoMonopoly/ActivityDangoMonopolyController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDangoMonopolyHasFinishedRound extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    return (ActivityDangoMonopolyController_1.ActivityDangoMonopolyController.GetData()?.GetFinishedRoundNum() ?? 0) > 0;
  }
}
exports.LevelConditionCheckDangoMonopolyHasFinishedRound = LevelConditionCheckDangoMonopolyHasFinishedRound;
class LevelConditionOnDangoMonopolyMoveStop extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...n) {
    var [n] = n;
    return !n;
  }
}
exports.LevelConditionOnDangoMonopolyMoveStop = LevelConditionOnDangoMonopolyMoveStop;
class LevelConditionOnDangoMonopolyViewStart extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    return true;
  }
}
exports.LevelConditionOnDangoMonopolyViewStart = LevelConditionOnDangoMonopolyViewStart;
class LevelConditionOnDangoMonopolyViewShowProcessEnd extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...n) {
    var [n] = n;
    return !n;
  }
}
exports.LevelConditionOnDangoMonopolyViewShowProcessEnd = LevelConditionOnDangoMonopolyViewShowProcessEnd;
class LevelConditionOnDangoMonopolyCameraFocusOnMainDango extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    return true;
  }
}
exports.LevelConditionOnDangoMonopolyCameraFocusOnMainDango = LevelConditionOnDangoMonopolyCameraFocusOnMainDango;
//# sourceMappingURL=LevelConditionDangoMonopolyGuide.js.map