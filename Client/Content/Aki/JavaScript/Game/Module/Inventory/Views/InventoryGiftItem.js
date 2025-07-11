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
    this.Jmi = () => {
      this.H5e.SetToggleState(0, false);
      this.Xmi.RootUIComp.SetUIActive(false);
      if (this.Ymi) {
        this.Ymi(this.fGt);
      }
    };
    this.Yai = t => {
      t = t === 1;
      if (this.Xmi) {
        this.Xmi.RootUIComp.SetUIActive(t);
      }
      if (this.$mi) {
        this.$mi(this.H5e, this.Xmi, t, this.fGt);
      }
    };
  }
  Initialize(t) {
    if (t) {
      this.CreateThenShowByActor(t.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIExtendToggle]];
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
  }
  Refresh(t, i, s) {
    this.fGt = t;
    this.RefreshItem(t);
    if (this.vIl) {
      this.Oei(this.vIl(t));
    }
  }
  OnSelected(t) {
    if (this.vIl && this.fGt) {
      this.Oei(this.vIl(this.fGt));
    }
  }
  RefreshItem(t) {
    this.qTt = t.ItemId;
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.qTt);
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name) ?? "";
    this.OGe.SetText(i);
    LguiUtil_1.LguiUtil.SetLocalText(this.Qmi, "Quantity", t.ItemCount);
    this.sft.RefreshByConfigId(t);
  }
  Oei(t, i = false) {
    this.H5e.SetToggleState(t ? 1 : 0, i);
    this.Xmi.RootUIComp.SetUIActive(t);
  }
  SetOnToggleStateChangeFunction(t) {
    this.$mi = t;
  }
  SetOnReduceFunction(t) {
    this.Ymi = t;
  }
  SetIsSelectOn(t) {
    this.vIl = t;
  }
}
exports.InventoryGiftItem = InventoryGiftItem;
//# sourceMappingURL=InventoryGiftItem.js.map