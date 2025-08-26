"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelModeDataBase = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ActivityControllerHolder_1 = require("../../Activity/ActivityControllerHolder");
const TrapDefenseLevelData_1 = require("./TrapDefenseLevelData");
class TrapDefenseLevelModeDataBase {
  constructor(e) {
    this.ActivityId = 0;
    this.LevelDataList = [];
    this.CacheReachOpenTimeLevels = new Set();
    this.IsChangeCacheLevels = false;
    this.ActivityId = e;
  }
  static Create(e) {
    e = new this(e);
    e.Init();
    e.InitLocalData();
    return e;
  }
  InitLocalData() {
    this.CacheReachOpenTimeLevels = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseLevelReachOpenTime) ?? new Set();
  }
  SaveCacheReachOpenTimeLevels() {
    if (this.IsChangeCacheLevels) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseLevelReachOpenTime, this.CacheReachOpenTimeLevels);
      this.IsChangeCacheLevels = false;
    }
  }
  AddLevelConfig(e) {
    e = TrapDefenseLevelData_1.TrapDefenseLevelData.Create(e);
    this.LevelDataList.push(e);
    return e;
  }
  SortLevelDataList() {
    this.LevelDataList.sort((e, t) => {
      var r = e.Config.NextId;
      var i = t.Config.NextId;
      if (r === i) {
        return e.Id - t.Id;
      } else if (r === 0) {
        return 1;
      } else if (i === 0) {
        return -1;
      } else {
        return r - i;
      }
    });
    this.LevelDataList.forEach((e, t) => {
      e.SetPosition(t + 1);
    });
  }
  GetModeStarProgress() {
    return [this.GetModeAllGetStarNum(), this.GetModeTotalStar()];
  }
  GetModeAllGetStarNum() {
    return this.LevelDataList.reduce((e, t) => t.ReachTargetIndexList.length + e, 0);
  }
  GetModeTotalStar() {
    return this.LevelDataList.reduce((e, t) => t.Config.StarRatingConditions.length + e, 0);
  }
  GetNextChallengeData() {
    var e = this.LevelDataList.findIndex(e => !e.IsUnlock);
    if (e < 0) {
      return this.LevelDataList[this.LevelDataList.length - 1];
    } else if (e === 0) {
      return this.LevelDataList[0];
    } else {
      return this.LevelDataList[e - 1];
    }
  }
  RedDotLevelReachOpenTime() {
    for (const e of this.LevelDataList) {
      if (!this.CacheReachOpenTimeLevels.has(e.Id) && e.IsReachOpenTimeIgnoreZero()) {
        return true;
      }
    }
    return false;
  }
  CheckLevelReachOpenTimeRedDotState(e) {
    return !!this.GetLevelReachOpenTimeRedDotState(e) && (this.IsChangeCacheLevels = true, this.CacheReachOpenTimeLevels.add(e.Id), EventSystem_1.EventSystem.Emit(this.GetLevelReachOpenTimeRedDotEventName()), ActivityControllerHolder_1.ActivityControllerHolder.ActivityTrapDefenseController?.RefreshActivityRedDot(), true);
  }
  GetLevelReachOpenTimeRedDotState(e) {
    return !this.CacheReachOpenTimeLevels.has(e.Id) && e.IsReachOpenTimeIgnoreZero();
  }
  GetLevelReachOpenTimeRedDotEventName() {
    return EventDefine_1.EEventName.RedDotUpdateTrapDefenseLevelModeLevelReachOpenTime;
  }
}
exports.TrapDefenseLevelModeDataBase = TrapDefenseLevelModeDataBase;
//# sourceMappingURL=TrapDefenseLevelModeDataBase.js.map