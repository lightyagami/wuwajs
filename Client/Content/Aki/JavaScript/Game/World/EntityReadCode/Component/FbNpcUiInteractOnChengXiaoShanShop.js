"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcUiInteractOnChengXiaoShanShop = undefined;
const FbPlayFlow_1 = require("../Action/FbPlayFlow");
class FbNpcUiInteractOnChengXiaoShanShop {
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
    this.c6h = false;
    this.u6h = undefined;
    this.d6h = false;
    this.m6h = false;
  }
  static Create(t) {
    if (t) {
      return new FbNpcUiInteractOnChengXiaoShanShop(t);
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
  get FinishDeliverySequence() {
    if (!this.c6h) {
      this.c6h = true;
      this.u6h = this.FbDataInternal.finishDeliverySequence();
    }
    return this.u6h;
  }
  get ShowNpcWhilePlayingSequence() {
    if (!this.d6h) {
      this.d6h = true;
      this.m6h = this.FbDataInternal.showNpcWhilePlayingSequence();
    }
    return this.m6h;
  }
}
exports.FbNpcUiInteractOnChengXiaoShanShop = FbNpcUiInteractOnChengXiaoShanShop;
//# sourceMappingURL=FbNpcUiInteractOnChengXiaoShanShop.js.map