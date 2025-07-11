"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongShanStageInfo = undefined;
class LongShanStageInfo {
  constructor(t) {
    this.ProtoStageInfo = undefined;
    this.TaskInfoMap = new Map();
    this.ProtoStageInfo = t;
    if (this.ProtoStageInfo.cMs) {
      for (const o of t.cMs) {
        this.TaskInfoMap.set(o.s5n, o);
      }
    }
  }
}
exports.LongShanStageInfo = LongShanStageInfo;
//# sourceMappingURL=LongShanStageInfo.js.map