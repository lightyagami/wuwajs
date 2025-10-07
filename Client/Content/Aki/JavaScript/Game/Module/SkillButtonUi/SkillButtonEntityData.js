"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonEntityData = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Stats_1 = require("../../../Core/Common/Stats");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const InputEnums_1 = require("../../Input/InputEnums");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatLog_1 = require("../../Utils/CombatLog");
const BehaviorButtonData_1 = require("./BehaviorButtonData");
const BehaviorButtonMapping_1 = require("./BehaviorButtonMapping");
const SkillButtonData_1 = require("./SkillButtonData");
const SkillButtonMapping_1 = require("./SkillButtonMapping");
const SkillButtonUiController_1 = require("./SkillButtonUiController");
const SkillButtonUiDefine_1 = require("./SkillButtonUiDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const buttonTypeToActionNameMap = new Map([[101, InputEnums_1.EInputAction.瞄准], [102, InputEnums_1.EInputAction.锁定目标]]);
const commonRoleSkillButtonTypes = new Set([4, 6, 8, 11]);
class SkillButtonEntityData {
  constructor() {
    this.IsCurEntity = false;
    this.EntityHandle = undefined;
    this.RoleId = 0;
    this.RoleConfig = undefined;
    this.AttributeComponent = undefined;
    this.GameplayTagComponent = undefined;
    this.SkillComponent = undefined;
    this.CharacterSkillCdComponent = undefined;
    this.Cvl = undefined;
    this.SkillButtonConfigList = undefined;
    this.SkillCommonButtonConfigList = undefined;
    this.SkillButtonIndexConfig = undefined;
    this.SkillButtonDataMap = new Map();
    this.BehaviorButtonDataMap = new Map();
    this.AttributeIdSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.AttributeIdTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.FormationAttrIdSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.FormationAttrIdTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.EnableTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.DisableTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.DisableSkillIdTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.VisibleTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.HiddenTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.DynamicEffectTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.ConfigShowLongPressTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.SkillIconTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.SkillIdTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.CustomHandleSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.KSo = new BehaviorButtonMapping_1.BehaviorButtonMapping();
    this.QSo = new BehaviorButtonMapping_1.BehaviorButtonMapping();
    this.XSo = new Set();
    this.GYe = new Map();
    this.t8d = new Map();
    this.i8d = new Map();
    this.wXe = undefined;
    this.$So = new Set();
    this.YSo = new Set();
    this.JSo = new Set();
    this.zSo = new Set();
    this.ZSo = new Set();
    this.eyo = new Set();
    this.tyo = new Set();
    this.pdt = new Set();
    this.vvl = new Set();
    this.iyo = false;
    this.oyo = false;
    this.ryo = 4;
    this.GXe = () => {
      this.wXe = undefined;
      for (const t of this.$So) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonEnableRefresh, t.GetButtonType(), -1);
      }
      this.$So.clear();
      for (const i of this.YSo) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonVisibleRefresh, i.GetButtonType());
      }
      this.YSo.clear();
      for (const s of this.JSo) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh, s.GetButtonType());
      }
      this.JSo.clear();
      for (const h of this.zSo) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonIconPathRefresh, h.GetButtonType());
      }
      this.zSo.clear();
      for (const e of this.ZSo) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh, e.GetButtonType());
      }
      this.ZSo.clear();
      for (const o of this.tyo) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonCdRefresh, o.GetButtonType());
      }
      this.tyo.clear();
      for (const n of this.pdt) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonAttributeRefresh, n.GetButtonType());
      }
      this.pdt.clear();
      for (const r of this.eyo) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh, r.ButtonType);
      }
      this.eyo.clear();
      if (this.iyo) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonIndexRefresh);
        this.iyo = false;
      }
      if (this.oyo) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonDataRefresh, this.ryo);
        this.oyo = false;
      }
      for (const a of this.vvl) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonLongPressRefresh, a.GetButtonType());
      }
      this.vvl.clear();
    };
    this.nyo = (t, i) => {
      var s;
      var h = this.SkillButtonDataMap.get(7);
      if (h && h.IsUseItem && (s = h.IsEnable(), h.RefreshIsEnable(), this.IsCurEntity)) {
        if (s !== h.IsEnable()) {
          this.$So.add(h);
        }
        this.VXe();
      }
    };
    this.syo = () => {
      var t;
      var i;
      var s;
      var h;
      var e = this.SkillButtonDataMap.get(9);
      if (e && (t = e.GetSkillId(), i = e.GetSkillTexturePath(), e.RefreshSkillId(), e.RefreshSkillTexturePath(), s = e.GetSkillId(), h = e.GetSkillTexturePath(), t !== s && (e.RefreshIsEnable(), this.IsCurEntity) && (this.JSo.add(e), this.VXe()), i !== h) && this.IsCurEntity) {
        this.zSo.add(e);
        this.VXe();
      }
    };
    this.ayo = (t, i) => {
      var s;
      var h = this.SkillButtonDataMap.get(9);
      if (h && !h.GetIsVisionEnableInAir() && (s = h.IsEnable(), h.RefreshIsEnable(), this.IsCurEntity && h.IsEnable() !== s)) {
        this.$So.add(h);
        this.VXe();
      }
    };
    this.M6l = t => {
      if (t.IsRolePassenger(true)) {
        this.Ai_(true, t);
      }
    };
    this.E6l = t => {
      if (t.IsRolePassenger(true)) {
        this.Ai_(false, t);
      }
    };
    this.yKl = (t, i) => {
      if (i === InputEnums_1.EInputAction.跳跃) {
        this.RefreshEnableByButtonType(1);
        if (!t) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillLongPressEnd, InputEnums_1.EInputAction.跳跃);
        }
      } else if (i === InputEnums_1.EInputAction.闪避) {
        this.RefreshEnableByButtonType(5);
      } else if (i === InputEnums_1.EInputAction.技能1) {
        this.RefreshEnableByButtonType(6);
      }
    };
    this.H6l = (t, i) => {
      var s = this.SkillButtonDataMap.get(5);
      if (s && (s.RemainingCountVehicleSkill = i, this.RefreshEnableByButtonType(5), this.IsCurEntity)) {
        this.tyo.add(s);
        this.VXe();
      }
    };
    this.vWu = (t, i, s, h) => {
      var e;
      var o = this.SkillButtonDataMap.get(6);
      if (o && (e = o.IsShowLongPress(), o.RefreshIsShowLongPress(), this.IsCurEntity) && o.IsShowLongPress() !== e) {
        this.vvl.add(o);
        this.VXe();
      }
      this.RefreshEnableByButtonType(6);
    };
    this.hyo = (t, i) => {
      t = this.AttributeIdTagSkillButtonMapping.Get(t);
      if (t) {
        for (const n of t) {
          var s = n.AttributeId;
          var h = n.MaxAttributeId;
          n.RefreshAttributeId();
          var e = n.AttributeId;
          var o = n.MaxAttributeId;
          if (s !== e || h !== o) {
            n.RefreshFrameSpriteColor();
            this.AttributeIdSkillButtonMapping.RemoveSingle(s, n);
            this.AttributeIdSkillButtonMapping.RemoveSingle(h, n);
            if (e > 0) {
              this.AttributeIdSkillButtonMapping.AddSingle(e, n);
              this.AttributeIdSkillButtonMapping.AddSingle(o, n);
              this.lyo(e);
              this.lyo(o);
            }
            s = n.IsEnable();
            n.RefreshIsEnable();
            if (this.IsCurEntity) {
              this.pdt.add(n);
              if (s !== n.IsEnable()) {
                this.$So.add(n);
              }
              this.VXe();
            }
          }
        }
      }
    };
    this.r8d = (t, i) => {
      t = this.FormationAttrIdTagSkillButtonMapping.Get(t);
      if (t) {
        for (const e of t) {
          var s = e.FormationAttributeId;
          e.RefreshFormationAttributeId();
          var h = e.FormationAttributeId;
          if (s !== h && (e.RefreshFrameSpriteColor(), s > 0 && this.FormationAttrIdSkillButtonMapping.RemoveSingle(s, e), h > 0 && (this.FormationAttrIdSkillButtonMapping.AddSingle(h, e), this.o8d(h)), s = e.IsEnable(), e.RefreshIsEnable(), this.IsCurEntity)) {
            this.pdt.add(e);
            if (s !== e.IsEnable()) {
              this.$So.add(e);
            }
            this.VXe();
          }
        }
      }
    };
    this.uyo = (t, i) => {
      t = this.GetSkillButtonDataByEnableTag(t);
      if (t) {
        for (const h of t) {
          let t = false;
          var s = h.IsEnable();
          if (!s || !i) {
            t = i ? (h.SetEnable(true, 1), true) : (h.RefreshIsEnable(), h.IsEnable() !== s);
            if (this.IsCurEntity && t) {
              this.$So.add(h);
              this.VXe();
            }
          }
        }
      }
    };
    this.Sri = (t, i) => {
      t = this.GetSkillButtonDataByDisableTag(t);
      if (t) {
        for (const h of t) {
          var s = h.IsEnable();
          if (s === i && (h.RefreshIsEnable(), s = h.IsEnable() !== s, this.IsCurEntity && s)) {
            this.$So.add(h);
            this.VXe();
          }
        }
      }
    };
    this.cyo = (i, s) => {
      var t = this.GetSkillButtonDataByDisableSkillIdTag(i);
      if (t) {
        for (const o of t) {
          let t = false;
          var h;
          var e = o.IsEnable();
          if (e === s && (s ? (h = o.GetSkillId()) && o.GetDisableSkillIdTagIds().get(i)?.has(h) && (o.SetEnable(false, 5), t = true) : (o.RefreshIsEnable(), t = o.IsEnable() !== e), this.IsCurEntity && t)) {
            this.$So.add(o);
            this.VXe();
          }
        }
      }
    };
    this.VGa = (t, i) => {
      t = this.VisibleTagSkillButtonMapping.Get(t);
      if (t) {
        for (const h of t) {
          var s = h.IsVisible();
          if (s !== i && (h.RefreshIsVisible(), s = h.IsVisible() !== s, this.IsCurEntity && s)) {
            this.YSo.add(h);
            this.VXe();
          }
        }
      }
    };
    this.Jrt = (t, i) => {
      t = this.GetSkillButtonDataByHiddenTag(t);
      if (t) {
        for (const h of t) {
          let t = false;
          var s = h.IsVisible();
          if (s === i && (t = !i || h.FormationData?.IgnoreHiddenTag || h.DefaultHidden ? (h.RefreshIsVisible(), h.IsVisible() !== s) : (h.SetInvisible(), true), this.IsCurEntity && t)) {
            this.YSo.add(h);
            this.VXe();
          }
        }
      }
    };
    this.myo = (t, i) => {
      var s = this.GetSkillButtonDataBySkillIdTag(t);
      if (s) {
        for (const o of s) {
          var h = o.GetSkillId();
          if (i) {
            o.RefreshSkillIdByTag(t);
          } else {
            o.RefreshSkillId();
          }
          var e = o.GetSkillId();
          if (h !== e && (o.RefreshSkillTexturePath(), o.RefreshIsEnable(), this.IsCurEntity)) {
            this.JSo.add(o);
            this.VXe();
          }
        }
      }
    };
    this.dyo = (t, i) => {
      var s = this.GetSkillButtonDataBySkillIconTag(t);
      if (s) {
        for (const e of s) {
          var h = e.GetSkillTexturePath();
          if (i) {
            e.RefreshSkillTexturePathBySkillIconTag(t);
          } else {
            e.RefreshSkillTexturePath();
          }
          if (this.IsCurEntity && h !== e.GetSkillTexturePath()) {
            this.zSo.add(e);
            this.VXe();
          }
        }
      }
    };
    this.Cyo = (t, i) => {
      t = this.GetSkillButtonDataByDynamicEffectTag(t);
      if (t) {
        for (const s of t) {
          s.RefreshDynamicEffect();
          if (this.IsCurEntity) {
            this.ZSo.add(s);
            this.VXe();
          }
        }
      }
    };
    this.YMc = (t, i) => {
      t = this.ConfigShowLongPressTagSkillButtonMapping?.Get(t);
      if (t) {
        for (const h of t) {
          let t = false;
          var s = h.GetIsConfigShowLongPress();
          if (i) {
            if (s) {
              continue;
            }
            h.SetIsConfigShowLongPress(true);
            t = true;
          } else {
            h.RefreshConfigIsShowLongPress();
            t = h.GetIsConfigShowLongPress() !== s;
          }
          if (this.IsCurEntity && t) {
            this.vvl.add(h);
            this.VXe();
          }
        }
      }
    };
    this.Wpl = (t, i) => {
      var s;
      var i = this.CustomHandleSkillButtonMapping?.Get(i);
      if (i) {
        for (const h of i) {
          if (h.CustomHandle) {
            h.CustomHandle.RefreshByTagChanged();
            if (!this.IsCurEntity) {
              if (h.CustomHandle.EnableModifyMark) {
                h.RefreshIsEnable();
              }
              h.CustomHandle.ClearModifyMark();
              return;
            }
            if (h.CustomHandle.SkillCdModifyMark) {
              this.tyo.add(h);
              this.VXe();
            }
            if (h.CustomHandle.EnableModifyMark && (s = h.IsEnable(), h.RefreshIsEnable(), s !== h.IsEnable())) {
              this.$So.add(h);
              this.VXe();
            }
            h.CustomHandle.ClearModifyMark();
          }
        }
      }
    };
    this.iO_ = (t, i) => {
      var s;
      var h = this.GetSkillButtonDataByButton(7);
      if (h && (s = h.IsExploreAsFight, h.RefreshIsExploreAsFight(), s !== h.IsExploreAsFight) && (s = h.IsEnable(), h.RefreshIsEnable(), this.IsCurEntity) && s !== h.IsEnable()) {
        this.$So.add(h);
        this.VXe();
      }
    };
    this.gyo = (t, i) => {
      if (this.IsCurEntity) {
        ModelManager_1.ModelManager.SkillButtonUiModel.RefreshSkillButtonIndexByTag(this.SkillButtonIndexConfig, this.EntityHandle, t, i);
        this.iyo = true;
        this.VXe();
      }
    };
    this.fyo = (t, i) => {
      t = this.QSo.Get(t);
      if (t) {
        for (const h of t) {
          let t = false;
          var s = h.IsVisible;
          if (s === i && (t = i ? !(h.IsVisible = false) : (h.RefreshIsVisible(this.GameplayTagComponent, this.RoleConfig), h.IsVisible !== s), this.IsCurEntity && t)) {
            this.eyo.add(h);
            this.VXe();
          }
        }
      }
    };
    this.pyo = (t, i) => {
      t = this.KSo.Get(t);
      if (t) {
        for (const h of t) {
          let t = false;
          var s = h.IsVisible;
          if (s !== i && (t = i ? h.IsVisible = true : (h.RefreshIsVisible(this.GameplayTagComponent, this.RoleConfig), h.IsVisible !== s), this.IsCurEntity && t)) {
            this.eyo.add(h);
            this.VXe();
          }
        }
      }
    };
    this._yo = (t, i, s) => {
      this.RefreshSkillButtonEnableByAttributeId(t);
      if (this.IsCurEntity) {
        t = this.GetSkillButtonDataByAttributeId(t);
        if (t) {
          for (const h of t) {
            this.pdt.add(h);
          }
          this.VXe();
        }
      }
    };
    this.n8d = (t, i, s) => {
      this.RefreshSkillButtonEnableByFormationAttrId(t);
      if (this.IsCurEntity) {
        var h = this.FormationAttrIdSkillButtonMapping.Get(t);
        if (h) {
          for (const e of h) {
            if (e.FormationAttributeId === t) {
              this.pdt.add(e);
            }
          }
          this.VXe();
        }
      }
    };
  }
  Init(t, i) {
    t = (this.EntityHandle = t).Entity;
    this.IsCurEntity = i;
    this.RoleId = SkillButtonUiController_1.SkillButtonUiController.GetRoleId(t);
    this.RoleConfig = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleId);
    this.AttributeComponent = t.GetComponent(174);
    this.GameplayTagComponent = t.GetComponent(206);
    this.SkillComponent = t.GetComponent(40);
    this.CharacterSkillCdComponent = t.GetComponent(208);
    this.Cvl = t.GetComponent(230);
    i = ConfigManager_1.ConfigManager.SkillButtonConfig;
    this.SkillButtonConfigList = i.GetAllSkillButtonConfig(this.RoleId);
    this.SkillCommonButtonConfigList = i.GetAllSkillCommonButtonConfig();
    if (this.RoleConfig.RoleType !== 2 || !(this.SkillButtonIndexConfig = i.GetSkillIndexConfig(this.RoleId), this.SkillButtonIndexConfig)) {
      this.SkillButtonIndexConfig = i.GetSkillIndexConfig(0);
    }
    this.vyo();
    this.Myo();
    this.c$e();
  }
  OnChangeRole(t) {
    if (this.IsCurEntity = t) {
      for (const i of this.SkillButtonDataMap.values()) {
        i.RefreshSkillTexturePath();
      }
    } else {
      this.OXe();
    }
  }
  Clear() {
    this.Eyo();
    for (const t of this.SkillButtonDataMap.values()) {
      t.Reset();
    }
    this.SkillButtonDataMap = undefined;
    this.BehaviorButtonDataMap.clear();
    this.BehaviorButtonDataMap = undefined;
    this.AttributeIdSkillButtonMapping = undefined;
    this.AttributeIdTagSkillButtonMapping = undefined;
    this.FormationAttrIdSkillButtonMapping = undefined;
    this.FormationAttrIdTagSkillButtonMapping = undefined;
    this.EnableTagSkillButtonMapping = undefined;
    this.DisableTagSkillButtonMapping = undefined;
    this.DisableSkillIdTagSkillButtonMapping = undefined;
    this.VisibleTagSkillButtonMapping = undefined;
    this.HiddenTagSkillButtonMapping = undefined;
    this.DynamicEffectTagSkillButtonMapping = undefined;
    this.ConfigShowLongPressTagSkillButtonMapping = undefined;
    this.SkillIconTagSkillButtonMapping = undefined;
    this.SkillIdTagSkillButtonMapping = undefined;
    for (const i of this.XSo) {
      i?.EndTask();
    }
    this.XSo = undefined;
    this.i8d.clear();
    this.GYe = undefined;
    this.t8d = undefined;
    this.KSo = undefined;
    this.QSo = undefined;
    this.CustomHandleSkillButtonMapping = undefined;
    this.EntityHandle = undefined;
    this.RoleId = undefined;
    this.AttributeComponent = undefined;
    this.GameplayTagComponent = undefined;
    this.SkillComponent = undefined;
    this.CharacterSkillCdComponent = undefined;
    this.SkillButtonConfigList = undefined;
    this.SkillCommonButtonConfigList = undefined;
    this.SkillButtonIndexConfig = undefined;
  }
  vyo() {
    for (const f of SkillButtonUiDefine_1.skillButtonActionList) {
      var t = new SkillButtonData_1.SkillButtonData();
      this.SkillButtonDataMap.set(f, t);
    }
    if (!(this.RoleId <= 0)) {
      var i = this.RoleConfig.RoleType === 1;
      var s = this.SkillButtonConfigList;
      var h = this.SkillCommonButtonConfigList;
      var e = ModelManager_1.ModelManager.SkillButtonUiModel.SkillPriorityButtonConfigMap;
      if (s) {
        for (const l of s) {
          var o = l.ButtonType;
          var n = this.GetSkillButtonDataByButton(o);
          if (i && !commonRoleSkillButtonTypes.has(o)) {
            CombatLog_1.CombatLog.Error("BattleUi", this.EntityHandle?.Entity, "技能按钮配置错误，常规角色的不允许配置该技能类型", ["roleId", this.RoleId], ["ButtonType", o]);
          } else if (n) {
            o = e.get(o);
            this.Syo(n, l, o);
          }
        }
      }
      if (h) {
        for (const v of h) {
          var r = v.ButtonType;
          var a = this.GetSkillButtonDataByButton(r);
          if (a && a.Config === undefined && (this.Syo(a, v), r === 11)) {
            a.SetDefaultHidden(true);
            if (r = this.GetSkillButtonDataByButton(4)) {
              a.DefaultSkillId = r.DefaultSkillId;
              a.RefreshSkillId();
            }
            a.RefreshIsVisible();
            a.RefreshIsEnable();
          }
        }
      }
    }
  }
  Syo(t, i, s) {
    t.Refresh(this.EntityHandle, i, 0, s);
    this.AttributeIdSkillButtonMapping.AddSingle(t.AttributeId, t);
    this.AttributeIdSkillButtonMapping.AddSingle(t.MaxAttributeId, t);
    for (const h of t.AttributeIdTagMap.keys()) {
      this.AttributeIdTagSkillButtonMapping.AddSingle(h, t);
    }
    if (t.FormationAttributeId > 0) {
      this.FormationAttrIdSkillButtonMapping.AddSingle(t.FormationAttributeId, t);
    }
    for (const e of t.FormationAttributeIdTagMap.keys()) {
      this.FormationAttrIdTagSkillButtonMapping.AddSingle(e, t);
    }
    this.EnableTagSkillButtonMapping.Add(t.GetEnableTagIds(), t);
    this.DisableTagSkillButtonMapping.Add(t.GetDisableTagIds(), t);
    this.DisableSkillIdTagSkillButtonMapping.Add(t.GetDisableSkillIdTagIds().keys(), t);
    this.VisibleTagSkillButtonMapping.Add(t.GetVisibleTagIds(), t);
    this.HiddenTagSkillButtonMapping.Add(t.GetHiddenTagIds(), t);
    this.DynamicEffectTagSkillButtonMapping.Add(t.DynamicEffectTagIdMap.keys(), t);
    this.ConfigShowLongPressTagSkillButtonMapping.Add(t.ConfigShowLongPressTagIds, t);
    this.SkillIconTagSkillButtonMapping.Add(t.SkillIconTagIds, t);
    for (const o of t.SkillIdTagMap.keys()) {
      this.SkillIdTagSkillButtonMapping.AddSingle(o, t);
    }
    if (t.GetActionType() === InputEnums_1.EInputAction.幻象2) {
      this.SkillIdTagSkillButtonMapping.AddSingle(SkillButtonData_1.controlVisionTagId, t);
    }
    if (t.CustomHandle && t.CustomHandle.TagIds.length > 0) {
      this.CustomHandleSkillButtonMapping.Add(t.CustomHandle.TagIds, t);
    }
  }
  Myo() {
    for (var [t, i] of buttonTypeToActionNameMap) {
      var s = new BehaviorButtonData_1.BehaviorButtonData();
      s.Refresh(t, i, this.GameplayTagComponent, this.RoleConfig);
      this.BehaviorButtonDataMap.set(t, s);
      if (s.VisibleTagId !== 0) {
        this.KSo.AddSingle(s.VisibleTagId, s);
      }
      this.QSo.Add(s.HiddenTagIds, s);
    }
  }
  c$e() {
    this.yyo();
    this.Iyo();
    EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle, EventDefine_1.EEventName.EntityVisionSkillChanged, this.syo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse, this.nyo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVehicleSkillUsableCountChanged, this.H6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVehicleSkillEnableChanged, this.yKl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharHoldingHandsChanged, this.vWu);
  }
  yyo() {
    if (!(this.RoleId <= 0)) {
      for (const o of this.SkillButtonDataMap.values()) {
        if (o.GetEntityHandle()) {
          for (const n of o.AttributeIdTagMap.keys()) {
            this.Tyo(n, this.hyo);
          }
          for (const r of o.FormationAttributeIdTagMap.keys()) {
            this.Tyo(r, this.r8d);
          }
          for (const a of o.GetEnableTagIds()) {
            this.Tyo(a, this.uyo);
          }
          for (const f of o.GetDisableTagIds()) {
            this.Tyo(f, this.Sri);
          }
          for (const l of o.GetDisableSkillIdTagIds().keys()) {
            this.Tyo(l, this.cyo);
          }
          for (const v of o.GetVisibleTagIds()) {
            this.Tyo(v, this.VGa);
          }
          for (const _ of o.GetHiddenTagIds()) {
            this.Tyo(_, this.Jrt);
          }
          for (const u of o.SkillIdTagMap.keys()) {
            this.Tyo(u, this.myo);
          }
          for (const S of o.SkillIconTagIds) {
            this.Tyo(S, this.dyo);
          }
          for (const B of o.DynamicEffectTagIdMap.keys()) {
            this.Tyo(B, this.Cyo);
          }
          for (const p of o.ConfigShowLongPressTagIds) {
            this.Tyo(p, this.YMc);
          }
          var t = o.CustomHandle?.TagIds;
          if (t) {
            for (const E of t) {
              this.Qpl(E, this.Wpl);
            }
          }
          if (o.GetButtonType() === 7) {
            for (const c of o.ExploreAsFightTagIds) {
              this.Tyo(c, this.iO_);
            }
          }
        }
      }
      this.Tyo(40422668, this.ayo);
      this.Tyo(SkillButtonData_1.controlVisionTagId, this.syo);
      for (const d of this.KSo.GetAllKey()) {
        this.Tyo(d, this.pyo);
      }
      for (const m of this.QSo.GetAllKey()) {
        this.Tyo(m, this.fyo);
      }
      var i = this.SkillButtonIndexConfig;
      if (i) {
        var s = new Set();
        var h = ModelManager_1.ModelManager.SkillButtonUiModel.DefaultSkillButtonIndexData;
        if (i.Id === h.ButtonIndexConfigId) {
          for (const y of h.ButtonIndexTagIdSet) {
            s.add(y);
          }
          for (const g of h.ButtonTypeTagMap.keys()) {
            s.add(g);
          }
        } else {
          for (const k of i.TagList) {
            for (const D of k.ArrayString) {
              var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(D);
              if (e) {
                s.add(e);
              }
            }
          }
          for (const M of (Info_1.Info.OperationType === 2 ? i.DesktopButtonTypeMap : i.PadButtonTypeMap).keys()) {
            s.add(M);
          }
        }
        for (const C of s) {
          this.Tyo(C, this.gyo);
        }
      }
    }
  }
  Iyo() {
    if (!(this.RoleId <= 0)) {
      for (const s of this.SkillButtonDataMap.values()) {
        var t;
        var i;
        if (s.GetEntityHandle()) {
          t = s.AttributeId;
          i = s.MaxAttributeId;
          if (!!t && !(t <= 0) && !!i && !(i <= 0)) {
            this.lyo(t);
            this.lyo(i);
          }
        }
      }
    }
  }
  Tyo(i, s) {
    let h = undefined;
    if (h = typeof i == "string" ? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i) : i) {
      let t = this.i8d.get(h);
      if (t) {
        if (t.has(s)) {
          return;
        }
        t.add(s);
      } else {
        (t = new Set()).add(s);
        this.i8d.set(h, t);
      }
      i = this.GameplayTagComponent.ListenForTagAddOrRemove(h, s);
      if (i) {
        this.XSo.add(i);
      }
    }
  }
  Qpl(t, i) {
    if (t &&= this.GameplayTagComponent.ListenForTagAnyCountChanged(t, i)) {
      this.XSo.add(t);
    }
  }
  lyo(t) {
    if (!this.GYe.has(t)) {
      this.AttributeComponent.AddListener(t, this._yo, "SkillButtonUiController");
      this.GYe.set(t, this._yo);
    }
  }
  o8d(t) {
    if (!this.t8d.has(t)) {
      ControllerHolder_1.ControllerHolder.FormationAttributeController.AddValueListener(t, this.n8d);
      ControllerHolder_1.ControllerHolder.FormationAttributeController.AddMaxListener(t, this.n8d);
      this.t8d.set(t, this.n8d);
    }
  }
  VXe() {
    if (this.wXe) {
      var t = TimerSystem_1.TimerSystem.GetNextRemainTime(this.wXe);
      if (t <= 1) {
        return;
      }
      CombatLog_1.CombatLog.Error("BattleUi", this.EntityHandle?.Entity, "技能按钮NextTimer异常", ["刷新时间", t]);
      if (TimerSystem_1.TimerSystem.Has(this.wXe)) {
        TimerSystem_1.TimerSystem.Remove(this.wXe);
      }
    }
    this.wXe = TimerSystem_1.TimerSystem.Next(this.GXe, SkillButtonEntityData.jXe);
  }
  OXe() {
    if (TimerSystem_1.TimerSystem.Has(this.wXe)) {
      TimerSystem_1.TimerSystem.Remove(this.wXe);
    } else if (this.wXe) {
      CombatLog_1.CombatLog.Error("BattleUi", this.EntityHandle?.Entity, "技能按钮NextTimer异常, 计时器已经非法，但仍持有Handle");
    }
    this.wXe = undefined;
    this.$So.clear();
    this.YSo.clear();
    this.JSo.clear();
    this.zSo.clear();
    this.ZSo.clear();
    this.tyo.clear();
    this.pdt.clear();
    this.eyo.clear();
    this.vvl.clear();
    this.iyo = false;
    this.oyo = false;
  }
  RefreshSkillButtonData(t) {
    CombatLog_1.CombatLog.Info("BattleUi", this.EntityHandle?.Entity, "整体刷新技能按钮", ["原因", t], ["多次调用", this.oyo]);
    if (this.oyo) {
      if (t < this.ryo) {
        this.ryo = t;
      }
    } else {
      this.oyo = true;
      this.ryo = t;
      this.VXe();
    }
  }
  Ai_(t, i) {
    var s;
    var h = this.SkillButtonDataMap.get(1);
    if (h && (s = h.IsShowLongPress(), h.RefreshIsShowLongPress(), this.IsCurEntity) && h.IsShowLongPress() !== s) {
      this.vvl.add(h);
      this.VXe();
    }
    this.RefreshEnableByButtonType(1);
    if (this.Cvl?.IsVehicleType("Gongduola")) {
      this.RefreshEnableByButtonType(7);
      this.RefreshEnableByButtonType(5);
      this.RefreshEnableByButtonType(6);
    }
  }
  RefreshSkillButtonEnableByAttributeId(t) {
    t = this.GetSkillButtonDataByAttributeId(t);
    if (t) {
      for (const s of t) {
        var i = s.IsEnable();
        s.RefreshIsEnable();
        if (this.IsCurEntity && i !== s.IsEnable()) {
          this.$So.add(s);
          this.VXe();
        }
      }
    }
  }
  RefreshSkillButtonEnableByFormationAttrId(t) {
    t = this.FormationAttrIdSkillButtonMapping.Get(t);
    if (t) {
      for (const s of t) {
        var i = s.IsEnable();
        s.RefreshIsEnable();
        if (this.IsCurEntity && i !== s.IsEnable()) {
          this.$So.add(s);
          this.VXe();
        }
      }
    }
  }
  RefreshSkillButtonExplorePhantomSkillId(t) {
    var i;
    var t = this.GetSkillButtonDataByButton(t);
    if (t) {
      i = t.GetSkillId();
      t.RefreshSkillId();
      t.RefreshSkillTexturePath();
      t.RefreshIsEnable();
      if (this.IsCurEntity) {
        if (i !== t.GetSkillId()) {
          this.JSo.add(t);
          this.VXe();
        }
      } else {
        t.SetExploreSkillChange(false);
      }
    }
  }
  RefreshEnableByInputEvent(t, i) {
    for (const h of this.SkillButtonDataMap.values()) {
      var s;
      if (h.GetActionType() === t && (s = h.IsEnable(), h.RefreshIsEnable(), this.IsCurEntity && s !== h.IsEnable())) {
        this.$So.add(h);
        this.VXe();
      }
    }
  }
  RefreshVisibleByInputEvent(t, i) {
    for (const h of this.SkillButtonDataMap.values()) {
      var s;
      if (h.GetActionType() === t && (s = h.IsVisible(), i ? h.RefreshIsVisible() : h.SetInvisible(), this.IsCurEntity && s !== h.IsVisible())) {
        this.YSo.add(h);
        this.VXe();
      }
    }
  }
  RefreshEnableByButtonType(t) {
    var i;
    var t = this.GetSkillButtonDataByButton(t);
    if (t && (i = t.IsEnable(), t.RefreshIsEnable(), this.IsCurEntity) && i !== t.IsEnable()) {
      this.$So.add(t);
      this.VXe();
    }
  }
  RefreshVisibleByButtonType(t) {
    var i;
    var t = this.GetSkillButtonDataByButton(t);
    if (t && (i = t.IsVisible(), t.RefreshIsVisible(), this.IsCurEntity) && i !== t.IsVisible()) {
      this.YSo.add(t);
      this.VXe();
    }
  }
  RefreshSkillTexturePath(t) {
    var i;
    var t = this.GetSkillButtonDataByButton(t);
    if (t && (i = t.GetSkillTexturePath(), t.RefreshSkillTexturePath(), this.IsCurEntity) && i !== t.GetSkillTexturePath()) {
      this.zSo.add(t);
      this.VXe();
    }
  }
  RefreshSkillCd(t) {
    for (const i of this.SkillButtonDataMap.values()) {
      if (i.GetSkillId() === t && (i.RefreshIsEnable(), this.IsCurEntity)) {
        this.tyo.add(i);
        this.VXe();
      }
    }
  }
  ExecuteMultiSkillIdChanged(t, i) {
    let s = undefined;
    if (i !== 0) {
      if (!(s = this.SkillButtonDataMap.get(9))?.RefreshVisionMultiSkillInfo(t, i)) {
        return;
      }
    } else {
      s = this.GetSkillButtonDataBySkillId(t.FirstSkillId);
    }
    if (s && (s.RefreshIsEnable(), this.IsCurEntity)) {
      this.tyo.add(s);
      this.zSo.add(s);
      this.VXe();
    }
  }
  ExecuteMultiSkillEnable(t, i) {
    let s = undefined;
    if (i !== 0) {
      if (!(s = this.SkillButtonDataMap.get(9))?.RefreshVisionMultiSkillInfo(t, i)) {
        return;
      }
    } else {
      s = this.GetSkillButtonDataBySkillId(t.FirstSkillId);
    }
    if (s && (s.RefreshIsEnable(), this.IsCurEntity)) {
      this.tyo.add(s);
      this.VXe();
    }
  }
  Eyo() {
    if (this.EntityHandle?.Valid) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle, EventDefine_1.EEventName.EntityVisionSkillChanged, this.syo);
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharHoldingHandsChanged, this.vWu);
      this.Lyo();
      this.Dyo();
    }
    this.s8d();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse, this.nyo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVehicleSkillUsableCountChanged, this.H6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVehicleSkillEnableChanged, this.yKl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    this.OXe();
  }
  Lyo() {
    for (const t of this.XSo) {
      t?.EndTask();
    }
    this.XSo.clear();
    this.i8d.clear();
  }
  Dyo() {
    for (var [t, i] of this.GYe) {
      this.AttributeComponent.RemoveListener(t, i);
    }
  }
  s8d() {
    for (var [t, i] of this.t8d) {
      ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveValueListener(t, i);
      ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveMaxListener(t, i);
    }
  }
  GetSkillButtonDataByButton(t) {
    return this.SkillButtonDataMap.get(t);
  }
  GetBehaviorButtonDataByButton(t) {
    return this.BehaviorButtonDataMap.get(t);
  }
  GetSkillButtonDataBySkillId(t) {
    for (const i of this.SkillButtonDataMap.values()) {
      if (i.GetSkillId() === t) {
        return i;
      }
    }
  }
  GetSkillButtonDataByAttributeId(t) {
    return this.AttributeIdSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataByDisableTag(t) {
    return this.DisableTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataByDisableSkillIdTag(t) {
    return this.DisableSkillIdTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataByEnableTag(t) {
    return this.EnableTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataByHiddenTag(t) {
    return this.HiddenTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataBySkillIdTag(t) {
    return this.SkillIdTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataBySkillIconTag(t) {
    return this.SkillIconTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataByDynamicEffectTag(t) {
    return this.DynamicEffectTagSkillButtonMapping.Get(t);
  }
}
(exports.SkillButtonEntityData = SkillButtonEntityData).jXe = Stats_1.Stat.Create("SkillButtonEntityDataNextTick");
//# sourceMappingURL=SkillButtonEntityData.js.map