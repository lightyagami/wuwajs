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
  OnBuffRemoved(t, f) {
    var e = t.Handle;
    if (this.SXo(t) && t.IsActive()) {
      this.RemoveBuffEffects(e, f);
    }
  }
  OnStackIncreased(t, f, e, r) {
    if (this.SXo(t)) {
      for (const a of this.GetEffectsByHandle(t.Handle)) {
        a.OnStackIncreased(f, e, r);
      }
    }
  }
  OnStackDecreased(t, f, e, r) {
    if (this.SXo(t)) {
      for (const a of this.GetEffectsByHandle(t.Handle)) {
        a.OnStackDecreased(f, e, r);
      }
    }
  }
  OnBuffInhibitedChanged(t, f) {
    var e = t.Handle;
    if (this.SXo(t)) {
      if (f) {
        this.RemoveBuffEffects(e, true);
      } else {
        this.CreateBuffEffects(t);
      }
    }
  }
  SXo(t) {
    var f = t?.Config;
    if (f) {
      return !!f.HasBuffEffect;
    } else {
      CombatLog_1.CombatLog.Error("Buff", this.BuffComponent?.Entity, "处理buff额外效果逻辑时找不到对应的buffRef", ["buffId", t?.Id], ["handleId", t?.Handle], ["持有者", t?.GetOwnerDebugName()]);
      return false;
    }
  }
  CreateBuffEffects(f) {
    var e = f.Handle;
    const r = f.Id;
    if (this.ActivatedHandles.has(e)) {
      CombatLog_1.CombatLog.Error("Buff", this.BuffComponent?.Entity, "重复创建Buff额外效果", ["buffId", r], ["handle", e]);
    } else {
      var a = f.GetInstigatorBuffComponent();
      this.ActivatedHandles.add(e);
      var s = f.Config.EffectInfos?.map(t => [t, ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(r, t, f.Level)]);
      var t = this.BuffComponent;
      if (s && t?.Valid) {
        for (let t = 0; t < s.length; t++) {
          var i = s[t][0];
          var o = s[t][1];
          var n = i.ExtraEffectId;
          var n = (0, ExtraEffectDefine_1.getBuffEffectClass)(n);
          if (n) {
            n = n.Create(e, t, o, this.BuffComponent, a, i);
            this.qp(n);
            n.OnCreated();
          }
        }
      }
    }
  }
  RemoveBuffEffects(t, f) {
    if (!this.ActivatedHandles.has(t)) {
      CombatLog_1.CombatLog.Warn("Buff", this.BuffComponent?.Entity, "尝试移除不存在的buff额外效果实例", ["handleId", t], ["entity", this.BuffComponent?.Entity?.Id]);
    }
    this.ActivatedHandles.delete(t);
    for (const e of this.GetEffectsByHandle(t)) {
      e.OnRemoved(f);
    }
    this.EffectHolder.delete(t);
  }
  qp(f) {
    var t;
    var e = f.ActiveHandleId;
    if (e < 0) {
      CombatLog_1.CombatLog.Warn("Buff", this.BuffComponent?.Entity, "invalid handleId when trying to add effect in holder.", ["handle", e]);
    } else {
      if (!this.EffectHolder.has(e)) {
        this.EffectHolder.set(e, []);
      }
      if ((t = this.EffectHolder.get(e)).some(t => t === f)) {
        CombatLog_1.CombatLog.Warn("Buff", this.BuffComponent?.Entity, "duplicated handle when trying to add ExtraEffect.", ["handle", e]);
      } else {
        t.push(f);
      }
    }
  }
  Clear() {
    this.EffectHolder.clear();
    this.ActivatedHandles.clear();
  }
  *FilterById(t, f) {
    var e = [];
    if (t instanceof Array) {
      for (const a of t) {
        var r = (0, ExtraEffectDefine_1.getBuffEffectClass)(a);
        if (r) {
          e.push(r);
        }
      }
    } else {
      t = (0, ExtraEffectDefine_1.getBuffEffectClass)(t);
      if (t) {
        e.push(t);
      }
    }
    if (e.length >= 0) {
      for (const s of this.EffectHolder.values()) {
        if (s) {
          for (const i of s) {
            for (const o of e) {
              if (i instanceof o && (!f || f(i))) {
                yield i;
                break;
              }
            }
          }
        }
      }
    }
  }
  FilterFirstById(t, f) {
    var e = [];
    if (t instanceof Array) {
      for (const a of t) {
        var r = (0, ExtraEffectDefine_1.getBuffEffectClass)(a);
        if (r) {
          e.push(r);
        }
      }
    } else {
      t = (0, ExtraEffectDefine_1.getBuffEffectClass)(t);
      if (t) {
        e.push(t);
      }
    }
    if (e.length >= 0) {
      for (const s of this.EffectHolder.values()) {
        if (s) {
          for (const i of s) {
            for (const o of e) {
              if (i instanceof o && (!f || f(i))) {
                return i;
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
        for (const f of t) {
          yield f;
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