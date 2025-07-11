"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleGuideEvolveCard = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const PhantomArenaBattleGuideDataBase_1 = require("./PhantomArenaBattleGuideDataBase");
const PhantomArenaBattleGuideDefine_1 = require("./PhantomArenaBattleGuideDefine");
class PhantomArenaBattleGuideEvolveCard extends PhantomArenaBattleGuideDataBase_1.PhantomArenaBattleGuideDataBase {
  CheckCanExecute(e, a) {
    if (e === PhantomArenaBattleGuideDefine_1.GUIDE_INVALID_VALUE || a === PhantomArenaBattleGuideDefine_1.GUIDE_INVALID_VALUE) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "PhantomArenaBattleGuideEvolveCard invalid value", ["handIndex", e], ["battleIndex", a]);
      }
    }
    return (!this.Data.HandCardIndex || this.Data.HandCardIndex - PhantomArenaBattleGuideDefine_1.GUIDE_PARAM_VALUE_OFFSET === e) && (!this.Data.BoardPosIndexList || !!this.Data.BoardPosIndexList.includes(a + PhantomArenaBattleGuideDefine_1.GUIDE_PARAM_VALUE_OFFSET));
  }
}
exports.PhantomArenaBattleGuideEvolveCard = PhantomArenaBattleGuideEvolveCard;
//# sourceMappingURL=PhantomArenaBattleGuideEvolveCard.js.map