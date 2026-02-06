"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureActivityData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityData_1 = require("../../Activity/ActivityData");
const InfrastructureLimitTaskData_1 = require("./InfrastructureLimitTaskData");
class InfrastructureActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.K4m = new Map();
  }
  OnInit(t) {
    t = t.G3m;
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Infrastructure", 86, "InfrastructureActivityData初始化 无效activityInfo");
      }
    } else {
      this.uig(t.L$s);
    }
  }
  PhraseEx(t) {
    t = t.G3m;
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Infrastructure", 86, "InfrastructureActivityDataPhrase 无效activityInfo");
      }
    } else {
      this.uig(t.L$s);
    }
  }
  GetExDataRedPointShowState() {
    return this.CheckRedDot();
  }
  CheckRedDot() {
    return !!this.IsUnLock() && (this.GetLimitedTaskReadDot() || this.GetShopHasNewRedDot() || ModelManager_1.ModelManager.InfrastructureModel.GetArchiveRedDot());
  }
  GetLimitedTaskReadDot() {
    for (const t of this.K4m.values()) {
      if (t.Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) {
        return true;
      }
    }
    return false;
  }
  GetShopHasNewRedDot() {
    var t = ModelManager_1.ModelManager.InfrastructureModel;
    var e = t.GetInfrRecordObservatoryLevel();
    return t.FireLevel > e;
  }
  GetQuestRedDot() {
    var t = ModelManager_1.ModelManager.InfrastructureModel.GetCurrentQuestId();
    return t !== 0 && (ModelManager_1.ModelManager.QuestNewModel.CheckQuestRedDotDataState(t) ?? false);
  }
  GetActivityCountDownData() {
    let t = this.EndOpenTime > 0 ? this.EndOpenTime - TimeUtil_1.TimeUtil.GetServerTime() : 0;
    var e = (t = t <= 1 ? 1 : t) >= CommonDefine_1.SECOND_PER_DAY ? 3 : t >= CommonDefine_1.SECOND_PER_HOUR ? 2 : 1;
    var r = t >= CommonDefine_1.SECOND_PER_DAY ? 2 : t >= CommonDefine_1.SECOND_PER_HOUR ? 1 : 0;
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, e, r);
  }
  uig(t) {
    this.K4m.clear();
    for (const r of t?.E$s ?? []) {
      var e = new InfrastructureLimitTaskData_1.InfrastructureLimitTaskData(r.s5n);
      e.UpdateData(r);
      this.K4m.set(r.s5n, e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureActivityTaskDataUpdate);
  }
  UpdateActivityTaskData(t) {
    var e = this.K4m.get(t.s5n);
    if (e !== undefined) {
      e.UpdateData(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureActivityTaskDataUpdate);
    }
  }
  GetActivityTaskDataList() {
    var e = Array.from(this.K4m.values());
    e.sort((t, e) => t.Status !== e.Status ? this.Y4m(t.Status) - this.Y4m(e.Status) : t.ConfigId - e.ConfigId);
    for (let t = 0; t < e.length; t++) {
      e[t].Index = t + 1;
    }
    return e;
  }
  Y4m(t) {
    switch (t) {
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish:
        return 1;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning:
        return 2;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken:
        return 3;
      default:
        return 0;
    }
  }
  GetActivityTaskDataById(t) {
    return this.K4m.get(t);
  }
  GetActivityTaskDataListByStatus(e) {
    return Array.from(this.K4m.values()).filter(t => t.Status === e);
  }
  GetExDataFinishShowState() {
    for (const e of this.K4m.values()) {
      if (e.Status !== Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken) {
        return false;
      }
    }
    var t = ModelManager_1.ModelManager.InfrastructureModel;
    for (const r of t.GetLibraryTaskData()) {
      if (r.Status !== Protocol_1.Aki.Protocol.f4m.Proto_InfrTaskTaken) {
        return false;
      }
    }
    for (const i of t.GetPhoneTaskData()) {
      if (i.Status !== Protocol_1.Aki.Protocol.f4m.Proto_InfrTaskTaken) {
        return false;
      }
    }
    return t.GetAllShopCurrencyNum() === t.MoneyHistorySpent;
  }
}
exports.InfrastructureActivityData = InfrastructureActivityData;
//# sourceMappingURL=InfrastructureActivityData.js.map