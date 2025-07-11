"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleGuideSettingCard = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const PhantomArenaBattleGuideDataBase_1 = require("./PhantomArenaBattleGuideDataBase");
const PhantomArenaBattleGuideDefine_1 = require("./PhantomArenaBattleGuideDefine");
class PhantomArenaBattleGuideSettingCard extends PhantomArenaBattleGuideDataBase_1.PhantomArenaBattleGuideDataBase {
  CheckCanExecute(e, t) {
    if (e === PhantomArenaBattleGuideDefine_1.GUIDE_INVALID_VALUE || t === PhantomArenaBattleGuideDefine_1.GUIDE_INVALID_VALUE) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "PhantomArenaBattleGuideSettingCard invalid value", ["handIndex", e], ["battleIndex", t]);
      }
    }
    return (!this.Data.HandCardIndex || this.Data.HandCardIndex - PhantomArenaBattleGuideDefine_1.GUIDE_PARAM_VALUE_OFFSET === e) && (!this.Data.BoardPosIndexList || !!this.Data.BoardPosIndexList.includes(t + PhantomArenaBattleGuideDefine_1.GUIDE_PARAM_VALUE_OFFSET));
  }
}
exports.PhantomArenaBattleGuideSettingCard = PhantomArenaBattleGuideSettingCard;
//# sourceMappingURL=PhantomArenaBattleGuideSettingCard.js.map