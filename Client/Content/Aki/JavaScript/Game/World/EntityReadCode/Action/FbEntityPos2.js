"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityPos2 = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbEntityPos2 {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.Kdh = false;
    this.$dh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityPos2(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get Offset() {
    if (!this.Kdh) {
      this.Kdh = true;
      this.$dh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.offset());
    }
    return this.$dh;
  }
}
exports.FbEntityPos2 = FbEntityPos2;
//# sourceMappingURL=FbEntityPos2.js.map