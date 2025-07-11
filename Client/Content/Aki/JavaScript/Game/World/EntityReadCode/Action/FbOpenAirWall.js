"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenAirWall = undefined;
class FbOpenAirWall {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.GLh = false;
    this.OLh = undefined;
    this.FLh = false;
    this.NLh = 0;
    this.VLh = false;
    this.jLh = undefined;
    this.HLh = false;
    this.WLh = 0;
    this.QLh = false;
    this.KLh = 0;
    this.$Lh = false;
    this.XLh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbOpenAirWall(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get HitEffectData() {
    if (!this.GLh) {
      this.GLh = true;
      this.OLh = this.FbDataInternal.hitEffectData();
    }
    return this.OLh;
  }
  get HitCd() {
    if (!this.FLh) {
      this.FLh = true;
      this.NLh = this.FbDataInternal.hitCd();
    }
    return this.NLh;
  }
  get AirWallEffectData() {
    if (!this.VLh) {
      this.VLh = true;
      this.jLh = this.FbDataInternal.airWallEffectData();
    }
    return this.jLh;
  }
  get AirWallEffectHeight() {
    if (!this.HLh) {
      this.HLh = true;
      this.WLh = this.FbDataInternal.airWallEffectHeight();
    }
    return this.WLh;
  }
  get AirWallEffectThickness() {
    if (!this.QLh) {
      this.QLh = true;
      this.KLh = this.FbDataInternal.airWallEffectThickness();
    }
    return this.KLh;
  }
  get CollisionPreset() {
    if (!this.$Lh) {
      this.$Lh = true;
      this.XLh = this.FbDataInternal.collisionPreset();
    }
    return this.XLh;
  }
}
exports.FbOpenAirWall = FbOpenAirWall;
//# sourceMappingURL=FbOpenAirWall.js.map