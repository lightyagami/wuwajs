"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangePhantomFormation = undefined;
class FbChangePhantomFormation {
  constructor(t) {
    this.FbDataInternal = t;
    this.mbh = false;
    this.Cbh = 0;
    this.gbh = false;
    this.fbh = false;
    this.$Th = false;
    this.XTh = 0;
    this.pbh = false;
    this.vbh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChangePhantomFormation(t);
    }
  }
  get FormationId() {
    if (!this.mbh) {
      this.mbh = true;
      this.Cbh = this.FbDataInternal.formationId();
    }
    return this.Cbh;
  }
  get RetainRole() {
    if (!this.gbh) {
      this.gbh = true;
      this.fbh = this.FbDataInternal.retainRole();
    }
    return this.fbh;
  }
  get TeleportEntityId() {
    if (!this.$Th) {
      this.$Th = true;
      this.XTh = this.FbDataInternal.teleportEntityId();
    }
    return this.XTh;
  }
  get AppendBuffIds() {
    if (!this.pbh) {
      this.pbh = true;
      this.vbh = new Array();
      var i = this.FbDataInternal.appendBuffIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.vbh.push(Number(this.FbDataInternal.appendBuffIds(t) ?? 0));
        }
      }
    }
    return this.vbh;
  }
}
exports.FbChangePhantomFormation = FbChangePhantomFormation;
//# sourceMappingURL=FbChangePhantomFormation.js.map