"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDisableAlertAreaDungeonCondition = undefined;
class FbDisableAlertAreaDungeonCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.WSh = false;
    this.QSh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbDisableAlertAreaDungeonCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get RelatedDungeonId() {
    if (!this.WSh) {
      this.WSh = true;
      this.QSh = this.FbDataInternal.relatedDungeonId();
    }
    return this.QSh;
  }
}
exports.FbDisableAlertAreaDungeonCondition = FbDisableAlertAreaDungeonCondition;
//# sourceMappingURL=FbDisableAlertAreaDungeonCondition.js.map