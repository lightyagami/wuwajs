"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkVerticalPointerComponent = undefined;
const UE = require("ue");
const MarkPanelBase_1 = require("../MarkPanelBase");
class MarkVerticalPointerComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments);
    this.xh_ = 0;
  }
  OnBeforeShow() {
    this.Rh_();
  }
  SetPointerType(e) {
    this.xh_ = e;
    if (this.IsShowOrShowing) {
      this.Rh_();
    }
  }
  Rh_() {
    switch (this.xh_) {
      case 0:
        this.HideSelf();
        break;
      case 1:
        this.ShowUp();
        break;
      case 2:
        this.ShowDown();
    }
  }
  ShowUp() {
    this.RootItem?.SetUIActive(true);
    this.RootItem?.SetUIRelativeRotation(new UE.Rotator(0, 0, 0));
  }
  ShowDown() {
    this.RootItem?.SetUIActive(true);
    this.RootItem?.SetUIRelativeRotation(new UE.Rotator(0, 0, 180));
  }
  HideSelf() {
    this.RootItem?.SetUIActive(false);
  }
}
exports.MarkVerticalPointerComponent = MarkVerticalPointerComponent;
//# sourceMappingURL=MarkVerticalPointerComponent.js.map