"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemHonamiTalentTreeView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemHonamiTalentTreeView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, n) {
    return (await UiManager_1.UiManager.OpenViewAsync("HonamiStoryTechnologyView")) !== undefined;
  }
  GetViewName(e) {
    return "HonamiStoryTechnologyView";
  }
}
exports.OpenSystemHonamiTalentTreeView = OpenSystemHonamiTalentTreeView;
//# sourceMappingURL=OpenSystemHonamiTalentTreeView.js.map