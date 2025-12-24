"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryActivityData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityData_1 = require("../../Activity/ActivityData");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryAreaData_1 = require("./HonamiStoryAreaData");
const HonamiStoryItemCollectionData_1 = require("./HonamiStoryItemCollectionData");
const HonamiStoryLimitTaskData_1 = require("./HonamiStoryLimitTaskData");
const HonamiStoryMascotData_1 = require("./HonamiStoryMascotData");
const HonamiStoryPermanentTaskData_1 = require("./HonamiStoryPermanentTaskData");
const HonamiStoryQuestData_1 = require("./HonamiStoryQuestData");
const HonamiStoryScoreRewardData_1 = require("./HonamiStoryScoreRewardData");
class HonamiStoryActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.o5d = new Map();
    this.zOl = [];
    this.Xcm = new Map();
    this.n5d = new Map();
    this.s5d = [];
    this.LEu = new Map();
    this.wEu = new Map();
    this.CYd = new Map();
    this.oDm = new Map();
    this.nDm = [];
    this.u5d = new Map();
    this.CurTarget = 0;
    this.CurHonamiLv = 0;
    this.CurTowerLv = 0;
  }
  OnInit(t) {
    t = t.I$d;
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 58, "HonamiStoryActivityData初始化 无效activityInfo");
      }
    } else {
      ModelManager_1.ModelManager.HonamiStoryModel.InitActivityInfo(this.Id, t);
      this.uQd();
      this.cQd();
      this.twm();
      this.dQd();
      this.pYd();
      this.g5d();
      this.InitSubQuestTaskDataList(t.C4d);
      this.UpdateHonamiStoryAreaDataList(t.w$d);
      this.UpdateHonamiStoryMascotDataList(t.R$d);
      this.UpdatePermanentTaskDataList(t.HTm);
      this.UpdateLimitTaskDataList(t.L$d);
      this.UpdateScoreRewardDataList(t.P$d);
      this.UpdateItemCollectionDataList(t.b$d);
      this.RefreshTowerData(t.i1m);
      this.ozm();
    }
  }
  PhraseEx(t) {
    t = t.I$d;
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 58, "HonamiStoryActivityDataPhrase 无效activityInfo");
      }
    } else {
      ModelManager_1.ModelManager.HonamiStoryModel.UpdateActivityInfo(this.Id, t);
      this.UpdateHonamiStoryAreaDataList(t.w$d);
      this.UpdateHonamiStoryMascotDataList(t.R$d);
      this.UpdatePermanentTaskDataList(t.HTm);
      this.UpdateLimitTaskDataList(t.L$d);
      this.UpdateScoreRewardDataList(t.P$d);
      this.UpdateItemCollectionDataList(t.b$d);
      this.UpdateSubQuestTaskDataList(t.C4d);
      this.RefreshTowerData(t.i1m);
      ModelManager_1.ModelManager.HonamiStoryModel.SetTotalRevenueInternal(t.$Tm);
    }
  }
  GetExDataRedPointShowState() {
    return this.CheckAllFunctionRedDot();
  }
  CheckAllFunctionRedDot() {
    if (this.IsUnLock()) {
      let t = this.IsLimitTaskHasRedDot() || this.IsPermanentTaskHasRedDot();
      if (t) {
        return t;
      }
      if (ModelManager_1.ModelManager.FunctionModel?.IsOpen(10116) && (t = this.CanMascotCollectGetReward() || this.CanAreaCollectGetReward())) {
        return t;
      }
      if (ModelManager_1.ModelManager.FunctionModel?.IsOpen(10123)) {
        var a = (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryWeaponUnlockSet) ?? new Set()).size > 0;
        if (t = a) {
          return t;
        }
      }
    }
    return false;
  }
  uQd() {
    for (const a of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryAreaConfigList(this.Id)) {
      var t = new HonamiStoryAreaData_1.HonamiStoryAreaData(a.Id);
      this.o5d.set(a.Id, t);
      this.zOl.push(t);
    }
  }
  UpdateHonamiStoryAreaDataList(t) {
    for (const a of t) {
      this.UpdateHonamiStoryAreaData(a);
    }
  }
  UpdateHonamiStoryAreaData(t) {
    var a = this.GetHonamiStoryAreaData(t.$$d);
    if (a !== undefined) {
      a.UpdateData(t);
    }
  }
  GetHonamiStoryAreaData(t) {
    var a = this.o5d.get(t);
    if (a !== undefined) {
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryAreaData 无效Id", ["Id", t]);
    }
  }
  GetHonamiStoryAreaDataList() {
    if (this.zOl.length === 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryAreaDataList为空");
    }
    return this.zOl;
  }
  GetHonamiStoryMascotAreaDataList() {
    var t = [];
    for (const a of this.zOl) {
      if (a.Id !== HonamiStoryDefine_1.HONAMI_DUNGEON_DEFAULT_AREA_ID && this.GetHonamiStoryMascotDataListByAreaId(a.Id).length !== 0) {
        t.push(a);
      }
    }
    return t;
  }
  GetCurrentProgressAreaDataId() {
    var t = this.GetHonamiStoryAreaDataList();
    if (t.length <= 0) {
      return 1;
    }
    for (const a of t) {
      if (a.GetAreaState !== 2) {
        return a.Id;
      }
    }
    return t[t.length - 1].Id;
  }
  IsAllAreaPass() {
    var t = this.GetHonamiStoryAreaDataList();
    var a = t.length;
    let r = 0;
    for (const e of t) {
      if (e.GetAreaState !== 2) {
        break;
      }
      r += 1;
    }
    return a > 0 && r === a;
  }
  CanAreaCollectGetReward() {
    for (const t of this.zOl) {
      if (t.IsAreaUnlock && t.IsSecretFinished) {
        return true;
      }
    }
    return false;
  }
  RefreshTowerData(t) {
    for (const a of t) {
      this.Xcm.set(a.G4d, a.J0c);
    }
  }
  GetMaxFloorByDangerLv(t) {
    return this.Xcm.get(t) ?? 0;
  }
  cQd() {
    for (const a of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryMascotConfigList(this.Id)) {
      var t = new HonamiStoryMascotData_1.HonamiStoryMascotData(a.Id);
      this.n5d.set(a.Id, t);
      this.s5d.push(t);
    }
  }
  UpdateHonamiStoryMascotDataList(t) {
    for (const a of t) {
      this.UpdateHonamiStoryMascotData(a);
    }
  }
  UpdateHonamiStoryMascotData(t) {
    var a = this.GetHonamiStoryMascotData(t.H$d);
    if (a !== undefined) {
      a.UpdateState(t.H6n);
    }
  }
  GetHonamiStoryMascotData(t) {
    var a = this.n5d.get(t);
    if (a !== undefined) {
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryMascotData 无效Id", ["Id", t]);
    }
  }
  GetHonamiStoryMascotDataListByAreaId(t) {
    var a = [];
    for (const r of this.s5d) {
      if (r.AreaId === t) {
        a.push(r);
      }
    }
    return a;
  }
  CanMascotCollectGetReward() {
    for (const t of this.s5d) {
      if (t.State === 1) {
        return true;
      }
    }
    return false;
  }
  CheckMascotCollectFinished() {
    for (const t of this.s5d) {
      if (t.State === 0) {
        return false;
      }
    }
    return true;
  }
  twm() {
    for (const a of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryPermanentTaskConfigList(this.Id)) {
      var t = new HonamiStoryPermanentTaskData_1.HonamiStoryPermanentTaskData(a.Id);
      this.LEu.set(a.Id, t);
    }
  }
  UpdatePermanentTaskDataList(t) {
    for (const a of t) {
      this.UpdatePermanentTaskData(a);
    }
  }
  UpdatePermanentTaskData(t) {
    var a = this.GetPermanentTaskData(t.s5n);
    if (a !== undefined) {
      a.UpdateData(t);
    }
  }
  GetPermanentTaskData(t) {
    var a = this.LEu.get(t);
    if (a !== undefined) {
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryPermanentTaskData 无效Id", ["Id", t]);
    }
  }
  GetPermanentTaskDataList() {
    const r = [];
    this.LEu.forEach((t, a) => {
      r.push(t);
    });
    r.sort((t, a) => t.Status !== a.Status ? t.Status - a.Status : t.Id - a.Id);
    return r;
  }
  GetPermanentTaskIdsByState(r) {
    const e = [];
    this.LEu.forEach((t, a) => {
      if (t.Status === r) {
        e.push(a);
      }
    });
    return e;
  }
  GetPermanentTaskTotalNum() {
    return this.LEu.size;
  }
  IsPermanentTaskHasRedDot() {
    for (const t of this.LEu.values()) {
      if (t.Status === 0) {
        return true;
      }
    }
    return false;
  }
  dQd() {
    for (const a of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryLimitTaskConfigList(this.Id)) {
      var t = new HonamiStoryLimitTaskData_1.HonamiStoryLimitTaskData(a.Id);
      this.wEu.set(a.Id, t);
    }
  }
  UpdateLimitTaskDataList(t) {
    for (const a of t) {
      this.UpdateLimitTaskData(a);
    }
  }
  UpdateLimitTaskData(t) {
    var a = this.GetLimitTaskData(t.s5n);
    if (a !== undefined) {
      a.UpdateData(t);
    }
  }
  GetLimitTaskData(t) {
    var a = this.wEu.get(t);
    if (a !== undefined) {
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryLimitTaskData 无效Id", ["Id", t]);
    }
  }
  GetLimitTaskDataList() {
    const r = [];
    this.wEu.forEach((t, a) => {
      r.push(t);
    });
    r.sort((t, a) => t.Status !== a.Status ? t.Status - a.Status : t.Id - a.Id);
    return r;
  }
  GetFinishedLimitTaskIds() {
    const r = [];
    this.wEu.forEach((t, a) => {
      if (t.Status === 0) {
        r.push(a);
      }
    });
    return r;
  }
  IsLimitTaskHasRedDot() {
    for (const t of this.wEu.values()) {
      if (t.Status === 0) {
        return true;
      }
    }
    for (const a of this.CYd.values()) {
      if (a.State === 1) {
        return true;
      }
    }
    return false;
  }
  pYd() {
    for (const a of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryScoreRewardConfigList(this.Id)) {
      var t = new HonamiStoryScoreRewardData_1.HonamiStoryScoreRewardData(a.Id);
      this.CYd.set(a.Id, t);
    }
  }
  UpdateScoreRewardDataList(t) {
    for (const a of t) {
      this.UpdateScoreRewardData(a);
    }
  }
  UpdateScoreRewardData(t) {
    var a = this.CYd.get(t.q4d);
    if (a) {
      a.UpdateState(t.H6n);
    }
  }
  GetScoreRewardData(t) {
    return this.CYd.get(t);
  }
  GetScoreRewardDataList() {
    const r = [];
    this.CYd.forEach((t, a) => {
      r.push(t);
    });
    return r;
  }
  GetFinishedScoreRewardIds() {
    const r = [];
    this.CYd.forEach((t, a) => {
      if (t.State === 1) {
        r.push(a);
      }
    });
    return r;
  }
  GetCurrentScore() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.Lo.ScoreItemId);
  }
  GetMaxScore() {
    let t = 0;
    for (const a of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryScoreRewardConfigList(this.Id)) {
      if (t < a.Score) {
        t = a.Score;
      }
    }
    return t;
  }
  InitSubQuestTaskDataList(t) {
    this.oDm.clear();
    this.nDm.length = 0;
    for (const r of t) {
      var a = new HonamiStoryQuestData_1.HonamiStorySubQuestData(r.s5n);
      this.oDm.set(r.s5n, a);
      this.nDm.push(a);
      a.UpdateData(r);
    }
  }
  UpdateSubQuestTaskDataList(t) {
    for (const a of t) {
      this.UpdateSubQuestTaskData(a);
    }
  }
  UpdateSubQuestTaskData(t) {
    var a = this.GetSubQuestTaskData(t.s5n);
    if (a !== undefined) {
      a.UpdateData(t);
    }
  }
  GetSubQuestTaskData(t) {
    var a = this.oDm.get(t);
    if (a !== undefined) {
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryAreaTaskData 无效Id", ["Id", t]);
    }
  }
  GetSubQuestTaskDataList() {
    return this.nDm;
  }
  g5d() {
    for (const a of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryItemCollectionConfigList(this.Id)) {
      var t = new HonamiStoryItemCollectionData_1.HonamiStoryItemCollectionData(a);
      this.u5d.set(a.ItemId, t);
    }
  }
  UpdateItemCollectionDataList(t) {
    for (const r of t) {
      var a = this.GetItemCollectionData(r.A$d);
      if (a !== undefined) {
        a.UpdateData(r);
      }
    }
  }
  GetItemCollectionData(t) {
    var a = this.u5d.get(t);
    if (a !== undefined) {
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryItemCollectionData 无效Id", ["Id", t]);
    }
  }
  GetItemCollectionDataList() {
    return Array.from(this.u5d.values());
  }
  IsItemCollectionHasRedDot() {
    for (const t of this.u5d.values()) {
      if (t.State === 1) {
        return true;
      }
    }
    return false;
  }
  ozm() {
    this.CurHonamiLv = this.Lo?.OriAreaDangerLevel ?? 0;
    this.CurTowerLv = this.Lo?.OriTopTowerDangerLevel ?? 0;
  }
  IsLevelSelectHasViewRedDot() {
    var t;
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10121)) {
      return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTogRedDot) ?? false;
    } else {
      return !!((t = this.GetCurrentProgressAreaDataId()) <= this.GetHonamiStoryAreaDataList().length) && !!this.GetHonamiStoryAreaData(t).IsAreaCanEnter;
    }
  }
  get Lo() {
    return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(this.Id);
  }
  get HelpId() {
    return this.Lo.HelpId;
  }
  get MarkId() {
    return this.Lo.MarkId;
  }
  get ShopId() {
    return this.Lo.ShopId;
  }
  get GetActHelpId() {
    return this.Lo.HelpId;
  }
  get ActivityQuestId() {
    return this.Lo.MainQuestId;
  }
  get AreaInstId() {
    return this.Lo.AreaInstId;
  }
  get OutCoinItemId() {
    return this.Lo.OutCoinItemId;
  }
  get TowerName() {
    return this.Lo.TowerName;
  }
}
exports.HonamiStoryActivityData = HonamiStoryActivityData;
//# sourceMappingURL=HonamiStoryActivityData.js.map