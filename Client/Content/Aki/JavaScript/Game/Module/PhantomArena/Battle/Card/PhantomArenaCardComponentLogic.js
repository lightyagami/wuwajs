"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCardComponentLogic = void 0;
class PhantomArenaCardComponentLogic {
  constructor() {
    this.Component = void 0, this.IsActive = !1, this.IsNeedAutoHide = !0
  }
  SetCardShowComponent(t) {
    this.Component = t, this.SetActive(this.IsActive)
  }
  SetActive(t) {
    this.IsActive = t, this.Component && (t ? this.IsNeedAutoHide ? this.Component.PlayStart() : this.Component.PlayLoop() : this.Component.PlayClose())
  }
}
exports.PhantomArenaCardComponentLogic = PhantomArenaCardComponentLogic;
//# sourceMappingURL=PhantomArenaCardComponentLogic.js.map