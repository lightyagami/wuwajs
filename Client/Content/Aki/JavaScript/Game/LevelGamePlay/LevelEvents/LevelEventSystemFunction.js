"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventSystemFunction = void 0;
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSystemFunction extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    "BuyGoods" === e.Type && ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopBuy(e.GoodsId)
  }
}
exports.LevelEventSystemFunction = LevelEventSystemFunction;
//# sourceMappingURL=LevelEventSystemFunction.js.map