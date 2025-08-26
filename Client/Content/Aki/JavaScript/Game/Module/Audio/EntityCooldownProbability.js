"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityCooldownProbability = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const GameAudioController_1 = require("./GameAudioController");
class EntityCooldownProbability {
  constructor() {
    this.EntityId = 0;
    this.ModelId = 0;
    this.TagComp = undefined;
    this.AudioEventCooldownTimeMap = undefined;
  }
  Init(i, t) {
    this.EntityId = i;
    this.ModelId = t;
    this.AudioEventCooldownTimeMap = new Map();
  }
  Clear() {
    this.TagComp = undefined;
    this.AudioEventCooldownTimeMap?.clear();
    this.AudioEventCooldownTimeMap = undefined;
  }
  CheckTimeOutCooldownRecords() {
    this.AudioEventCooldownTimeMap ||= new Map();
    var i = [];
    for (const t of this.AudioEventCooldownTimeMap) {
      if (Time_1.Time.Now - t[1].Time >= Math.max(t[1].Cooldown, GameAudioController_1.CHECK_TIME_OUT_COOLDOWN_RECORD)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 记录的AudioEvent冷却时间一定时间未使用过，删除该条记录", ["EntityId", this.EntityId], ["ModelId", this.ModelId], ["AudioEvent", t[0]], ["IntervalTime", Time_1.Time.Now - t[1].Time]);
        }
        i.push(t[0]);
      }
    }
    for (const o of i) {
      this.AudioEventCooldownTimeMap.delete(o);
    }
    return this.AudioEventCooldownTimeMap.size === 0;
  }
  CheckPlayAudio(t, o, e = true, r = true) {
    if (o.TagProbability && o.TagProbability.Num() > 0) {
      this.TagComp ||= EntitySystem_1.EntitySystem.GetComponent(this.EntityId, 206);
      for (let i = 0; i < o.TagProbability.Num() && this.TagComp; i++) {
        var n;
        var s = o.TagProbability.Get(i);
        if (this.TagComp.HasTag(s.GameplayTag.TagId)) {
          if ((n = this.h_l(t, s.Probability, s.CooldownTime, e, r)) && e && r && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 通过了配置的概率和CD检查", ["EntityId", this.EntityId], ["ModelId", this.ModelId], ["AudioEvent", t], ["Tag", s.GameplayTag.TagName], ["Probability", s.Probability], ["CooldownTime", s.CooldownTime]);
          }
          return n;
        }
      }
    }
    var i = this.h_l(t, o.DefaultProbability, o.DefaultCooldownTime, e, r);
    if (i && r && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 通过了默认概率和CD检查", ["EntityId", this.EntityId], ["ModelId", this.ModelId], ["AudioEvent", t], ["Probability", o.DefaultProbability], ["CooldownTime", o.DefaultCooldownTime]);
    }
    return i;
  }
  UpdateCooldownRecord(i, t, o, e = true) {
    this.AudioEventCooldownTimeMap ||= new Map();
    var r = this.AudioEventCooldownTimeMap.has(i) ? Time_1.Time.Now - this.AudioEventCooldownTimeMap.get(i).Time : -1;
    if (e && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 更新播放记录", ["EntityId", this.EntityId], ["ModelId", this.ModelId], ["AudioEvent", i], ["距离上一次播放", r], ["Probability", t], ["CooldownTime", o]);
    }
    this.AudioEventCooldownTimeMap.set(i, {
      Time: Time_1.Time.Now,
      Cooldown: o
    });
  }
  h_l(i, t, o, e = true, r = true) {
    if (this.__l(i, t, r)) {
      this.AudioEventCooldownTimeMap ||= new Map();
      var n = this.AudioEventCooldownTimeMap.has(i) ? Time_1.Time.Now - this.AudioEventCooldownTimeMap.get(i).Time : -1;
      if (n < 0 || o < n) {
        if (o !== 0 && e) {
          this.UpdateCooldownRecord(i, t, o, r);
        }
        return true;
      }
      if (r && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 播放Audio不满足CD检查", ["EntityId", this.EntityId], ["ModelId", this.ModelId], ["AudioEvent", i], ["CooldownTime", o], ["距离上一次播放", n]);
      }
    }
    return false;
  }
  __l(i, t, o = true) {
    var e;
    if (t === 1 || t === 0) {
      return t === 1;
    } else {
      if (t <= (e = Math.random()) && o && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 播放Audio不满足概率检查", ["EntityId", this.EntityId], ["ModelId", this.ModelId], ["AudioEvent", i], ["Probability", t], ["随机数", e]);
      }
      return e < t;
    }
  }
  static GetProbability(i) {
    if (i === 1 || i === 0) {
      return i === 1;
    } else {
      return Math.random() < i;
    }
  }
}
exports.EntityCooldownProbability = EntityCooldownProbability;
//# sourceMappingURL=EntityCooldownProbability.js.map