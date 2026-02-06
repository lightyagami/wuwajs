"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemSpringFestivalBrochureView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemSpringFestivalBrochureView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    await UiManager_1.UiManager.OpenViewAsync("Spring26BrochureView");
    return true;
  }
  GetViewName(e) {
    return "Spring26BrochureView";
  }
}
exports.OpenSystemSpringFestivalBrochureView = OpenSystemSpringFestivalBrochureView;
//# sourceMappingURL=OpenSystemSpringFestivalBrochureView.js.map