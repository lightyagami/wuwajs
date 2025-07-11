"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSystemFunction = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSystemFunction extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (e.Type === "BuyGoods") {
      ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopBuy(e.GoodsId);
    }
  }
}
exports.LevelEventSystemFunction = LevelEventSystemFunction;
//# sourceMappingURL=LevelEventSystemFunction.js.map