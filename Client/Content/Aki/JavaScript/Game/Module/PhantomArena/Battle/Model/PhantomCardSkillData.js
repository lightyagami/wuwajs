"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomCardSkillData = undefined;
class PhantomCardSkillData {
  constructor() {
    this.CardId = 0;
    this.Unlock = false;
    this.TargetNum = 0;
    this.CurNum = 0;
  }
  RefreshData(t) {
    this.CardId = t.J7n;
    this.Unlock = t.CMs;
    this.TargetNum = t.uGm;
    this.CurNum = t.cGm;
  }
}
exports.PhantomCardSkillData = PhantomCardSkillData;
//# sourceMappingURL=PhantomCardSkillData.js.map