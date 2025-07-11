"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemRoleDescription = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemRoleDescription extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    var i;
    if (e.BoardId) {
      return !!(i = ConfigManager_1.ConfigManager.JoinTeamConfig.GetRoleDescriptionConfig(e.BoardId)) && (await UiManager_1.UiManager.OpenViewAsync("RoleNewJoinTipView", i.RoleId)) !== undefined;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 35, "角色入队界面参数有误", ["BoardId", e.BoardId]);
      }
      return false;
    }
  }
  GetViewName(e, r) {
    return "RoleNewJoinTipView";
  }
}
exports.OpenSystemRoleDescription = OpenSystemRoleDescription;
//# sourceMappingURL=OpenSystemRoleDescription.js.map