"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemHonamiShopView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemHonamiShopView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, a) {
    if (a?.Type === 9) {
      UiManager_1.UiManager.OpenViewByPlot("HonamiStoryShopView");
    } else {
      await UiManager_1.UiManager.OpenViewAsync("HonamiStoryShopView");
    }
    return true;
  }
  GetViewName(e) {
    return "HonamiStoryShopView";
  }
}
exports.OpenSystemHonamiShopView = OpenSystemHonamiShopView;
//# sourceMappingURL=OpenSystemHonamiShop.js.map