"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleGuideDataBase = undefined;
class PhantomArenaBattleGuideDataBase {
  constructor(t, e) {
    this.Type = t;
    this.Param = e;
    this.Data = undefined;
    this.Tips = "";
    this.Tips = this.Param.TidPromptTxt;
    this.Data = this.Param.EnableOperation;
  }
  CacheGuideData() {}
  CheckCanFinishGuide() {
    return true;
  }
}
exports.PhantomArenaBattleGuideDataBase = PhantomArenaBattleGuideDataBase;
//# sourceMappingURL=PhantomArenaBattleGuideDataBase.js.map