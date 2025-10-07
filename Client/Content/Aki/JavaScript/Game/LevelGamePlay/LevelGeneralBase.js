"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionExParams = exports.LevelConditionBase = exports.CodeCondition = exports.LevelConditionGroup = exports.LevelEventBase = undefined;
const Log_1 = require("../../Core/Common/Log");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const WaitEntityTask_1 = require("../World/Define/WaitEntityTask");
const LevelGeneralBaseFrameScheduler_1 = require("./LevelGeneralBaseFrameScheduler");
const LevelGeneralContextDefine_1 = require("./LevelGeneralContextDefine");
const EACH_WAIT_ENTITY_OVER_TIME = 30000;
class LevelEventBase {
  constructor(e) {
    this.Id = e;
    this.GroupId = 0;
    this.Type = "";
    this.IsWaitEnd = false;
    this.IsAsync = false;
    this.SessionId = -1;
    this.ActionIndex = 0;
    this.ActionGuid = "";
    this.yUe = false;
    this.BaseContext = undefined;
  }
  ExecuteAction(e, t, i) {
    this.BaseContext = t;
    if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 18, "LevelEvent:开始执行行为", ["行为类型", this.Type]);
    }
    if (ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
      this.ExecuteInGm(e, t, i);
    } else if (!LevelGeneralBaseFrameScheduler_1.LevelGeneralBaseFrameScheduler.PushActionToFrameScheduler(this, e, t, i)) {
      if (t instanceof LevelGeneralContextDefine_1.CombinationContext) {
        var n = t.GetContextByType(1);
        if (!n) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 79, "CombinationContext不合法, 内部必须包含EntityContext", ["InParams", e], ["Context", t], ["ActionId", i]);
          }
          return;
        }
        this.ExecuteNew(e, n, i);
      }
      this.ExecuteNew(e, t, i);
    }
  }
  ExecuteNew(e, t, i) {}
  ExecuteInGm(e, t, i) {
    this.ExecuteNew(e, t, i);
  }
  CreateWaitEntityTask(t) {
    if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 7, "等待实体创建", ["行为类型", this.Type], ["EntityIds", t.toString()]);
    }
    let i = 1;
    if (Array.isArray(t)) {
      i = t.length;
    }
    WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelEventBase.CreateWaitEntityTask", t, e => {
      if (e) {
        this.ExecuteWhenEntitiesReady();
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 7, "Entity加载超时或已被移除", ["EntityCount", i], ["EntityIds", t?.toString()]);
        }
        this.FinishExecute(false);
      }
    }, EACH_WAIT_ENTITY_OVER_TIME * i);
  }
  CreateWaitEntityTaskBigInt(e) {
    if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 7, "等待实体创建", ["行为类型", this.Type], ["EntityIds", e.toString()]);
    }
    let t = 1;
    if (Array.isArray(e)) {
      t = e.length;
    }
    WaitEntityTask_1.WaitEntityTask.Create("LevelEventBase.CreateWaitEntityTaskBigInt", e, e => {
      if (e) {
        this.ExecuteWhenEntitiesReady();
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 7, "Entity加载超时或已被移除", ["EntityCount", t]);
        }
        this.FinishExecute(false);
      }
    }, t * EACH_WAIT_ENTITY_OVER_TIME);
  }
  ExecuteWhenEntitiesReady() {}
  OpenTick() {
    this.IsWaitEnd = true;
    this.yUe = false;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddToTickList, true, this);
  }
  Tick(e) {
    this.OnTick(e);
    return this.yUe;
  }
  OnTick(e) {}
  FinishExecute(e, t = false, i = true) {
    this.yUe = e;
    if (!this.yUe) {
      this.Failure(t, i);
    }
  }
  Finish() {
    this.OnFinish();
    this.UpdateGuarantee();
    this.Release();
    if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 18, "LevelEvent:行为执行完毕_NodeFinished", ["行为类型", this.Type]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HandleNextAction, this.GroupId);
  }
  OnFinish() {}
  UpdateGuarantee() {
    this.OnUpdateGuarantee();
  }
  OnUpdateGuarantee() {}
  Failure(e = false, t = true) {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GmHandleActionFailed, this.BaseContext, this.ActionIndex);
    }
    this.OnFailure();
    this.Release();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 18, "LevelEvent:行为执行失败", ["行为类型", this.Type]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HandleActionFailure, this.GroupId, this.Type, e, t);
  }
  OnFailure() {}
  Release() {
    if (this.IsWaitEnd) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddToTickList, false, this);
    }
  }
  Reset() {
    this.OnReset();
    this.GroupId = 0;
    this.IsWaitEnd = false;
    this.yUe = true;
    this.IsAsync = false;
    this.SessionId = -1;
    this.ActionIndex = -1;
  }
  OnReset() {}
}
exports.LevelEventBase = LevelEventBase;
class LevelConditionGroup {
  constructor() {
    this.Type = 0;
    this.Conditions = undefined;
  }
}
exports.LevelConditionGroup = LevelConditionGroup;
class CodeCondition {
  constructor() {
    this.Type = undefined;
    this.CodeType = undefined;
  }
}
exports.CodeCondition = CodeCondition;
class LevelConditionBase {
  Check(e, t) {
    return false;
  }
  CheckNew(e, t) {
    return false;
  }
  CheckCompareValue(e, t = 0, i = 0) {
    switch (e) {
      case "Eq":
        return t === i;
      case "Ne":
        return t !== i;
      case "Ge":
        return i <= t;
      case "Gt":
        return i < t;
      case "Le":
        return t <= i;
      case "Lt":
        return t < i;
      default:
        return i <= t;
    }
  }
}
exports.LevelConditionBase = LevelConditionBase;
class LevelConditionExParams {}
exports.LevelConditionExParams = LevelConditionExParams;
//# sourceMappingURL=LevelGeneralBase.js.map