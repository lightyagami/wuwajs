"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorSkinBuyDetailViewData = undefined;
class MotorSkinBuyDetailViewData {
  constructor() {
    this.fyl = [];
    this.vyl = [];
    this.NOe = 0;
    this.vUl = "";
  }
  static Create(t) {
    var i = new MotorSkinBuyDetailViewData();
    i.InitData(t);
    return i;
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
  InitData(t) {
    this.vyl = t;
    this.fyl = [];
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
}
exports.MotorSkinBuyDetailViewData = MotorSkinBuyDetailViewData;
//# sourceMappingURL=MotorSkinBuyDetailViewData.js.map