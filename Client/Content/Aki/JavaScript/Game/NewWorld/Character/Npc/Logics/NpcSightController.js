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
    this.IsValid = false;
    this.IsDirty = false;
    this.TargetLocation = Vector_1.Vector.Create();
    this.TargetItem = undefined;
    this.TargetActor = undefined;
  }
  ClearInfo() {
    this.IsValid = false;
    this.TargetLocation.Reset();
    this.TargetItem = undefined;
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
    this.Entity = t;
    this.ActorComp = this.Entity.GetComponent(2);
    this.AnimComp = this.Entity.GetComponent(44);
    this.PerformComp = this.Entity.GetComponent(191);
  }
  Init() {
    this.PerformComp?.HandleCachedStareAction();
  }
  ChangeSightTarget(t, i) {
    if (t === undefined) {
      const e = this.StareActionStackMap.get(i);
      if (e?.IsValid) {
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
    e.IsValid = true;
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
    this.RefreshSight();
    e.IsDirty = false;
  }
  RefreshSight() {
    var t;
    if (this.AnimComp) {
      t = this.StareActionStackMap.get(this.CurActionType);
      if (this.CurActionType !== this.TarActionType || !!t?.IsDirty) {
        this.CurActionType = this.TarActionType;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("NPC", 50, "[NpcSightController] 改变注视目标", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Type", getActionTypeName(this.CurActionType)]);
        }
        if (this.TarActionType === -1) {
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
  }
  RefreshTargetType() {
    while (this.TarActionType >= 0 && !this.StareActionStackMap.get(this.TarActionType)?.IsValid) {
      this.TarActionType--;
    }
  }
}
exports.NpcSightController = NpcSightController;
//# sourceMappingURL=NpcSightController.js.map