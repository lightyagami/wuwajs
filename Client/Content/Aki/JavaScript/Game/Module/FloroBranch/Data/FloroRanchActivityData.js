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
    this.rnu = new Map();
    this.xAu = new Map();
    this.onu = new Map();
    this.Wlo = undefined;
    this.TEu = new Map();
    this.bEu = undefined;
    this.u4u = undefined;
    this.nnu = new Map();
    this.REu = undefined;
    this.snu = new Map();
    this.anu = new Map();
    this.UAu = undefined;
    this.ynu = undefined;
    this.hnu = new Map();
    this.T3u = [];
    this.WUu = [];
    this.wEu = new Map();
    this.LEu = new Map();
    this.AEu = new Map();
    this.lVl = (t, o) => t.Status !== o.Status ? t.Status - o.Status : t.Id - o.Id;
    this.PEu = new Map();
    this.DAu = undefined;
    this.GetMilestoneItemCount = () => {
      return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.BAu.MilestoneItemId);
    };
    this.BAu = undefined;
    this.vjc = 0;
    this.yjc = 0;
    this.Sjc = false;
    this.g2u = 0;
    this.w$u = 0;
  }
  OnInit(t) {
    var o;
    var t = t.lru;
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchActivityData初始化 无效activityInfo");
      }
    } else if (t.jRs) {
      this.kAu();
      this.lnu();
      this._nu();
      this.xEu();
      this.unu();
      this.cnu();
      this.dnu();
      this.UEu();
      this.DEu();
      o = t.jRs;
      this.vjc = MathUtils_1.MathUtils.LongToNumber(o.QZu);
      this.yjc = MathUtils_1.MathUtils.LongToNumber(o.KZu);
      this.Sjc = o.WZu;
      this.BEu(o.uru);
      this.kEu(o.dru);
      this.OAu(o.Fld);
      this.OEu(o.q9u);
      this.qEu(o.cru);
      this.GEu(o.Wsu);
      this.FEu(o.nAu);
      this.NEu(o.mEu);
      this.UpdateFloroRanchMilestoneDataList(o.Cru);
      this.GAu(o.oAu);
      this.UpdateFloroRanchSubDungeonRedDot(o.$Zu);
      this.g2u = t._ru;
      this.w$u = t.Gru;
    }
  }
  GetExDataRedPointShowState() {
    return this.CheckRedDot();
  }
  CheckRedDot() {
    return !!this.IsUnLock() && (this.TimeType === 0 && !!this.IsLimitTaskHasRedDot() || this.IsPermanentTaskHasRedDot() || this.IsDungeonHasRedDot());
  }
  lnu() {
    for (const a of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchCardConfigList()) {
      var t;
      var o = new FloroRanchCardData_1.FloroRanchCardData(a);
      this.rnu.set(a.Id, o);
      if (o.IsShowInHandBook) {
        t = a.Race;
        if (!this.xAu.has(t)) {
          this.xAu.set(t, []);
        }
        this.xAu.get(t).push(o);
      }
    }
  }
  BEu(t) {
    for (const o of t) {
      this.UpdateFloroRanchCardData(o);
    }
  }
  UpdateFloroRanchCardData(t) {
    var o = this.GetFloroRanchCardData(t.Z4n);
    if (o !== undefined) {
      o.UpdateUnLockState(t.MT_);
      o.ConditionId = t.dEu;
    }
  }
  GetFloroRanchCardData(t) {
    var o = this.rnu.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchCardData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchCardDataListByRace(t) {
    var o = this.xAu.get(t);
    if (o) {
      return o.sort((t, o) => t.IsUnLock !== o.IsUnLock ? t.IsUnLock ? -1 : 1 : t.GetRarity() !== o.GetRarity() ? t.GetRarity() - o.GetRarity() : t.Id - o.Id);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 71, "FloroRanchRaceId 无效", ["Id", t]);
    }
  }
  IsCardHasRedDot() {
    for (const t of this.rnu.values()) {
      if (!t.IsDefaultUnlock && t.IsUnLock) {
        if (!(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardRedDot) ?? new Set()).has(t.Id)) {
          return true;
        }
      }
    }
    return false;
  }
  _nu() {
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchSkillConfigList()) {
      var t = new FloroRanchSkillData_1.FloroRanchSkillData(o);
      this.onu.set(o.Id, t);
    }
  }
  GEu(t) {
    for (const o of t) {
      this.UpdateFloroRanchSkillData(o);
    }
  }
  UpdateFloroRanchSkillData(t) {
    var o = this.GetFloroRanchSkillData(t.Z4n);
    if (o !== undefined) {
      o.UpdateUnLockState(t.MT_);
      o.ConditionId = t.dEu;
    }
  }
  GetFloroRanchSkillData(t) {
    var o = this.onu.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchSkillData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchSkillDataList() {
    if (!this.Wlo) {
      this.Wlo = [...this.onu.values()];
      this.Wlo.sort((t, o) => t.Id - o.Id);
    }
    return this.Wlo;
  }
  IsSkillHasRedDot() {
    for (const t of this.onu.values()) {
      if (t.IsUnLock) {
        if (!(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSkillRedDot) ?? new Set()).has(t.Id)) {
          return true;
        }
      }
    }
    return false;
  }
  SaveSkillRedDot() {
    for (const o of this.onu.values()) {
      var t;
      if (!!o.IsUnLock && !(t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSkillRedDot) ?? new Set()).has(o.Id)) {
        t.add(o.Id);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSkillRedDot, t);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FloroRanchDataRedDot);
  }
  xEu() {
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchRaceConfigList()) {
      var t = new FloroRanchRaceData_1.FloroRanchRaceData(o);
      this.TEu.set(o.Id, t);
    }
  }
  NEu(t) {
    for (const o of t) {
      this.UpdateFloroRanchRaceData(o);
    }
  }
  UpdateFloroRanchRaceData(t) {
    var o = this.GetFloroRanchRaceData(t.Z4n);
    if (o !== undefined) {
      o.UpdateUnLockState(t.MT_);
      o.ConditionId = t.dEu;
    }
  }
  GetFloroRanchRaceData(t) {
    var o = this.TEu.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 71, "FloroRanchRaceData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchRaceDataList(t = false) {
    if (!this.bEu || !this.u4u) {
      this.bEu = [];
      this.u4u = [];
      for (const o of this.TEu.values()) {
        if (!o.IsCommon) {
          this.bEu.push(o);
        }
        this.u4u.push(o);
      }
      this.bEu.sort((t, o) => t.Id - o.Id);
      this.u4u.sort((t, o) => t.Id - o.Id);
    }
    if (t) {
      return this.u4u;
    } else {
      return this.bEu;
    }
  }
  IsOtherRaceHasRedDot(t) {
    for (const o of this.TEu.values()) {
      if (!t.includes(o.Id) && !o.IsCommon) {
        if (o.IsUnLock) {
          if (!(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchRaceRedDot) ?? new Set()).has(o.Id)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  unu() {
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchToyConfigList()) {
      var t = new FloroRanchToyData_1.FloroRanchToyData(o);
      this.nnu.set(o.Id, t);
    }
  }
  kEu(t) {
    for (const o of t) {
      this.UpdateFloroRanchToyData(o);
    }
  }
  UpdateFloroRanchToyData(t) {
    var o = this.GetFloroRanchToyData(t.Z4n);
    if (o !== undefined) {
      o.UpdateUnLockState(t.MT_);
      o.ConditionId = t.dEu;
    }
  }
  GetFloroRanchToyData(t) {
    var o = this.nnu.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchToyData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchToyDataList() {
    this.REu ||= [...this.nnu.values()];
    return this.REu.sort((t, o) => t.IsUnLock !== o.IsUnLock ? t.IsUnLock ? -1 : 1 : t.GetRarity() !== o.GetRarity() ? t.GetRarity() - o.GetRarity() : t.IsAdaptAllRace !== o.IsAdaptAllRace ? t.IsAdaptAllRace ? -1 : 1 : t.Id - o.Id);
  }
  IsToyHasRedDot() {
    for (const t of this.nnu.values()) {
      if (t.ConditionId !== 0 && t.IsUnLock) {
        if (!(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchToyRedDot) ?? new Set()).has(t.Id)) {
          return true;
        }
      }
    }
    return false;
  }
  cnu() {
    for (const i of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchDungeonConfigList(this.Id)) {
      var t = new FloroRanchDungeonData_1.FloroRanchDungeonData(i);
      this.snu.set(i.Id, t);
      for (const e of i.SubInsList) {
        var o;
        var a = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchSubDungeonConfig(e);
        if (a !== undefined) {
          (o = new FloroRanchSubDungeonData_1.FloroRanchSubDungeonData(a)).SetInstanceId(i.Id);
          this.anu.set(a.Id, o);
          t.PushSubDungeonData(o);
        }
      }
    }
  }
  OAu(t) {
    for (const o of t) {
      this.UpdateFloroRanchDungeonUnLock(o);
    }
  }
  UpdateFloroRanchDungeonUnLock(t) {
    var o = this.GetFloroRanchDungeonData(t.Z4n);
    if (o !== undefined) {
      o.UpdateUnLockState(t.MT_);
      o.ConditionId = t.dEu;
    }
  }
  OEu(t) {
    for (const o of t) {
      this.UpdateFloroRanchSubDungeonHistoryData(o);
    }
  }
  UpdateFloroRanchSubDungeonHistoryData(t) {
    var o = this.GetFloroRanchSubDungeonData(t.vru);
    if (o !== undefined) {
      o.UpdateHistoryData(t);
    }
  }
  GAu(t) {
    for (const o of t) {
      this.UpdateFloroRanchSubDungeon(o, false);
    }
  }
  UpdateFloroRanchSubDungeon(t, o = true) {
    var a = this.GetFloroRanchSubDungeonData(t.Z4n);
    if (a !== undefined && (a.UpdateUnLockState(t.MT_), a.ConditionId = t.dEu, a.IsFinished = t.eE_, o)) {
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
    var o = this.snu.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchDungeonData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchSubDungeonData(t) {
    var o = this.anu.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchSubDungeonData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchDungeonDataList() {
    if (!this.UAu) {
      this.UAu = [...this.snu.values()];
      this.UAu.sort((t, o) => t.SortId - o.SortId);
    }
    return this.UAu;
  }
  GetFloroRanchSubDungeonDataList() {
    if (!this.ynu) {
      this.ynu = [...this.anu.values()];
      this.ynu.sort((t, o) => t.Id - o.Id);
    }
    return this.ynu;
  }
  IsDungeonHasRedDot() {
    for (const t of this.snu.values()) {
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
  dnu() {
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchTechnologyConfigList(this.Id)) {
      var t = new FloroRanchTechnologyData_1.FloroRanchTechnologyData(o);
      this.hnu.set(o.Id, t);
      this.T3u.push(t);
      this.WUu[t.Column] ||= [];
      this.WUu[t.Column].push(t);
    }
    for (const a of this.WUu) {
      a?.sort((t, o) => t.Row - o.Row);
    }
    this.T3u.sort((t, o) => t.Id - o.Id);
  }
  qEu(t) {
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
    var o = this.hnu.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchTechnologyData 无效Id", ["Id", t]);
    }
  }
  GetTechnologyTreeList() {
    return this.WUu;
  }
  GetTechnologyProgress() {
    var t = this.hnu.size;
    let o = 0;
    for (const a of this.hnu.values()) {
      if (a.IsUnLock) {
        o += 1;
      }
    }
    return o + "/" + t;
  }
  GetTechnologyCoinNum() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.BAu.TechPointItem);
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
    for (const t of this.hnu.values()) {
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
    for (const o of this.T3u) {
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
      return this.T3u[0].Id;
    } else {
      return t;
    }
  }
  UEu() {
    for (const a of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchTaskConfigList(this.Id)) {
      var t;
      var o = new FloroRanchTaskData_1.FloroRanchTaskData(a);
      if (o.IsLimitTime) {
        this.wEu.set(a.Id, o);
        (t = this.AEu.get(o.TabType) ?? []).push(o);
        this.AEu.set(o.TabType, t);
      } else {
        this.LEu.set(a.Id, o);
      }
    }
  }
  FEu(t) {
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
    let o = this.wEu.get(t);
    if (o !== undefined || (o = this.LEu.get(t)) !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 71, "FloroRanchTaskData 无效Id", ["Id", t]);
    }
  }
  GetTaskDataByTabType(t) {
    t = this.AEu.get(t) ?? [];
    t.sort(this.lVl);
    return t;
  }
  GetPermanentTaskData() {
    var t = [];
    for (const o of this.LEu.values()) {
      if (o.IsUnLock) {
        t.push(o);
      }
    }
    t.sort(this.lVl);
    return t;
  }
  GetFloroRanchReceivableTaskIds(t, o = 1) {
    var a = [];
    for (const i of t ? this.AEu.get(o) ?? [] : this.LEu.values()) {
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
    var t = this.LEu.size;
    let o = 0;
    for (const a of this.LEu.values()) {
      if (a.Status === 2) {
        o += 1;
      }
    }
    return o + "/" + t;
  }
  IsLimitTaskHasRedDot() {
    for (const t of this.wEu.values()) {
      if (t.Status === 0) {
        return true;
      }
    }
    for (const o of this.PEu.values()) {
      if (o.IsReceivable) {
        return true;
      }
    }
    return false;
  }
  IsPermanentTaskHasRedDot() {
    for (const t of this.LEu.values()) {
      if (t.Status === 0) {
        return true;
      }
    }
    return false;
  }
  IsTaskHasRedDotByTab(t) {
    for (const o of this.AEu.get(t) ?? []) {
      if (o.Status === 0) {
        return true;
      }
    }
    return false;
  }
  DEu() {
    var t = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchRewardConfigList(this.Id);
    var o = this.GetMilestoneItemCount();
    for (const i of t) {
      var a = new FloroRanchMilestoneData_1.FloroRanchMilestoneData(i);
      a.IsFinished = o >= a.Goal;
      this.PEu.set(i.Id, a);
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
    var o = this.PEu.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 71, "FloroRanchMilestoneData 无效Id", ["Id", t]);
    }
  }
  GetFloroRanchMilestoneDataList() {
    if (!this.DAu) {
      this.DAu = [...this.PEu.values()];
      this.DAu.sort((t, o) => t.Id - o.Id);
    }
    return this.DAu;
  }
  GetFloroRanchReceivableMilestoneIds() {
    var t = [];
    for (const o of this.PEu.values()) {
      if (o.IsReceivable) {
        t.push(o.Id);
      }
    }
    return t;
  }
  UpdateFloroRanchMilestoneItemCount() {
    var t = this.GetMilestoneItemCount();
    for (const o of this.PEu.values()) {
      o.IsFinished = t >= o.Goal;
    }
  }
  kAu() {
    this.BAu = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchActivityConfig(this.Id);
  }
  GetFloroRanchParamConfig() {
    return this.BAu;
  }
  get CardLimitCount() {
    return this.GetFloroRanchParamConfig().AnimalNumLimit;
  }
  IsInLimitTime() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return t >= this.vjc && t <= this.yjc;
  }
  GetLimitTimeActivityEndTime() {
    return this.yjc;
  }
  ReadComic() {
    this.Sjc = true;
  }
  GetIsReadComic() {
    return this.Sjc;
  }
  GetUnlockNum(t) {
    let o = 0;
    for (const a of (t === 0 ? this.rnu : this.nnu).values()) {
      if (a.IsUnLock) {
        o += 1;
      }
    }
    return o;
  }
  GetTotalNum(t) {
    return (t === 0 ? this.rnu : this.nnu).size;
  }
  GetHandBookProgress() {
    return this.GetUnlockNum(0) + this.GetUnlockNum(1) + "/" + (this.GetTotalNum(0) + this.GetTotalNum(1));
  }
  IsHandBookHasRedDot() {
    return this.IsToyHasRedDot() || this.IsCardHasRedDot();
  }
  HasUnFinishedSubIns() {
    return this.g2u !== 0;
  }
  SetUnFinishedSubDungeonId(t) {
    this.g2u = t;
  }
  ClearUnFinishedSubDungeonId() {
    this.g2u = 0;
    this.w$u = 0;
  }
  SetSavedStage(t) {
    this.w$u = t;
  }
  GetSavedStage() {
    return this.w$u;
  }
  GetUnFinishedSubDungeonData() {
    if (this.g2u !== 0) {
      return this.GetFloroRanchSubDungeonData(this.g2u);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 71, "不存在未完成的关卡");
    }
  }
  GetRecommendQuestLinkId() {
    var o = [this.BAu.RecommendQuestId, ...this.BAu.RecommendQuestLinkList];
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
    var t = this.BAu.RecommendQuestId;
    return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(t);
  }
}
exports.FloroRanchActivityData = FloroRanchActivityData;
//# sourceMappingURL=FloroRanchActivityData.js.map