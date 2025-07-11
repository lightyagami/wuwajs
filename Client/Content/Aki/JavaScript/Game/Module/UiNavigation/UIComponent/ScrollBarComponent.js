"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollBarComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
const THRESHOLD = 0.1;
class ScrollBarComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.BBo = 0;
  }
  OnInputAxis(t, o) {
    if (Math.abs(o) <= THRESHOLD) {
      if (this.BBo !== 0) {
        this.BBo = 0;
        UiNavigationNewController_1.UiNavigationNewController.ScrollBarChangeSchedule(0);
      }
    } else {
      this.BBo = o;
      UiNavigationNewController_1.UiNavigationNewController.ScrollBarChangeSchedule(o);
    }
  }
  OnRefreshSelfHotKeyState(t) {
    var o = this.GetBindButtonTag();
    if (StringUtils_1.StringUtils.IsEmpty(o)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigationHotKey", 10, "ScrollBar需要配置tag");
      }
    } else if ((t = t.GetScrollbarData().GetCurrentListener()) && t.IsListenerActive() && t.TagArray?.Contains(o)) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.ScrollBarComponent = ScrollBarComponent;
//# sourceMappingURL=ScrollBarComponent.js.map