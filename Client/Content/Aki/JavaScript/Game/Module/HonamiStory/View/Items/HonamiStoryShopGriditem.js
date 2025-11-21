"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryShopGridItem = undefined;
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PayShopGoods_1 = require("../../../PayShop/PayShopData/PayShopGoods");
const PayShopExchangeExtraData_1 = require("../../../PayShop/PayShopTab/PayShopExchangeExtraData");
const PayShopItem_1 = require("../../../PayShop/PayShopTab/TabItem/PayShopItem");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
class HonamiStoryShopGridItem extends PayShopItem_1.PayShopItem {
  constructor() {
    super(...arguments);
    this.b2a = (e, a) => {
      this.SetRedDotState(false);
      ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, a.GetGoodsId());
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked);
    };
  }
  OnStart() {
    super.OnStart();
    this.SetExtraFunction(this.b2a);
    this.SetRedDotState(false);
  }
  Refresh(e, a, o) {
    if (e instanceof PayShopGoods_1.PayShopGoods) {
      super.Refresh(e, a, o);
      a = !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, e.GetGoodsId());
      this.SetRedDotState(a);
      o = new PayShopExchangeExtraData_1.PayShopExchangeExtraData();
      a = e.GetGoodsData().ItemId;
      if (HonamiStoryUtil_1.HonamiStoryUtil.CheckIsPluginBoxItem(a)) {
        const r = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryPluginBoxItemById(a);
        o.GetMaxBuyCount = () => r.BuyLimit;
      }
      o.CheckIfCanBuy = () => {
        return !(ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(1).GetOverflowCapacity() > 0) || !(ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_WarehouseFullShop"), 1);
      };
      this.SetExchangeExtraData(o);
    }
  }
}
exports.HonamiStoryShopGridItem = HonamiStoryShopGridItem;
//# sourceMappingURL=HonamiStoryShopGriditem.js.map