"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditBattleRoleData = undefined;
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
class EditBattleRoleData {
  constructor() {
    this.ConfigId = 0;
    this.SkinId = 0;
    this.OnlineIndex = undefined;
    this.PlayerName = undefined;
    this.Level = 0;
    this.IsSelf = false;
    this.IsReady = false;
    this.PlayerId = 0;
    this.ThirdPartyOnlineId = undefined;
  }
  Init(t, e, i, a, r, s, o, h) {
    this.PlayerId = t;
    this.ConfigId = e;
    this.SkinId = i;
    this.OnlineIndex = a;
    this.PlayerName = r;
    this.Level = s;
    this.IsSelf = o;
    this.IsReady = h;
  }
  GetName() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      var t = this.ThirdPartyOnlineId;
      if (t !== undefined && t !== "") {
        return t;
      }
    }
    return this.PlayerName;
  }
  SetReady(t) {
    this.IsReady = t;
  }
  get GetTrialRoleConfig() {
    if (this.ConfigId > RoleDefine_1.ROBOT_DATA_MIN_ID) {
      let t = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(this.ConfigId);
      return t = t || ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.ConfigId);
    }
  }
}
exports.EditBattleRoleData = EditBattleRoleData;
//# sourceMappingURL=EditBattleRoleData.js.map