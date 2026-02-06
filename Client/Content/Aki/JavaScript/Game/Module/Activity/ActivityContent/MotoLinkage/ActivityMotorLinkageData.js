"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMotorLinkageData = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../ActivityCommonDefine");
const ActivityData_1 = require("../../ActivityData");
class ActivityMotorLinkageData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.eDm = new Map();
    this.wXf = false;
  }
  PhraseEx(e) {
    e.kLm?.nAu.forEach(e => {
      var t = new ActivityCommonDefine_1.ActivityTaskData();
      t.Id = e.s5n;
      t.Current = e.lMs;
      t.Target = e.j6n;
      t.Status = this.tDm(e.H6n);
      this.eDm.set(e.s5n, t);
    });
  }
  CanSubViewPlayShowView() {
    return !!this.wXf && !(this.wXf = false);
  }
  SetCanSubViewPlayShowView(e) {
    this.wXf = e;
  }
  GetSortedQuestList(e) {
    var t = [[], [], []];
    for (const n of ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetQuestConfigListByIpId(e)) {
      (this.IsQuestCanReceive(n.TaskId) ? t[0] : this.IsQuestRewardReceived(n.TaskId) ? t[2] : t[1]).push(n);
    }
    var r = [];
    for (const i of t) {
      i.sort((e, t) => e.Sort - t.Sort);
      for (const o of i) {
        r.push(o.TaskId);
      }
    }
    return r;
  }
  GetSortedIpList() {
    return [...ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetIpConfigAll()].sort((e, t) => e.Sort - t.Sort).map(e => e.Id);
  }
  IsStickerReceived(e) {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) > 0;
  }
  GetQuestCurrentProgress(e) {
    e = this.eDm.get(e);
    if (e) {
      return e.Current;
    } else {
      return 0;
    }
  }
  GetQuestTargetProgress(e) {
    e = this.eDm.get(e);
    if (e) {
      return e.Target;
    } else {
      return 0;
    }
  }
  IsQuestCanReceive(e) {
    return this.eDm.get(e)?.Status === 0;
  }
  IsQuestRewardReceived(e) {
    return this.eDm.get(e)?.Status === 2;
  }
  OnQuestUpdateNotify(e) {
    var t = e.vlu?.s5n;
    var t = t ? this.eDm.get(t) : undefined;
    if (t) {
      t.Current = e.vlu.lMs;
      t.Target = e.vlu.j6n;
      t.Status = this.tDm(e.vlu.H6n);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  OnRewardReceiveNotify(e) {
    e.forEach(e => {
      e = this.eDm.get(e);
      if (e) {
        e.Status = 2;
      }
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  HasAnyRewardCanReceive() {
    for (const e of ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetIpConfigAll()) {
      if (this.IpHasAnyRewardCanReceive(e.Id)) {
        return true;
      }
    }
    return false;
  }
  GetAllIpTotalProgress() {
    let t = 0;
    ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetIpConfigAll().forEach(e => {
      t += this.GetIpTotalProgress(e.Id);
    });
    return t;
  }
  GetAllIpCurrentProgress() {
    let t = 0;
    ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetIpConfigAll().forEach(e => {
      t += this.GetIpCurrentProgress(e.Id);
    });
    return t;
  }
  IpHasAnyRewardCanReceive(e) {
    for (const t of ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetQuestConfigListByIpId(e)) {
      if (this.IsQuestCanReceive(t.TaskId)) {
        return true;
      }
    }
    return false;
  }
  GetIpTotalProgress(e) {
    return ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetQuestConfigListByIpId(e).length;
  }
  GetIpCurrentProgress(e) {
    e = ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetQuestConfigListByIpId(e);
    let t = 0;
    e.forEach(e => {
      if (this.IsQuestRewardReceived(e.TaskId)) {
        t++;
      }
    });
    return t;
  }
  IsActivityCompleted() {
    var e = ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetQuestConfigAll();
    let t = 0;
    for (const r of e) {
      if (this.IsQuestRewardReceived(r.TaskId)) {
        t++;
      }
    }
    return t >= e.length;
  }
  tDm(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskRunning:
        return 1;
      case Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskFinish:
        return 0;
      case Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskTaken:
        return 2;
    }
    return 1;
  }
  ReadRedDot() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 0, 0, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  HasSkipRedDot() {
    return !!this.IsUnLock() && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 1, 0, 0) === 0;
  }
  ReadSkipRedDot() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 1, 0, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  GetExDataRedPointShowState() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 0, 0, 0) === 0 || !!this.HasSkipRedDot() || !this.IsActivityCompleted() && !!this.HasAnyRewardCanReceive();
  }
  GetExDataFinishShowState() {
    return this.IsActivityCompleted();
  }
}
exports.ActivityMotorLinkageData = ActivityMotorLinkageData;
//# sourceMappingURL=ActivityMotorLinkageData.js.map