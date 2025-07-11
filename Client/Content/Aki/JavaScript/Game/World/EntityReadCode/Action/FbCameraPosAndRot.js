"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCameraPosAndRot = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCameraPosAndRot {
  constructor(t) {
    this.FbDataInternal = t;
    this._fh = false;
    this.cfh = undefined;
    this.ufh = false;
    this.dfh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCameraPosAndRot(t);
    }
  }
  get CameraOffset() {
    if (!this._fh) {
      this._fh = true;
      this.cfh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.cameraOffset());
    }
    return this.cfh;
  }
  get CameraRotate() {
    if (!this.ufh) {
      this.ufh = true;
      this.dfh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.cameraRotate());
    }
    return this.dfh;
  }
}
exports.FbCameraPosAndRot = FbCameraPosAndRot;
//# sourceMappingURL=FbCameraPosAndRot.js.map