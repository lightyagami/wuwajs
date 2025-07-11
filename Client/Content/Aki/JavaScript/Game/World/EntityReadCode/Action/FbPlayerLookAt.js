"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayerLookAt = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPlayerLookAt {
  constructor(t) {
    this.FbDataInternal = t;
    this.uch = false;
    this.dch = undefined;
    this.Ddh = false;
    this.Bdh = false;
  }
  static Create(t) {
    if (t) {
      return new FbPlayerLookAt(t);
    }
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
  get CameraMove() {
    if (!this.Ddh) {
      this.Ddh = true;
      this.Bdh = this.FbDataInternal.cameraMove();
    }
    return this.Bdh;
  }
}
exports.FbPlayerLookAt = FbPlayerLookAt;
//# sourceMappingURL=FbPlayerLookAt.js.map