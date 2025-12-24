"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTabData = undefined;
class CommonTabData {
  constructor(t, e, s) {
    this.xbt = t;
    this.wbt = e;
    this._Dm = s;
    this.Bbt = "";
  }
  SetSmallIcon(t) {
    this.Bbt = t;
  }
  GetSmallIcon() {
    return this.Bbt || this.GetIcon();
  }
  GetIcon() {
    return this.xbt;
  }
  GetTitleData() {
    return this.wbt;
  }
  GetTabItemTitleData() {
    return this._Dm;
  }
}
exports.CommonTabData = CommonTabData;
//# sourceMappingURL=CommonTabData.js.map