"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowActionBase = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const EACH_WAIT_ENTITY_OVER_TIME = 30000;
class LevelFlowActionBase {
  constructor() {
    this.ActionId = 0;
    this.c_u = false;
    this.d_u = undefined;
    this.ActionId = LevelFlowActionBase.f_r++;
  }
  BindCompleteCallBack(t) {
    this.d_u = t;
  }
  Execute() {
    this.c_u = true;
    this.LogExecuteInfo();
    this.OnAddEventListener();
    this.OnExecute();
  }
  FinishExecute(t) {
    if (this.c_u) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelFlow", 58, "行为完成", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["IsSuccess", t]);
      }
      this.c_u = false;
      this.OnRemoveEventListener();
      this.OnComplete(t);
      this.d_u(this, t);
      this.d_u = undefined;
    }
  }
  Tick(t) {
    if (this.c_u) {
      this.OnTick(t);
    }
  }
  Reset() {
    this.c_u = false;
    this.OnReset();
  }
  CreateWaitEntityTask(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "等待实体创建", ["行为Id", this.ActionId], ["EntityIds", e.toString()]);
    }
    let i = 1;
    if (Array.isArray(e)) {
      i = e.length;
    }
    WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelEventBase.CreateWaitEntityTask", e, t => {
      if (t) {
        this.ExecuteWhenEntitiesReady();
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 7, "Entity加载超时或已被移除", ["EntityCount", i], ["EntityIds", e?.toString()]);
        }
        this.FinishExecute(false);
      }
    }, EACH_WAIT_ENTITY_OVER_TIME * i);
  }
  CreateWaitEntityTaskBigInt(t) {
    if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 7, "等待实体创建", ["行为Id", this.ActionId], ["EntityIds", t.toString()]);
    }
    let e = 1;
    if (Array.isArray(t)) {
      e = t.length;
    }
    WaitEntityTask_1.WaitEntityTask.Create("LevelEventBase.CreateWaitEntityTaskBigInt", t, t => {
      if (t) {
        this.ExecuteWhenEntitiesReady();
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 7, "Entity加载超时或已被移除", ["EntityCount", e]);
        }
        this.FinishExecute(false);
      }
    }, e * EACH_WAIT_ENTITY_OVER_TIME);
  }
  OnExecute() {}
  OnAddEventListener() {}
  OnTick(t) {}
  ExecuteWhenEntitiesReady() {}
  OnRemoveEventListener() {}
  OnComplete(t) {}
  OnReset() {}
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name]);
    }
  }
}
(exports.LevelFlowActionBase = LevelFlowActionBase).f_r = 0;
//# sourceMappingURL=LevelFlowActionBase.js.map