"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseSensoryInfo = undefined;
class BaseSensoryInfo {
  constructor() {
    this.RangePerceptionType = 1;
    this.SensoryInfoType = 1;
    this.SensoryRange = 0;
    this.InRange = false;
  }
  Init(...s) {
    this.OnInit(s);
  }
  Tick(s) {
    if (this.SensoryInfoType & 2) {
      this.OnTick(s);
    }
  }
  Clear() {
    this.InRange = false;
    this.SensoryRange = 0;
    this.OnClear();
  }
  CheckInRange() {
    return this.InRange;
  }
  ClearCacheList() {}
}
exports.BaseSensoryInfo = BaseSensoryInfo;
//# sourceMappingURL=BaseSensoryInfo.js.map