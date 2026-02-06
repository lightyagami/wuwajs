"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayShopItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GameplayShopUtil_1 = require("../GameplayShopUtil");
const GameplayShopBaseItem_1 = require("./GameplayShopBaseItem");
class GameplayShopItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ItemProxy = undefined;
    this.BaseItem = undefined;
    this.HDg = () => {
      if (this.ItemProxy) {
        this.ItemProxy.OnBuyButtonClick();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIItem], [16, UE.UIText], [17, UE.UIItem]];
    this.BtnBindInfo = [[8, this.HDg]];
  }
  OnStart() {
    this.BaseItem = new GameplayShopBaseItem_1.GameplayShopBaseItem();
    this.BaseItem.CreateThenShowByActor(this.GetItem(0).GetOwner());
  }
  RefreshByData(t) {
    this.ItemProxy = t;
    this.RefreshBaseItem();
    this.RefreshDiscountItem();
    this.RefreshLabelItem();
    this.RefreshLeftTimeItem();
    this.RefreshReSellText();
    this.RefreshSoldOutItem();
    this.RefreshLockItem();
    this.RefreshNewFlagItem();
    this.RefreshRaycastTarget();
  }
  RefreshBaseItem() {
    if (this.ItemProxy && this.BaseItem) {
      this.BaseItem.RefreshByData(this.ItemProxy);
    }
  }
  RefreshDiscountItem() {
    var t;
    if (this.ItemProxy && (this.GetItem(1).SetUIActive(this.ItemProxy.DiscountItemVisible), this.ItemProxy.DiscountItemVisible)) {
      t = this.GetText(2);
      GameplayShopUtil_1.GameplayShopUtil.SetText(t, this.ItemProxy.DiscountTextData);
    }
  }
  RefreshLabelItem() {
    var t;
    if (this.ItemProxy && (this.GetItem(4).SetUIActive(this.ItemProxy.LabelVisible), this.ItemProxy.LabelVisible)) {
      t = this.GetText(11);
      GameplayShopUtil_1.GameplayShopUtil.SetText(t, this.ItemProxy.LabelTextData);
    }
  }
  RefreshLeftTimeItem() {
    var t;
    if (this.ItemProxy && (this.GetItem(5).SetUIActive(this.ItemProxy.LeftTimeItemVisible), this.ItemProxy.LeftTimeItemVisible)) {
      t = this.GetText(6);
      GameplayShopUtil_1.GameplayShopUtil.SetText(t, this.ItemProxy.LeftTimeTextData);
    }
  }
  RefreshReSellText() {
    var t;
    if (this.ItemProxy && ((t = this.GetText(7)).SetUIActive(this.ItemProxy.ReSellItemVisible), this.ItemProxy.ReSellItemVisible)) {
      GameplayShopUtil_1.GameplayShopUtil.SetText(t, this.ItemProxy.ReSellTextData);
    }
  }
  RefreshSoldOutItem() {
    var t;
    if (this.ItemProxy && (this.GetItem(13).SetUIActive(this.ItemProxy.SoldOutItemVisible), this.ItemProxy.SoldOutItemVisible)) {
      t = this.GetText(14);
      GameplayShopUtil_1.GameplayShopUtil.SetText(t, this.ItemProxy.SoldOutTextData);
    }
  }
  RefreshLockItem() {
    var t;
    if (this.ItemProxy && (this.GetItem(15).SetUIActive(this.ItemProxy.LockItemVisible), this.ItemProxy.LockItemVisible)) {
      t = this.GetText(16);
      GameplayShopUtil_1.GameplayShopUtil.SetText(t, this.ItemProxy.LockTextData);
    }
  }
  RefreshNewFlagItem() {
    if (this.ItemProxy) {
      this.GetItem(17).SetUIActive(this.ItemProxy.TagNewItemVisible);
    }
  }
  RefreshRaycastTarget() {
    if (this.ItemProxy) {
      this.RootItem.SetRaycastTarget(this.ItemProxy.RaycastTarget);
    }
  }
}
exports.GameplayShopItem = GameplayShopItem;
//# sourceMappingURL=GameplayShopItem.js.map