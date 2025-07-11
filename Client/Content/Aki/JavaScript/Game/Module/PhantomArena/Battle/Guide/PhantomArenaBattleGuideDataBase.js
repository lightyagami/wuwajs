"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleGuideDataBase = undefined;
class PhantomArenaBattleGuideDataBase {
  constructor(t, s) {
    this.Type = t;
    this.Param = s;
    this.Data = undefined;
    this.Tips = "";
    this.Tips = this.Param.TidPromptTxt;
    this.Data = this.Param.EnableOperation;
  }
}
exports.PhantomArenaBattleGuideDataBase = PhantomArenaBattleGuideDataBase;
//# sourceMappingURL=PhantomArenaBattleGuideDataBase.js.map