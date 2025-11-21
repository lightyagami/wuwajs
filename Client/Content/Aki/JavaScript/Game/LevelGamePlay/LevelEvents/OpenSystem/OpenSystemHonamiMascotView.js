"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemHonamiMascotView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemHonamiMascotView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    if (t?.Type === 9) {
      UiManager_1.UiManager.OpenViewByPlot("HonamiStoryMascotCollectBookView");
    } else {
      await UiManager_1.UiManager.OpenViewAsync("HonamiStoryMascotCollectBookView");
    }
    return true;
  }
  GetViewName(e) {
    return "HonamiStoryMascotCollectBookView";
  }
}
exports.OpenSystemHonamiMascotView = OpenSystemHonamiMascotView;
//# sourceMappingURL=OpenSystemHonamiMascotView.js.map