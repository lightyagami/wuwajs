"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallItemGrid = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemGridBase_1 = require("../ItemGridBase/ItemGridBase");
const SmallItemGridBirthdayEffectComponent_1 = require("./SmallItemGridComponent/SmallItemGridBirthdayEffectComponent");
const SmallItemGridBlackComponent_1 = require("./SmallItemGridComponent/SmallItemGridBlackComponent");
const SmallItemGridCookUpComponent_1 = require("./SmallItemGridComponent/SmallItemGridCookUpComponent");
const SmallItemGridCoolDownComponent_1 = require("./SmallItemGridComponent/SmallItemGridCoolDownComponent");
const SmallItemGridCurrentEquipmentComponent_1 = require("./SmallItemGridComponent/SmallItemGridCurrentEquipmentComponent");
const SmallItemGridDangoPluginIconComponent_1 = require("./SmallItemGridComponent/SmallItemGridDangoPluginIconComponent");
const SmallItemGridDisableComponent_1 = require("./SmallItemGridComponent/SmallItemGridDisableComponent");
const SmallItemGridElementComponent_1 = require("./SmallItemGridComponent/SmallItemGridElementComponent");
const SmallItemGridEmptySlotComponent_1 = require("./SmallItemGridComponent/SmallItemGridEmptySlotComponent");
const SmallItemGridExchangeRewardComponent_1 = require("./SmallItemGridComponent/SmallItemGridExchangeRewardComponent");
const SmallItemGridFirstRewardComponent_1 = require("./SmallItemGridComponent/SmallItemGridFirstRewardComponent");
const SmallItemGridLockAndDeprecateComponent_1 = require("./SmallItemGridComponent/SmallItemGridLockAndDeprecateComponent");
const SmallItemGridLockBlackComponent_1 = require("./SmallItemGridComponent/SmallItemGridLockBlackComponent");
const SmallItemGridLockComponent_1 = require("./SmallItemGridComponent/SmallItemGridLockComponent");
const SmallItemGridNewFlagComponent_1 = require("./SmallItemGridComponent/SmallItemGridNewFlagComponent");
const SmallItemGridNotFoundComponent_1 = require("./SmallItemGridComponent/SmallItemGridNotFoundComponent");
const SmallItemGridReceivableComponent_1 = require("./SmallItemGridComponent/SmallItemGridReceivableComponent");
const SmallItemGridReceivedComponent_1 = require("./SmallItemGridComponent/SmallItemGridReceivedComponent");
const SmallItemGridRedDotComponent_1 = require("./SmallItemGridComponent/SmallItemGridRedDotComponent");
const SmallItemGridRoleHeadComponent_1 = require("./SmallItemGridComponent/SmallItemGridRoleHeadComponent");
const SmallItemGridSelectComponent_1 = require("./SmallItemGridComponent/SmallItemGridSelectComponent");
const SmallItemGridSelectedFlagComponent_1 = require("./SmallItemGridComponent/SmallItemGridSelectedFlagComponent");
const SmallItemGridSkinComponent_1 = require("./SmallItemGridComponent/SmallItemGridSkinComponent");
const SmallItemGridVisionFetterComponent_1 = require("./SmallItemGridComponent/SmallItemGridVisionFetterComponent");
const SmallItemGridVisionRoleHeadComponent_1 = require("./SmallItemGridComponent/SmallItemGridVisionRoleHeadComponent");
const SmallItemTopRightTagComponent_1 = require("./SmallItemGridComponent/SmallItemTopRightTagComponent");
const TRIAL_ROLE_ID = 10000;
class SmallItemGrid extends ItemGridBase_1.ItemGridBase {
  constructor() {
    super(...arguments);
    this.IsSelected = false;
    this.IsForceSelected = false;
    this.nwt = 0;
    this.awt = undefined;
    this.OnClickedEmptySlotButton = () => {
      var t;
      if (this.awt) {
        t = {
          SmallItemGrid: this,
          Data: this.Data
        };
        this.awt(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIExtendToggle], [8, UE.UISprite], [9, UE.UIItem]];
  }
  OnStart() {
    this.GetSprite(8)?.SetUIActive(false);
  }
  OnSetUnderTextAdditionItem() {
    return this.GetItem(9);
  }
  OnSetBottomAdditionItem() {
    return this.GetItem(5);
  }
  OnSetTopAdditionItem() {
    return this.GetItem(6);
  }
  GetItemGridExtendToggle() {
    return this.GetExtendToggle(7);
  }
  Apply(t) {
    this.ClearVisibleComponent();
    this.ClearComponentList();
    if (t.Type === 1) {
      this.ApplyEmptySmallItemGrid(t);
    }
    if (t.Type === 4) {
      this.ApplyPropSmallItemGrid(t);
    }
    if (t.Type === 3) {
      this.ApplyPhantomSmallItemGrid(t);
    }
    if (t.Type === 2) {
      this.ApplyCharacterSmallItemGrid(t);
    }
    if (t.Type === 5) {
      this.ApplyForecastCharacterSmallItemGrid(t);
    }
    this.RefreshComponentVisible();
    this.RefreshComponentHierarchyIndex();
  }
  ApplyEmptySmallItemGrid(t) {
    this.SetEmptySlotVisible(true);
    this.UTt(undefined);
    this.Hpl(undefined);
    this.SetBottomTextVisible(false);
    this.SetQuality(undefined);
    this.SetExtendToggleEnable(false);
    this.SetElement(undefined);
  }
  ApplyEmptyWithoutAddSmallItemGrid(t) {
    this.ClearVisibleComponent();
    this.ClearComponentList();
    this.UTt(undefined);
    this.Hpl(undefined);
    this.SetBottomTextVisible(false);
    this.SetQuality(undefined);
    this.SetExtendToggleEnable(false);
    this.SetElement(undefined);
    this.RefreshComponentVisible();
    this.RefreshComponentHierarchyIndex();
  }
  ApplyPropSmallItemGrid(t) {
    var e = t.IsLockVisible;
    var i = t.IsReceivableVisible;
    var o = t.IsReceivedVisible;
    var m = t.IsNewVisible;
    var l = t.IsNotFoundVisible;
    var n = t.CoolDownTime;
    var r = t.IsDisable;
    var a = t.IsBirthdayEffectVisible;
    this.SetIsDisable(r);
    this.SetLockVisible(e);
    this.SetReceivableVisible(i);
    this.SetReceivedVisible(o);
    this.SetNewFlagVisible(m);
    this.SetNotFoundVisible(l);
    this.SetCoolDown(n);
    this.SetRedDotVisible(t.IsRedDotVisible);
    this.SetBirthdayEffect(a);
    this.vbt(t);
  }
  ApplyPhantomSmallItemGrid(t) {
    var e = t.IsLockVisible;
    var i = t.IsLockVisibleBlack;
    var o = t.IsReceivableVisible;
    var m = t.IsReceivedVisible;
    var l = t.IsNewVisible;
    var n = t.IsNotFoundVisible;
    var r = t.IsSelectedFlag;
    var a = t.VisionRoleHeadInfo;
    var s = t.FetterGroupId;
    this.SetLockVisible(e);
    this.SetLockAndDepracte(t.IsPhantomLock, t.IsPhantomDeprecate);
    this.SetLockBlackVisible(i);
    this.SetReceivableVisible(o);
    this.SetReceivedVisible(m);
    this.SetNewFlagVisible(l);
    this.SetNotFoundVisible(n);
    this.SetSelectedFlagVisible(r);
    this.SetVisionRoleHead(a);
    this.SetVisionFetterGroup(s);
    this.SetRedDotVisible(t.IsRedDotVisible);
    this.Mbt(t);
  }
  ApplyCharacterSmallItemGrid(t) {
    var e = t.IsLockVisible;
    var i = t.IsReceivableVisible;
    var o = t.IsReceivedVisible;
    var m = t.IsSelectedFlag;
    var l = t.IsCookUp ?? false;
    var n = t.IsBlack;
    this.SetIsBlack(n);
    this.SetLockVisible(e);
    this.SetReceivableVisible(i);
    this.SetReceivedVisible(o);
    this.SetSelectedFlagVisible(m);
    this.Ebt(l);
    this.SetElement(t.ElementId);
    this.SetRedDotVisible(t.IsRedDotVisible);
    this.Sbt(t);
  }
  ApplyForecastCharacterSmallItemGrid(t) {
    this.S7d(t);
  }
  vbt(t) {
    var e = t.ItemConfigId;
    this.Data = t.Data;
    var i = this.GetTexture(1);
    var o = ConfigManager_1.ConfigManager.InventoryConfig?.GetItemDataTypeByConfigId(t.ItemConfigId);
    if (t.IsIconHide) {
      i?.SetUIActive(false);
    } else if (t.IconPath) {
      this.SetTextureByPath(t.IconPath, i);
    } else if (o === 13) {
      this.eV1(e);
    } else {
      this.UTt(e);
    }
    this.SetItemQuality(t);
    this.dal(t);
    this.RefreshTopRightText(t);
    this.SetExtendToggleEnable(true);
    this.RefreshSkin(t, e);
  }
  SetElement(t) {
    this.RefreshComponent(SmallItemGridElementComponent_1.SmallItemGridElementComponent, t !== undefined, t);
  }
  Mbt(t) {
    var e = t.ItemConfigId;
    var i = t.MonsterId;
    var o = t.PhantomId;
    var m = t.QualityIconResourceId;
    var l = t.IsQualityHidden;
    var n = t.IconHidden;
    this.Data = t.Data;
    if (n) {
      this.GetTexture(1)?.SetUIActive(false);
    } else if (i) {
      this.pwt(i);
    } else if (o) {
      this.Gzs(o);
    } else {
      this.UTt(e);
    }
    var n = this.GetSprite(0);
    if (l) {
      n.SetUIActive(false);
    } else if (m !== undefined) {
      this.vwt(m);
      this.nwt = t.ItemConfigId || 0;
    } else {
      this.SetQuality(e);
    }
    this.dal(t);
    this.RefreshTopRightText(t);
    this.SetExtendToggleEnable(true);
  }
  Sbt(t) {
    let e = t.ItemConfigId;
    this.Data = t.Data;
    var i;
    var o = this.GetTexture(1);
    if (e > TRIAL_ROLE_ID) {
      m = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(e);
      e = m.ParentId;
    }
    var m = t.SkinId;
    if (m) {
      i = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(m).RoleHeadIconLarge;
      this.SetRoleSkinIcon(i, o, m);
    } else {
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).RoleHeadIconBig;
      this.SetRoleIcon(i, o, e);
    }
    o.SetUIActive(true);
    this.Wtd(t.IsQualityHidden, t.QualityId, e, t.QualityType);
    this.dal(t);
    this.RefreshTopRightText(t);
    this.SetExtendToggleEnable(true);
  }
  S7d(t) {
    this.Data = t.Data;
    var t = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(t.RoleId);
    var e = t.ElementId;
    var t = t.RoleHeadIcon;
    this.SetTextureByIconPath(t);
    this.SetBottomTextId("Text_LevelShow_Text", [1]);
    this.SetElement(e);
    this.SetExtendToggleEnable(true);
  }
  SetLockVisible(t) {
    this.RefreshComponent(SmallItemGridLockComponent_1.SmallItemGridLockComponent, t, t);
  }
  SetLockAndDepracte(t, e) {
    var i = {
      IsLock: t,
      IsDeprecate: e
    };
    var t = t === true || e === true;
    this.RefreshComponent(SmallItemGridLockAndDeprecateComponent_1.SmallItemGridLockAndDeprecateComponent, t, i);
  }
  SetLockBlackVisible(t) {
    this.RefreshComponent(SmallItemGridLockBlackComponent_1.SmallItemGridLockBlackComponent, t, t);
  }
  SetCurrentEquipmentVisible(t) {
    this.RefreshComponent(SmallItemGridCurrentEquipmentComponent_1.SmallItemGridCurrentEquipmentComponent, t, t);
  }
  SetReceivableVisible(t) {
    this.RefreshComponent(SmallItemGridReceivableComponent_1.SmallItemGridReceivableComponent, t, t);
  }
  SetReceivedVisible(t) {
    this.RefreshComponent(SmallItemGridReceivedComponent_1.SmallItemGridReceivedComponent, t, t);
  }
  SetSelectedFlagVisible(t) {
    this.RefreshComponent(SmallItemGridSelectedFlagComponent_1.SmallItemGridSelectedFlagComponent, t, t);
  }
  SetSelectVisible(t) {
    this.RefreshComponent(SmallItemGridSelectComponent_1.SmallItemGridSelectComponent, t, t);
  }
  Ebt(t) {
    this.RefreshComponent(SmallItemGridCookUpComponent_1.SmallItemGridCookUpComponent, t, t);
  }
  SetFirstRewardVisible(t) {
    this.RefreshComponent(SmallItemGridFirstRewardComponent_1.SmallItemGridFirstRewardComponent, t, t);
  }
  SetExchangeRewardVisible(t) {
    this.RefreshComponent(SmallItemGridExchangeRewardComponent_1.SmallItemGridExchangeRewardComponent, t, t);
  }
  SetTextureByIconPath(t) {
    var e = this.GetTexture(1);
    this.SetTextureByPath(t, e);
  }
  UTt(t) {
    var e = this.GetTexture(1);
    if (t === undefined) {
      e.SetUIActive(false);
    } else {
      this.SetItemIcon(e, t);
      e.SetUIActive(true);
    }
  }
  eV1(t) {
    this.SetDangoPluginIcon({
      PluginItemId: t
    });
    this.GetTexture(1)?.SetUIActive(false);
  }
  pwt(t) {
    var e = this.GetTexture(1);
    if (t === undefined) {
      e.SetUIActive(false);
    } else {
      t = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(t);
      this.SetTextureByPath(t, e);
      e.SetUIActive(true);
    }
  }
  Gzs(t) {
    var e = this.GetTexture(1);
    if (t === undefined) {
      e.SetUIActive(false);
    } else {
      t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(t);
      this.SetTextureByPath(t.IconMiddle, e);
      e.SetUIActive(true);
    }
  }
  SetVisionRoleHead(t) {
    this.RefreshComponent(SmallItemGridVisionRoleHeadComponent_1.SmallItemGridVisionRoleHeadComponent, t !== undefined, t);
  }
  SetRoleHead(t) {
    this.RefreshComponent(SmallItemGridRoleHeadComponent_1.SmallItemGridRoleHeadComponent, t !== undefined, t);
  }
  SetItemQuality(t) {
    var e = ConfigManager_1.ConfigManager.InventoryConfig?.GetItemDataTypeByConfigId(t.ItemConfigId);
    if (e === 10 || e === 11 || e === 14 || e === 17) {
      this.SetSkinQualityByParameters(t);
    } else if (e === 13) {
      this.JO1(t);
    } else {
      this.SetSkinQuality(undefined);
      this.jpl(t);
    }
  }
  SetSkinQualityByParameters(t) {
    this.SetQuality(undefined);
    this.Hpl(t);
  }
  SetQuality(t) {
    var e = this.GetSprite(0);
    if (t === undefined) {
      e.SetUIActive(false);
    } else {
      if (this.nwt !== t) {
        this.nwt = t;
        this.SetItemQualityIcon(e, t, undefined);
      }
      e.SetUIActive(true);
    }
  }
  SetSkinQuality(t) {
    var e = this.GetSprite(8);
    if (t === undefined) {
      e.SetUIActive(false);
    } else {
      if (this.nwt !== t) {
        this.nwt = t;
        t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
        t = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(t.QualityId);
        this.SetSpriteByPath(t.SkinQuality, e, false);
      }
      e.SetUIActive(true);
    }
  }
  jpl(t) {
    var e = this.GetSprite(0);
    if (t) {
      this.Wtd(t.IsQualityHidden, t.QualityId, t.ItemConfigId, t.QualityType);
    } else {
      e.SetUIActive(false);
    }
  }
  Wtd(t, e, i, o) {
    var m = this.GetSprite(0);
    if (t) {
      m.SetUIActive(false);
    } else if (e > 0) {
      this.SetQualityIconById(m, e, undefined, o);
      m.SetUIActive(true);
      this.nwt = i || 0;
    } else if (e === 0) {
      t = ModelManager_1.ModelManager.SmallItemGridModel.DefaultQualitySpritePath;
      this.SetSpriteByPath(t, m, false);
      m.SetUIActive(true);
      this.nwt = i || 0;
    } else {
      this.SetQuality(i);
    }
  }
  Hpl(t) {
    var e;
    var i = this.GetSprite(8);
    if (!t || t.IsQualityHidden) {
      i.SetUIActive(false);
    } else if (t.QualityId > 0) {
      e = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(t.QualityId);
      this.SetSpriteByPath(e.SkinQuality, i, false);
      i.SetUIActive(true);
      this.nwt = t.ItemConfigId || 0;
    } else if (t.QualityId === 0) {
      e = ModelManager_1.ModelManager.SmallItemGridModel.DefaultQualitySpritePath;
      this.SetSpriteByPath(e, i, false);
      i.SetUIActive(true);
      this.nwt = t.ItemConfigId || 0;
    } else {
      this.SetSkinQuality(t.ItemConfigId);
    }
  }
  JO1(t) {
    var e = this.GetSprite(0);
    if (!t || !t.ItemConfigId || t.IsQualityHidden) {
      e.SetUIActive(false);
    } else {
      if (this.nwt !== t.ItemConfigId) {
        this.nwt = t.ItemConfigId;
        t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(t.ItemConfigId)[t.QualityType ?? "BackgroundSprite"] ?? ModelManager_1.ModelManager.SmallItemGridModel.DefaultQualitySpritePath;
        this.SetSpriteByPath(t, e, false);
      }
      e.SetUIActive(true);
    }
  }
  SetCoolDown(t, e) {
    e = {
      CoolDown: t,
      TotalCdTime: e
    };
    this.RefreshComponent(SmallItemGridCoolDownComponent_1.SmallItemGridCoolDownComponent, t !== undefined && t > 0, e);
  }
  SetVisionFetterGroup(t) {
    this.RefreshComponent(SmallItemGridVisionFetterComponent_1.SmallItemGridVisionFetterComponent, t !== undefined && t > 0, t);
  }
  RefreshSkin(t, e) {
    t = {
      SkinId: e,
      BottomText: t.BottomText
    };
    let i = false;
    if (e) {
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e);
      i = e === 10 || e === 11 || e === 14 || e === 17;
    }
    if (i) {
      this.SetBottomTextVisible(false);
    }
    this.RefreshComponent(SmallItemGridSkinComponent_1.SmallItemGridSkinComponent, i, i ? t : undefined);
  }
  RefreshSkinByDefault(t, e) {
    t = {
      QualityId: t
    };
    if (e === 10 || e === 11 || e === 14 || e === 17) {
      this.SetBottomTextVisible(false);
    }
    this.RefreshComponent(SmallItemGridSkinComponent_1.SmallItemGridSkinComponent, true, t);
  }
  SetEmptySlotVisible(t) {
    var e = this.RefreshComponent(SmallItemGridEmptySlotComponent_1.SmallItemGridEmptySlotComponent, t, t);
    if (e) {
      if (t) {
        e.BindEmptySlotButtonCallback(this.OnClickedEmptySlotButton);
      } else {
        e.UnBindEmptySlotButtonCallback();
      }
    }
  }
  BindEmptySlotButtonCallback(t) {
    this.awt = t;
  }
  SetNewFlagVisible(t) {
    this.RefreshComponent(SmallItemGridNewFlagComponent_1.SmallItemGridNewFlagComponent, t, t);
  }
  SetRedDotVisible(t) {
    this.RefreshComponent(SmallItemGridRedDotComponent_1.SmallItemGridRedDotComponent, t, t);
  }
  SetDangoPluginIcon(t) {
    this.RefreshComponent(SmallItemGridDangoPluginIconComponent_1.SmallItemGridDangoPluginIconComponent, true, t);
  }
  SetBirthdayEffect(t) {
    this.RefreshComponent(SmallItemGridBirthdayEffectComponent_1.SmallItemGridBirthdayEffectComponent, true, t);
  }
  SetNotFoundVisible(t) {
    this.RefreshComponent(SmallItemGridNotFoundComponent_1.SmallItemGridNotFoundComponent, t, t);
  }
  vwt(t) {
    var e = this.GetSprite(0);
    if (t === undefined || (t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t), StringUtils_1.StringUtils.IsEmpty(t))) {
      e.SetUIActive(false);
    } else {
      this.SetSpriteByPath(t, e, true);
      e.SetUIActive(true);
    }
  }
  SetBottomTextVisible(t) {
    var e = this.GetSprite(4);
    var i = this.GetText(3);
    if (e.IsUIActiveSelf() !== t) {
      e.SetUIActive(t);
    }
    if (i.IsUIActiveSelf() !== t) {
      i.SetUIActive(t);
    }
  }
  SetIsDisable(t) {
    this.RefreshComponent(SmallItemGridDisableComponent_1.SmallItemGridDisableComponent, t, t);
  }
  SetIsBlack(t) {
    this.RefreshComponent(SmallItemGridBlackComponent_1.SmallItemGridBlackComponent, t, t);
  }
  SetDisableComponentColor(e, t = true) {
    t = this.RefreshComponent(SmallItemGridDisableComponent_1.SmallItemGridDisableComponent, false, t);
    if (t) {
      t.GetAsync().then(t => {
        t.SetSpriteColor(e);
      });
    }
  }
  SetBottomTextId(t, e) {
    var i = this.GetText(3);
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, t, ...e);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
      }
    }
  }
  SetBottomText(t) {
    var e = this.GetText(3);
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e.SetText(t);
    }
  }
  SetBottomTextColor(t) {
    this.GetText(3).SetColor(UE.Color.FromHex(t));
  }
  dal(t) {
    var e = t.BottomTextId;
    var i = t.BottomText;
    var t = t.BottomTextParameter;
    var o = !StringUtils_1.StringUtils.IsEmpty(e) || !StringUtils_1.StringUtils.IsEmpty(i);
    this.SetBottomTextVisible(o);
    if (o) {
      this.SetBottomTextId(e, t);
      this.SetBottomText(i);
    }
  }
  RefreshTopRightText(t) {
    var e = {
      TopRightTextBgColor: t.TopRightTextBgColor,
      TopRightTextColor: t.TopRightTextColor,
      TopRightTextId: t.TopRightTextId,
      TopRightText: t.TopRightText,
      TopRightTextParameter: t.TopRightTextParameter
    };
    var t = !StringUtils_1.StringUtils.IsEmpty(t.TopRightTextId) || !StringUtils_1.StringUtils.IsEmpty(t.TopRightText);
    this.RefreshComponent(SmallItemTopRightTagComponent_1.SmallItemTopRightTagComponent, t, e);
  }
  SetSelected(t, e = false) {
    var i = this.GetExtendToggle(7);
    if (t) {
      if (e) {
        i.SetToggleStateForce(1, false);
      } else {
        i.SetToggleState(1, false);
      }
    } else if (e) {
      i.SetToggleStateForce(0, false);
    } else {
      i.SetToggleState(0, false);
    }
    this.IsSelected = t;
    this.IsForceSelected = e;
  }
  SetIconByPath(t) {
    this.SetTextureByIconPath(t);
  }
}
exports.SmallItemGrid = SmallItemGrid;
//# sourceMappingURL=SmallItemGrid.js.map