"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridTemplateIconComponent = undefined;
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridTemplateIconComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_TemplateIcon";
  }
  OnRefresh(e) {
    this.SetActive(e);
  }
}
exports.MediumItemGridTemplateIconComponent = MediumItemGridTemplateIconComponent;
//# sourceMappingURL=MediumItemGridTemplateIconComponent.js.map