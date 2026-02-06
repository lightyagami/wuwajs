"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueBase = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
class GameplayCueBase {
  constructor(t, e, s, i, h, n, a, o) {
    this.CueConfig = t;
    this.EntityHandle = e;
    this.ActorInternal = s;
    this.CueComp = i;
    this.IsInstant = h;
    this.BeginCallback = n;
    this.EndCallback = a;
    this.Instigator = o;
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
  OnChangeBuffHandle(t, e) {}
  OnChangeRole(t) {
    this.EntityHandle = t;
    this.ActorInternal = t.Entity.GetComponent(3).Actor;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "GameplayCueBase.Cue特效换人", ["CueType", this.CueConfig.CueType], ["CueId", this.CueConfig.Id], ["BuffId", this.BuffId], ["BuffHandleID", this.BuffHandleId], ["EntityId", this.EntityHandle.Id], ["Name", this.ActorInternal.GetName()], ["Path", this.GetPath()]);
    }
  }
  static IsSingleInstance() {
    return true;
  }
  static Spawn(t) {
    var e = new this(t.CueConfig, t.EntityHandle, t.EntityHandle.Entity.GetComponent(1).Owner, t.CueComp, t.Instant, t.BeginCallback, t.EndCallback, t.Instigator);
    if (t.Buff) {
      e.BuffHandleId = t.Buff.Handle;
      e.BuffId = t.Buff.Id;
    }
    e.OnInit();
    e.Ofe();
    return e;
  }
  Ofe() {
    if (!this.IsActive) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 28, "GameplayCueBase.Cue特效开始", ["CueType", this.CueConfig.CueType], ["CueId", this.CueConfig.Id], ["BuffId", this.BuffId], ["BuffHandleID", this.BuffHandleId], ["EntityId", this.EntityHandle.Id], ["Name", this.ActorInternal.GetName()], ["Path", this.GetPath()]);
      }
      this.IsActive = true;
      this.OnCreate();
      EventSystem_1.EventSystem.EmitWithTarget(this.EntityHandle, EventDefine_1.EEventName.CharGameplayCueChanged, true, this.CueConfig.Id);
    }
  }
  Destroy() {
    if (this.IsActive) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 28, "GameplayCueBase.Cue特效结束", ["CueType", this.CueConfig.CueType], ["CueId", this.CueConfig.Id], ["BuffId", this.BuffId], ["BuffHandleID", this.BuffHandleId], ["EntityId", this.EntityHandle.Id], ["Name", this.ActorInternal.GetName()], ["Path", this.GetPath()]);
      }
      this.IsActive = false;
      this.OnDestroy();
      EventSystem_1.EventSystem.EmitWithTarget(this.EntityHandle, EventDefine_1.EEventName.CharGameplayCueChanged, false, this.CueConfig.Id);
    }
  }
  Tick(t) {
    if (this.IsActive) {
      this.OnTick(t);
    }
  }
  Add(t, e = 0) {
    this.CueHandleIds.add(t);
  }
  Remove(t) {
    this.CueHandleIds.delete(t);
  }
  ChangeBuffHandle(t) {
    var e;
    if (this.BuffHandleId !== t) {
      e = this.BuffHandleId;
      this.BuffHandleId = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 85, "GameplayCueBase.Cue特效BuffHandle修改", ["CueType", this.CueConfig.CueType], ["CueId", this.CueConfig.Id], ["BuffId", this.BuffId], ["preHandle", e], ["BuffHandleID", this.BuffHandleId], ["EntityId", this.EntityHandle.Id], ["Name", this.ActorInternal.GetName()], ["Path", this.GetPath()]);
      }
      this.OnChangeBuffHandle(e, t);
    }
  }
  GetPath() {
    let t = undefined;
    var e = this.EntityHandle.Entity?.GetComponent(1);
    return (t = e ? e.GetReplaceEffect(this.CueConfig.Path) : t) || this.CueConfig.Path;
  }
  GetActorComponent() {
    if (this.EntityHandle.EntityType === Protocol_1.Aki.Protocol.kks.HI_) {
      return this.ActorInternal.VehicleActorComponent;
    } else {
      return this.ActorInternal.CharacterActorComponent;
    }
  }
}
exports.GameplayCueBase = GameplayCueBase;
//# sourceMappingURL=GameplayCueBase.js.map