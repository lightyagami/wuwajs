"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleDetailsViewProxy = void 0;
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  PhantomArenaBattleDialog_1 = require("../../Dialog/PhantomArenaBattleDialog");
class PhantomArenaBattleDetailsViewProxy {
  constructor() {
    this.Yzt = void 0, this.sj1 = new Map, this.aj1 = new Map, this.DialogManager = new PhantomArenaBattleDialog_1.PhantomArenaBattleDialog, this.jfu = !1
  }
  RegisterView(t) {
    this.Yzt = t
  }
  SetOwnAllSettlePoint(t, e) {
    this.sj1.set(t, e);
    let o = 0;
    for (const e of this.sj1.values()) o += e;
    this.Yzt.SetOwnAllSettlePoint(o)
  }
  SetOpponentSettlePoint(t, e) {
    this.aj1.set(t, e);
    let o = 0;
    for (const e of this.aj1.values()) o += e;
    this.Yzt.SetOpponentSettlePoint(o)
  }
  get IsInGamepadNavigation() {
    return this.jfu
  }
  SetIsInGamepadNavigation(t) {
    this.jfu = t, ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag()
  }
}
exports.PhantomArenaBattleDetailsViewProxy = PhantomArenaBattleDetailsViewProxy;
//# sourceMappingURL=PhantomArenaBattleDetailsViewProxy.js.map