"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemHonamiInventoryView = undefined;
const HonamiStoryController_1 = require("../../../Module/HonamiStory/HonamiStoryController");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemHonamiInventoryView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, o) {
    return HonamiStoryController_1.HonamiStoryController.OpenHonamiStoryBag();
  }
  GetViewName(e) {
    return "HonamiStoryBackpackView";
  }
}
exports.OpenSystemHonamiInventoryView = OpenSystemHonamiInventoryView;
//# sourceMappingURL=OpenSystemHonamiInventoryView.js.map