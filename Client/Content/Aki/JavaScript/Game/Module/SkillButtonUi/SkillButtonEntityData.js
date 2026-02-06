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
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
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
    this.EnableTagBehaviorButtonMapping = new BehaviorButtonMapping_1.BehaviorButtonMapping();
    this.DisableTagBehaviorButtonMapping = new BehaviorButtonMapping_1.BehaviorButtonMapping();
    this.DisableSkillIdTagBehaviorButtonMapping = new BehaviorButtonMapping_1.BehaviorButtonMapping();
    this.KSo = new BehaviorButtonMapping_1.BehaviorButtonMapping();
    this.QSo = new BehaviorButtonMapping_1.BehaviorButtonMapping();
    this.DynamicEffectTagBehaviorButtonMapping = new BehaviorButtonMapping_1.BehaviorButtonMapping();
    this.SkillIconTagBehaviorButtonMapping = new BehaviorButtonMapping_1.BehaviorButtonMapping();
    this.SkillIdTagBehaviorButtonMapping = new BehaviorButtonMapping_1.BehaviorButtonMapping();
    this.XSo = new Set();
    this.GYe = new Map();
    this.QXd = new Map();
    this.KXd = new Map();
    this.wXe = undefined;
    this.kxm = false;
    this.$So = new Set();
    this.YSo = new Set();
    this.JSo = new Set();
    this.zSo = new Set();
    this.ZSo = new Set();
    this.y5g = new Set();
    this.cKm = new Set();
    this.eyo = new Set();
    this.dKm = new Set();
    this.mKm = new Set();
    this.fKm = new Set();
    this.tyo = new Set();
    this.pdt = new Set();
    this.vvl = new Set();
    this.Fqg = new Set();
    this.iyo = false;
    this.F8g = false;
    this.oyo = false;
    this.ryo = 5;
    this.GXe = () => {
      if (this.kxm) {
        this.kxm = false;
        this.wXe = TimerSystem_1.TimerSystem.Next(this.GXe, SkillButtonEntityData.jXe);
      } else {
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
        for (const o of this.y5g) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonCustomRefresh, o.GetButtonType(), o.GetCustomHdMarkFrom());
        }
        this.y5g.clear();
        for (const n of this.tyo) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonCdRefresh, n.GetButtonType());
        }
        this.tyo.clear();
        for (const r of this.pdt) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonAttributeRefresh, r.GetButtonType());
        }
        this.pdt.clear();
        for (const f of this.cKm) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBehaviorButtonEnableRefresh, f.ButtonType);
        }
        this.cKm.clear();
        for (const a of this.eyo) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh, a.ButtonType);
        }
        this.eyo.clear();
        for (const l of this.dKm) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBehaviorButtonSkillIdRefresh, l.ButtonType);
        }
        this.dKm.clear();
        for (const v of this.mKm) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBehaviorButtonIconPathRefresh, v.ButtonType);
        }
        this.mKm.clear();
        for (const _ of this.fKm) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBehaviorButtonDynamicEffectRefresh, _.ButtonType);
        }
        this.fKm.clear();
        if (this.iyo) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonIndexRefresh);
          this.iyo = false;
        }
        if (this.F8g) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorPadSkillButtonIndexRefresh);
          this.F8g = false;
        }
        if (this.oyo) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonDataRefresh, this.ryo);
          this.oyo = false;
        }
        for (const u of this.vvl) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonLongPressRefresh, u.GetButtonType());
        }
        this.vvl.clear();
        for (const S of this.Fqg) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonSlideControlRefresh, S.GetButtonType());
        }
        this.Fqg.clear();
      }
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
    this.duf = t => {
      this.syo();
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
    this.XXd = (t, i) => {
      t = this.FormationAttrIdTagSkillButtonMapping.Get(t);
      if (t) {
        for (const e of t) {
          var s = e.FormationAttributeId;
          e.RefreshFormationAttributeId();
          var h = e.FormationAttributeId;
          if (s !== h && (e.RefreshFrameSpriteColor(), s > 0 && this.FormationAttrIdSkillButtonMapping.RemoveSingle(s, e), h > 0 && (this.FormationAttrIdSkillButtonMapping.AddSingle(h, e), this.YXd(h)), s = e.IsEnable(), e.RefreshIsEnable(), this.IsCurEntity)) {
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
      t = this.DisableTagSkillButtonMapping.Get(t);
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
      var t = this.DisableSkillIdTagSkillButtonMapping.Get(i);
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
      t = this.HiddenTagSkillButtonMapping.Get(t);
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
      var s = this.SkillIdTagSkillButtonMapping.Get(t);
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
      var s = this.SkillIconTagSkillButtonMapping.Get(t);
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
      t = this.DynamicEffectTagSkillButtonMapping.Get(t);
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
      var h;
      var e;
      var o;
      var i = this.CustomHandleSkillButtonMapping?.Get(i);
      if (i) {
        for (const n of i) {
          if (n.CustomHandle) {
            s = n.IsEnableSlideControl;
            h = n.CustomSkillTexturePath;
            e = n.CustomSkillIconName;
            n.CustomHandle.RefreshByTagChanged();
            if (this.IsCurEntity) {
              if (n.CustomHandle.SkillCdModifyMark) {
                this.tyo.add(n);
                this.VXe();
              }
              if (n.CustomHandle.EnableModifyMark && (o = n.IsEnable(), n.RefreshIsEnable(), o !== n.IsEnable())) {
                this.$So.add(n);
                this.VXe();
              }
              if (n.CustomHandle.CustomHdModifyMark) {
                n.CustomHandle.CustomHdModifyMark = false;
                this.y5g.add(n);
                this.VXe();
              }
              n.CustomHandle.ClearModifyMark();
              if (s !== n.IsEnableSlideControl) {
                this.Fqg.add(n);
                this.VXe();
              }
              if (h !== n.CustomSkillTexturePath || e !== n.CustomSkillIconName) {
                n.RefreshSkillTexturePath();
                this.zSo.add(n);
                this.VXe();
              }
            } else {
              if (n.CustomHandle.EnableModifyMark) {
                n.RefreshIsEnable();
              }
              n.CustomHandle.ClearModifyMark();
            }
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
    this.N8g = (t, i) => {
      if (this.IsCurEntity) {
        ModelManager_1.ModelManager.SkillButtonUiModel.RefreshMotorPadSkillButtonIndex(this.SkillButtonIndexConfig, this.EntityHandle);
        this.F8g = true;
        this.VXe();
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
    this.zXd = (t, i, s) => {
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
    this.gKm = (t, i) => {
      t = this.DisableTagBehaviorButtonMapping.Get(t);
      if (t) {
        for (const h of t) {
          var s = h.IsEnable();
          if (s === i && (h.RefreshIsEnable(), s = h.IsEnable() !== s, this.IsCurEntity && s)) {
            this.cKm.add(h);
            this.VXe();
          }
        }
      }
    };
    this.CKm = (i, s) => {
      var t = this.DisableSkillIdTagBehaviorButtonMapping.Get(i);
      if (t) {
        for (const o of t) {
          let t = false;
          var h;
          var e = o.IsEnable();
          if (e === s && (s ? (h = o.GetSkillId()) && o.GetDisableSkillIdTagIds().get(i)?.has(h) && (o.SetEnable(false), t = true) : (o.RefreshIsEnable(), t = o.IsEnable() !== e), this.IsCurEntity && t)) {
            this.cKm.add(o);
            this.VXe();
          }
        }
      }
    };
    this.pyo = (t, i) => {
      t = this.KSo.Get(t);
      if (t) {
        for (const h of t) {
          var s = h.IsVisible();
          if (s !== i && (h.RefreshIsVisible(), s = h.IsVisible() !== s, this.IsCurEntity && s)) {
            this.eyo.add(h);
            this.VXe();
          }
        }
      }
    };
    this.fyo = (t, i) => {
      t = this.QSo.Get(t);
      if (t) {
        for (const h of t) {
          var s = h.IsVisible();
          if (s === i && (h.RefreshIsVisible(), s = h.IsVisible() !== s, this.IsCurEntity && s)) {
            this.eyo.add(h);
            this.VXe();
          }
        }
      }
    };
    this.pKm = (t, i) => {
      t = this.SkillIdTagBehaviorButtonMapping.Get(t);
      if (t) {
        for (const e of t) {
          var s = e.GetSkillId();
          e.RefreshSkillId();
          var h = e.GetSkillId();
          if (s !== h && (e.RefreshSkillTexturePath(), e.RefreshIsEnable(), this.IsCurEntity)) {
            this.dKm.add(e);
            this.VXe();
          }
        }
      }
    };
    this.vKm = (t, i) => {
      var s = this.SkillIconTagBehaviorButtonMapping.Get(t);
      if (s) {
        for (const e of s) {
          var h = e.GetSkillTexturePath();
          if (i) {
            e.RefreshSkillTexturePathBySkillIconTag(t);
          } else {
            e.RefreshSkillTexturePath();
          }
          if (this.IsCurEntity && h !== e.GetSkillTexturePath()) {
            this.mKm.add(e);
            this.VXe();
          }
        }
      }
    };
    this.yKm = (t, i) => {
      t = this.DynamicEffectTagBehaviorButtonMapping.Get(t);
      if (t) {
        for (const s of t) {
          s.RefreshDynamicEffect();
          if (this.IsCurEntity) {
            this.fKm.add(s);
            this.VXe();
          }
        }
      }
    };
  }
  Init(t, i) {
    t = (this.EntityHandle = t).Entity;
    this.IsCurEntity = i;
    this.RoleId = SkillButtonUiController_1.SkillButtonUiController.GetRoleId(t);
    this.RoleConfig = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleId);
    this.AttributeComponent = t.GetComponent(184);
    this.GameplayTagComponent = t.GetComponent(217);
    this.SkillComponent = t.GetComponent(43);
    this.CharacterSkillCdComponent = t.GetComponent(220);
    this.Cvl = t.GetComponent(242);
    i = ConfigManager_1.ConfigManager.SkillButtonConfig;
    this.SkillButtonConfigList = i.GetAllSkillButtonConfig(this.RoleId);
    this.SkillCommonButtonConfigList = i.GetAllSkillCommonButtonConfig();
    if (this.RoleConfig.RoleType !== 2 || !(this.SkillButtonIndexConfig = i.GetSkillIndexConfig(this.RoleId), this.SkillButtonIndexConfig)) {
      this.SkillButtonIndexConfig = i.GetSkillIndexConfig(0);
    }
    this.vyo();
    this.Myo();
    this.c$e();
    if (this.IsCurEntity) {
      this.RefreshBehaviorButtonState();
    }
  }
  OnChangeRole(t) {
    if (this.IsCurEntity = t) {
      for (const i of this.SkillButtonDataMap.values()) {
        i.RefreshSkillTexturePath();
      }
      this.RefreshBehaviorButtonState();
      this.kxm = true;
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
    this.KXd.clear();
    this.GYe = undefined;
    this.QXd = undefined;
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
    for (const a of SkillButtonUiDefine_1.skillButtonActionList) {
      var t = new SkillButtonData_1.SkillButtonData();
      this.SkillButtonDataMap.set(a, t);
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
          var f = this.GetSkillButtonDataByButton(r);
          if (f && f.Config === undefined && (this.Syo(f, v), r === 11)) {
            f.SetDefaultHidden(true);
            if (r = this.GetSkillButtonDataByButton(4)) {
              f.DefaultSkillId = r.DefaultSkillId;
              f.RefreshSkillId();
            }
            f.RefreshIsVisible();
            f.RefreshIsEnable();
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
    for (const i of ConfigManager_1.ConfigManager.SkillButtonConfig.GetAllBehaviorCommonButtonConfig()) {
      if (i.ButtonType !== 0) {
        var t = new BehaviorButtonData_1.BehaviorButtonData();
        t.Refresh(this.EntityHandle, i);
        this.BehaviorButtonDataMap.set(t.ButtonType, t);
        this.DisableTagBehaviorButtonMapping.Add(t.DisableTagIds, t);
        this.DisableSkillIdTagBehaviorButtonMapping.Add(t.DisableSkillIdTagIds.keys(), t);
        this.KSo.Add(t.VisibleTagIds, t);
        this.QSo.Add(t.HiddenTagIds, t);
        this.DynamicEffectTagBehaviorButtonMapping.Add(t.DynamicEffectTagIdMap.keys(), t);
        this.SkillIconTagBehaviorButtonMapping.Add(t.SkillIconTagIds, t);
        for (const s of t.SkillIdTagMap.keys()) {
          this.SkillIdTagBehaviorButtonMapping.AddSingle(s, t);
        }
      }
    }
  }
  c$e() {
    this.yyo();
    this.Iyo();
    EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle, EventDefine_1.EEventName.EntityVisionSkillChanged, this.syo);
    EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.EntityVisionPosChanged, this.duf);
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
            this.Tyo(r, this.XXd);
          }
          for (const f of o.GetEnableTagIds()) {
            this.Tyo(f, this.uyo);
          }
          for (const a of o.GetDisableTagIds()) {
            this.Tyo(a, this.Sri);
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
          for (const c of o.DynamicEffectTagIdMap.keys()) {
            this.Tyo(c, this.Cyo);
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
            for (const B of o.ExploreAsFightTagIds) {
              this.Tyo(B, this.iO_);
            }
          }
        }
      }
      for (const m of this.BehaviorButtonDataMap.values()) {
        if (m.EntityHandle) {
          for (const d of m.DisableTagIds) {
            this.Tyo(d, this.gKm);
          }
          for (const y of m.DisableSkillIdTagIds.keys()) {
            this.Tyo(y, this.CKm);
          }
          for (const g of m.VisibleTagIds) {
            this.Tyo(g, this.pyo);
          }
          for (const D of m.HiddenTagIds) {
            this.Tyo(D, this.fyo);
          }
          for (const k of m.SkillIdTagMap.keys()) {
            this.Tyo(k, this.pKm);
          }
          for (const C of m.SkillIconTagIds) {
            this.Tyo(C, this.vKm);
          }
          for (const M of m.DynamicEffectTagIdMap.keys()) {
            this.Tyo(M, this.yKm);
          }
        }
      }
      this.Tyo(40422668, this.ayo);
      this.Tyo(SkillButtonData_1.controlVisionTagId, this.syo);
      var i = this.SkillButtonIndexConfig;
      if (i) {
        var s = new Set();
        var h = ModelManager_1.ModelManager.SkillButtonUiModel.DefaultSkillButtonIndexData;
        if (i.Id === h.ButtonIndexConfigId) {
          for (const w of h.ButtonIndexTagIdSet) {
            s.add(w);
          }
          for (const T of h.ButtonTypeTagMap.keys()) {
            s.add(T);
          }
        } else {
          for (const b of i.TagList) {
            for (const I of b.ArrayString) {
              var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(I);
              if (e) {
                s.add(e);
              }
            }
          }
          for (const U of (Info_1.Info.OperationType === 2 ? i.DesktopButtonTypeMap : i.PadButtonTypeMap).keys()) {
            s.add(U);
          }
        }
        for (const A of s) {
          this.Tyo(A, this.gyo);
        }
        for (const q of i.MotorPadButtonTypeMap.keys()) {
          this.Tyo(q, this.N8g);
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
      let t = this.KXd.get(h);
      if (t) {
        if (t.has(s)) {
          return;
        }
        t.add(s);
      } else {
        (t = new Set()).add(s);
        this.KXd.set(h, t);
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
  YXd(t) {
    if (!this.QXd.has(t)) {
      ControllerHolder_1.ControllerHolder.FormationAttributeController.AddValueListener(t, this.zXd);
      ControllerHolder_1.ControllerHolder.FormationAttributeController.AddMaxListener(t, this.zXd);
      this.QXd.set(t, this.zXd);
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
    this.kxm = false;
    this.$So.clear();
    this.YSo.clear();
    this.JSo.clear();
    this.zSo.clear();
    this.ZSo.clear();
    this.y5g.clear();
    this.tyo.clear();
    this.pdt.clear();
    this.cKm.clear();
    this.eyo.clear();
    this.dKm.clear();
    this.mKm.clear();
    this.fKm.clear();
    this.vvl.clear();
    this.Fqg.clear();
    this.iyo = false;
    this.F8g = false;
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
  RefreshBehaviorButtonState() {
    var t;
    var i;
    var s;
    if (this.EntityHandle?.Valid && (s = this.EntityHandle.Entity.GetComponent(186).DirectionState, (i = this.GetBehaviorButtonDataByButton(101)) && (t = s === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection ? 1 : 0, i.State !== t) && (i.State = t, t = i.GetSkillTexturePath(), i.RefreshSkillTexturePath(), this.IsCurEntity) && t !== i.GetSkillTexturePath() && (this.mKm.add(i), this.VXe()), t = this.GetBehaviorButtonDataByButton(102)) && (i = s === CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection ? 1 : 0, t.State !== i) && (t.State = i, s = t.GetSkillTexturePath(), t.RefreshSkillTexturePath(), this.IsCurEntity) && s !== t.GetSkillTexturePath()) {
      this.mKm.add(t);
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
  RefreshVisibleByBehaviorType(t) {
    var i;
    var t = this.GetBehaviorButtonDataByButton(t);
    if (t && (i = t.IsVisible(), t.RefreshIsVisible(), this.IsCurEntity) && i !== t.IsVisible()) {
      this.eyo.add(t);
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
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.EntityVisionPosChanged, this.duf);
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharHoldingHandsChanged, this.vWu);
      this.Lyo();
      this.Dyo();
    }
    this.JXd();
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
    this.KXd.clear();
  }
  Dyo() {
    for (var [t, i] of this.GYe) {
      this.AttributeComponent.RemoveListener(t, i);
    }
  }
  JXd() {
    for (var [t, i] of this.QXd) {
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
  GetSkillButtonDataByEnableTag(t) {
    return this.EnableTagSkillButtonMapping.Get(t);
  }
  ClearNextTickAfterRefreshAllBattleSkillItems() {
    this.OXe();
  }
  OnInputControllerChange(t, i) {
    if (this.SkillButtonDataMap) {
      for (const n of this.SkillButtonDataMap.values()) {
        var s;
        var h;
        var e;
        var o;
        if (n.CustomHandle && (s = n.IsEnableSlideControl, h = n.CustomSkillTexturePath, e = n.CustomSkillIconName, n.CustomHandle.RefreshOnInputControllerChange())) {
          if (this.IsCurEntity) {
            if (n.CustomHandle.SkillCdModifyMark) {
              this.tyo.add(n);
              this.VXe();
            }
            if (n.CustomHandle.EnableModifyMark && (o = n.IsEnable(), n.RefreshIsEnable(), o !== n.IsEnable())) {
              this.$So.add(n);
              this.VXe();
            }
            if (n.CustomHandle.CustomHdModifyMark) {
              n.CustomHandle.CustomHdModifyMark = false;
              this.y5g.add(n);
              this.VXe();
            }
            n.CustomHandle.ClearModifyMark();
            if (s !== n.IsEnableSlideControl) {
              this.Fqg.add(n);
              this.VXe();
            }
            if (h !== n.CustomSkillTexturePath || e !== n.CustomSkillIconName) {
              n.RefreshSkillTexturePath();
              this.zSo.add(n);
              this.VXe();
            }
          } else {
            if (n.CustomHandle.EnableModifyMark) {
              n.RefreshIsEnable();
            }
            n.CustomHandle.ClearModifyMark();
          }
        }
      }
    }
  }
  MarkMotorPadSkillIndexChanged() {
    if (this.IsCurEntity) {
      this.F8g = true;
      this.VXe();
    }
  }
}
(exports.SkillButtonEntityData = SkillButtonEntityData).jXe = Stats_1.Stat.Create("SkillButtonEntityDataNextTick");
//# sourceMappingURL=SkillButtonEntityData.js.map