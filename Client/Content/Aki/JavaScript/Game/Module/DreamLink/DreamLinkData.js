"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityData_1 = require("../Activity/ActivityData");
const DreamLinkController_1 = require("./DreamLinkController");
const DreamLinkDefine_1 = require("./DreamLinkDefine");
class DreamLinkData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.RoleInstanceList = [];
    this.RunTaskMap = new Map();
    this.MaxEnergy = 0;
    this.tcl = 0;
    this.icl = 0;
    this.TSl = [];
    this.Utl = new Map();
    this.rcl = new Map();
    this.ocl = new Map();
    this.ncl = new Map();
    this.scl = new Map();
    this.acl = new Map();
    this.DungeonProgressRecord = 0;
    this.SNe = (e, t) => {
      e = this.ocl.get(e.Id);
      t = this.ocl.get(t.Id);
      if (e.Status === t.Status) {
        return e.Id - t.Id;
      } else {
        return e.Status - t.Status;
      }
    };
    this.lcl = (e, t) => e.Status === t.Status ? e.Id - t.Id : e.Status - t.Status;
  }
  OnInit(e) {
    if (e.jS_) {
      this.Dtl();
      this.hcl();
      this._cl();
    }
  }
  PhraseEx(e) {
    this.ucl(e.jS_);
  }
  UpdateData(e) {
    this.ucl(e.jS_);
  }
  GetExDataRedPointShowState() {
    if (!this.IsDreamLinkFunctionUnlock(0)) {
      return this.GetQuestRedDotState() || this.CheckHasLimitTimeReward() || this.CheckHasEnergyReward();
    }
    if (this.IsDreamLinkFunctionUnlock(1)) {
      var e = this.CheckHasRunRedDot();
      if (e) {
        return e;
      }
    }
    if (this.IsDreamLinkFunctionUnlock(2)) {
      e = this.CheckDungeonRedDotState();
      if (e) {
        return e;
      }
    }
    if (this.IsDreamLinkFunctionUnlock(3)) {
      e = this.CheckHasBossReward() || this.CheckAllBossInstRedDotState();
      if (e) {
        return e;
      }
    }
    return this.CheckHasLimitTimeReward() || this.CheckHasEnergyReward();
  }
  ucl(e) {
    if (e) {
      this.MaxEnergy = e.oM_;
      this.RoleInstanceList = e.nM_;
      this.tcl = Number(MathUtils_1.MathUtils.LongToBigInt(e._M_));
      this.icl = Number(MathUtils_1.MathUtils.LongToBigInt(e.cM_));
      this.DungeonProgressRecord = e.dM_;
      this.ccl(e.pps);
      this.mcl(e.aM_);
      this.RefreshAllLimitTimeReward(e.hM_);
      this.TSl = e.mM_;
      for (const i of e.sM_) {
        this.Poh(i);
      }
      for (const r of Object.keys(e.lM_)) {
        var t = e.lM_[r];
        this.dcl(Number(r), t);
      }
      for (const n of e.uM_) {
        this.dcl(n.r6n, undefined, n.K6n, n.CM_, Number(MathUtils_1.MathUtils.LongToBigInt(n.yzs)));
        this.Tml(n.r6n);
      }
      this.RefreshRewardPerformance();
    }
  }
  RefreshActivityRedDotState() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  RefreshRewardPerformance() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DreamLinkRewardRefresh);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    if (UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, this.GetBossRewardData());
    }
  }
  RefreshLimitRewardPerformance() {
    if (this.IsLimitTimeRewardOn()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DreamLinkLimitRewardRefresh);
    }
  }
  GetLastUnFinishInst() {
    let t = 6;
    for (let e = 0; e < this.RoleInstanceList.length; e++) {
      if (!this.RoleInstanceList[e].CM_) {
        t = e;
        break;
      }
    }
    return t;
  }
  GetLastUnlockInst() {
    let t = 0;
    for (let e = this.RoleInstanceList.length - 1; e >= 0; e--) {
      if (this.RoleInstanceList[e].K6n) {
        t = e;
        break;
      }
    }
    return t;
  }
  GetLastFinishInst() {
    let t = 0;
    for (let e = this.RoleInstanceList.length - 1; e >= 0; e--) {
      if (this.RoleInstanceList[e].CM_) {
        t = e;
        break;
      }
    }
    return t;
  }
  GetInstListByPages(e, t) {
    e *= t;
    return this.RoleInstanceList.slice(e, e + t);
  }
  GetRoleInstDataIndex(t) {
    return this.RoleInstanceList.findIndex(e => e.r6n === t);
  }
  GetRoleInstDataByIndex(e) {
    return this.RoleInstanceList[e];
  }
  GetCurrentCatProgress() {
    let i = 0;
    var e = this.GetActivityConfig();
    this.RoleInstanceList.forEach(e => {
      var t = ConfigManager_1.ConfigManager.DreamLinkConfig?.GetDreamLinkRoleDungeonConfig(e.r6n);
      if (e.CM_) {
        i += t.AddProgress;
      }
    });
    return i + e.DungeonBaseProgress;
  }
  GetActivityConfig() {
    return ConfigManager_1.ConfigManager.DreamLinkConfig.GetActivityConfig(this.Id);
  }
  IsDreamLinkInst(t) {
    return this.RoleInstanceList.findIndex(e => e.r6n === t) !== -1;
  }
  IsDreamLinkFunctionUnlock(e) {
    return this.TSl.includes(e);
  }
  GetFinishInstCount() {
    let t = 0;
    this.RoleInstanceList.forEach(e => {
      if (e.CM_) {
        t++;
      }
    });
    return t;
  }
  IsAllInstFinished() {
    return this.GetFinishInstCount() === this.RoleInstanceList.length;
  }
  GetInstStage() {
    if (this.GetFinishInstCount() >= DreamLinkDefine_1.CHANGE_STATE_FINISH_COUNT) {
      return 1;
    } else {
      return 0;
    }
  }
  GetDungeonToggleItemParams() {
    if (this.GetFinishInstCount() >= DreamLinkDefine_1.CHANGE_STATE_FINISH_COUNT) {
      return {
        TextureBgPath: ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("DreamLinkDungeonBgRed") ?? "",
        TextureLightPath: ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("DreamLinkDungeonLightRed") ?? "",
        EffectColor: "#cff7ff"
      };
    } else {
      return {
        TextureBgPath: ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("DreamLinkDungeonBgBlue") ?? "",
        TextureLightPath: ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("DreamLinkDungeonLightBlue") ?? "",
        EffectColor: "#ffe5e7"
      };
    }
  }
  CheckDungeonRedDotStateByInstId(e) {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 2, e, 0);
    var e = this.GetRoleInstDataIndex(e);
    var e = this.RoleInstanceList[e];
    var e = e.K6n && !e.CM_;
    return (t === 0 || TimeUtil_1.TimeUtil.GetServerTime() - t > CommonDefine_1.SECOND_PER_HOUR * CommonDefine_1.HOUR_PER_DAY * 3) && e;
  }
  SaveDungeonRedDotStateByInstId(e) {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 2, e, 0, t);
    this.RefreshActivityRedDotState();
  }
  CheckDungeonRedDotStateByPage(t, i) {
    if (!(t < 0) && !(i <= 0)) {
      for (let e = t * i; e < (t + 1) * i && !(e >= this.RoleInstanceList.length); e++) {
        var r = this.RoleInstanceList[e];
        if (this.CheckDungeonRedDotStateByInstId(r.r6n)) {
          return true;
        }
      }
    }
    return false;
  }
  CheckDungeonRedDotState() {
    for (const e of this.RoleInstanceList) {
      if (this.CheckDungeonRedDotStateByInstId(e.r6n)) {
        return true;
      }
    }
    return false;
  }
  GetQuestRedDotState() {
    var e = this.GetUnFinishPreGuideQuestId();
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 6, e, 0) === 0;
  }
  SaveQuestRedDotState() {
    var e;
    if (!this.GetPreGuideQuestFinishState()) {
      e = this.GetUnFinishPreGuideQuestId();
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 6, e, 0, 1);
      this.RefreshActivityRedDotState();
    }
  }
  SaveFirstCheckRedDotState(e, t = 0) {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, e, t, 0, 1);
    this.RefreshActivityRedDotState();
  }
  _cl() {
    this.acl.clear();
    for (const i of this.GetActivityConfig().BossInstanceList) {
      var e = ConfigManager_1.ConfigManager.DreamLinkConfig.GetRogueBossInstanceConfig(i);
      var t = e.InstanceId;
      var e = new DreamLinkDefine_1.DreamLinkBossInstanceData(i, t, e.ConditionGroupId);
      this.acl.set(t, e);
    }
  }
  dcl(e, t, i, r, n) {
    e = this.acl.get(e);
    if (e && (t !== undefined && (e.Score = t), i !== undefined && (e.IsUnlock = i), r !== undefined && (e.IsFinished = r), n !== undefined)) {
      e.UnlockTime = n;
    }
  }
  Tml(t) {
    var i = this.acl.get(t);
    if (i) {
      for (let e = 0; e < DreamLinkDefine_1.BOSS_INST_ROLE_COUNT; e++) {
        var r = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, t, e, 0);
        i.SetBossRoleIdByIndex(e, r);
      }
    }
  }
  GetAllBossInstData() {
    return Array.from(this.acl.values()).sort((e, t) => e.TypeId - t.TypeId);
  }
  FixBossRoleId(t) {
    var i = this.GetAllBossRoleId(t);
    for (let e = 0; e < i.length; e++) {
      var r = i[e];
      if (ModelManager_1.ModelManager.RoleModel.IsMainRole(r) && r !== ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId()) {
        this.SetBossRoleId(t, e, 0);
      }
    }
  }
  GetBossRoleId(e, t) {
    return this.acl.get(e).GetBossRoleIdByIndex(t);
  }
  SetBossRoleId(e, t, i) {
    this.acl.get(e).SetBossRoleIdByIndex(t, i);
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, e, t, 0, i);
  }
  GetAllBossRoleId(e) {
    return this.acl.get(e).GetBossRoleIdList();
  }
  CheckAllBossInstRedDotState() {
    for (const e of this.acl.values()) {
      if (e.IsUnlock) {
        if (ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 3, e.InstId, 0) === 0) {
          return true;
        }
      }
    }
    return false;
  }
  GetBossInstRedDotState(e) {
    return !!this.acl.get(e).IsUnlock && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 3, e, 0) === 0;
  }
  SaveBossInstRedDotState(e) {
    if (this.acl.get(e).IsUnlock) {
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 3, e, 0, 1);
      this.RefreshActivityRedDotState();
    }
  }
  SetRunTaskDone(e) {
    this.RunTaskMap.get(e).Status = 3;
  }
  GetDreamLinkRunTaskDataList() {
    return Array.from(this.RunTaskMap.values()).sort((e, t) => e.Id - t.Id);
  }
  IsDreamLinkRunMarkShow(e) {
    var e = ConfigManager_1.ConfigManager.DreamLinkConfig.GetWorldRunConfigByMarkId(e);
    return !!e && !!(e = this.RunTaskMap.get(e.Id)) && e.Status > 0;
  }
  CheckHasRunRedDot() {
    for (const e of this.RunTaskMap.values()) {
      switch (e.Status) {
        case 1:
          if (ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 1, e.Id, 0) === 0) {
            return true;
          }
          break;
        case 2:
          return true;
      }
    }
    return false;
  }
  GetRunRedDotState(e) {
    var t = this.RunTaskMap.get(e);
    switch (t.Status) {
      case 1:
        return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 1, t.Id, 0) === 0;
      case 2:
        return true;
    }
    return false;
  }
  CheckHasRunFinished() {
    for (const e of this.RunTaskMap.values()) {
      if (e.Status === 1 || e.Status === 0) {
        return false;
      }
    }
    return true;
  }
  woh(e) {
    var t;
    var i = ConfigManager_1.ConfigManager.DreamLinkConfig.GetWorldRunConfig(e);
    if (i) {
      (t = new DreamLinkDefine_1.DreamLinkRunTaskData(e)).ConditionGroupId = i.ConditionGroupId;
      t.TitleTextId = i.Title;
      t.RewardList = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(i.RewardId);
      t.MarkId = i.MarkId;
      this.RunTaskMap.set(e, t);
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 37, "[DreamLink] RunTask Config Error", ["Id", e]);
    }
  }
  Poh(e) {
    let t = this.RunTaskMap.get(e.c5n);
    if (t ||= this.woh(e.c5n)) {
      t.PlayTime = e.dM_;
      t.UnlockTime = Number(MathUtils_1.MathUtils.LongToBigInt(e.yzs));
      switch (e.DS_) {
        case Protocol_1.Aki.Protocol.zps.Z6n:
          t.Status = e.K6n ? 1 : 0;
          break;
        case Protocol_1.Aki.Protocol.zps.CMs:
          t.Status = 2;
          break;
        case Protocol_1.Aki.Protocol.zps.ovs:
          t.Status = 3;
      }
    }
  }
  GetEnergyItemId() {
    return this.GetActivityConfig().EnergyId;
  }
  GetEnergyItemCount() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.GetEnergyItemId());
  }
  GetEnergyRewardDataList() {
    return Array.from(this.Utl.values()).sort((e, t) => e.Id - t.Id);
  }
  CheckHasEnergyReward() {
    if (ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 5, 0, 0) === 0) {
      return true;
    }
    for (const e of this.Utl.values()) {
      if (e.Status === 0) {
        return true;
      }
    }
    return false;
  }
  Dtl() {
    this.Utl.clear();
    for (const i of this.GetActivityConfig().Rewards) {
      var e = ConfigManager_1.ConfigManager.DreamLinkConfig.GetEnergyRewardConfig(i);
      var t = new DreamLinkDefine_1.DreamLinkRewardData(i);
      t.Status = 1;
      t.Target = e.NeedEnergy;
      this.Utl.set(i, t);
    }
  }
  ccl(t) {
    var i = this.GetActivityConfig();
    for (let e = 0; e < t.length; e++) {
      var r = i.Rewards[e];
      this.RefreshEnergyRewardData(r, DreamLinkDefine_1.signStateResolver[t[e]]);
    }
  }
  RefreshEnergyRewardData(e, t) {
    e = this.Utl.get(e);
    if (e) {
      e.Status = t;
    }
  }
  hcl() {
    this.ocl.clear();
    this.ncl.clear();
    for (const r of this.GetActivityConfig().BossRewards) {
      var t = new DreamLinkDefine_1.DreamLinkRewardData(r);
      t.Status = 1;
      var i = ConfigManager_1.ConfigManager.DreamLinkConfig.GetBossRewardConfig(r);
      let e = this.ncl.get(i.InstanceType);
      if (!e) {
        e = [];
        this.ncl.set(i.InstanceType, e);
      }
      e.push(t);
      this.ocl.set(r, t);
    }
  }
  mcl(t) {
    var i = this.GetActivityConfig();
    for (let e = 0; e < t.length; e++) {
      var r = i.BossRewards[e];
      this.RefreshBossRewardData(r, DreamLinkDefine_1.signStateResolver[t[e]]);
    }
  }
  RefreshBossRewardData(e, t) {
    e = this.ocl.get(e);
    if (e) {
      e.Status = t;
    }
  }
  GetBossRewardData() {
    var e = [];
    for (const n of this.GetActivityConfig().BossTabText.keys()) {
      var t = [];
      var i = this.ncl.get(n);
      if (i) {
        for (const s of i) {
          var r = this.Ccl(s);
          t.push(r);
        }
      }
      i = {
        TabName: this.qVa(n),
        DataList: t.sort(this.SNe)
      };
      e.push(i);
    }
    return {
      DataPageList: e,
      Source: "DreamLink"
    };
  }
  qVa(e) {
    var t = this.GetActivityConfig();
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.BossTabText.get(e)) ?? "";
  }
  Ccl(e) {
    var t = ConfigManager_1.ConfigManager.DreamLinkConfig.GetBossRewardConfig(e.Id);
    let i = 0;
    let r = "";
    let n = () => {};
    let s = false;
    switch (e.Status) {
      case 1:
        r = "Text_DaMaoZhan_OnProgress";
        break;
      case 0:
        i = 1;
        r = "Text_DaMaoZhan_Gain";
        s = true;
        n = () => {
          DreamLinkController_1.DreamLinkController.BossRewardRequest(e.Id);
        };
        break;
      case 2:
        i = 2;
    }
    if (!StringUtils_1.StringUtils.IsEmpty(r)) {
      r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r) ?? "";
    }
    return {
      Id: e.Id,
      NameText: "",
      NameTextId: t.Title,
      RewardList: this.GetPreviewReward(t.DropId),
      RewardState: i,
      RewardButtonText: r,
      RewardButtonRedDot: s,
      ClickFunction: n
    };
  }
  CheckHasBossReward() {
    if (ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 7, 0, 0) === 0) {
      return true;
    }
    for (const e of this.ocl.values()) {
      if (e.Status === 0) {
        return true;
      }
    }
    return false;
  }
  GetLimitTimeRewardTypeLength() {
    return this.GetActivityConfig().TabText.size;
  }
  RefreshAllLimitTimeReward(e) {
    for (const t of e) {
      this.RefreshLimitTimeRewardData(t.v9n, DreamLinkDefine_1.signStateResolver[t.zps], t.tvs, t.fM_);
    }
  }
  RefreshLimitTimeRewardData(t, e, i, r) {
    let n = this.rcl.get(t);
    if (!n) {
      n = new DreamLinkDefine_1.DreamLinkRewardData(t);
      this.rcl.set(t, n);
      t = ConfigManager_1.ConfigManager.DreamLinkConfig.GetLimitTimeRewardConfig(t);
      let e = this.scl.get(t.Type);
      if (!e) {
        e = [];
        this.scl.set(t.Type, e);
      }
      e.push(n);
    }
    if (i !== undefined) {
      n.Current = i;
    }
    if (r !== undefined) {
      n.Target = r;
    }
    n.Status = e;
  }
  GetLimitTimeEndTime() {
    return this.icl;
  }
  IsLimitTimeRewardOn() {
    var e;
    return !!this.IsUnLock() && (e = TimeUtil_1.TimeUtil.GetServerTime()) >= this.tcl && e <= this.icl;
  }
  CheckHasLimitTimeReward() {
    if (this.IsLimitTimeRewardOn()) {
      if (ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 4, 0, 0) === 0) {
        return true;
      }
      for (const e of this.rcl.values()) {
        if (e.Status === 0) {
          return true;
        }
      }
    }
    return false;
  }
  CheckHasLimitTimeTabReward(e) {
    if (this.IsLimitTimeRewardOn()) {
      for (const t of this.scl.get(e) ?? []) {
        if (t.Status === 0) {
          return true;
        }
      }
    }
    return false;
  }
  GetTypeInfoByTabId(e) {
    var t = this.GetActivityConfig();
    return [t.TabText.get(e) ?? "", t.TabIcon.get(e) ?? ""];
  }
  GetLimitTimeRewardListByTabId(e) {
    return (this.scl.get(e) ?? []).sort(this.lcl);
  }
  GetPreviewWeaponId() {
    return this.GetActivityConfig().WeaponPreviewId;
  }
}
exports.DreamLinkData = DreamLinkData;
//# sourceMappingURL=DreamLinkData.js.map