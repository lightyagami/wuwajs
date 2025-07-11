"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaMarkItem = undefined;
const AreaMarkItemView_1 = require("../MarkItemView/AreaMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class AreaMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  GetMarkItemViewType() {
    return 1;
  }
  CreateView() {
    return new AreaMarkItemView_1.AreaMarkItemView(this);
  }
  GetInteractiveFlag() {
    return false;
  }
}
exports.AreaMarkItem = AreaMarkItem;
//# sourceMappingURL=AreaMarkItem.js.map