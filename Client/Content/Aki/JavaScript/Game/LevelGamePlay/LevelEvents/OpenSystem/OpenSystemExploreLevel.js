"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemExploreLevel = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemExploreLevel extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return (await UiManager_1.UiManager.OpenViewAsync("ExploreLevelView")) !== undefined;
  }
  GetViewName(e) {
    return "ExploreLevelView";
  }
}
exports.OpenSystemExploreLevel = OpenSystemExploreLevel;
//# sourceMappingURL=OpenSystemExploreLevel.js.map