"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemShopView = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemShopView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (!e.BoardId) {
      return false;
    }
    const o = new CustomPromise_1.CustomPromise();
    return !!ControllerHolder_1.ControllerHolder.ShopController.OpenShop(e.BoardId, e => {
      o.SetResult(e);
    }) && o.Promise;
  }
  GetViewName(e) {
    return "ShopView";
  }
}
exports.OpenSystemShopView = OpenSystemShopView;
//# sourceMappingURL=OpenSystemShopView.js.map