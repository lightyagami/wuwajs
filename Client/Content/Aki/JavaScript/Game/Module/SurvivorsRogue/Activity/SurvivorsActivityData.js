"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsActivityData = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../Activity/ActivityCommonDefine");
const ActivityData_1 = require("../../Activity/ActivityData");
const SurvivorsActivityDefine_1 = require("./SurvivorsActivityDefine");
class SurvivorsActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.ActId = 0;
    this.RewardTaskMap = new Map();
    this.RewardType2TaskIdList = new Map();
    this.ox_ = new Map();
    this.MilestoneRewardMaxCount = 0;
    this.MilestoneItemId = 0;
    this.LevelMap = new Map();
    this.TalentNodeMap = new Map();
    this.TalentAreaMap = new Map();
    this.CurrentSelectNode = undefined;
    this.RoleMap = new Map();
    this.WeaponMap = new Map();
    this.ItemMap = new Map();
  }
  OnInit(t) {
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsActivityConfigByActivityId(this.Id);
    if (e) {
      this.ActId = e.Id;
      this.bfm();
      this.sx_();
      this.OKs();
      this.QSd();
      this.sGe();
      this.KSd();
    }
  }
  PhraseEx(t) {
    if (this.CheckIfInShowTime()) {
      ModelManager_1.ModelManager.SurvivorsRogueModel.SetCurrentActivityId(this.Id);
    }
    var e = t.LDd;
    if (e) {
      for (const i of e.ZBd) {
        this.LevelMap.set(i.gG_, i);
      }
      if (e.TDd) {
        for (const r of e.TDd.E$s) {
          this.RefreshRewardTaskData(r);
        }
      }
      for (const s of e.bOd) {
        this.RefreshGotMilestoneReward(s);
      }
      for (const n of e.zBd) {
        this.RoleMap.set(n, true);
      }
      for (const o of e.YBd) {
        this.WeaponMap.set(o, true);
      }
      for (const a of e.JBd) {
        this.ItemMap.set(a, true);
      }
      for (const h of Object.keys(e.Mqs)) {
        this.RefreshTalentTreeNode(Number(h), e.Mqs[h]);
      }
    }
  }
  GetExDataRedPointShowState() {
    return this.GetActivityRedDotState();
  }
  GetActivityRedDotState() {
    return this.GetActivityUnlockRedDotState() || this.GetRewardRedDotState() || this.GetLevelUnlockRedDotState();
  }
  GetActivityUnlockRedDotState() {
    for (const t of this.LevelMap.values()) {
      if (t.Qkd?.CM_) {
        return false;
      }
    }
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 0, 0, 0) === 0;
  }
  SaveCacheState(t, e, i = 0, r = 1) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, t, e, i) === r || (ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, t, e, i, r), false);
  }
  RefreshActivityRedDot() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  OnQuestStateChange(t, e) {
    if (!!this.LocalConfig.PreShowGuideQuest.includes(t) && !(e < Protocol_1.Aki.Protocol.hTs.a3_)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  get NotTipsEnterInst() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 6, 0, 0) === 1;
  }
  set NotTipsEnterInst(t) {
    this.SaveCacheState(6, 0, 0, t ? 1 : 0);
  }
  bfm() {
    for (const t of ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsTaskByActId(this.ActId)) {
      this.Rfm(t.Id);
    }
  }
  RefreshRewardTaskData(t) {
    let e = this.RewardTaskMap.get(t.s5n);
    (e = e || this.Rfm(t.s5n)).Refresh(t);
  }
  Rfm(t) {
    var e = new ActivityCommonDefine_1.ActivityTaskData();
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsTask(t)?.PageType ?? 0;
    e.TypeId = i;
    e.Id = t;
    this.RewardTaskMap.set(t, e);
    let r = this.RewardType2TaskIdList.get(i);
    (r = r || new Array()).push(t);
    this.RewardType2TaskIdList.set(i, r);
    return e;
  }
  SetRewardTaskDataDone(t) {
    this.RewardTaskMap.get(t).Status = 2;
  }
  GetFinishedRewardTaskCount() {
    let t = 0;
    for (const e of this.RewardTaskMap.values()) {
      if (e.Status === 2) {
        t++;
      }
    }
    return t;
  }
  GetRewardTaskDataListByTypeId(t) {
    var e = [];
    for (const r of this.RewardType2TaskIdList.get(t)) {
      var i = this.RewardTaskMap.get(r);
      e.push(i);
    }
    e.sort(this.lVl());
    return e;
  }
  GetTypeRedDotState(t) {
    t = this.RewardType2TaskIdList.get(t);
    if (t) {
      for (const e of t) {
        if (this.RewardTaskMap.get(e).Status === 0) {
          return true;
        }
      }
    }
    return false;
  }
  GetRewardRedDotState() {
    if (this.GetAllAvailableGetMilestoneRewardIds().length > 0) {
      return true;
    }
    for (const t of this.RewardTaskMap.values()) {
      if (t.Status === 0) {
        return true;
      }
    }
    return false;
  }
  lVl() {
    return (t, e) => {
      var i;
      var r;
      if (t.Status === e.Status) {
        i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsTask(t.Id);
        r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsTask(e.Id);
        if (i.SortId === r.SortId) {
          return t.Id - e.Id;
        } else {
          return i.SortId - r.SortId;
        }
      } else {
        return t.Status - e.Status;
      }
    };
  }
  GetAvailableGetTaskRewardIdsByType(t) {
    var e = [];
    var t = this.RewardType2TaskIdList.get(t);
    if (t) {
      for (const i of t) {
        if (this.RewardTaskMap.get(i).Status === 0) {
          e.push(i);
        }
      }
    }
    return e;
  }
  sx_() {
    var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsActivityConfigByActivityId(this.Id);
    this.MilestoneItemId = t.ScoreItemId;
    this.ox_.clear();
    let e = -1;
    for (const r of ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetAllSurvivorsScoreRewardByActId(this.ActId)) {
      var i = new SurvivorsActivityDefine_1.SurvivorsMilestoneData(r.Id, r.Index, r.Score, r.DropId);
      this.ox_.set(r.Id, i);
      e = Math.max(e, r.Score);
    }
    this.MilestoneRewardMaxCount = e;
  }
  RefreshGotMilestoneReward(t) {
    t = this.ox_.get(t);
    if (t) {
      t.IsGot = true;
    }
  }
  GetMilestoneItemCount() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.MilestoneItemId);
  }
  GetAllMilestoneReward() {
    return Array.from(this.ox_.values()).sort((t, e) => t.SortId - e.SortId);
  }
  GetAllAvailableGetMilestoneRewardIds() {
    var t;
    var e;
    var i = [];
    var r = this.GetMilestoneItemCount();
    for ([t, e] of this.ox_.entries()) {
      if (e.IsReceivable(r)) {
        i.push(t);
      }
    }
    return i;
  }
  GetAllLevelId() {
    return Array.from(this.LevelMap.keys()).sort((t, e) => t - e);
  }
  GetCurrentLevelInfoByLevelId(t) {
    var e = this.LevelMap.get(t);
    if (e) {
      t = this.IsEndlessMode(t);
      if (!t || e.Kkd) {
        return {
          LevelId: e.gG_,
          OpenTime: Number(MathUtils_1.MathUtils.LongToBigInt(e.pDs)),
          IsEndlessMode: t,
          Info: t ? e.Kkd : e.Qkd
        };
      }
    }
  }
  IsEndlessMode(t) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 3, t, 0) === 1;
  }
  GetLevelUnlockRedDotState() {
    if (this.GetPreGuideQuestFinishState()) {
      for (const t of this.LevelMap.values()) {
        if (this.uOd(t)) {
          return true;
        }
      }
    }
    return false;
  }
  uOd(t) {
    var e = t.Qkd;
    if (e && this.GetLevelUnlockState(t.gG_, false) && !e.CM_ && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 1, t.gG_, 0) === 0) {
      return true;
    }
    e = t.Kkd;
    if (e && this.GetLevelUnlockState(t.gG_, true) && !e.vDd && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 1, t.gG_, 1) === 0) {
      return true;
    }
    return false;
  }
  TryRemoveLevelNewUnlock(t, e) {
    if (this.LevelMap.get(t)) {
      if (e) {
        if (this.GetLevelUnlockState(t, true)) {
          return !this.SaveCacheState(1, t, 1);
        }
      } else if (this.GetLevelUnlockState(t, false)) {
        return !this.SaveCacheState(1, t, 0);
      }
    }
    return false;
  }
  TryRemoveLevelNewFinished(t) {
    var e = this.LevelMap.get(t);
    return !!e && !!e.Qkd?.CM_ && !this.SaveCacheState(5, t, 0);
  }
  IsEndlessFirstOpenCheck() {
    let t = false;
    for (const e of this.LevelMap.values()) {
      if (this.GetLevelUnlockState(e.gG_, true)) {
        t = true;
        break;
      }
    }
    return !!t && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 4, 0, 0) === 0;
  }
  GetLevelUnlockRemainTime(t) {
    t = this.LevelMap.get(t);
    if (t) {
      t = Number(MathUtils_1.MathUtils.LongToBigInt(t.pDs));
      if (!(t <= TimeUtil_1.TimeUtil.GetServerTime())) {
        return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(t - TimeUtil_1.TimeUtil.GetServerTime()).CountDownText;
      }
    }
  }
  GetLevelTimeUnlockState(t) {
    t = this.LevelMap.get(t);
    return !!t && Number(MathUtils_1.MathUtils.LongToBigInt(t.pDs)) <= TimeUtil_1.TimeUtil.GetServerTime();
  }
  GetLevelUnlockState(t, e) {
    t = this.LevelMap.get(t);
    if (!t) {
      return false;
    }
    let i = false;
    return !!(i = (e && t.Kkd ? t.Kkd : t.Qkd).K6n) && Number(MathUtils_1.MathUtils.LongToBigInt(t.pDs)) <= TimeUtil_1.TimeUtil.GetServerTime();
  }
  GetFocusLevelId() {
    var t = this.GetAllLevelId();
    let e = t[0];
    for (const s of t) {
      var i = this.LevelMap.get(s);
      if (this.uOd(i)) {
        e = s;
        break;
      }
      var r = this.GetCurrentLevelInfoByLevelId(s);
      if (this.GetLevelUnlockState(i.gG_, r.IsEndlessMode) && (e = s, r.Info.AEs === 0)) {
        e = s;
        break;
      }
    }
    return e;
  }
  GetCurrentUnlockDiffId() {
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsActivityConfigByActivityId(this.Id).AreaBoundLevelId;
    let i = 0;
    for (let t = 1; t < e.length; t++) {
      var r = e[t];
      var r = this.LevelMap.get(r);
      if (!this.GetLevelUnlockState(r.gG_, false)) {
        break;
      }
      if (this.uOd(r)) {
        break;
      }
      i++;
    }
    return i;
  }
  get AreaDataList() {
    const i = [];
    this.TalentAreaMap.forEach((t, e) => {
      if (e !== 0) {
        i.push(t);
      }
    });
    return i;
  }
  GetTalentTreeRed() {
    let t = false;
    for (const r of this.TalentNodeMap.keys()) {
      var e = this.TalentNodeMap.get(r);
      if (e) {
        var i = this.IsEnoughUpgradeNode(e);
        if (e.Status === 0 && i) {
          t = true;
          break;
        }
      }
    }
    return t;
  }
  GetTalentNodeById(t) {
    return this.TalentNodeMap.get(t);
  }
  GetFirstTalentNode() {
    let t = undefined;
    for (const e of this.TalentNodeMap.values()) {
      if (e.AreaId === 0) {
        t = e;
        break;
      }
    }
    return t;
  }
  RefreshTalentTreeNode(t, e) {
    t = this.GetTalentNodeById(t);
    if (t) {
      t.Status = e;
    }
  }
  IsPreNodeUpgraded(t) {
    let e = false;
    if (!t.PreNodeIds || t.PreNodeIds.length === 0) {
      e = true;
    }
    for (const r of t.PreNodeIds) {
      if (r === 0) {
        e = true;
        break;
      }
      var i = this.GetTalentNodeById(r);
      if (i && i.Status === 1) {
        e = true;
        break;
      }
    }
    return e;
  }
  IsEnoughUpgradeNode(t) {
    t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetTalentTreeEffect(t.EffectId);
    if (!t) {
      return false;
    }
    if (!t.Consume) {
      return true;
    }
    let e = true;
    var i = t.Consume;
    for (const n of i.keys()) {
      var r = i.get(n);
      var s = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n);
      if (r && s < r) {
        e = false;
        break;
      }
    }
    return e;
  }
  CheckCurrentTalentTreeNode() {
    let t = undefined;
    let e = undefined;
    var i = [];
    var r = [];
    for (const a of this.TalentNodeMap.values()) {
      r.push(a);
    }
    r.sort((t, e) => t.IndexSortId - e.IndexSortId);
    for (const h of r) {
      var s = h.Status === -1;
      var n = h.Status === 0;
      var o = this.IsEnoughUpgradeNode(h);
      if (n) {
        if (o) {
          t = h;
          break;
        }
        i.push(h);
      } else if (s && !e) {
        e = h;
      }
    }
    this.CurrentSelectNode = e || this.GetFirstTalentNode();
    if (t) {
      this.CurrentSelectNode = t;
    } else if (i.length > 0) {
      this.CurrentSelectNode = i[0];
    }
  }
  KSd() {
    this.TalentNodeMap.clear();
    this.TalentAreaMap.clear();
    for (const i of ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetAllTalentTreeNodeByActId(this.ActId)) {
      let t = this.TalentAreaMap.get(i.Area);
      if (!t) {
        (t = new SurvivorsActivityDefine_1.SurvivorsTalentAreaData()).AreaId = i.Area;
        t.NodeIds = new Array();
      }
      t.NodeIds.push(i.Id);
      this.TalentAreaMap.set(i.Area, t);
      let e = this.TalentNodeMap.get(i.Id);
      if (!e) {
        (e = new SurvivorsActivityDefine_1.SurvivorsTalentNode(i.Id, i.Area, i.PreNode, i.Effect, i.IndexId, i.IndexSortId)).Status = -1;
      }
      this.TalentNodeMap.set(i.Id, e);
    }
  }
  OKs() {
    this.RoleMap.clear();
    for (const t of ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetAllSurvivorsRoleByActId(this.ActId)) {
      this.RoleMap.set(t.Id, false);
    }
  }
  QSd() {
    this.WeaponMap.clear();
    for (const t of ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetAllSurvivorsWeaponByActId(this.ActId)) {
      this.WeaponMap.set(t.Id, false);
    }
  }
  sGe() {
    this.ItemMap.clear();
    for (const t of ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetAllSurvivorsItemByActId(this.ActId)) {
      this.ItemMap.set(t.Id, false);
    }
  }
  GetShowRoleList() {
    var t = [];
    for (const e of this.RoleMap.keys()) {
      if (this.IsRoleIdCanShow(e)) {
        t.push(e);
      }
    }
    return t.sort((t, e) => {
      var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(t);
      var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e);
      var s = this.RoleMap.get(t);
      if (s !== this.RoleMap.get(e)) {
        if (s) {
          return -1;
        } else {
          return 1;
        }
      } else if (i.SortId === r.SortId) {
        return t - e;
      } else {
        return i.SortId - r.SortId;
      }
    });
  }
  IsRoleIdCanShow(t) {
    t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(t);
    if (!t) {
      return false;
    }
    var t = t.TrialRoleId;
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    if (!e) {
      return false;
    }
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    var e = e.GetRoleId();
    var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    var r = r.ParentId !== 0 ? r.ParentId : e;
    if (ModelManager_1.ModelManager.RoleModel.IsMainRole(r) && ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t).Gender !== i) {
      return false;
    }
    return true;
  }
  GetAllNeedPopupWeaponId() {
    const i = [];
    this.WeaponMap.forEach((t, e) => {
      if (t && !this.SaveCacheState(2, e)) {
        i.push(e);
      }
    });
    return i;
  }
  GetAllItemUnlockCount() {
    let t = 0;
    for (const e of this.GetShowRoleList()) {
      if (this.RoleMap.get(e)) {
        t++;
      }
    }
    for (const i of this.WeaponMap.values()) {
      if (i) {
        t++;
      }
    }
    for (const r of this.ItemMap.values()) {
      if (r) {
        t++;
      }
    }
    return t;
  }
  GetAllItemCount() {
    var t = 0;
    return (t += this.GetShowRoleList().length) + this.WeaponMap.size + this.ItemMap.size;
  }
}
exports.SurvivorsActivityData = SurvivorsActivityData;
//# sourceMappingURL=SurvivorsActivityData.js.map