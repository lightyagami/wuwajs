"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardDisabledComponent = void 0;
const CardComponentBase_1 = require("../CardComponentBase");
class CardDisabledComponent extends CardComponentBase_1.CardComponentBase {
  Refresh(e) {
    this.SetActive(e.Disabled && e.ShowComponent)
  }
}
exports.CardDisabledComponent = CardDisabledComponent;
//# sourceMappingURL=CardDisabledComponent.js.map