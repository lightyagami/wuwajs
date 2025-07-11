"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemTrialRoleDescription = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemTrialRoleDescription extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (e.BoardId) {
      return ControllerHolder_1.ControllerHolder.JoinTeamController.OpenJoinTeamView(e.BoardId, true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 35, "角色入队界面参数有误", ["BoardId", e.BoardId]);
      }
      return false;
    }
  }
  GetViewName(e, r) {
    return "JoinTeamView";
  }
}
exports.OpenSystemTrialRoleDescription = OpenSystemTrialRoleDescription;
//# sourceMappingURL=OpenSystemTrialRoleDescription.js.map