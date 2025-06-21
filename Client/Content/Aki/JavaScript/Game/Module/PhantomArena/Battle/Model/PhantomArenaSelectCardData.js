"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaSelectCardData = void 0;
const PhantomCardData_1 = require("./PhantomCardData");
class PhantomArenaSelectCardData {
  constructor() {
    this.SelectCardDataList = [], this.SelectNum = 0
  }
  n31(t) {
    var a = new PhantomCardData_1.PhantomCardData;
    a.InitData(t), this.SelectCardDataList.push(a)
  }
  SetSelectCardDataList(t) {
    this.SelectCardDataList = [];
    for (const a of t) this.n31(a)
  }
  GetSelectCardDataList() {
    return this.SelectCardDataList
  }
}
exports.PhantomArenaSelectCardData = PhantomArenaSelectCardData;
//# sourceMappingURL=PhantomArenaSelectCardData.js.map