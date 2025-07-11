"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCardComponentLogic = undefined;
class PhantomArenaCardComponentLogic {
  constructor() {
    this.Component = undefined;
    this.IsActive = false;
    this.IsNeedAutoHide = true;
  }
  SetCardShowComponent(t) {
    this.Component = t;
    this.SetActive(this.IsActive);
  }
  SetActive(t) {
    this.IsActive = t;
    if (this.Component) {
      if (t) {
        if (this.IsNeedAutoHide) {
          this.Component.PlayStart();
        } else {
          this.Component.PlayLoop();
        }
      } else {
        this.Component.PlayClose();
      }
    }
  }
}
exports.PhantomArenaCardComponentLogic = PhantomArenaCardComponentLogic;
//# sourceMappingURL=PhantomArenaCardComponentLogic.js.map