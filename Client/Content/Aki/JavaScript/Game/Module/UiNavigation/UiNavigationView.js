"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationView = undefined;
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class UiNavigationView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ViewName = "";
  }
  OnBeforeShowImplement() {
    this.Fq();
  }
  OnAfterShowImplement() {
    this.AfterActive();
  }
  FindDefault() {
    return true;
  }
  AfterActive() {}
  OnBeforeDestroyImplement() {
    if (this.RootItem?.IsValid()) {
      this.SetActive(false);
    }
  }
  Fq() {
    this.ViewName = this.GetRootItem().GetDisplayName();
  }
}
exports.UiNavigationView = UiNavigationView;
//# sourceMappingURL=UiNavigationView.js.map