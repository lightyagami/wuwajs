"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetSubLevelVisibleProcess = exports.SwitchSubLevelProcess = exports.MOBILE_ONEFRAME_MAXSET_COUNT = exports.PC_ONEFRAME_MAXSET_COUNT = undefined;
exports.PC_ONEFRAME_MAXSET_COUNT = 1000;
exports.MOBILE_ONEFRAME_MAXSET_COUNT = 200;
class SubLevelProcess {
  constructor(e) {
    this.Type = e;
  }
}
class SwitchSubLevelProcess extends SubLevelProcess {
  constructor(e) {
    super(0);
    this.Params = e;
  }
}
exports.SwitchSubLevelProcess = SwitchSubLevelProcess;
class SetSubLevelVisibleProcess extends SubLevelProcess {
  constructor(e) {
    super(1);
    this.Params = e;
  }
}
exports.SetSubLevelVisibleProcess = SetSubLevelVisibleProcess;
//# sourceMappingURL=LoadLevelDefine.js.map