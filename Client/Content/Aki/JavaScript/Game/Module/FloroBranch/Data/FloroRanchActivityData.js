"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchActivityData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../Activity/ActivityCommonDefine");
const ActivityData_1 = require("../../Activity/ActivityData");
const FloroRanchCardData_1 = require("./FloroRanchCardData");
const FloroRanchDungeonData_1 = require("./FloroRanchDungeonData");
const FloroRanchMilestoneData_1 = require("./FloroRanchMilestoneData");
const FloroRanchRaceData_1 = require("./FloroRanchRaceData");
const FloroRanchSkillData_1 = require("./FloroRanchSkillData");
const FloroRanchSubDungeonData_1 = require("./FloroRanchSubDungeonData");
const FloroRanchTaskData_1 = require("./FloroRanchTaskData");
const FloroRanchTechnologyData_1 = require("./FloroRanchTechnologyData");
const FloroRanchToyData_1 = require("./FloroRanchToyData");
class FloroRanchActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.Pou = new Map();
    this.nAu = new Map();
    this.xou = new Map();
    this.Wlo = undefined;
    this.cEu = new Map();
    this.dEu = undefined;
    this.mFu = undefined;
    this.Uou = new Map();
    this.mEu = undefined;
    this.Dou = new Map();
    this.Bou = new Map();
    this.sAu = undefined;
    this.Kou = undefined;
    this.kou = new Map();
    this.AGu = [];
    this.yUu = [];
    this.fEu = new Map();
    this.gEu = new Map();
    this.CEu = new Map();
    this.lVl = (t, o) => t.Status !== o.Status ? t.Status - o.Status : t.Id - o.Id;
    this.pEu = new Map();
    this.aAu = undefined;
    this.GetMilestoneItemCount = () => {
      return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.hAu.MilestoneItemId);
    };
    this.hAu = undefined;
    this.z$c = 0;
    this.J$c = 0;
    this.Z$c = false;
    this.Lku = 0;
    this.N9c = 0;
  }
  OnInit(t) {
    var o;
    var t = t.Oiu;
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchActivityData初始化 无效activityInfo");
      }
    } else if (t.jRs) {
      this.lAu();
      this.Oou();
      this.qou();
      this.vEu();
      this.Gou();
      this.Fou();
      this.Nou();
      this.yEu();
      this.SEu();
      o = t.jRs;
      this.z$c = MathUtils_1.MathUtils.LongToNumber(o.F$c);
      this.J$c = MathUtils_1.MathUtils.LongToNumber(o.N$c);
      this.Z$c = o.G$c;
      this.UpdateFloroRanchDungeonUnlockTime();
      this.MEu(o.Giu);
      this.EEu(o.Niu);
      this._Au(o.Viu);
      this.IEu(o.m9c);
      this.TEu(o.Fiu);
      this.bEu(o.ysu);
      this.REu(o.Gwu);
      this.wEu(o.rEu);
      this.UpdateFloroRanchMilestoneDataList(o.$iu);
      this.cAu(o.qwu);
      this.UpdateFloroRanchSubDungeonRedDot(o.q$c);
      this.Lku = t.qiu;
      this.N9c = t.cru;
    }
  }
  GetExDataRedPointShowState() {
    return this.CheckRedDot();
  }
  CheckRedDot() {
    return !!this.IsUnLock() && (this.IsLimitTaskHasRedDot() || this.IsPermanentTaskHasRedDot() || this.IsDungeonHasRedDot());
  }
  Oou() {
    for (const a of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchCardConfigList()) {
      var t;
      var o = new FloroRanchCardData_1.FloroRanchCardData(a);
      this.Pou.set(a.Id, o);
      if (o.IsShowInHandBook) {
        t = a.Race;
        if (!this.nAu.has(t)) {
          this.nAu.set(t, []);
        }
        this.nAu.get(t).push(o);
      }
    }
  }
  MEu(t) {
    for (const o of t) {
      this.UpdateFloroRanchCardData(o);
    }
  }
  UpdateFloroRanchCardData(t) {
    var o = this.GetFloroRanchCardData(t.Z4n);
    if (o !== undefined) {
      o.UpdateUnLockState(t.MT_);
      o.ConditionId = t.iEu;
    }
  }
  GetFloroRanchCardData(t) {
    var o = this.Pou.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchCardData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchCardDataListByRace(t) {
    var o = this.nAu.get(t);
    if (o) {
      return o.sort((t, o) => t.IsUnLock !== o.IsUnLock ? t.IsUnLock ? -1 : 1 : t.GetCardRarity() !== o.GetCardRarity() ? t.GetCardRarity() - o.GetCardRarity() : t.Id - o.Id);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 71, "FloroRanchRaceId 无效", ["Id", t]);
    }
  }
  IsCardHasRedDot() {
    for (const t of this.Pou.values()) {
      if (!t.IsDefaultUnlock && t.IsUnLock) {
        if (!(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardRedDot) ?? new Set()).has(t.Id)) {
          return true;
        }
      }
    }
    return false;
  }
  qou() {
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchSkillConfigList()) {
      var t = new FloroRanchSkillData_1.FloroRanchSkillData(o);
      this.xou.set(o.Id, t);
    }
  }
  bEu(t) {
    for (const o of t) {
      this.UpdateFloroRanchSkillData(o);
    }
  }
  UpdateFloroRanchSkillData(t) {
    var o = this.GetFloroRanchSkillData(t.Z4n);
    if (o !== undefined) {
      o.UpdateUnLockState(t.MT_);
      o.ConditionId = t.iEu;
    }
  }
  GetFloroRanchSkillData(t) {
    var o = this.xou.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchSkillData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchSkillDataList() {
    if (!this.Wlo) {
      this.Wlo = [...this.xou.values()];
      this.Wlo.sort((t, o) => t.Id - o.Id);
    }
    return this.Wlo;
  }
  IsSkillHasRedDot() {
    for (const t of this.xou.values()) {
      if (t.IsUnLock) {
        if (!(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSkillRedDot) ?? new Set()).has(t.Id)) {
          return true;
        }
      }
    }
    return false;
  }
  SaveSkillRedDot() {
    for (const o of this.xou.values()) {
      var t;
      if (!!o.IsUnLock && !(t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSkillRedDot) ?? new Set()).has(o.Id)) {
        t.add(o.Id);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSkillRedDot, t);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FloroRanchDataRedDot);
  }
  vEu() {
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchRaceConfigList()) {
      var t = new FloroRanchRaceData_1.FloroRanchRaceData(o);
      this.cEu.set(o.Id, t);
    }
  }
  wEu(t) {
    for (const o of t) {
      this.UpdateFloroRanchRaceData(o);
    }
  }
  UpdateFloroRanchRaceData(t) {
    var o = this.GetFloroRanchRaceData(t.Z4n);
    if (o !== undefined) {
      o.UpdateUnLockState(t.MT_);
      o.ConditionId = t.iEu;
    }
  }
  GetFloroRanchRaceData(t) {
    var o = this.cEu.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 71, "FloroRanchRaceData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchRaceDataList(t = false) {
    if (!this.dEu || !this.mFu) {
      this.dEu = [];
      this.mFu = [];
      for (const o of this.cEu.values()) {
        if (!o.IsCommon) {
          this.dEu.push(o);
        }
        this.mFu.push(o);
      }
      this.dEu.sort((t, o) => t.Id - o.Id);
      this.mFu.sort((t, o) => t.Id - o.Id);
    }
    if (t) {
      return this.mFu;
    } else {
      return this.dEu;
    }
  }
  IsOtherRaceHasRedDot(t) {
    for (const o of this.cEu.values()) {
      if (!t.includes(o.Id)) {
        if (o.IsUnLock) {
          if (!(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchRaceRedDot) ?? new Set()).has(o.Id)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  Gou() {
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchToyConfigList()) {
      var t = new FloroRanchToyData_1.FloroRanchToyData(o);
      this.Uou.set(o.Id, t);
    }
  }
  EEu(t) {
    for (const o of t) {
      this.UpdateFloroRanchToyData(o);
    }
  }
  UpdateFloroRanchToyData(t) {
    var o = this.GetFloroRanchToyData(t.Z4n);
    if (o !== undefined) {
      o.UpdateUnLockState(t.MT_);
      o.ConditionId = t.iEu;
    }
  }
  GetFloroRanchToyData(t) {
    var o = this.Uou.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchToyData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchToyDataList() {
    this.mEu ||= [...this.Uou.values()];
    return this.mEu.sort((t, o) => t.IsUnLock !== o.IsUnLock ? t.IsUnLock ? -1 : 1 : t.GetCardRarity() !== o.GetCardRarity() ? t.GetCardRarity() - o.GetCardRarity() : t.IsAdaptAllRace !== o.IsAdaptAllRace ? t.IsAdaptAllRace ? -1 : 1 : t.Id - o.Id);
  }
  IsToyHasRedDot() {
    for (const t of this.Uou.values()) {
      if (t.ConditionId !== 0 && t.IsUnLock) {
        if (!(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchToyRedDot) ?? new Set()).has(t.Id)) {
          return true;
        }
      }
    }
    return false;
  }
  Fou() {
    for (const i of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchDungeonConfigList(this.Id)) {
      var t = new FloroRanchDungeonData_1.FloroRanchDungeonData(i);
      this.Dou.set(i.Id, t);
      for (const e of i.SubInsList) {
        var o;
        var a = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchSubDungeonConfig(e);
        if (a !== undefined) {
          (o = new FloroRanchSubDungeonData_1.FloroRanchSubDungeonData(a)).SetInstanceId(i.Id);
          this.Bou.set(a.Id, o);
          t.PushSubDungeonData(o);
        }
      }
    }
  }
  _Au(t) {
    for (const o of t) {
      this.UpdateFloroRanchDungeonUnLock(o);
    }
  }
  UpdateFloroRanchDungeonUnLock(t) {
    t = this.GetFloroRanchDungeonData(t);
    if (t !== undefined) {
      t.UpdateUnLockState(true);
    }
  }
  UpdateFloroRanchDungeonUnlockTime() {
    if (this.z$c !== 0) {
      for (const t of this.Dou.values()) {
        t.UnlockTime = this.z$c + t.DelayTime * TimeUtil_1.TimeUtil.OneDaySeconds;
      }
    }
  }
  IEu(t) {
    for (const o of t) {
      this.UpdateFloroRanchSubDungeonHistoryData(o);
    }
  }
  UpdateFloroRanchSubDungeonHistoryData(t) {
    var o = this.GetFloroRanchSubDungeonData(t.Qiu);
    if (o !== undefined) {
      o.UpdateHistoryData(t);
    }
  }
  cAu(t) {
    for (const o of t) {
      this.UpdateFloroRanchSubDungeon(o, false);
    }
  }
  UpdateFloroRanchSubDungeon(t, o = true) {
    var a = this.GetFloroRanchSubDungeonData(t.Z4n);
    if (a !== undefined && (a.UpdateUnLockState(t.MT_), a.ConditionId = t.iEu, a.IsFinished = t.eE_, o)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  UpdateFloroRanchSubDungeonRedDot(t) {
    for (const a of t) {
      var o = this.GetFloroRanchSubDungeonData(a);
      if (o !== undefined) {
        o.HasRedDot = false;
      }
    }
  }
  UpdateFloroRanchSubDungeonPass(t) {
    t = this.GetFloroRanchSubDungeonData(t);
    if (t !== undefined) {
      t.IsFinished = true;
    }
  }
  GetFloroRanchDungeonData(t) {
    var o = this.Dou.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchDungeonData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchSubDungeonData(t) {
    var o = this.Bou.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchSubDungeonData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchDungeonDataList() {
    if (!this.sAu) {
      this.sAu = [...this.Dou.values()];
      this.sAu.sort((t, o) => t.SortId - o.SortId);
    }
    return this.sAu;
  }
  GetFloroRanchSubDungeonDataList() {
    if (!this.Kou) {
      this.Kou = [...this.Bou.values()];
      this.Kou.sort((t, o) => t.Id - o.Id);
    }
    return this.Kou;
  }
  IsDungeonHasRedDot() {
    for (const t of this.Dou.values()) {
      if (t.HasRedDot) {
        return true;
      }
    }
    return false;
  }
  GetLatestUnlockSubDungeon() {
    var t = this.GetFloroRanchSubDungeonDataList();
    let o = t[0];
    for (const i of t) {
      var a = this.GetFloroRanchDungeonData(i.InstanceId);
      if (!i.IsUnLock || !a.IsUnLock) {
        return o;
      }
      o = i;
    }
    return o;
  }
  Nou() {
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchTechnologyConfigList(this.Id)) {
      var t = new FloroRanchTechnologyData_1.FloroRanchTechnologyData(o);
      this.kou.set(o.Id, t);
      this.AGu.push(t);
      this.yUu[t.Column] ||= [];
      this.yUu[t.Column].push(t);
    }
    for (const a of this.yUu) {
      a?.sort((t, o) => t.Row - o.Row);
    }
    this.AGu.sort((t, o) => t.Id - o.Id);
  }
  TEu(t) {
    for (const a of t) {
      var o = this.GetFloroRanchTechnologyData(a);
      if (o !== undefined) {
        o.UpdateUnLockState(true);
      }
    }
  }
  UpdateFloroRanchTechnologyData(t) {
    t = this.GetFloroRanchTechnologyData(t);
    if (t !== undefined) {
      t.UpdateUnLockState(true);
    }
  }
  GetFloroRanchTechnologyData(t) {
    var o = this.kou.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchTechnologyData 无效Id", ["Id", t]);
    }
  }
  GetTechnologyTreeList() {
    return this.yUu;
  }
  GetTechnologyProgress() {
    var t = this.kou.size;
    let o = 0;
    for (const a of this.kou.values()) {
      if (a.IsUnLock) {
        o += 1;
      }
    }
    return o + "/" + t;
  }
  GetTechnologyCoinNum() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.hAu.TechPointItem);
  }
  IsPreNodeAllUnlock(t) {
    for (const o of t.PreNode) {
      if (!this.GetFloroRanchTechnologyData(o)?.IsUnLock) {
        return false;
      }
    }
    return true;
  }
  HasAnyTechPointCanUnlock() {
    for (const t of this.kou.values()) {
      if (!t.IsUnLock && this.IsPreNodeAllUnlock(t)) {
        if (this.GetTechnologyCoinNum() >= t.Cost) {
          return true;
        }
      }
    }
    return false;
  }
  GetNextCanUnlockTechId() {
    let t = -1;
    for (const o of this.AGu) {
      if (t === -1 && !o.IsUnLock) {
        t = o.Id;
      }
      if (!o.IsUnLock && this.IsPreNodeAllUnlock(o)) {
        if (this.GetTechnologyCoinNum() >= o.Cost) {
          return o.Id;
        }
      }
    }
    if (t === -1) {
      return this.AGu[0].Id;
    } else {
      return t;
    }
  }
  yEu() {
    for (const a of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchTaskConfigList(this.Id)) {
      var t;
      var o = new FloroRanchTaskData_1.FloroRanchTaskData(a);
      if (o.IsLimitTime) {
        this.fEu.set(a.Id, o);
        (t = this.CEu.get(o.TabType) ?? []).push(o);
        this.CEu.set(o.TabType, t);
      } else {
        this.gEu.set(a.Id, o);
      }
    }
  }
  REu(t) {
    for (const o of t) {
      this.UpdateFloroRanchTaskData(o, false);
    }
  }
  UpdateFloroRanchTaskData(t, o = true) {
    var a = this.GetFloroRanchTaskData(t.s5n);
    if (a !== undefined && (a.Status = ActivityCommonDefine_1.taskStateResolver[t.H6n], a.Current = t.lMs, a.Target = t.j6n, o)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  GetFloroRanchTaskData(t) {
    let o = this.fEu.get(t);
    if (o !== undefined || (o = this.gEu.get(t)) !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 71, "FloroRanchTaskData 无效Id", ["Id", t]);
    }
  }
  GetTaskDataByTabType(t) {
    t = this.CEu.get(t) ?? [];
    t.sort(this.lVl);
    return t;
  }
  GetPermanentTaskData() {
    var t = [];
    for (const o of this.gEu.values()) {
      if (o.IsUnLock) {
        t.push(o);
      }
    }
    t.sort(this.lVl);
    return t;
  }
  GetFloroRanchReceivableTaskIds(t, o = 1) {
    var a = [];
    for (const i of t ? this.CEu.get(o) ?? [] : this.gEu.values()) {
      if (i.Status === 0) {
        a.push(i.Id);
      }
    }
    return a;
  }
  UpdateTaskRewardStatus(t) {
    for (const o of t) {
      this.GetFloroRanchTaskData(o).Status = 2;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  GetPermanentRewardProgress() {
    var t = this.gEu.size;
    let o = 0;
    for (const a of this.gEu.values()) {
      if (a.Status === 2) {
        o += 1;
      }
    }
    return o + "/" + t;
  }
  IsLimitTaskHasRedDot() {
    for (const t of this.fEu.values()) {
      if (t.Status === 0) {
        return true;
      }
    }
    for (const o of this.pEu.values()) {
      if (o.IsReceivable) {
        return true;
      }
    }
    return false;
  }
  IsPermanentTaskHasRedDot() {
    for (const t of this.gEu.values()) {
      if (t.Status === 0) {
        return true;
      }
    }
    return false;
  }
  IsTaskHasRedDotByTab(t) {
    for (const o of this.CEu.get(t) ?? []) {
      if (o.Status === 0) {
        return true;
      }
    }
    return false;
  }
  SEu() {
    var t = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchRewardConfigList(this.Id);
    var o = this.GetMilestoneItemCount();
    for (const i of t) {
      var a = new FloroRanchMilestoneData_1.FloroRanchMilestoneData(i);
      a.IsFinished = o >= a.Goal;
      this.pEu.set(i.Id, a);
    }
  }
  UpdateFloroRanchMilestoneDataList(t) {
    for (const a of t) {
      var o = this.GetFloroRanchMilestoneData(a);
      if (o !== undefined) {
        o.IsReceive = true;
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  GetFloroRanchMilestoneData(t) {
    var o = this.pEu.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 71, "FloroRanchMilestoneData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchMilestoneDataList() {
    if (!this.aAu) {
      this.aAu = [...this.pEu.values()];
      this.aAu.sort((t, o) => t.Id - o.Id);
    }
    return this.aAu;
  }
  GetFloroRanchReceivableMilestoneIds() {
    var t = [];
    for (const o of this.pEu.values()) {
      if (o.IsReceivable) {
        t.push(o.Id);
      }
    }
    return t;
  }
  UpdateFloroRanchMilestoneItemCount() {
    var t = this.GetMilestoneItemCount();
    for (const o of this.pEu.values()) {
      o.IsFinished = t >= o.Goal;
    }
  }
  lAu() {
    this.hAu = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchActivityConfig(this.Id);
  }
  GetFloroRanchParamConfig() {
    return this.hAu;
  }
  get CardLimitCount() {
    return this.GetFloroRanchParamConfig().AnimalNumLimit;
  }
  IsInLimitTime() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return t >= this.z$c && t <= this.J$c;
  }
  GetLimitTimeActivityEndTime() {
    return this.J$c;
  }
  ReadComic() {
    this.Z$c = true;
  }
  GetIsReadComic() {
    return this.Z$c;
  }
  GetUnlockNum(t) {
    let o = 0;
    for (const a of (t === 0 ? this.Pou : this.Uou).values()) {
      if (a.IsUnLock) {
        o += 1;
      }
    }
    return o;
  }
  GetTotalNum(t) {
    return (t === 0 ? this.Pou : this.Uou).size;
  }
  GetHandBookProgress() {
    return this.GetUnlockNum(0) + this.GetUnlockNum(1) + "/" + (this.GetTotalNum(0) + this.GetTotalNum(1));
  }
  IsHandBookHasRedDot() {
    return this.IsToyHasRedDot() || this.IsCardHasRedDot();
  }
  HasUnFinishedSubIns() {
    return this.Lku !== 0;
  }
  SetUnFinishedSubDungeonId(t) {
    this.Lku = t;
  }
  ClearUnFinishedSubDungeonId() {
    this.Lku = 0;
    this.N9c = 0;
  }
  SetSavedStage(t) {
    this.N9c = t;
  }
  GetSavedStage() {
    return this.N9c;
  }
  GetUnFinishedSubDungeonData() {
    if (this.Lku !== 0) {
      return this.GetFloroRanchSubDungeonData(this.Lku);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 71, "不存在未完成的关卡");
    }
  }
  GetRecommendQuestLinkId() {
    var o = [this.hAu.RecommendQuestId, ...this.hAu.RecommendQuestLinkList];
    for (let t = o.length - 1; t >= 0; --t) {
      var a = o[t];
      var i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(a);
      var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(a);
      var e = e === 2 || e === 1;
      if (i && i.CanShowInUiPanel() && e) {
        return a;
      }
    }
  }
  IsRecommendQuestFinished() {
    var t = this.hAu.RecommendQuestId;
    return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(t);
  }
}
exports.FloroRanchActivityData = FloroRanchActivityData;
//# sourceMappingURL=FloroRanchActivityData.js.map