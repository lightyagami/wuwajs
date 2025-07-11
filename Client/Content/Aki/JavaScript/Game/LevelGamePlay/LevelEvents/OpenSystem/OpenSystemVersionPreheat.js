"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemVersionPreheat = undefined;
const ActivityVersionPreheatController_1 = require("../../../Module/Activity/ActivityContent/VersionPreheat/Controller/ActivityVersionPreheatController");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemVersionPreheat extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    e = e.BoardId;
    if (e !== 0) {
      return ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.OpenTargetViewAsyncById(e, true);
    } else {
      return ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.OpenTargetViewAsyncById(undefined, false);
    }
  }
  GetViewName() {
    return "VersionPreheatVoteView";
  }
}
exports.OpenSystemVersionPreheat = OpenSystemVersionPreheat;
//# sourceMappingURL=OpenSystemVersionPreheat.js.map