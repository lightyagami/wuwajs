"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreasureBoxMarkItemView = undefined;
const ServerMarkItemView_1 = require("./ServerMarkItemView");
class TreasureBoxMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e);
  }
  GetInteractiveFlag() {
    return false;
  }
}
exports.TreasureBoxMarkItemView = TreasureBoxMarkItemView;
//# sourceMappingURL=TreasureBoxMarkItemView.js.map