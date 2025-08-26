"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHotKeyHandleTrapDefenseRoulette = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TrapDefenseRouletteMainViewProxy_1 = require("../../../Module/Roulette/ViewProxy/TrapDefenseRouletteMainViewProxy");
const ViewHotKeyHandleRoulette_1 = require("./ViewHotKeyHandleRoulette");
class ViewHotKeyHandleTrapDefenseRoulette extends ViewHotKeyHandleRoulette_1.ViewHotKeyHandleRoulette {
  OnOpenViewImplement() {
    var e = new TrapDefenseRouletteMainViewProxy_1.TrapDefenseRouletteMainViewProxy();
    e.ActionType = Number(this.ViewParam[0]);
    ControllerHolder_1.ControllerHolder.RouletteController.OpenRouletteMainView(e);
  }
}
exports.ViewHotKeyHandleTrapDefenseRoulette = ViewHotKeyHandleTrapDefenseRoulette;
//# sourceMappingURL=ViewHotKeyHandleTrapDefenseRoulette.js.map