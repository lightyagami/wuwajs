"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridCurTagComponent = undefined;
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridCurTagComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemTagCur";
  }
  OnRefresh(e) {
    this.SetActive(e);
  }
}
exports.MediumItemGridCurTagComponent = MediumItemGridCurTagComponent;
//# sourceMappingURL=MediumItemGridCurTagComponent.js.map