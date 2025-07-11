"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAddBuffToEntity = undefined;
class FbAddBuffToEntity {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.V1h = false;
    this.j1h = undefined;
    this.Vph = false;
    this.jph = undefined;
    this.Hph = false;
    this.Wph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAddBuffToEntity(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var i = this.FbDataInternal.entityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
  get BuffIds() {
    if (!this.Vph) {
      this.Vph = true;
      this.jph = new Array();
      var i = this.FbDataInternal.buffIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.jph.push(Number(this.FbDataInternal.buffIds(t) ?? 0));
        }
      }
    }
    return this.jph;
  }
  get PersistOnOfflineBuffIds() {
    if (!this.Hph) {
      this.Hph = true;
      this.Wph = new Array();
      var i = this.FbDataInternal.persistOnOfflineBuffIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.Wph.push(Number(this.FbDataInternal.persistOnOfflineBuffIds(t) ?? 0));
        }
      }
    }
    return this.Wph;
  }
}
exports.FbAddBuffToEntity = FbAddBuffToEntity;
//# sourceMappingURL=FbAddBuffToEntity.js.map