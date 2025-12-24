"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourLevelData = undefined;
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../../ActivityCommonDefine");
const MotorParkourRankData_1 = require("./MotorParkourRankData");
const MotorParkourTaskData_1 = require("./MotorParkourTaskData");
class MotorParkourLevelData {
  constructor(t) {
    this.Lo = undefined;
    this.PreMotorParkourLevelData = undefined;
    this.TaskList = [];
    this.RecordList = [];
    this.wMf = undefined;
    this.RMf = 0;
    this.NAu = 0;
    for (const i of (this.Lo = t).RewardIds) {
      var e = new MotorParkourTaskData_1.MotorParkourTaskData(i);
      e.LevelId = t.Id;
      var r = ConfigManager_1.ConfigManager.MotorParkourConfig.GetMotorParkourRecordById(e.RecordId);
      var a = ConfigManager_1.ConfigManager.MotorParkourConfig.GetMotorParkourNpcById(r.NPCId);
      var a = new MotorParkourRankData_1.MotorParkourRankData(a.Name, r.Record, r.LapRecord);
      this.RecordList.push(a);
      this.TaskList.push(e);
    }
  }
  UpdateTaskStatus(e) {
    for (let t = 0; t < e.length; t++) {
      this.TaskList[t].Status = ActivityCommonDefine_1.taskStateResolver[e[t]];
    }
  }
  set UnlockTime(t) {
    this.NAu = t;
  }
  get UnlockTime() {
    return this.NAu;
  }
  IsReachUnlockTime() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return this.NAu === 0 || this.UnlockTime < t;
  }
  get IsUnLock() {
    return (!this.PreMotorParkourLevelData || !!this.PreMotorParkourLevelData.IsPass) && this.IsReachUnlockTime();
  }
  get BestRecordTime() {
    return this.RMf;
  }
  set BestRecordTime(t) {
    var e;
    if ((this.RMf = t) !== 0) {
      if (this.wMf) {
        this.wMf.Time = t;
      } else {
        e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
        this.wMf = new MotorParkourRankData_1.MotorParkourRankData(e, t, [], true);
      }
    }
  }
  get IsPass() {
    return this.BestRecordTime !== 0;
  }
  get IsFinished() {
    return this.TaskList.every(t => t.IsReceived);
  }
  get AllTaskNum() {
    return this.TaskList.length;
  }
  get FinishedTaskNum() {
    let t = 0;
    for (const e of this.TaskList) {
      if (e.IsReceived) {
        t += 1;
      }
    }
    return t;
  }
  get HistoryRankList() {
    var t = [...this.RecordList];
    if (this.wMf) {
      t.push(this.wMf);
    }
    t.sort((t, e) => t.Time - e.Time);
    var t = t.slice(0, 3);
    return t;
  }
  get BestRank() {
    var t = this.HistoryRankList.findIndex(t => t.IsOwn);
    if (t === -1) {
      return 4;
    } else {
      return t + 1;
    }
  }
  GetNewRankList(t) {
    var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    var e = new MotorParkourRankData_1.MotorParkourRankData(e, t, [], true);
    var t = [...this.RecordList, e];
    t.sort((t, e) => t.Time - e.Time);
    var e = t.slice(0, 3);
    return e;
  }
  GetLapRankList(r, e) {
    var t = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    const a = new MotorParkourRankData_1.MotorParkourRankData(t, e, [], true);
    a.LapTime[r - 1] = e;
    var i = [...this.RecordList, a];
    i.sort((t, e) => t.LapTime[r - 1] - e.LapTime[r - 1]);
    var o = i.findIndex(t => t === a);
    for (let t = 0; t < i.length; t++) {
      var n = Math.abs(t - o) === 1;
      i[t].UpdateShowTimeString(r, e, n);
    }
    return i.slice(0, 3);
  }
  get HasLevelRedDot() {
    var t;
    return !!this.IsUnLock && !this.IsFinished && (!(t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorParkourLevelClicked)) || !t.has(this.Id));
  }
  ReadLevelRedDot() {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorParkourLevelClicked);
    if (t) {
      t.add(this.Id);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorParkourLevelClicked, t);
    } else {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorParkourLevelClicked, new Set([this.Id]));
    }
  }
  get HasRewardRedDot() {
    return this.TaskList.some(t => t.IsFinished);
  }
  GetCanReceiveRewardIndex() {
    var e = [];
    for (let t = 0; t < this.TaskList.length; t++) {
      if (this.TaskList[t].IsFinished) {
        e.push(t);
      }
    }
    return e;
  }
  get Id() {
    return this.Lo.Id;
  }
  get SmallBgTexture() {
    return this.Lo.SmallBgTexture;
  }
  get SelectedSmallBgTexture() {
    return this.Lo.SelectedSmallBgTexture;
  }
  get RaceTrackTexture() {
    return this.Lo.RaceTrackTexture;
  }
  get MapTexture() {
    return this.Lo.MapTexture;
  }
  get LevelName() {
    return this.Lo.LevelName;
  }
  get RomanNum() {
    return this.Lo.RomanNum;
  }
  get UiOffset() {
    return this.Lo.UiOffset;
  }
  get CenterOffset() {
    return this.Lo.CenterOffset;
  }
  get MapScale() {
    return this.Lo.MapScale;
  }
  get SplineId() {
    return this.Lo.SplineId;
  }
  get SplineStartIndex() {
    return this.Lo.SplineStartIndex;
  }
  get SplineEndIndex() {
    return this.Lo.SplineEndIndex;
  }
  get RouteTextureRotation() {
    return this.Lo.RouteTextureRotation;
  }
  get RouteName() {
    return this.Lo.RouteName;
  }
  get ActivityId() {
    return this.Lo.ActivityId;
  }
}
exports.MotorParkourLevelData = MotorParkourLevelData;
//# sourceMappingURL=MotorParkourLevelData.js.map