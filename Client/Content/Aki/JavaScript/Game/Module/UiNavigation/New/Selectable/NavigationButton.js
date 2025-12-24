"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationButton = undefined;
const puerts_1 = require("puerts");
const UiNavigationNewController_1 = require("../UiNavigationNewController");
const NavigationSelectableBase_1 = require("./NavigationSelectableBase");
class NavigationButton extends NavigationSelectableBase_1.NavigationSelectableBase {
  constructor() {
    super(...arguments);
    this.lBo = undefined;
    this.ije = () => {
      this.OnButtonClick();
    };
  }
  OnInit() {
    this._Bo();
  }
  OnClear() {
    this.uBo();
  }
  _Bo() {
    var t;
    var i;
    if (this.NeedAddButtonClick()) {
      t = this.Selectable;
      i = (0, puerts_1.toManualReleaseDelegate)(this.ije);
      this.lBo = t.RegisterClickEvent(i);
    }
  }
  uBo() {
    if (this.lBo) {
      this.Selectable.UnregisterClickEvent(this.lBo);
      (0, puerts_1.releaseManualReleaseDelegate)(this.ije);
      this.lBo = undefined;
    }
  }
  OnButtonClick() {}
  NeedAddButtonClick() {
    return this.GetType() !== "Button";
  }
  OnHandlePointerSelect(t) {
    if (this.Listener.ScrollProxy?.ScrollView) {
      this.Listener.ScrollProxy.ScrollView.ScrollToSelectableComponent(this.Selectable);
    }
    var i = this.Listener.GetNavigationGroup();
    return (i ? i.InsideGroupNameSet : new Set()).size > 0 && (i = UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener(), UiNavigationNewController_1.UiNavigationNewController.IsInFocusInsideListenerList(this.Listener, i));
  }
}
exports.NavigationButton = NavigationButton;
//# sourceMappingURL=NavigationButton.js.map