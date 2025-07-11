"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractReleaseComponent = undefined;
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class InteractReleaseComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.Interact(true);
  }
  OnRelease(e) {
    UiNavigationNewController_1.UiNavigationNewController.Interact(false);
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
exports.InteractReleaseComponent = InteractReleaseComponent;
//# sourceMappingURL=InteractReleaseComponent.js.map