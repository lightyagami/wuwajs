"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemWeeklyRogueToken = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const WeeklyRogueController_1 = require("../../../Module/WeeklyRogue/WeeklyRogueController");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemWeeklyRogueToken extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, o) {
    ModelManager_1.ModelManager.WeeklyRogueModel.CurrentBindId = e.BoardId;
    return WeeklyRogueController_1.WeeklyRogueController.Instance?.OpenTokenSelectViewById(e.BoardId) ?? false;
  }
  GetViewName(e, o) {
    e = ModelManager_1.ModelManager.WeeklyRogueModel?.GetOptionByBindId(e.BoardId);
    return WeeklyRogueController_1.WeeklyRogueController.Instance.GetViewNameByType(e.h5n);
  }
}
exports.OpenSystemWeeklyRogueToken = OpenSystemWeeklyRogueToken;
//# sourceMappingURL=OpenSystemWeeklyRogueTokenSelect.js.map