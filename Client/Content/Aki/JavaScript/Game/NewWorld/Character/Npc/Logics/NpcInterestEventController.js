"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcInterestEventController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const Global_1 = require("../../../../Global");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const TICK_INTERVAL_TIME = 500;
class InterestActionBase {
  constructor() {
    this.Type = 0;
    this.IsExclusive = false;
    this.Priority = 0;
  }
  OnEnter(t, e) {}
  OnLeave(t, e) {}
  GetPriority(t, e) {
    return 0;
  }
}
InterestActionBase.TmpVector1 = Vector_1.Vector.Create();
class InterestActionLookAt extends InterestActionBase {
  constructor() {
    super(...arguments);
    this.Type = 0;
    this.IsExclusive = true;
  }
  OnEnter(t, e) {
    t = t.GetComponent(199);
    if (t && (e = this.kwm(e))) {
      t.SightTarget(e, 0);
    }
  }
  OnLeave(t, e) {
    t = t.GetComponent(199);
    if (t) {
      t.SightTarget(undefined, 0);
    }
  }
  GetPriority(t, e) {
    t = t.GetComponent(1);
    if (t && e.GetLocation(InterestActionBase.TmpVector1)) {
      return Vector_1.Vector.DistSquared(t.ActorLocationProxy, InterestActionBase.TmpVector1);
    } else {
      return Infinity;
    }
  }
  kwm(t) {
    switch (t.Type) {
      case 1:
        return t.Position;
      case 0:
        return t.GetEntity()?.GetComponent(1);
      default:
        return;
    }
  }
}
class InterestItemBase {
  constructor() {
    this.Type = 1;
  }
  GetLocation(t) {
    return false;
  }
  GetDebugInfo() {
    return "";
  }
}
InterestItemBase.TempVector1 = Vector_1.Vector.Create();
class InterestItemEntity extends InterestItemBase {
  constructor() {
    super(...arguments);
    this.Type = 0;
    this.PbDataId = 0;
  }
  GetLocation(t) {
    var e = this.GetEntity()?.GetComponent(1);
    return !!e && (t.DeepCopy(e.ActorLocationProxy), true);
  }
  GetDebugInfo() {
    return String(this.PbDataId);
  }
  GetEntity() {
    if (this.PbDataId === -1) {
      return Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
    } else {
      return ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.PbDataId)?.Entity;
    }
  }
}
class InterestItemPosition extends InterestItemBase {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.Position = Vector_1.Vector.Create();
  }
  GetLocation(t) {
    t.DeepCopy(this.Position);
    return true;
  }
  GetDebugInfo() {
    return `X: ${this.Position.X}, Y: ${this.Position.Y}, Z: ${this.Position.Z}`;
  }
}
class InterestConditionBase {
  constructor() {
    this.Type = 0;
  }
  CheckCondition(t, e) {
    return false;
  }
}
InterestConditionBase.TmpVector1 = Vector_1.Vector.Create();
class InterestConditionAngle extends InterestConditionBase {
  constructor() {
    super(...arguments);
    this.Type = 0;
    this.MaxAngle = 0;
  }
  CheckCondition(t, e) {
    t = t.GetComponent(1);
    return !!t && !!(e = this.wVs(e)) && (e.Subtraction(t.ActorLocationProxy, InterestConditionBase.TmpVector1), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(t, InterestConditionBase.TmpVector1), InterestConditionBase.TmpVector1.Normalize(), MathUtils_1.MathUtils.GetAngleByVectorDot(InterestConditionBase.TmpVector1, t.ActorForwardProxy) < this.MaxAngle);
  }
  wVs(t) {
    switch (t.Type) {
      case 1:
        return t.Position;
      case 0:
        return t.GetEntity()?.GetComponent(1)?.ActorLocationProxy;
      default:
        return;
    }
  }
}
class InterestEvent {
  constructor(t) {
    this.OwnerEntity = undefined;
    this.OwnerController = undefined;
    this.Id = 0;
    this.Radius = 0;
    this.Target = undefined;
    this.Conditions = [];
    this.Action = undefined;
    this.IsEntered = false;
    this.Id = ++InterestEvent.Yla;
    this.OwnerEntity = t;
    t = this.OwnerEntity.GetComponent(199);
    this.OwnerController = t.InterestEventController;
  }
  GetPriority() {
    return this.Action.GetPriority(this.OwnerEntity, this.Target);
  }
  CheckCondition() {
    for (const t of this.Conditions) {
      if (!t.CheckCondition(this.OwnerEntity, this.Target)) {
        return false;
      }
    }
    return true;
  }
  TryEnterRange() {
    if (!this.IsEntered) {
      this.IsEntered = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 50, "[InterestEvent] 触发兴趣事件", ["EntityId", this.OwnerEntity?.Id], ["Target", this.Target?.GetDebugInfo()], ["Action", this.Action?.Type]);
      }
      this.OwnerController.RegisterActiveEvent(this);
      this.Action?.OnEnter(this.OwnerEntity, this.Target);
    }
  }
  TryLeaveRange() {
    if (this.IsEntered) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 50, "[InterestEvent] 结束兴趣事件", ["EntityId", this.OwnerEntity?.Id], ["Target", this.Target?.GetDebugInfo()], ["Action", this.Action?.Type]);
      }
      this.Action?.OnLeave(this.OwnerEntity, this.Target);
      this.OwnerController.UnRegisterActiveEvent(this);
      this.IsEntered = false;
    }
  }
}
InterestEvent.Yla = 0;
class NpcInterestEventController {
  constructor(t) {
    this.Entity = undefined;
    this.ActorComp = undefined;
    this.ExternalEntityListener = new Map();
    this.ExternalPositionListener = new Set();
    this.ExternalEventMap = new Map();
    this.CurActiveEvents = new Set();
    this.CurActiveExclusiveEvents = new Map();
    this.InterestEventMap = new Map();
    this.IntervalTime = 0;
    this.SensoryRange = 0;
    this.TmpHandles = [];
    this.TmpVector1 = Vector_1.Vector.Create();
    this.Entity = t;
    this.ActorComp = this.Entity.GetComponent(1);
  }
  Init() {
    this.SensoryRange = 0;
    this.IntervalTime = 0;
    this.InitExternalLookAtInterestEvents();
    return true;
  }
  Tick(t) {
    if (this.SensoryRange && this.InterestEventMap.size) {
      this.IntervalTime += t;
      if (!(this.IntervalTime < TICK_INTERVAL_TIME)) {
        this.IntervalTime = 0;
        this.HandleExternalOldEvents(this.ActorComp.ActorLocationProxy);
        this.HandleExternalNewEvents(this.ActorComp.ActorLocationProxy);
      }
    }
  }
  HandleExternalOldEvents(t) {
    for (const r of this.CurActiveEvents) {
      var e = this.InterestEventMap.get(r);
      var s = e.Radius;
      var s = s * s;
      e.Target.GetLocation(this.TmpVector1);
      var i = Vector_1.Vector.DistSquared(this.TmpVector1, t);
      if (s < i || !e.CheckCondition()) {
        e.TryLeaveRange();
      }
    }
  }
  HandleExternalNewEvents(t) {
    if (this.ExternalEntityListener.size) {
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(this.ActorComp.ActorLocationProxy, this.SensoryRange, 255, this.TmpHandles);
      this.HandleExternalNewEntitiesEvents(this.TmpHandles, t, this.Entity.Id);
    }
    if (this.ExternalPositionListener.size) {
      this.HandleExternalNewPositionsEvents(t);
    }
  }
  HandleExternalNewEntitiesEvents(t, e, s) {
    for (const l of t) {
      var i = l.Id;
      var r = l.Entity?.GetComponent(1);
      var n = l.Entity?.GetComponent(3)?.IsRoleAndCtrlByMe ? -1 : l.PbDataId;
      if (l?.Entity?.Active && r && i !== s && this.ExternalEntityListener.has(n)) {
        var o = Vector_1.Vector.DistSquared(r.ActorLocationProxy, e);
        for (const I of this.ExternalEntityListener.get(n)) {
          if (!this.CurActiveEvents.has(I)) {
            let t = true;
            var h = this.InterestEventMap.get(I);
            var a = this.CurActiveExclusiveEvents.get(h.Action.Type);
            if (h.Action.IsExclusive && a) {
              a = this.InterestEventMap.get(a);
              c = h.GetPriority();
              a = a.GetPriority();
              t = c < a;
            }
            var c = h.Radius;
            if (!!t && !(c * c < o) && !!h.CheckCondition()) {
              a = this.CurActiveExclusiveEvents.get(h.Action.Type);
              this.InterestEventMap.get(a ?? 0)?.TryLeaveRange();
              h.TryEnterRange();
            }
          }
        }
      }
    }
  }
  HandleExternalNewPositionsEvents(e) {
    for (const o of this.ExternalPositionListener) {
      if (!this.CurActiveEvents.has(o)) {
        let t = true;
        var s = this.InterestEventMap.get(o);
        var i = this.CurActiveExclusiveEvents.get(s.Action.Type);
        if (s.Action.IsExclusive && i) {
          i = this.InterestEventMap.get(i);
          r = s.GetPriority();
          i = i.GetPriority();
          t = r < i;
        }
        var r = s.Radius;
        var i = r * r;
        s.Target.GetLocation(this.TmpVector1);
        var n = Vector_1.Vector.DistSquared(this.TmpVector1, e);
        if (!!t && !(i < n) && !!s.CheckCondition()) {
          i = this.CurActiveExclusiveEvents.get(s.Action.Type);
          this.InterestEventMap.get(i ?? 0)?.TryLeaveRange();
          s.TryEnterRange();
        }
      }
    }
  }
  RegisterActiveEvent(t) {
    if (this.CurActiveEvents.has(t.Id)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 50, "[NpcInterestEventController] 重复注册活跃事件", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["EventId", t.Id], ["Target", t.Target?.GetDebugInfo()], ["ActionType", t.Action?.Type]);
      }
    } else {
      if (t.Action.IsExclusive) {
        this.RegisterActiveExclusiveEvent(t);
      }
      this.CurActiveEvents.add(t.Id);
    }
  }
  RegisterActiveExclusiveEvent(t) {
    if (this.CurActiveExclusiveEvents.get(t.Action.Type) === t.Id) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 50, "[NpcInterestEventController] 重复注册独占事件", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["EventId", t.Id], ["Target", t.Target?.GetDebugInfo()], ["ActionType", t.Action?.Type]);
      }
    } else {
      this.CurActiveExclusiveEvents.set(t.Action.Type, t.Id);
    }
  }
  UnRegisterActiveEvent(t) {
    if (this.CurActiveEvents.has(t.Id)) {
      if (t.Action.IsExclusive) {
        this.UnRegisterActiveExclusiveEvent(t);
      }
      this.CurActiveEvents.delete(t.Id);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("NPC", 50, "[NpcInterestEventController] 尝试注销活跃事件失败", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["EventId", t.Id], ["Target", t.Target?.GetDebugInfo()], ["ActionType", t.Action?.Type]);
    }
  }
  UnRegisterActiveExclusiveEvent(t) {
    var e = this.CurActiveExclusiveEvents.get(t.Action.Type);
    if (e !== t.Id) {
      e = this.InterestEventMap.get(e ?? 0);
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 50, "[NpcInterestEventController] 尝试注销其他独占事件", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Target", t.Target?.GetDebugInfo()], ["ActionType", t.Action?.Type], ["OtherTarget", e?.Target?.GetDebugInfo()], ["OtherActionType", e?.Action?.Type]);
      }
    } else {
      this.CurActiveExclusiveEvents.delete(t.Action.Type);
    }
  }
  AddExternalInterestEvent(t, e) {
    let s = this.ExternalEventMap.get(t);
    if (!s) {
      s = [0, new Set()];
      this.ExternalEventMap.set(t, s);
    }
    let i = s[0];
    for (const n of e) {
      let e = true;
      s[1].add(n.Id);
      if (n.Target.Type === 0) {
        var r = n.Target.PbDataId;
        let t = this.ExternalEntityListener.get(r);
        if (!t) {
          t = new Set();
          this.ExternalEntityListener.set(r, t);
        }
        e = !t.has(n.Id);
        t.add(n.Id);
      } else if (n.Target.Type === 1) {
        e = !this.ExternalPositionListener.has(n.Id);
        this.ExternalPositionListener.add(n.Id);
      }
      if (e) {
        this.InterestEventMap.set(n.Id, n);
        i = Math.max(i, n.Radius);
      }
    }
    s[0] = i;
    this.SensoryRange = Math.max(this.SensoryRange, i);
  }
  RemoveExternalInterestEvent(e) {
    var s = this.ExternalEventMap.get(e);
    if (s) {
      for (const h of s[1]) {
        var i;
        var r;
        var n = this.InterestEventMap.get(h);
        n.TryLeaveRange();
        if (n.Target.Type === 0) {
          i = n.Target.PbDataId;
          (r = this.ExternalEntityListener.get(i)).delete(h);
          if (!r.size) {
            this.ExternalEntityListener.delete(i);
          }
        } else if (n.Target.Type === 1) {
          this.ExternalPositionListener.delete(h);
        }
        this.InterestEventMap.delete(h);
      }
      this.ExternalEventMap.delete(e);
      let t = 0;
      for (var [, o] of this.ExternalEventMap) {
        t = Math.max(o[0], t);
      }
      this.SensoryRange = t;
    }
  }
  InitExternalLookAtInterestEvents() {
    this.InitExternalLookAtInterestEventsFromEntityData();
    this.InitExternalLookAtInterestEventsFromCache();
  }
  InitExternalLookAtInterestEventsFromEntityData() {
    var t = this.ActorComp.CreatureData.GetPbEntityInitData();
    if (t) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "NpcPerformComponent");
      if (t?.ShowOnStandby?.LookAtConfigs?.length) {
        var e = [];
        for (const i of t.ShowOnStandby.LookAtConfigs) {
          var s = {
            TargetPbDataId: 0,
            TargetPosition: Vector_1.Vector.Create(),
            MaxAngle: 180,
            MaxDistance: 0
          };
          if (i.Target.Type === "Position") {
            s.TargetPosition.FromConfigVector(i.Target.Position);
          } else if (i.Target.Type === "Player") {
            s.TargetPbDataId = -1;
          } else if (i.Target.Type === "Entity") {
            s.TargetPbDataId = i.Target.EntityId;
          }
          s.MaxAngle = i.MaxAngle;
          s.MaxDistance = i.MaxDistance;
          e.push(s);
        }
        this.AddExternalLookAtInterestEvents({
          Key: "STANDBY_CONFIG_LOOKAT",
          PbDataIds: [this.ActorComp.CreatureData.GetPbDataId()],
          Params: e
        });
      }
    }
  }
  InitExternalLookAtInterestEventsFromCache() {
    var t = this.ActorComp.CreatureData.GetPbDataId();
    var t = ControllerHolder_1.ControllerHolder.NpcPerformController.EntityLookAtCacheForId.get(t);
    if (t) {
      for (const s of t) {
        var e = ControllerHolder_1.ControllerHolder.NpcPerformController.EntityLookAtCacheForKey.get(s);
        if (!this.ExternalEventMap.has(e.Key)) {
          this.AddExternalLookAtInterestEvents(e);
        }
      }
    }
  }
  AddExternalLookAtInterestEvents(t) {
    var e = [];
    for (const r of t.Params) {
      let t = undefined;
      if (r.TargetPbDataId === 0) {
        (t = new InterestItemPosition()).Position.DeepCopy(r.TargetPosition);
      } else {
        (t = new InterestItemEntity()).PbDataId = r.TargetPbDataId;
      }
      var s = new InterestActionLookAt();
      var i = new InterestEvent(this.Entity);
      i.Radius = Number(r.MaxDistance);
      i.Target = t;
      i.Action = s;
      if (r.MaxAngle < 180) {
        (s = new InterestConditionAngle()).MaxAngle = Number(r.MaxAngle);
        i.Conditions.push(s);
      }
      e.push(i);
    }
    this.AddExternalInterestEvent(t.Key, e);
  }
}
exports.NpcInterestEventController = NpcInterestEventController;
//# sourceMappingURL=NpcInterestEventController.js.map