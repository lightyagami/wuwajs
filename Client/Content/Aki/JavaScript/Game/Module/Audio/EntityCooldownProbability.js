"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.EntityCooldownProbability = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  GameAudioController_1 = require("./GameAudioController");
class EntityCooldownProbability {
  constructor() {
    this.EntityId = 0, this.ModelId = 0, this.TagComp = void 0, this.AudioEventCooldownTimeMap = void 0
  }
  Init(i, t) {
    this.EntityId = i, this.ModelId = t, this.AudioEventCooldownTimeMap = new Map
  }
  Clear() {
    this.TagComp = void 0, this.AudioEventCooldownTimeMap?.clear(), this.AudioEventCooldownTimeMap = void 0
  }
  CheckTimeOutCooldownRecords() {
    this.AudioEventCooldownTimeMap || (this.AudioEventCooldownTimeMap = new Map);
    var i = [];
    for (const t of this.AudioEventCooldownTimeMap) Time_1.Time.Now - t[1].Time >= Math.max(t[1].Cooldown, GameAudioController_1.CHECK_TIME_OUT_COOLDOWN_RECORD) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 记录的AudioEvent冷却时间一定时间未使用过，删除该条记录", ["EntityId", this.EntityId], ["ModelId", this.ModelId], ["AudioEvent", t[0]], ["IntervalTime", Time_1.Time.Now - t[1].Time]), i.push(t[0]));
    for (const o of i) this.AudioEventCooldownTimeMap.delete(o);
    return 0 === this.AudioEventCooldownTimeMap.size
  }
  CheckPlayAudio(t, o, e = !0, r = !0) {
    if (o.TagProbability && 0 < o.TagProbability.Num()) {
      this.TagComp || (this.TagComp = EntitySystem_1.EntitySystem.GetComponent(this.EntityId, 205));
      for (let i = 0; i < o.TagProbability.Num() && this.TagComp; i++) {
        var n, s = o.TagProbability.Get(i);
        if (this.TagComp.HasTag(s.GameplayTag.TagId)) return (n = this.h_l(t, s.Probability, s.CooldownTime, e, r)) && e && r && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 通过了配置的概率和CD检查", ["EntityId", this.EntityId], ["ModelId", this.ModelId], ["AudioEvent", t], ["Tag", s.GameplayTag.TagName], ["Probability", s.Probability], ["CooldownTime", s.CooldownTime]), n
      }
    }
    var i = this.h_l(t, o.DefaultProbability, o.DefaultCooldownTime, e, r);
    return i && r && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 通过了默认概率和CD检查", ["EntityId", this.EntityId], ["ModelId", this.ModelId], ["AudioEvent", t], ["Probability", o.DefaultProbability], ["CooldownTime", o.DefaultCooldownTime]), i
  }
  UpdateCooldownRecord(i, t, o, e = !0) {
    this.AudioEventCooldownTimeMap || (this.AudioEventCooldownTimeMap = new Map);
    var r = this.AudioEventCooldownTimeMap.has(i) ? Time_1.Time.Now - this.AudioEventCooldownTimeMap.get(i).Time : -1;
    e && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 更新播放记录", ["EntityId", this.EntityId], ["ModelId", this.ModelId], ["AudioEvent", i], ["距离上一次播放", r], ["Probability", t], ["CooldownTime", o]), this.AudioEventCooldownTimeMap.set(i, {
      Time: Time_1.Time.Now,
      Cooldown: o
    })
  }
  h_l(i, t, o, e = !0, r = !0) {
    if (this.__l(i, t, r)) {
      this.AudioEventCooldownTimeMap || (this.AudioEventCooldownTimeMap = new Map);
      var n = this.AudioEventCooldownTimeMap.has(i) ? Time_1.Time.Now - this.AudioEventCooldownTimeMap.get(i).Time : -1;
      if (n < 0 || o < n) return 0 !== o && e && this.UpdateCooldownRecord(i, t, o, r), !0;
      r && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 播放Audio不满足CD检查", ["EntityId", this.EntityId], ["ModelId", this.ModelId], ["AudioEvent", i], ["CooldownTime", o], ["距离上一次播放", n])
    }
    return !1
  }
  __l(i, t, o = !0) {
    var e;
    return 1 === t || 0 === t ? 1 === t : (t <= (e = Math.random()) && o && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 播放Audio不满足概率检查", ["EntityId", this.EntityId], ["ModelId", this.ModelId], ["AudioEvent", i], ["Probability", t], ["随机数", e]), e < t)
  }
  static GetProbability(i) {
    return 1 === i || 0 === i ? 1 === i : Math.random() < i
  }
}
exports.EntityCooldownProbability = EntityCooldownProbability;
//# sourceMappingURL=EntityCooldownProbability.js.map