"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCameraLookAt = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCameraLookAt {
  constructor(t) {
    this.FbDataInternal = t;
    this.uch = false;
    this.dch = undefined;
    this.ISh = false;
    this.TSh = 0;
    this.mch = false;
    this.Cch = 0;
    this.gch = false;
    this.fch = 0;
    this.pch = false;
    this.vch = 0;
    this.ych = false;
    this.Sch = false;
    this.Mch = false;
    this.Ech = undefined;
    this.Aw1 = false;
    this.Pw1 = 0;
    this.tR1 = false;
    this.iR1 = false;
    this.Ich = false;
    this.Tch = 0;
    this.bch = false;
    this.Lch = false;
    this.Ach = false;
    this.xch = false;
    this.Rch = false;
    this.wch = false;
    this.Pch = false;
    this.Uch = false;
  }
  static Create(t) {
    if (t) {
      return new FbCameraLookAt(t);
    }
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
  get PosEntityId() {
    if (!this.ISh) {
      this.ISh = true;
      this.TSh = this.FbDataInternal.posEntityId();
    }
    return this.TSh;
  }
  get FadeInTime() {
    if (!this.mch) {
      this.mch = true;
      this.Cch = this.FbDataInternal.fadeInTime();
    }
    return this.Cch;
  }
  get StayTime() {
    if (!this.gch) {
      this.gch = true;
      this.fch = this.FbDataInternal.stayTime();
    }
    return this.fch;
  }
  get FadeOutTime() {
    if (!this.pch) {
      this.pch = true;
      this.vch = this.FbDataInternal.fadeOutTime();
    }
    return this.vch;
  }
  get LockCamera() {
    if (!this.ych) {
      this.ych = true;
      this.Sch = this.FbDataInternal.lockCamera();
    }
    return this.Sch;
  }
  get CameraPos() {
    if (!this.Mch) {
      this.Mch = true;
      this.Ech = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.cameraPos());
    }
    return this.Ech;
  }
  get CameraPosEntityId() {
    if (!this.Aw1) {
      this.Aw1 = true;
      this.Pw1 = this.FbDataInternal.cameraPosEntityId();
    }
    return this.Pw1;
  }
  get DisableCameraMoveWithCameraPos() {
    if (!this.tR1) {
      this.tR1 = true;
      this.iR1 = this.FbDataInternal.disableCameraMoveWithCameraPos();
    }
    return this.iR1;
  }
  get Fov() {
    if (!this.Ich) {
      this.Ich = true;
      this.Tch = this.FbDataInternal.fov();
    }
    return this.Tch;
  }
  get BanInput() {
    if (!this.bch) {
      this.bch = true;
      this.Lch = this.FbDataInternal.banInput();
    }
    return this.Lch;
  }
  get HideUi() {
    if (!this.Ach) {
      this.Ach = true;
      this.xch = this.FbDataInternal.hideUi();
    }
    return this.xch;
  }
  get CancelBuffer() {
    if (!this.Rch) {
      this.Rch = true;
      this.wch = this.FbDataInternal.cancelBuffer();
    }
    return this.wch;
  }
  get CancelBlendOut() {
    if (!this.Pch) {
      this.Pch = true;
      this.Uch = this.FbDataInternal.cancelBlendOut();
    }
    return this.Uch;
  }
}
exports.FbCameraLookAt = FbCameraLookAt;
//# sourceMappingURL=FbCameraLookAt.js.map