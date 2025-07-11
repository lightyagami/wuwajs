"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerMarkItemView = undefined;
const MarkItemView_1 = require("./MarkItemView");
class PlayerMarkItemView extends MarkItemView_1.MarkItemView {
  constructor(e) {
    super(e);
  }
  GetInteractiveFlag() {
    return false;
  }
}
exports.PlayerMarkItemView = PlayerMarkItemView;
//# sourceMappingURL=PlayerMarkItemView.js.map