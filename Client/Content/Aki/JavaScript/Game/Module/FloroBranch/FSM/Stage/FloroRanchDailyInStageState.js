"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDailyInStageState = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchEntityActionSystem_1 = require("../../Entity/FloroRanchEntityActionSystem");
const FloroRanchDailyTaskBase_1 = require("../Day/FloroRanchDailyTaskBase");
const FloroRanchDayActionSettleTask_1 = require("../Day/FloroRanchDayActionSettleTask");
const FloroRanchDaySalarySettleTask_1 = require("../Day/FloroRanchDaySalarySettleTask");
const FloroRanchDayStartTask_1 = require("../Day/FloroRanchDayStartTask");
const FloroRanchGachaTask_1 = require("../Day/FloroRanchGachaTask");
const FloroRanchRandomEventTask_1 = require("../Day/FloroRanchRandomEventTask");
const FloroRanchShopTask_1 = require("../Day/FloroRanchShopTask");
const FloroRanchStageEndTask_1 = require("../Day/FloroRanchStageEndTask");
const FloroRanchStageStartTask_1 = require("../Day/FloroRanchStageStartTask");
const FloroRanchStateBase_1 = require("../FloroRanchStateBase");
class FloroRanchDailyInStageState extends FloroRanchStateBase_1.FloroRanchStateBase {
  constructor() {
    super(...arguments);
    this.P2i = [];
    this.dlh = undefined;
    this.nCu = (a, e) => {
      if (this.dlh) {
        if (this.dlh.TaskId !== a) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("FloroRanchGamePlay", 78, "OnTaskFinish 任务id不匹配");
          }
        } else {
          this.P2i.shift();
          this.dlh = undefined;
          if (e) {
            e();
          }
          this.g_u();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "OnTaskFinish 当前任务不存在");
      }
    };
    this.f_u = a => {
      this.coc(a);
      this.g_u();
    };
    this.lqu = a => {
      this._qu(a);
      this.g_u();
    };
  }
  OnEnter() {
    var a = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetDailyTaskList();
    this.coc(a);
    this.g_u();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchNextDayTaskRefresh, this.f_u);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchInsertTask, this.lqu);
  }
  coc(a) {
    for (const t of a) {
      var e = this.mZ(t);
      this.P2i.push(e);
    }
  }
  _qu(a) {
    var e = [];
    for (const o of a) {
      var t = this.mZ(o);
      e.push(t);
    }
    this.P2i.unshift(...e);
    if (e.length > 0) {
      if (this.dlh && !this.dlh.IsPause) {
        this.dlh.Pause();
      }
      this.dlh = undefined;
    }
  }
  g_u() {
    var a;
    if (this.IsActive && !this.dlh) {
      a = this.P2i.length;
      this.dlh = a > 0 ? this.P2i[0] : undefined;
      if (this.dlh) {
        if (this.dlh.IsPause) {
          this.dlh.Resume();
        } else if (!this.dlh.IsExecuting) {
          this.dlh.Execute();
        }
      } else {
        this.qyu();
      }
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchNextDayTaskRefresh, this.f_u);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchInsertTask, this.lqu);
  }
  OnExit() {
    if (this.dlh) {
      this.dlh.ForceFinish();
      this.dlh = undefined;
    }
  }
  qyu() {
    FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.DayEnd();
  }
  mZ(a) {
    let e = undefined;
    switch (a.clu) {
      case Protocol_1.Aki.Protocol.Mlu.dlu:
        e = new FloroRanchDayStartTask_1.FloroRanchDayStartTask(a.dlu);
        break;
      case Protocol_1.Aki.Protocol.Mlu.Proto_DaySettleActions:
        e = new FloroRanchDayActionSettleTask_1.FloroRanchDayActionSettleTask(a.DSu);
        break;
      case Protocol_1.Aki.Protocol.Mlu.mlu:
        e = new FloroRanchRandomEventTask_1.FloroRanchRandomEventTask(a.mlu);
        break;
      case Protocol_1.Aki.Protocol.Mlu.glu:
        e = new FloroRanchGachaTask_1.FloroRanchGachaTask(a.glu);
        break;
      case Protocol_1.Aki.Protocol.Mlu.flu:
        e = new FloroRanchShopTask_1.FloroRanchShopTask(a.flu);
        break;
      case Protocol_1.Aki.Protocol.Mlu.Clu:
        e = new FloroRanchStageStartTask_1.FloroRanchStageStartTask(a.Clu);
        break;
      case Protocol_1.Aki.Protocol.Mlu.plu:
        e = new FloroRanchStageEndTask_1.FloroRanchStageEndTask(a.plu);
        break;
      case Protocol_1.Aki.Protocol.Mlu.ONu:
        e = new FloroRanchDaySalarySettleTask_1.FloroRanchDaySalarySettleTask(a.ONu);
        break;
      default:
        e = new FloroRanchDailyTaskBase_1.FloroRanchDailyTaskBase();
    }
    e.BindCompleteCallBack(this.nCu);
    return e;
  }
  IsExecutingTask() {
    return this.dlh !== undefined;
  }
}
exports.FloroRanchDailyInStageState = FloroRanchDailyInStageState;
//# sourceMappingURL=FloroRanchDailyInStageState.js.map