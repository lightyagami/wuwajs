"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseTransitionView = undefined;
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class TrapDefenseTransitionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
  }
  OnStart() {}
  OnFinishShowImplementImplementImplement() {
    this.CloseMe();
  }
  OnBeforePlayCloseSequence() {
    this.OpenParam?.BeforeCloseCallback?.();
  }
}
exports.TrapDefenseTransitionView = TrapDefenseTransitionView;
//# sourceMappingURL=TrapDefenseTransitionView.js.map