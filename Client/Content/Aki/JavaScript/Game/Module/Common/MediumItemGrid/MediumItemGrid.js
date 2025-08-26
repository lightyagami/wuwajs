"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGrid = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemGridBase_1 = require("../ItemGridBase/ItemGridBase");
const MediumItemGridBranchUpgradeComponent_1 = require("./MediumItemGridComponent/MediumItemGridBranchUpgradeComponent");
const MediumItemGridBuffIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridBuffIconComponent");
const MediumItemGridChangeAbleComponent_1 = require("./MediumItemGridComponent/MediumItemGridChangeAbleComponent");
const MediumItemGridCheckTickComponent_1 = require("./MediumItemGridComponent/MediumItemGridCheckTickComponent");
const MediumItemGridComposeTag_1 = require("./MediumItemGridComponent/MediumItemGridComposeTag");
const MediumItemGridCoolDownComponent_1 = require("./MediumItemGridComponent/MediumItemGridCoolDownComponent");
const MediumItemGridCostComponent_1 = require("./MediumItemGridComponent/MediumItemGridCostComponent");
const MediumItemGridDangoPluginIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridDangoPluginIconComponent");
const MediumItemGridDangoRoleHeadComponent_1 = require("./MediumItemGridComponent/MediumItemGridDangoRoleHeadComponent");
const MediumItemGridDevelopRewardComponent_1 = require("./MediumItemGridComponent/MediumItemGridDevelopRewardComponent");
const MediumItemGridDisableComponent_1 = require("./MediumItemGridComponent/MediumItemGridDisableComponent");
const MediumItemGridElementComponent_1 = require("./MediumItemGridComponent/MediumItemGridElementComponent");
const MediumItemGridEmptyComponent_1 = require("./MediumItemGridComponent/MediumItemGridEmptyComponent");
const MediumItemGridEmptySlotComponent_1 = require("./MediumItemGridComponent/MediumItemGridEmptySlotComponent");
const MediumItemGridFrameEffectComponent_1 = require("./MediumItemGridComponent/MediumItemGridFrameEffectComponent");
const MediumItemGridHalfAreaComponent_1 = require("./MediumItemGridComponent/MediumItemGridHalfAreaComponent");
const MediumItemGridItemPriceComponent_1 = require("./MediumItemGridComponent/MediumItemGridItemPriceComponent");
const MediumItemGridLevelAndLockComponent_1 = require("./MediumItemGridComponent/MediumItemGridLevelAndLockComponent");
const MediumItemGridLvAndStarComponent_1 = require("./MediumItemGridComponent/MediumItemGridLvAndStarComponent");
const MediumItemGridMainVisionComponent_1 = require("./MediumItemGridComponent/MediumItemGridMainVisionComponent");
const MediumItemGridNewFlagComponent_1 = require("./MediumItemGridComponent/MediumItemGridNewFlagComponent");
const MediumItemGridPhantomLockComponent_1 = require("./MediumItemGridComponent/MediumItemGridPhantomLockComponent");
const MediumItemGridProhibitComponent_1 = require("./MediumItemGridComponent/MediumItemGridProhibitComponent");
const MediumItemGridReceivedComponent_1 = require("./MediumItemGridComponent/MediumItemGridReceivedComponent");
const MediumItemGridRecommendComponent_1 = require("./MediumItemGridComponent/MediumItemGridRecommendComponent");
const MediumItemGridRedDotComponent_1 = require("./MediumItemGridComponent/MediumItemGridRedDotComponent");
const MediumItemGridReduceButtonComponent_1 = require("./MediumItemGridComponent/MediumItemGridReduceButtonComponent");
const MediumItemGridRightTopValueComponent_1 = require("./MediumItemGridComponent/MediumItemGridRightTopValueComponent");
const MediumItemGridRogueFinishComponent_1 = require("./MediumItemGridComponent/MediumItemGridRogueFinishComponent");
const MediumItemGridRoleHeadComponent_1 = require("./MediumItemGridComponent/MediumItemGridRoleHeadComponent");
const MediumItemGridSkinComponent_1 = require("./MediumItemGridComponent/MediumItemGridSkinComponent");
const MediumItemGridSortHighlightIndexComponent_1 = require("./MediumItemGridComponent/MediumItemGridSortHighlightIndexComponent");
const MediumItemGridSortIndexComponent_1 = require("./MediumItemGridComponent/MediumItemGridSortIndexComponent");
const MediumItemGridSpriteIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridSpriteIconComponent");
const MediumItemGridSubIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridSubIconComponent");
const MediumItemGridTagsComponent_1 = require("./MediumItemGridComponent/MediumItemGridTagsComponent");
const MediumItemGridTeamIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridTeamIconComponent");
const MediumItemGridTimeFlagComponent_1 = require("./MediumItemGridComponent/MediumItemGridTimeFlagComponent");
const MediumItemGridUnRecommendComponent_1 = require("./MediumItemGridComponent/MediumItemGridUnRecommendComponent");
const MediumItemGridUpgradeComponent_1 = require("./MediumItemGridComponent/MediumItemGridUpgradeComponent");
const MediumItemGridVisionFetterComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionFetterComponent");
const MediumItemGridVisionGreenSelectComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionGreenSelectComponent");
const MediumItemGridVisionRoleHeadComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionRoleHeadComponent");
const MediumItemGridVisionSlotComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionSlotComponent");
const MediumItemGridWeeklyRogueTagComponent_1 = require("./MediumItemGridComponent/MediumItemGridWeeklyRogueTagComponent");
const TRIAL_ROLE_ID = 10000;
class MediumItemGrid extends ItemGridBase_1.ItemGridBase {
  constructor() {
    super(...arguments);
    this.rwt = 0;
    this.nwt = 0;
    this.swt = undefined;
    this.awt = undefined;
    this.hwt = undefined;
    this.lwt = e => {
      if (this.hwt) {
        this.hwt(e, this, this.Data);
      }
    };
    this.OnClickedReduceButton = () => {
      var e;
      if (this.swt) {
        e = {
          MediumItemGrid: this,
          Data: this.Data
        };
        this.swt(e);
      }
    };
    this.OnClickedEmptySlotButton = () => {
      var e;
      if (this.awt) {
        e = {
          MediumItemGrid: this,
          Data: this.Data
        };
        this.awt(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIExtendToggle], [7, UE.UIItem], [8, UE.UISprite]];
  }
  OnSetUnderTextAdditionItem() {
    return this.GetItem(7);
  }
  OnSetBottomAdditionItem() {
    return this.GetItem(5);
  }
  OnSetTopAdditionItem() {
    return this.GetItem(4);
  }
  UnBindComponentEvents() {
    this.UnBindReduceButtonCallback();
    this.UnBindEmptySlotButtonCallback();
    this.UnBindReduceLongPress();
  }
  Apply(e) {
    this.ClearVisibleComponent();
    this.ClearComponentList();
    if (e.Type === 1) {
      this._wt(e);
    }
    if (e.Type === 5) {
      this.xV_(e);
    }
    if (e.Type === 4) {
      this.uwt(e);
    }
    if (e.Type === 3) {
      this.cwt(e);
    }
    if (e.Type === 2) {
      this.mwt(e);
    }
    this.RefreshComponentVisible();
    this.RefreshComponentHierarchyIndex();
  }
  _wt(e) {
    this.Data = e.Data;
    this.SetEmptySlotVisible(true);
    this.UTt(undefined);
    this.dwt(undefined);
    this.Cwt(false);
    this.SetBottomTextVisible(false);
    this.SetExtendToggleEnable(true);
    this.ApplyEmptyDisplay(e);
  }
  xV_(e) {
    this.Data = e.Data;
    this.UTt(undefined);
    this.dwt(undefined);
    this.Cwt(false);
    this.SetBottomTextVisible(false);
    this.SetExtendToggleEnable(true);
    this.SetBottomTextVisible(false);
    this.SetOnlyEmptyVisible(true, e);
  }
  uwt(e) {
    var i = e.StarLevel;
    var t = e.IsNewVisible;
    var m = e.BuffIconType;
    var o = e.IsRedDotVisible;
    var n = e.IsLockVisible;
    var d = e.IsDeprecate;
    var r = e.Level;
    var s = e.IsLevelTextUseChangeColor;
    var u = e.CoolDown;
    var h = e.TotalCoolDown;
    var p = e.IsProhibit;
    var I = e.ReduceButtonInfo;
    var C = e.IsGreenSelected;
    var a = e.IsCheckTick;
    var M = e.IsTimeFlagVisible;
    var G = e.IsReceivedFlagVisible;
    var l = e.RoleHeadInfo;
    var _ = e.SortIndex;
    var S = e.IsDisable;
    var g = e.IsMainVisionVisible;
    var v = e.VisionFetterGroupId;
    var c = e.VisionRoleHeadInfo;
    var R = e.DangoRoleHeadInfo;
    var q = e.ComposeIconTag;
    var T = e.ChangeAble;
    var U = e.IsUpGrade;
    var y = e.TagPathList;
    var b = e.SubIconPath;
    var k = e.RightTopValue;
    var B = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e.ItemConfigId) === 3;
    var V = e.IsBranchUpgrade;
    var f = e.IsRecommendVisible;
    this.SetStartLevel(i);
    this.SetBuffSprite(m);
    this.SetRedDotVisible(o);
    this.SetLevelAndLock(r, n, s, B, d);
    this.SetRecommendVisible(f);
    this.SetItemPrice(e.ItemPrice);
    this.SetCoolDown(u, h);
    this.SetIsProhibit(p);
    this.SetReduceButton(I);
    this.SetGreenSelected(C);
    this.SetCheckTickVisible(a);
    this.SetTimeFlagVisible(M);
    this.SetReceivedFlagVisible(G);
    this.SetRoleHead(l);
    this.SetSortIndex(_);
    this.SetIsDisable(S);
    this.SetRogueFinish(e.IsRogueFinish);
    this.SetIsMainVision(g);
    this.SetNewVisible(!o && t);
    this.SetVisionFetterGroup(v);
    this.SetVisionRoleHead(c);
    this.SetComposeIcon(q);
    this.SetComposeChangeAble(T);
    this.SetDangoRoleHead(R);
    this.SetUpGradeVisible(U);
    this.SetTagsInfo(y);
    this.SetSubIconPath(b);
    this.SetRightTopValueInfo(k);
    this.SetIsBranchUpgrade(V);
    this.ApplyPropBaseDisplay(e);
  }
  cwt(e) {
    var i = e.StarLevel;
    var t = e.IsMainVisionVisible;
    var m = e.RoleHeadInfo;
    var o = e.IsNewVisible;
    var n = e.IsLockVisible;
    var d = e.IsDeprecate;
    var r = e.IsPhantomLock;
    var s = e.DevelopRewardInfo;
    var u = e.IsRedDotVisible;
    var h = e.Level;
    var p = e.IsLevelTextUseChangeColor;
    var I = e.FetterGroupId;
    var C = e.VisionRoleHeadInfo;
    this.SetStartLevel(i);
    this.SetRedDotVisible(u);
    this.SetIsMainVision(t);
    this.SetRoleHead(m);
    this.SetLevelAndLock(h, n, p, true, d);
    this.SetIsPhantomLock(r);
    this.SetDevelopRewardInfo(s);
    this.SetNewVisible(o);
    this.SetVisionFetterGroup(I);
    this.SetVisionRoleHead(C);
    this.ApplyPhantomBaseDisplay(e);
  }
  mwt(e) {
    this.SetFrameEffectVisible(e.FrameEffect);
    this.SetElement(e.ElementId);
    this.SetSortIndex(e.Index, e.HighlightIndex);
    this.SetTeamIcon(e.IsInTeam);
    this.SetRecommendVisible(e.IsRecommendVisible);
    this.SetUnRecommendVisible(e.IsUnRecommendVisible);
    this.SetIsDisable(e.IsDisable);
    this.SetTrialRoleVisible(e.IsTrialRoleVisible);
    this.SetLevelAndLock(e.Level, e.IsShowLock, e.IsLevelTextUseChangeColor);
    this.SetNewVisible(e.IsNewVisible);
    this.fwt(e.IsShowCost, e.ItemConfigId);
    this.SetHalfAreaInfo(e.HalfAreaInfo);
    this.SetWeeklyRogueTag(e.IsShowWeeklyRogueTag);
    this.SetLevelAndStar(e.LvAndStar);
    this.ApplyCharacterBaseDisplay(e);
  }
  SetWeeklyRogueTag(e) {
    this.RefreshComponent(MediumItemGridWeeklyRogueTagComponent_1.MediumItemGridWeeklyRogueTagComponent, e, e);
  }
  SetRogueFinish(e) {
    this.RefreshComponent(MediumItemGridRogueFinishComponent_1.MediumItemGridRogueFinishComponent, e, e);
  }
  SetGreenSelected(e) {
    this.RefreshComponent(MediumItemGridVisionGreenSelectComponent_1.MediumItemGridVisionGreenSelectComponent, e, e);
  }
  SetDangoRoleHead(e) {
    var i = this.RefreshComponent(MediumItemGridDangoRoleHeadComponent_1.MediumItemGridDangoRoleHeadComponent, e !== undefined && e.DangoConfigId > 0, e);
    if (i) {
      this.SetComponentVisible(i, e !== undefined && e.DangoConfigId > 0);
    }
  }
  SetDangoPluginIcon(e) {
    this.RefreshComponent(MediumItemGridDangoPluginIconComponent_1.MediumItemGridDangoPluginIconComponent, true, e);
  }
  SetBuffSprite(e) {
    this.RefreshComponent(MediumItemGridBuffIconComponent_1.MediumItemGridBuffIconComponent, e !== undefined && e !== 0, e);
  }
  SetIsPhantomLock(e) {
    this.RefreshComponent(MediumItemGridPhantomLockComponent_1.MediumItemGridPhantomLockComponent, e, e);
  }
  SetLevelAndLock(e, i, t, m, o) {
    t = {
      Level: e,
      IsLockVisible: i,
      IsLevelUseChangeColor: t,
      IsUseVision: m,
      IsDeprecate: o
    };
    this.RefreshComponent(MediumItemGridLevelAndLockComponent_1.MediumItemGridLevelAndLockComponent, e !== undefined || i, t);
  }
  SetLevelAndStar(e) {
    this.RefreshComponent(MediumItemGridLvAndStarComponent_1.MediumItemGridLvAndStarComponent, e?.Level !== undefined || e?.Star !== undefined, e);
  }
  SetItemPrice(e) {
    this.RefreshComponent(MediumItemGridItemPriceComponent_1.MediumItemGridItemPriceComponent, e !== undefined, e);
  }
  SetFrameEffectVisible(e) {
    this.RefreshComponent(MediumItemGridFrameEffectComponent_1.MediumItemGridFrameEffectComponent, e, e);
  }
  SetRedDotVisible(e) {
    this.RefreshComponent(MediumItemGridRedDotComponent_1.MediumItemGridRedDotComponent, e, e);
  }
  SetNewVisible(e) {
    this.RefreshComponent(MediumItemGridNewFlagComponent_1.MediumItemGridNewFlagComponent, e, e);
  }
  SetStartLevel(e) {}
  SetRoleHead(e) {
    this.RefreshComponent(MediumItemGridRoleHeadComponent_1.MediumItemGridRoleHeadComponent, e !== undefined && e.RoleConfigId > 0, e);
  }
  SetVisionRoleHead(e) {
    this.RefreshComponent(MediumItemGridVisionRoleHeadComponent_1.MediumItemGridVisionRoleHeadComponent, e !== undefined && e.RoleConfigId > 0, e);
  }
  SetComposeIcon(e) {
    this.RefreshComponent(MediumItemGridComposeTag_1.MediumItemGridComposeTag, e !== undefined, e);
  }
  SetComposeChangeAble(e) {
    this.RefreshComponent(MediumItemGridChangeAbleComponent_1.MediumItemGridChangeAbleComponent, e, e);
  }
  SetVisionSlotState(e) {
    this.RefreshComponent(MediumItemGridVisionSlotComponent_1.MediumItemGridVisionSlotComponent, e !== undefined && e.length > 0, e);
  }
  SetDevelopRewardInfo(e) {
    this.RefreshComponent(MediumItemGridDevelopRewardComponent_1.MediumItemGridDevelopRewardComponent, e !== undefined, e);
  }
  SetIsMainVision(e) {
    this.RefreshComponent(MediumItemGridMainVisionComponent_1.MediumItemGridMainVisionComponent, e, e);
  }
  SetCoolDown(e, i) {
    i = {
      CoolDown: e,
      TotalCdTime: i
    };
    this.RefreshComponent(MediumItemGridCoolDownComponent_1.MediumItemGridCoolDownComponent, e !== undefined && e > 0, i);
  }
  SetIsProhibit(e) {
    this.RefreshComponent(MediumItemGridProhibitComponent_1.MediumItemGridProhibitComponent, e, e);
  }
  SetReduceButton(e) {
    var i = e?.IsVisible;
    var e = this.RefreshComponent(MediumItemGridReduceButtonComponent_1.MediumItemGridReduceButtonComponent, i, e);
    if (e) {
      if (i) {
        e.BindReduceButtonCallback(this.OnClickedReduceButton);
        e.BindLongPressCallback(this.lwt);
      } else {
        e.UnBindReduceButtonCallback();
        e.UnBindLongPressCallback();
      }
    }
  }
  SetSortIndex(e, i = false) {
    if (i) {
      this.RefreshComponent(MediumItemGridSortHighlightIndexComponent_1.MediumItemGridSortHighlightIndexComponent, e !== undefined, e);
    } else {
      this.RefreshComponent(MediumItemGridSortIndexComponent_1.MediumItemGridSortIndexComponent, e !== undefined, e);
    }
  }
  SetTeamIcon(e) {
    this.RefreshComponent(MediumItemGridTeamIconComponent_1.MediumItemGridTeamIconComponent, e !== undefined, e);
  }
  BindReduceLongPress(e) {
    this.hwt = e;
  }
  UnBindReduceLongPress() {
    this.hwt = undefined;
  }
  SetCheckTickVisible(e) {
    var i = {
      IsCheckTick: e
    };
    this.RefreshComponent(MediumItemGridCheckTickComponent_1.MediumItemGridCheckTickComponent, e, i);
  }
  SetCheckTickPerformance(e, i, t, m) {
    i = {
      IsCheckTick: e,
      HexColor: i,
      Alpha: t,
      TickHexColor: m
    };
    this.RefreshComponent(MediumItemGridCheckTickComponent_1.MediumItemGridCheckTickComponent, e, i);
  }
  SetTimeFlagVisible(e) {
    this.RefreshComponent(MediumItemGridTimeFlagComponent_1.MediumItemGridTimeFlagComponent, e, e);
  }
  SetReceivedFlagVisible(e) {
    this.RefreshComponent(MediumItemGridReceivedComponent_1.MediumItemGridReceivedComponent, e, e);
  }
  SetEmptySlotVisible(e) {
    var i = this.RefreshComponent(MediumItemGridEmptySlotComponent_1.MediumItemGridEmptySlotComponent, e, e);
    if (i) {
      if (e) {
        i.BindEmptySlotButtonCallback(this.OnClickedEmptySlotButton);
      } else {
        i.UnBindEmptySlotButtonCallback();
      }
    }
  }
  SetOnlyEmptyVisible(e, i) {
    e = this.RefreshComponent(MediumItemGridEmptyComponent_1.MediumItemGridEmptyComponent, e, e);
    if (e) {
      e.OnClickedCallback = i.OnClickedCallback;
      e.SetClickable(!!i.IsClickable);
    }
  }
  Cwt(e) {
    this.GetSprite(3).SetUIActive(e);
  }
  SetElement(e) {
    this.RefreshComponent(MediumItemGridElementComponent_1.MediumItemGridElementComponent, e !== undefined, e);
  }
  SetRecommendVisible(e) {
    this.RefreshComponent(MediumItemGridRecommendComponent_1.MediumItemGridRecommendComponent, e, e);
  }
  SetUnRecommendVisible(e) {
    this.RefreshComponent(MediumItemGridUnRecommendComponent_1.MediumItemGridUnRecommendComponent, e, e);
  }
  SetIsDisable(e) {
    this.RefreshComponent(MediumItemGridDisableComponent_1.MediumItemGridDisableComponent, e, e);
  }
  SetVisionFetterGroup(e) {
    this.RefreshComponent(MediumItemGridVisionFetterComponent_1.MediumItemGridVisionFetterComponent, e !== undefined && e > 0, e);
  }
  IsDisable() {
    var e = this.GetItemGridComponent(MediumItemGridDisableComponent_1.MediumItemGridDisableComponent);
    return !!e && e.GetActive();
  }
  SetTrialRoleVisible(e) {
    this.RefreshComponent(MediumItemGridTimeFlagComponent_1.MediumItemGridTimeFlagComponent, e, e);
  }
  SetIconSprite(e) {
    this.RefreshComponent(MediumItemGridSpriteIconComponent_1.MediumItemGridSpriteIconComponent, e !== undefined && e !== "", e);
  }
  SetSkinIcon(e) {
    if (e !== undefined) {
      this.RefreshComponent(MediumItemGridSkinComponent_1.MediumItemGridSkinComponent, true, e);
    }
  }
  ApplyEmptyDisplay(e) {
    var i = e.BottomTextId;
    var t = e.BottomText;
    var e = e.BottomTextParameter;
    var m = !StringUtils_1.StringUtils.IsEmpty(i) || !StringUtils_1.StringUtils.IsEmpty(t);
    this.SetBottomTextVisible(m);
    if (m) {
      this.SetBottomTextId(i, e);
      this.SetBottomText(t);
    }
  }
  ApplyPropBaseDisplay(e) {
    var i = e.ItemConfigId;
    var t = e.BottomTextId;
    var m = e.BottomText;
    var o = e.BottomTextParameter;
    var n = e.SpriteIconPath;
    this.Data = e.Data;
    var d = this.GetTexture(1);
    var r = ConfigManager_1.ConfigManager.InventoryConfig?.GetItemDataTypeByConfigId(e.ItemConfigId);
    if (e.IsIconHide) {
      d?.SetUIActive(false);
    } else if (e.IconPath) {
      this.SetTextureByPath(e.IconPath, d);
      d?.SetUIActive(true);
    } else if (r === 13) {
      this.eV1(i);
    } else {
      this.UTt(i);
    }
    if (r === 10) {
      this.SetSkinIcon(i);
    }
    this.SetIconSprite(n);
    if (e.QualityId) {
      this.SetQualityIconById(this.GetSprite(0), e.QualityId, undefined, e.QualityType);
    } else if (e.QualityIcon) {
      this.hKu(e.QualityIcon);
    } else {
      this.dwt(i);
    }
    var d = !StringUtils_1.StringUtils.IsEmpty(t) || !StringUtils_1.StringUtils.IsEmpty(m);
    this.SetBottomTextVisible(d);
    if (d) {
      this.SetBottomTextId(t, o);
      this.SetBottomText(m);
    }
    this.SetExtendToggleEnable(true);
    this.Cwt(true);
  }
  ApplyPhantomBaseDisplay(e) {
    var i = e.ItemConfigId;
    var t = e.BottomTextId;
    var m = e.BottomText;
    var o = e.BottomTextParameter;
    var n = e.MonsterId;
    var d = e.QualityIconResourceId;
    this.Data = e.Data;
    if (n) {
      this.pwt(n);
    } else {
      this.UTt(i);
    }
    if (d !== undefined) {
      this.vwt(d);
    } else if (e.QualityId) {
      this.SetQualityIconById(this.GetSprite(0), e.QualityId, undefined, e.QualityType);
    } else {
      this.dwt(i);
    }
    var n = !StringUtils_1.StringUtils.IsEmpty(t) || !StringUtils_1.StringUtils.IsEmpty(m);
    this.SetBottomTextVisible(n);
    if (n) {
      this.SetBottomTextId(t, o);
      this.SetBottomText(m);
    }
    this.SetExtendToggleEnable(true);
    this.Cwt(true);
  }
  ApplyCharacterBaseDisplay(e) {
    let i = e.ItemConfigId;
    var t = e.BottomTextId;
    var m = e.BottomText;
    var o = e.BottomTextParameter;
    var n = e.SkinId;
    this.Data = e.Data;
    var e = this.GetTexture(1);
    if (i > TRIAL_ROLE_ID) {
      d = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(i);
      i = d.ParentId;
    }
    var d = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(n);
    var d = d.RoleHeadIconLarge;
    this.SetRoleSkinIcon(d, e, n);
    this.dwt(i);
    e?.SetUIActive(true);
    var d = !StringUtils_1.StringUtils.IsEmpty(t) || !StringUtils_1.StringUtils.IsEmpty(m);
    this.SetBottomTextVisible(d);
    if (d) {
      this.SetBottomTextId(t, o);
      this.SetBottomText(m);
    }
    this.SetExtendToggleEnable(true);
    this.Cwt(true);
  }
  UTt(e) {
    var i = this.GetTexture(1);
    if (e === undefined) {
      i.SetUIActive(false);
    } else {
      if (this.rwt !== e) {
        this.rwt = e;
        this.SetItemIcon(i, e);
      }
      i.SetUIActive(true);
    }
  }
  eV1(e) {
    this.SetDangoPluginIcon({
      PluginItemId: e
    });
    this.GetTexture(1)?.SetUIActive(false);
  }
  pwt(e) {
    var i = this.GetTexture(1);
    if (e === undefined) {
      i.SetUIActive(false);
    } else {
      e = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(e);
      this.SetTextureByPath(e, i);
      i.SetUIActive(true);
    }
  }
  dwt(e) {
    var i = this.GetSprite(0);
    if (e === undefined) {
      i.SetUIActive(false);
    } else if (this.nwt === e) {
      if (ConfigManager_1.ConfigManager.InventoryConfig?.GetItemDataTypeByConfigId(e) !== 10) {
        i.SetUIActive(true);
      }
    } else {
      i.SetUIActive(true);
      this.zO1(e);
      this.nwt = e;
    }
  }
  zO1(e) {
    var i = this.GetSprite(0);
    var t = ConfigManager_1.ConfigManager.InventoryConfig?.GetItemDataTypeByConfigId(e);
    if (t === 13) {
      this.JO1(e);
    } else if (t === 10) {
      this.SetSkinQuality(e);
    } else {
      this.GetSprite(8)?.SetUIActive(false);
      this.SetItemQualityIcon(i, e, undefined, "MediumItemGridQualitySpritePath");
    }
  }
  JO1(e) {
    var i = this.GetSprite(0);
    var e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(e);
    this.SetSpriteByPath(e.MediumItemGridQualitySpritePath, i, true);
  }
  vwt(e) {
    var i = this.GetSprite(0);
    if (e === undefined || (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e), StringUtils_1.StringUtils.IsEmpty(e))) {
      i.SetUIActive(false);
    } else {
      this.SetSpriteByPath(e, i, true);
      i.SetUIActive(true);
    }
  }
  hKu(e) {
    var i = this.GetSprite(0);
    var t = !!e;
    i.SetUIActive(t);
    if (t) {
      this.SetSpriteByPath(e, i, false);
    }
  }
  SetSkinQuality(e) {
    var i = this.GetSprite(8);
    if (e === undefined) {
      i.SetUIActive(false);
    } else {
      if (this.nwt !== e) {
        this.GetSprite(0)?.SetUIActive(false);
        this.nwt = e;
        e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
        e = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(e.QualityId);
        this.SetSpriteByPath(e.SkinQualityItemA, i, false);
      }
      i.SetUIActive(true);
    }
  }
  SetBottomTextVisible(e) {
    var i = this.GetText(2);
    if (i.IsUIActiveSelf() !== e) {
      i.SetUIActive(e);
    }
  }
  SetBottomTextId(e, i) {
    var t = this.GetText(2);
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      if (i) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, e, ...i);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
      }
    }
  }
  SetBottomText(e) {
    var i = this.GetText(2);
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      i.SetText(e);
    }
  }
  BindReduceButtonCallback(e, i) {
    this.swt = e;
  }
  UnBindReduceButtonCallback() {
    this.swt = undefined;
  }
  BindEmptySlotButtonCallback(e) {
    this.awt = e;
  }
  UnBindEmptySlotButtonCallback() {
    this.awt = undefined;
  }
  GetItemGridExtendToggle() {
    return this.GetExtendToggle(6);
  }
  fwt(e, i) {
    this.RefreshComponent(MediumItemGridCostComponent_1.MediumItemGridCostComponent, e, i);
  }
  SetBottomTextColor(e) {
    this.GetText(2).SetColor(UE.Color.FromHex(e));
  }
  SetHalfAreaInfo(e) {
    var i = !!e;
    this.RefreshComponent(MediumItemGridHalfAreaComponent_1.MediumItemGridHalfAreaComponent, i, e);
  }
  SetUpGradeVisible(e) {
    this.RefreshComponent(MediumItemGridUpgradeComponent_1.MediumItemGridUpgradeComponent, e, e);
  }
  SetTagsInfo(e) {
    var i = !!e?.length;
    this.RefreshComponent(MediumItemGridTagsComponent_1.MediumItemGridTagsComponent, i, e);
  }
  SetRightTopValueInfo(e) {
    var i = !!e;
    this.RefreshComponent(MediumItemGridRightTopValueComponent_1.MediumItemGridRightTopValueComponent, i, e);
  }
  SetIsBranchUpgrade(e) {
    this.RefreshComponent(MediumItemGridBranchUpgradeComponent_1.MediumItemGridBranchUpgradeComponent, e, e);
  }
  SetSubIconPath(e) {
    this.RefreshComponent(MediumItemGridSubIconComponent_1.MediumItemGridSubIconComponent, !!e, e);
  }
}
exports.MediumItemGrid = MediumItemGrid;
//# sourceMappingURL=MediumItemGrid.js.map