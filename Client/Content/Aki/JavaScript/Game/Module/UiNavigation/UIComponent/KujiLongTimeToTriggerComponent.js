"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KujiLongTimeToTriggerComponent = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const LongTimeToTriggerComponent_1 = require("./LongTimeToTriggerComponent");
class KujiLongTimeToTriggerComponent extends LongTimeToTriggerComponent_1.LongTimeToTriggerComponent {
  constructor() {
    super(...arguments);
    this.Yym = undefined;
  }
  OnInit() {
    this.Yym = UiManager_1.UiManager.GetViewByName("PrizeDrawingTearView");
  }
  OnHandleLongPressRefresh(e) {
    if (this.Yym) {
      this.Yym.OnGamepadHold(e);
    }
  }
  OnPressAction() {
    if (this.Yym) {
      this.Yym.OnGamepadPress();
    }
  }
  OnReleaseAction() {
    if (this.Yym) {
      this.Yym.OnGamepadRelease();
    }
  }
  OnRefreshSelfHotKeyState(e) {
    var i = UiManager_1.UiManager.GetViewByName("PrizeDrawingTearView");
    if (i) {
      this.SetVisibleMode(2, i.GetGamepadCanPress());
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.KujiLongTimeToTriggerComponent = KujiLongTimeToTriggerComponent;
//# sourceMappingURL=KujiLongTimeToTriggerComponent.js.map