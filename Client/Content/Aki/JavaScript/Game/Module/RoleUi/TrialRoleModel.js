"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrialRoleModel = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const PhantomUtil_1 = require("../Phantom/PhantomUtil");
const RoleSpecialRobotData_1 = require("./RoleData/RoleSpecialRobotData");
const RoleUtils_1 = require("./RoleUtils");
const TrialRoleGroupData_1 = require("./TrialRoleGroupData");
class TrialRoleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CNf = [];
    this.pNf = new Map();
    this.vNf = new Map();
    this.yNf = new Map();
    this.lCg = new Set();
    this.o5t = "TrialRoleOperateForbidState";
  }
  AddTrialRoles(e) {
    for (const r of e) {
      this.AddTrialRole(r);
    }
  }
  AddTrialRole(e) {
    var r;
    var t = e.TrialRoleId;
    if (RoleUtils_1.RoleUtils.IsSpecialTrialRole(t)) {
      r = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleGroupId(t);
      if (!this.pNf.get(r)) {
        (r = new TrialRoleGroupData_1.TrialRoleGroupData(t)).SetIsUnlocked(e.IsUnlocked);
        this.CNf.push(r);
        this.pNf.set(r.TrialRoleGroupId, r);
        t = r.TrialRoleType;
        if (!this.vNf.get(t)) {
          this.vNf.set(t, []);
        }
        this.vNf.get(t).push(r);
      }
    }
  }
  GetDataListByType(e) {
    return this.vNf.get(e) ?? [];
  }
  GetDataByGroupId(e) {
    return this.pNf.get(e);
  }
  GetCurUseTrialRole(e) {
    return this.yNf.get(e);
  }
  SetCurUseTrialRole(e, r) {
    var t;
    if (RoleUtils_1.RoleUtils.IsTrialRole(e) && (t = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleGroupId(e)) && (this.SetCurUseTrialRoleByGroupId(t), r)) {
      t = RoleUtils_1.RoleUtils.GetTrialRoleType(e);
      this.GetCurUseTrialRole(t).SetActivatedRoleAttr(r.bws, r.Bws);
    }
  }
  SetCurUseTrialRoleByGroupId(e) {
    var r;
    var t;
    var e = this.pNf.get(e);
    if (e) {
      r = e.TrialRoleType;
      (t = this.yNf.get(r))?.TrialRoleData?.SetIsVisibleInFormation(false);
      t?.TrialRoleData?.SetIsVisibleInRoleSystem(false);
      this.yNf.set(r, e);
      e.TrialRoleData.SetIsVisibleInFormation(true);
      e.TrialRoleData.SetIsVisibleInRoleSystem(true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCurTrialRoleGroupChanged, t?.TrialRoleGroupId, e.TrialRoleGroupId);
    }
  }
  SetGroupTrialRoleId(e, r) {
    var t;
    var o;
    var i;
    var a = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleGroupId(e);
    if (a && (t = this.pNf.get(a))) {
      if (t.IsLocked()) {
        this.SaveTrialRoleUnlockRedDotById(t.TrialRoleGroupId, true);
      }
      o = t.TrialRoleId;
      t.SetActivatedTrialRoleId(e);
      t.SetIsUnlocked(true);
      i = this.GetCurUseTrialRole(t.TrialRoleType) === t;
      t.SetIsVisibleInFormation(i);
      t.SetIsVisibleInRoleSystem(i);
      if (r) {
        t.SetActivatedRoleAttr(r.bws, r.Bws);
      }
      if ((ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? []).includes(e) && (i = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleConfig(o), r = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleConfig(e), i) && r && r.Level > i.Level) {
        this.lCg.add(a);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGroupTrialRoleChanged, o, e, t.TrialRoleGroupId);
    }
  }
  SaveTrialRoleUnlockRedDotById(e, r) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrialRoleGroupUnlock);
    if ((t = t || new Map()).get(e) !== r) {
      t.set(e, r);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrialRoleGroupUnlock, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGroupTrialRoleRedDotUpdate);
    }
  }
  GetTrialRoleUnlockRedDotById(e) {
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TrialRoleGroupUnlock);
    return !!r && (r.get(e) ?? false);
  }
  GetUpgradeRedDotById(e) {
    e = this.GetDataByGroupId(e);
    return !!e && e.CanUpgrade();
  }
  CheckCanOperateTrialRole() {
    var e = ControllerHolder_1.ControllerHolder.ScrollingTipsController;
    if (!ModelManager_1.ModelManager.FunctionModel.IsOpen(10007)) {
      return false;
    }
    if (ModelManager_1.ModelManager.FunctionModel.IsLockByBehaviorTree(10007)) {
      e.ShowTipsById(this.o5t);
      return false;
    }
    if (!ModelManager_1.ModelManager.RoleModel.CanUseSpecialTrialRole()) {
      e.ShowTipsById(this.o5t);
      return false;
    }
    if (ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.CheckInstanceShieldView("EditFormationView")) {
      e.ShowTipsById(this.o5t);
      return false;
    }
    var r = ModelManager_1.ModelManager.SceneTeamModel;
    if (r.IsPhantomTeam) {
      e.ShowTipsById(this.o5t);
      return false;
    }
    var t = r.GetCurrentEntity;
    if (!t?.Valid) {
      return false;
    }
    var o = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (r.GetCurrentGroupLivingState(o) === 2) {
      return false;
    }
    o = t.Entity.GetComponent(217);
    if (!o?.Valid) {
      return false;
    }
    var i = t.Entity.GetComponent(185);
    if (!i?.Valid) {
      return false;
    }
    if (t.Entity.GetComponent(243)?.IsOnVehicle) {
      e.ShowTipsById(this.o5t);
      return false;
    }
    if (ControllerHolder_1.ControllerHolder.RoleController.IsInRoleTrial()) {
      e.ShowTipsById(this.o5t);
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleTeamLimit");
      return false;
    }
    if (o.HasTag(855966206)) {
      e.ShowTipsById(this.o5t);
      return false;
    }
    if (o.HasTag(191377386)) {
      e.ShowTipsById(this.o5t);
      return false;
    }
    if (o.HasTag(40422668)) {
      e.ShowTipsById(this.o5t);
      return false;
    }
    if (o.HasTag(1996802261)) {
      e.ShowTipsById("ForbiddenActionInFight");
      return false;
    }
    if (o.HasTag(504239013)) {
      e.ShowTipsById(this.o5t);
      return false;
    }
    if (o.HasTag(-1697149502)) {
      e.ShowTipsById(this.o5t);
      return false;
    }
    if (o.HasTag(-2100129479)) {
      var o = PhantomUtil_1.PhantomUtil.GetSummonedEntity(t.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision);
      if (o && o.Entity.GetComponent(217)?.HasTag(40422668)) {
        e.ShowTipsById(this.o5t);
        return false;
      }
    }
    if (i.GetBuffTotalStackById(90003001) > 0 || (o = t.Entity.GetComponent(84)) && o.WalkOnWaterStage > 0) {
      e.ShowTipsById(this.o5t);
      return false;
    } else {
      return r.CurrentGroupType === 1;
    }
  }
  SetTrialRoleVisibility(e, r) {
    if (RoleUtils_1.RoleUtils.IsSpecialTrialRole(e) && (e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)) instanceof RoleSpecialRobotData_1.RoleSpecialRobotData) {
      e.SetIsVisibleInFormation(r);
      e.SetIsVisibleInRoleSystem(r);
    }
  }
}
exports.TrialRoleModel = TrialRoleModel;
//# sourceMappingURL=TrialRoleModel.js.map