"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcWaitEntityTaskController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
const WAIT_IGNORE_ACTOR_TIMEOUT = 30000;
class NpcWaitEntityTaskController {
  constructor(t) {
    this.vJa = undefined;
    this.hLl = new Array();
    this.STe = new Map();
    this.gU = false;
    this.vJa = t;
  }
  AU() {
    this.STe.set(0, NpcIgnoreCollisionTask);
  }
  Dispose() {
    for (const t of this.hLl) {
      t.Stop();
    }
    this.hLl.length = 0;
  }
  AddTask(t, e) {
    if (t?.length) {
      if (!this.gU) {
        this.gU = true;
        this.AU();
      }
      var i = this.STe.get(e);
      for (const o of t) {
        var s = new i(this.vJa, o);
        this.hLl.push(s);
      }
    }
  }
  RunTask() {
    for (const t of this.hLl) {
      t.Start();
    }
  }
}
exports.NpcWaitEntityTaskController = NpcWaitEntityTaskController;
class NpcWaitEntityTask {
  constructor(t, e) {
    this.NpcEntity = undefined;
    this.PbDataIdToWait = 0;
    this.EntityType = undefined;
    this.WaitEntityTaskHandle = undefined;
    this.Phase = 0;
    this.OnEntityAdd = t => {
      this.WaitEntityTaskHandle = undefined;
      if (t && (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.PbDataIdToWait))?.Valid) {
        this.TryExecute(t.Entity);
      } else {
        this.Phase = 3;
      }
    };
    this.OnSceneItemLoadComplete = () => {
      var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.PbDataIdToWait).Entity;
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.OnSceneItemLoadComplete);
      this.Execute(t);
    };
    this.NpcEntity = t;
    this.PbDataIdToWait = e;
  }
  Start() {
    if (this.Phase === 0 && !this.WaitEntityTaskHandle) {
      this.Phase = 1;
      this.WaitEntityTaskHandle = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("NpcWaitEntityTask.Start", this.PbDataIdToWait, this.OnEntityAdd, WAIT_IGNORE_ACTOR_TIMEOUT, false, true);
    }
  }
  Stop() {
    var t;
    if (this.Phase !== 2) {
      if (this.Phase === 1) {
        this.Cancel();
      }
    } else if ((t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.PbDataIdToWait))?.Valid) {
      this.TryReset(t.Entity);
    }
  }
  Cancel() {
    var t;
    if (this.WaitEntityTaskHandle) {
      this.WaitEntityTaskHandle.Cancel();
    } else if ((t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.PbDataIdToWait)?.Entity)?.Valid && t.GetComponent(0).GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.OnSceneItemLoadComplete)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.OnSceneItemLoadComplete);
    }
  }
  Finish() {
    this.Phase = 2;
  }
  TryExecute(t) {
    var e = t.GetComponent(0);
    if (e) {
      switch (e.GetEntityType()) {
        case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
          this.TryExecuteWithSceneItemActor(t);
          break;
        case Protocol_1.Aki.Protocol.kks.HI_:
          this.Execute(t);
          break;
        default:
          this.Phase = 3;
      }
    } else {
      this.Phase = 3;
    }
  }
  TryExecuteWithSceneItemActor(t) {
    if (t.GetComponent(202)?.GetIsSceneInteractionLoadCompleted()) {
      this.Execute(t);
    } else {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.OnSceneItemLoadComplete);
    }
  }
  TryReset(t) {
    if (t.GetComponent(0)) {
      this.Reset(t);
    }
  }
  Reset(t) {
    t.GetComponent(202)?.GetIsSceneInteractionLoadCompleted();
  }
  Execute(t) {
    this.Finish();
  }
}
class NpcIgnoreCollisionTask extends NpcWaitEntityTask {
  Reset(t) {
    if (t.GetComponent(202)?.GetIsSceneInteractionLoadCompleted()) {
      this.IJa(t, false);
    }
  }
  Execute(t) {
    this.IJa(t, true);
    this.Finish();
  }
  IJa(t, e) {
    var i;
    var t = t.GetComponent(202);
    var s = this.NpcEntity?.GetComponent(2);
    if (t && s && (i = t.GetInteractCollisionActor())?.IsValid()) {
      s.Actor.IgnoreActorWhenMoving(i, e, true);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 50, "忽视场景物体碰撞", ["NpcPbDataId", s.CreatureData.GetPbDataId()], ["SceneItemPbDataId", t.CreatureData.GetPbDataId()], ["Ignore", e]);
      }
    } else {
      this.Phase = 3;
    }
  }
}
//# sourceMappingURL=NpcWaitEntityTaskController.js.map