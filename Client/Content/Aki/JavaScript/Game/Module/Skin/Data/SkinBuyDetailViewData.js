"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinBuyDetailViewData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class SkinBuyDetailViewData {
  constructor() {
    this.fyl = [];
    this.vyl = [];
    this.NOe = 0;
    this.vUl = "";
  }
  static Create(t) {
    var e = new SkinBuyDetailViewData();
    e.InitData(t);
    return e;
  }
  static CreateByRoleSkinData(t) {
    var e = new SkinBuyDetailViewData();
    e.InitDataByRoleSkinData(t);
    return e;
  }
  SetPreviewTitle(t) {
    this.vUl = t;
  }
  GetPreviewTitle() {
    return this.vUl;
  }
  SetIndex(t) {
    this.NOe = t;
  }
  InitDataByRoleSkinData(t) {
    this.fyl = t;
  }
  InitData(t) {
    this.vyl = t;
    this.fyl = [];
    for (const i of t) {
      var e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(i.GetItemId());
      this.fyl.push(e);
    }
  }
  CheckIfHaveMutiGood() {
    return this.vyl.length > 1;
  }
  GetCurrentGoodsData() {
    if (this.vyl.length !== 0) {
      return this.vyl[this.NOe];
    }
  }
  SwitchToNextGoods() {
    this.NOe++;
    if (this.NOe > this.vyl.length - 1) {
      this.NOe = 0;
    }
  }
  SwitchToPreGoods() {
    this.NOe--;
    if (this.NOe < 0) {
      this.NOe = this.vyl.length - 1;
    }
  }
  GetCurrentSkinData() {
    return this.fyl[this.NOe];
  }
  GetIfNeedShowSwitchItem() {
    return this.GetCurrentSkinData().GetSuitWeaponSkinId() > 0;
  }
  GetDiscountText() {
    if (this.GetCurrentGoodsData()) {
      return this.GetCurrentGoodsData().GetDiscountText();
    } else {
      return "";
    }
  }
  GetDiscountTimeData() {
    if (this.GetCurrentGoodsData()) {
      return this.GetCurrentGoodsData().GetDiscountTimeData();
    }
  }
  GetIfDirect() {
    return !!this.GetCurrentGoodsData() && this.GetCurrentGoodsData().GetIfDirect();
  }
  GetPriceData() {
    if (this.GetCurrentGoodsData()) {
      return this.GetCurrentGoodsData().GetPriceData();
    }
  }
  GetDirectPriceText() {
    if (this.GetCurrentGoodsData()) {
      return this.GetCurrentGoodsData().GetDirectPriceText();
    } else {
      return "";
    }
  }
  GetIfHaveSkinNeedRole() {
    return this.GetCurrentSkinData().GetIfHaveRole();
  }
}
exports.SkinBuyDetailViewData = SkinBuyDetailViewData;
//# sourceMappingURL=SkinBuyDetailViewData.js.map