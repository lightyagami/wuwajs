"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataAimed = undefined;
class BulletDataAimed {
  constructor(t) {
    this.KVo = undefined;
    this.QVo = undefined;
    this.XVo = undefined;
    this.Pe = t;
  }
  get AimedCtrlDir() {
    if (this.KVo === undefined) {
      this.KVo = this.Pe.瞄准发射;
    }
    return this.KVo;
  }
  get AngleOffset() {
    if (this.QVo === undefined) {
      this.QVo = this.Pe.瞄准子弹最大偏转角度;
    }
    return this.QVo;
  }
  get DistLimit() {
    if (this.XVo === undefined) {
      this.XVo = this.Pe.瞄准子弹最大射程;
    }
    return this.XVo;
  }
}
exports.BulletDataAimed = BulletDataAimed;
//# sourceMappingURL=BulletDataAimed.js.map