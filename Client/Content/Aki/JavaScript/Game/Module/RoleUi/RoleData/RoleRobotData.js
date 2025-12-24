"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleRobotData = undefined;
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AttributeModel_1 = require("../../Attribute/AttributeModel");
const PhantomTrialBattleData_1 = require("../../Phantom/PhantomBattle/Data/PhantomTrialBattleData");
const WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData");
const SkillNodeDataInfo_1 = require("./Module/DataInfo/SkillNodeDataInfo");
const RoleDataBase_1 = require("./RoleDataBase");
class RoleRobotData extends RoleDataBase_1.RoleDataBase {
  constructor(a) {
    super(a);
    this.r_o = undefined;
    this.SetDefaultData();
  }
  SetDefaultData() {
    this.n_o();
    this.s_o();
    this.a_o();
    this.h_o();
    this.l_o();
    this.Cbl();
  }
  n_o() {
    var a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.Id);
    var e = this.GetLevelData();
    e.SetLevel(a.Level);
    var t = this.GetRoleConfig();
    for (const r of ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachList(t.BreachId)) {
      if (a.Level <= r.MaxLevel) {
        e.SetBreachLevel(r.BreachLevel);
        break;
      }
    }
  }
  s_o() {
    var a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.Id);
    var e = this.GetSkillData();
    var t = this.GetRoleConfig().SkillId;
    var r = this.GetRoleId();
    var i = ModelManager_1.ModelManager.RoleModel.ClientCheckRoleIsUpgradeLightMainRole(r);
    for (const g of e.GetSkillList()) {
      var n = this.__o(g.Id);
      var n = n < a.UnlockSkillLevel ? n : a.UnlockSkillLevel;
      var o = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndSkillId(t, g.Id);
      if (o || i) {
        if (o?.NodeType === 3) {
          e.SetSkillLevel(g.Id, 0);
        } else {
          e.SetSkillLevel(g.Id, n);
        }
        e.SetSkillReferenceMapBySkillId(g.Id);
      }
    }
    var s = [];
    for (const h of a.UnlockSkillNodeList) {
      var l = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(t, h);
      var _ = l?.NodeType;
      if (_ === 4 || _ === 3) {
        s.push(new SkillNodeDataInfo_1.SkillNodeDataInfo(l.Id, true, l.SkillId));
      }
    }
    if (s.length > 0) {
      e.SetSkillNodeStateData(s);
    }
  }
  __o(a) {
    a = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillLevelConfigList(a));
    a.sort((a, e) => a.Id - e.Id);
    a = a[a.length - 1];
    return a.SkillId;
  }
  a_o() {
    var a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.Id);
    this.GetResonanceData().SetResonantChainGroupIndex(a.ResonanceLevel);
  }
  h_o() {
    var a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.Id);
    this.r_o = new WeaponTrialData_1.WeaponTrialData();
    this.r_o.SetTrialId(a.TrailWeapon);
    this.r_o.SetRoleId(this.Id);
  }
  l_o() {
    var t = this.GetPhantomData();
    t.SetIsTrial(true);
    var r = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.Id);
    for (let a = 0, e = r.PhantomEquipList.length; a < e; ++a) {
      var i = r.PhantomEquipList[a];
      var n = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetTrialPhantomPropConfig(i.Item2);
      var o = new PhantomTrialBattleData_1.PhantomTrialBattleData();
      o.SetIncId(PhantomTrialBattleData_1.PhantomTrialBattleData.GenerateLocalUniqueId(this.GetRoleId(), a));
      o.SetConfigId(i.Item1);
      o.SetPhantomLevel(n.Level);
      o.SetSlotIndex(a);
      o.SetFetterGroupId(n.FetterGroupId);
      for (const g of n.MainProps) {
        var s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetTrailPhantomPropItemById(g);
        var l = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomGrowthValueByGrowthIdAndLevel(n.MainPropGrowth, n.Level);
        var l = AttributeModel_1.TipsDataTool.GetAttributeValue(s.Value, l, false);
        o.SetMainPropValue(s.Id, l, s.IsRatio);
      }
      for (const h of n.SubPropList) {
        var _ = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetTrailPhantomPropItemById(h);
        o.SetSubPropValue(_.Id, _.Value, _.IsRatio);
      }
      t.SetDataMap(a, o);
      ModelManager_1.ModelManager.PhantomBattleModel.SetRobotPhantomData(o.GetIncrId(), o);
    }
  }
  Cbl() {
    var a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.Id);
    if (a.RoleSkin > 0) {
      this.SetRoleSkinId(a.RoleSkin);
    }
  }
  GetRoleId() {
    return ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.Id).ParentId;
  }
  IsTrialRole() {
    return true;
  }
  GetName(a) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(this.GetRoleConfig().Name);
  }
  SetName(a) {
    this.Name = a;
  }
  CanChangeName() {
    return false;
  }
  GetWeaponData() {
    return this.r_o;
  }
  IsOnlineRole() {
    return false;
  }
  GetRoleCreateTime() {
    return 0;
  }
  GetIsNew() {
    return false;
  }
  CanEditInFormation() {
    return false;
  }
  IsVisibleInFormation() {
    return false;
  }
  GetTrialRoleId() {
    return this.Id;
  }
}
exports.RoleRobotData = RoleRobotData;
//# sourceMappingURL=RoleRobotData.js.map