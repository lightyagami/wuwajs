"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBuffEffectChooseCard = undefined;
class PhantomArenaBuffEffectChooseCard {
  constructor(o, s) {
    this.Data = o;
    this.Manager = s;
  }
  ShowChooseCard() {
    var o = this.Data.Effect.EG1;
    this.Manager.Proxy.ServerActionQueue.PushChooseCardAction(o);
  }
}
exports.PhantomArenaBuffEffectChooseCard = PhantomArenaBuffEffectChooseCard;
//# sourceMappingURL=PhantomArenaBuffEffectChooseCard.js.map