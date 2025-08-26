"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekTraceGridBackgroundView = undefined;
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class SeekTraceGridBackgroundView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  Refresh(e, s, r) {
    if (!e) {
      this.GetRootItem().SetAlpha(0);
    }
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, s) {
    return this.GridIndex;
  }
}
exports.SeekTraceGridBackgroundView = SeekTraceGridBackgroundView;
//# sourceMappingURL=SeekTraceGridBackgroundView.js.map