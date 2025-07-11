"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleControl2 = undefined;
const FbBulletCfg_1 = require("./FbBulletCfg");
const FbDestroyCfg_1 = require("./FbDestroyCfg");
const FbHoldCfg_1 = require("./FbHoldCfg");
const FbSearchTargetCfg_1 = require("./FbSearchTargetCfg");
const FbTeleControlBaseCfg_1 = require("./FbTeleControlBaseCfg");
const FbThrowCfg_1 = require("./FbThrowCfg");
class FbTeleControl2 {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.QNh = false;
    this.KNh = undefined;
    this.$Nh = false;
    this.XNh = undefined;
    this.YNh = false;
    this.zNh = undefined;
    this.JNh = false;
    this.ZNh = undefined;
    this.e2h = false;
    this.t2h = undefined;
    this.i2h = false;
    this.r2h = undefined;
    this.fGh = false;
    this.pGh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTeleControl2(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get BaseCfg() {
    if (!this.QNh) {
      this.QNh = true;
      this.KNh = FbTeleControlBaseCfg_1.FbTeleControlBaseCfg.Create(this.FbDataInternal.baseCfg());
    }
    return this.KNh;
  }
  get SearchTargetCfg() {
    if (!this.$Nh) {
      this.$Nh = true;
      this.XNh = FbSearchTargetCfg_1.FbSearchTargetCfg.Create(this.FbDataInternal.searchTargetCfg());
    }
    return this.XNh;
  }
  get BulletCfg() {
    if (!this.YNh) {
      this.YNh = true;
      this.zNh = FbBulletCfg_1.FbBulletCfg.Create(this.FbDataInternal.bulletCfg());
    }
    return this.zNh;
  }
  get DestroyCfg() {
    if (!this.JNh) {
      this.JNh = true;
      this.ZNh = FbDestroyCfg_1.FbDestroyCfg.Create(this.FbDataInternal.destroyCfg());
    }
    return this.ZNh;
  }
  get HoldCfg() {
    if (!this.e2h) {
      this.e2h = true;
      this.t2h = FbHoldCfg_1.FbHoldCfg.Create(this.FbDataInternal.holdCfg());
    }
    return this.t2h;
  }
  get ThrowCfg() {
    if (!this.i2h) {
      this.i2h = true;
      this.r2h = FbThrowCfg_1.FbThrowCfg.Create(this.FbDataInternal.throwCfg());
    }
    return this.r2h;
  }
  get PlayerStateRestritionId() {
    if (!this.fGh) {
      this.fGh = true;
      this.pGh = this.FbDataInternal.playerStateRestritionId();
    }
    return this.pGh;
  }
}
exports.FbTeleControl2 = FbTeleControl2;
//# sourceMappingURL=FbTeleControl2.js.map