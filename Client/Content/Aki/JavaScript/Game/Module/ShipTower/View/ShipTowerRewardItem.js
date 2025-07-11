"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerRewardItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class ShipTowerRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.H3e = undefined;
    this.ClickCallBack = undefined;
    this.BtnReceive = undefined;
    this.AA_ = () => {
      this.ClickCallBack?.(this.fGt);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid());
    this.GetItem(4)?.SetUIActive(false);
    this.BtnReceive = new ButtonItem_1.ButtonItem(this.GetButton(1).RootUIComp);
    this.BtnReceive.SetFunction(this.AA_);
  }
  Refresh(t) {
    this.fGt = t;
    this.GetText(0)?.ShowTextNew(this.fGt.TitleKey);
    this.GetButton(1)?.RootUIComp.SetUIActive(this.fGt.IsReceive);
    this.GetText(2)?.SetUIActive(this.fGt.IsProgress);
    this.GetSprite(5)?.SetUIActive(this.fGt.IsCompleted);
    this.GetSprite(6)?.SetUIActive(this.fGt.IsCompleted);
    this.BtnReceive?.SetRedDotVisible(this.fGt.IsReceive);
    this.H3e?.RefreshByData(this.fGt.RewardList);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "ShipTowerRewardItem", ["Refresh", this.fGt]);
    }
  }
}
exports.ShipTowerRewardItem = ShipTowerRewardItem;
//# sourceMappingURL=ShipTowerRewardItem.js.map