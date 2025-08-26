"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionDestroyEntity = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const FlowActionUtils_1 = require("../Flow/FlowActionUtils");
const FlowActionServerAction_1 = require("./FlowActionServerAction");
class DestroyEntityActionRecord {
  constructor(e, o) {
    this.ActionInfo = e;
    this.EntityStateTagIdMap = new Map();
    this.EntityStateTagIdMap = o;
  }
}
class FlowActionDestroyEntity extends FlowActionServerAction_1.FlowActionServerAction {
  constructor() {
    super(...arguments);
    this.Task = undefined;
    this.W$i = e => {
      this.Task = undefined;
      var o = this.ActionInfo.Params;
      if (!e) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("加载实体失败");
      }
      let t = false;
      var i = new Map();
      for (const s of o.EntityIds) {
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
        if (r) {
          var n = r.Entity.GetComponent(0).GetPbEntityInitData();
          var l = r.Entity.GetComponent(134);
          let e = false;
          if (n) {
            n = (0, IComponent_1.getComponent)(n?.ComponentsData, "SceneItemLifeCycleComponent");
            e = Boolean(l && n?.DestroyStageConfig.PerformDuration);
          }
          if (e) {
            i.set(s, l.StateTagId);
            LevelGeneralCommons_1.LevelGeneralCommons.ChangeToDestroyState(s);
            l.HandleDestroyState();
          } else {
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(r.Entity, false, "FlowActionDestroyEntity.OnEntityReady");
          }
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Plot", 26, "实体未下发，联系服务端检查配置", ["ids", s]);
          }
          t = true;
        }
      }
      if (t) {
        this.RequestServerAction(false);
      }
      this.RecordAction(new DestroyEntityActionRecord(this.ActionInfo, i));
      this.FinishExecute(true);
    };
  }
  OnExecute() {
    if (ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
      this.FinishExecute(true);
    } else if (this.ActionInfo.Params) {
      var o = this.ActionInfo.Params;
      if (o.EntityIds?.length) {
        let e = false;
        for (const t of o.EntityIds) {
          if (!FlowActionUtils_1.FlowActionUtils.CheckEntityInAoi(t)) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Plot", 26, "剧情中销毁实体过远，请检查配置", ["pbDataId", t], ["flow", this.Context.FormatId], ["id", this.ActionInfo.ActionId]);
            }
            e = true;
          }
        }
        if (e) {
          this.RequestServerAction(false);
          this.FinishExecute(true);
        } else {
          this.Task = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("FlowActionDestroyEntity.OnExecute", o.EntityIds, this.W$i, FlowActionUtils_1.WAIT_ENTITY_TIME);
        }
      } else {
        this.FinishExecute(true);
      }
    } else {
      this.FinishExecute(true);
    }
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
  OnInterruptExecute() {
    this.Task?.Cancel();
    this.Task = undefined;
    this.FinishExecute(true);
  }
  OnRollback(e, o) {
    var t = e?.EntityStateTagIdMap;
    if (t) {
      for (var [i, r] of t) {
        LevelGeneralCommons_1.LevelGeneralCommons.RollbackDestroyState(i, r);
      }
    }
    for (const l of e.ActionInfo.Params.EntityIds) {
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(l);
      if (n?.IsInit) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(n.Entity, true, "FlowActionAwakeEntity.OnRollback");
      }
    }
  }
}
exports.FlowActionDestroyEntity = FlowActionDestroyEntity;
//# sourceMappingURL=FlowActionDestroyEntity.js.map