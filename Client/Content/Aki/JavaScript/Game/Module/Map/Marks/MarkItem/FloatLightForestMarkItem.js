"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatLightForestMarkItem = undefined;
const FloatLightForestMarkItemView_1 = require("../MarkItemView/FloatLightForestMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class FloatLightForestMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor() {
    super(...arguments);
    this.IsStreaming = false;
  }
  GetMarkItemViewType() {
    return 32;
  }
  CreateView() {
    return new FloatLightForestMarkItemView_1.FloatLightForestMarkItemView(this);
  }
  GetInteractiveFlag() {
    return false;
  }
}
exports.FloatLightForestMarkItem = FloatLightForestMarkItem;
//# sourceMappingURL=FloatLightForestMarkItem.js.map