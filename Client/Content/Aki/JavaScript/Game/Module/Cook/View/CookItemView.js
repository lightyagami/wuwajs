"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconItem = exports.ConfirmButtonCompose = exports.MachiningClueExItem = exports.MachiningClueItem = exports.MaterialItem = exports.CookItemView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CookController_1 = require("../CookController");
const CookDefine_1 = require("../CookDefine");
class CookItemView extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.oft = undefined;
    this.BTt = t => {
      if (this.oft) {
        this.oft(this.fGt);
        this.bGt();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[6, UE.UIExtendToggle], [10, UE.UISprite], [11, UE.UITexture], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [12, UE.UIText]];
    this.BtnBindInfo = [[6, this.BTt]];
  }
  Refresh(t, i, s) {
    this.fGt = t;
    this.BGt();
    this.Kbe();
    this.Rxt();
    this.qGt();
    this.bGt();
    this.P5e();
    this.N6e(i, false);
  }
  BGt() {
    var t;
    if (this.fGt.MainType === 0) {
      if (this.fGt.SubType === 0) {
        t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(this.fGt.ItemId);
        this.SetItemQualityIcon(this.GetSprite(10), t.FoodItemId);
      } else {
        this.SetItemQualityIcon(this.GetSprite(10), this.fGt.ItemId);
      }
    } else {
      t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(this.fGt.ItemId);
      this.SetItemQualityIcon(this.GetSprite(10), t.FinalItemId);
    }
  }
  Kbe() {
    var t;
    if (this.fGt.MainType === 0) {
      if (this.fGt.SubType === 0) {
        t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(this.fGt.ItemId);
        this.SetItemIcon(this.GetTexture(11), t.FoodItemId);
      } else {
        this.SetItemIcon(this.GetTexture(11), this.fGt.ItemId);
      }
    } else {
      t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(this.fGt.ItemId);
      this.SetItemIcon(this.GetTexture(11), t.FinalItemId);
    }
  }
  P5e() {
    var t;
    if (this.fGt) {
      if (this.fGt.MainType === 0) {
        t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(this.fGt.ItemId);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.Name);
      } else {
        t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(this.fGt.ItemId);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.Name);
      }
    }
  }
  Rxt() {
    var t;
    if (this.fGt.MainType === 1) {
      t = this.fGt;
      this.GetItem(7).SetUIActive(!t.IsUnLock);
    } else {
      t = this.fGt;
      this.GetItem(7).SetUIActive(!t.IsUnLock);
    }
  }
  qGt() {
    var t;
    if (this.fGt.MainType === 1) {
      t = this.fGt;
      t = CookController_1.CookController.CheckCanProcessed(t.ItemId) && t.IsUnLock;
      this.GetItem(8).SetUIActive(!t);
    } else if ((t = this.fGt).SubType === 60000) {
      this.GetItem(8).SetUIActive(false);
    } else {
      t = CookController_1.CookController.CheckCanCook(t.ItemId);
      this.GetItem(8).SetUIActive(!t);
    }
  }
  bGt() {
    this.GetItem(9).SetUIActive(this.fGt.IsNew);
  }
  BindOnClickedCallback(t) {
    this.oft = t;
  }
  OnSelected(t) {
    this.N6e(true);
  }
  OnDeselected(t) {
    this.N6e(false);
  }
  N6e(t, i = true) {
    var s = this.GetExtendToggle(6);
    if (t) {
      s.SetToggleState(1, i);
    } else {
      s.SetToggleState(0, false);
    }
  }
}
exports.CookItemView = CookItemView;
class MaterialItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.ItemData = undefined;
    this.ItemInfo = undefined;
    this.Index = 0;
    this.oft = undefined;
    this.OnClick = t => {
      if (this.oft) {
        this.oft(this.ItemData, this.Index);
      }
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [4, UE.UISprite]];
    this.BtnBindInfo = [[0, this.OnClick]];
  }
  Update(t, i) {
    this.ItemData = t;
    this.Index = i;
    if (this.ItemData.L8n !== 0) {
      this.ItemInfo = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.ItemData.L8n);
    } else {
      this.ItemInfo = undefined;
    }
    this.RefreshNeed();
    this.RefreshHave();
    this.Kbe();
    this.BGt();
  }
  RefreshNeed(t = 1) {
    let i = this.ItemData.UVn;
    if (t !== 1) {
      i *= t;
    }
    this.GetText(2).SetText(i.toString());
  }
  RefreshHave() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ItemData.L8n);
    let i = undefined;
    i = this.ItemData.K6n ? t < this.ItemData.UVn ? `<color=#dc0300>${t}</color>` : `<color=#ffffff>${t}</color>` : "<color=#ffffff>--</color>";
    this.GetText(1).SetText(i);
  }
  Kbe() {
    if (this.ItemData.K6n) {
      this.GetTexture(3).SetUIActive(true);
      this.SetTextureByPath(this.ItemInfo.Icon, this.GetTexture(3));
    } else {
      this.GetTexture(3).SetUIActive(false);
    }
  }
  BGt() {
    if (this.ItemData.K6n) {
      this.GetSprite(4).SetUIActive(true);
      this.SetItemQualityIcon(this.GetSprite(4), this.ItemData.L8n);
    } else {
      this.GetSprite(4).SetUIActive(false);
    }
  }
  BindOnClickedCallback(t) {
    this.oft = t;
  }
}
exports.MaterialItem = MaterialItem;
class MachiningClueItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  Update(t, i) {
    this.GetSprite(0).SetUIActive(t);
    this.GetText(1).SetText(i);
    if (t) {
      this.GetText(1).SetColor(UE.Color.FromHex(CookDefine_1.INVENTORY_ACTIVE_COLOR));
    } else {
      this.GetText(1).SetColor(UE.Color.FromHex(CookDefine_1.INVENTORY_DEACTIVE_COLOR));
    }
  }
}
exports.MachiningClueItem = MachiningClueItem;
class MachiningClueExItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText]];
  }
  Update(t, i) {
    this.GetSprite(0).SetUIActive(t);
    this.GetText(2).SetUIActive(t);
    this.GetText(1).SetUIActive(!t);
    (t ? this.GetText(2) : this.GetText(1)).SetText(i);
  }
}
exports.MachiningClueExItem = MachiningClueExItem;
class ConfirmButtonCompose extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.GGt = undefined;
    this.eTt = () => {
      this.GGt();
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  UpdateText(t) {
    this.GetText(1).SetText(t);
  }
  RefreshButton(t) {
    this.GetButton(0).GetOwner().GetComponentByClass(UE.UIInteractionGroup.StaticClass()).SetInteractable(t);
  }
  BindClickFunction(t) {
    this.GGt = t;
  }
}
exports.ConfirmButtonCompose = ConfirmButtonCompose;
class IconItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[3, UE.UITexture], [4, UE.UISprite]];
  }
  SetIcon(t) {
    this.SetItemIcon(this.GetTexture(3), t);
  }
  SetQuality(t) {
    this.SetItemQualityIcon(this.GetSprite(4), t);
  }
}
exports.IconItem = IconItem;
//# sourceMappingURL=CookItemView.js.map