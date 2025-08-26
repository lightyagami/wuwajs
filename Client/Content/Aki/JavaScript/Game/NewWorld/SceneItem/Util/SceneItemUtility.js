"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemUtility = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralNetworks_1 = require("../../../LevelGamePlay/LevelGeneralNetworks");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const TsBaseItem_1 = require("../BaseItem/TsBaseItem");
class SceneItemUtility {
  static GetBaseItemActor(e) {
    e = ControllerHolder_1.ControllerHolder.CharacterController.GetActorByEntity(e);
    if (e && e instanceof TsBaseItem_1.default) {
      return e;
    }
  }
  static HandleTriggerStateActionByServerNotify(n, o, a) {
    if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 7, "执行EntityTriggerAction，等待创建Entity", ["CreatureDataId", o], ["PlayerId", n.W5n], ["SessionId", n.w5n], ["StartIndex", n.K5n], ["EndIndex", n.mvs]);
    }
    const t = () => {
      var e;
      var t;
      var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
      if ((r &&= r.Entity.GetComponent(87)) && (e = r.Actions)) {
        if (!(t = ModelManager_1.ModelManager.CreatureModel.GetEntity(a))) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelEvent", 39, "执行EntityTriggerAction，未找到otherEntity，仍然触发行为");
          }
        }
        if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 7, "执行EntityTriggerAction，Entity创建完毕", ["CreatureDataId", o], ["otherCreatureDataId", a], ["PlayerId", n.W5n], ["SessionId", n.w5n], ["StartIndex", n.K5n], ["EndIndex", n.mvs]);
        }
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(e, r.CreateTriggerContext(t?.Id ?? 0), n.W5n, n.w5n, n.K5n, n.mvs, n.sS_);
      }
    };
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleTriggerStateActionByServerNotify1", o, e => {
      if (e) {
        WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleTriggerStateActionByServerNotify2", a, t);
      }
    });
  }
  static HandleExitTriggerStateActionByServerNotify(n, o, a) {
    if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 7, "执行EntityTriggerAction，等待创建Entity", ["CreatureDataId", o], ["CreatureDataId", o], ["PlayerId", n.W5n], ["SessionId", n.w5n], ["StartIndex", n.K5n], ["EndIndex", n.mvs]);
    }
    const t = () => {
      var e;
      var t;
      var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
      if ((r &&= r.Entity.GetComponent(87)) && (e = r.ExitActions)) {
        if (!(t = ModelManager_1.ModelManager.CreatureModel.GetEntity(a))) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelEvent", 39, "执行EntityTriggerAction，未找到otherEntity，仍然触发行为");
          }
        }
        if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 7, "执行EntityTriggerAction，Entity创建完毕", ["CreatureDataId", o], ["PlayerId", n.W5n], ["SessionId", n.w5n], ["StartIndex", n.K5n], ["EndIndex", n.mvs]);
        }
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(e, r.CreateTriggerContext(t?.Id ?? 0), n.W5n, n.w5n, n.K5n, n.mvs, n.sS_);
      }
    };
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleExitTriggerStateActionByServerNotify1", o, e => {
      if (e) {
        WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleExitTriggerStateActionByServerNotify2", a, t);
      }
    });
  }
  static HandleSceneItemStateActionByServerNotify(r, n, o) {
    if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 7, "执行EntityStateChangeAction，等待创建Entity", ["CreatureDataId", n], ["PlayerId", r.W5n], ["SessionId", r.w5n], ["StartIndex", r.K5n], ["EndIndex", r.mvs]);
    }
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleSceneItemStateActionByServerNotify", n, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) && (t = e.Entity.GetComponent(134)) && t.BehaviorMap && (t = t.BehaviorMap.get(o))) {
        if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 7, "执行EntityStateChangeAction，Entity创建完毕", ["CreatureDataId", n], ["PlayerId", r.W5n], ["SessionId", r.w5n], ["StartIndex", r.K5n], ["EndIndex", r.mvs]);
        }
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, LevelGeneralContextDefine_1.EntityContext.Create(e.Id), r.W5n, r.w5n, r.K5n, r.mvs, r.sS_);
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static HandleExploreInteractActionByServerNotify(r, n) {
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleExploreInteractActionByServerNotify", n, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) && (t = e.Entity.GetComponent(151)) && (t = t.InteractActions)) {
        e = LevelGeneralContextDefine_1.EntityContext.Create(e.Id);
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, e, r.W5n, r.w5n, r.K5n, r.mvs, r.sS_);
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static HandleSceneItemDestructibleActionByServerNotify(r, n) {
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleSceneItemDestructibleActionByServerNotify", n, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) && (t = e.Entity.GetComponent(103)) && (t = t.DeadActions)) {
        e = LevelGeneralContextDefine_1.EntityContext.Create(e.Id);
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, e, r.W5n, r.w5n, r.K5n, r.mvs, r.sS_);
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static HandleTimeTrackControlActionByServerNotify(r, n, o) {
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleTimeTrackControlActionByServerNotify", n, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) && (t = e.Entity.GetComponent(135)) && (t = t.GetTargetActions(o))) {
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, LevelGeneralContextDefine_1.EntityContext.Create(e.Id), r.W5n, r.w5n, r.K5n, r.mvs, r.sS_);
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static HandleLifeCycleStageActionByServerNotify(r, n, o) {
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleLifeCycleStageActionByServerNotify", n, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) && (t = e.Entity.GetComponent(134)) && (t = t.GetLifeCycleStageActions(o))) {
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, LevelGeneralContextDefine_1.EntityContext.Create(e.Id), r.W5n, r.w5n, r.K5n, r.mvs, r.sS_);
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static HandleTrampleActivateActionByServerNotify(r, n, o) {
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleTrampleActivateActionByServerNotify", n, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) && (t = e.Entity.GetComponent(153)) && (t = o ? t.ActivateActions : t.DeactivateActions)) {
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, LevelGeneralContextDefine_1.EntityContext.Create(e.Id), r.W5n, r.w5n, r.K5n, r.mvs, r.sS_);
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static HandleBeamReceiveActionByServerNotify(r, n, o) {
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleBeamReceiveActionByServerNotify", n, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) && (t = e.Entity.GetComponent(213)) && (t = t.GetBeamReceiveActions(o))) {
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, LevelGeneralContextDefine_1.EntityContext.Create(e.Id), r.W5n, r.w5n, r.K5n, r.mvs, r.sS_);
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static HandleSceneItemStateChangeConditionActionByServerNotify(r, n, o, a) {
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleSceneItemStateChangeConditionActionByServerNotify", n, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) && (t = e.Entity.GetComponent(134)) && (t = t.StateConfig?.StateChangeBehaviors) && (t = t[o].ConditionAction)) {
        t = t[a].Action;
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, LevelGeneralContextDefine_1.EntityContext.Create(e.Id), r.W5n, r.w5n, r.K5n, r.mvs, r.sS_);
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static HandleHookLockPointActionByServerNotify(n, e, o) {
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleHookLockPointActionByServerNotify", e, t => {
      if (t) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
        if (t) {
          var r = t.Entity.GetComponent(85);
          if (r) {
            let e = undefined;
            switch (o) {
              case Protocol_1.Aki.Protocol.cw_.Proto_Hooked:
                e = r.GetHookActions();
                break;
              case Protocol_1.Aki.Protocol.cw_.Proto_ExitEndpoint:
                e = r.GetFinishHookActions();
                break;
              case Protocol_1.Aki.Protocol.cw_.Proto_ExitMidway:
                e = r.GetInterruptHookActions();
            }
            if (e) {
              ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(e, LevelGeneralContextDefine_1.EntityContext.Create(t.Id), n.W5n, n.w5n, n.K5n, n.mvs, n.sS_);
            }
          }
        }
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static HandleExploreSkillCustomActionByServerNotify(r, n) {
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleExploreSkillCustomActionByServerNotify", n, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) && (t = e.Entity.GetComponent(151)) && (t = t.InteractActions)) {
        e = LevelGeneralContextDefine_1.EntityContext.Create(e.Id);
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, e, r.W5n, r.w5n, r.K5n, r.mvs, r.sS_);
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static HandleTemplateSpawnerActionByServerNotify(i, e) {
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleTemplateSpawnerActionByServerNotify", e, t => {
      if (t) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
        if (t) {
          var r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t.PbDataId);
          if (r) {
            var r = (0, IComponent_1.getComponent)(r.ComponentsData, "TemplateEntitySpawnerComponent");
            var n = i.cvs;
            if (n && n.fvs === Protocol_1.Aki.Protocol.TOs.Rm1) {
              var o = n.Rm1?.Q3s;
              let e = undefined;
              if (o !== undefined) {
                n = r?.SpawnConfig.GroupDestroyListenConfigs;
                if (n === undefined) {
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("LevelEvent", 31, "[HandleTemplateSpawnerActionByServerNotify] GroupDestroyListenConfigs is undefined", ["PbDataId", t.PbDataId]);
                  }
                  return;
                }
                for (const a of n) {
                  if (a.GroupType === o) {
                    e = a.OnTriggerActions;
                    break;
                  }
                }
                if (e === undefined) {
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("LevelEvent", 31, "[HandleTemplateSpawnerActionByServerNotify] Cannot find action by actionType", ["PbDataId", t.PbDataId], ["actionType", o]);
                  }
                  return;
                }
              } else if ((e = r?.SpawnConfig.OnNonGroupEntityDestroy) === undefined) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("LevelEvent", 31, "[HandleTemplateSpawnerActionByServerNotify] OnNonGroupEntityDestroy is undefined", ["PbDataId", t.PbDataId]);
                }
                return;
              }
              n = LevelGeneralContextDefine_1.EntityContext.Create(t.Id);
              ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(e, n, i.W5n, i.w5n, i.K5n, i.mvs, i.sS_);
            }
          }
        }
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static HandleTargetGearHitPartByServerNotify(r, n, o) {
    WaitEntityTask_1.WaitEntityTask.Create("SceneItemUtility.HandleTargetGearHitPartByServerNotify", n, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) && (t = e.Entity.GetComponent(141)) && (t = t.GetHitPartActions(o))) {
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, LevelGeneralContextDefine_1.EntityContext.Create(e.Id), r.W5n, r.w5n, r.K5n, r.mvs, r.sS_);
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
}
exports.SceneItemUtility = SceneItemUtility;
//# sourceMappingURL=SceneItemUtility.js.map