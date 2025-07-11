"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerExtraEffectManager = exports.ExtraEffectManager = exports.BaseExtraEffectManager = undefined;
const Stats_1 = require("../../../../../../../Core/Common/Stats");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const ExtraEffectDefine_1 = require("./ExtraEffectDefine");
const ExtraEffectLibrary_1 = require("./ExtraEffectLibrary");
class BaseExtraEffectManager {
  constructor(t) {
    this.BuffComponent = t;
    this.EffectHolder = new Map();
    this.ActivatedHandles = new Set();
  }
  OnBuffAdded(t) {
    if (this.SXo(t)) {
      if (t?.Config) {
        if (t.IsActive()) {
          this.CreateBuffEffects(t);
        }
      } else {
        CombatLog_1.CombatLog.Error("Buff", this.BuffComponent?.Entity, "正在添加的buff额外效果未加载对应的buffRef", ["buffId", t?.Id], ["handle", t?.Handle], ["持有者", t?.GetOwnerDebugName()]);
      }
    }
  }
  OnBuffRemoved(t, e) {
    var f = t.Handle;
    if (this.SXo(t) && t.IsActive()) {
      this.RemoveBuffEffects(f, e);
    }
  }
  OnStackIncreased(t, e, f, a) {
    if (this.SXo(t)) {
      for (const r of this.GetEffectsByHandle(t.Handle)) {
        r.OnStackIncreased(e, f, a);
      }
    }
  }
  OnStackDecreased(t, e, f, a) {
    if (this.SXo(t)) {
      for (const r of this.GetEffectsByHandle(t.Handle)) {
        r.OnStackDecreased(e, f, a);
      }
    }
  }
  OnBuffInhibitedChanged(t, e) {
    var f = t.Handle;
    if (this.SXo(t)) {
      if (e) {
        this.RemoveBuffEffects(f, true);
      } else {
        this.CreateBuffEffects(t);
      }
    }
  }
  SXo(t) {
    var e = t?.Config;
    if (e) {
      return !!e.HasBuffEffect;
    } else {
      CombatLog_1.CombatLog.Error("Buff", this.BuffComponent?.Entity, "处理buff额外效果逻辑时找不到对应的buffRef", ["buffId", t?.Id], ["handleId", t?.Handle], ["持有者", t?.GetOwnerDebugName()]);
      return false;
    }
  }
  CreateBuffEffects(e) {
    var f = e.Handle;
    const a = e.Id;
    if (this.ActivatedHandles.has(f)) {
      CombatLog_1.CombatLog.Error("Buff", this.BuffComponent?.Entity, "重复创建Buff额外效果", ["buffId", a], ["handle", f]);
    } else {
      var r = e.GetInstigatorBuffComponent();
      this.ActivatedHandles.add(f);
      var s = e.Config.EffectInfos?.map(t => [t, ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(a, t, e.Level)]);
      var t = this.BuffComponent;
      if (s && t?.Valid) {
        for (let t = 0; t < s.length; t++) {
          var i = s[t][0];
          var o = s[t][1];
          var n = i.ExtraEffectId;
          var n = (0, ExtraEffectDefine_1.getBuffEffectClass)(n);
          if (n) {
            n = n.Create(f, t, o, this.BuffComponent, r, i);
            this.qp(n);
            n.OnCreated();
          }
        }
      }
    }
  }
  RemoveBuffEffects(t, e) {
    if (!this.ActivatedHandles.has(t)) {
      CombatLog_1.CombatLog.Warn("Buff", this.BuffComponent?.Entity, "尝试移除不存在的buff额外效果实例", ["handleId", t], ["entity", this.BuffComponent?.Entity?.Id]);
    }
    this.ActivatedHandles.delete(t);
    for (const f of this.GetEffectsByHandle(t)) {
      f.OnRemoved(e);
    }
    this.EffectHolder.delete(t);
  }
  qp(e) {
    var t;
    var f = e.ActiveHandleId;
    if (f < 0) {
      CombatLog_1.CombatLog.Warn("Buff", this.BuffComponent?.Entity, "invalid handleId when trying to add effect in holder.", ["handle", f]);
    } else {
      if (!this.EffectHolder.has(f)) {
        this.EffectHolder.set(f, []);
      }
      if ((t = this.EffectHolder.get(f)).some(t => t === e)) {
        CombatLog_1.CombatLog.Warn("Buff", this.BuffComponent?.Entity, "duplicated handle when trying to add ExtraEffect.", ["handle", f]);
      } else {
        t.push(e);
      }
    }
  }
  Clear() {
    this.EffectHolder.clear();
    this.ActivatedHandles.clear();
  }
  *FilterById(t, e) {
    var f = [];
    if (t instanceof Array) {
      for (const r of t) {
        var a = (0, ExtraEffectDefine_1.getBuffEffectClass)(r);
        if (a) {
          f.push(a);
        }
      }
    } else {
      t = (0, ExtraEffectDefine_1.getBuffEffectClass)(t);
      if (t) {
        f.push(t);
      }
    }
    if (f.length >= 0) {
      for (const s of this.EffectHolder.values()) {
        if (s) {
          for (const i of s) {
            for (const o of f) {
              if (i instanceof o && (!e || e(i))) {
                yield i;
                break;
              }
            }
          }
        }
      }
    }
  }
  *GetAllEffects() {
    for (const t of this.EffectHolder.values()) {
      if (t) {
        for (const e of t) {
          yield e;
        }
      }
    }
  }
  GetEffectsByHandle(t) {
    return this.EffectHolder.get(t)?.values() ?? [];
  }
}
class ExtraEffectManager extends (exports.BaseExtraEffectManager = BaseExtraEffectManager) {}
exports.ExtraEffectManager = ExtraEffectManager;
class PlayerExtraEffectManager extends BaseExtraEffectManager {}
exports.PlayerExtraEffectManager = PlayerExtraEffectManager;
//# sourceMappingURL=ExtraEffectManager.js.map