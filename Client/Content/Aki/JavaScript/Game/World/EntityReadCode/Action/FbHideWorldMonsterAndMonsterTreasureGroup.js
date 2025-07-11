"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHideWorldMonsterAndMonsterTreasureGroup = undefined;
class FbHideWorldMonsterAndMonsterTreasureGroup {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.hxh = false;
    this.lxh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHideWorldMonsterAndMonsterTreasureGroup(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get HideRangeEntities() {
    if (!this.hxh) {
      this.hxh = true;
      this.lxh = new Array();
      var e = this.FbDataInternal.hideRangeEntitiesLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.lxh.push(this.FbDataInternal.hideRangeEntities(t));
        }
      }
    }
    return this.lxh;
  }
}
exports.FbHideWorldMonsterAndMonsterTreasureGroup = FbHideWorldMonsterAndMonsterTreasureGroup;
//# sourceMappingURL=FbHideWorldMonsterAndMonsterTreasureGroup.js.map