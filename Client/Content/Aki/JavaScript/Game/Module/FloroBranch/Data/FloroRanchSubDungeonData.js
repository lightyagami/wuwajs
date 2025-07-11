"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchSubDungeonData = undefined;
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
class FloroRanchSubDungeonData {
  constructor(t) {
    this.Lo = undefined;
    this.P4e = false;
    this.jqc = false;
    this.COu = false;
    this.Ghi = 0;
    this._mu = 0;
    this.Xou = false;
    this.zou = 0;
    this.Jou = 0;
    this.eWc = true;
    this.Lo = t;
  }
  UpdateUnLockState(t) {
    this.P4e = t;
  }
  get IsUnLock() {
    return this.P4e;
  }
  UpdateHistoryData(t) {
    this.Xou = true;
    this.zou = t.Kiu;
    this.Jou = Number(MathUtils_1.MathUtils.LongToBigInt(t.Xiu));
  }
  set IsFinished(t) {
    this.jqc = t;
  }
  get IsFinished() {
    return this.jqc;
  }
  SetInstanceId(t) {
    this.Ghi = t;
  }
  get InstanceId() {
    return this.Ghi;
  }
  set IsInstanceUnlock(t) {
    this.COu = t;
  }
  get IsInstanceUnlock() {
    return this.COu;
  }
  set ConditionId(t) {
    this._mu = t;
  }
  get ConditionId() {
    return this._mu;
  }
  GetMaxStage() {
    return this.Lo.Stage;
  }
  get Difficulty() {
    return this.Lo.Difficulty;
  }
  GetStageDay() {
    return this.Lo.StageDays[0];
  }
  get FirstReward() {
    return this.Lo.FirstTechReward;
  }
  get AgainReward() {
    let t = 0;
    for (const e of this.Lo.TechReward) {
      t += e;
    }
    return t;
  }
  get TagId() {
    return this.Lo.Tag;
  }
  get RaceList() {
    return this.Lo.Race;
  }
  get Id() {
    return this.Lo.Id;
  }
  set HasRedDot(t) {
    this.eWc = t;
  }
  get HasRedDot() {
    return !!this.IsUnLock && !!this.COu && this.eWc;
  }
  get SelectedRaceIds() {
    var t = this.RaceList;
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSelectedRaceIds);
    if (e) {
      const s = e.get(this.Id);
      if (s && t.length === s.length) {
        if (t.filter(t => t !== 0).every(t => s.includes(t))) {
          return s;
        } else {
          return t;
        }
      } else {
        return t;
      }
    }
    return t;
  }
  get HasHistory() {
    return this.Xou;
  }
  get MaxDays() {
    return this.zou;
  }
  get MaxCoin() {
    return this.Jou;
  }
}
exports.FloroRanchSubDungeonData = FloroRanchSubDungeonData;
//# sourceMappingURL=FloroRanchSubDungeonData.js.map