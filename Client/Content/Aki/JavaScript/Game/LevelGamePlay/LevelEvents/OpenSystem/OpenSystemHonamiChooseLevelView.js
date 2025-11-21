"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemHonamiChooseLevelView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemHonamiChooseLevelView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, s) {
    return (await UiManager_1.UiManager.OpenViewAsync("HonamiStoryLevelInfoView")) !== undefined;
  }
  GetViewName(e) {
    return "HonamiStoryLevelInfoView";
  }
}
exports.OpenSystemHonamiChooseLevelView = OpenSystemHonamiChooseLevelView;
//# sourceMappingURL=OpenSystemHonamiChooseLevelView.js.map