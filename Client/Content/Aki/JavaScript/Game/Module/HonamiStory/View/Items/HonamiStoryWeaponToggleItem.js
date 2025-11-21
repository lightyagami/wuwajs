"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryWeaponToggleItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
const HonamiStoryWeaponSuitActiveItem_1 = require("./HonamiStoryWeaponSuitActiveItem");
const SUIT_ITEM_COUNT = 3;
class HonamiStoryWeaponToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.jRh = 0;
    this.Brm = 0;
    this.vYd = undefined;
    this.$im = [];
    this.dYd = undefined;
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.Cke = () => {
      var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryWeaponUnlockSet) ?? new Set();
      e.delete(this.jRh);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryWeaponUnlockSet, e);
      this.vYd?.(this);
      this.SetNewItemShow();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIExtendToggle], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIText], [13, UE.UISprite], [14, UE.UISprite], [15, UE.UISprite]];
    this.BtnBindInfo = [[5, this.Cke]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.$im = [];
    for (let e = 0; e < SUIT_ITEM_COUNT; e++) {
      var i = new HonamiStoryWeaponSuitActiveItem_1.HonamiStoryWeaponSuitActiveItem();
      this.$im.push(i);
      t.push(i.CreateThenShowByActorAsync(this.GetItem(1 + e).GetOwner()));
    }
    await Promise.all(t);
    this.GetExtendToggle(5)?.OnUndeterminedClicked.Add(this.Cke);
  }
  Refresh(e, t, i) {
    this.jRh = e.WeaponId;
    this.Brm = e.UseWay;
    if (e.EquipData) {
      this.dYd = e.EquipData;
    }
    this.RefreshItem();
  }
  RefreshItem() {
    this.GetItem(9)?.SetUIActive(false);
    this.GetItem(11)?.SetUIActive(false);
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponData(this.jRh);
    if (this.jRh <= 0 || t === undefined) {
      this.GetItem(8)?.SetUIActive(false);
      var e = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() ? "SP_EquipBozaiLock" : "SP_EquipBozaiNor";
      var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      const s = this.GetSprite(13);
      this.SetSpriteByPath(e, s, false, undefined, () => {
        s.GetOwner().GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass()).SetAllStateSprite(s.GetSprite());
      });
      s.SetUIActive(true);
    } else {
      e = t.Config;
      t = t.IsUnlock;
      this.GetItem(7)?.SetUIActive(!t);
      this.GetItem(6)?.SetUIActive(t);
      if (t) {
        var i;
        var t = e.SuitId;
        this.Wim(t);
        if (this.Brm === 1) {
          let e = this.dYd;
          if (e = e || ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponEquipState(this.jRh)) {
            ((t = e.GetRoleId()) > 0 ? (i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t), this.SetRoleIcon(i.RoleHeadIcon, this.GetTexture(10), t), this.GetItem(9)) : (i = e.GetPosition(), this.GetText(12).SetText((i + 1).toString()), this.GetItem(11)))?.SetUIActive(true);
          }
        }
      }
      this.SetNewItemShow(false);
      this.SetTextureByPath(e.IconToggle, this.GetTexture(0));
      this.GetItem(8)?.SetUIActive(true);
      this.GetSprite(13).SetUIActive(false);
    }
  }
  RefreshCurSelectLightSprite(t) {
    this.GetSprite(14).SetUIActive(false);
    this.GetSprite(15).SetUIActive(false);
    if (this.Brm === 1) {
      let e = this.dYd;
      if ((e = e || ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponEquipState(this.jRh)) && e.GetPosition() === t.GetPosition()) {
        this.GetSprite(14).SetUIActive(true);
        this.GetSprite(15).SetUIActive(true);
      }
    }
  }
  Wim(t) {
    let i = this.dYd;
    i = i || ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponEquipState(this.jRh);
    var s = Math.min(t.length, SUIT_ITEM_COUNT);
    for (let e = 0; e < s; e++) {
      var a = t[e];
      this.$im[e].Refresh({
        SuitId: a,
        EquipData: i
      });
      this.$im[e].SetUiActive(true);
    }
    for (let e = s; e < SUIT_ITEM_COUNT; e++) {
      this.$im[e].SetUiActive(false);
    }
  }
  get WeaponId() {
    return this.jRh;
  }
  GetEquipData() {
    return this.dYd;
  }
  BindWeaponToggleClick(e) {
    this.vYd = e;
  }
  OnSelected() {
    this.GetExtendToggle(5).SetToggleStateForce(1);
  }
  OnDeselected() {
    this.GetExtendToggle(5).SetToggleStateForce(0);
  }
  Clear() {}
  GetKey(e, t) {
    return this.GridIndex;
  }
  SetIsEnable(e) {
    this.RootItem?.SetAlpha(e ? 1 : 0.4);
    this.GetExtendToggle(5)?.SetSelfInteractive(e);
  }
  SetNewItemShow(e = true) {
    var t;
    var i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryWeaponUnlockSet) ?? new Set();
    if (this.Brm === 0) {
      t = i.size > 0;
      this.GetItem(4)?.SetUIActive(t);
    } else {
      t = i.has(this.jRh);
      this.GetItem(4)?.SetUIActive(t);
    }
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryBackpackClickWeapon);
    }
  }
  ResetToggleState() {
    this.GetExtendToggle(5).SetToggleStateForce(0);
  }
}
exports.HonamiStoryWeaponToggleItem = HonamiStoryWeaponToggleItem;
//# sourceMappingURL=HonamiStoryWeaponToggleItem.js.map