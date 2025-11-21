"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerticalScrollBarComponent = exports.HorizontalScrollBarComponent = exports.ScrollBarComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const HotKeyComponent_1 = require("./HotKeyComponent");
const THRESHOLD = 0.1;
const SCROLL_COEFFICIENT = 4.5;
class ScrollBarComponentBase extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.BBo = 0;
  }
  OnInputAxis(o, e) {
    if (Math.abs(e) <= THRESHOLD) {
      if (this.BBo !== 0) {
        this.BBo = 0;
        this.HandleScrollBarChange(0);
      }
    } else {
      this.BBo = e;
      this.HandleScrollBarChange(e);
    }
  }
  OnRefreshSelfHotKeyState(o) {
    var e = this.GetBindButtonTag();
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigationHotKey", 10, "ScrollBar需要配置tag");
      }
    } else if ((o = o.GetScrollbarData().GetCurrentListener()) && o.IsListenerActive() && o.TagArray?.Contains(e)) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
class ScrollBarComponent extends ScrollBarComponentBase {
  HandleScrollBarChange(o) {
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.ScrollBarChangeSchedule(o);
  }
}
exports.ScrollBarComponent = ScrollBarComponent;
class HorizontalScrollBarComponent extends ScrollBarComponentBase {
  HandleScrollBarChange(o) {
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.HorizontalScrollBarChangeSchedule(-o * SCROLL_COEFFICIENT);
  }
}
exports.HorizontalScrollBarComponent = HorizontalScrollBarComponent;
class VerticalScrollBarComponent extends ScrollBarComponentBase {
  HandleScrollBarChange(o) {
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.VerticalScrollBarChangeSchedule(o * SCROLL_COEFFICIENT);
  }
}
exports.VerticalScrollBarComponent = VerticalScrollBarComponent;
//# sourceMappingURL=ScrollBarComponent.js.map