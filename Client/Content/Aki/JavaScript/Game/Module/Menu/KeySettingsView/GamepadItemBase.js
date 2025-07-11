"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadItemBase = undefined;
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class GamepadItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.pPi = new Map();
    this.vPi = new Map();
  }
  AddKeySprite(e, s) {
    this.pPi.set(e, s);
  }
  SetKeysEnable(e) {
    for (var [s, t] of this.vPi) {
      if (!e.includes(s)) {
        t.SetUIActive(false);
      }
    }
    for (const i of e) {
      this.SetKeySpriteVisible(i, true);
    }
  }
  SetAllKeyDisable() {
    for (const e of this.vPi.values()) {
      e.SetUIActive(false);
    }
  }
  SetKeySpriteVisible(e, s) {
    var t = this.pPi.get(e);
    if (t) {
      t.SetUIActive(s);
      if (s) {
        this.vPi.set(e, t);
      } else {
        this.vPi.delete(e);
      }
    }
  }
  OnBeforeDestroy() {
    this.pPi.clear();
    this.vPi.clear();
  }
}
exports.GamepadItemBase = GamepadItemBase;
//# sourceMappingURL=GamepadItemBase.js.map