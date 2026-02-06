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
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
class TouchUiEditController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.G$u(CommonTouchUiEditDataFacade_1.CommonTouchUiEditDataFacade);
    for (var [, e] of this.F$u) {
      e.Init();
    }
    return true;
  }
  static OnClear() {
    for (var [, e] of this.F$u) {
      e.Clear();
    }
    this.F$u.clear();
    return true;
  }
  static G$u(e) {
    var t = new e();
    this.F$u.set(e.name, t);
  }
  static GetDataFacade(e) {
    return this.F$u.get(e.name);
  }
  static OpenCommonTouchUiEditView(e) {
    var t = new CommonTouchUiEditContainer_1.CommonTouchUiEditContainer();
    var i = this.GetDataFacade(CommonTouchUiEditDataFacade_1.CommonTouchUiEditDataFacade);
    if (i) {
      i.SetGroup(e);
      e = new TouchUiEditProxy_1.TouchUiEditProxy(t, i, (e, t) => new CommonTouchUiEditItem_1.CommonTouchUiEditItem(e, t));
      UiManager_1.UiManager.OpenView("CommonTouchUiEditView", e);
    }
  }
  static CreateProxyForFunction(t) {
    if (t === GameSettingsDefine_1.EFunction.MotorMobileButtonCustom) {
      let e = 2;
      t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MotorMobileButtonLayout);
      if (t !== undefined && t === 0) {
        e = 3;
      }
      t = this.pcf(e);
      return t;
    }
  }
  static pcf(e) {
    var t = new CommonTouchUiEditContainer_1.CommonTouchUiEditContainer();
    var i = this.GetDataFacade(CommonTouchUiEditDataFacade_1.CommonTouchUiEditDataFacade);
    if (i) {
      i.SetGroup(e);
      return new TouchUiEditProxy_1.TouchUiEditProxy(t, i, (e, t) => new CommonTouchUiEditItem_1.CommonTouchUiEditItem(e, t));
    }
  }
}
(exports.TouchUiEditController = TouchUiEditController).F$u = new Map();
//# sourceMappingURL=TouchUiEditController.js.map