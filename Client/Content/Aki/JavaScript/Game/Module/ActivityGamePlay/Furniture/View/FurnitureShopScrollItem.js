"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureShopScrollItem = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const FurnitureShopGridItemProxy_1 = require("../Data/FurnitureShopGridItemProxy");
const FurnitureShopGridItem_1 = require("./FurnitureShopGridItem");
class FurnitureShopScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor(r, e) {
    super();
    this.LoopScrollView = undefined;
    this.ZHe = undefined;
    this.HOi = undefined;
    this.sGe = () => {
      return new FurnitureShopGridItem_1.FurnitureShopGridItem();
    };
    this.ZHe = r;
    this.HOi = e;
  }
  OnStart() {
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.ZHe, this.HOi.GetOwner(), this.sGe);
  }
  d1g(r, e) {
    r = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(r);
    if (!e) {
      return r;
    }
    var t = e.TagList;
    var i = [];
    for (const s of r) {
      var o = ModelManager_1.ModelManager.FurnitureModel.GetFurnitureConfigByGoodsData(s);
      if (t.includes(o.TagId)) {
        i.push(s);
      }
    }
    return i;
  }
  async Refresh(r, e) {
    var t = [];
    for (const o of this.d1g(r, e)) {
      var i = new FurnitureShopGridItemProxy_1.FurnitureShopGridItemProxy();
      i.UpdateFromPayShopGoods(o);
      t.push(i);
    }
    await this.LoopScrollView.RefreshByDataAsync(t, false, true);
  }
}
exports.FurnitureShopScrollItem = FurnitureShopScrollItem;
//# sourceMappingURL=FurnitureShopScrollItem.js.map