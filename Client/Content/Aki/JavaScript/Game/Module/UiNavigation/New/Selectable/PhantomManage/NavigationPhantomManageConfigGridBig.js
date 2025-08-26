"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationPhantomManageConfigGridBig = undefined;
const NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomManageConfigGridBig extends NavigationButton_1.NavigationButton {
  OnStart() {
    var t;
    var i;
    var a;
    if (this.PanelHandle?.GetType() === "PhantomManageConfig" && (t = this.PanelHandle, i = this.Listener?.LayoutActor, a = this.Selectable.RootUIComp, t) && this.Listener && i) {
      t.AddNavigationListener(i, this.Listener, a);
    }
  }
  OnButtonClick() {
    var t = this.PanelHandle;
    var i = this.Listener?.LayoutActor;
    if (t && this.Listener && i) {
      t.FindNextFocusListener(this.Listener.LayoutActor, this.Listener);
    }
  }
}
exports.NavigationPhantomManageConfigGridBig = NavigationPhantomManageConfigGridBig;
//# sourceMappingURL=NavigationPhantomManageConfigGridBig.js.map