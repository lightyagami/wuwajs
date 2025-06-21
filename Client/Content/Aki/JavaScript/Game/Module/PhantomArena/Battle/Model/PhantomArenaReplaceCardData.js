"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaReplaceCardData = void 0;
const PhantomCardData_1 = require("./PhantomCardData");
class PhantomArenaReplaceCardData {
  constructor() {
    this.NQ = new Map, this.ReplaceNum = 0
  }
  SetReplaceCardData(a) {
    for (const e of a) {
      var t = new PhantomCardData_1.PhantomCardData;
      t.InitData(e), this.NQ.set(t.CardId, t)
    }
  }
  GetReplaceCardDataList() {
    return Array.from(this.NQ.values())
  }
  ClearReplaceCardData() {
    this.NQ.clear()
  }
}
exports.PhantomArenaReplaceCardData = PhantomArenaReplaceCardData;
//# sourceMappingURL=PhantomArenaReplaceCardData.js.map