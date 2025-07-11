"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckDangoMatchFinalEnd = exports.LevelConditionCheckDangoMatchPlayerNumType = exports.LevelConditionCheckDangoMatchState = exports.LevelConditionOnEnterDangoMatchView = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnEnterDangoMatchView extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    return true;
  }
}
exports.LevelConditionOnEnterDangoMatchView = LevelConditionOnEnterDangoMatchView;
class LevelConditionCheckDangoMatchState extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var n;
    return !!e.LimitParams && (e = Number(e.LimitParams.get("State")), !!(n = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData())) && !!(n = n.GetCurLegMatchData()) && n.GetLegMatchState() === e;
  }
}
exports.LevelConditionCheckDangoMatchState = LevelConditionCheckDangoMatchState;
class LevelConditionCheckDangoMatchPlayerNumType extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var n;
    var t;
    return !!e.LimitParams && (e = Number(e.LimitParams.get("Type")), !!(n = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData())) && !!(n = n.GetCurLegMatchData()) && (t = n.GetLegMatchState(), n.GetRacingBetsMainViewActorShowType(t) === e);
  }
}
exports.LevelConditionCheckDangoMatchPlayerNumType = LevelConditionCheckDangoMatchPlayerNumType;
class LevelConditionCheckDangoMatchFinalEnd extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var n;
    var t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    return !!t && !!(t = t.GetCurLegMatchData()) && (n = ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(t.Id), t = t.GetLegMatchState() === 4, n) && t;
  }
}
exports.LevelConditionCheckDangoMatchFinalEnd = LevelConditionCheckDangoMatchFinalEnd;
//# sourceMappingURL=LevelConditionDangoMatchGuide.js.map