"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionAwakeEntity = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const FlowActionUtils_1 = require("../Flow/FlowActionUtils");
const FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionAwakeEntity extends FlowActionServerAction_1.FlowActionServerAction {
  constructor() {
    super(...arguments);
    this.Task = undefined;
    this.W$i = t => {
      this.Task = undefined;
      var o = this.ActionInfo.Params;
      if (!t) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("加载实体失败");
      }
      var e = new Array();
      for (const r of o.EntityIds) {
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
        if (i) {
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(i.Entity, true, "FlowActionAwakeEntity.OnEntityReady");
        } else {
          e.push(r);
        }
      }
      if (e.length > 0) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("实体未下发，联系服务端检查配置", ["ids", e]);
      }
      this.RecordAction();
      this.FinishExecute(true);
    };
  }
  OnExecute() {
    if (ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
      this.FinishExecute(true);
    } else if (this.ActionInfo.Params) {
      var o = this.ActionInfo.Params;
      if (o.EntityIds?.length) {
        let t = false;
        var e = [];
        for (const i of o.EntityIds) {
          if (FlowActionUtils_1.FlowActionUtils.CheckEntityInAoi(i)) {
            e.push(i);
          } else {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Plot", 26, "剧情中唤醒实体过远，请检查配置", ["pbDataId", i], ["flow", this.Context.FormatId], ["id", this.ActionInfo.ActionId]);
            }
            t = true;
          }
        }
        if (t) {
          this.Frd(e);
          this.RequestServerAction(false);
          this.FinishExecute(true);
        } else {
          this.Frd(o.EntityIds);
        }
      } else {
        this.FinishExecute(true);
      }
    } else {
      this.FinishExecute(true);
    }
  }
  Frd(t) {
    if (t) {
      for (const o of t) {
        ControllerHolder_1.ControllerHolder.CreatureController.RecoverDensityEntity(o, "Plot");
      }
      this.Task = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("FlowActionAwakeEntity.OnExecute", t, this.W$i, FlowActionUtils_1.WAIT_ENTITY_TIME, false);
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
  OnRollback(t, o) {
    for (const i of t.ActionInfo.Params.EntityIds) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
      if (e?.IsInit) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e.Entity, false, "FlowActionAwakeEntity.OnRollback");
      }
    }
  }
}
exports.FlowActionAwakeEntity = FlowActionAwakeEntity;
//# sourceMappingURL=FlowActionAwakeEntity.js.map