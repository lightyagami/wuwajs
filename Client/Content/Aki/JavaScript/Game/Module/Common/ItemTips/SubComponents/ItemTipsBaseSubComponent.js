"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipsBaseSubComponent = undefined;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TipsBaseSubComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.OperationMap = new Map();
  }
  OnBeforeShowImplement() {
    for (const e of this.OperationMap.values()) {
      e();
    }
    this.OperationMap.clear();
  }
  OnBeforeDestroy() {
    this.OperationMap.clear();
  }
  Refresh(e) {}
  SetVisible(e) {
    var s = () => {
      this.SetActive(e);
    };
    if (this.InAsyncLoading()) {
      this.OperationMap.set("SetVisible", s);
    } else {
      s();
    }
  }
  SetLockButtonShow(e) {}
  SetPanelNumVisible(e) {}
}
exports.TipsBaseSubComponent = TipsBaseSubComponent;
//# sourceMappingURL=ItemTipsBaseSubComponent.js.map