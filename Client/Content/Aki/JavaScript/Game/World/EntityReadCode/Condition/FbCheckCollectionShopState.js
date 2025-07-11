"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckCollectionShopState = undefined;
class FbCheckCollectionShopState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.dJh = false;
    this.mJh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckCollectionShopState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ShopType() {
    if (!this.dJh) {
      this.dJh = true;
      this.mJh = this.FbDataInternal.shopType();
    }
    return this.mJh;
  }
}
exports.FbCheckCollectionShopState = FbCheckCollectionShopState;
//# sourceMappingURL=FbCheckCollectionShopState.js.map