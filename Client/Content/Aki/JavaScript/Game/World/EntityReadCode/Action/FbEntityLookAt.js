"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityLookAt = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbEntityLookAt {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.uch = false;
    this.dch = undefined;
    this.Ddh = false;
    this.Bdh = false;
  }
  static Create(t) {
    if (t) {
      return new FbEntityLookAt(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
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
exports.FbEntityLookAt = FbEntityLookAt;
//# sourceMappingURL=FbEntityLookAt.js.map