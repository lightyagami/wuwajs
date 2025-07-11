"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagChangeNextTickTask = undefined;
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
class TagChangeNextTickTask {
  constructor() {
    this.CIo = new Map();
    this.gIo = undefined;
    this.fIo = [];
    this.pIo = () => {
      this.gIo = undefined;
      if (this.fIo.length > 0) {
        for (const t of this.fIo) {
          t(this.CIo);
        }
      }
      this.fIo.length = 0;
      this.CIo.clear();
    };
  }
  TagChangeWaitNextTick(t, i, s) {
    this.CIo.set(t, i);
    this.fIo.push(s);
    this.gIo ||= TimerSystem_1.TimerSystem.Next(this.pIo);
  }
  Clear() {
    if (this.gIo && TimerSystem_1.TimerSystem.Has(this.gIo)) {
      TimerSystem_1.TimerSystem.Remove(this.gIo);
    }
    this.gIo = undefined;
    this.fIo.length = 0;
    this.CIo.clear();
    this.fIo = undefined;
  }
}
exports.TagChangeNextTickTask = TagChangeNextTickTask;
//# sourceMappingURL=TagChangeNextTickTask.js.map