"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnterOrbitalCameraControlByMove = undefined;
class FbEnterOrbitalCameraControlByMove {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Mbh = false;
    this.Ebh = undefined;
    this.Ibh = false;
    this.Tbh = 0;
    this.bbh = false;
    this.Lbh = 0;
    this.Abh = false;
    this.xbh = 0;
    this.Rbh = false;
    this.wbh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbEnterOrbitalCameraControlByMove(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get LevelSequence() {
    if (!this.Mbh) {
      this.Mbh = true;
      this.Ebh = this.FbDataInternal.levelSequence();
    }
    return this.Ebh;
  }
  get BlendInTime() {
    if (!this.Ibh) {
      this.Ibh = true;
      this.Tbh = this.FbDataInternal.blendInTime();
    }
    return this.Tbh;
  }
  get BlendOutTime() {
    if (!this.bbh) {
      this.bbh = true;
      this.Lbh = this.FbDataInternal.blendOutTime();
    }
    return this.Lbh;
  }
  get BegEntity() {
    if (!this.Abh) {
      this.Abh = true;
      this.xbh = this.FbDataInternal.begEntity();
    }
    return this.xbh;
  }
  get EndEntity() {
    if (!this.Rbh) {
      this.Rbh = true;
      this.wbh = this.FbDataInternal.endEntity();
    }
    return this.wbh;
  }
}
exports.FbEnterOrbitalCameraControlByMove = FbEnterOrbitalCameraControlByMove;
//# sourceMappingURL=FbEnterOrbitalCameraControlByMove.js.map