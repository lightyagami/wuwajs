"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureShopItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const InfrastructureDefine_1 = require("../../InfrastructureDefine");
class InfrastructureShopItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.uVm = () => {
      if (this.Pe.IfCanBuy()) {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenBuyViewByGoodsId(this.Pe);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("JijianTask_Rewardsunlocked");
      }
    };
  }
  get cVm() {
    return this.Pe?.ConvertToPayShopBaseSt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIText], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText]];
    this.BtnBindInfo = [[0, this.uVm]];
  }
  Refresh(e) {
    this.Pe = e;
    this.Aqe();
    this.k3i();
    this.F3i();
    this.iFi();
    this.B3i();
  }
  Aqe() {
    var e = this.Pe.ConvertToPayShopBaseSt();
    var r = this.GetTexture(1);
    if (e.IfRechargeItem) {
      this.SetTextureByPath(e.StageImage, r);
    } else if (e.ShowStageImage !== "") {
      this.SetTextureByPath(e.ShowStageImage, r);
    } else {
      this.SetItemIcon(r, e.ItemId);
    }
  }
  k3i() {
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetItemQualityColor(this.cVm.Quality);
    this.GetSprite(2).SetColor(UE.Color.FromHex(e));
  }
  F3i() {
    this.GetText(4).SetText(this.cVm.ItemName);
  }
  iFi() {
    var e;
    var r;
    var t = this.GetTexture(5);
    if (this.cVm.IsDirect || (e = this.cVm.PriceData).NowPrice === 0) {
      t.SetUIActive(false);
    } else {
      t.SetUIActive(true);
      this.SetItemIcon(t, e.CurrencyId);
      (t = this.GetText(6)).SetText(e.NowPrice.toString());
      r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(InfrastructureDefine_1.INFR_SHOP_CURRENCY_ID);
      t.SetChangeColor(r < e.NowPrice, t.changeColor);
    }
  }
  B3i() {
    var e = !this.Pe.IfCanBuy();
    this.GetItem(7).SetUIActive(e);
    this.GetItem(9).SetUIActive(false);
    if (e) {
      this.GetText(8).SetText(this.Pe.GetConditionLimitText());
    } else if (this.Pe.IsSoldOut()) {
      this.GetItem(9).SetUIActive(true);
    }
    this.GetText(11).SetText(this.Pe.GetBuyLimitText());
  }
}
exports.InfrastructureShopItem = InfrastructureShopItem;
//# sourceMappingURL=InfrastructureShopItem.js.map