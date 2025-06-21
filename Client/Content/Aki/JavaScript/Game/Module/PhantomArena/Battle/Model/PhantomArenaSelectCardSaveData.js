"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaSelectCardSaveData = void 0;
const PhantomCardData_1 = require("./PhantomCardData");
class PhantomArenaSelectCardSaveData {
  constructor() {
    this.ReserveCardNum = 0, this.CardDataList = []
  }
  InitData(a, t) {
    this.ReserveCardNum = a;
    for (const r of t) {
      var e = new PhantomCardData_1.PhantomCardData;
      e.InitData(r), this.CardDataList.push(e)
    }
  }
}
exports.PhantomArenaSelectCardSaveData = PhantomArenaSelectCardSaveData;
//# sourceMappingURL=PhantomArenaSelectCardSaveData.js.map