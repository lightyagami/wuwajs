"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MingSuNpcMarkItemView = undefined;
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
const MingSuNpcTopRightIconHandle_1 = require("./Handles/MingSuNpcTopRightIconHandle");
class MingSuNpcMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
  }
  CreateTopRightHandle(e) {
    return new MingSuNpcTopRightIconHandle_1.MingSuNpcTopRightIconHandle(e);
  }
}
exports.MingSuNpcMarkItemView = MingSuNpcMarkItemView;
//# sourceMappingURL=MingSuNpcMarkItemView.js.map