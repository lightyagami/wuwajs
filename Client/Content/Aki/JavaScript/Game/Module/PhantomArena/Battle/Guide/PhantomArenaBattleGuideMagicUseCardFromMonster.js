"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleGuideMagicUseCardFromMonster = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  PhantomArenaBattleGuideDataBase_1 = require("./PhantomArenaBattleGuideDataBase"),
  PhantomArenaBattleGuideDefine_1 = require("./PhantomArenaBattleGuideDefine");
class PhantomArenaBattleGuideMagicUseCardFromMonster extends PhantomArenaBattleGuideDataBase_1.PhantomArenaBattleGuideDataBase {
  CheckCanExecute(e) {
    return e === PhantomArenaBattleGuideDefine_1.GUIDE_INVALID_VALUE && Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "PhantomArenaBattleGuideMagicUseCardFromMonster invalid value", ["battleIndex", e]), !(this.Data.BoardPosIndexList && !this.Data.BoardPosIndexList.includes(e + PhantomArenaBattleGuideDefine_1.GUIDE_PARAM_VALUE_OFFSET))
  }
}
exports.PhantomArenaBattleGuideMagicUseCardFromMonster = PhantomArenaBattleGuideMagicUseCardFromMonster;
//# sourceMappingURL=PhantomArenaBattleGuideMagicUseCardFromMonster.js.map