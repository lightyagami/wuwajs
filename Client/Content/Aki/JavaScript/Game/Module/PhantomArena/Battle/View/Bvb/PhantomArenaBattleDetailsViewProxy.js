"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleDetailsViewProxy = undefined;
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const PhantomArenaBattleDialog_1 = require("../../Dialog/PhantomArenaBattleDialog");
class PhantomArenaBattleDetailsViewProxy {
  constructor() {
    this.Yzt = undefined;
    this.Nj1 = new Map();
    this.Vj1 = new Map();
    this.DialogManager = new PhantomArenaBattleDialog_1.PhantomArenaBattleDialog();
    this.aqu = false;
  }
  RegisterView(t) {
    this.Yzt = t;
  }
  SetOwnAllSettlePoint(t, e) {
    this.Nj1.set(t, e);
    let o = 0;
    for (const e of this.Nj1.values()) {
      o += e;
    }
    this.Yzt.SetOwnAllSettlePoint(o);
  }
  SetOpponentSettlePoint(t, e) {
    this.Vj1.set(t, e);
    let o = 0;
    for (const e of this.Vj1.values()) {
      o += e;
    }
    this.Yzt.SetOpponentSettlePoint(o);
  }
  get IsInGamepadNavigation() {
    return this.aqu;
  }
  SetIsInGamepadNavigation(t) {
    this.aqu = t;
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
  }
}
exports.PhantomArenaBattleDetailsViewProxy = PhantomArenaBattleDetailsViewProxy;
//# sourceMappingURL=PhantomArenaBattleDetailsViewProxy.js.map