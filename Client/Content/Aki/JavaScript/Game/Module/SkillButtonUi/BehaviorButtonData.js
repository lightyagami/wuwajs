"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorButtonData = undefined;
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const InputEnums_1 = require("../../Input/InputEnums");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
class BehaviorButtonData {
  constructor() {
    this.EntityHandle = undefined;
    this.Config = undefined;
    this.u1t = undefined;
    this.Kst = undefined;
    this.TSo = undefined;
    this.IsCurEntity = false;
    this.ButtonType = 0;
    this.ActionName = "";
    this.InputAction = InputEnums_1.EInputAction.None;
    this.RoleConfig = undefined;
    this.ESo = undefined;
    this.SkillId = 0;
    this.DefaultSkillId = 0;
    this.SkillIdTagMap = new Map();
    this.E9_ = 0;
    this.SkillIconTagIds = undefined;
    this.I9_ = 0;
    this.SkillTexturePath = "";
    this.SkillIconName = "";
    this.DynamicEffectTagIdMap = new Map();
    this.DynamicEffectId = 0;
    this.State = 0;
    this.SkillIconPathList = undefined;
    this.DisableTagIds = [];
    this.DisableSkillIdTagIds = new Map();
    this.VisibleTagIds = [];
    this.HiddenTagIds = [];
    this.IsEnableInternal = false;
    this.IsVisibleInternal = false;
  }
  Refresh(t, i) {
    this.EntityHandle = t;
    this.Config = i;
    t = t.Entity;
    this.InputAction = i.ActionType;
    this.ButtonType = i.ButtonType;
    this.ActionName = InputEnums_1.EInputAction[this.InputAction];
    this.DefaultSkillId = i.SkillId;
    this.Kst = t.GetComponent(215);
    this.u1t = t.GetComponent(0);
    this.TSo = t.GetComponent(40);
    this.State = 0;
    this.SkillIconPathList = [];
    if (i.SkillIcons) {
      for (const s of i.SkillIcons) {
        this.SkillIconPathList.push(s);
      }
    }
    this.RoleConfig = this.u1t?.GetRoleConfig();
    this.qSo();
    this.RefreshSkillId();
    this.RefreshDynamicEffect();
    this.RefreshIsEnable();
    this.RefreshIsVisible();
    this.RefreshSkillTexturePath();
  }
  qSo() {
    this.DisableTagIds.length = 0;
    this.DisableSkillIdTagIds.clear();
    this.VisibleTagIds.length = 0;
    this.HiddenTagIds.length = 0;
    for (const n of this.Config.HiddenTags) {
      this.HiddenTagIds.push(n);
    }
    for (const o of this.Config.VisibleTags) {
      this.VisibleTagIds.push(o);
    }
    for (const a of this.Config.DisableTags) {
      this.DisableTagIds.push(a);
    }
    for (var [i, s] of this.Config.DisableSkillIdTags) {
      if (s) {
        let t = this.DisableSkillIdTagIds.get(i);
        if (!t) {
          t = new Set();
          this.DisableSkillIdTagIds.set(i, t);
        }
        for (const f of s.ArrayInt) {
          t.add(f);
        }
      }
    }
    this.SkillIconTagIds = [];
    for (const u of this.Config.SkillIconTags) {
      this.SkillIconTagIds.push(u);
    }
    this.SkillIdTagMap.clear();
    for (var [t, h] of this.Config.SkillIdTagMap) {
      this.SkillIdTagMap.set(t, h);
    }
    this.DynamicEffectTagIdMap.clear();
    for (var [e, r] of this.Config.DynamicEffectTagMap) {
      this.DynamicEffectTagIdMap.set(e, r);
    }
  }
  RefreshSkillId() {
    var t;
    var i;
    var s = this.SkillId;
    this.SkillId = this.DefaultSkillId;
    this.E9_ = 0;
    for ([t, i] of this.SkillIdTagMap) {
      if (this.mSo(t)) {
        this.SkillId = i;
        this.E9_ = t;
        break;
      }
    }
    if (s !== this.SkillId) {
      this.Jlo();
    }
  }
  Jlo() {
    if (this.SkillId) {
      this.ESo = this.TSo.GetSkillInfo(this.SkillId);
    } else {
      this.ESo = undefined;
    }
  }
  RefreshIsEnable() {
    for (const s of this.DisableTagIds) {
      if (this.mSo(s)) {
        this.IsEnableInternal = false;
        return;
      }
    }
    if (this.SkillId) {
      for (var [t, i] of this.DisableSkillIdTagIds) {
        if (this.mSo(t) && i.has(this.SkillId)) {
          this.IsEnableInternal = false;
          return;
        }
      }
    }
    this.IsEnableInternal = true;
  }
  RefreshIsVisible() {
    if (this.VisibleTagIds.length > 0) {
      for (const t of this.VisibleTagIds) {
        if (this.mSo(t)) {
          this.IsVisibleInternal = true;
          return;
        }
      }
    }
    if (this.ButtonType !== 101 || this.RoleConfig?.IsAim || ModelManager_1.ModelManager.BattleUiModel.MotorcycleData?.IsDriving) {
      for (const i of this.HiddenTagIds) {
        if (this.mSo(i)) {
          this.IsVisibleInternal = false;
          return;
        }
      }
      this.IsVisibleInternal = true;
    } else {
      this.IsVisibleInternal = false;
    }
  }
  RefreshSkillTexturePath() {
    this.I9_ = 0;
    if (this.SkillIconTagIds && this.SkillIconTagIds.length > 0) {
      for (const i of this.SkillIconTagIds) {
        if (this.mSo(i) && this.T9_(i)) {
          return;
        }
      }
    }
    var t;
    this.SkillIconName = undefined;
    if (this.SkillId === 0 && this.SkillIconPathList) {
      this.SkillTexturePath = this.SkillIconPathList[this.State];
    } else if (!(t = this.ESo) || !(t = t.SkillIcon) || (t = t.AssetPathName, FNameUtil_1.FNameUtil.IsNothing(t))) {
      this.SkillTexturePath = undefined;
    } else {
      this.SkillTexturePath = t.toString();
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
  mSo(t) {
    return !!this.Kst && this.Kst.HasTag(t);
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
    return !!s && (i = s.IconPath, this.SkillIconName = s.Name, !StringUtils_1.StringUtils.IsEmpty(i)) && (this.SkillTexturePath = i, this.I9_ = t, true);
  }
  IsEnable() {
    return this.IsEnableInternal;
  }
  GetSkillId() {
    return this.SkillId;
  }
  GetDisableSkillIdTagIds() {
    return this.DisableSkillIdTagIds;
  }
  SetEnable(t) {
    this.IsEnableInternal = t;
  }
  GetButtonType() {
    return this.ButtonType;
  }
  IsVisible() {
    return this.IsVisibleInternal;
  }
  GetSkillTexturePath() {
    return this.SkillTexturePath;
  }
  IsSkillIdChangeByTag() {
    return this.E9_ !== 0;
  }
  GetDynamicEffectConfig() {
    if (this.DynamicEffectId !== 0) {
      return ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillButtonEffectConfig(this.DynamicEffectId);
    }
  }
  GetActionName() {
    if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
      var t = BehaviorButtonData.EVf.get(this.ButtonType);
      if (t) {
        return t;
      }
    }
    return this.ActionName;
  }
}
(exports.BehaviorButtonData = BehaviorButtonData).EVf = new Map([[101, InputMappingsDefine_1.actionMappings.载具视角切换], [102, InputMappingsDefine_1.actionMappings.载具锁定目标]]);
//# sourceMappingURL=BehaviorButtonData.js.map