"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackScreenGlobalData = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
class BlackScreenGlobalData {
  static get ShowPromise() {
    return this.L0t;
  }
  static CreateShowPromise() {
    this.L0t = new CustomPromise_1.CustomPromise();
  }
  static FinishShowPromise() {
    this.L0t.SetResult(undefined);
  }
  static get HidePromise() {
    return this.D0t;
  }
  static CreateHidePromise() {
    this.D0t = new CustomPromise_1.CustomPromise();
  }
  static FinishHidePromise() {
    this.D0t.SetResult(undefined);
  }
  static ResetGlobalData() {
    this.L0t = undefined;
    this.D0t = undefined;
  }
}
(exports.BlackScreenGlobalData = BlackScreenGlobalData).L0t = undefined;
BlackScreenGlobalData.D0t = undefined; //# sourceMappingURL=BlackScreenGlobalData.js.map