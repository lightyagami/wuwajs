"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySkinBuyDetailViewData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class FlySkinBuyDetailViewData {
  constructor() {
    this.C31 = [];
    this.p31 = [];
    this.vyl = [];
    this.NOe = 0;
    this.vUl = "";
  }
  static Create(t) {
    var i = new FlySkinBuyDetailViewData();
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
    this.C31 = [];
    this.p31 = [];
    for (const e of t) {
      var i = ModelManager_1.ModelManager.FlySkinModel.GetFlySkinData(e.GetSoarWingSkinId());
      this.C31.push(i);
      i = ModelManager_1.ModelManager.FlySkinModel.GetFlySkinData(e.GetParaglidingSkinId());
      this.p31.push(i);
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
  GetCurrentSkinData(t) {
    return (t === 0 ? this.C31 : this.p31)[this.NOe];
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
exports.FlySkinBuyDetailViewData = FlySkinBuyDetailViewData;
//# sourceMappingURL=FlySkinBuyDetailViewData.js.map