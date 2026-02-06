"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraEffectManager = undefined;
const Stats_1 = require("../../../../../../../Core/Common/Stats");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const ExtraEffectDefine_1 = require("./ExtraEffectDefine");
const ExtraEffectLibrary_1 = require("./ExtraEffectLibrary");
class ExtraEffectManager {
  constructor(f) {
    this.BuffComponent = f;
    this.EffectHolder = new Map();
    this.ActivatedHandles = new Set();
  }
  OnBuffAdded(f) {
    if (this.SXo(f)) {
      if (f?.Config) {
        if (f.IsActive()) {
          this.CreateBuffEffects(f);
        }
      } else {
        CombatLog_1.CombatLog.Error("Buff", this.BuffComponent?.Entity, "正在添加的buff额外效果未加载对应的buffRef", ["buffId", f?.Id], ["handle", f?.Handle], ["持有者", f?.GetOwnerDebugName()]);
      }
    }
  }
  OnBuffRemoved(f, t) {
    var e = f.Handle;
    if (this.SXo(f) && f.IsActive()) {
      this.RemoveBuffEffects(e, t);
    }
  }
  OnStackIncreased(f, t, e, i) {
    if (this.SXo(f)) {
      for (const r of this.GetEffectsByHandle(f.Handle)) {
        r.OnStackIncreased(t, e, i);
      }
    }
  }
  OnStackDecreased(f, t, e, i) {
    if (this.SXo(f)) {
      for (const r of this.GetEffectsByHandle(f.Handle)) {
        r.OnStackDecreased(t, e, i);
      }
    }
  }
  OnBuffStackOverflow(f, t, e, i) {
    for (const r of f.Config.EffectInfos) {
      r.ExecutionEffect?.OnBuffStackOverflow(f, t, e, i);
    }
    if (this.SXo(f)) {
      for (const s of this.GetEffectsByHandle(f.Handle)) {
        s.OnBuffStackOverflow(f, t, e, i);
      }
    }
  }
  OnBuffInhibitedChanged(f, t) {
    var e = f.Handle;
    if (this.SXo(f)) {
      if (t) {
        this.RemoveBuffEffects(e, true);
      } else {
        this.CreateBuffEffects(f);
      }
    }
  }
  SXo(f) {
    var t = f?.Config;
    if (t) {
      return !!t.HasBuffEffect;
    } else {
      CombatLog_1.CombatLog.Error("Buff", this.BuffComponent?.Entity, "处理buff额外效果逻辑时找不到对应的buffRef", ["buffId", f?.Id], ["handleId", f?.Handle], ["持有者", f?.GetOwnerDebugName()]);
      return false;
    }
  }
  CreateBuffEffects(t) {
    var e = t.Handle;
    const i = t.Id;
    if (this.ActivatedHandles.has(e)) {
      CombatLog_1.CombatLog.Error("Buff", this.BuffComponent?.Entity, "重复创建Buff额外效果", ["buffId", i], ["handle", e]);
    } else {
      var r = t.GetInstigatorBuffComponent();
      this.ActivatedHandles.add(e);
      var s = t.Config.EffectInfos?.map(f => [f, ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(i, f, t.Level)]);
      var f = this.BuffComponent;
      if (s && f?.Valid) {
        for (let f = 0; f < s.length; f++) {
          var o = s[f][0];
          var a = s[f][1];
          var n = o.ExtraEffectId;
          var n = (0, ExtraEffectDefine_1.getBuffEffectClass)(n);
          if (n) {
            n = n.Create(e, f, a, this.BuffComponent, r, o);
            this.qp(n);
            n.OnCreated();
          }
        }
      }
    }
  }
  RemoveBuffEffects(f, t) {
    if (!this.ActivatedHandles.has(f)) {
      CombatLog_1.CombatLog.Warn("Buff", this.BuffComponent?.Entity, "尝试移除不存在的buff额外效果实例", ["handleId", f], ["entity", this.BuffComponent?.Entity?.Id]);
    }
    this.ActivatedHandles.delete(f);
    for (const e of this.GetEffectsByHandle(f)) {
      e.OnRemoved(t);
    }
    this.EffectHolder.delete(f);
  }
  qp(t) {
    var f;
    var e = t.ActiveHandleId;
    if (e < 0) {
      CombatLog_1.CombatLog.Warn("Buff", this.BuffComponent?.Entity, "invalid handleId when trying to add effect in holder.", ["handle", e]);
    } else {
      if (!this.EffectHolder.has(e)) {
        this.EffectHolder.set(e, []);
      }
      if ((f = this.EffectHolder.get(e)).some(f => f === t)) {
        CombatLog_1.CombatLog.Warn("Buff", this.BuffComponent?.Entity, "duplicated handle when trying to add ExtraEffect.", ["handle", e]);
      } else {
        f.push(t);
      }
    }
  }
  Clear() {
    this.EffectHolder.clear();
    this.ActivatedHandles.clear();
  }
  *FilterById(f, t) {
    var e = [];
    if (f instanceof Array) {
      for (const r of f) {
        var i = (0, ExtraEffectDefine_1.getBuffEffectClass)(r);
        if (i) {
          e.push(i);
        }
      }
    } else {
      f = (0, ExtraEffectDefine_1.getBuffEffectClass)(f);
      if (f) {
        e.push(f);
      }
    }
    if (e.length >= 0) {
      for (const s of this.EffectHolder.values()) {
        if (s) {
          for (const o of s) {
            for (const a of e) {
              if (o instanceof a && (!t || t(o))) {
                yield o;
                break;
              }
            }
          }
        }
      }
    }
  }
  FilterFirstById(f, t) {
    var e = [];
    if (f instanceof Array) {
      for (const r of f) {
        var i = (0, ExtraEffectDefine_1.getBuffEffectClass)(r);
        if (i) {
          e.push(i);
        }
      }
    } else {
      f = (0, ExtraEffectDefine_1.getBuffEffectClass)(f);
      if (f) {
        e.push(f);
      }
    }
    if (e.length >= 0) {
      for (const s of this.EffectHolder.values()) {
        if (s) {
          for (const o of s) {
            for (const a of e) {
              if (o instanceof a && (!t || t(o))) {
                return o;
              }
            }
          }
        }
      }
    }
  }
  *GetAllEffects() {
    for (const f of this.EffectHolder.values()) {
      if (f) {
        for (const t of f) {
          yield t;
        }
      }
    }
  }
  GetEffectsByHandle(f) {
    return this.EffectHolder.get(f)?.values() ?? [];
  }
}
exports.ExtraEffectManager = ExtraEffectManager;
//# sourceMappingURL=ExtraEffectManager.js.map