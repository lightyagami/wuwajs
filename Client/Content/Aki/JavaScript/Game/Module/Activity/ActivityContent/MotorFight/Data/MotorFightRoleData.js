"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightRoleData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class MotorFightRoleData {
  constructor(e) {
    this.Lo = undefined;
    this.P4e = false;
    this.Lo = e;
  }
  set IsUnLock(e) {
    this.P4e = e;
  }
  get IsUnLock() {
    return this.P4e;
  }
  get HasRedDot() {
    var e;
    return !!this.IsUnLock && this.ConditionId !== 0 && (!(e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorFightRoleClicked)) || !e.has(this.Id));
  }
  ReadRedDot() {
    var e;
    if (this.IsUnLock) {
      if (e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorFightRoleClicked)) {
        e.add(this.Id);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorFightRoleClicked, e);
      } else {
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorFightRoleClicked, new Set([this.Id]));
      }
    }
  }
  get Id() {
    return this.Lo.Id;
  }
  get RoleName() {
    var e = this.Lo.TrialRole;
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    if (t) {
      return t.Name;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorFightActivity", 71, "摩托战斗角色不存在", ["roleId", e]);
      }
      return "";
    }
  }
  get TrialRoleId() {
    return this.Lo.TrialRole;
  }
  get GenreDesc() {
    return this.Lo.GenreDesc;
  }
  get BuffName() {
    return this.Lo.BuffName;
  }
  get BuffDesc() {
    return this.Lo.BuffDesc;
  }
  get BuffDescParams() {
    return this.Lo.BuffDescParam;
  }
  get RoleTexture() {
    return this.Lo.RolePicture;
  }
  get ConditionId() {
    return this.Lo.UnlockCondition;
  }
  get AnimPath() {
    return this.Lo.MotorStandAnimPath;
  }
}
exports.MotorFightRoleData = MotorFightRoleData;
//# sourceMappingURL=MotorFightRoleData.js.map