"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardInteractFinishTipsView = undefined;
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
class DockyardInteractFinishTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.HLn = undefined;
  }
  OnRegisterComponent() {
    this.HLn = this.OpenParam;
  }
  OnAfterPlayStartSequence() {
    this.HLn.CloseCallback?.();
    this.CloseMe();
  }
}
exports.DockyardInteractFinishTipsView = DockyardInteractFinishTipsView;
//# sourceMappingURL=DockyardInteractFinishTipsView.js.map