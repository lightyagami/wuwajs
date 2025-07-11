"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialItemLogicBase = undefined;
class SpecialItemLogicBase {
  constructor(e) {
    this.ConfigId = 0;
    this.ConfigId = e;
  }
  Init() {}
  Destroy() {}
  CheckUseCondition() {
    return true;
  }
  OnUse() {}
}
exports.SpecialItemLogicBase = SpecialItemLogicBase;
//# sourceMappingURL=SpecialItemLogicBase.js.map