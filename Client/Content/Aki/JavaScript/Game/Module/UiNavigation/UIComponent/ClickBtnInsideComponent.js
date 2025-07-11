"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickBtnInsideComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationJoystickInput_1 = require("../Module/UiNavigationJoystickInput");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class ClickBtnInsideComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.pjs = t => {
      if (this.IsAxisAllDirection() || t === 2 && this.IsAxisReverse() || t === 3 && this.IsAxisPositive()) {
        UiNavigationNewController_1.UiNavigationNewController.ClickButtonInside(this.GetBindButtonTag());
      }
    };
  }
  OnPress(t) {
    UiNavigationNewController_1.UiNavigationNewController.ClickButtonInside(t.BindButtonTag);
  }
  OnStartInputAxis(t) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.RegisterLeftJoystickFunction(this.pjs);
  }
  OnFinishInputAxis(t) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(this.pjs);
  }
  OnRefreshHotKeyText(i) {
    var e = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      i = i.GetFocusListener();
      if (i) {
        let t = UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(i, e);
        i = (t = t || i.GetChildListenerByTag(e))?.GetTextChangeComponent();
        if (i) {
          this.SetHotKeyDescTextForce(i.Text.GetText());
        } else {
          this.ResetHotKeyDescTextForce();
        }
      }
    }
  }
  OnRefreshSelfHotKeyState(i) {
    var e = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      i = i.GetFocusListener();
      if (i) {
        if (this.IsLinkListener(i.GetOwner())) {
          let t = UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(i, e);
          t = t || i.GetChildListenerByTag(e);
          this.SetVisibleMode(2, t?.IsListenerActive() ?? false);
        } else {
          this.SetVisibleMode(2, false);
        }
      } else {
        this.SetVisibleMode(2, false);
      }
    }
  }
}
exports.ClickBtnInsideComponent = ClickBtnInsideComponent;
//# sourceMappingURL=ClickBtnInsideComponent.js.map