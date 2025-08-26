"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationExtraButton = undefined;
const BattleChildView_1 = require("../BattleChildView/BattleChildView");
class FormationExtraButton extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.Handle = undefined;
  }
  InitHandle(t) {
    this.Handle = t;
  }
  SetVisible(t) {
    this.SetActive(t);
    this.Handle?.SetNodeVisible(t);
  }
  Tick(t) {}
}
exports.FormationExtraButton = FormationExtraButton;
//# sourceMappingURL=FormationExtraButton.js.map