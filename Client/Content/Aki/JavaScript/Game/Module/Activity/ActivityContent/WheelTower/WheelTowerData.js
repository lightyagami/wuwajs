"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerData = exports.EnergyInfo = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../ActivityCommonDefine");
const ActivityData_1 = require("../../ActivityData");
class EnergyInfo {
  constructor() {
    this.RoleEnergyMap = new Map();
    this.WeaponEnergyMap = new Map();
    this.PhantomEnergyMap = new Map();
  }
  GetRoleEnergy(e) {
    e = ModelManager_1.ModelManager.WheelTowerModel.TryGetRealRoleId(e);
    return this.RoleEnergyMap.get(e) ?? CommonDefine_1.INVALID_VALUE;
  }
  GetWeaponCanUse(e, t) {
    e = this.WeaponEnergyMap.get(e);
    return !e || t === e && this.GetRoleEnergy(t) > 0;
  }
  GetPhantomCanUse(e, t) {
    e = this.PhantomEnergyMap.get(e);
    return !e || t === e && this.GetRoleEnergy(t) > 0;
  }
}
exports.EnergyInfo = EnergyInfo;
class WheelTowerData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.CycleId = -1;
    this.CycleBeginTime = -1;
    this.CycleEndTime = -1;
    this.v0f = new Map();
    this.y0f = new Map();
    this.QY = new Map();
  }
  PhraseEx(e) {
    ModelManager_1.ModelManager.WheelTowerModel.SetActivityId(this.Id);
    e = e.Gif;
    this.J3g(e);
    this.S0f(e.Fif);
    this.M0f(e.Fif);
    this.E0f(e);
  }
  J3g(e) {
    if (this.CycleId !== -1 && this.CycleId !== e.bN_) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WheelTowerCycleChange);
    }
    this.CycleId = e.bN_;
    this.CycleBeginTime = MathUtils_1.MathUtils.LongToNumber(e.RN_);
    this.CycleEndTime = MathUtils_1.MathUtils.LongToNumber(e.qDg);
  }
  S0f(e) {
    this.v0f.clear();
    e?.forEach(e => {
      var t = ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e.gG_).Diff;
      this.v0f.set(t !== 0, e);
      this.Hng();
    });
  }
  Hng() {
    this.v0f.forEach(e => {
      e.jif.forEach(e => {
        e.Xif.forEach(e => {
          var t = this.CheckMainCharacterCorrect(e.Q6n);
          e.Q6n = t;
        });
      });
    });
  }
  IsInCycle() {
    return this.CycleId > 0;
  }
  IsInCycleTime() {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    return e >= this.CycleBeginTime && e <= this.CycleEndTime;
  }
  IsTowerUnlocked() {
    if (this.IsUnLock()) {
      for (var [, e] of this.v0f) {
        if (e.K6n) {
          return true;
        }
      }
    }
    return false;
  }
  GetLevelRecord(e) {
    return this.v0f.get(e);
  }
  IsLevelUnlocked(e) {
    e = this.v0f.get(e);
    return e !== undefined && e.K6n;
  }
  GetHistoryBestScore(e) {
    return this.GetLevelRecord(e).Adf;
  }
  GetRoundScore(e, t) {
    return this.GetLevelRecord(e).jif[t]?.Ddf ?? 0;
  }
  GetRoundTotalScore(t, r) {
    let i = 0;
    for (let e = 0; e <= r; e++) {
      i += this.GetRoundScore(t, e);
    }
    return i;
  }
  GetTotalScore(e) {
    var t = this.GetLevelRecord(e).jif.length - 1;
    return this.GetRoundTotalScore(e, t);
  }
  M0f(e) {
    this.y0f.clear();
    e?.forEach(e => {
      var t = ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e.gG_).Diff !== 0;
      var r = new Map();
      for (const s of Object.keys(e.$if)) {
        var i = e.$if[s];
        var n = this.CheckMainCharacterCorrect(Number(s));
        r.set(n, i);
      }
      this.y0f.set(t, this.I0f(r, e.jif));
    });
  }
  GetRoundEnergyInfo(e, t) {
    var r = this.GetLevelRecord(e);
    const i = new Map();
    this.y0f.get(e).RoleEnergyMap.forEach((e, t) => {
      i.set(t, e);
    });
    for (let e = t; e < r.jif.length; e++) {
      r.jif[e].Xif.forEach(e => {
        var e = ModelManager_1.ModelManager.WheelTowerModel.TryGetRealRoleId(e.Q6n);
        var t = ModelManager_1.ModelManager.WheelTowerModel.GetRoleCost(e);
        var r = i.get(e);
        i.set(e, r + t);
      });
    }
    return this.I0f(i, r.jif.slice(0, t));
  }
  I0f(e, t) {
    const r = new EnergyInfo();
    e.forEach((e, t) => {
      r.RoleEnergyMap.set(t, e);
    });
    t.forEach(e => {
      e.Xif.forEach(e => {
        const t = ModelManager_1.ModelManager.WheelTowerModel.TryGetRealRoleId(e.Q6n);
        if (e.Qtm !== 0) {
          r.WeaponEnergyMap.set(e.Qtm, t);
        }
        e.Kif.forEach(e => {
          if (e !== 0) {
            r.PhantomEnergyMap.set(e, t);
          }
        });
      });
    });
    return r;
  }
  CheckMainCharacterCorrect(e) {
    var t = ModelManager_1.ModelManager.WheelTowerModel;
    var r = ModelManager_1.ModelManager.RoleModel;
    var i = t.TryGetRealRoleId(e);
    if (r.IsMainRole(i)) {
      i = r.GetCurSelectMainRoleId() ?? 0;
      if (t.IsTemplateRole(e)) {
        return t.GetTemplateRoleId(i);
      } else {
        return i;
      }
    } else {
      return e;
    }
  }
  E0f(e) {
    const r = new Map();
    e.Fif?.forEach(e => {
      const t = ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e.gG_).Diff;
      ConfigManager_1.ConfigManager.WheelTowerConfig.GetRewardConfigListByLevelId(e.gG_)?.forEach(e => {
        r.set(e.Id, t);
      });
    });
    this.QY.clear();
    e.E$s.forEach(e => {
      var t = new ActivityCommonDefine_1.ActivityTaskData();
      t.Refresh(e);
      t.TypeId = r.get(e.s5n);
      this.QY.set(t.Id, t);
    });
  }
  IsRewardCanReceive(e) {
    e = this.QY.get(e);
    return !!e && e.Status === 0;
  }
  IsRewardCompleted(e) {
    e = this.QY.get(e);
    return !!e && e.Status === 2;
  }
  HasAnyRewardCanReceive(e = 0) {
    return this.GetCanReceiveRewardId(e).length > 0;
  }
  GetTaskState(e) {
    return this.QY.get(e).Status;
  }
  GetTask(e) {
    return this.QY.get(e);
  }
  GetFilterTaskList(e = 0) {
    var t = [...this.QY.values()];
    switch (e) {
      case 0:
        return t;
      case 1:
        return t.filter(e => e.TypeId === 0);
      case 2:
        return t.filter(e => e.TypeId !== 0);
    }
    return t;
  }
  GetCanReceiveRewardId(e = 0) {
    return this.GetFilterTaskList(e).filter(e => e.Status === 0).map(e => e.Id);
  }
  GetCurrentRewardProgress(e = 0) {
    e = this.GetFilterTaskList(e);
    let t = 0;
    e?.forEach(e => {
      if (e.Status === 2) {
        t++;
      }
    });
    return t;
  }
  GetTotalRewardProgress(e = 0) {
    e = this.GetFilterTaskList(e);
    if (e) {
      return e.length;
    } else {
      return 0;
    }
  }
  OnAddNewRecord(e) {
    var t = e.gG_;
    var t = ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(t).Diff !== 0;
    var r = this.GetLevelRecord(t);
    r.jif.push(e.zif);
    r.Hif = e.zif.Yif;
    const n = this.y0f.get(t);
    e.zif?.Xif?.forEach(e => {
      const t = ModelManager_1.ModelManager.WheelTowerModel.TryGetRealRoleId(e.Q6n);
      var r = ModelManager_1.ModelManager.WheelTowerModel.GetRoleCost(t);
      var i = n.RoleEnergyMap.get(t);
      n.RoleEnergyMap.set(t, i - r);
      if (e.Qtm !== 0) {
        n.WeaponEnergyMap.set(e.Qtm, t);
      }
      e.Kif.forEach(e => {
        if (e !== 0) {
          n.PhantomEnergyMap.set(e, t);
        }
      });
    });
    r.SMs = e.xdf;
    if (r.Adf < e.xdf) {
      r.Adf = e.xdf;
    }
  }
  OnLevelRecordUpdateNotify(e) {
    this.S0f([e]);
    this.M0f([e]);
  }
  OnRoleEnergyUpdateNotify(e) {
    this.Hng();
    e.forEach(e => {
      var t = ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e.gG_).Diff !== 0;
      var r = new Map();
      for (const s of Object.keys(e.$if)) {
        var i = e.$if[s];
        r.set(Number(s), i);
      }
      var n = this.I0f(r, this.v0f.get(t).jif);
      this.y0f.set(t, n);
    });
  }
  OnTaskClaim(e) {
    e.forEach(e => {
      e = this.QY.get(e);
      if (e) {
        e.Status = 2;
      }
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  OnTaskUpdateNotify(e) {
    for (const r of e) {
      var t = this.QY.get(r.s5n);
      if (t) {
        t.Refresh(r);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("WheelTower", 90, "服务器下发任务更新,但任务不存在! taskId:" + r.s5n);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  ReadRedDot() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 0, 0, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  ShouldShowRewardRedDot() {
    return !!this.kBg() || this.HasAnyRewardCanReceive();
  }
  kBg() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 2, this.CycleId, 0) === 0;
  }
  RecordReadReward() {
    ModelManager_1.ModelManager.ActivityModel?.SaveActivityData(this.Id, 2, this.CycleId, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  HasAnyLevelRedDot() {
    return this.HasLevelRedDot(false) || this.HasLevelRedDot(true);
  }
  HasLevelRedDot(e) {
    e = this.v0f.get(e);
    return !!e && !!e.K6n && this.qBg(e.gG_);
  }
  qBg(e) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 1, this.CycleId, e) === 0;
  }
  RecordEnterLevel(e) {
    e = this.v0f.get(e)?.gG_ ?? 0;
    ModelManager_1.ModelManager.ActivityModel?.SaveActivityData(this.Id, 1, this.CycleId, e, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  GetExDataRedPointShowState() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 0, 0, 0) === 0 || !!this.IsInCycle() && (!!this.ShouldShowRewardRedDot() || this.HasAnyLevelRedDot());
  }
  GetExDataFinishShowState() {
    return !!this.IsInCycle() && this.GetCurrentRewardProgress() >= this.GetTotalRewardProgress();
  }
}
exports.WheelTowerData = WheelTowerData;
//# sourceMappingURL=WheelTowerData.js.map