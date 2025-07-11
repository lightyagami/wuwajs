"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityGravityConfig = undefined;
const UnionGravityDirectionHelper_1 = require("../Common/UnionGravityDirectionHelper");
class FbEntityGravityConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.yUh = false;
    this.SUh = undefined;
    this.MUh = false;
    this.EUh = false;
    this.IUh = false;
    this.TUh = false;
  }
  static Create(t) {
    if (t) {
      return new FbEntityGravityConfig(t);
    }
  }
  get GravityDirection() {
    var t;
    var i;
    if (!this.yUh && (this.yUh = true, t = this.FbDataInternal.gravityDirectionType(), i = UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.GetUnionGravityDirectionObject(t))) {
      this.SUh = UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.ReadUnionGravityDirection(t, this.FbDataInternal.gravityDirection(i));
    }
    return this.SUh;
  }
  get SpecifyGravityLoad() {
    if (!this.MUh) {
      this.MUh = true;
      this.EUh = this.FbDataInternal.specifyGravityLoad();
    }
    return this.EUh;
  }
  get SpecifyGravityLock() {
    if (!this.IUh) {
      this.IUh = true;
      this.TUh = this.FbDataInternal.specifyGravityLock();
    }
    return this.TUh;
  }
}
exports.FbEntityGravityConfig = FbEntityGravityConfig;
//# sourceMappingURL=FbEntityGravityConfig.js.map