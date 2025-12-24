"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDevelopModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const FormationAttributeController_1 = require("../../Abilities/FormationAttributeController");
const MotorcycleDevelopDefine_1 = require("./MotorcycleDevelopDefine");
class MotorcycleDevelopModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.qbi = -1;
    this.Qxf = -1;
    this.ZUf = 0;
    this.exf = 0;
    this.txf = false;
    this.zVl = 1;
    this.ZHm = 0;
    this.vcf = 0;
    this.Kxf = undefined;
    this.OQo = "MotorLevel";
    this.xjm = 0;
    this.Hcf = 0;
    this.ycf = [];
    this.TechNodeMap = new Map();
    this.DamgeIdToSkillLevel = new Map();
    this.Scf = new Map();
    this.Bjm = new Map();
  }
  UpdateMotorInfo(e) {
    this.zVl = e.Q1f;
    this.ZHm = e.K1f;
    this.vcf = e.j1f;
    this.ZUf = e.iBf;
    this.exf = e.rBf;
    this.xjm = e.H1f;
    this.txf = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDevelopIsFirstDailyExpLimit) ?? false;
    if (this.qbi === -1) {
      this.qbi = this.zVl;
    }
    if (this.Qxf === -1) {
      this.Qxf = this.ZHm;
    }
    this.UpdateTechTree(e.X1f);
    this.UpdateAllTreeTask(e.$1f);
    this.UpdateMotorLevelEffect();
  }
  GetMotorTabList() {
    var t = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("MotorcycleRootView");
    var r = t.length;
    var o = [];
    for (let e = 0; e < r; e++) {
      var i = t[e];
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(i.FunctionId)) {
        o.push(i);
      }
    }
    return o;
  }
  GetLastLevel() {
    return this.qbi;
  }
  GetLastExp() {
    return this.Qxf;
  }
  GetCurLevel() {
    return this.zVl;
  }
  GetCurExp() {
    return this.ZHm;
  }
  GetCurRewardedMaxLv() {
    return this.vcf;
  }
  GetAttrValueByType(e, t) {
    let r = 0;
    var o = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    var i = ConfigManager_1.ConfigManager.MotorConfig.GetMotorLevelConfig(t);
    if (i) {
      var a = i.WorldLv2Attack.get(o);
      var s = i.WorldLv2MotorShield.get(o);
      switch (e) {
        case 3:
          r = a || 0;
          break;
        case 1:
          r = i.Speed;
          break;
        case 5:
          r = i.NitrogenSpeedValue;
          break;
        case 2:
          r = i.NitrogenValue;
          break;
        case 7:
          r = i.NitrogenRecoverRate;
          break;
        case 8:
          r = i.NitrogenRecoverCoolDown;
          break;
        case 6:
          r = i.NitrogenConsumeRate;
          break;
        case 9:
          r = i.MotorInitialShieldRate;
          break;
        case 4:
          r = s || 0;
          break;
        case 10:
          r = i.MotorShieldRecoverRate;
          break;
        case 11:
          r = i.MotorShieldCoolDown;
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
      var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
      var r = r ? r.QualityId : 0;
      var o = o ? o.QualityId : 0;
      if (r !== o) {
        return o - r;
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
      var o = s.RewardId;
      if (o !== 0) {
        o = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(o)?.DropPreview;
        if (o) {
          for (var [i, a] of o) {
            let e = t.get(i);
            if (e) {
              e[1] = e[1] + a;
            } else {
              e = [{
                IncId: 0,
                ItemId: i
              }, a];
              t.set(i, e);
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
      var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
      var r = r ? r.QualityId : 0;
      var o = o ? o.QualityId : 0;
      if (r !== o) {
        return o - r;
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
        for (var [r, o] of e) {
          r = [{
            IncId: 0,
            ItemId: r
          }, o];
          t.push(r);
        }
      }
    }
    return t;
  }
  IsDailyExpToLimit() {
    return this.exf > 0 && this.ZUf >= this.exf;
  }
  UpdateMotorExpAndLevel(e) {
    this.ZHm = e.ILs;
    this.zVl = e.TLs;
    this.ZUf = e.iBf;
    this.exf = e.rBf;
    this.UpdateMotorLevelEffect();
  }
  UpdateMotorRewardedMaxLevel(e) {
    this.vcf = e.j1f;
  }
  CheckMotorExpChange() {
    if (this.qbi < this.zVl) {
      this.SetLevelUp(this.qbi, this.zVl, this.ZHm, this.Qxf);
      this.qbi = this.zVl;
    }
    this.Qxf = this.ZHm;
    if (this.ZUf === 0) {
      this.txf = false;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDevelopIsFirstDailyExpLimit, false);
    }
    if (this.IsDailyExpToLimit() && !this.txf) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorBike_ExpLimit_Tips");
      this.txf = true;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDevelopIsFirstDailyExpLimit, true);
    }
  }
  SetExpChange(e, t, r, o, i) {
    this.ovi({
      AddExp: true,
      PreLevel: e,
      PreExp: r,
      CurLevel: e,
      CurExp: t
    });
  }
  SetLevelUp(e, t, r, o) {
    this.ovi({
      AddExp: true,
      PreLevel: e,
      PreExp: o,
      CurLevel: t,
      CurExp: r
    });
  }
  ONn(e) {
    if (this.Kxf) {
      if (e.AddExp) {
        this.Kxf.AddExp = e.AddExp;
      }
      if (e.PreLevel < this.Kxf.PreLevel) {
        this.Kxf.PreLevel = e.PreLevel;
        this.Kxf.PreExp = e.PreExp;
      } else if (e.PreLevel === this.Kxf.PreLevel && e.PreExp <= this.Kxf.PreExp) {
        this.Kxf.PreExp = e.PreExp;
      }
      if (e.CurLevel > this.Kxf.CurLevel) {
        this.Kxf.CurLevel = e.CurLevel;
        this.Kxf.CurExp = e.CurExp;
      } else if (e.CurLevel === this.Kxf.CurLevel && e.CurExp >= this.Kxf.CurExp) {
        this.Kxf.CurExp = e.CurExp;
      }
    }
  }
  ovi(e) {
    if (UiManager_1.UiManager.IsViewOpen("MotorcycleLevelUpView") && this.Kxf) {
      this.ONn(e);
    } else {
      this.Kxf = e;
      if (!UiManager_1.UiManager.GetViewByName("MotorcycleLevelUpView")) {
        UiManager_1.UiManager.OpenView("MotorcycleLevelUpView", this.Kxf);
      }
    }
  }
  GetCacheData() {
    return this.Kxf;
  }
  ClearCacheData() {
    this.Kxf = undefined;
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
    return this.vcf < this.zVl;
  }
  kjm() {
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
    this.xjm = e;
  }
  UpdateSelectedTreeType(e) {
    this.Hcf = e;
  }
  UpdateDamgeIdToSkillLevel(e, t, r) {
    if (t !== r) {
      if (t > 0) {
        t = this.GetnodeEffectConfig(e, t);
        if (t) {
          for (const i of t.DamageIdList) {
            this.DamgeIdToSkillLevel.delete(i);
          }
        }
      }
      if (r > 0) {
        var o = this.GetnodeEffectConfig(e, r);
        if (o) {
          for (const a of o.DamageIdList) {
            if (this.DamgeIdToSkillLevel.has(a)) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Vehicle", 85, "重复的结算ID", ["ID", a]);
              }
            } else {
              this.DamgeIdToSkillLevel.set(a, o.SkillLevel);
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
    e = e.W1f;
    this.kjm();
    for (const r of e) {
      var t = this.TechNodeMap.get(r.s5n);
      if (t && (this.UpdateDamgeIdToSkillLevel(r.s5n, t.NodeLevel, r.F6n), t.NodeLevel = r.F6n, t.CurrentValue = r.lMs, t.TargetValue = r.j6n, r.CMs)) {
        t.Status = r.F6n >= 1 ? 1 : 0;
      }
    }
  }
  UpdateTechTree(e) {
    for (const t of e) {
      this.UnlockTechTree(t.V1f);
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
    if (!this.ycf.includes(e)) {
      this.ycf.push(e);
      this.UpdateTechTreeNewUnlocked(e, true);
    }
    this.ycf.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(e);
      t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(t);
      return (e ? e.Order : 0) - (t ? t.Order : 0);
    });
  }
  GetCommonTechNodeIdList(e) {
    var t = [];
    const r = [];
    for (const o of ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfigList(e)) {
      if (o.Type === 0) {
        t.push(o);
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
    for (const i of ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfigList(t)) {
      var o = i.ExclusiveNodeSortOrder;
      if (e[0] === o[0] && e[1] === o[1]) {
        r = i.Id;
        break;
      }
    }
    return r;
  }
  GetSkillLevelByDamageId(e) {
    return this.DamgeIdToSkillLevel.get(e);
  }
  GetCurTreeType() {
    return this.xjm;
  }
  GetSelectedTreeType() {
    return this.Hcf;
  }
  GetActivatedTreeTypeList() {
    return this.ycf;
  }
  GetTechNodeById(e) {
    return this.TechNodeMap.get(e);
  }
  GetExclusiveNodeParamList(e) {
    var t;
    var r = [];
    var o = [];
    for (const d of ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfigList(e)) {
      if (d.Type === 1) {
        t = d.ExclusiveNodeSortOrder;
        o.push(t);
      }
    }
    var i;
    var a;
    var s = new Map();
    for (const M of o) {
      var n;
      var h = M[0];
      var f = M[1];
      if (h > 0) {
        if (!(n = s.get(h) ?? []).includes(f)) {
          n.push(f);
        }
        n.sort((e, t) => e - t);
        s.set(h, n);
      }
    }
    for ([i, a] of s) {
      var l = [];
      var c = [];
      for (const _ of a) {
        if (_ > 0) {
          l.push(this.FindTechNodeIdByCoord([i, _], e));
        } else if (_ < 0) {
          c.push(this.FindTechNodeIdByCoord([i, _], e));
        }
      }
      var g = this.FindTechNodeIdByCoord([i, 0], e);
      r.push({
        TopIds: l,
        BottomIds: c,
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
    for (const o of e.PreNodeIds) {
      if (o === 0) {
        t = true;
        break;
      }
      var r = this.GetTechNodeById(o);
      if (r && r.Status === 1) {
        t = true;
        break;
      }
    }
    return t;
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
    var o = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(e.TreeType);
    return !!o && !!(t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(e.NodeId)) && !(e = e.NodeLevel === t.TechLv.length ? e.NodeLevel : e.NodeLevel + 1, t = t.TechLv[e - 1], !(r = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechLvConfig(t))) && !!r.Consume && ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o.TpItemId) - r.Consume >= 0;
  }
  RedDotHasAnyNewTechTree() {
    for (const e of this.ycf) {
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
      if (t && !r && this.CanUpgradeNode(o)) {
        return true;
      }
    }
    return false;
  }
  UpdateOneTask(e) {
    let t = this.Bjm.get(e.s5n);
    if (!t) {
      r = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTaskConfig(e.s5n);
      (t = new MotorcycleDevelopDefine_1.MotorTechTaskNode()).TaskId = r.Id;
      t.TreeType = r.TreeType;
      this.Bjm.set(e.s5n, t);
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
      case Protocol_1.Aki.Protocol.z1f.Proto_Unknown:
        t.Type = 0;
        break;
      case Protocol_1.Aki.Protocol.z1f.Proto_Single:
        t.Type = 1;
        break;
      case Protocol_1.Aki.Protocol.z1f.Proto_Cycle:
        t.Type = 3;
        break;
      case Protocol_1.Aki.Protocol.z1f.Proto_Limited:
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
      this.Scf.set(t.V1f, t.Y1f);
      this.UpdateOneTreeTask(t.cMs);
    }
  }
  GetTaskNodeInfo(e) {
    return this.Bjm.get(e);
  }
  GetTaskListByTree(r) {
    const o = [];
    const i = TimeUtil_1.TimeUtil.GetServerTime();
    this.Bjm.forEach((e, t) => {
      if (e.TreeType === r) {
        if (e.Type === 2) {
          if (e.StartTime < i && e.EndTime > i) {
            o.push(e);
          }
        } else if (e.Type !== 3 || e.RewardInfo.MaxRewardCount !== 0 && e.RewardInfo.MaxRewardCount !== -1) {
          o.push(e);
        }
      }
    });
    o.sort((e, t) => {
      var r;
      var o;
      var i = e.RewardInfo.WaitRewardCount;
      var a = t.RewardInfo.WaitRewardCount;
      if (i !== a) {
        return a - i;
      } else {
        a = e.RewardInfo.MaxRewardCount;
        i = t.RewardInfo.MaxRewardCount;
        r = e.RewardInfo.RewardedCount;
        o = t.RewardInfo.RewardedCount;
        if ((a = a > 0 && a <= r ? 0 : 1) != (r = i > 0 && i <= o ? 0 : 1)) {
          return r - a;
        } else {
          i = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTaskConfig(e.TaskId);
          o = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTaskConfig(t.TaskId);
          return (i ? i.SortOrder : 0) - (o ? o.SortOrder : 0);
        }
      }
    });
    return o;
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
    for (const i of ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfigList(e)) {
      var r = this.GetTechNodeById(i.Id);
      if (r) {
        for (let e = 0; e < i.TechLv.length; e++) {
          var o = i.TechLv[e];
          var o = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechLvConfig(o);
          if (o && r.NodeLevel >= e + 1) {
            t += o.Consume;
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
  RedDotCanGetTaskReward(e) {
    for (const t of this.GetActivatedTreeTypeList()) {
      if (this.IsOverLimitPointNum(t)) {
        return false;
      }
    }
    for (const r of this.Bjm.values()) {
      if ((e === undefined || r.TreeType === e) && r.RewardInfo.WaitRewardCount > 0) {
        return true;
      }
    }
    return false;
  }
}
exports.MotorcycleDevelopModel = MotorcycleDevelopModel;
//# sourceMappingURL=MotorcycleDevelopModel.js.map