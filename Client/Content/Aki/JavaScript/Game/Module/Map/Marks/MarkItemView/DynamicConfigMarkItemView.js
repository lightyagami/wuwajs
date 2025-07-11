"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicConfigMarkItemView = undefined;
const MarkItemView_1 = require("./MarkItemView");
class DynamicConfigMarkItemView extends MarkItemView_1.MarkItemView {
  constructor(e) {
    super(e);
  }
  OnIconPathChanged(e) {
    var t = this.GetSprite(1);
    this.LoadIcon(t, e);
  }
}
exports.DynamicConfigMarkItemView = DynamicConfigMarkItemView;
//# sourceMappingURL=DynamicConfigMarkItemView.js.map