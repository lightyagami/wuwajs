"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGravityFlipTeleportConfig = undefined;
const UnionGravityDirectionHelper_1 = require("../Common/UnionGravityDirectionHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbGravityFlipTeleportConfig {
  constructor(i) {
    this.FbDataInternal = i;
    this.yUh = false;
    this.SUh = undefined;
    this.HVh = false;
    this.WVh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbGravityFlipTeleportConfig(i);
    }
  }
  get GravityDirection() {
    var i;
    var t;
    if (!this.yUh && (this.yUh = true, i = this.FbDataInternal.gravityDirectionType(), t = UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.GetUnionGravityDirectionObject(i))) {
      this.SUh = UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.ReadUnionGravityDirection(i, this.FbDataInternal.gravityDirection(t));
    }
    return this.SUh;
  }
  get SafeLocation() {
    if (!this.HVh) {
      this.HVh = true;
      this.WVh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.safeLocation());
    }
    return this.WVh;
  }
}
exports.FbGravityFlipTeleportConfig = FbGravityFlipTeleportConfig;
//# sourceMappingURL=FbGravityFlipTeleportConfig.js.map