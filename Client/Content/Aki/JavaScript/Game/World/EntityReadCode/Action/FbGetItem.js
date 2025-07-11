"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGetItem = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbItemData_1 = require("./FbItemData");
const UnionItemGetUiConfigHelper_1 = require("./UnionItemGetUiConfigHelper");
class FbGetItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.tuh = false;
    this.iuh = undefined;
    this.ruh = false;
    this.ouh = undefined;
    this.nuh = false;
    this.suh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGetItem(t);
    }
  }
  get Items() {
    if (!this.tuh) {
      this.tuh = true;
      this.iuh = new Array();
      var i = this.FbDataInternal.itemsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.items(t, new fb_action_1.ItemData());
          this.iuh.push(FbItemData_1.FbItemData.Create(e));
        }
      }
    }
    return this.iuh;
  }
  get UiType() {
    if (!this.ruh) {
      this.ruh = true;
      this.ouh = this.FbDataInternal.uiType();
    }
    return this.ouh;
  }
  get UiConfig() {
    var t;
    var i;
    if (!this.nuh && (this.nuh = true, t = this.FbDataInternal.uiConfigType(), i = UnionItemGetUiConfigHelper_1.UnionItemGetUiConfigHelper.GetUnionItemGetUiConfigObject(t))) {
      this.suh = UnionItemGetUiConfigHelper_1.UnionItemGetUiConfigHelper.ReadUnionItemGetUiConfig(t, this.FbDataInternal.uiConfig(i));
    }
    return this.suh;
  }
}
exports.FbGetItem = FbGetItem;
//# sourceMappingURL=FbGetItem.js.map