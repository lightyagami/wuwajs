"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardDisabledComponent = undefined;
const CardComponentBase_1 = require("../CardComponentBase");
class CardDisabledComponent extends CardComponentBase_1.CardComponentBase {
  Refresh(e) {
    this.SetActive(e.Disabled && e.ShowComponent);
  }
}
exports.CardDisabledComponent = CardDisabledComponent;
//# sourceMappingURL=CardDisabledComponent.js.map