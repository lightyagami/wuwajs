"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonFollowerEntityData = undefined;
const Stats_1 = require("../../../Core/Common/Stats");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const SkillButtonData_1 = require("./SkillButtonData");
const SkillButtonMapping_1 = require("./SkillButtonMapping");
class SkillButtonFollowerEntityData {
  constructor() {
    this.IsEnable = false;
    this.EntityHandle = undefined;
    this.PbDataId = 0;
    this.AttributeComponent = undefined;
    this.GameplayTagComponent = undefined;
    this.SkillComponent = undefined;
    this.SkillButtonConfigList = undefined;
    this.SkillButtonDataMap = new Map();
    this.AttributeIdSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.AttributeIdTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.DisableTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.DisableSkillIdTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.CustomHandleSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
    this.NotOccupyTagSkillButtonMapping = new SkillButtonMapping_1.SkillButtonMapping();
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
              if (!this.GYe.has(e)) {
                this.lyo(e, this._yo);
              }
              if (!this.GYe.has(o)) {
                this.lyo(o, this._yo);
              }
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
    this.Sri = (t, i) => {
      t = this.GetSkillButtonDataByDisableTag(t);
      if (t) {
        for (const h of t) {
          let t = false;
          var s = h.IsEnable();
          if (s === i && (t = i ? (h.SetEnable(false, 4), true) : (h.RefreshIsEnable(), h.IsEnable() !== s), this.IsEnable && t)) {
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
          if (e === s && (s ? (h = o.GetSkillId()) && o.GetDisableSkillIdTagIds().get(i)?.has(h) && (o.SetEnable(false, 5), t = true) : (o.RefreshIsEnable(), t = o.IsEnable() !== e), this.IsEnable && t)) {
            this.$So.add(o);
            this.VXe();
          }
        }
      }
    };
    this.qY_ = (t, i) => {
      t = this.NotOccupyTagSkillButtonMapping.Get(t);
      if (t) {
        for (const h of t) {
          let t = false;
          var s = h.IsOccupy();
          if (s === i && (t = i ? (h.SetNotOccupy(), true) : (h.RefreshIsOccupy(), h.IsOccupy() !== s))) {
            this.JSo.add(h);
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
          if (h !== e && (o.RefreshSkillTexturePath(), o.RefreshIsEnable(), this.IsEnable)) {
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
          if (this.IsEnable && h !== e.GetSkillTexturePath()) {
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
          if (this.IsEnable) {
            this.ZSo.add(s);
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
  Init(t, i) {
    t = (this.EntityHandle = t).Entity;
    this.IsEnable = i;
    i = t.GetComponent(0);
    this.PbDataId = i.GetPbDataId();
    this.AttributeComponent = t.GetComponent(173);
    this.GameplayTagComponent = t.GetComponent(205);
    this.SkillComponent = t.GetComponent(40);
    i = ConfigManager_1.ConfigManager.SkillButtonConfig;
    this.SkillButtonConfigList = i.GetAllSkillFollowerButtonConfig(this.PbDataId);
    this.vyo();
    this.c$e();
    if (this.IsEnable) {
      this.RefreshAllSkillButton();
    }
  }
  SetEnable(t) {
    this.IsEnable = t;
    this.RefreshAllSkillButton();
  }
  RefreshAllSkillButton() {
    if (this.SkillButtonDataMap) {
      this.VXe();
      for (const t of this.SkillButtonDataMap.values()) {
        this.JSo.add(t);
      }
    }
  }
  Clear() {
    this.Eyo();
    for (const t of this.SkillButtonDataMap.values()) {
      t.Reset();
    }
    this.SkillButtonDataMap = undefined;
    this.AttributeIdSkillButtonMapping = undefined;
    this.AttributeIdTagSkillButtonMapping = undefined;
    this.DisableTagSkillButtonMapping = undefined;
    this.DisableSkillIdTagSkillButtonMapping = undefined;
    this.NotOccupyTagSkillButtonMapping = undefined;
    this.DynamicEffectTagSkillButtonMapping = undefined;
    this.SkillIconTagSkillButtonMapping = undefined;
    this.SkillIdTagSkillButtonMapping = undefined;
    for (const i of this.XSo) {
      i?.EndTask();
    }
    this.XSo = undefined;
    this.GYe = undefined;
    this.CustomHandleSkillButtonMapping = undefined;
    this.EntityHandle = undefined;
    this.PbDataId = 0;
    this.AttributeComponent = undefined;
    this.GameplayTagComponent = undefined;
    this.SkillComponent = undefined;
    this.SkillButtonConfigList = undefined;
  }
  vyo() {
    if (!(this.PbDataId <= 0)) {
      var t = this.SkillButtonConfigList;
      if (t) {
        for (const h of t) {
          var i = h.ButtonType;
          var s = new SkillButtonData_1.SkillButtonData();
          this.SkillButtonDataMap.set(i, s);
          this.Syo(s, h);
        }
      }
    }
  }
  Syo(t, i) {
    t.Refresh(this.EntityHandle, i, 1);
    this.AttributeIdSkillButtonMapping.AddSingle(t.AttributeId, t);
    this.AttributeIdSkillButtonMapping.AddSingle(t.MaxAttributeId, t);
    for (const s of t.AttributeIdTagMap.keys()) {
      this.AttributeIdTagSkillButtonMapping.AddSingle(s, t);
    }
    this.DisableTagSkillButtonMapping.Add(t.GetDisableTagIds(), t);
    this.DisableSkillIdTagSkillButtonMapping.Add(t.GetDisableSkillIdTagIds().keys(), t);
    this.NotOccupyTagSkillButtonMapping.Add(t.GetNotOccupyTagIds(), t);
    this.DynamicEffectTagSkillButtonMapping.Add(t.DynamicEffectTagIdMap.keys(), t);
    this.SkillIconTagSkillButtonMapping.Add(t.SkillIconTagIds, t);
    for (const h of t.SkillIdTagMap.keys()) {
      this.SkillIdTagSkillButtonMapping.AddSingle(h, t);
    }
    if (t.CustomHandle && t.CustomHandle.TagIds.length > 0) {
      this.CustomHandleSkillButtonMapping.Add(t.CustomHandle.TagIds, t);
    }
  }
  c$e() {
    this.yyo();
    this.Iyo();
  }
  yyo() {
    if (!(this.PbDataId <= 0)) {
      for (const i of this.SkillButtonDataMap.values()) {
        if (i.GetEntityHandle()) {
          for (const s of i.AttributeIdTagMap.keys()) {
            this.Tyo(s, this.hyo);
          }
          for (const h of i.GetDisableTagIds()) {
            this.Tyo(h, this.Sri);
          }
          for (const e of i.GetDisableSkillIdTagIds().keys()) {
            this.Tyo(e, this.cyo);
          }
          for (const o of i.GetNotOccupyTagIds()) {
            this.Tyo(o, this.qY_);
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
  }
  Iyo() {
    for (const s of this.SkillButtonDataMap.values()) {
      var t;
      var i;
      if (s.GetEntityHandle()) {
        t = s.AttributeId;
        i = s.MaxAttributeId;
        if (!!t && !(t <= 0) && !!i && !(i <= 0)) {
          this.lyo(t, this._yo);
          this.lyo(i, this._yo);
        }
      }
    }
  }
  Tyo(t, i) {
    let s = undefined;
    if ((s = typeof t == "string" ? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t) : t) && (t = this.GameplayTagComponent.ListenForTagAddOrRemove(s, i))) {
      this.XSo.add(t);
    }
  }
  Qpl(t, i) {
    if (t &&= this.GameplayTagComponent.ListenForTagAnyCountChanged(t, i)) {
      this.XSo.add(t);
    }
  }
  lyo(t, i) {
    this.AttributeComponent.AddListener(t, i, "SkillButtonUiController");
    this.GYe.set(t, i);
  }
  VXe() {
    this.wXe ||= TimerSystem_1.TimerSystem.Next(this.GXe, SkillButtonFollowerEntityData.jXe);
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
  RefreshSkillButtonData(t) {
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
  RefreshEnableByInputEvent(t, i) {
    for (const h of this.SkillButtonDataMap.values()) {
      var s;
      if (h.GetActionType() === t && (s = h.IsEnable(), h.RefreshIsEnable(), this.IsEnable && s !== h.IsEnable())) {
        this.$So.add(h);
        this.VXe();
      }
    }
  }
  RefreshVisibleByInputEvent(t, i) {
    for (const h of this.SkillButtonDataMap.values()) {
      var s;
      if (h.GetActionType() === t && (s = h.IsVisible(), i ? h.RefreshIsVisible() : h.SetInvisible(), this.IsEnable && s !== h.IsVisible())) {
        this.YSo.add(h);
        this.VXe();
      }
    }
  }
  RefreshEnableByButtonType(t) {
    var i;
    var t = this.GetSkillButtonDataByButton(t);
    if (t && (i = t.IsEnable(), t.RefreshIsEnable(), this.IsEnable) && i !== t.IsEnable()) {
      this.$So.add(t);
      this.VXe();
    }
  }
  RefreshVisibleByButtonType(t) {
    var i;
    var t = this.GetSkillButtonDataByButton(t);
    if (t && (i = t.IsVisible(), t.RefreshIsVisible(), this.IsEnable) && i !== t.IsVisible()) {
      this.YSo.add(t);
      this.VXe();
    }
  }
  RefreshSkillTexturePath(t) {
    var i;
    var t = this.GetSkillButtonDataByButton(t);
    if (t && (i = t.GetSkillTexturePath(), t.RefreshSkillTexturePath(), this.IsEnable) && i !== t.GetSkillTexturePath()) {
      this.zSo.add(t);
      this.VXe();
    }
  }
  RefreshSkillCd(t) {
    for (const i of this.SkillButtonDataMap.values()) {
      if (i.GetSkillId() === t && (i.RefreshIsEnable(), this.IsEnable) && i.IsOccupy()) {
        this.tyo.add(i);
        this.VXe();
      }
    }
  }
  Eyo() {
    if (this.EntityHandle?.Valid) {
      this.OXe();
      this.Lyo();
      this.Dyo();
    }
  }
  Lyo() {
    for (const t of this.XSo) {
      t?.EndTask();
    }
    this.XSo.clear();
  }
  Dyo() {
    for (var [t, i] of this.GYe) {
      this.AttributeComponent.RemoveListener(t, i);
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
  GetSkillButtonDataByAttributeId(t) {
    return this.AttributeIdSkillButtonMapping.Get(t);
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
}
(exports.SkillButtonFollowerEntityData = SkillButtonFollowerEntityData).jXe = Stats_1.Stat.Create("SkillButtonEntityDataNextTick");
//# sourceMappingURL=SkillButtonFollowerEntityData.js.map