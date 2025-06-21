"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleGuideFactory = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  PhantomArenaBattleGuideEndTime_1 = require("./PhantomArenaBattleGuideEndTime"),
  PhantomArenaBattleGuideEvolveCard_1 = require("./PhantomArenaBattleGuideEvolveCard"),
  PhantomArenaBattleGuideMagicUseCardFromHand_1 = require("./PhantomArenaBattleGuideMagicUseCardFromHand"),
  PhantomArenaBattleGuideMagicUseCardFromMonster_1 = require("./PhantomArenaBattleGuideMagicUseCardFromMonster"),
  PhantomArenaBattleGuideRecycleCardFromHand_1 = require("./PhantomArenaBattleGuideRecycleCardFromHand"),
  PhantomArenaBattleGuideRecycleCardFromMonster_1 = require("./PhantomArenaBattleGuideRecycleCardFromMonster"),
  PhantomArenaBattleGuideSettingCard_1 = require("./PhantomArenaBattleGuideSettingCard");
class PhantomArenaBattleGuideFactory {
  static GetGuideData(e, a) {
    var t = this.wnu.get(e);
    if (t) return new t(e, a);
    throw Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "声骸竞技场定制引导类型不存在!代码未进行注册", ["type", e]), new Error("未注册的声骸竞技场定制类型: " + e)
  }
}(exports.PhantomArenaBattleGuideFactory = PhantomArenaBattleGuideFactory).wnu = new Map([
  ["BvbDeploy", PhantomArenaBattleGuideSettingCard_1.PhantomArenaBattleGuideSettingCard],
  ["BvbEvolution", PhantomArenaBattleGuideEvolveCard_1.PhantomArenaBattleGuideEvolveCard],
  ["BvbChangeHandCard", PhantomArenaBattleGuideMagicUseCardFromHand_1.PhantomArenaBattleGuideMagicUseCardFromHand],
  ["BvbChangeBoardCard", PhantomArenaBattleGuideMagicUseCardFromMonster_1.PhantomArenaBattleGuideMagicUseCardFromMonster],
  ["BvbRecycleHandCard", PhantomArenaBattleGuideRecycleCardFromHand_1.PhantomArenaBattleGuideRecycleCardFromHand],
  ["BvbRecycleBoardCard", PhantomArenaBattleGuideRecycleCardFromMonster_1.PhantomArenaBattleGuideRecycleCardFromMonster],
  ["BvbChangeHandCard", PhantomArenaBattleGuideMagicUseCardFromHand_1.PhantomArenaBattleGuideMagicUseCardFromHand],
  ["BvbEndTurn", PhantomArenaBattleGuideEndTime_1.PhantomArenaBattleGuideEndTime]
]);
//# sourceMappingURL=PhantomArenaBattleGuideFactory.js.map