"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcUiInteractOnAntiqueShop = undefined;
const FbPlayFlow_1 = require("../Action/FbPlayFlow");
const UnionMontageConfigHelper_1 = require("../Action/UnionMontageConfigHelper");
class FbNpcUiInteractOnAntiqueShop {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.K4h = false;
    this.$4h = undefined;
    this.X4h = false;
    this.Y4h = undefined;
    this.z4h = false;
    this.J4h = undefined;
    this.Z4h = false;
    this.e6h = undefined;
    this.t6h = false;
    this.i6h = undefined;
    this.r6h = false;
    this.o6h = undefined;
    this.n6h = false;
    this.s6h = undefined;
    this.a6h = false;
    this.h6h = undefined;
    this.l6h = false;
    this._6h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNpcUiInteractOnAntiqueShop(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EnterMontage() {
    if (!this.K4h) {
      this.K4h = true;
      this.$4h = this.FbDataInternal.enterMontage();
    }
    return this.$4h;
  }
  get StandByMontage() {
    if (!this.X4h) {
      this.X4h = true;
      this.Y4h = this.FbDataInternal.standByMontage();
    }
    return this.Y4h;
  }
  get ShopSuccessMontage() {
    if (!this.z4h) {
      this.z4h = true;
      this.J4h = this.FbDataInternal.shopSuccessMontage();
    }
    return this.J4h;
  }
  get EnterFlow() {
    if (!this.Z4h) {
      this.Z4h = true;
      this.e6h = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.enterFlow());
    }
    return this.e6h;
  }
  get ShopFailedFlow() {
    if (!this.t6h) {
      this.t6h = true;
      this.i6h = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.shopFailedFlow());
    }
    return this.i6h;
  }
  get ShopSuccessFlow() {
    if (!this.r6h) {
      this.r6h = true;
      this.o6h = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.shopSuccessFlow());
    }
    return this.o6h;
  }
  get UpgradeSequence() {
    if (!this.n6h) {
      this.n6h = true;
      this.s6h = this.FbDataInternal.upgradeSequence();
    }
    return this.s6h;
  }
  get ExitMontage() {
    var t;
    var i;
    if (!this.a6h && (this.a6h = true, t = this.FbDataInternal.exitMontageType(), i = UnionMontageConfigHelper_1.UnionMontageConfigHelper.GetUnionMontageConfigObject(t))) {
      this.h6h = UnionMontageConfigHelper_1.UnionMontageConfigHelper.ReadUnionMontageConfig(t, this.FbDataInternal.exitMontage(i));
    }
    return this.h6h;
  }
  get ExitFlow() {
    if (!this.l6h) {
      this.l6h = true;
      this._6h = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.exitFlow());
    }
    return this._6h;
  }
}
exports.FbNpcUiInteractOnAntiqueShop = FbNpcUiInteractOnAntiqueShop;
//# sourceMappingURL=FbNpcUiInteractOnAntiqueShop.js.map