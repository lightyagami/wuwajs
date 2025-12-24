"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRoguePhantomRewardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const InventoryGiftData_1 = require("../../Inventory/InventoryGiftData");
const InventoryGiftCellItem_1 = require("../../Inventory/Views/InventoryGiftCellItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRoguePhantomRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.SilentAreaId = 0;
    this.ElementLayout = undefined;
    this.InventoryGiftItem = undefined;
    this.IsSelectOnCb = undefined;
    this.OnToggleStateChangeFunction = undefined;
    this.Vbf = () => new WeeklyRogueRewardFetterItem();
    this.Jmi = () => {
      this.Oei(false, true);
    };
    this.Yai = t => {
      t = t === 1;
      this.GetButton(2).RootUIComp.SetUIActive(t);
      if (this.OnToggleStateChangeFunction) {
        this.OnToggleStateChangeFunction(this.GetExtendToggle(3), this.GetButton(2), this.SilentAreaId, t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIExtendToggle], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[2, this.Jmi]];
  }
  OnStart() {
    this.InventoryGiftItem = new InventoryGiftCellItem_1.InventoryGiftCellItem();
    this.InventoryGiftItem.Initialize(this.GetItem(0).GetOwner());
    this.GetExtendToggle(3).OnStateChange.Add(this.Yai);
    this.ElementLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.Vbf);
  }
  Refresh(t, e, i) {
    this.Data = t;
    var s;
    var r = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetBlackFlowerConfig(t.AreaAwardId);
    if (r) {
      this.SilentAreaId = r.Id;
      s = new InventoryGiftData_1.GiftItemData(r.ShowItemId, 0, 0);
      this.InventoryGiftItem.RefreshByConfigId(s);
      s = [r.IconId1, r.IconId2];
      this.ElementLayout?.RefreshByData(s);
      s = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSilentAreaDetectionConfById(r.SilentAreaDetectionId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.Name);
      this.GetItem(6)?.SetUIActive(!t.IsActive);
      if (t.IsActive) {
        this.GetExtendToggle(3)?.RootUIComp.SetRaycastTarget(true);
        if (this.IsSelectOnCb) {
          this.Oei(this.IsSelectOnCb(t.AreaAwardId));
        }
      } else {
        this.GetButton(2)?.RootUIComp.SetUIActive(false);
        this.GetExtendToggle(3)?.RootUIComp.SetRaycastTarget(false);
      }
    }
  }
  OnSelected(t) {
    if (this.IsSelectOnCb && this.Data) {
      this.Oei(this.IsSelectOnCb(this.SilentAreaId));
    }
  }
  Oei(t, e = false) {
    this.GetExtendToggle(3).SetToggleState(t ? 1 : 0, e);
    this.GetButton(2).RootUIComp.SetUIActive(t);
  }
}
exports.WeeklyRoguePhantomRewardItem = WeeklyRoguePhantomRewardItem;
class WeeklyRogueRewardFetterItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture]];
  }
  OnStart() {
    this.GetSprite(0)?.SetUIActive(false);
  }
  Refresh(t, e, i) {
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t);
    if (t) {
      t = t.FetterElementPath;
      this.SetTextureByPath(t, this.GetTexture(1));
    }
  }
}
//# sourceMappingURL=WeeklyRoguePhantomRewardItem.js.map