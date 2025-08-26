"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleGuideFactory = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const PhantomArenaBattleGuideEndTime_1 = require("./PhantomArenaBattleGuideEndTime");
const PhantomArenaBattleGuideEvolveCard_1 = require("./PhantomArenaBattleGuideEvolveCard");
const PhantomArenaBattleGuideMagicUseCardFromHand_1 = require("./PhantomArenaBattleGuideMagicUseCardFromHand");
const PhantomArenaBattleGuideMagicUseCardFromMonster_1 = require("./PhantomArenaBattleGuideMagicUseCardFromMonster");
const PhantomArenaBattleGuideRecycleCardFromHand_1 = require("./PhantomArenaBattleGuideRecycleCardFromHand");
const PhantomArenaBattleGuideRecycleCardFromMonster_1 = require("./PhantomArenaBattleGuideRecycleCardFromMonster");
const PhantomArenaBattleGuideSettingCard_1 = require("./PhantomArenaBattleGuideSettingCard");
class PhantomArenaBattleGuideFactory {
  static GetGuideData(e, a) {
    var t = this.M1u.get(e);
    if (t) {
      return new t(e, a);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 10, "声骸竞技场定制引导类型不存在!代码未进行注册", ["type", e]);
    }
    throw new Error("未注册的声骸竞技场定制类型: " + e);
  }
}
(exports.PhantomArenaBattleGuideFactory = PhantomArenaBattleGuideFactory).M1u = new Map([["BvbDeploy", PhantomArenaBattleGuideSettingCard_1.PhantomArenaBattleGuideSettingCard], ["BvbEvolution", PhantomArenaBattleGuideEvolveCard_1.PhantomArenaBattleGuideEvolveCard], ["BvbChangeHandCard", PhantomArenaBattleGuideMagicUseCardFromHand_1.PhantomArenaBattleGuideMagicUseCardFromHand], ["BvbChangeBoardCard", PhantomArenaBattleGuideMagicUseCardFromMonster_1.PhantomArenaBattleGuideMagicUseCardFromMonster], ["BvbRecycleHandCard", PhantomArenaBattleGuideRecycleCardFromHand_1.PhantomArenaBattleGuideRecycleCardFromHand], ["BvbRecycleBoardCard", PhantomArenaBattleGuideRecycleCardFromMonster_1.PhantomArenaBattleGuideRecycleCardFromMonster], ["BvbChangeHandCard", PhantomArenaBattleGuideMagicUseCardFromHand_1.PhantomArenaBattleGuideMagicUseCardFromHand], ["BvbEndTurn", PhantomArenaBattleGuideEndTime_1.PhantomArenaBattleGuideEndTime]]);
//# sourceMappingURL=PhantomArenaBattleGuideFactory.js.map