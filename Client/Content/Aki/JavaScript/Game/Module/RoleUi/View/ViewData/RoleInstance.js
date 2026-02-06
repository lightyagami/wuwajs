"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleInstance = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ResonanceDataInfo_1 = require("../../RoleData/Module/DataInfo/ResonanceDataInfo");
const SkillNodeDataInfo_1 = require("../../RoleData/Module/DataInfo/SkillNodeDataInfo");
const RoleSkillData_1 = require("../../RoleData/Module/RoleSkillData");
const RoleDataBase_1 = require("../../RoleData/RoleDataBase");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
class RoleInstance extends RoleDataBase_1.RoleDataBase {
  constructor(e) {
    super(e);
    this.CreateTime = 0;
  }
  IsTrialRole() {
    return false;
  }
  SetRoleName(e) {
    var t;
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      t = this.GetRoleConfig();
      this.Name = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(t.Name);
    } else {
      this.Name = e;
    }
  }
  GetName(e) {
    if (ModelManager_1.ModelManager.PlayerInfoModel.IsPlayerId(this.Id, e)) {
      return ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    } else {
      return this.GetRoleRealName();
    }
  }
  GetRoleRealName() {
    var e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(this.GetRoleSkinId());
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.GetName());
  }
  GetSkillInfoLevel(e) {
    return this.GetSkillData().GetReferencedSkillLevel(e, RoleSkillData_1.ERoleSkillReferenceType.SkillInfo);
  }
  GetRoleId() {
    return this.Id;
  }
  GetRoleCreateTime() {
    return this.CreateTime;
  }
  RefreshSkillInfo(e, t) {
    var a = this.GetSkillData();
    a.SetSkillLevel(e, t);
    a.SetSkillReferenceMapBySkillId(e);
    var a = new Protocol_1.Aki.Protocol.e5s();
    a.Z4n = e;
    a.e5n = t;
    EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.RoleSkillLevelUp, this.GetRoleId(), a);
  }
  RefreshRoleAttr(e, t) {
    var a = this.GetAttributeData();
    var o = a.GetOldRoleBaseAttr();
    a.ClearRoleBaseAttr();
    for (const n of e) {
      a.SetRoleBaseAttr(n.Z4n, n.e5n);
      o.set(n.Z4n, n.e5n);
    }
    var r = a.GetOldRoleAddAttr();
    a.ClearRoleAddAttr();
    for (const i of t) {
      a.SetRoleAddAttr(i.Z4n, i.e5n);
      r.set(i.Z4n, i.e5n);
    }
    e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    if (e !== 0 && ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).ShareAttri === 0) {
      o.delete(EAttributeId.Proto_Life);
      r.delete(EAttributeId.Proto_Life);
    }
    EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.RoleRefreshAttribute, o, r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleRefreshAttribute, o, r);
  }
  RefreshRoleInfo(t) {
    this.SetRoleName(t.H8n);
    this.CreateTime = t.aws;
    var e = this.GetLevelData();
    e.SetLevel(t.F6n);
    e.SetExp(t.U8n);
    e.SetBreachLevel(t.txs);
    var a = this.GetSkillData();
    for (const l of t.axs) {
      a.SetSkillLevel(l.Z4n, l.e5n);
      a.SetSkillReferenceMapBySkillId(l.Z4n);
    }
    var o = this.GetPhantomData();
    for (const f of t.hxs) {
      o.RefreshPhantom(f.Z4n, f.e5n);
    }
    var r = t.dxs.length;
    var n = new Map();
    for (let e = 0; e < r; e++) {
      var i = t.dxs[e];
      var s = i.qHn;
      var i = new SkillNodeDataInfo_1.SkillNodeDataInfo(s, i.WHn, i.r5n);
      n.set(s, i);
    }
    a.SetSkillNodeStateData(n);
    this.RefreshRoleAttr(t.bws, t.Bws);
    for (const _ of t._xs) {
      this.RefreshResonance(_);
    }
    this.GetResonanceData().SetResonantChainGroupIndex(t.mxs);
    this.SetRoleSkinId(t.Z7n);
    this.SetBackgroundMusicEnabled(t.FWc);
  }
  RefreshResonance(e) {
    var t = this.GetResonanceData();
    var e = new ResonanceDataInfo_1.ResonanceDataInfo(e.nxs, e.Sps, e.sxs);
    t.SetResonance(e);
  }
  CanChangeName() {
    return !ModelManager_1.ModelManager.PlayerInfoModel.IsPlayerId(this.Id) || !ConfigManager_1.ConfigManager.PlayerInfoConfig.GetIsUseAccountName();
  }
  IsOnlineRole() {
    return false;
  }
  GetIsNew() {
    return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem, this.Id);
  }
  TryRemoveNewFlag() {
    return !!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem, this.Id) && (ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem, this.Id), true);
  }
}
exports.RoleInstance = RoleInstance;
//# sourceMappingURL=RoleInstance.js.map