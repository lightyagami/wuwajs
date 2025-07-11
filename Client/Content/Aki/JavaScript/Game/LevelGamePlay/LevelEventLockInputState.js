"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventLockInputState = undefined;
const InputDistributeDefine_1 = require("../Ui/InputDistribute/InputDistributeDefine");
class LevelEventLockInputState {
  static get RealLockInput() {
    return this.CLe;
  }
  static Lock(t) {
    this.CLe = true;
    this.InputTagNames = t;
  }
  static Unlock() {
    this.CLe = false;
    this.InputLimitEsc = false;
    this.InputTagNames = [];
  }
  static IsLockInput() {
    return !this.GmViewOpening && this.CLe;
  }
  static get IsInputTagHasUiInputRoot() {
    return !!LevelEventLockInputState.InputTagNames && LevelEventLockInputState.InputTagNames.includes(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag);
  }
}
(exports.LevelEventLockInputState = LevelEventLockInputState).CLe = false;
LevelEventLockInputState.GmViewOpening = false;
LevelEventLockInputState.InputTagNames = [];
LevelEventLockInputState.InputLimitView = [];
LevelEventLockInputState.InputLimitEsc = false; //# sourceMappingURL=LevelEventLockInputState.js.map