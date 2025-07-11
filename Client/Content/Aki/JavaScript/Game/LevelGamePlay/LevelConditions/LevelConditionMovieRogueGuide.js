"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckGridHasExplored = exports.LevelConditionCheckMapRogueEventDetailShow = exports.LevelConditionOnMapRogueEventDetailShow = exports.LevelConditionOnMovieRogueMapMoveEnd = exports.LevelConditionOnMovieRogueLinkRefresh = exports.LevelConditionCheckMovieRogueFinishedEndingCount = exports.LevelConditionOnMovieRogueInfoRefreshWithMultipleEnds = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnMovieRogueInfoRefreshWithMultipleEnds extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var [o] = o;
    return ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetInstDungeonEndingTotalCount(o) > 1;
  }
}
exports.LevelConditionOnMovieRogueInfoRefreshWithMultipleEnds = LevelConditionOnMovieRogueInfoRefreshWithMultipleEnds;
class LevelConditionCheckMovieRogueFinishedEndingCount extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var o;
    return !!e.LimitParams && (o = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId(), e = Number(e.LimitParams.get("TargetCount")), [o] = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingCount(o), e <= o);
  }
}
exports.LevelConditionCheckMovieRogueFinishedEndingCount = LevelConditionCheckMovieRogueFinishedEndingCount;
class LevelConditionOnMovieRogueLinkRefresh extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var [o] = o;
    return o;
  }
}
exports.LevelConditionOnMovieRogueLinkRefresh = LevelConditionOnMovieRogueLinkRefresh;
class LevelConditionOnMovieRogueMapMoveEnd extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var [o] = o;
    return !o;
  }
}
exports.LevelConditionOnMovieRogueMapMoveEnd = LevelConditionOnMovieRogueMapMoveEnd;
class LevelConditionOnMapRogueEventDetailShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var [o] = o;
    return o;
  }
}
exports.LevelConditionOnMapRogueEventDetailShow = LevelConditionOnMapRogueEventDetailShow;
class LevelConditionCheckMapRogueEventDetailShow extends LevelGeneralBase_1.LevelConditionBase {
  constructor() {
    super(...arguments);
    this.xC = false;
  }
  Check(e, n, ...o) {
    if (o && o.length > 0) {
      this.xC = o[0];
    }
    return this.xC;
  }
}
exports.LevelConditionCheckMapRogueEventDetailShow = LevelConditionCheckMapRogueEventDetailShow;
class LevelConditionCheckGridHasExplored extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = Number(e.LimitParams.get("GridIndex"));
    return ModelManager_1.ModelManager.MapRogueModel.GameInfo?.MapGrids[e]?.IsExplore ?? false;
  }
}
exports.LevelConditionCheckGridHasExplored = LevelConditionCheckGridHasExplored;
//# sourceMappingURL=LevelConditionMovieRogueGuide.js.map