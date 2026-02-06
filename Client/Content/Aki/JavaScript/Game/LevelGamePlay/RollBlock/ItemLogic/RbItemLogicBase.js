"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RbItemLogicBase = undefined;
class RbItemLogicBase {
  constructor(t) {
    this.Owner = undefined;
    this.NeedUpdate = false;
    this.Owner = t;
    this.NeedUpdate = this.Update !== RbItemLogicBase.prototype.Update;
  }
  Start(t) {}
  End() {}
  Update(t) {}
  OnRbItemUpdate(t) {}
  OnStateChange(t) {}
}
exports.RbItemLogicBase = RbItemLogicBase;
//# sourceMappingURL=RbItemLogicBase.js.map