"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueBase = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
class GameplayCueBase {
  constructor(t, e, s, i, h, a, n, o) {
    this.CueConfig = t;
    this.EntityHandle = e;
    this.ActorInternal = s;
    this.CueComp = i;
    this.IsInstant = h;
    this.BeginCallback = a;
    this.EndCallback = n;
    this.Instigator = o;
    this.BuffId = undefined;
    this.BuffHandleId = 0;
    this.CueHandleIds = new Set();
  }
  OnInit() {}
  OnTick(t) {}
  OnCreate() {}
  OnDestroy() {}
  OnEnable() {}
  OnDisable() {}
  OnAdd(t, e) {}
  OnRemove(t) {}
  OnChangeRole(t) {
    this.EntityHandle = t;
    this.ActorInternal = t.Entity.GetComponent(3).Actor;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "Cue特效换人", ["CueType", this.CueConfig.CueType], ["CueId", this.CueConfig.Id], ["BuffId", this.BuffId], ["BuffHandleID", this.BuffHandleId], ["EntityId", this.EntityHandle.Id], ["Name", this.ActorInternal.GetName()]);
    }
  }
  static IsSingleInstance() {
    return true;
  }
  static Spawn(t) {
    var e = new this(t.CueConfig, t.EntityHandle, t.EntityHandle.Entity.GetComponent(3).Actor, t.CueComp, t.Instant, t.BeginCallback, t.EndCallback, t.Instigator);
    if (t.Buff) {
      e.BuffHandleId = t.Buff.Handle;
      e.BuffId = t.Buff.Id;
    }
    e.OnInit();
    e.Ofe();
    return e;
  }
  Ofe() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "Cue特效开始", ["CueType", this.CueConfig.CueType], ["CueId", this.CueConfig.Id], ["BuffId", this.BuffId], ["BuffHandleID", this.BuffHandleId], ["EntityId", this.EntityHandle.Id], ["Name", this.ActorInternal.GetName()]);
    }
    this.OnCreate();
  }
  Destroy() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "Cue特效结束", ["CueType", this.CueConfig.CueType], ["CueId", this.CueConfig.Id], ["BuffId", this.BuffId], ["BuffHandleID", this.BuffHandleId], ["EntityId", this.EntityHandle.Id], ["Name", this.ActorInternal.GetName()]);
    }
    this.OnDestroy();
  }
  Tick(t) {
    this.OnTick(t);
  }
  Add(t, e = 0) {
    this.CueHandleIds.add(t);
    this.OnAdd(t, e);
  }
  Remove(t) {
    this.CueHandleIds.delete(t);
    this.OnRemove(t);
  }
  GetPath() {
    let t = undefined;
    var e = this.EntityHandle.Entity.GetComponent(3);
    return (t = e ? e.GetReplaceEffect(this.CueConfig.Path) : t) || this.CueConfig.Path;
  }
}
exports.GameplayCueBase = GameplayCueBase;
//# sourceMappingURL=GameplayCueBase.js.map