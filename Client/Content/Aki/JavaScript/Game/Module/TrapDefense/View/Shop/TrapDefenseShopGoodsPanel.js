"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseShopGoodsPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const TrapDefenseShopGoodsContainerItem_1 = require("./TrapDefenseShopGoodsContainerItem");
class TrapDefenseShopGoodsPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText]];
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), () => new TrapDefenseShopGoodsContainerItem_1.TrapDefenseShopGoodsContainerItem());
  }
  async RefreshAsync() {
    var e = {
      Type: 0,
      GoodsList: ModelManager_1.ModelManager.TrapDefenseModel.ShopData.ItemGoodsList
    };
    var o = {
      Type: 1,
      GoodsList: ModelManager_1.ModelManager.TrapDefenseModel.ShopData.BuffGoodsList
    };
    var r = [];
    if (e.GoodsList.length > 0) {
      r.push(e);
    }
    if (o.GoodsList.length > 0) {
      r.push(o);
    }
    await this.xqe.RefreshByDataAsync(r);
    var r = (e.GoodsList.length > 0 ? e : o).GoodsList[0];
    if (r && !ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.SelectedGoods) {
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.SelectGoods(r);
    }
  }
}
exports.TrapDefenseShopGoodsPanel = TrapDefenseShopGoodsPanel;
//# sourceMappingURL=TrapDefenseShopGoodsPanel.js.map