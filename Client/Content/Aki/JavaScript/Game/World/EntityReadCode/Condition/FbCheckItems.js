"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckItems = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbItemConfig_1 = require("./FbItemConfig");
class FbCheckItems {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.tuh = false;
    this.iuh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckItems(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get Items() {
    if (!this.tuh) {
      this.tuh = true;
      this.iuh = new Array();
      var i = this.FbDataInternal.itemsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.items(t, new fb_condition_1.ItemConfig());
          this.iuh.push(FbItemConfig_1.FbItemConfig.Create(s));
        }
      }
    }
    return this.iuh;
  }
}
exports.FbCheckItems = FbCheckItems;
//# sourceMappingURL=FbCheckItems.js.map