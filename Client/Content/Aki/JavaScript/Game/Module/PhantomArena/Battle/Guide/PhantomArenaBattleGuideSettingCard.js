"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleGuideSettingCard = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  PhantomArenaBattleGuideDataBase_1 = require("./PhantomArenaBattleGuideDataBase"),
  PhantomArenaBattleGuideDefine_1 = require("./PhantomArenaBattleGuideDefine");
class PhantomArenaBattleGuideSettingCard extends PhantomArenaBattleGuideDataBase_1.PhantomArenaBattleGuideDataBase {
  CheckCanExecute(e, t) {
    return e !== PhantomArenaBattleGuideDefine_1.GUIDE_INVALID_VALUE && t !== PhantomArenaBattleGuideDefine_1.GUIDE_INVALID_VALUE || Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "PhantomArenaBattleGuideSettingCard invalid value", ["handIndex", e], ["battleIndex", t]), !(this.Data.HandCardIndex && this.Data.HandCardIndex - PhantomArenaBattleGuideDefine_1.GUIDE_PARAM_VALUE_OFFSET !== e || this.Data.BoardPosIndexList && !this.Data.BoardPosIndexList.includes(t + PhantomArenaBattleGuideDefine_1.GUIDE_PARAM_VALUE_OFFSET))
  }
}
exports.PhantomArenaBattleGuideSettingCard = PhantomArenaBattleGuideSettingCard;
//# sourceMappingURL=PhantomArenaBattleGuideSettingCard.js.map