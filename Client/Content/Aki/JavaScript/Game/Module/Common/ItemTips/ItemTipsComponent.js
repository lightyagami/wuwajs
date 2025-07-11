"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemTipsComponentContentComponent = exports.ItemTipsComponent = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ItemTipsAbyssDangoComponent_1 = require("../../Dango/DangoAbyss/View/ItemTipsAbyssDangoComponent");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LevelSequencePlayer_1 = require("../LevelSequencePlayer");
const ItemTipsCharacterComponent_1 = require("./SubComponents/ItemTipsCharacterComponent");
const ItemTipsMaterialComponent_1 = require("./SubComponents/ItemTipsMaterialComponent");
const ItemTipsVisionComponent_1 = require("./SubComponents/ItemTipsVisionComponent");
const ItemTipsWeaponComponent_1 = require("./SubComponents/ItemTipsWeaponComponent");
class ItemTipsComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.zz = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.zz = new ItemTipsComponentContentComponent();
    await this.zz.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.bco();
  }
  bco() {
    this.SPe?.PlaySequencePurely("Start");
  }
  async PlayCloseSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Close", e);
  }
  RefreshTipsComponentByType(e) {
    this.zz?.RefreshTipsComponentByType(e);
  }
  Refresh(e) {
    this.zz?.Refresh(e);
  }
  SetTipsNumShow(e) {
    this.zz?.SetTipsNumShow(e);
  }
  SetTipsComponentLockButton(e) {
    this.zz?.SetTipsComponentLockButton(e);
  }
}
exports.ItemTipsComponent = ItemTipsComponent;
class ItemTipsComponentContentComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ItemType = undefined;
    this.axt = undefined;
    this.hxt = new Map();
    this.lxt = new Map([[0, ItemTipsMaterialComponent_1.TipsMaterialComponent], [1, ItemTipsWeaponComponent_1.TipsWeaponComponent], [2, ItemTipsVisionComponent_1.TipsVisionComponent], [3, ItemTipsCharacterComponent_1.ItemTipsCharacterComponent], [6, ItemTipsAbyssDangoComponent_1.ItemTipsAbyssDangoComponent]]);
  }
  GetComponentByType(e) {
    if (!this.hxt.has(e)) {
      var t = this.lxt.get(e);
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Item", 37, "[ItemTips] 常规Tips组件未注册,请检查类型", ["Type", e]);
        }
        return;
      }
      t = new t(this.GetItem(4));
      this.hxt.set(e, t);
    }
    return this.hxt.get(e);
  }
  RefreshTipsComponentByType(e) {
    this.GetComponentByType(e.ItemType).Refresh(e);
    this.GetComponentByType(e.ItemType).SetVisible(true);
  }
  SetTipsComponentVisibleByType(e, t) {
    e = this.hxt.get(e);
    if (e) {
      e.SetVisible(t);
    }
  }
  SetTipsComponentLockButton(e) {
    if (this.ItemType !== undefined) {
      this.GetComponentByType(this.ItemType).SetLockButtonShow(e);
    }
  }
  SetTipsNumShow(e) {
    if (this.ItemType !== undefined) {
      this.GetComponentByType(this.ItemType).SetPanelNumVisible(e);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UINiagara], [4, UE.UIItem], [5, UE.UIText]];
  }
  OnBeforeDestroy() {
    this.hxt.forEach((e, t) => {
      e.Destroy();
    });
    this.hxt.clear();
    this.axt &&= undefined;
  }
  Refresh(e) {
    if (this.ItemType !== undefined) {
      this.SetTipsComponentVisibleByType(this.ItemType, false);
    }
    this.ItemType = e.ItemType;
    this._xt(e);
    this.RefreshTipsComponentByType(e);
    this.SetActive(true);
  }
  _xt(e) {
    this.ZC1(e);
    this.e01(e);
    this.t01(e);
    this.uxt(e.ConfigId);
  }
  ZC1(e) {
    var t;
    var i = this.GetText(0);
    if (e.IsQualityByType) {
      i.SetUIActive(false);
    } else {
      t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e.QualityId);
      t = UE.Color.FromHex(t.DropColor);
      this.GetText(0).SetColor(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.Title);
    }
  }
  e01(e) {
    var t;
    var i = this.GetUiNiagara(3);
    i.DeactivateSystem();
    var s = this.GetTexture(1);
    if (e.IsQualityByType) {
      s.SetUIActive(false);
    } else {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TipsQualityTypeLevel" + e.QualityId);
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(e.QualityId).QualityColor;
      e = UE.Color.FromHex(e);
      i.SetColor(e);
      i.ActivateSystem(true);
      this.SetTextureByPath(t, s);
    }
  }
  t01(e) {
    var t = this.GetTexture(2);
    if (e.IsIconByType) {
      t.SetUIActive(false);
    } else {
      t.SetUIActive(true);
      this.SetItemIcon(t, e.ConfigId);
    }
  }
  uxt(e) {
    var t = this.GetText(5);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      LguiUtil_1.LguiUtil.SetLocalText(t, "CommonTipsDebugItemId", e);
      t.SetUIActive(true);
    } else {
      t.SetUIActive(false);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "DangoPlugin") {
      return this.hxt?.get(6)?.GetGuideUiItemAndUiItemForShowEx(e);
    } else {
      return undefined;
    }
  }
}
exports.ItemTipsComponentContentComponent = ItemTipsComponentContentComponent;
//# sourceMappingURL=ItemTipsComponent.js.map