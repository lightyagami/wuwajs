"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchUiEditController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const CommonTouchUiEditContainer_1 = require("./Common/CommonTouchUiEditContainer");
const CommonTouchUiEditDataFacade_1 = require("./Common/CommonTouchUiEditDataFacade");
const CommonTouchUiEditItem_1 = require("./Common/CommonTouchUiEditItem");
const TouchUiEditProxy_1 = require("./TouchUiEditProxy");
class TouchUiEditController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.dHu(CommonTouchUiEditDataFacade_1.CommonTouchUiEditDataFacade);
    for (var [, o] of this.mHu) {
      o.Init();
    }
    return true;
  }
  static OnClear() {
    for (var [, o] of this.mHu) {
      o.Clear();
    }
    this.mHu.clear();
    return true;
  }
  static dHu(o) {
    var i = new o();
    this.mHu.set(o.name, i);
  }
  static GetDataFacade(o) {
    return this.mHu.get(o.name);
  }
  static OpenCommonTouchUiEditView(o) {
    var i = new CommonTouchUiEditContainer_1.CommonTouchUiEditContainer();
    var t = this.GetDataFacade(CommonTouchUiEditDataFacade_1.CommonTouchUiEditDataFacade);
    if (t) {
      t.SetGroup(o);
      o = new TouchUiEditProxy_1.TouchUiEditProxy(i, t, (o, i) => new CommonTouchUiEditItem_1.CommonTouchUiEditItem(o, i));
      UiManager_1.UiManager.OpenView("CommonTouchUiEditView", o);
    }
  }
}
(exports.TouchUiEditController = TouchUiEditController).mHu = new Map();
//# sourceMappingURL=TouchUiEditController.js.map