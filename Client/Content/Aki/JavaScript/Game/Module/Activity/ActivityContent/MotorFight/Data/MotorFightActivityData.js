"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightActivityData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const MotorFightItemByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/MotorFightItemByActivityId");
const MotorFightItemTypeAll_1 = require("../../../../../../Core/Define/ConfigQuery/MotorFightItemTypeAll");
const MotorFightLevelByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/MotorFightLevelByActivityId");
const MotorFightTalentByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/MotorFightTalentByActivityId");
const MotorFightTaskByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/MotorFightTaskByActivityId");
const MotorFightTaskTabByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/MotorFightTaskTabByActivityId");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../../ActivityCommonDefine");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivityData_1 = require("../../../ActivityData");
const MotorFightItemData_1 = require("./MotorFightItemData");
const MotorFightLevelData_1 = require("./MotorFightLevelData");
const MotorFightRankData_1 = require("./MotorFightRankData");
const MotorFightRoleData_1 = require("./MotorFightRoleData");
const MotorFightTalentData_1 = require("./MotorFightTalentData");
const MotorFightTaskData_1 = require("./MotorFightTaskData");
class MotorFightActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.uPd = new Map();
    this.rMg = [];
    this.UCg = undefined;
    this.q6c = new Map();
    this.dPd = new Map();
    this.lVl = (t, i) => t.Status !== i.Status ? t.Status - i.Status : t.Id - i.Id;
    this.Jug = [];
    this.dgt = new Map();
    this.Zug = new Map();
    this.ecg = [];
    this.tcg = new Map();
    this.icg = [];
    this.rcg = [];
    this.TalentTreeItemId = 0;
    this.iFg = 0;
    this.Avc = new Map();
    this.Vlo = [];
    this.UFg = [];
    this.xFg = [];
    this.MyRankData = new MotorFightRankData_1.MotorFightRankData(true);
  }
  OnInit(t) {
    if (t.txf) {
      this.TalentTreeItemId = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightActivityConfig(this.Id).TalentTreeItemId;
      this.ocg();
      this.gPd();
      this.ncg();
      this.scg();
      this.acg();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "摩托战斗活动数据不存在");
    }
  }
  PhraseEx(t) {
    t = t.txf;
    if (t) {
      this.UpdateLevelDataList(t.ixf);
      this.UpdateTaskData(t.vlu);
      this.UpdateMotorFightItemDataList(t.oxf);
      if (t.rxf) {
        this.UpdateMotorFightTalentDataList(t.rxf.nxf);
      }
      this.UpdateRoleData(t.uxf);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "摩托战斗活动数据不存在");
    }
  }
  GetExDataRedPointShowState() {
    return !!this.IsUnLock() && (this.IsLevelHasRedDot() || this.IsTaskHasRedDot() || this.IsTalentTreeHasRedDot() || this.IsHandBookHasRedDot());
  }
  GetExDataFinishShowState() {
    for (const t of this.uPd.values()) {
      if (!t.IsFinished) {
        return false;
      }
    }
    for (const i of this.q6c.values()) {
      if (!i.IsFinished) {
        return false;
      }
    }
    return true;
  }
  ocg() {
    for (const i of MotorFightLevelByActivityId_1.configMotorFightLevelByActivityId.GetConfigList(this.Id)) {
      var t = new MotorFightLevelData_1.MotorFightLevelData(i);
      this.uPd.set(i.Id, t);
      this.rMg[t.Column] ||= [];
      this.rMg[t.Column].push(t);
    }
    for (const e of this.rMg) {
      e.sort((t, i) => t.Row - i.Row);
    }
    for (const o of this.uPd.values()) {
      if (o.PreLevelIds.length > 0) {
        o.PreMotorFightLevelData = this.GetLevelDataById(o.PreLevelIds[0]);
      }
    }
  }
  GetLevelDataById(t) {
    var i = this.uPd.get(t);
    if (i) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "摩托战斗关卡数据不存在", ["Id", t]);
    }
  }
  UpdateLevelDataList(t, i = false) {
    for (const o of t) {
      var e = this.GetLevelDataById(o.gG_);
      if (e) {
        e.UnlockTime = MathUtils_1.MathUtils.LongToNumber(o.pDs);
        e.BestScore = o.axf;
        e.IsFinished = o.sxf;
        e.RoleId = o.cPs;
      }
    }
    if (i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  IsLevelHasRedDot() {
    for (const t of this.uPd.values()) {
      if (t.HasLevelRedDot) {
        return true;
      }
    }
    return false;
  }
  IsEndlessLevelUnlock() {
    for (const t of this.uPd.values()) {
      if (t.Type === 2 && t.IsUnLock) {
        return true;
      }
    }
    return false;
  }
  GetLevelTreeList() {
    return this.rMg;
  }
  SetLastSavedLevelData(t) {
    this.UCg = t;
  }
  GetLastSavedLevelData() {
    return this.UCg;
  }
  HasLastSavedLevelData() {
    return this.UCg !== undefined;
  }
  gPd() {
    for (const i of MotorFightTaskByActivityId_1.configMotorFightTaskByActivityId.GetConfigList(this.Id)) {
      var t = new MotorFightTaskData_1.MotorFightTaskData(i);
      this.q6c.set(i.Id, t);
      this.dPd.set(i.PageType, [...(this.dPd.get(i.PageType) ?? []), t]);
    }
  }
  hcg(t) {
    var i = this.q6c.get(t);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "摩托战斗任务配置不存在", ["taskId", t]);
    }
  }
  UpdateTaskData(t, i = false) {
    for (const o of t) {
      var e = this.hcg(o.s5n);
      e.Status = ActivityCommonDefine_1.taskStateResolver[o.H6n];
      e.Current = o.lMs;
      e.Target = o.j6n;
    }
    if (i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  RequestTaskReward(t) {
    var i = [];
    for (const e of this.GetTaskDataList(t)) {
      if (e.IsUnclaimed) {
        i.push(e.Id);
      }
    }
    ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.RequestTaskReward(i);
  }
  UpdateTaskRewardStatus(t, i = false) {
    for (const e of t) {
      this.hcg(e.s5n).Status = ActivityCommonDefine_1.taskStateResolver[e.H6n];
    }
    if (i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  GetTaskReward(t) {
    for (const i of t) {
      this.hcg(i).Status = 2;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  IsTaskHasRedDot() {
    for (const t of this.q6c.values()) {
      if (t.IsUnclaimed) {
        return true;
      }
    }
    return false;
  }
  IsTaskHasRedDotByTab(t) {
    for (const i of this.dPd.get(t) ?? []) {
      if (i.IsUnclaimed) {
        return true;
      }
    }
    return false;
  }
  GetTaskDataList(t) {
    return (this.dPd.get(t) ?? []).sort(this.lVl);
  }
  GetTotalTaskNum() {
    return this.q6c.size;
  }
  GetFinishedTaskNum() {
    let t = 0;
    for (const i of this.q6c.values()) {
      if (i.IsFinished) {
        t++;
      }
    }
    return t;
  }
  GetMotorFightTaskTabList() {
    var t;
    if (this.Jug.length === 0) {
      t = MotorFightTaskTabByActivityId_1.configMotorFightTaskTabByActivityId.GetConfigList(this.Id);
      this.Jug = [...t];
    }
    return this.Jug;
  }
  ncg() {
    var t;
    var i;
    for (const e of MotorFightItemByActivityId_1.configMotorFightItemByActivityId.GetConfigList(this.Id)) {
      if (e.IsShowInHandBook) {
        t = new MotorFightItemData_1.MotorFightItemData(e);
        this.dgt.set(e.Id, t);
        i = e.Type;
        if (!this.Zug.has(i)) {
          this.Zug.set(i, []);
        }
        this.Zug.get(i).push(t);
      }
    }
  }
  UpdateMotorFightItemDataList(t, i = false) {
    for (const e of t) {
      this.UpdateMotorFightItemData(e);
    }
    if (i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  UpdateMotorFightItemData(t) {
    t = this.GetMotorFightItemData(t);
    if (t !== undefined) {
      t.IsUnLock = true;
    }
  }
  GetMotorFightItemData(t) {
    var i = this.dgt.get(t);
    var e = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightItemConfig(t);
    if (i !== undefined || !e.IsShowInHandBook) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "获取MotorFightItemData失败", ["Id", t]);
    }
  }
  GetItemUnlockNum(t) {
    let i = 0;
    t = this.Zug.get(t);
    if (!t) {
      return [0, 0];
    }
    for (const e of t) {
      if (e.IsUnLock) {
        i++;
      }
    }
    return [i, t.length];
  }
  GetAllItemUnlockNum() {
    let t = 0;
    for (const i of this.dgt.values()) {
      if (i.IsUnLock) {
        t++;
      }
    }
    return [t, this.dgt.size];
  }
  GetMotorFightItemDataListByType(t) {
    var i = this.Zug.get(t);
    if (i) {
      return i.sort((t, i) => t.IsUnLock !== i.IsUnLock ? t.IsUnLock ? -1 : 1 : t.Quality !== i.Quality ? i.Quality - t.Quality : t.Id - i.Id);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "通过类型获取MotorFightItemDataList失败", ["TypeId", t]);
    }
  }
  IsHandBookHasRedDot() {
    for (const t of this.dgt.values()) {
      if (t.HasItemRedDot) {
        return true;
      }
    }
    return false;
  }
  ReadHandBookRedDot() {
    for (const t of this.dgt.values()) {
      if (t.HasItemRedDot) {
        t.ReadItemRedDot();
      }
    }
  }
  GetMotorFightItemTypeList() {
    var t;
    if (this.ecg.length === 0) {
      t = MotorFightItemTypeAll_1.configMotorFightItemTypeAll.GetConfigList();
      this.ecg = [...t];
    }
    return this.ecg;
  }
  scg() {
    for (const i of MotorFightTalentByActivityId_1.configMotorFightTalentByActivityId.GetConfigList(this.Id)) {
      var t = new MotorFightTalentData_1.MotorFightTalentData(i);
      this.tcg.set(i.Id, t);
      this.icg.push(t);
      this.rcg[t.Column] ||= [];
      this.rcg[t.Column].push(t);
    }
    for (const e of this.rcg) {
      e?.sort((t, i) => t.Row - i.Row);
    }
    this.icg.sort((t, i) => t.Id - i.Id);
  }
  UpdateMotorFightTalentDataList(t, i = false) {
    for (const o of t) {
      var e = this.GetMotorFightTalentData(o.s5n);
      if (e !== undefined) {
        e.IsFinishPreCondition = o.CMs;
        e.IsUnLock = o.hxf;
      }
    }
    if (i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  UpdateMotorFightTalentData(t) {
    t = this.GetMotorFightTalentData(t);
    if (t !== undefined) {
      t.IsUnLock = true;
    }
  }
  GetMotorFightTalentData(t) {
    var i = this.tcg.get(t);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "获取MotorFightTalentData失败", ["Id", t]);
    }
  }
  GetTalentTreeList() {
    return this.rcg;
  }
  GetTalentProgress() {
    var t = this.tcg.size;
    let i = 0;
    for (const e of this.tcg.values()) {
      if (e.IsUnLock) {
        i += 1;
      }
    }
    return i + "/" + t;
  }
  GetTalentCoinNum() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.TalentTreeItemId);
  }
  IsPreNodeAllUnlock(t) {
    for (const i of t.PreNode) {
      if (!this.GetMotorFightTalentData(i)?.IsUnLock) {
        return false;
      }
    }
    return true;
  }
  IsTalentCanUnlock(t) {
    if (!t.IsUnLock && t.IsFinishPreCondition && this.IsPreNodeAllUnlock(t) && this.GetTalentCoinNum() >= t.Cost) {
      return true;
    }
    return false;
  }
  IsTalentTreeHasRedDot() {
    for (const t of this.tcg.values()) {
      if (this.IsTalentCanUnlock(t)) {
        return true;
      }
    }
    return false;
  }
  GetNextCanUnlockTalentId() {
    let t = -1;
    for (const i of this.icg) {
      if (t === -1 && !i.IsUnLock) {
        t = i.Id;
      }
      if (this.IsTalentCanUnlock(i)) {
        return i.Id;
      }
    }
    if (t === -1) {
      return this.icg.at(-1).Id;
    } else {
      return t;
    }
  }
  get SelectedTalentNodeId() {
    if (this.iFg === 0) {
      this.iFg = this.GetNextCanUnlockTalentId();
    }
    return this.iFg;
  }
  set SelectedTalentNodeId(t) {
    this.iFg = t;
  }
  acg() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    for (const e of ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightRoleList(this.Id)) {
      var i = new MotorFightRoleData_1.MotorFightRoleData(e);
      this.Avc.set(e.Id, i);
      if (this.lcg(e.Type, t)) {
        this.Vlo.push(i);
      }
    }
    this.Vlo.sort((t, i) => t.Id - i.Id);
  }
  lcg(t, i) {
    return t === 0 || t === 1 && i === 1 || t === 2 && i === 0;
  }
  GetMotorFightRoleData(t) {
    var i = this.Avc.get(t);
    if (i) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "获取MotorFightRoleData失败", ["id", t]);
    }
  }
  UpdateRoleData(t, i = false) {
    for (const o of t) {
      var e = this.GetMotorFightRoleData(o);
      if (e) {
        e.IsUnLock = true;
      }
    }
    if (i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  GetMotorFightRoleList() {
    return this.Vlo;
  }
  GetLevelUsedRole(t) {
    var i = this.Vlo[0].Id;
    var t = this.GetLevelDataById(t);
    if (t.RoleId === 0 && ((t = t.PreLevelIds.length > 0 ? t.PreLevelIds[0] : 0) === 0 || (t = this.GetLevelDataById(t)).RoleId === 0)) {
      return i;
    } else {
      return t.RoleId;
    }
  }
  IsRoleHasRedDot() {
    for (const t of this.Avc.values()) {
      if (t.HasRedDot) {
        return true;
      }
    }
    return false;
  }
  UpdateFriendsRankList(t) {
    this.UFg = [];
    for (const e of t) {
      var i = new MotorFightRankData_1.MotorFightRankData();
      i.SetDataByServerInfo(e);
      this.UFg.push(i);
    }
  }
  UpdateMyRank(t) {
    this.MyRankData.SetDataByServerInfo(t);
  }
  BFg() {
    if (this.xFg.length === 0) {
      for (const i of ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightRobotRankList()) {
        var t = new MotorFightRankData_1.MotorFightRankData();
        t.SetDataByConfig(i);
        this.xFg.push(t);
      }
    }
    return this.xFg;
  }
  GetRankList() {
    var t = [...this.UFg];
    if (this.MyRankData.HasData) {
      t.push(this.MyRankData);
    }
    var i = t.length;
    for (const e of this.BFg()) {
      if (i < e.DisplayThreshold) {
        t.push(e);
      }
    }
    t.sort((t, i) => i.Score - t.Score);
    return t;
  }
}
exports.MotorFightActivityData = MotorFightActivityData;
//# sourceMappingURL=MotorFightActivityData.js.map