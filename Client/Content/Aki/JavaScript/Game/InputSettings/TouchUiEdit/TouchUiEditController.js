"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchUiEditController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
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
    var t = new o();
    this.F$u.set(o.name, t);
  }
  static GetDataFacade(o) {
    return this.F$u.get(o.name);
  }
  static OpenCommonTouchUiEditView(o) {
    var t = new CommonTouchUiEditContainer_1.CommonTouchUiEditContainer();
    var e = this.GetDataFacade(CommonTouchUiEditDataFacade_1.CommonTouchUiEditDataFacade);
    if (e) {
      e.SetGroup(o);
      o = new TouchUiEditProxy_1.TouchUiEditProxy(t, e, (o, t) => new CommonTouchUiEditItem_1.CommonTouchUiEditItem(o, t));
      UiManager_1.UiManager.OpenView("CommonTouchUiEditView", o);
    }
  }
  static CreateProxyForFunction(o) {
    if (o === GameSettingsDefine_1.EFunction.MotorMobileButtonCustom) {
      return this.s_f(2);
    }
  }
  static s_f(o) {
    var t = new CommonTouchUiEditContainer_1.CommonTouchUiEditContainer();
    var e = this.GetDataFacade(CommonTouchUiEditDataFacade_1.CommonTouchUiEditDataFacade);
    if (e) {
      e.SetGroup(o);
      return new TouchUiEditProxy_1.TouchUiEditProxy(t, e, (o, t) => new CommonTouchUiEditItem_1.CommonTouchUiEditItem(o, t));
    }
  }
}
(exports.TouchUiEditController = TouchUiEditController).F$u = new Map();
//# sourceMappingURL=TouchUiEditController.js.map