"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseShopGoodsContainerItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
const TrapDefenseShopGoodsItem_1 = require("./TrapDefenseShopGoodsItem");
class TrapDefenseShopGoodsContainerItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Tei = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.Tei = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), () => new TrapDefenseShopGoodsItem_1.TrapDefenseShopGoodsItem());
  }
  Refresh(e, r, t) {
    var o;
    var i;
    if (e.Type === 0) {
      o = ModelManager_1.ModelManager.TrapDefenseModel.BattleInventoryData.GetOwnItemTypeCount();
      i = TrapDefenseDefine_1.TRAP_DEFENSE_BATTLE_ITEM_TYPE_LIMIT;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "TrapDefenseShopGoodsItem", o + "/" + i);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "TrapDefenseShopGoodsBuff");
    }
    this.Tei.RefreshByData(e.GoodsList);
  }
}
exports.TrapDefenseShopGoodsContainerItem = TrapDefenseShopGoodsContainerItem;
//# sourceMappingURL=TrapDefenseShopGoodsContainerItem.js.map