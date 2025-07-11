"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFollowTrackToFoundation = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbFollowTrackToFoundation {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.$6h = false;
    this.X6h = 0;
    this.Y6h = false;
    this.z6h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFollowTrackToFoundation(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get FoundationId() {
    if (!this.$6h) {
      this.$6h = true;
      this.X6h = this.FbDataInternal.foundationId();
    }
    return this.X6h;
  }
  get FinalOffset() {
    if (!this.Y6h) {
      this.Y6h = true;
      this.z6h = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.finalOffset());
    }
    return this.z6h;
  }
}
exports.FbFollowTrackToFoundation = FbFollowTrackToFoundation;
//# sourceMappingURL=FbFollowTrackToFoundation.js.map