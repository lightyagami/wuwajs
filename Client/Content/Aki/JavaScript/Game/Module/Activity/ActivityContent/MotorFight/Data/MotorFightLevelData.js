"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightLevelData = undefined;
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
class MotorFightLevelData {
  constructor(e) {
    this.Lo = undefined;
    this.PreMotorFightLevelData = undefined;
    this.NAu = 0;
    this._cg = 0;
    this.ucg = 0;
    this.VAu = false;
    this.Lo = e;
  }
  set UnlockTime(e) {
    this.NAu = e / TimeUtil_1.TimeUtil.InverseMillisecond;
  }
  get UnlockTime() {
    return this.NAu;
  }
  IsReachUnlockTime() {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    return this.NAu === 0 || this.UnlockTime < e;
  }
  IsPreLevelFinished() {
    return !this.PreMotorFightLevelData || this.PreMotorFightLevelData.IsFinished;
  }
  get IsUnLock() {
    return !!this.IsPreLevelFinished() && this.IsReachUnlockTime();
  }
  set BestScore(e) {
    this._cg = e;
  }
  get BestScore() {
    return this._cg;
  }
  set IsFinished(e) {
    this.VAu = e;
  }
  get IsFinished() {
    return this.VAu;
  }
  set RoleId(e) {
    this.ucg = e;
  }
  get RoleId() {
    return this.ucg;
  }
  get HasLevelRedDot() {
    var e;
    return !!this.IsUnLock && !this.IsFinished && (!(e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorFightLevelClicked)) || !e.has(this.Id));
  }
  ReadLevelRedDot() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorFightLevelClicked);
    if (e) {
      e.add(this.Id);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorFightLevelClicked, e);
    } else {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorFightLevelClicked, new Set([this.Id]));
    }
  }
  get Id() {
    return this.Lo.Id;
  }
  get LevelName() {
    return this.Lo.LevelName;
  }
  get LevelDesc() {
    return this.Lo.LevelDesc;
  }
  get Number() {
    return this.Lo.SerialNumber;
  }
  get RewardId() {
    return this.Lo.RewardId;
  }
  get RecommendRoleIds() {
    return this.Lo.RecommnedRoleList;
  }
  get Type() {
    return this.Lo.InstType;
  }
  get LevelTexture() {
    return this.Lo.LevelTexture;
  }
  get ActivityId() {
    return this.Lo.ActivityId;
  }
  get Column() {
    return this.Lo.Column;
  }
  get Row() {
    return this.Lo.Row;
  }
  get PreLevelIds() {
    return this.Lo.PreId;
  }
  get LevelBg() {
    return this.Lo.LevelBg;
  }
}
exports.MotorFightLevelData = MotorFightLevelData;
//# sourceMappingURL=MotorFightLevelData.js.map