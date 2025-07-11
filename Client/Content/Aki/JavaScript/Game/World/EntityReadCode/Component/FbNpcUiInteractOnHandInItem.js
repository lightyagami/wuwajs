"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcUiInteractOnHandInItem = undefined;
const FbPlayFlow_1 = require("../Action/FbPlayFlow");
class FbNpcUiInteractOnHandInItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.K4h = false;
    this.$4h = undefined;
    this.X4h = false;
    this.Y4h = undefined;
    this.S6h = false;
    this.M6h = undefined;
    this.Z4h = false;
    this.e6h = undefined;
    this.E6h = false;
    this.I6h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNpcUiInteractOnHandInItem(t);
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
  get HandInFailedMontage() {
    if (!this.S6h) {
      this.S6h = true;
      this.M6h = this.FbDataInternal.handInFailedMontage();
    }
    return this.M6h;
  }
  get EnterFlow() {
    if (!this.Z4h) {
      this.Z4h = true;
      this.e6h = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.enterFlow());
    }
    return this.e6h;
  }
  get HandInFailedFlow() {
    if (!this.E6h) {
      this.E6h = true;
      this.I6h = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.handInFailedFlow());
    }
    return this.I6h;
  }
}
exports.FbNpcUiInteractOnHandInItem = FbNpcUiInteractOnHandInItem;
//# sourceMappingURL=FbNpcUiInteractOnHandInItem.js.map