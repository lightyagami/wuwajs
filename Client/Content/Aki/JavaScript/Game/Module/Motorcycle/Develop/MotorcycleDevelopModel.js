"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDevelopModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const FormationAttributeController_1 = require("../../Abilities/FormationAttributeController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const MotorcycleDevelopDefine_1 = require("./MotorcycleDevelopDefine");
class MotorcycleDevelopModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.qbi = -1;
    this.qFf = -1;
    this.OGf = 0;
    this.GGf = 0;
    this.FGf = false;
    this.zVl = 1;
    this.AWm = 0;
    this.gmf = 0;
    this.OFf = undefined;
    this.OQo = "MotorLevel";
    this.DWm = 0;
    this.Fmf = 0;
    this.Cmf = [];
    this.TechNodeMap = new Map();
    this.DamgeIdToSkillLevel = new Map();
    this.pmf = new Map();
    this.UWm = new Map();
    this.xAg = undefined;
  }
  UpdateMotorInfo(e) {
    this.zVl = e.ncf;
    this.AWm = e.scf;
    this.gmf = e.icf;
    this.OGf = e.WFf;
    this.GGf = e.QFf;
    this.DWm = e.tcf;
    this.FGf = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDevelopIsFirstDailyExpLimit) ?? false;
    if (this.qbi === -1) {
      this.qbi = this.zVl;
    }
    if (this.qFf === -1) {
      this.qFf = this.AWm;
    }
    this.UpdateTechTree(e.acf);
    this.UpdateAllTreeTask(e.rcf);
    this.UpdateMotorLevelEffect();
  }
  OnClear() {
    this.RemoveSwitchTechTreeLockTimer();
    return true;
  }
  GetMotorTabList() {
    var t = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("MotorcycleRootView");
    var r = t.length;
    var i = [];
    for (let e = 0; e < r; e++) {
      var o = t[e];
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(o.FunctionId)) {
        i.push(o);
      }
    }
    return i;
  }
  GetLastLevel() {
    return this.qbi;
  }
  GetLastExp() {
    return this.qFf;
  }
  GetCurLevel() {
    return this.zVl;
  }
  GetCurExp() {
    return this.AWm;
  }
  GetCurRewardedMaxLv() {
    return this.gmf;
  }
  GetAttrValueByType(e, t) {
    let r = 0;
    var i = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    var o = ConfigManager_1.ConfigManager.MotorConfig.GetMotorLevelConfig(t);
    if (o) {
      var a = o.WorldLv2Attack.get(i);
      var s = o.WorldLv2MotorShield.get(i);
      switch (e) {
        case 3:
          r = a || 0;
          break;
        case 1:
          r = o.Speed;
          break;
        case 5:
          r = o.NitrogenSpeedValue;
          break;
        case 2:
          r = o.NitrogenValue;
          break;
        case 7:
          r = o.NitrogenRecoverRate;
          break;
        case 8:
          r = o.NitrogenRecoverCoolDown;
          break;
        case 6:
          r = o.NitrogenConsumeRate;
          break;
        case 9:
          r = o.MotorInitialShieldRate;
          break;
        case 4:
          r = s || 0;
          break;
        case 10:
          r = o.MotorShieldRecoverRate;
          break;
        case 11:
          r = o.MotorShieldCoolDown;
      }
    }
    return r;
  }
  GetNextLevelExp() {
    var e = ConfigManager_1.ConfigManager.MotorConfig.GetAllMotorLevelList();
    var e = Math.min(this.zVl + 1, e.length);
    let t = 0;
    e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorLevelConfig(e);
    return t = e ? e.Exp : t;
  }
  GetPreviewRewardByLevel(e) {
    let t = [];
    e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorLevelConfig(e);
    (t = e ? this.GetPreviewReward(e.RewardId) : t).sort((e, t) => {
      var e = e[0].ItemId;
      var t = t[0].ItemId;
      var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
      var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
      var r = r ? r.QualityId : 0;
      var i = i ? i.QualityId : 0;
      if (r !== i) {
        return i - r;
      } else {
        return e - t;
      }
    });
    return t;
  }
  GetAllPreviewReward() {
    const r = [];
    var e = ConfigManager_1.ConfigManager.MotorConfig.GetAllMotorLevelList();
    var t = new Map();
    for (const s of e) {
      var i = s.RewardId;
      if (i !== 0) {
        i = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(i)?.DropPreview;
        if (i) {
          for (var [o, a] of i) {
            let e = t.get(o);
            if (e) {
              e[1] = e[1] + a;
            } else {
              e = [{
                IncId: 0,
                ItemId: o
              }, a];
              t.set(o, e);
            }
          }
        }
      }
    }
    t.forEach((e, t) => {
      r.push(e);
    });
    r.sort((e, t) => {
      var e = e[0].ItemId;
      var t = t[0].ItemId;
      var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
      var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
      var r = r ? r.QualityId : 0;
      var i = i ? i.QualityId : 0;
      if (r !== i) {
        return i - r;
      } else {
        return e - t;
      }
    });
    return r;
  }
  GetPreviewReward(e) {
    var t = [];
    if (e !== 0) {
      e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)?.DropPreview;
      if (e) {
        for (var [r, i] of e) {
          r = [{
            IncId: 0,
            ItemId: r
          }, i];
          t.push(r);
        }
      }
    }
    return t;
  }
  IsDailyExpToLimit() {
    return this.GGf > 0 && this.OGf >= this.GGf;
  }
  UpdateMotorExpAndLevel(e) {
    this.AWm = e.ILs;
    this.zVl = e.TLs;
    this.OGf = e.WFf;
    this.GGf = e.QFf;
    this.UpdateMotorLevelEffect();
  }
  UpdateMotorRewardedMaxLevel(e) {
    this.gmf = e.icf;
  }
  CheckMotorExpChange() {
    if (this.qbi < this.zVl) {
      this.SetLevelUp(this.qbi, this.zVl, this.AWm, this.qFf);
      this.qbi = this.zVl;
    }
    this.qFf = this.AWm;
    if (this.OGf === 0) {
      this.FGf = false;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDevelopIsFirstDailyExpLimit, false);
    }
    if (this.IsDailyExpToLimit() && !this.FGf) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorBike_ExpLimit_Tips");
      this.FGf = true;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDevelopIsFirstDailyExpLimit, true);
    }
  }
  SetExpChange(e, t, r, i, o) {
    this.ovi({
      AddExp: true,
      PreLevel: e,
      PreExp: r,
      CurLevel: e,
      CurExp: t
    });
  }
  SetLevelUp(e, t, r, i) {
    this.ovi({
      AddExp: true,
      PreLevel: e,
      PreExp: i,
      CurLevel: t,
      CurExp: r
    });
  }
  ONn(e) {
    if (this.OFf) {
      if (e.AddExp) {
        this.OFf.AddExp = e.AddExp;
      }
      if (e.PreLevel < this.OFf.PreLevel) {
        this.OFf.PreLevel = e.PreLevel;
        this.OFf.PreExp = e.PreExp;
      } else if (e.PreLevel === this.OFf.PreLevel && e.PreExp <= this.OFf.PreExp) {
        this.OFf.PreExp = e.PreExp;
      }
      if (e.CurLevel > this.OFf.CurLevel) {
        this.OFf.CurLevel = e.CurLevel;
        this.OFf.CurExp = e.CurExp;
      } else if (e.CurLevel === this.OFf.CurLevel && e.CurExp >= this.OFf.CurExp) {
        this.OFf.CurExp = e.CurExp;
      }
    }
  }
  ovi(e) {
    if (UiManager_1.UiManager.IsViewOpen("MotorcycleLevelUpView") && this.OFf) {
      this.ONn(e);
    } else {
      this.OFf = e;
      if (!UiManager_1.UiManager.GetViewByName("MotorcycleLevelUpView")) {
        UiManager_1.UiManager.OpenView("MotorcycleLevelUpView", this.OFf);
      }
    }
  }
  GetCacheData() {
    return this.OFf;
  }
  ClearCacheData() {
    this.OFf = undefined;
  }
  UpdateMotorLevelEffect() {
    var e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorLevelConfig(this.zVl);
    if (e) {
      FormationAttributeController_1.FormationAttributeController.AddSpeedModifier(this.OQo, 14, 0, e.NitrogenRecoverRate, 0);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 85, "无效的等级", ["Level", this.zVl]);
    }
  }
  RedDotHasLevelUpReward() {
    return this.gmf < this.zVl;
  }
  xWm() {
    if (!(this.TechNodeMap.size > 0)) {
      for (const t of ConfigManager_1.ConfigManager.MotorConfig.GetAllMotorTreeIds()) {
        for (const r of ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfigList(t)) {
          var e = new MotorcycleDevelopDefine_1.MotorTechTreeNode(r.Id, r.TreeType, r.PreNode);
          this.TechNodeMap.set(r.Id, e);
        }
      }
    }
  }
  UpdateCurTreeType(e) {
    this.DWm = e;
  }
  UpdateSelectedTreeType(e) {
    this.Fmf = e;
  }
  UpdateDamgeIdToSkillLevel(e, t, r) {
    if (t !== r) {
      if (t > 0) {
        t = this.GetnodeEffectConfig(e, t);
        if (t) {
          for (const o of t.DamageIdList) {
            this.DamgeIdToSkillLevel.delete(o);
          }
        }
      }
      if (r > 0) {
        var i = this.GetnodeEffectConfig(e, r);
        if (i) {
          for (const a of i.DamageIdList) {
            if (this.DamgeIdToSkillLevel.has(a)) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Vehicle", 85, "重复的结算ID", ["ID", a]);
              }
            } else {
              this.DamgeIdToSkillLevel.set(a, i.SkillLevel);
            }
          }
        }
      }
    }
  }
  UpdateTechNodeList(e) {
    for (const r of e) {
      var t = this.TechNodeMap.get(r.s5n);
      if (t && (this.UpdateDamgeIdToSkillLevel(r.s5n, t.NodeLevel, r.F6n), t.NodeLevel = r.F6n, t.CurrentValue = r.lMs, t.TargetValue = r.j6n, r.CMs)) {
        t.Status = r.F6n >= 1 ? 1 : 0;
      }
    }
  }
  UpdateOneTechTree(e) {
    e = e.ocf;
    this.xWm();
    for (const r of e) {
      var t = this.TechNodeMap.get(r.s5n);
      if (t && (this.UpdateDamgeIdToSkillLevel(r.s5n, t.NodeLevel, r.F6n), t.NodeLevel = r.F6n, t.CurrentValue = r.lMs, t.TargetValue = r.j6n, r.CMs)) {
        t.Status = r.F6n >= 1 ? 1 : 0;
      }
    }
  }
  UpdateTechTree(e) {
    for (const t of e) {
      this.UnlockTechTree(t.ecf);
      this.UpdateOneTechTree(t);
    }
  }
  UpdateTechTreeNewUnlocked(e, t) {
    let r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDevelopNewUnlockTree);
    if ((r = r || new Map()).get(e) !== false) {
      r.set(e, t);
    }
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDevelopNewUnlockTree, r);
  }
  UnlockTechNode(e) {
    for (const t of e) {
      this.RefreshTechTreeNode(t, 0);
    }
  }
  UnlockTechTree(e) {
    if (!this.Cmf.includes(e)) {
      this.Cmf.push(e);
      this.UpdateTechTreeNewUnlocked(e, true);
    }
    this.Cmf.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(e);
      t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(t);
      return (e ? e.Order : 0) - (t ? t.Order : 0);
    });
  }
  GetCommonTechNodeIdList(e) {
    var t = [];
    const r = [];
    for (const i of ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfigList(e)) {
      if (i.Type === 0) {
        t.push(i);
      }
    }
    t.sort((e, t) => e.GeneralNodeSortOrder - t.GeneralNodeSortOrder);
    t.forEach(e => {
      r.push(e.Id);
    });
    return r;
  }
  FindTechNodeIdByCoord(e, t) {
    let r = -1;
    for (const o of ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfigList(t)) {
      var i = o.ExclusiveNodeSortOrder;
      if (e[0] === i[0] && e[1] === i[1]) {
        r = o.Id;
        break;
      }
    }
    return r;
  }
  GetSkillLevelByDamageId(e) {
    return this.DamgeIdToSkillLevel.get(e);
  }
  GetCurTreeType() {
    return this.DWm;
  }
  GetSelectedTreeType() {
    return this.Fmf;
  }
  GetActivatedTreeTypeList() {
    return this.Cmf;
  }
  GetTechNodeById(e) {
    return this.TechNodeMap.get(e);
  }
  GetExclusiveNodeParamList(e) {
    var t;
    var r = [];
    var i = [];
    for (const d of ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfigList(e)) {
      if (d.Type === 1) {
        t = d.ExclusiveNodeSortOrder;
        i.push(t);
      }
    }
    var o;
    var a;
    var s = new Map();
    for (const _ of i) {
      var n;
      var h = _[0];
      var l = _[1];
      if (h > 0) {
        if (!(n = s.get(h) ?? []).includes(l)) {
          n.push(l);
        }
        n.sort((e, t) => e - t);
        s.set(h, n);
      }
    }
    for ([o, a] of s) {
      var c = [];
      var f = [];
      for (const M of a) {
        if (M > 0) {
          c.push(this.FindTechNodeIdByCoord([o, M], e));
        } else if (M < 0) {
          f.push(this.FindTechNodeIdByCoord([o, M], e));
        }
      }
      var g = this.FindTechNodeIdByCoord([o, 0], e);
      r.push({
        TopIds: c,
        BottomIds: f,
        MiddleId: g
      });
    }
    return r;
  }
  RefreshTechTreeNode(e, t) {
    e = this.GetTechNodeById(e);
    if (e) {
      e.Status = t;
    }
  }
  IsLinkTimeNodeActivated() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("MotorTechLinkTimeNodeId") ?? 0;
    var e = this.GetTechNodeById(e);
    return e !== undefined && e.Status === 1;
  }
  IsPreNodeActivated(e) {
    let t = false;
    if (!e.PreNodeIds || e.PreNodeIds.length === 0) {
      t = true;
    }
    for (const i of e.PreNodeIds) {
      if (i === 0) {
        t = true;
        break;
      }
      var r = this.GetTechNodeById(i);
      if (r && r.Status === 1) {
        t = true;
        break;
      }
    }
    return t;
  }
  IsAllNodeMaxLevel(e) {
    for (const r of this.TechNodeMap.values()) {
      if (r.TreeType === e) {
        var t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(r.NodeId);
        if (!t) {
          return false;
        }
        if (r.NodeLevel < t.TechLv.length) {
          return false;
        }
      }
    }
    return true;
  }
  GetnodeEffectConfig(e, t) {
    e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(e);
    if (e && !(t <= 0)) {
      e = e.TechLv[t - 1];
      t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechLvConfig(e);
      if (t) {
        return ConfigManager_1.ConfigManager.MotorConfig.GetMotorEffectConfig(t.Effect);
      }
    }
  }
  CanUpgradeNode(e) {
    var t;
    var r;
    var i = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(e.TreeType);
    return !!i && !!(t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(e.NodeId)) && !(e = e.NodeLevel === t.TechLv.length ? e.NodeLevel : e.NodeLevel + 1, t = t.TechLv[e - 1], !(r = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechLvConfig(t))) && !!r.Consume && ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i.TpItemId) - r.Consume >= 0;
  }
  RedDotHasAnyNewTechTree() {
    for (const e of this.Cmf) {
      if (this.RedDotHasNewTechTree(e)) {
        return true;
      }
    }
    return false;
  }
  RedDotHasNewTechTree(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDevelopNewUnlockTree);
    return !!t && (t.get(e) ?? false);
  }
  RedDotHasUpgradableTechNode(e) {
    for (const o of this.TechNodeMap.values()) {
      var t = e === undefined || o.TreeType === e;
      var r = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(o.NodeId);
      var r = o.NodeLevel >= r.TechLv.length;
      var i = o.Status === -1;
      if (t && !r && !i && this.CanUpgradeNode(o)) {
        return true;
      }
    }
    return false;
  }
  UpdateOneTask(e) {
    let t = this.UWm.get(e.s5n);
    if (!t) {
      r = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTaskConfig(e.s5n);
      (t = new MotorcycleDevelopDefine_1.MotorTechTaskNode()).TaskId = r.Id;
      t.TreeType = r.TreeType;
      this.UWm.set(e.s5n, t);
    }
    t.StartTime = MathUtils_1.MathUtils.LongToNumber(e.Mps);
    t.EndTime = MathUtils_1.MathUtils.LongToNumber(e.dps);
    t.ProcessInfo.Current = e.$m1.lMs;
    t.ProcessInfo.Target = e.$m1.j6n;
    t.RewardInfo.WaitRewardCount = e.DS_.jm1;
    t.RewardInfo.RewardedCount = e.DS_.mLs;
    t.RewardInfo.MaxRewardCount = e.DS_.Hm1;
    var r = e.h5n;
    switch (r) {
      case Protocol_1.Aki.Protocol.lcf.Proto_Unknown:
        t.Type = 0;
        break;
      case Protocol_1.Aki.Protocol.lcf.Proto_Single:
        t.Type = 1;
        break;
      case Protocol_1.Aki.Protocol.lcf.Proto_Cycle:
        t.Type = 3;
        break;
      case Protocol_1.Aki.Protocol.lcf.Proto_Limited:
        t.Type = 2;
    }
  }
  UpdateOneTreeTask(e) {
    for (const t of e) {
      this.UpdateOneTask(t);
    }
  }
  UpdateAllTreeTask(e) {
    for (const t of e) {
      this.pmf.set(t.ecf, t.hcf);
      this.UpdateOneTreeTask(t.cMs);
    }
  }
  GetTaskNodeInfo(e) {
    return this.UWm.get(e);
  }
  GetTaskListByTree(r) {
    const i = [];
    const o = TimeUtil_1.TimeUtil.GetServerTime();
    this.UWm.forEach((e, t) => {
      if (e.TreeType === r) {
        if (e.Type === 2) {
          if (e.StartTime < o && e.EndTime > o) {
            i.push(e);
          }
        } else if (e.Type !== 3 || e.RewardInfo.MaxRewardCount !== 0 && e.RewardInfo.MaxRewardCount !== -1) {
          i.push(e);
        }
      }
    });
    i.sort((e, t) => {
      var r;
      var i;
      var o = e.RewardInfo.WaitRewardCount;
      var a = t.RewardInfo.WaitRewardCount;
      if (o !== a) {
        return a - o;
      } else {
        a = e.RewardInfo.MaxRewardCount;
        o = t.RewardInfo.MaxRewardCount;
        r = e.RewardInfo.RewardedCount;
        i = t.RewardInfo.RewardedCount;
        if ((a = a > 0 && a <= r ? 0 : 1) != (r = o > 0 && o <= i ? 0 : 1)) {
          return r - a;
        } else {
          o = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTaskConfig(e.TaskId);
          i = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTaskConfig(t.TaskId);
          return (o ? o.SortOrder : 0) - (i ? i.SortOrder : 0);
        }
      }
    });
    return i;
  }
  GetWaitRewardTaskIds(e) {
    var t = [];
    for (const r of this.GetTaskListByTree(e)) {
      if (r.RewardInfo.WaitRewardCount > 0) {
        t.push(r.TaskId);
      }
    }
    return t;
  }
  GetCostPointByTree(e) {
    let t = 0;
    for (const o of ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfigList(e)) {
      var r = this.GetTechNodeById(o.Id);
      if (r) {
        for (let e = 0; e < o.TechLv.length; e++) {
          var i = o.TechLv[e];
          var i = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechLvConfig(i);
          if (i && r.NodeLevel >= e + 1) {
            t += i.Consume;
          }
        }
      }
    }
    return t;
  }
  GetFreePointByTree(e) {
    e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(e);
    if (e) {
      return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.TpItemId);
    } else {
      return 0;
    }
  }
  GetTotalPointByTree(e) {
    let t = 0;
    e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(e);
    return t = e ? e.TaskLimitPointNum : t;
  }
  IsOverLimitPointNum(e) {
    var t = this.GetCostPointByTree(e);
    var r = this.GetFreePointByTree(e);
    return this.GetTotalPointByTree(e) <= t + r;
  }
  RedDotCanGetAnyTaskReward() {
    for (const e of this.GetActivatedTreeTypeList()) {
      if (this.RedDotCanGetTaskReward(e)) {
        return true;
      }
    }
    return false;
  }
  RedDotCanGetTaskReward(e) {
    if (!this.IsOverLimitPointNum(e)) {
      for (const t of this.UWm.values()) {
        if ((e === undefined || t.TreeType === e) && t.RewardInfo.WaitRewardCount > 0) {
          return true;
        }
      }
    }
    return false;
  }
  StartSwitchTechTreeLockTimer(e) {
    this.RemoveSwitchTechTreeLockTimer();
    this.xAg = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.RemoveSwitchTechTreeLockTimer();
    }, e * 1000);
  }
  RemoveSwitchTechTreeLockTimer() {
    if (this.xAg) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.xAg);
      this.xAg = undefined;
    }
  }
  IsSwitchTechTreeTimeLocked() {
    return this.xAg !== undefined;
  }
  IsSwitchTechTreePlayerLocked() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(217);
    if (e.HasTag(-1371021686) || e.HasTag(1996802261)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_ForbiddenActionInFight_Text");
      return true;
    } else {
      return (!!e.HasTag(40422668) || !!e.HasTag(-1330336472) || !!e.HasTag(1566606455)) && (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_ForbiddenActionMidair_Text"), true);
    }
  }
}
exports.MotorcycleDevelopModel = MotorcycleDevelopModel;
//# sourceMappingURL=MotorcycleDevelopModel.js.map