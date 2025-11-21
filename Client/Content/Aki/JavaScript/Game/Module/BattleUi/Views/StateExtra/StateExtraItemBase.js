"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateExtraItemBase = undefined;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class StateExtraItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.E9 = 0;
  }
  GetExtraItemType() {
    return this.E9;
  }
  InitExtraItemType(t) {
    this.E9 = t;
  }
  InitExtraParams(t) {
    this.OnInitExtraParams(t);
  }
  OnInitExtraParams(t) {}
}
exports.StateExtraItemBase = StateExtraItemBase;
//# sourceMappingURL=StateExtraItemBase.js.map