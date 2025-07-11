"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvignonModel = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AvignonProtocolData_1 = require("./Data/AvignonProtocolData");
const AVIGNON_RED_DOT_CACHE_KEY = 100;
class AvignonModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.BSc = undefined;
  }
  OnInit() {
    this.BSc = new AvignonProtocolData_1.AvignonProtocolData();
    return true;
  }
  AvignonInfoUpdate(e) {
    for (const n of this.wja()) {
      var t = n;
      if (e.T$s) {
        t.UpdateTask(e.T$s);
      }
      if (e.hfc) {
        t.UnlockStage(e.hfc);
      }
    }
    var o = this.GetAvignonActivityId();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o);
  }
  UpdateTaskRewardStatus(e) {
    for (const o of this.wja()) {
      o.TaskRewardGot(e);
      var t = this.GetAvignonActivityId();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t);
    }
  }
  ReadRedDot() {
    var e = this.GetAvignonActivityId();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(e, AVIGNON_RED_DOT_CACHE_KEY, 0, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e);
  }
  SaveNewStageFlag(e) {
    var t;
    if (this.GetAvignonStageInfo(e)?.HasNewStageFlag()) {
      t = this.GetAvignonActivityId();
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(t, e, 0, 0, 1);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t);
    }
  }
  CheckRedDot() {
    var e = this.GetAvignonActivityId();
    if (ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(e, 0, AVIGNON_RED_DOT_CACHE_KEY, 0, 0) === 0) {
      return true;
    }
    for (const t of this.GetAvignonAllStagesId()) {
      if (this.GetAvignonStageInfo(t)?.HasNewStageFlag()) {
        return true;
      }
    }
    return false;
  }
  GetAvigonoProtocolData() {
    return this.BSc;
  }
  GetAvignonStageInfo(e) {
    return this.BSc?.GetStageInfo(e);
  }
  GetAvignonAllStagesId() {
    return this.BSc.GetAllStagesId();
  }
  GetAvignonActivityName() {
    return this.BSc.GetTitle();
  }
  GetAvignonActivityId() {
    return this.BSc.Id;
  }
  wja() {
    return ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_Avignon);
  }
}
exports.AvignonModel = AvignonModel;
//# sourceMappingURL=AvignonModel.js.map