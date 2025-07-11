"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractWheelComponent = undefined;
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
const ZOOM_THRESHOLD = 1;
class InteractWheelComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.F_i = 0;
    this.V_i = 0;
    this.j_i = 0;
    this.IsPress = false;
    this.Q_i = false;
  }
  OnInputAxis(t, i) {
    var e = -i;
    if (this.j_i * e < 0) {
      this.j_i = 0;
    }
    this.j_i += e;
    var e = (e > 0 ? 1 : -1) * Math.floor(Math.abs(this.j_i / ZOOM_THRESHOLD));
    this.j_i -= ZOOM_THRESHOLD * e;
    var e = i !== 0;
    if (this.IsPress !== e) {
      this.IsPress = e;
      if (i > 0) {
        UiNavigationNewController_1.UiNavigationNewController.FindTarget(6);
      } else if (i < 0) {
        UiNavigationNewController_1.UiNavigationNewController.FindTarget(5);
      }
    }
  }
  OnRefreshMode() {
    this.IsAction = false;
    super.OnRefreshMode();
  }
  UpdateIndex(t) {
    var i = this.V_i;
    this.X_i(t);
    return this.V_i !== i;
  }
  X_i(t) {
    if (t) {
      this.F_i = t;
    }
    if (this.F_i && (this.V_i < 0 || this.V_i >= this.F_i)) {
      if (this.Q_i) {
        this.V_i = this.V_i % this.F_i;
        if (this.V_i < 0) {
          this.V_i = this.F_i + this.V_i;
        }
      } else {
        this.V_i = Math.max(0, Math.min(this.V_i, this.F_i - 1));
      }
    }
  }
}
exports.InteractWheelComponent = InteractWheelComponent;
//# sourceMappingURL=InteractWheelComponent.js.map