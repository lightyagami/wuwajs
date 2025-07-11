"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggableNextInsideComponent = exports.DraggablePrevInsideComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const DraggableComponent_1 = require("./DraggableComponent");
class DraggableInsideComponent extends DraggableComponent_1.DraggableComponent {
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      if (e = e.GetFocusListener()) {
        e = UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(e, t);
        this.SetVisibleMode(2, e?.IsListenerActive() ?? false);
      } else {
        this.SetVisibleMode(2, false);
      }
    }
  }
}
class DraggablePrevInsideComponent extends DraggableInsideComponent {
  TriggerEvent() {
    UiNavigationNewController_1.UiNavigationNewController.DraggableInsideComponentNavigate(this.GetBindButtonTag(), false);
  }
}
exports.DraggablePrevInsideComponent = DraggablePrevInsideComponent;
class DraggableNextInsideComponent extends DraggableInsideComponent {
  TriggerEvent() {
    UiNavigationNewController_1.UiNavigationNewController.DraggableInsideComponentNavigate(this.GetBindButtonTag(), true);
  }
}
exports.DraggableNextInsideComponent = DraggableNextInsideComponent;
//# sourceMappingURL=DraggableInsideComponent.js.map