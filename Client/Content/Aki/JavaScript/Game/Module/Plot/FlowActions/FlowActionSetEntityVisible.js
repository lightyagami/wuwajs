"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionSetEntityVisible = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const FlowActionUtils_1 = require("../Flow/FlowActionUtils");
const FlowActionServerAction_1 = require("./FlowActionServerAction");
class SetEntityVisibleActionRecord {
  constructor(e, t) {
    this.ActionInfo = e;
    this.EntityStateTagIdMap = new Map();
    this.EntityStateTagIdMap = t;
  }
}
class FlowActionSetEntityVisible extends FlowActionServerAction_1.FlowActionServerAction {
  constructor() {
    super(...arguments);
    this.Task = undefined;
    this.W$i = e => {
      this.Task = undefined;
      var t = this.ActionInfo.Params;
      if (!e) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("加载实体失败");
      }
      var o = new Array();
      var i = new Map();
      for (const r of t.EntityIds) {
        var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
        if (n) {
          this.RLu(r, n.Entity, t.Visible, t.PerformDestroy, i);
        } else {
          o.push(r);
        }
      }
      if (o.length > 0) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("实体未下发，联系服务端检查配置", ["ids", o]);
        if (!t.Visible) {
          this.RequestServerAction(false);
        }
      }
      this.RecordAction(new SetEntityVisibleActionRecord(this.ActionInfo, i));
      this.FinishExecute(true);
    };
  }
  OnExecute() {
    if (ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
      this.FinishExecute(true);
    } else if (this.ActionInfo.Params) {
      var t = this.ActionInfo.Params;
      if (t.EntityIds?.length) {
        let e = false;
        for (const o of t.EntityIds) {
          if (!FlowActionUtils_1.FlowActionUtils.CheckEntityInAoi(o)) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Plot", 26, "剧情中显隐实体过远，请检查配置", ["pbDataId", o], ["flow", this.Context.FormatId], ["id", this.ActionInfo.ActionId]);
            }
            e = true;
          }
        }
        if (e) {
          this.RequestServerAction(false);
          this.FinishExecute(true);
        } else {
          if (t.Visible) {
            for (const i of t.EntityIds) {
              ControllerHolder_1.ControllerHolder.CreatureController.RecoverDensityEntity(i, "Plot");
            }
          }
          this.Task = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("FlowActionSetEntityVisible.OnExecute", t.EntityIds, this.W$i, FlowActionUtils_1.WAIT_ENTITY_TIME, !t.Visible);
        }
      } else {
        this.FinishExecute(true);
      }
    } else {
      this.FinishExecute(true);
    }
  }
  RLu(t, o, i, n, r) {
    if (i) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(o, true, "FlowActionSetEntityVisible.OnEntityReady");
    } else {
      var i = o.GetComponent(0).GetPbEntityInitData();
      var l = o.GetComponent(134);
      let e = false;
      if (n && i) {
        n = (0, IComponent_1.getComponent)(i?.ComponentsData, "SceneItemLifeCycleComponent");
        e = Boolean(l && n?.DestroyStageConfig.PerformDuration);
      }
      if (e) {
        r.set(t, l.StateTagId);
        LevelGeneralCommons_1.LevelGeneralCommons.ChangeToDestroyState(t);
        l.HandleDestroyState();
      } else {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(o, false, "FlowActionSetEntityVisible.OnEntityReady");
      }
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
  OnRollback(e, t) {
    var o = e?.EntityStateTagIdMap;
    if (o) {
      for (var [i, n] of o) {
        LevelGeneralCommons_1.LevelGeneralCommons.RollbackDestroyState(i, n);
      }
    }
    var r = e.ActionInfo.Params;
    for (const s of r.EntityIds) {
      var l = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
      if (l?.IsInit) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(l.Entity, !r.Visible, "FlowActionAwakeEntity.OnRollback");
      }
    }
  }
}
exports.FlowActionSetEntityVisible = FlowActionSetEntityVisible;
//# sourceMappingURL=FlowActionSetEntityVisible.js.map