"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTipData = undefined;
class FloroRanchTipData {
  constructor() {
    this.TipType = 0;
    this.MainEntityData = undefined;
    this.SubEntityData = undefined;
    this.LastTipType = 0;
    this.LastMainEntityData = undefined;
    this.LastSubEntityData = undefined;
    this.TipType = 0;
    this.MainEntityData = undefined;
    this.SubEntityData = undefined;
    this.LastTipType = 0;
    this.LastMainEntityData = undefined;
    this.LastSubEntityData = undefined;
  }
  ChangeTipInfo(i, t, s) {
    this.LastTipType = this.TipType;
    this.LastMainEntityData = this.MainEntityData;
    this.LastSubEntityData = this.SubEntityData;
    this.TipType = i;
    this.MainEntityData = t;
    this.SubEntityData = s;
  }
  Clear() {
    this.ChangeTipInfo(0, undefined, undefined);
  }
}
exports.FloroRanchTipData = FloroRanchTipData;
//# sourceMappingURL=FloroRanchTipData.js.map