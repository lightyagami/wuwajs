"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GiftItemData = exports.InventoryGiftData = undefined;
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
class InventoryGiftData extends UiPopViewData_1.UiPopViewData {
  constructor(t, i, s, e, o) {
    super();
    this.InitializedSelectedId = undefined;
    this.SelectedCount = undefined;
    this.ConfigId = t;
    var a = i.length;
    this.ItemList = [];
    for (let t = 0; t < a; t++) {
      this.ItemList.push(i[t]);
    }
    this.GiftPackage = s;
    this.InitializedSelectedId = e;
    this.SelectedCount = o;
  }
}
exports.InventoryGiftData = InventoryGiftData;
class GiftItemData {
  constructor(t, i, s) {
    this.ItemId = undefined;
    this.ItemCount = undefined;
    this.IncId = undefined;
    this.PhantomItemData = undefined;
    this.ItemId = t;
    this.ItemCount = i;
    this.IncId = s;
  }
  SetPhantomItemData(t) {
    this.PhantomItemData = t;
  }
}
exports.GiftItemData = GiftItemData;
//# sourceMappingURL=InventoryGiftData.js.map