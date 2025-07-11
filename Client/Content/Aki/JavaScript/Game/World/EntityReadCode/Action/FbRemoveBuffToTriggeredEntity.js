"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRemoveBuffToTriggeredEntity = undefined;
class FbRemoveBuffToTriggeredEntity {
  constructor(t) {
    this.FbDataInternal = t;
    this.Vph = false;
    this.jph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRemoveBuffToTriggeredEntity(t);
    }
  }
  get BuffIds() {
    if (!this.Vph) {
      this.Vph = true;
      this.jph = new Array();
      var e = this.FbDataInternal.buffIdsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.jph.push(Number(this.FbDataInternal.buffIds(t) ?? 0));
        }
      }
    }
    return this.jph;
  }
}
exports.FbRemoveBuffToTriggeredEntity = FbRemoveBuffToTriggeredEntity;
//# sourceMappingURL=FbRemoveBuffToTriggeredEntity.js.map