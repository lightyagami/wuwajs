"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationButton = undefined;
const puerts_1 = require("puerts");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
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
    if (this.Listener.ScrollView) {
      this.Listener.ScrollView.ScrollToSelectableComponent(this.Selectable);
    }
    var i = this.Listener.GetNavigationGroup();
    var i = i ? i.InsideGroupName : "";
    return !StringUtils_1.StringUtils.IsBlank(i) && (i = UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener(), UiNavigationNewController_1.UiNavigationNewController.IsInFocusInsideListenerList(this.Listener, i));
  }
}
exports.NavigationButton = NavigationButton;
//# sourceMappingURL=NavigationButton.js.map