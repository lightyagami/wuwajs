"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FilterChain = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  Filter_1 = require("./Filter");
class FilterChain {
  constructor() {
    this.AllTypeFilters = new Map, this.fOc = new Map, this.gOc = new Map, this.COc = new Set, this.pOc = Stats_1.Stat.Create("FilterChain.AddTarget"), this.vOc = Stats_1.Stat.Create("FilterChain.AddFilter"), this.yOc = t => {
      var e = t,
        t = (e || Log_1.Log.CheckDebug() && Log_1.Log.Debug("FilterWithState", 72, "[FilterChain] FilterCriteriaChanged", ["AllTypeFilters", this.AllTypeFilters]), this.gOc.get(e));
      this.gOc.set(e, new Set);
      for (const i of t) this.fOc.delete(i), this.AddTarget(i, e.FilterType)
    }
  }
  Init() {
    for (const t of Filter_1.filterTypePriority) this.AllTypeFilters.set(t, new Set);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FilterCriteriaChanged, this.yOc), (0, Filter_1.tryCatchWrapper)(this.OnInit.bind(this), "[FilterChain] OnInit执行出错", this.constructor.name)
  }
  OnInit() {}
  Cleanup() {
    for (const t of this.AllTypeFilters.values()) {
      for (const e of t) e.Cleanup();
      t.clear()
    }
    this.AllTypeFilters.clear(), this.fOc.clear(), this.gOc.clear(), this.COc.clear(), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FilterCriteriaChanged, this.yOc), (0, Filter_1.tryCatchWrapper)(this.OnCleanup.bind(this), "[FilterChain] OnCleanup执行出错", this.constructor.name)
  }
  OnCleanup() {}
  AddFilter(e) {
    if (this.gOc.has(e)) Log_1.Log.CheckWarn() && Log_1.Log.Warn("FilterWithState", 72, "FilterChain中已经有了这个Filter，不需要重复添加", ["Filter", e]);
    else {
      this.AllTypeFilters.get(e.FilterType).add(e), this.gOc.set(e, new Set), this.vOc.Start();
      let t = e.FilterType + 1;
      for (; t < Filter_1.filterTypePriority.length; t++)
        for (const s of this.AllTypeFilters.get(Filter_1.filterTypePriority[t])) {
          var i = this.gOc.get(s);
          for (const h of i) {
            var r = e.ExecuteCriteria(h);
            r === Filter_1.filterResult[e.FilterType] && (i.delete(h), this.fOc.set(h, e), this.gOc.get(e).add(h), r ? this.SOc(h, !0) : this.SOc(h, !1))
          }
        }
      this.vOc.Stop()
    }
  }
  RemoveFilter(t) {
    if (this.AllTypeFilters.get(t.FilterType)?.delete(t)) {
      var e = this.gOc.get(t);
      this.gOc.delete(t);
      for (const i of e) Filter_1.filterResult[t.FilterType] && this.SOc(i, !1), this.fOc.delete(i), this.AddTarget(i, t.FilterType);
      return !0
    }
    return Log_1.Log.CheckWarn() && Log_1.Log.Warn("FilterWithState", 72, "RemoveFilter失败", ["Filter", t], ["FilterType", t.FilterType], ["AllTypeFilters", this.AllTypeFilters], ["FilterChain", this]), !1
  }
  AddTarget(t, e = 0) {
    let i = !0,
      r = e;
    for (this.pOc.Start(); r < Filter_1.filterTypePriority.length; r++) {
      for (const s of this.AllTypeFilters.get(r))(i = s.ExecuteCriteria(t)) === Filter_1.filterResult[s.FilterType] && (this.fOc.set(t, s), this.gOc.get(s).add(t));
      if (this.fOc.has(t)) break
    }
    return this.pOc.Stop(), i ? (this.SOc(t, !0), !0) : (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("FilterWithState", 72, "FilterChain中的某个Normal Filter没有通过target筛选", ["Filter", this.fOc.get(t)], ["Target", t]), !1)
  }
  GetAllFilters() {
    var t = [];
    for (const e of this.AllTypeFilters.values()) t.push(...e);
    return t
  }
  RemoveTarget(t) {
    let e = !1;
    var i;
    return this.fOc.has(t) && (i = this.fOc.get(t), this.gOc.get(i)?.delete(t) || Log_1.Log.CheckWarn() && Log_1.Log.Warn("FilterWithState", 72, "[FilterChain] RemoveTarget，FilterHoldTargets和TargetsWithFilter不匹配", ["Filter", i], ["Target", t], ["TargetsPassed", this.COc], ["TargetsWithFilter", this.fOc]), e = e || this.fOc.delete(t)), !!(e = e || this.SOc(t, !1)) || (Log_1.Log.CheckWarn() && Log_1.Log.Warn("FilterWithState", 72, "[FilterChain] RemoveTarget失败，没有这个Target", ["Target", t], ["TargetsPassed", this.COc], ["TargetsWithFilter", this.fOc]), !1)
  }
  OnPassedTargetModified(t, e) {}
  SOc(t, e) {
    if (e) {
      if (!this.COc.has(t)) return this.COc.add(t), this.OnPassedTargetModified(t, !0), !0
    } else if (this.COc.delete(t)) return this.OnPassedTargetModified(t, !1), !0;
    return !1
  }
}
exports.FilterChain = FilterChain;
//# sourceMappingURL=FilterChain.js.map