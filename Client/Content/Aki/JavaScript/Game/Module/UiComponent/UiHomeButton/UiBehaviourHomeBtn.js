"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBehaviourHomeBtn = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class UiBehaviourHomeBtn {
  constructor() {
    this.Lto = undefined;
  }
  SetViewInfo(t) {
    this.Lto = t;
  }
  OnAfterUiStart() {
    if (this.Lto) {
      ControllerHolder_1.ControllerHolder.HomeBtnController.CreateHomeBtnFromView(this.Lto);
    }
  }
  OnBeforeDestroy() {
    if (this.Lto && this.Lto.Info) {
      ControllerHolder_1.ControllerHolder.HomeBtnController.RemoveExtraCallback(this.Lto.Info.Name);
    }
  }
  AddExtraAsyncCallback(t) {
    if (this.Lto && this.Lto.Info) {
      ControllerHolder_1.ControllerHolder.HomeBtnController.AddExtraAsyncCallback(this.Lto.Info.Name, t);
    }
  }
  AddExtraCallback(t) {
    if (this.Lto && this.Lto.Info) {
      ControllerHolder_1.ControllerHolder.HomeBtnController.AddExtraCallback(this.Lto.Info.Name, t);
    }
  }
}
exports.UiBehaviourHomeBtn = UiBehaviourHomeBtn;
//# sourceMappingURL=UiBehaviourHomeBtn.js.map