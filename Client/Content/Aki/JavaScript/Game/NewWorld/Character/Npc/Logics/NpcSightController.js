"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcSightController = exports.StareActionInfo = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
function getActionTypeName(t) {
  switch (t) {
    case 1:
      return "生态注视玩家";
    case 0:
      return "兴趣点注视";
    case 2:
      return "关卡行为-启用实体注视";
    case 3:
      return "转身面向玩家";
    case 4:
      return "系统商店";
    case 5:
      return "剧情";
    case 6:
      return "拍照系统";
    default:
      return String(t);
  }
}
class StareActionInfo {
  constructor() {
    this.IsDirty = false;
    this.TargetLocation = Vector_1.Vector.Create();
    this.TargetItem = undefined;
    this.TargetActor = undefined;
  }
  ClearInfo() {
    this.TargetLocation.Reset();
    this.TargetItem = undefined;
    this.TargetActor = undefined;
  }
  IsValid() {
    return !this.TargetLocation.Equals(Vector_1.Vector.ZeroVectorProxy) || (this.TargetItem !== undefined ? this.TargetItem.Valid : this.TargetActor !== undefined && this.TargetActor.IsValid());
  }
}
exports.StareActionInfo = StareActionInfo;
class NpcSightController {
  constructor(t) {
    this.Entity = undefined;
    this.ActorComp = undefined;
    this.AnimComp = undefined;
    this.PerformComp = undefined;
    this.StareActionStackMap = new Map();
    this.TarActionType = -1;
    this.CurActionType = -1;
    this.LockedStareActionTypeSet = new Set();
    this.LockActionType = -1;
    this.DisableSightTarget = false;
    this.Entity = t;
    this.ActorComp = this.Entity.GetComponent(2);
    this.AnimComp = this.Entity.GetComponent(45);
    this.PerformComp = this.Entity.GetComponent(197);
  }
  Init() {
    this.PerformComp?.HandleCachedStareAction();
  }
  ChangeSightTarget(t, i) {
    if (t === undefined) {
      const e = this.StareActionStackMap.get(i);
      if (e?.IsValid()) {
        e.ClearInfo();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("NPC", 50, "[NpcSightController] 移除注视目标", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Target", undefined], ["Context", getActionTypeName(i)]);
        }
        this.RefreshTargetType();
        this.RefreshSight();
        return;
      } else {
        return undefined;
      }
    }
    let e = this.StareActionStackMap.get(i);
    if (!e) {
      e = new StareActionInfo();
      this.StareActionStackMap.set(i, e);
    }
    if ((0, RegisterComponent_1.isComponentInstance)(t, 1)) {
      if (e.TargetItem === t) {
        return;
      }
      e.TargetItem = t;
      e.TargetActor = undefined;
      e.TargetLocation.Reset();
      e.IsDirty = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 50, "[NpcSightController] 添加注视目标", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Target", t.CreatureData.GetPbDataId()], ["Context", getActionTypeName(i)]);
      }
    } else if (t instanceof Vector_1.Vector) {
      if (e.TargetLocation.Equals(t)) {
        return;
      }
      e.TargetLocation = t;
      e.TargetItem = undefined;
      e.TargetActor = undefined;
      e.IsDirty = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 50, "[NpcSightController] 添加注视目标", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Target", t], ["Context", getActionTypeName(i)]);
      }
    } else if (t instanceof UE.Actor) {
      if (e.TargetActor === t) {
        return;
      }
      e.TargetActor = t;
      e.TargetLocation.Reset();
      e.TargetItem = undefined;
      e.IsDirty = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 50, "[NpcSightController] 添加注视目标", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Target", t.GetName()], ["Context", getActionTypeName(i)]);
      }
    }
    this.TarActionType = Math.max(this.TarActionType, i);
    this.RefreshTargetType();
    this.RefreshSight();
    e.IsDirty = false;
  }
  EnableSightChange(t, i) {
    if (t === this.DisableSightTarget) {
      this.DisableSightTarget = !t;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "[NpcSightController] 设置启用视线目标", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Enable", t], ["Reason", i]);
      }
      if (t) {
        this.RefreshTargetType();
        this.RefreshSight(true);
      } else {
        this.AnimComp?.SetSightTargetItem(undefined);
      }
    }
  }
  LockSightChange(t, i) {
    if (i) {
      if (this.LockedStareActionTypeSet.has(t)) {
        return;
      }
      this.LockedStareActionTypeSet.add(t);
      this.LockActionType = Math.max(this.LockActionType, t);
    } else {
      if (!this.LockedStareActionTypeSet.has(t)) {
        return;
      }
      this.LockedStareActionTypeSet.delete(t);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("NPC", 50, "[NpcSightController] 锁定注视级别", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["LockType", getActionTypeName(t)], ["Lock", i]);
    }
    this.RefreshTargetLockType();
    this.RefreshSight(true);
  }
  RefreshSight(t = false) {
    var i;
    if (this.AnimComp && !this.DisableSightTarget && (i = this.StareActionStackMap.get(this.CurActionType), t || this.CurActionType !== this.TarActionType || i?.IsDirty)) {
      this.CurActionType = this.TarActionType;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 50, "[NpcSightController] 改变注视目标", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["ActionType", getActionTypeName(this.CurActionType)], ["LockType", getActionTypeName(this.LockActionType)]);
      }
      if (this.TarActionType === -1 || this.TarActionType < this.LockActionType) {
        this.AnimComp.SetSightTargetItem(undefined);
      } else if ((t = this.StareActionStackMap.get(this.TarActionType)).TargetItem) {
        this.AnimComp.SetSightTargetItem(t.TargetItem);
      } else if (t.TargetActor) {
        this.AnimComp.SetSightTargetActor(t.TargetActor);
      } else {
        this.AnimComp.SetSightTargetPoint(t.TargetLocation);
      }
    }
  }
  RefreshTargetType() {
    while (this.TarActionType >= 0 && !this.StareActionStackMap.get(this.TarActionType)?.IsValid()) {
      this.TarActionType--;
    }
  }
  RefreshTargetLockType() {
    while (this.LockActionType >= 0 && !this.LockedStareActionTypeSet.has(this.LockActionType)) {
      this.LockActionType--;
    }
  }
}
exports.NpcSightController = NpcSightController;
//# sourceMappingURL=NpcSightController.js.map