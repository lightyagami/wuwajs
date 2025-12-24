"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleGuideUseFieldCardSkill = undefined;
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
const PhantomArenaSkillInteractFactory_1 = require("../SkillInteract/PhantomArenaSkillInteractFactory");
const PhantomArenaBattleGuideDataBase_1 = require("./PhantomArenaBattleGuideDataBase");
class PhantomArenaBattleGuideUseFieldCardSkill extends PhantomArenaBattleGuideDataBase_1.PhantomArenaBattleGuideDataBase {
  constructor() {
    super(...arguments);
    this.CardId = PhantomArenaDefine_1.INVALID_CARD_ID;
    this.SkillId = 0;
  }
  CheckCanExecute() {
    return true;
  }
  CacheGuideData(e, t) {
    this.CardId = e;
    this.SkillId = t;
  }
  CheckCanFinishGuide(e, t) {
    return e === 0 && (!t.BuffType || !PhantomArenaSkillInteractFactory_1.PhantomArenaSkillInteractFactory.HasSkillInteract(t.BuffType)) && t.CardId === this.CardId;
  }
}
exports.PhantomArenaBattleGuideUseFieldCardSkill = PhantomArenaBattleGuideUseFieldCardSkill;
//# sourceMappingURL=PhantomArenaBattleGuideUseFieldCardSkill.js.map