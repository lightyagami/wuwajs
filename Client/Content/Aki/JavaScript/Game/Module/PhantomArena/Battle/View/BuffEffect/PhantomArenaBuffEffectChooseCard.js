"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBuffEffectChooseCard = void 0;
class PhantomArenaBuffEffectChooseCard {
  constructor(o, s) {
    this.Data = o, this.Manager = s
  }
  ShowChooseCard() {
    var o = this.Data.Effect.W21;
    this.Manager.Proxy.ServerActionQueue.PushChooseCardAction(o)
  }
}
exports.PhantomArenaBuffEffectChooseCard = PhantomArenaBuffEffectChooseCard;
//# sourceMappingURL=PhantomArenaBuffEffectChooseCard.js.map