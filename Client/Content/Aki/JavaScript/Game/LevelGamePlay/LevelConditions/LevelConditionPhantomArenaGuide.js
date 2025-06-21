"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelConditionOnPhantomArenaChildViewShow = exports.LevelConditionCheckPhantomArenaChallengeId = exports.LevelConditionOnGetSpCard = exports.LevelConditionOnMonsterNumReachLimit = exports.LevelConditionOnCardDetailShowWithFactor = exports.LevelConditionOnHandCardsShow = void 0;
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  BATTLE_CARD_NUM_LIMIT = 4;
class LevelConditionOnHandCardsShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...r) {
    var [r] = r;
    return r
  }
}
exports.LevelConditionOnHandCardsShow = LevelConditionOnHandCardsShow;
class LevelConditionOnCardDetailShowWithFactor extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return !0
  }
}
exports.LevelConditionOnCardDetailShowWithFactor = LevelConditionOnCardDetailShowWithFactor;
class LevelConditionOnMonsterNumReachLimit extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData?.GetBattleCardDataList()?.length ?? 0) >= BATTLE_CARD_NUM_LIMIT
  }
}
exports.LevelConditionOnMonsterNumReachLimit = LevelConditionOnMonsterNumReachLimit;
class LevelConditionOnGetSpCard extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...r) {
    var [r] = r;
    for (const o of r) {
      var a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData?.GetHandCardDataByCardId(o);
      if (a && a.IsFourCost) return !0
    }
    return !1
  }
}
exports.LevelConditionOnGetSpCard = LevelConditionOnGetSpCard;
class LevelConditionCheckPhantomArenaChallengeId extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return Number(e.LimitParams.get("ChallengeId")) === ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId
  }
}
exports.LevelConditionCheckPhantomArenaChallengeId = LevelConditionCheckPhantomArenaChallengeId;
class LevelConditionOnPhantomArenaChildViewShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...r) {
    var [r] = r;
    return e.LimitParams.get("ViewName") === r
  }
}
exports.LevelConditionOnPhantomArenaChildViewShow = LevelConditionOnPhantomArenaChildViewShow;
//# sourceMappingURL=LevelConditionPhantomArenaGuide.js.map