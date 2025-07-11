"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindNavigationResult = undefined;
class FindNavigationResult {
  constructor() {
    this.Result = 0;
    this.Listener = undefined;
  }
  IsFindNavigation() {
    return this.Result === 1;
  }
  IsInLoopingProcess() {
    return this.Result === 4;
  }
  IsNotFindNavigation() {
    return this.Result === 2;
  }
}
exports.FindNavigationResult = FindNavigationResult;
//# sourceMappingURL=FindNavigationResult.js.map