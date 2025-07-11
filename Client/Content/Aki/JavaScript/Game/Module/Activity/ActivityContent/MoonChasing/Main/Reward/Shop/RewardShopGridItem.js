"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardShopGridItem = undefined;
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const PayShopGoods_1 = require("../../../../../../PayShop/PayShopData/PayShopGoods");
const PayShopItem_1 = require("../../../../../../PayShop/PayShopTab/TabItem/PayShopItem");
class RewardShopGridItem extends PayShopItem_1.PayShopItem {
  constructor() {
    super(...arguments);
    this.b2a = (e, o) => {
      if (ModelManager_1.ModelManager.MoonChasingRewardModel.ReadShopItemUnlockFlag(o)) {
        this.SetNewFlagState(false);
      }
    };
  }
  OnStart() {
    super.OnStart();
    this.SetExtraFunction(this.b2a);
  }
  Refresh(e, o, a) {
    if (e instanceof PayShopGoods_1.PayShopGoods) {
      super.Refresh(e, o, a);
      o = ModelManager_1.ModelManager.MoonChasingRewardModel.CheckShopItemRedDotState(e);
      this.SetNewFlagState(o);
    }
  }
}
exports.RewardShopGridItem = RewardShopGridItem;
//# sourceMappingURL=RewardShopGridItem.js.map