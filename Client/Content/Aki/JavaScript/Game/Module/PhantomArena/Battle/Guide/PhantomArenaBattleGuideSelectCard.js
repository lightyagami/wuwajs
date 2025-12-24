"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleGuideSelectCard = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const PhantomArenaBattleGuideDataBase_1 = require("./PhantomArenaBattleGuideDataBase");
const PhantomArenaBattleGuideDefine_1 = require("./PhantomArenaBattleGuideDefine");
class PhantomArenaBattleGuideSelectCard extends PhantomArenaBattleGuideDataBase_1.PhantomArenaBattleGuideDataBase {
  CheckCanExecute(e) {
    if (e === PhantomArenaBattleGuideDefine_1.GUIDE_INVALID_VALUE && Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 10, "PhantomArenaBattleGuideRecycleCardFromMonster invalid value", ["cardId", e]);
    }
    return !this.Data.CardIdList || !!this.Data.CardIdList.includes(e);
  }
}
exports.PhantomArenaBattleGuideSelectCard = PhantomArenaBattleGuideSelectCard;
//# sourceMappingURL=PhantomArenaBattleGuideSelectCard.js.map