"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerData = exports.EnergyInfo = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
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
    this.eff = new Map();
    this.tff = new Map();
    this.QY = new Map();
  }
  PhraseEx(e) {
    ModelManager_1.ModelManager.WheelTowerModel.SetActivityId(this.Id);
    e = e.Aef;
    this.CycleId = e.bN_;
    this.rff(e.Uef);
    this.nff(e.Uef);
    this.sff(e);
  }
  rff(e) {
    this.eff.clear();
    e?.forEach(e => {
      var t = ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e.gG_).Diff;
      this.eff.set(t !== 0, e);
      this.FWf();
    });
  }
  FWf() {
    this.eff.forEach(e => {
      e.qef.forEach(e => {
        e.Vef.forEach(e => {
          var t = this.CheckMainCharacterCorrect(e.Q6n);
          e.Q6n = t;
        });
      });
    });
  }
  IsTowerUnlocked() {
    if (this.IsUnLock()) {
      for (var [, e] of this.eff) {
        if (e.K6n) {
          return true;
        }
      }
    }
    return false;
  }
  GetLevelRecord(e) {
    return this.eff.get(e);
  }
  IsLevelUnlocked(e) {
    e = this.eff.get(e);
    return e !== undefined && e.K6n;
  }
  GetHistoryBestScore(e) {
    return this.GetLevelRecord(e).xuf;
  }
  GetRoundScore(e, t) {
    return this.GetLevelRecord(e).qef[t]?.Buf ?? 0;
  }
  GetRoundTotalScore(t, r) {
    let n = 0;
    for (let e = 0; e <= r; e++) {
      n += this.GetRoundScore(t, e);
    }
    return n;
  }
  GetTotalScore(e) {
    var t = this.GetLevelRecord(e).qef.length - 1;
    return this.GetRoundTotalScore(e, t);
  }
  nff(e) {
    this.tff.clear();
    e?.forEach(e => {
      var t = ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e.gG_).Diff !== 0;
      var r = new Map();
      for (const i of Object.keys(e.Oef)) {
        var n = e.Oef[i];
        var a = this.CheckMainCharacterCorrect(Number(i));
        r.set(a, n);
      }
      this.tff.set(t, this.aff(r, e.qef));
    });
  }
  GetRoundEnergyInfo(e, t) {
    var r = this.GetLevelRecord(e);
    const n = new Map();
    this.tff.get(e).RoleEnergyMap.forEach((e, t) => {
      n.set(t, e);
    });
    for (let e = t; e < r.qef.length; e++) {
      r.qef[e].Vef.forEach(e => {
        var e = ModelManager_1.ModelManager.WheelTowerModel.TryGetRealRoleId(e.Q6n);
        var t = ModelManager_1.ModelManager.WheelTowerModel.GetRoleCost(e);
        var r = n.get(e);
        n.set(e, r + t);
      });
    }
    return this.aff(n, r.qef.slice(0, t));
  }
  aff(e, t) {
    const r = new EnergyInfo();
    e.forEach((e, t) => {
      r.RoleEnergyMap.set(t, e);
    });
    t.forEach(e => {
      e.Vef.forEach(e => {
        const t = ModelManager_1.ModelManager.WheelTowerModel.TryGetRealRoleId(e.Q6n);
        if (e.Qtm !== 0) {
          r.WeaponEnergyMap.set(e.Qtm, t);
        }
        e.Nef.forEach(e => {
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
    var n = t.TryGetRealRoleId(e);
    if (r.IsMainRole(n)) {
      n = r.GetCurSelectMainRoleId() ?? 0;
      if (t.IsTemplateRole(e)) {
        return t.GetTemplateRoleId(n);
      } else {
        return n;
      }
    } else {
      return e;
    }
  }
  sff(e) {
    const r = new Map();
    e.Uef?.forEach(e => {
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
    r.qef.push(e.jef);
    r.kef = e.jef.Hef;
    const a = this.tff.get(t);
    e.jef?.Vef?.forEach(e => {
      const t = ModelManager_1.ModelManager.WheelTowerModel.TryGetRealRoleId(e.Q6n);
      var r = ModelManager_1.ModelManager.WheelTowerModel.GetRoleCost(t);
      var n = a.RoleEnergyMap.get(t);
      a.RoleEnergyMap.set(t, n - r);
      if (e.Qtm !== 0) {
        a.WeaponEnergyMap.set(e.Qtm, t);
      }
      e.Nef.forEach(e => {
        if (e !== 0) {
          a.PhantomEnergyMap.set(e, t);
        }
      });
    });
    r.SMs = e.quf;
    if (r.xuf < e.quf) {
      r.xuf = e.quf;
    }
  }
  OnLevelRecordUpdateNotify(e) {
    this.rff([e]);
    this.nff([e]);
  }
  OnRoleEnergyUpdateNotify(e) {
    this.FWf();
    e.forEach(e => {
      var t = ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e.gG_).Diff !== 0;
      var r = new Map();
      for (const i of Object.keys(e.Oef)) {
        var n = e.Oef[i];
        r.set(Number(i), n);
      }
      var a = this.aff(r, this.eff.get(t).qef);
      this.tff.set(t, a);
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
  GetExDataRedPointShowState() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 0, 0, 0) === 0 || this.HasAnyRewardCanReceive();
  }
  GetExDataFinishShowState() {
    return this.GetCurrentRewardProgress() >= this.GetTotalRewardProgress();
  }
}
exports.WheelTowerData = WheelTowerData;
//# sourceMappingURL=WheelTowerData.js.map