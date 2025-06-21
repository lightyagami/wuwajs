"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FlySkinBuyDetailViewData = void 0;
const ModelManager_1 = require("../../../Manager/ModelManager");
class FlySkinBuyDetailViewData {
  constructor() {
    this.GN1 = [], this.FN1 = [], this.vyl = [], this.NOe = 0, this.vUl = ""
  }
  static Create(t) {
    var i = new FlySkinBuyDetailViewData;
    return i.InitData(t), i
  }
  SetPreviewTitle(t) {
    this.vUl = t
  }
  GetPreviewTitle() {
    return this.vUl
  }
  SetIndex(t) {
    this.NOe = t
  }
  InitData(t) {
    this.vyl = t, this.GN1 = [], this.FN1 = [];
    for (const e of t) {
      var i = ModelManager_1.ModelManager.FlySkinModel.GetFlySkinData(e.GetSoarWingSkinId());
      this.GN1.push(i), i = ModelManager_1.ModelManager.FlySkinModel.GetFlySkinData(e.GetParaglidingSkinId()), this.FN1.push(i)
    }
  }
  CheckIfHaveMutiGood() {
    return 1 < this.vyl.length
  }
  GetCurrentGoodsData() {
    if (0 !== this.vyl.length) return this.vyl[this.NOe]
  }
  SwitchToNextGoods() {
    this.NOe++, this.NOe > this.vyl.length - 1 && (this.NOe = 0)
  }
  SwitchToPreGoods() {
    this.NOe--, this.NOe < 0 && (this.NOe = this.vyl.length - 1)
  }
  GetCurrentSkinData(t) {
    return (0 === t ? this.GN1 : this.FN1)[this.NOe]
  }
  GetDiscountText() {
    return this.GetCurrentGoodsData() ? this.GetCurrentGoodsData().GetDiscountText() : ""
  }
  GetDiscountTimeData() {
    if (this.GetCurrentGoodsData()) return this.GetCurrentGoodsData().GetDiscountTimeData()
  }
  GetIfDirect() {
    return !!this.GetCurrentGoodsData() && this.GetCurrentGoodsData().GetIfDirect()
  }
  GetPriceData() {
    if (this.GetCurrentGoodsData()) return this.GetCurrentGoodsData().GetPriceData()
  }
  GetDirectPriceText() {
    return this.GetCurrentGoodsData() ? this.GetCurrentGoodsData().GetDirectPriceText() : ""
  }
}
exports.FlySkinBuyDetailViewData = FlySkinBuyDetailViewData;
//# sourceMappingURL=FlySkinBuyDetailViewData.js.map