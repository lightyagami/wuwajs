"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleGuideUseItemCardSkill = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
const PhantomArenaSkillInteractFactory_1 = require("../SkillInteract/PhantomArenaSkillInteractFactory");
const PhantomArenaBattleGuideDataBase_1 = require("./PhantomArenaBattleGuideDataBase");
const PhantomArenaBattleGuideDefine_1 = require("./PhantomArenaBattleGuideDefine");
class PhantomArenaBattleGuideUseItemCardSkill extends PhantomArenaBattleGuideDataBase_1.PhantomArenaBattleGuideDataBase {
  constructor() {
    super(...arguments);
    this.CardId = PhantomArenaDefine_1.INVALID_CARD_ID;
  }
  CheckCanExecute(e) {
    if (e === PhantomArenaBattleGuideDefine_1.GUIDE_INVALID_VALUE && Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 10, "PhantomArenaBattleGuideUseItemCardSkill invalid value", ["battleIndex", e]);
    }
    return !this.Data.BoardPosIndexList || !!this.Data.BoardPosIndexList.includes(e + PhantomArenaBattleGuideDefine_1.GUIDE_PARAM_VALUE_OFFSET);
  }
  CacheGuideData(e) {
    this.CardId = e;
  }
  CheckCanFinishGuide(e, t) {
    return e === 0 && (!t.BuffType || !PhantomArenaSkillInteractFactory_1.PhantomArenaSkillInteractFactory.HasSkillInteract(t.BuffType)) && t.CardId === this.CardId;
  }
}
exports.PhantomArenaBattleGuideUseItemCardSkill = PhantomArenaBattleGuideUseItemCardSkill;
//# sourceMappingURL=PhantomArenaBattleGuideUseItemCardSkill.js.map