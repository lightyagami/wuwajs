"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRougeModeData = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityControllerHolder_1 = require("../../Activity/ActivityControllerHolder");
const TrapDefenseBdData_1 = require("./TrapDefenseBdData");
const TrapDefenseLevelModeDataBase_1 = require("./TrapDefenseLevelModeDataBase");
class TrapDefenseRougeModeData extends TrapDefenseLevelModeDataBase_1.TrapDefenseLevelModeDataBase {
  constructor() {
    super(...arguments);
    this.BdDataList = [];
    this.BdDataListIgnoreZero = [];
    this.BdDataMap = new Map();
    this.BdBuffDataMap = new Map();
    this.BdBuffDataList = [];
    this.LastGetBdBuffData = undefined;
    this.IsCheckBdProgress = false;
    this.CacheIsOpenMode = undefined;
    this.CacheUnlockBdBuffs = new Set();
    this.IsChangeCacheBdBuffs = false;
  }
  Init() {
    this.y3u();
  }
  y3u() {
    for (const t of ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAllBdList()) {
      var e = TrapDefenseBdData_1.TrapDefenseBdData.Create(t);
      this.BdDataList.push(e);
      this.BdDataMap.set(e.Id, e);
      e.BdBuffDataList.forEach(e => {
        this.BdBuffDataMap.set(e.Id, e);
        this.BdBuffDataList.push(e);
      });
      if (!e.IsZeroBdType()) {
        this.BdDataListIgnoreZero.push(e);
      }
    }
    this.BdDataList.sort((e, t) => e.Id - t.Id);
    this.BdDataListIgnoreZero.sort((e, t) => e.Id - t.Id);
  }
  InitLocalData() {
    super.InitLocalData();
    this.CacheIsOpenMode = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseRougeModeOpen);
    this.CacheUnlockBdBuffs = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseBdBuffUnlock) ?? new Set();
  }
  SaveCacheUnlockBdBuffs() {
    if (this.IsChangeCacheBdBuffs) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseBdBuffUnlock, this.CacheUnlockBdBuffs);
      this.IsChangeCacheBdBuffs = false;
    }
  }
  GetBdDataListIsActive() {
    return this.BdDataList.filter(e => e.IsActive());
  }
  SetLastGetBdBuffData(e) {
    this.LastGetBdBuffData = e;
  }
  SetIsCheckBdProgress(e) {
    this.IsCheckBdProgress = e;
  }
  GetEndlessPassedMaxWaveTimes() {
    let t = 0;
    this.LevelDataList.filter(e => e.IsEndless).forEach(e => {
      if (e.MaxFinishWaveTimes > t) {
        t = e.MaxFinishWaveTimes;
      }
    });
    return t;
  }
  GetUnlockTime() {
    let t = Infinity;
    this.LevelDataList.forEach(e => {
      t = Math.min(t, e.UnlockTime);
    });
    return t;
  }
  GetUnlockRemainTime() {
    var e;
    var t = this.GetUnlockTime();
    if (t === 0) {
      return 0;
    } else {
      e = TimeUtil_1.TimeUtil.GetServerTime();
      return Math.max(0, t - e);
    }
  }
  CanEnterRougeMode() {
    return !!this.ModeIsOpen() && this.LevelDataList.some(e => e.IsUnlockCondition);
  }
  ModeIsOpen() {
    return this.LevelDataList.some(e => e.IsReachOpenTime());
  }
  RedDotModeOpen() {
    if (this.CacheIsOpenMode !== undefined) {
      return this.CacheIsOpenMode;
    } else {
      return !!this.ModeIsOpen() && (LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseRougeModeOpen, true), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseRougeModeOpenSub, true), this.CacheIsOpenMode = true);
    }
  }
  CheckModeOpenRedDotState() {
    return !!this.CacheIsOpenMode && (this.CacheIsOpenMode = false, LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseRougeModeOpen, false), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseRougeModeOpen), ActivityControllerHolder_1.ActivityControllerHolder.ActivityTrapDefenseController?.RefreshActivityRedDot(), true);
  }
  GetLevelReachOpenTimeRedDotEventName() {
    return EventDefine_1.EEventName.RedDotUpdateTrapDefenseRougeModeLevelReachOpenTime;
  }
  RedDotNewUnlockBdBuff() {
    return this.BdBuffDataList.some(e => e.IsUnlock && !this.CacheUnlockBdBuffs.has(e.Id));
  }
  CheckBdBuffUnlockRedDotState(e) {
    return !!this.GetBdBuffNewTagState(e) && (this.IsChangeCacheBdBuffs = true, this.CacheUnlockBdBuffs.add(e.Id), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseBdBuffNewUnlock), ActivityControllerHolder_1.ActivityControllerHolder.ActivityTrapDefenseController?.RefreshActivityRedDot(), true);
  }
  GetBdBuffNewTagState(e) {
    return !!e.IsUnlock && !ModelManager_1.ModelManager.TrapDefenseModel?.ViewModelBdSum.IsInstance && !this.CacheUnlockBdBuffs.has(e.Id);
  }
  IsShowRougeModeTipsToActivity() {
    return !!this.CacheIsOpenMode && !!LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseRougeModeOpenSub);
  }
  CheckModeOpenSubState() {
    if (!this.CacheIsOpenMode) {
      return false;
    }
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseRougeModeOpenSub, false);
    var e = ModelManager_1.ModelManager.TrapDefenseModel.GetActivityId();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e);
    return true;
  }
  GetUnlockBdBuffSum() {
    return this.BdBuffDataList.filter(e => e.IsUnlock).length;
  }
  CheckBdBuffGetUpdate(e, t) {
    var a = this.BdBuffDataMap.get(e);
    if (a) {
      a.SetActive(true);
      a.SetLevel(t);
      if (a.IsStrengthenFinish()) {
        ModelManager_1.ModelManager.TrapDefenseModel?.OpenViewBdBuffStrengthen(e);
      } else {
        ModelManager_1.ModelManager.TrapDefenseModel?.OpenViewBdBuffNewGet(e);
      }
    }
  }
}
exports.TrapDefenseRougeModeData = TrapDefenseRougeModeData;
//# sourceMappingURL=TrapDefenseRougeModeData.js.map