"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterSortController = undefined;
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
class FilterSortController extends UiControllerBase_1.UiControllerBase {
  static OpenFilterView(e) {
    if (e.ConfigId === 2 || e.ConfigId === 4) {
      UiManager_1.UiManager.OpenView("VisionFilterView", e);
    } else {
      UiManager_1.UiManager.OpenView("FilterView", e);
    }
  }
  static OpenSortView(e) {
    UiManager_1.UiManager.OpenView("SortView", e);
  }
}
exports.FilterSortController = FilterSortController;
//# sourceMappingURL=FilterSortController.js.map