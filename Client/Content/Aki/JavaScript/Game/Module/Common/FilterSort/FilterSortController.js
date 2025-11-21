"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterSortController = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
class FilterSortController extends UiControllerBase_1.UiControllerBase {
  static OpenFilterView(e) {
    var r = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(e.UniqueId);
    if (r.ConfigId === 2 || r.ConfigId === 4) {
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