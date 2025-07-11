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
    this.hgu = a => {
      if (this.dlh) {
        if (this.dlh.TaskId !== a) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("FloroRanchGamePlay", 78, "OnTaskFinish 任务id不匹配");
          }
        } else {
          this.dlh = undefined;
          this.Ulu();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "OnTaskFinish 当前任务不存在");
      }
    };
    this.xlu = a => {
      this.coc(a);
      this.Ulu();
    };
    this.GOu = a => {
      this.FOu(a);
      this.Ulu();
    };
  }
  OnEnter() {
    var a = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetDailyTaskList();
    this.coc(a);
    this.Ulu();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchNextDayTaskRefresh, this.xlu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchInsertTask, this.GOu);
  }
  coc(a) {
    for (const t of a) {
      var e = this.mZ(t);
      this.P2i.push(e);
    }
  }
  FOu(a) {
    var e = [];
    for (const o of a) {
      var t = this.mZ(o);
      e.push(t);
    }
    this.P2i.unshift(...e);
  }
  Ulu() {
    if (!!this.IsActive && !this.dlh) {
      this.dlh = this.P2i.shift();
      if (this.dlh) {
        this.dlh.Execute();
      } else {
        this.Fvu();
      }
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchNextDayTaskRefresh, this.xlu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchInsertTask, this.GOu);
  }
  OnExit() {
    if (this.dlh) {
      this.dlh.ForceFinish();
    }
  }
  Fvu() {
    FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.DayEnd();
  }
  mZ(a) {
    let e = undefined;
    switch (a.Ghu) {
      case Protocol_1.Aki.Protocol.Xhu.Fhu:
        e = new FloroRanchDayStartTask_1.FloroRanchDayStartTask(a.Fhu);
        break;
      case Protocol_1.Aki.Protocol.Xhu.Proto_DaySettleActions:
        e = new FloroRanchDayActionSettleTask_1.FloroRanchDayActionSettleTask(a.qyu);
        break;
      case Protocol_1.Aki.Protocol.Xhu.Nhu:
        e = new FloroRanchRandomEventTask_1.FloroRanchRandomEventTask(a.Nhu);
        break;
      case Protocol_1.Aki.Protocol.Xhu.jhu:
        e = new FloroRanchGachaTask_1.FloroRanchGachaTask(a.jhu);
        break;
      case Protocol_1.Aki.Protocol.Xhu.Vhu:
        e = new FloroRanchShopTask_1.FloroRanchShopTask(a.Vhu);
        break;
      case Protocol_1.Aki.Protocol.Xhu.Hhu:
        e = new FloroRanchStageStartTask_1.FloroRanchStageStartTask(a.Hhu);
        break;
      case Protocol_1.Aki.Protocol.Xhu.$hu:
        e = new FloroRanchStageEndTask_1.FloroRanchStageEndTask(a.$hu);
        break;
      case Protocol_1.Aki.Protocol.Xhu.rGu:
        e = new FloroRanchDaySalarySettleTask_1.FloroRanchDaySalarySettleTask(a.rGu);
        break;
      default:
        e = new FloroRanchDailyTaskBase_1.FloroRanchDailyTaskBase();
    }
    e.BindCompleteCallBack(this.hgu);
    return e;
  }
  IsExecutingTask() {
    return this.dlh !== undefined;
  }
}
exports.FloroRanchDailyInStageState = FloroRanchDailyInStageState;
//# sourceMappingURL=FloroRanchDailyInStageState.js.map