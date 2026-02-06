"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemFurnitureShopView = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemFurnitureShopView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return ControllerHolder_1.ControllerHolder.FurnitureController.OpenFurnitureShopViewAsync(0);
  }
  GetViewName(e) {
    return "FurnitureShopView";
  }
}
exports.OpenSystemFurnitureShopView = OpenSystemFurnitureShopView;
//# sourceMappingURL=OpenSystemFurnitureShopView.js.map