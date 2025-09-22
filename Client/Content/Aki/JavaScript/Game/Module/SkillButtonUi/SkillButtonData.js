"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonData = exports.controlVisionTagId = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const SkillButton_1 = require("../../../Core/Define/Config/SkillButton");
const SkillCommonButton_1 = require("../../../Core/Define/Config/SkillCommonButton");
const SkillFollowerButton_1 = require("../../../Core/Define/Config/SkillFollowerButton");
const SkillVehicleButton_1 = require("../../../Core/Define/Config/SkillVehicleButton");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const InputEnums_1 = require("../../Input/InputEnums");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const PhantomUtil_1 = require("../Phantom/PhantomUtil");
const SkillButtonCustomHandleFactory_1 = require("./Custom/SkillButtonCustomHandleFactory");
const SkillButtonDataUtil_1 = require("./SkillButtonDataUtil");
exports.controlVisionTagId = 1427742187;
class SkillButtonData {
  constructor() {
    this.qxa = 0;
    this.sDe = undefined;
    this.Config = undefined;
    this.ConfigRole = undefined;
    this.ConfigFollower = undefined;
    this.ConfigVehicle = undefined;
    this.PriorityConfig = undefined;
    this.wmo = 0;
    this.DefaultSkillId = 0;
    this.SkillIdTagMap = new Map();
    this.E9_ = 0;
    this.RO = InputEnums_1.EInputAction.None;
    this.CSo = 0;
    this.ZMe = "";
    this.FormationData = undefined;
    this.gSo = [];
    this.pri = [];
    this.fSo = new Map();
    this.pQd = [];
    this.mEa = 0;
    this.pSo = [];
    this.DY_ = [];
    this.DynamicEffectTagIdMap = new Map();
    this.DynamicEffectId = 0;
    this.SkillIconTagIds = undefined;
    this.I9_ = 0;
    this.AttributeIdTagMap = new Map();
    this.AttributeEnableTagIds = undefined;
    this.AttributeId = 0;
    this.MaxAttributeId = 0;
    this.IsEnableWhenAttributeNoEnough = false;
    this.FormationAttributeIdTagMap = new Map();
    this.FormationAttributeId = 0;
    this.vSo = false;
    this.RoleConfig = undefined;
    this.Qst = undefined;
    this.ESo = undefined;
    this.SSo = undefined;
    this.ySo = false;
    this.ISo = undefined;
    this.TSo = undefined;
    this.LSo = undefined;
    this.DSo = false;
    this.J6a = 0;
    this.GameplayTagComponent = undefined;
    this.BuffComponent = undefined;
    this.u1t = undefined;
    this.RSo = undefined;
    this.$te = undefined;
    this.USo = undefined;
    this.Cvl = undefined;
    this.pWu = undefined;
    this.xut = 0;
    this.XMc = false;
    this.ConfigShowLongPressTagIds = [];
    this.ASo = false;
    this.DefaultHidden = false;
    this.BY_ = true;
    this.PSo = "";
    this.SkillIconName = "";
    this.xSo = undefined;
    this.wSo = "";
    this.Aot = undefined;
    this.npo = false;
    this.BSo = true;
    this.CustomHandle = undefined;
    this.IsLimitCountCustom = false;
    this.RemainingCountCustom = 0;
    this.TotalCoolDownCustom = 0;
    this.HideCoolDownTextCustom = false;
    this.gvl = true;
    this.pvl = false;
    this.fvl = 0;
    this.IsLimitCountVehicleSkill = false;
    this.RemainingCountVehicleSkill = 0;
    this.ExploreAsFightTagIds = [];
    this.IsExploreAsFight = false;
  }
  get bSo() {
    return this.DSo;
  }
  set bSo(t) {
    this.DSo = t;
  }
  Refresh(t, i, s, h) {
    var e;
    var r;
    var o;
    var n;
    var t = (this.sDe = t).Entity;
    this.qxa = s;
    if ((this.Config = i) instanceof SkillButton_1.SkillButton || i instanceof SkillCommonButton_1.SkillCommonButton) {
      this.ConfigRole = i;
    } else if (i instanceof SkillFollowerButton_1.SkillFollowerButton) {
      this.ConfigFollower = i;
    } else if (i instanceof SkillVehicleButton_1.SkillVehicleButton) {
      this.ConfigVehicle = i;
    }
    this.DefaultSkillId = i.SkillId;
    this.PriorityConfig = h;
    this.SkillIdTagMap.clear();
    this.DynamicEffectTagIdMap.clear();
    if (h) {
      for (var [l, a] of h.SkillIdTagMap) {
        this.SkillIdTagMap.set(l, a);
      }
      for (var [u, f] of h.DynamicEffectTagMap) {
        this.DynamicEffectTagIdMap.set(u, f);
      }
    }
    for ([e, r] of i.SkillIdTagMap) {
      this.SkillIdTagMap.set(e, r);
    }
    this.RO = i.ActionType;
    this.CSo = i.ButtonType;
    this.ZMe = InputEnums_1.EInputAction[this.RO];
    this.FormationData = ModelManager_1.ModelManager.SkillButtonUiModel.SkillButtonFormationData?.GetSkillButtonTypeFormationData(this.CSo);
    for ([o, n] of this.Config.DynamicEffectTagMap) {
      this.DynamicEffectTagIdMap.set(o, n);
    }
    this.SkillIconTagIds = [];
    for (const d of this.Config.SkillIconTags) {
      this.SkillIconTagIds.push(d);
    }
    if (this.ConfigRole) {
      this.kY_(this.ConfigRole);
      this.e8d(this.ConfigRole);
      this.DefaultHidden = this.ConfigRole.VisibleTags.length > 0;
    }
    if (this.ConfigFollower) {
      this.kY_(this.ConfigFollower);
      this.DefaultHidden = !this.ConfigFollower.IsVisible;
    }
    this.vSo = i.IsLongPressControlCamera;
    this.TSo = t.GetComponent(39);
    this.LSo = t.GetComponent(208);
    this.GameplayTagComponent = t.GetComponent(206);
    this.BuffComponent = t.GetComponent(210);
    this.u1t = t.GetComponent(0);
    this.RSo = t.GetComponent(62);
    this.$te = t.GetComponent(174);
    this.USo = t.GetComponent(43);
    this.Cvl = t.GetComponent(230);
    this.pWu = t.GetComponent(298);
    this.InitCustomHandle();
    this.InitVehicleHandle();
    this.qSo();
    this.RefreshIsExploreAsFight();
    this.RefreshSkillId();
    this.RefreshAttributeId();
    this.RefreshFormationAttributeId();
    this.SetExploreSkillChange(false);
    this.pmi();
    this.RefreshDynamicEffect();
    this.RefreshIsEnable();
    this.RefreshIsVisible();
    this.RefreshSkillTexturePath();
    if (this.ConfigRole || this.ConfigFollower) {
      this.RefreshFrameSpriteColor();
      this.NSo();
      this.OSo();
    }
    this.RefreshLongPressTime();
    this.RefreshIsShowLongPress();
    this.RefreshIsEnableLongPress();
    this.RefreshConfigIsShowLongPress();
  }
  Reset() {
    this.qxa = 0;
    this.sDe = undefined;
    this.Config = undefined;
    this.ConfigRole = undefined;
    this.ConfigFollower = undefined;
    this.DefaultSkillId = undefined;
    this.SkillIdTagMap = undefined;
    this.E9_ = 0;
    this.RO = InputEnums_1.EInputAction.None;
    this.ZMe = undefined;
    this.FormationData = undefined;
    this.AttributeIdTagMap = undefined;
    this.AttributeEnableTagIds = undefined;
    this.AttributeId = 0;
    this.MaxAttributeId = 0;
    this.IsEnableWhenAttributeNoEnough = false;
    this.FormationAttributeIdTagMap.clear();
    this.FormationAttributeId = 0;
    this.XMc = false;
    this.vSo = undefined;
    this.TSo = undefined;
    this.LSo = undefined;
    this.GameplayTagComponent = undefined;
    this.BuffComponent = undefined;
    this.u1t = undefined;
    this.RSo = undefined;
    this.$te = undefined;
    this.Cvl = undefined;
    this.RoleConfig = undefined;
    this.ESo = undefined;
    this.SSo = undefined;
    this.ySo = undefined;
    this.ISo = undefined;
    this.npo = false;
    this.BSo = true;
    this.CustomHandle = undefined;
    this.IsLimitCountCustom = false;
    this.RemainingCountCustom = 0;
    this.TotalCoolDownCustom = 0;
    this.HideCoolDownTextCustom = false;
    this.gvl = true;
    this.pvl = false;
    this.fvl = 0;
    this.IsExploreAsFight = false;
    this.I9_ = 0;
  }
  kY_(t) {
    this.AttributeId = t.AttributeId;
    this.MaxAttributeId = t.MaxAttributeId;
    if (t.AttributeIdTagMap.size > 0) {
      this.AttributeIdTagMap.set(0, [this.AttributeId, this.MaxAttributeId]);
      for (var [i, s] of t.AttributeIdTagMap) {
        this.AttributeIdTagMap.set(i, s.ArrayInt);
      }
    }
    t = t.AttributeEnableTags;
    if (t && t.length > 0) {
      this.AttributeEnableTagIds = [];
      for (const h of t) {
        this.AttributeEnableTagIds.push(h);
      }
    }
  }
  e8d(t) {
    for (var [i, s] of t.FormationAttributeIdTagMap) {
      this.FormationAttributeIdTagMap.set(i, s);
    }
  }
  qSo() {
    var i;
    var s;
    var t = this.Config;
    var h = this.ConfigRole;
    var e = this.PriorityConfig;
    this.gSo.length = 0;
    this.pri.length = 0;
    this.fSo.clear();
    this.pQd.length = 0;
    this.pSo.length = 0;
    this.DY_.length = 0;
    this.ConfigShowLongPressTagIds.length = 0;
    if (e) {
      for (var [r, o] of e.DisableSkillIdTags) {
        if (o) {
          var n = new Set();
          for (const l of o.ArrayInt) {
            n.add(l);
          }
          this.fSo.set(r, n);
        }
      }
      for (const a of e.DisableTags) {
        this.pri.push(a);
      }
    }
    if (h) {
      for (const u of h.EnableTags) {
        this.gSo.push(u);
      }
      for (const f of h.HiddenTags) {
        this.pSo.push(f);
      }
      for (const d of h.VisibleTags) {
        this.pQd.push(d);
      }
      for (const v of h.ShowLongPressTags) {
        this.ConfigShowLongPressTagIds.push(v);
      }
    } else if (this.ConfigVehicle) {
      for (const _ of this.ConfigVehicle.EnableTags) {
        this.gSo.push(_);
      }
    } else if (this.ConfigFollower) {
      for (const I of this.ConfigFollower.NotOccupyTags) {
        this.DY_.push(I);
      }
    }
    for (const g of t.DisableTags) {
      this.pri.push(g);
    }
    for ([i, s] of t.DisableSkillIdTags) {
      if (s) {
        let t = this.fSo.get(i);
        if (!t) {
          t = new Set();
          this.fSo.set(i, t);
        }
        for (const m of s.ArrayInt) {
          t.add(m);
        }
      }
    }
    e = SkillButtonData.GetCommonDisableTagIdByButtonType(this.CSo);
    if (e) {
      this.pri.push(e);
    }
    this.pri.push(1008164187);
    h = SkillButtonData.GetCommonHiddenTagIdByButtonType(this.CSo);
    if (h) {
      this.mEa = h;
      this.pSo.push(h);
    } else {
      this.mEa = 0;
    }
    if (this.CSo === 7) {
      this.ExploreAsFightTagIds.push(362533963);
    }
  }
  static GetCommonDisableTagIdByButtonType(t) {
    return SkillButtonDataUtil_1.SkillButtonDataUtil.DisableTagMap.get(t);
  }
  static GetCommonHiddenTagIdByButtonType(t) {
    return SkillButtonDataUtil_1.SkillButtonDataUtil.HiddenTagMap.get(t);
  }
  GetEnableTagIds() {
    return this.gSo;
  }
  GetDisableTagIds() {
    return this.pri;
  }
  GetDisableSkillIdTagIds() {
    return this.fSo;
  }
  GetVisibleTagIds() {
    return this.pQd;
  }
  GetHiddenTagIds() {
    return this.pSo;
  }
  GetNotOccupyTagIds() {
    return this.DY_;
  }
  GetConfigType() {
    return this.qxa;
  }
  IsCdVisible() {
    return !!this.ConfigFollower || !!this.ConfigVehicle?.IsCdVisible || !!this.ConfigRole?.IsCdVisible;
  }
  GetMaxAttributeBurstEffectId() {
    return this.ConfigRole?.MaxAttributeBurstEffectId ?? 0;
  }
  GetMaxAttributeBurstEffectConfig() {
    var t = this.GetMaxAttributeBurstEffectId();
    return ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillButtonEffectConfig(t);
  }
  VSo() {
    var t;
    if (!this.Qst) {
      t = (this.ConfigFollower || this.RoleConfig).ElementId;
      this.Qst = ConfigManager_1.ConfigManager.BattleUiConfig.GetElementConfig(t);
    }
    return this.Qst;
  }
  GetCdCompletedEffectId() {
    return this.ConfigRole?.CdCompletedEffectId ?? 0;
  }
  GetCdCompletedEffectConfig() {
    var t = this.GetCdCompletedEffectId();
    return ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillButtonEffectConfig(t);
  }
  GetDynamicEffectConfig() {
    if (this.DynamicEffectId !== 0) {
      return ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillButtonEffectConfig(this.DynamicEffectId);
    }
  }
  RefreshDynamicEffect() {
    for (var [t, i] of this.DynamicEffectTagIdMap) {
      if (this.mSo(t)) {
        this.DynamicEffectId = i;
        return;
      }
    }
    this.DynamicEffectId = 0;
  }
  RefreshIsExploreAsFight() {
    for (const t of this.ExploreAsFightTagIds) {
      if (this.mSo(t)) {
        this.IsExploreAsFight = true;
        return;
      }
    }
    this.IsExploreAsFight = false;
  }
  GetActionType() {
    return this.RO;
  }
  GetInputAction() {
    var t = this.GetActionType();
    return InputEnums_1.EInputAction[t];
  }
  GetButtonType() {
    return this.CSo;
  }
  GetEntityHandle() {
    return this.sDe;
  }
  GetEntityId() {
    return this.sDe.Entity.Id;
  }
  GetSkillId() {
    return this.wmo;
  }
  GetSkillConfig() {
    return this.ESo;
  }
  GetSkillTexturePath() {
    return this.PSo;
  }
  GetSkillIconName() {
    return this.SkillIconName;
  }
  GetActionName() {
    return this.ZMe;
  }
  IsEnable() {
    return this.bSo;
  }
  IsEnableInput() {
    return this.bSo || this.CSo !== 7;
  }
  IsVisible() {
    return this.ASo;
  }
  IsOccupy() {
    return this.BY_;
  }
  HasAttribute() {
    return this.AttributeId !== 0 && this.MaxAttributeId !== 0 || this.FormationAttributeId !== 0;
  }
  GetAttribute() {
    if (this.FormationAttributeId !== 0) {
      return ControllerHolder_1.ControllerHolder.FormationAttributeController.GetValue(this.FormationAttributeId);
    } else {
      return this.$te.GetCurrentValue(this.AttributeId);
    }
  }
  GetMaxAttribute() {
    if (this.FormationAttributeId !== 0) {
      return ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(this.FormationAttributeId);
    } else {
      return this.$te.GetCurrentValue(this.MaxAttributeId);
    }
  }
  GetMaxAttributeColor() {
    return this.xSo;
  }
  GetMaxAttributeEffectPath() {
    return this.wSo;
  }
  GetFrameSpriteColor() {
    return this.Aot;
  }
  GetIsLongPressControlCamera() {
    return !!this.FormationData?.IsLongPressControlCamera || this.vSo;
  }
  GetLongPressTime() {
    if (this.FormationData?.IsLongPressControlCamera) {
      return this.FormationData.LongPressTime;
    } else {
      return this.xut;
    }
  }
  GetMultiSkillInfo() {
    return this.ISo || (this.ySo ? (this.ISo = this.LSo?.GetMultiSkillInfo(this.wmo), this.ISo) : undefined);
  }
  IsMultiStageSkill() {
    return this.ySo;
  }
  GetMultiSkillTexturePath() {
    if (this.CSo === 9) {
      return this.PSo;
    }
    var t = this.GetMultiSkillInfo();
    if (!t || t.NextSkillId === 0) {
      return this.PSo;
    }
    t = this.FindSkillConfig(t.NextSkillId);
    if (t) {
      t = t.SkillIcon;
      if (t) {
        t = t.AssetPathName;
        if (!FNameUtil_1.FNameUtil.IsNothing(t)) {
          return t.toString();
        }
      }
    }
  }
  RefreshVisionMultiSkillInfo(t, i) {
    if (this.ISo !== t) {
      if (i !== ModelManager_1.ModelManager.CreatureModel.GetEntity(this.u1t.VisionSkillServerEntityId)?.Id) {
        return false;
      }
      this.ySo = true;
      this.ISo = t;
    }
    return true;
  }
  GetSkillRemainingCoolDown() {
    if (this.SSo) {
      return this.SSo.CurRemainingCd;
    } else {
      return 0;
    }
  }
  GetGroupSkillCdInfo() {
    return this.SSo;
  }
  HasCdComponent() {
    return this.LSo !== undefined;
  }
  RefreshSkillId() {
    var t;
    var i;
    var s = this.wmo;
    this.wmo = this.DefaultSkillId;
    this.E9_ = 0;
    let h = false;
    for ([t, i] of this.SkillIdTagMap) {
      if (this.mSo(t)) {
        this.wmo = i;
        this.E9_ = t;
        h = true;
        break;
      }
    }
    this.HSo(h);
    this.jSo(h);
    if (s !== this.wmo) {
      this.Jlo();
    }
  }
  Jlo() {
    if (this.wmo) {
      this.ESo = this.TSo.GetSkillInfo(this.wmo);
      this.SSo = this.LSo?.GetGroupSkillCdInfo(this.wmo);
      this.ySo = !!this.ESo && this.ESo.CooldownConfig.SectionCount > 1;
    } else {
      this.ESo = undefined;
      this.SSo = undefined;
      this.ySo = false;
    }
    this.ISo = undefined;
  }
  RefreshSkillIdByTag(t) {
    var i;
    if (this.E9_ !== 0) {
      this.RefreshSkillId();
    } else if ((i = this.SkillIdTagMap.get(t)) !== this.wmo) {
      this.wmo = i;
      this.E9_ = t;
      this.Jlo();
    }
  }
  HSo(i) {
    if (this.RO === InputEnums_1.EInputAction.幻象2 && this.ConfigRole) {
      let t = undefined;
      if (t = this.GameplayTagComponent.HasTag(exports.controlVisionTagId) ? this.USo.GetVisionSkillInformation(3)?.r5n : this.USo.GetVisionId()) {
        var s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(t);
        if (s) {
          if (!i) {
            this.wmo = s.SkillGroupId;
          }
          this.PSo = s.BattleViewIcon;
          this.SkillIconName = undefined;
          this.BSo = PhantomUtil_1.PhantomUtil.GetVisionData(t)?.空中能否释放 ?? true;
          return;
        }
      }
      if (!i) {
        this.wmo = undefined;
      }
      this.PSo = undefined;
      this.SkillIconName = undefined;
      this.BSo = true;
    }
  }
  jSo(t) {
    if (!t && this.RO === InputEnums_1.EInputAction.幻象1 && (!!this.ConfigRole || !!this.ConfigVehicle)) {
      if (t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId) {
        if (ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(t)?.SkillType !== 5) {
          t = PhantomUtil_1.PhantomUtil.GetVisionData(t);
          this.SetExploreSkillChange(this.wmo !== t.技能ID);
          this.wmo = t.技能ID;
        }
      } else if (this.wmo !== undefined) {
        this.SetExploreSkillChange(true);
        this.wmo = undefined;
      }
    }
  }
  GetExploreSkillChange() {
    return this.npo;
  }
  SetExploreSkillChange(t) {
    this.npo = t;
  }
  GetIsVisionEnableInAir() {
    return this.BSo;
  }
  RefreshAttributeId() {
    if (!(this.AttributeIdTagMap.size <= 0)) {
      this.IsEnableWhenAttributeNoEnough = false;
      for (var [t, i] of this.AttributeIdTagMap) {
        if (this.mSo(t)) {
          this.AttributeId = i[0];
          this.MaxAttributeId = i[1];
          if (this.AttributeEnableTagIds?.includes(t)) {
            this.IsEnableWhenAttributeNoEnough = true;
          }
          return;
        }
      }
      var s = this.AttributeIdTagMap.get(0);
      this.AttributeId = s[0];
      this.MaxAttributeId = s[1];
    }
  }
  RefreshFormationAttributeId() {
    for (var [t, i] of this.FormationAttributeIdTagMap) {
      if (this.mSo(t)) {
        this.FormationAttributeId = i;
        return;
      }
    }
    this.FormationAttributeId = 0;
  }
  pmi() {
    if (this.u1t && this.ConfigRole) {
      this.RoleConfig = this.u1t.GetRoleConfig();
    }
  }
  RefreshSkillTexturePathBySkillIconTag(t) {
    if (this.I9_ !== 0) {
      this.RefreshSkillTexturePath();
    } else {
      this.T9_(t);
    }
  }
  T9_(t) {
    var i;
    var s = ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillIconConfigByTag(t);
    return !!s && (i = s.IconPath, this.SkillIconName = s.Name, !StringUtils_1.StringUtils.IsEmpty(i)) && (this.PSo = i, this.I9_ = t, true);
  }
  RefreshSkillTexturePath() {
    this.I9_ = 0;
    if (this.SkillIconTagIds && this.SkillIconTagIds.length > 0) {
      for (const s of this.SkillIconTagIds) {
        if (this.mSo(s) && this.T9_(s)) {
          return;
        }
      }
    }
    var t = this.FormationData?.SkillIconPath;
    if (t) {
      var i = this.FormationData.EnableSkillId;
      if (i === 0 || i === this.wmo) {
        this.PSo = t;
        this.SkillIconName = undefined;
        return;
      }
    }
    this.SkillIconName = undefined;
    if (this.ConfigRole || this.ConfigVehicle) {
      if (this.RO === InputEnums_1.EInputAction.幻象1) {
        var i = this.WSo();
        if (i) {
          this.PSo = i;
          return;
        }
      } else if (this.RO === InputEnums_1.EInputAction.幻象2 && this.PSo !== undefined) {
        return;
      }
    }
    if (this.wmo === -1 && this.ConfigFollower) {
      this.PSo = this.ConfigFollower.SkillIcon;
    } else if (this.wmo === -1 && this.ConfigVehicle) {
      this.PSo = this.ConfigVehicle.SkillIcon;
    } else if (!(t = this.GetSkillConfig()) || !(i = t.SkillIcon) || (t = i.AssetPathName, FNameUtil_1.FNameUtil.IsNothing(t))) {
      this.PSo = undefined;
    } else {
      this.PSo = t.toString();
    }
  }
  NSo() {
    var t = this.VSo().SkillEffectColor;
    this.xSo = new UE.LinearColor(UE.Color.FromHex(t));
  }
  OSo() {
    var t = this.VSo();
    this.wSo = t.SkillButtonEffectPath;
  }
  RefreshFrameSpriteColor() {
    var t;
    if (this.HasAttribute()) {
      t = this.VSo();
      this.Aot = UE.Color.FromHex(t.UltimateSkillColor);
    } else {
      this.Aot = undefined;
    }
  }
  RefreshIsEnable() {
    for (const h of this.gSo) {
      if (this.mSo(h)) {
        this.bSo = true;
        this.J6a = 1;
        return;
      }
    }
    if (this.RO && !ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(this.RO)) {
      this.bSo = false;
      this.J6a = 2;
    } else if (this.CustomHandle?.ForceEnable) {
      this.bSo = true;
      this.J6a = 10;
    } else if (this.HasAttribute() && this.GetAttribute() < this.GetMaxAttribute() && (!this.IsEnableWhenAttributeNoEnough || this.FormationAttributeId !== 0)) {
      this.bSo = false;
      this.J6a = 3;
    } else {
      if (this.Cvl?.IsOnVehicle) {
        if (this.Cvl?.IsVehicleType("Gongduola") || this.Cvl?.IsVehicleType("AutoMoveGongduola")) {
          if (this.RO === InputEnums_1.EInputAction.幻象1) {
            this.bSo = true;
            this.J6a = 11;
            return;
          }
          if (this.RO === InputEnums_1.EInputAction.跳跃) {
            this.bSo = !!this.Cvl?.CanLeave;
            this.J6a = 11;
            return;
          }
          if (this.Cvl?.IsVehicleType("Gongduola")) {
            if (this.RO === InputEnums_1.EInputAction.闪避) {
              this.bSo = !!this.Cvl?.CanSprint;
              this.J6a = 11;
              return;
            }
            if (this.RO === InputEnums_1.EInputAction.技能1) {
              this.bSo = !!this.Cvl?.CanRiderSharing;
              this.J6a = 11;
              return;
            }
          }
        } else if (this.Cvl?.IsVehicleType("NpcVehicle") && this.RO === InputEnums_1.EInputAction.跳跃) {
          this.bSo = true;
          this.J6a = 11;
          return;
        }
      }
      for (const e of this.pri) {
        if (this.mSo(e)) {
          this.bSo = false;
          this.J6a = 4;
          return;
        }
      }
      if (this.wmo) {
        for (var [t, i] of this.fSo) {
          if (this.mSo(t) && i.has(this.wmo)) {
            this.bSo = false;
            this.J6a = 5;
            return;
          }
        }
      }
      if (this.ySo) {
        var s = this.GetMultiSkillInfo();
        if (s && s.NextSkillId !== 0) {
          this.bSo = s.RemainingStartTime <= 0;
          this.J6a = 6;
          return;
        }
      }
      if (this.IsUseItem && !this.IsExploreAsFight && (this.IsEquippedItemBanReqUse() || this.IsSkillInItemUseCd())) {
        this.bSo = false;
        this.J6a = 7;
      } else {
        if (this.LSo) {
          s = this.GetGroupSkillCdInfo();
          if (!s || s.RemainingCount <= 0) {
            this.bSo = false;
            this.J6a = 8;
            return;
          }
        }
        if (this.RO === InputEnums_1.EInputAction.幻象2 && !this.BSo && this.mSo(40422668)) {
          this.bSo = false;
          this.J6a = 9;
        } else {
          this.bSo = true;
          this.J6a = 0;
        }
      }
    }
  }
  SetEnable(t, i) {
    this.bSo = t;
    this.J6a = i;
  }
  RefreshIsVisible(t = true) {
    if (this.DefaultHidden) {
      let t = false;
      if (this.FormationData?.IgnoreDefaultHidden) {
        t = true;
      } else {
        for (const i of this.pQd) {
          if (this.mSo(i)) {
            t = true;
            break;
          }
        }
      }
      if (!t) {
        this.ASo = false;
        return;
      }
    }
    if (this.RO && !ModelManager_1.ModelManager.BattleInputModel?.GetInputVisible(this.RO)) {
      this.ASo = false;
    } else {
      if (t) {
        if (this.FormationData?.IgnoreHiddenTag) {
          if (this.mSo(this.mEa)) {
            this.ASo = false;
            return;
          }
        } else {
          for (const s of this.pSo) {
            if (this.mSo(s)) {
              this.ASo = false;
              return;
            }
          }
        }
      }
      this.ASo = true;
    }
  }
  SetInvisible() {
    this.ASo = false;
  }
  SetDefaultHidden(t) {
    this.DefaultHidden = t;
  }
  RefreshIsOccupy() {
    for (const t of this.DY_) {
      if (this.mSo(t)) {
        this.BY_ = false;
        return;
      }
    }
    this.BY_ = true;
  }
  SetNotOccupy() {
    this.BY_ = false;
  }
  RefreshLongPressTime() {
    var t = this.GetActionType();
    var t = this.RSo?.GetHoldConfig(t);
    if (t) {
      t = t[1];
      this.xut = t <= 0 ? this.Config.LongPressTime / CommonDefine_1.MILLIONSECOND_PER_SECOND : t;
    } else {
      this.xut = this.Config.LongPressTime / CommonDefine_1.MILLIONSECOND_PER_SECOND;
    }
  }
  WSo() {
    return ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillIcon;
  }
  FindSkillConfig(t) {
    if (t) {
      return this.TSo.GetSkillInfo(t);
    }
  }
  mSo(t) {
    return !!this.GameplayTagComponent && this.GameplayTagComponent.HasTag(t);
  }
  get IsUseItem() {
    return !this.ConfigFollower && this.RO === InputEnums_1.EInputAction.幻象1 && ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn;
  }
  IsSkillInItemUseCd() {
    return this.RO === InputEnums_1.EInputAction.幻象1 && (this.IsSkillInItemUseBuffCd() || this.IsSkillInItemUseSkillCd());
  }
  IsEquippedItemBanReqUse() {
    return !!this.IsUseItem && ModelManager_1.ModelManager.RouletteModel.IsEquippedItemBanReqUse();
  }
  IsSkillInItemUseBuffCd() {
    return !!this.IsUseItem && !this.IsExploreAsFight && ModelManager_1.ModelManager.RouletteModel.IsEquipItemInBuffCd();
  }
  GetEquippedItemUsingBuffCd() {
    var t;
    var i;
    if (this.IsUseItem) {
      t = ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId;
      return [(i = ModelManager_1.ModelManager.BuffItemModel).GetBuffItemRemainCdTime(t), i.GetBuffItemTotalCdTime(t)];
    } else {
      return [0, 0];
    }
  }
  IsSkillInItemUseSkillCd() {
    if (this.IsUseItem && this.LSo && !this.IsExploreAsFight) {
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId)?.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill);
      if (t) {
        return this.LSo.GetGroupSkillCdInfo(t)?.CurRemainingCd - TimeUtil_1.TimeUtil.TimeDeviation > 0;
      }
    }
    return false;
  }
  GetEquippedItemUsingSkillCd() {
    if (this.IsUseItem && this.LSo) {
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId)?.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill);
      if (t) {
        return [(t = this.LSo.GetGroupSkillCdInfo(t)).CurRemainingCd, t.CurMaxCd];
      }
    }
    return [0, 0];
  }
  IsVehicleSkillInCd() {
    if (this.Cvl?.IsOnVehicle && this.Cvl.IsVehicleType("Gongduola") && this.Cvl.VehicleEntity?.GetComponent(246)?.IsSprintSkillInCd()) {
      return true;
    }
    return false;
  }
  GetVehicleSkillCd() {
    if (this.Cvl?.IsOnVehicle && this.Cvl.IsVehicleType("Gongduola")) {
      var t = this.Cvl.VehicleEntity?.GetComponent(246)?.GetSprintSkillRemainingCd();
      if (t) {
        return t;
      }
    }
    return [0, 0];
  }
  GetDebugInfo() {
    return `Type:${this.CSo},SkillId:${this.wmo},Visible:${this.ASo},Enable:${this.bSo},${this.J6a},`;
  }
  InitCustomHandle() {
    if ((this.Config instanceof SkillButton_1.SkillButton || this.Config instanceof SkillFollowerButton_1.SkillFollowerButton) && (this.CustomHandle = SkillButtonCustomHandleFactory_1.SkillButtonCustomHandleFactory.GetSkillButtonCustomHandleById(this.Config.CustomHandleId), this.CustomHandle)) {
      this.CustomHandle.Init(this);
      this.CustomHandle.Refresh();
    }
  }
  GetRemainingCoolDownCustom() {
    return this.CustomHandle?.GetCustomRemainingCoolDown() ?? 0;
  }
  InitVehicleHandle() {
    var t;
    this.IsLimitCountVehicleSkill = false;
    this.RemainingCountVehicleSkill = 0;
    if (this.CSo === 5 && this.Cvl?.IsOnVehicle && this.Cvl.IsVehicleType("Gongduola") && (this.IsLimitCountVehicleSkill = true, t = this.Cvl.VehicleEntity?.GetComponent(246))) {
      this.RemainingCountVehicleSkill = t.GetSprintSkillUsableCount();
    }
  }
  IsEnableLongPress() {
    return this.gvl;
  }
  RefreshIsEnableLongPress() {
    if (this.CSo === 7) {
      if (this.Cvl?.IsVehicleType("Gongduola")) {
        this.gvl = false;
      } else {
        this.gvl = true;
      }
    }
  }
  IsShowLongPress() {
    return this.pvl;
  }
  RefreshIsShowLongPress() {
    switch (this.CSo) {
      case 1:
        if (this.ConfigVehicle?.ShowLongPress || this.Cvl?.IsOnVehicle && this.Cvl?.IsEnableLongPressLeave()) {
          this.pvl = true;
          this.RefreshLongPressDuration();
        } else {
          this.pvl = false;
        }
        break;
      case 6:
        if (this.pWu?.GetRoleState() !== 0) {
          this.pvl = true;
          this.RefreshLongPressDuration();
        } else {
          this.pvl = false;
        }
        break;
      default:
        this.pvl = false;
    }
  }
  RefreshLongPressDuration() {
    let t = undefined;
    var i;
    if (this.ConfigVehicle) {
      t = this.sDe?.Entity;
    } else if (this.Cvl?.IsOnVehicle && this.Cvl?.IsEnableLongPressLeave()) {
      t = this.Cvl?.VehicleEntity;
    }
    if (t) {
      i = t?.GetComponent(241)?.GetHoldConfig(this.RO);
      this.fvl = i ? i[1] : 0;
    }
    if (this.pWu && (i = this.pWu.GetLongPressDuration(this.RO)) > 0) {
      this.fvl = i;
    }
  }
  GetLongPressDuration() {
    return this.fvl;
  }
  GetIsConfigShowLongPress() {
    return this.XMc;
  }
  SetIsConfigShowLongPress(t) {
    this.XMc = t;
  }
  RefreshConfigIsShowLongPress() {
    for (const t of this.ConfigShowLongPressTagIds) {
      if (this.mSo(t)) {
        this.XMc = true;
        return;
      }
    }
    this.XMc = false;
  }
  GetIsLongPressing() {
    let t = undefined;
    if (this.ConfigVehicle) {
      t = this.sDe?.Entity;
    } else if (this.Cvl?.IsOnVehicle) {
      t = this.Cvl?.VehicleEntity;
    }
    var i = !!t?.GetComponent(241)?.IsHoldingAction(this.RO);
    var s = !!this.pWu?.IsHoldingAction(this.RO);
    return i || s;
  }
  HasConfigFollower() {
    return this.ConfigFollower !== undefined;
  }
  GetFormationData() {
    return this.FormationData;
  }
}
exports.SkillButtonData = SkillButtonData;
//# sourceMappingURL=SkillButtonData.js.map