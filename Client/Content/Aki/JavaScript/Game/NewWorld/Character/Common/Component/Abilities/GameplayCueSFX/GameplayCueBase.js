"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueBase = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
class GameplayCueBase {
  constructor(t, s, e, i, h, a, n, u) {
    this.CueConfig = t;
    this.EntityHandle = s;
    this.ActorInternal = e;
    this.CueComp = i;
    this.IsInstant = h;
    this.BeginCallback = a;
    this.EndCallback = n;
    this.Instigator = u;
    this.BuffId = undefined;
    this.BuffHandleId = 0;
    this.CueHandleIds = new Set();
    this.IsActive = false;
  }
  OnInit() {}
  OnTick(t) {}
  OnCreate() {}
  OnDestroy() {}
  OnEnable() {}
  OnDisable() {}
  OnAdd(t, s) {}
  OnRemove(t) {}
  OnChangeBuffHandle(t, s) {}
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
    var s = new this(t.CueConfig, t.EntityHandle, t.EntityHandle.Entity.GetComponent(3).Actor, t.CueComp, t.Instant, t.BeginCallback, t.EndCallback, t.Instigator);
    if (t.Buff) {
      s.BuffHandleId = t.Buff.Handle;
      s.BuffId = t.Buff.Id;
    }
    s.OnInit();
    s.Ofe();
    return s;
  }
  Ofe() {
    if (!this.IsActive) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 28, "Cue特效开始", ["CueType", this.CueConfig.CueType], ["CueId", this.CueConfig.Id], ["BuffId", this.BuffId], ["BuffHandleID", this.BuffHandleId], ["EntityId", this.EntityHandle.Id], ["Name", this.ActorInternal.GetName()]);
      }
      this.IsActive = true;
      this.OnCreate();
    }
  }
  Destroy() {
    if (this.IsActive) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 28, "Cue特效结束", ["CueType", this.CueConfig.CueType], ["CueId", this.CueConfig.Id], ["BuffId", this.BuffId], ["BuffHandleID", this.BuffHandleId], ["EntityId", this.EntityHandle.Id], ["Name", this.ActorInternal.GetName()]);
      }
      this.IsActive = false;
      this.OnDestroy();
    }
  }
  Tick(t) {
    if (this.IsActive) {
      this.OnTick(t);
    }
  }
  Add(t, s = 0) {
    this.CueHandleIds.add(t);
    this.OnAdd(t, s);
  }
  Remove(t) {
    this.CueHandleIds.delete(t);
    this.OnRemove(t);
  }
  ChangeBuffHandle(t) {
    var s;
    if (this.BuffHandleId !== t) {
      s = this.BuffHandleId;
      this.BuffHandleId = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 85, "特效BuffHandle修改", ["CueType", this.CueConfig.CueType], ["CueId", this.CueConfig.Id], ["BuffId", this.BuffId], ["preHandle", s], ["BuffHandleID", this.BuffHandleId], ["EntityId", this.EntityHandle.Id], ["Name", this.ActorInternal.GetName()]);
      }
      this.OnChangeBuffHandle(s, t);
    }
  }
  GetPath() {
    let t = undefined;
    var s = this.EntityHandle.Entity.GetComponent(3);
    return (t = s ? s.GetReplaceEffect(this.CueConfig.Path) : t) || this.CueConfig.Path;
  }
}
exports.GameplayCueBase = GameplayCueBase;
//# sourceMappingURL=GameplayCueBase.js.map