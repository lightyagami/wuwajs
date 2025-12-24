"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonVehicleEntityData = undefined;
const Stats_1 = require("../../../Core/Common/Stats");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const SkillButtonData_1 = require("./SkillButtonData");
const SkillButtonMapping_1 = require("./SkillButtonMapping");
class SkillButtonVehicleEntityData {
  constructor() {
    this.EntityHandle = undefined;
    this.AttributeComponent = undefined;
    this.TagComponent = undefined;
    this.SkillComponent = undefined;
    this.SkillButtonConfigList = undefined;
    this.SkillButtonDataMap = new Map();
    this.AttributeIdSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.AttributeIdTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.EnableTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.DisableTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.DisableSkillIdTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.CustomHandleSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.DynamicEffectTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.SkillIconTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.SkillIdTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.XSo = new Set();
    this.GYe = new Map();
    this.wXe = undefined;
    this.$So = new Set();
    this.YSo = new Set();
    this.JSo = new Set();
    this.zSo = new Set();
    this.ZSo = new Set();
    this.tyo = new Set();
    this.pdt = new Set();
    this.oyo = false;
    this.ryo = 5;
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
      if (this.oyo) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonDataRefresh, this.ryo);
        this.oyo = false;
      }
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
            this.pdt.add(n);
            if (s !== n.IsEnable()) {
              this.$So.add(n);
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
            if (t = i ? (h.SetEnable(true, 1), true) : (h.RefreshIsEnable(), h.IsEnable() !== s)) {
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
          let t = false;
          var s = h.IsEnable();
          if (s === i && (t = i ? (h.SetEnable(false, 4), true) : (h.RefreshIsEnable(), h.IsEnable() !== s))) {
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
          if (e === s && (s ? (h = o.GetSkillId()) && o.GetDisableSkillIdTagIds().get(i)?.has(h) && (o.SetEnable(false, 5), t = true) : (o.RefreshIsEnable(), t = o.IsEnable() !== e), t)) {
            this.$So.add(o);
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
          if (h !== e) {
            o.RefreshSkillTexturePath();
            o.RefreshIsEnable();
            this.JSo.add(o);
            this.VXe();
          }
        }
      }
    };
    this.dyo = (t, i) => {
      var s = this.GetSkillButtonDataBySkillIconTag(t);
      if (s) {
        for (const o of s) {
          var h = o.GetSkillTexturePath();
          if (i) {
            o.RefreshSkillTexturePathBySkillIconTag(t);
          } else {
            o.RefreshSkillTexturePath();
          }
          var e = o.GetSkillTexturePath();
          if (h !== e) {
            this.zSo.add(o);
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
          this.ZSo.add(s);
          this.VXe();
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
    this._yo = (t, i, s) => {
      this.RefreshSkillButtonEnableByAttributeId(t);
      t = this.GetSkillButtonDataByAttributeId(t);
      if (t) {
        for (const h of t) {
          this.pdt.add(h);
        }
        this.VXe();
      }
    };
  }
  Init(t) {
    var t = (this.EntityHandle = t).Entity;
    var i = t.GetComponent(0).GetTemplateId();
    this.AttributeComponent = t.GetComponent(181);
    this.TagComponent = t.GetComponent(215);
    this.SkillComponent = t.GetComponent(41);
    t = ConfigManager_1.ConfigManager.SkillButtonConfig.GetAllSkillVehicleButtonConfig(i);
    if (this.SkillButtonConfigList = t) {
      for (const e of t) {
        var s = e.ButtonType;
        var h = new SkillButtonData_1.SkillButtonData();
        this.SkillButtonDataMap.set(s, h);
        h.Refresh(this.EntityHandle, e, 2);
        this.AttributeIdSkillButtonMapping.AddSingle(h.AttributeId, h);
        this.AttributeIdSkillButtonMapping.AddSingle(h.MaxAttributeId, h);
        for (const o of h.AttributeIdTagMap.keys()) {
          this.AttributeIdTagSkillButtonMapping.AddSingle(o, h);
        }
        this.EnableTagSkillButtonMapping.Add(h.GetEnableTagIds(), h);
        this.DisableTagSkillButtonMapping.Add(h.GetDisableTagIds(), h);
        this.DisableSkillIdTagSkillButtonMapping.Add(h.GetDisableSkillIdTagIds().keys(), h);
        this.DynamicEffectTagSkillButtonMapping.Add(h.DynamicEffectTagIdMap.keys(), h);
        this.SkillIconTagSkillButtonMapping.Add(h.SkillIconTagIds, h);
        for (const n of h.SkillIdTagMap.keys()) {
          this.SkillIdTagSkillButtonMapping.AddSingle(n, h);
        }
      }
    }
    this.yyo();
    this.Iyo();
    if (this.SkillButtonDataMap) {
      this.VXe();
      for (const r of this.SkillButtonDataMap.values()) {
        this.JSo.add(r);
      }
    }
  }
  yyo() {
    for (const i of this.SkillButtonDataMap.values()) {
      if (i.GetEntityHandle()) {
        for (const s of i.AttributeIdTagMap.keys()) {
          this.Tyo(s, this.hyo);
        }
        for (const h of i.GetEnableTagIds()) {
          this.Tyo(h, this.uyo);
        }
        for (const e of i.GetDisableTagIds()) {
          this.Tyo(e, this.Sri);
        }
        for (const o of i.GetDisableSkillIdTagIds().keys()) {
          this.Tyo(o, this.cyo);
        }
        for (const n of i.SkillIdTagMap.keys()) {
          this.Tyo(n, this.myo);
        }
        for (const r of i.SkillIconTagIds) {
          this.Tyo(r, this.dyo);
        }
        for (const a of i.DynamicEffectTagIdMap.keys()) {
          this.Tyo(a, this.Cyo);
        }
        var t = i.CustomHandle?.TagIds;
        if (t) {
          for (const f of t) {
            this.Qpl(f, this.Wpl);
          }
        }
      }
    }
  }
  Iyo() {
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
  Tyo(t, i) {
    let s = undefined;
    if ((s = typeof t == "string" ? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t) : t) && (t = this.TagComponent.ListenForTagAddOrRemove(s, i))) {
      this.XSo.add(t);
    }
  }
  Qpl(t, i) {
    if (t &&= this.TagComponent.ListenForTagAnyCountChanged(t, i)) {
      this.XSo.add(t);
    }
  }
  lyo(t) {
    if (!this.GYe.has(t)) {
      this.AttributeComponent.AddListener(t, this._yo, "SkillButtonUiController");
      this.GYe.set(t, this._yo);
    }
  }
  Clear() {
    if (this.EntityHandle?.Valid) {
      this.OXe();
      for (const s of this.XSo) {
        s?.EndTask();
      }
      this.XSo.clear();
      for (var [t, i] of this.GYe) {
        this.AttributeComponent.RemoveListener(t, i);
      }
    }
    for (const h of this.SkillButtonDataMap.values()) {
      h.Reset();
    }
    this.SkillButtonDataMap = undefined;
    this.AttributeIdSkillButtonMapping = undefined;
    this.AttributeIdTagSkillButtonMapping = undefined;
    this.DisableTagSkillButtonMapping = undefined;
    this.DisableSkillIdTagSkillButtonMapping = undefined;
    this.DynamicEffectTagSkillButtonMapping = undefined;
    this.SkillIconTagSkillButtonMapping = undefined;
    this.SkillIdTagSkillButtonMapping = undefined;
    for (const e of this.XSo) {
      e?.EndTask();
    }
    this.XSo = undefined;
    this.GYe = undefined;
    this.CustomHandleSkillButtonMapping = undefined;
    this.EntityHandle = undefined;
    this.AttributeComponent = undefined;
    this.TagComponent = undefined;
    this.SkillComponent = undefined;
    this.SkillButtonConfigList = undefined;
  }
  VXe() {
    this.wXe ||= TimerSystem_1.TimerSystem.Next(this.GXe, SkillButtonVehicleEntityData.jXe);
  }
  OXe() {
    if (!this.wXe) {
      if (TimerSystem_1.TimerSystem.Has(this.wXe)) {
        TimerSystem_1.TimerSystem.Remove(this.wXe);
      }
      this.wXe = undefined;
      this.$So.clear();
      this.YSo.clear();
      this.JSo.clear();
      this.zSo.clear();
      this.ZSo.clear();
      this.tyo.clear();
      this.pdt.clear();
    }
  }
  RefreshSkillButtonEnableByAttributeId(t) {
    t = this.GetSkillButtonDataByAttributeId(t);
    if (t) {
      for (const h of t) {
        var i = h.IsEnable();
        h.RefreshIsEnable();
        var s = h.IsEnable();
        if (i !== s) {
          this.$So.add(h);
          this.VXe();
        }
      }
    }
  }
  RefreshSkillCd(t) {
    for (const i of this.SkillButtonDataMap.values()) {
      if (i.GetSkillId() === t) {
        i.RefreshIsEnable();
        this.tyo.add(i);
        this.VXe();
      }
    }
  }
  RefreshSkillButtonExplorePhantomSkillId(t) {
    var i;
    var t = this.GetSkillButtonDataByButton(t);
    if (t && (i = t.GetSkillId(), t.RefreshSkillId(), t.RefreshSkillTexturePath(), t.RefreshIsEnable(), i !== t.GetSkillId())) {
      this.JSo.add(t);
      this.VXe();
    }
  }
  RefreshEnableByInputEvent(t, i) {
    for (const h of this.SkillButtonDataMap.values()) {
      var s;
      if (h.GetActionType() === t && (s = h.IsEnable(), h.RefreshIsEnable(), s !== h.IsEnable())) {
        this.$So.add(h);
        this.VXe();
      }
    }
  }
  RefreshVisibleByInputEvent(t, i) {
    for (const h of this.SkillButtonDataMap.values()) {
      var s;
      if (h.GetActionType() === t && (s = h.IsVisible(), i ? h.RefreshIsVisible() : h.SetInvisible(), s !== h.IsVisible())) {
        this.YSo.add(h);
        this.VXe();
      }
    }
  }
  RefreshEnableByButtonType(t) {
    var i;
    var t = this.GetSkillButtonDataByButton(t);
    if (t && (i = t.IsEnable(), t.RefreshIsEnable(), i !== t.IsEnable())) {
      this.$So.add(t);
      this.VXe();
    }
  }
  RefreshVisibleByButtonType(t) {
    var i;
    var t = this.GetSkillButtonDataByButton(t);
    if (t && (i = t.IsVisible(), t.RefreshIsVisible(), i !== t.IsVisible())) {
      this.YSo.add(t);
      this.VXe();
    }
  }
  GetSkillButtonDataByButton(t) {
    return this.SkillButtonDataMap.get(t);
  }
  GetBehaviorButtonDataByButton(t) {}
  GetSkillButtonDataBySkillId(t) {
    for (const i of this.SkillButtonDataMap.values()) {
      if (i.GetSkillId() === t) {
        return i;
      }
    }
  }
  GetSkillButtonDataByEnableTag(t) {
    return this.EnableTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataByDisableTag(t) {
    return this.DisableTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataByDisableSkillIdTag(t) {
    return this.DisableSkillIdTagSkillButtonMapping.Get(t);
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
  GetSkillButtonDataByAttributeId(t) {
    return this.AttributeIdSkillButtonMapping.Get(t);
  }
}
(exports.SkillButtonVehicleEntityData = SkillButtonVehicleEntityData).jXe = Stats_1.Stat.Create("SkillButtonEntityDataNextTick");
//# sourceMappingURL=SkillButtonVehicleEntityData.js.map