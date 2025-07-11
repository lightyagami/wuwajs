"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractComponent = undefined;
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class InteractComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.InteractClick();
  }
  OnRefreshSelfHotKeyState(e) {
    e = e.GetFocusListener();
    this.SetVisibleMode(2, e !== undefined);
  }
  OnRefreshHotKeyText(e) {
    e = e.GetFocusListener()?.GetTextChangeComponent();
    if (e) {
      this.SetHotKeyDescTextForce(e.Text.GetText());
    } else {
      this.ResetHotKeyDescTextForce();
    }
  }
  OnRefreshHotKeyTextId(e) {
    var e = e.GetFocusListener();
    if (e) {
      e = e.GetTipsTextIdByState();
      this.SetHotKeyTextId(e);
      this.RefreshHotKeyNameText();
    }
  }
}
exports.InteractComponent = InteractComponent;
//# sourceMappingURL=InteractComponent.js.map