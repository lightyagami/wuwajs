"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleGuideMagicUseCardFromMonster = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const PhantomArenaBattleGuideDataBase_1 = require("./PhantomArenaBattleGuideDataBase");
const PhantomArenaBattleGuideDefine_1 = require("./PhantomArenaBattleGuideDefine");
class PhantomArenaBattleGuideMagicUseCardFromMonster extends PhantomArenaBattleGuideDataBase_1.PhantomArenaBattleGuideDataBase {
  CheckCanExecute(e) {
    if (e === PhantomArenaBattleGuideDefine_1.GUIDE_INVALID_VALUE && Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 10, "PhantomArenaBattleGuideMagicUseCardFromMonster invalid value", ["battleIndex", e]);
    }
    return !this.Data.BoardPosIndexList || !!this.Data.BoardPosIndexList.includes(e + PhantomArenaBattleGuideDefine_1.GUIDE_PARAM_VALUE_OFFSET);
  }
}
exports.PhantomArenaBattleGuideMagicUseCardFromMonster = PhantomArenaBattleGuideMagicUseCardFromMonster;
//# sourceMappingURL=PhantomArenaBattleGuideMagicUseCardFromMonster.js.map