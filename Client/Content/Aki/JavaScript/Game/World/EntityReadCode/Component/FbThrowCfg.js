"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbThrowCfg = undefined;
const UnionThrowMotionHelper_1 = require("./UnionThrowMotionHelper");
class FbThrowCfg {
  constructor(o) {
    this.FbDataInternal = o;
    this.L2h = false;
    this.A2h = undefined;
  }
  static Create(o) {
    if (o) {
      return new FbThrowCfg(o);
    }
  }
  get MotionConfig() {
    var o;
    var t;
    if (!this.L2h && (this.L2h = true, o = this.FbDataInternal.motionConfigType(), t = UnionThrowMotionHelper_1.UnionThrowMotionHelper.GetUnionThrowMotionObject(o))) {
      this.A2h = UnionThrowMotionHelper_1.UnionThrowMotionHelper.ReadUnionThrowMotion(o, this.FbDataInternal.motionConfig(t));
    }
    return this.A2h;
  }
}
exports.FbThrowCfg = FbThrowCfg;
//# sourceMappingURL=FbThrowCfg.js.map