"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelBase = undefined;
class ModelBase {
  Init() {
    return this.OnInit();
  }
  Clear() {
    return this.OnClear();
  }
  LeaveLevel() {
    return this.OnLeaveLevel();
  }
  ChangeMode() {
    return this.OnChangeMode();
  }
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  OnLeaveLevel() {
    return true;
  }
  OnChangeMode() {
    return true;
  }
}
exports.ModelBase = ModelBase;
//# sourceMappingURL=ModelBase.js.map