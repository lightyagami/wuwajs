"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleViewAgent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleUiDefine_1 = require("../../RoleUiDefine");
const RoleUtils_1 = require("../../RoleUtils");
class RoleViewAgent {
  constructor() {
    this.RoleIdList = [];
    this.CurSelectTabName = undefined;
    this.CurSelectRoleId = 0;
    this.RoleViewStateInternal = 0;
    this.TeamPositionType = undefined;
    this.PreSelectTabName = undefined;
  }
  Init(e, t, r) {
    this.RoleIdList = e;
    this.CurSelectRoleId = t;
    this.CurSelectTabName = r;
  }
  GetRoleIdList() {
    if (this.RoleIdList.length <= 0) {
      return ModelManager_1.ModelManager.RoleModel.GetRoleSystemRoleList(true);
    } else {
      return this.RoleIdList;
    }
  }
  CheckMainRoleToIdList(e) {
    var t;
    if (this.RoleIdList.length && !this.RoleIdList.includes(e) && ModelManager_1.ModelManager.RoleModel?.IsMainRole(e) && (t = this.RoleIdList.findIndex(e => ModelManager_1.ModelManager.RoleModel?.IsMainRole(e))) !== -1) {
      this.RoleIdList[t] = e;
    }
  }
  GetCurSelectRoleId() {
    var e = this.GetRoleIdList().includes(this.CurSelectRoleId);
    if (this.CurSelectRoleId <= 0 || !e) {
      this.CurSelectRoleId = this.GetDefaultSelectRoleId();
    }
    return this.CurSelectRoleId;
  }
  GetDefaultSelectRoleId() {
    var e;
    var t;
    if (this.RoleIdList.length > 0) {
      return this.RoleIdList[0];
    } else {
      e = ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId();
      t = ModelManager_1.ModelManager.RoleModel.GetRoleSystemRoleList(true);
      if (e !== undefined && t.includes(e)) {
        return e;
      } else if (t.length <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Role", 58, "取不到角色数据！");
        }
        return 0;
      } else {
        return t[0];
      }
    }
  }
  SetCurSelectRoleId(e) {
    this.CurSelectRoleId = e;
  }
  GetCurSelectRoleData() {
    var e = this.GetCurSelectRoleId();
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
  }
  set RoleViewState(e) {
    this.RoleViewStateInternal = e;
  }
  get RoleViewState() {
    return this.RoleViewStateInternal;
  }
  GetRoleSystemMode() {
    var e = this.GetCurSelectRoleData();
    if (e.IsTrialRole()) {
      if (RoleUtils_1.RoleUtils.IsSpecialTrialRole(e.GetDataId())) {
        return 4;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  }
  GetRoleSystemUiParams() {
    var e = this.GetRoleSystemMode();
    return RoleUiDefine_1.roleSystemModeUiParam[e];
  }
  SetCurSelectTabName(e) {
    this.CurSelectTabName = e;
  }
  GetCurSelectTabName() {
    return this.CurSelectTabName;
  }
  SetPreSelectTabName(e) {
    this.PreSelectTabName = e;
  }
  GetPreSelectTabName() {
    return this.PreSelectTabName;
  }
  GetRoleTabDataList() {
    var e = this.GetRoleSystemMode();
    return ModelManager_1.ModelManager.RoleModel.GetRoleTabListByUiParam(e);
  }
  GetCurRoleResonanceGroupIndex() {
    var e = this.GetCurSelectRoleData();
    return ModelManager_1.ModelManager.RoleModel.GetRoleResonanceGroupIndex(e);
  }
  GetCurRoleResonanceConfigList() {
    var e = this.GetCurSelectRoleData();
    return ModelManager_1.ModelManager.RoleModel.GetRoleResonanceConfigList(e);
  }
}
exports.RoleViewAgent = RoleViewAgent;
//# sourceMappingURL=RoleViewAgent.js.map