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
    this.G$u(CommonTouchUiEditDataFacade_1.CommonTouchUiEditDataFacade);
    for (var [, o] of this.F$u) {
      o.Init();
    }
    return true;
  }
  static OnClear() {
    for (var [, o] of this.F$u) {
      o.Clear();
    }
    this.F$u.clear();
    return true;
  }
  static G$u(o) {
    var i = new o();
    this.F$u.set(o.name, i);
  }
  static GetDataFacade(o) {
    return this.F$u.get(o.name);
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
(exports.TouchUiEditController = TouchUiEditController).F$u = new Map();
//# sourceMappingURL=TouchUiEditController.js.map