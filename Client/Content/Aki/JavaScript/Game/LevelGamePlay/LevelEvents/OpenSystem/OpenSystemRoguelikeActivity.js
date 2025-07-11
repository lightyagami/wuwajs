"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemRoguelikeActivity = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RoguelikeController_1 = require("../../../Module/Roguelike/RoguelikeController");
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemRoguelikeActivity extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, i) {
    if (e.BoardId !== 100) {
      return RoguelikeController_1.RoguelikeController.OpenRoguelikeActivityView();
    }
    {
      const r = new CustomPromise_1.CustomPromise();
      if (ModelManager_1.ModelManager.WeeklyRogueModel.CycleId === 0) {
        return false;
      } else {
        UiManager_1.UiManager.OpenView("WeeklyRogueActivityView", undefined, e => {
          r.SetResult(e);
        });
        return r.Promise;
      }
    }
  }
  GetViewName(e) {
    if (e.BoardId === 100) {
      return "WeeklyRogueActivityView";
    } else {
      return "RoguelikeActivityView";
    }
  }
}
exports.OpenSystemRoguelikeActivity = OpenSystemRoguelikeActivity;
//# sourceMappingURL=OpenSystemRoguelikeActivity.js.map