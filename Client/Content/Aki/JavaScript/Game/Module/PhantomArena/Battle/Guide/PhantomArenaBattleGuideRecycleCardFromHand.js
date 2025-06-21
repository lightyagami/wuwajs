"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleGuideRecycleCardFromHand = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  PhantomArenaBattleGuideDataBase_1 = require("./PhantomArenaBattleGuideDataBase"),
  PhantomArenaBattleGuideDefine_1 = require("./PhantomArenaBattleGuideDefine");
class PhantomArenaBattleGuideRecycleCardFromHand extends PhantomArenaBattleGuideDataBase_1.PhantomArenaBattleGuideDataBase {
  CheckCanExecute(e) {
    return e === PhantomArenaBattleGuideDefine_1.GUIDE_INVALID_VALUE && Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "PhantomArenaBattleGuideRecycleCardFromHand invalid value", ["battleIndex", e]), !this.Data.HandCardIndex || this.Data.HandCardIndex - PhantomArenaBattleGuideDefine_1.GUIDE_PARAM_VALUE_OFFSET === e
  }
}
exports.PhantomArenaBattleGuideRecycleCardFromHand = PhantomArenaBattleGuideRecycleCardFromHand;
//# sourceMappingURL=PhantomArenaBattleGuideRecycleCardFromHand.js.map