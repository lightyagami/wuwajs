"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleGuideMagicUseCardFromHand = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const PhantomArenaBattleGuideDataBase_1 = require("./PhantomArenaBattleGuideDataBase");
const PhantomArenaBattleGuideDefine_1 = require("./PhantomArenaBattleGuideDefine");
class PhantomArenaBattleGuideMagicUseCardFromHand extends PhantomArenaBattleGuideDataBase_1.PhantomArenaBattleGuideDataBase {
  CheckCanExecute(e) {
    if (e === PhantomArenaBattleGuideDefine_1.GUIDE_INVALID_VALUE && Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 10, "PhantomArenaBattleGuideMagicUseCardFromHand invalid value", ["handIndex", e]);
    }
    return !this.Data.HandCardIndex || this.Data.HandCardIndex - PhantomArenaBattleGuideDefine_1.GUIDE_PARAM_VALUE_OFFSET === e;
  }
}
exports.PhantomArenaBattleGuideMagicUseCardFromHand = PhantomArenaBattleGuideMagicUseCardFromHand;
//# sourceMappingURL=PhantomArenaBattleGuideMagicUseCardFromHand.js.map