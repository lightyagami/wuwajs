"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryGiftItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const InventoryGiftCellItem_1 = require("./InventoryGiftCellItem");
class InventoryGiftItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OGe = undefined;
    this.Qmi = undefined;
    this.Xmi = undefined;
    this.qTt = undefined;
    this.H5e = undefined;
    this.fGt = undefined;
    this.sft = undefined;
    this.$mi = undefined;
    this.Ymi = undefined;
    this.vIl = undefined;
    this.Cbd = undefined;
    this.Jmi = () => {
      this.H5e.SetToggleState(0, false);
      this.Xmi.RootUIComp.SetUIActive(false);
      if (this.Ymi) {
        this.Ymi(this.fGt);
      }
    };
    this.Yai = i => {
      i = i === 1;
      if (this.Xmi) {
        this.Xmi.RootUIComp.SetUIActive(i);
      }
      if (this.$mi) {
        this.$mi(this.H5e, this.Xmi, i, this.fGt);
      }
    };
  }
  Initialize(i) {
    if (i) {
      this.CreateThenShowByActor(i.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIExtendToggle], [5, UE.UISprite]];
    this.BtnBindInfo = [[3, this.Jmi]];
  }
  OnStart() {
    this.SHe();
  }
  OnBeforeDestroy() {
    this.OGe = undefined;
    this.Qmi = undefined;
    this.Xmi = undefined;
    this.qTt = undefined;
    this.H5e = undefined;
    this.fGt = undefined;
    this.sft = undefined;
    this.Cbd = undefined;
  }
  SHe() {
    this.OGe = this.GetText(1);
    this.Qmi = this.GetText(2);
    this.H5e = this.GetExtendToggle(4);
    this.H5e.OnStateChange.Add(this.Yai);
    this.Xmi = this.GetButton(3);
    this.Xmi.RootUIComp.SetUIActive(false);
    this.sft = new InventoryGiftCellItem_1.InventoryGiftCellItem();
    this.sft.Initialize(this.GetItem(0).GetOwner());
    this.Cbd = this.GetSprite(5);
    this.Cbd.SetUIActive(false);
  }
  Refresh(i, t, s) {
    this.fGt = i;
    this.RefreshItem(i);
    if (this.vIl) {
      this.Oei(this.vIl(i));
    }
  }
  OnSelected(i) {
    if (this.vIl && this.fGt) {
      this.Oei(this.vIl(this.fGt));
    }
  }
  RefreshItem(i) {
    this.qTt = i.ItemId;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.qTt);
    var s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name) ?? "";
    this.OGe.SetText(s);
    LguiUtil_1.LguiUtil.SetLocalText(this.Qmi, "Quantity", i.ItemCount);
    this.sft.RefreshByConfigId(i);
    this.Cbd.SetUIActive(false);
    if (t.ItemType === 2) {
      var s = ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList();
      var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(this.qTt);
      for (const h of s) {
        if (e.WeaponType === h.Value) {
          this.Cbd.SetUIActive(true);
          this.SetSpriteByPath(h.Icon, this.Cbd, false);
          break;
        }
      }
    }
  }
  Oei(i, t = false) {
    this.H5e.SetToggleState(i ? 1 : 0, t);
    this.Xmi.RootUIComp.SetUIActive(i);
  }
  SetOnToggleStateChangeFunction(i) {
    this.$mi = i;
  }
  SetOnReduceFunction(i) {
    this.Ymi = i;
  }
  SetIsSelectOn(i) {
    this.vIl = i;
  }
}
exports.InventoryGiftItem = InventoryGiftItem;
//# sourceMappingURL=InventoryGiftItem.js.map