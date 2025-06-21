"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardAllInDeckComponent = void 0;
const CardComponentBase_1 = require("../CardComponentBase");
class CardAllInDeckComponent extends CardComponentBase_1.CardComponentBase {
  Refresh(e) {
    this.SetActive(e.IsAllInDeck && e.ShowComponent)
  }
}
exports.CardAllInDeckComponent = CardAllInDeckComponent;
//# sourceMappingURL=CardAllInDeckComponent.js.map