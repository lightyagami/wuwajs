"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HotKeyTypeBase = undefined;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class HotKeyTypeBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IsMultiKeyItem = false;
  }
  SetIsMultiKeyItem(e) {
    this.IsMultiKeyItem = e;
  }
  Clear() {
    this.OnClear();
  }
  OnClear() {}
}
exports.HotKeyTypeBase = HotKeyTypeBase;
//# sourceMappingURL=HotKeyTypeBase.js.map