"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayDrivingSoundOnReachSpeed = exports.KeepDrivingDurationAtSpeed = exports.KeepDrivingAtSpeedCondition = exports.KeepDrivingInfo = exports.VehicleModel = exports.WaitEntityTaskContext = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const VehicleInfoDefines_1 = require("../Common/VehicleInfoDefines");
const DAYTIME_HOUR_START = 360;
const DAYTIME_HOUR_END = 1080;
class WaitEntityTaskContext {
  constructor() {
    this.WaitTask = undefined;
    this.Context = undefined;
  }
}
exports.WaitEntityTaskContext = WaitEntityTaskContext;
class VehicleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.PlayerVehicleInfo = new Map();
    this.VehiclePlayerInfo = new Map();
    this.PassengerVehicleMap = new Map();
    this.VehiclePassengerMap = new Map();
    this.IsReadyRiderSharing = false;
    this.IsForbidRiderSharing = false;
    this.RideSharingInfoMap = new Map();
    this.MaterialControllerHandles = new Set();
    this._A = 0;
    this.Jbl = undefined;
  }
  OnChangeMode() {
    for (const t of this.PlayerVehicleInfo.values()) {
      var e = t.DeepCopy();
      e.VehicleCreatureId = 0;
      e.ExitType = 1;
      ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(e);
      this.PassengerVehicleMap.delete(e.EntityCreatureId);
    }
    this.PlayerVehicleInfo.clear();
    this.VehiclePlayerInfo.clear();
    this.RideSharingInfoMap.clear();
    this.IsReadyRiderSharing = false;
    return !(this.IsForbidRiderSharing = false);
  }
  OnClear() {
    this.MaterialControllerHandles.clear();
    return true;
  }
  UpdateAllPlayerVehicleData(e) {
    this.PlayerVehicleInfo.clear();
    this.VehiclePlayerInfo.clear();
    this.PostUpdateAllVehicleEntityData();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "[VehicleModel.UpdateAllPlayerVehicleData] 开始刷新全量载具数据", ["PlayerNum", e.length]);
    }
    for (const s of e) {
      var t;
      var i = new VehicleInfoDefines_1.ScenePlayerVehicleInfo();
      i.PlayerId = s.W5n;
      this.PlayerVehicleInfo.set(s.W5n, i);
      if (s.JI_) {
        if (t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(i.PlayerId)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId) {
          i.EntityCreatureId = t;
          i.VehicleCreatureId = MathUtils_1.MathUtils.LongToNumber(s.JI_.F4n);
          i.Seat = s.JI_.fhl;
          this.UpdatePlayerVehicleData(i);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 50, "[VehicleModel.UpdateAllPlayerVehicleData] 刷新载具全量数据时无法获取对应PlayerId的CreatureId", ["PlayerId", s.W5n], ["VehicleId", MathUtils_1.MathUtils.LongToNumber(s.JI_.F4n)], ["Seat", s.JI_.fhl]);
        }
      }
    }
  }
  AddOtherPlayerVehicleData(e) {
    var t = new VehicleInfoDefines_1.ScenePlayerVehicleInfo();
    t.PlayerId = e;
    this.PlayerVehicleInfo.set(e, t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "[VehicleModel.AddOtherPlayerVehicleData] 添加玩家载具信息", ["PlayerId", e]);
    }
  }
  RemoveOtherPlayerVehicleData(e) {
    var t;
    var i = this.PlayerVehicleInfo.get(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "[VehicleModel.RemoveOtherPlayerVehicleData] 移除玩家载具信息", ["PlayerId", i?.PlayerId], ["PlayerCreatureId", i?.EntityCreatureId], ["VehicleCreatureId", i?.VehicleCreatureId], ["Seat", i?.Seat]);
    }
    if (i && i.VehicleCreatureId !== 0) {
      (t = new VehicleInfoDefines_1.ScenePlayerVehicleInfo()).PlayerId = i.PlayerId;
      t.EntityCreatureId = i.EntityCreatureId;
      t.VehicleCreatureId = 0;
      t.Seat = i.Seat;
      this.UpdatePlayerVehicleData(i);
    }
    this.PlayerVehicleInfo.delete(e);
  }
  UpdatePlayerVehicleData(e) {
    let t = this.PlayerVehicleInfo.get(e.PlayerId);
    if (!t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "[VehicleModel] 没有数据默认不在船上", ["PlayerId", e.PlayerId], ["Seat", e.Seat]);
      }
      (t = new VehicleInfoDefines_1.ScenePlayerVehicleInfo()).PlayerId = e.PlayerId;
      t.EntityCreatureId = e.EntityCreatureId;
      t.VehicleCreatureId = 0;
      t.Seat = e.Seat;
      this.PlayerVehicleInfo.set(e.PlayerId, t);
    }
    var i = e.VehicleCreatureId !== 0;
    if (!i) {
      e.VehicleCreatureId = t.VehicleCreatureId;
      e.Seat = -1;
    }
    if (!!i || t.VehicleCreatureId !== 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "[VehicleModel.UpdateVehicleData] 更新载具数据", ["PlayerId", e.PlayerId], ["PlayerCreatureId", e.EntityCreatureId], ["VehicleCreatureId", e.VehicleCreatureId], ["Seat", e.Seat]);
      }
      this.Mhl(e);
      this.vhl(e);
      this.UpdateEntityVehicleData(e);
    }
  }
  Mhl(e) {
    var t = e.Seat !== -1;
    let i = this.VehiclePlayerInfo.get(e.VehicleCreatureId);
    if (t) {
      if (!i) {
        i = new Set();
        this.VehiclePlayerInfo.set(e.VehicleCreatureId, i);
      }
      i.add(e.PlayerId);
    } else if (i) {
      i.delete(e.PlayerId);
      if (!i.size) {
        this.VehiclePlayerInfo.delete(e.VehicleCreatureId);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 50, "[VehicleModel.UpdateVehiclePlayerInfo] 更新载具数据失败，重复退出载具", ["PlayerId", e.PlayerId], ["PlayerCreatureId", e.EntityCreatureId], ["VehicleCreatureId", e.VehicleCreatureId]);
    }
  }
  vhl(e) {
    var t;
    var i = e.Seat !== -1;
    var s = this.PlayerVehicleInfo.get(e.PlayerId);
    if (!!i && s.VehicleCreatureId !== 0 && (s.EntityCreatureId !== e.EntityCreatureId || s.VehicleCreatureId !== e.VehicleCreatureId)) {
      (t = s.DeepCopy()).Seat = -1;
      t.ExitType = 1;
      this.Mhl(t);
    }
    s.EntityCreatureId = e.EntityCreatureId;
    s.VehicleCreatureId = i ? e.VehicleCreatureId : 0;
    s.Seat = e.Seat;
    s.ExitType = e.ExitType;
  }
  UpdateEntityVehicleData(e) {
    var t = e.EntityCreatureId;
    var t = this.PassengerVehicleMap.get(t);
    if (e.Seat === -1) {
      if (!t?.VehicleCreatureId) {
        return;
      }
      e.VehicleCreatureId = t.VehicleCreatureId;
    }
    this.UpdateVehicleEntityInfo(e);
    this.UpdateEntityVehicleInfo(e);
  }
  UpdateEntityVehicleInfo(e) {
    var t;
    var i = e.Seat !== -1;
    let s = this.PassengerVehicleMap.get(e.EntityCreatureId);
    if (s) {
      if (i && s.VehicleCreatureId !== 0 && s.VehicleCreatureId !== e.VehicleCreatureId) {
        (t = s.DeepCopy()).Seat = -1;
        t.ExitType = 1;
        this.UpdateVehicleEntityInfo(t);
      }
    } else {
      s = new VehicleInfoDefines_1.EntityVehicleInfo();
      this.PassengerVehicleMap.set(e.EntityCreatureId, s);
    }
    s.EntityCreatureId = e.EntityCreatureId;
    s.VehicleCreatureId = i ? e.VehicleCreatureId : 0;
    s.Seat = e.Seat;
    s.ExitType = e.ExitType;
    this.PassengerVehicleMap.set(e.EntityCreatureId, e);
  }
  UpdateVehicleEntityInfo(e) {
    var t = e.Seat !== -1;
    let i = this.VehiclePassengerMap.get(e.VehicleCreatureId);
    if (t) {
      if (!i) {
        i = new Map();
        this.VehiclePassengerMap.set(e.VehicleCreatureId, i);
      }
      i.set(e.EntityCreatureId, e);
    } else if (i) {
      i.delete(e.EntityCreatureId);
      if (!i.size) {
        this.VehiclePlayerInfo.delete(e.VehicleCreatureId);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 50, "[VehicleModel.UpdateVehicleEntityInfo] 更新载具数据失败，重复退出载具", ["EntityCreatureId", e.EntityCreatureId], ["VehicleCreatureId", e.VehicleCreatureId]);
    }
  }
  PostUpdateAllVehicleEntityData() {
    for (const e of this.PassengerVehicleMap.values()) {
      this.PostUpdateVehicleEntityData(e);
    }
  }
  PostUpdateVehicleEntityData(e) {
    var t;
    if (e.Seat === -1) {
      (t = this.VehiclePassengerMap.get(e.VehicleCreatureId))?.delete(e.EntityCreatureId);
      if (!t?.size) {
        this.VehiclePassengerMap.delete(e.VehicleCreatureId);
      }
      this.PassengerVehicleMap.delete(e.EntityCreatureId);
    }
  }
  GetVehiclePlayerData(e) {
    var t = new Array();
    var e = this.VehiclePlayerInfo.get(e);
    if (e) {
      for (const i of e) {
        t.push(this.PlayerVehicleInfo.get(i));
      }
    }
    return t;
  }
  GetPlayerVehicleData(e) {
    return this.PlayerVehicleInfo.get(e);
  }
  GetVehicleEntityData(e) {
    var t = new Array();
    var e = this.VehiclePassengerMap.get(e);
    if (e) {
      for (var [, i] of e) {
        t.push(i);
      }
    }
    return t;
  }
  GetEntityVehicleData(e) {
    return this.PassengerVehicleMap.get(e);
  }
  UpdateKeepDrivingInfo(e, t) {
    if (this.Jbl) {
      for (const i of this.Jbl) {
        if ((!i[1].CheckCondition || !!i[1].CheckCondition()) && !!i[1].UpdateDrivingInfo(e, t)) {
          if (i[1].RunAction && (i[1].RunAction(), Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Vehicle", 42, "[VehicleModel] 达成持续驾驶事件", ["UID", i[0]], ["info", i[1].ToString()]);
          }
        }
      }
    }
  }
  AddKeepDrivingInfo(e) {
    this.Jbl ||= new Map();
    this._A++;
    this.Jbl.set(this._A, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Vehicle", 42, "[VehicleModel] 新增持续驾驶事件", ["UID", this._A], ["info", e.ToString()]);
    }
    return this._A;
  }
  RemoveKeepDrivingInfo(e) {
    if (this.Jbl?.has(e)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Vehicle", 42, "[VehicleModel] 移除持续驾驶事件", ["UID", e], ["info", this.Jbl.get(e)?.ToString()]);
      }
      this.Jbl.delete(e);
    }
  }
}
exports.VehicleModel = VehicleModel;
class KeepDrivingInfo {
  constructor() {
    this.CheckCondition = undefined;
    this.RunAction = undefined;
  }
}
class KeepDrivingAtSpeedCondition extends (exports.KeepDrivingInfo = KeepDrivingInfo) {
  constructor(e, t, i, s) {
    super();
    this.SpeedRange = [0, 0];
    this.ConditionMap = new Map();
    this.TriggeredList = [];
    this.MeetConditionCallback = undefined;
    this.CurrentDuration = 0;
    this.CoolDown = 0;
    this.LastTime = 0;
    this.SpeedRange = e;
    this.CoolDown = s ?? 0;
    this.CheckCondition = t;
    this.MeetConditionCallback = i;
  }
  AddCondition(e) {
    this.ConditionMap.set(e.Id, e);
  }
  SetConditionTriggered(e) {
    e = this.ConditionMap.get(e);
    if (e) {
      e.Triggered = true;
    }
  }
  RZm() {
    if (Math.abs(TimerSystem_1.TimerSystem.Now - this.LastTime) > this.CoolDown) {
      this.LastTime = TimerSystem_1.TimerSystem.Now;
    } else {
      var e = ModelManager_1.ModelManager.WeatherModel;
      if (e) {
        for (const r of this.ConditionMap.values()) {
          if (!r.Triggered) {
            var t = r.Duration;
            var i = r.Weather;
            var s = r.Time;
            if (this.CurrentDuration > t && (i.length === 0 || i.includes(e.CurrentWeatherId)) && (s.length === 0 || this.wZm(s))) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Vehicle", 42, "[VehicleModel] 达成持续驾驶条件", ["configId", r.Id], ["duration", t], ["weather", r.Weather], ["dayTime", s]);
              }
              return r.Id;
            }
          }
        }
      }
    }
    return 0;
  }
  UpdateDrivingInfo(e, t) {
    if (MathUtils_1.MathUtils.InRangeArray(t.Speed, this.SpeedRange)) {
      this.CurrentDuration += e;
      t = this.RZm();
      if (t) {
        this.LastTime = TimerSystem_1.TimerSystem.Now;
        this.MeetConditionCallback?.(t);
        return true;
      }
    } else {
      this.CurrentDuration = 0;
    }
    return false;
  }
  ToString() {
    return `保持速度在区间[${this.SpeedRange[0]},${this.SpeedRange[1]}]内,满足指定条件,冷却时间${this.CoolDown}毫秒`;
  }
  wZm(e) {
    for (const i of e) {
      let e = 0;
      let t = 0;
      t = i === "DayTime" ? (e = DAYTIME_HOUR_START, DAYTIME_HOUR_END) : (e = DAYTIME_HOUR_END, DAYTIME_HOUR_START);
      return ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(e, t);
    }
    return e.length === 0;
  }
}
exports.KeepDrivingAtSpeedCondition = KeepDrivingAtSpeedCondition;
class KeepDrivingDurationAtSpeed extends KeepDrivingInfo {
  constructor(e, t, i, s, r) {
    super();
    this.SpeedRange = [0, 0];
    this.Duration = 0;
    this.CurrentDuration = 0;
    this.CoolDown = 0;
    this.LastTime = 0;
    this.SpeedRange = e;
    this.Duration = t;
    this.CoolDown = r ?? 0;
    this.CheckCondition = i;
    this.RunAction = s;
  }
  UpdateDrivingInfo(e, t) {
    t = MathUtils_1.MathUtils.InRangeArray(t.Speed, this.SpeedRange);
    if (t) {
      this.CurrentDuration += e;
      if (this.CurrentDuration > this.Duration) {
        return Math.abs(TimerSystem_1.TimerSystem.Now - this.LastTime) > this.CoolDown && (this.LastTime = TimerSystem_1.TimerSystem.Now, true);
      }
    } else {
      this.CurrentDuration = 0;
    }
    return false;
  }
  ToString() {
    return `保持速度在区间[${this.SpeedRange[0]},${this.SpeedRange[1]}]内,持续${this.Duration}毫秒,冷却时间${this.CoolDown}毫秒`;
  }
}
exports.KeepDrivingDurationAtSpeed = KeepDrivingDurationAtSpeed;
class PlayDrivingSoundOnReachSpeed extends KeepDrivingInfo {
  constructor(e, t, i, s) {
    super();
    this.SpeedRange = [0, 0];
    this.CoolDown = 0;
    this.LastSpeed = 0;
    this.LastTime = 0;
    this.SpeedRange = e;
    this.CoolDown = t;
    this.CheckCondition = i;
    this.RunAction = s;
  }
  UpdateDrivingInfo(e, t) {
    var i = !MathUtils_1.MathUtils.InRangeArray(this.LastSpeed, this.SpeedRange) && MathUtils_1.MathUtils.InRangeArray(t.Speed, this.SpeedRange);
    if ((this.LastSpeed = t.Speed, i) && Math.abs(TimerSystem_1.TimerSystem.Now - this.LastTime) > this.CoolDown) {
      this.LastTime = TimerSystem_1.TimerSystem.Now;
      return true;
    }
    return false;
  }
  ToString() {
    return `速度每次进入区间[${this.SpeedRange[0]},${this.SpeedRange[1]}]内,触发事件,冷却时间${this.CoolDown}毫秒`;
  }
}
exports.PlayDrivingSoundOnReachSpeed = PlayDrivingSoundOnReachSpeed;
//# sourceMappingURL=VehicleModel.js.map