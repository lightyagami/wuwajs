"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideStep = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GuideStep {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Controller() {
    return this.controller();
  }
  get SuccessCondition() {
    return this.successcondition();
  }
  get FailureCondition() {
    return this.failurecondition();
  }
  get TickCondition() {
    return this.tickcondition();
  }
  get SkipCondition() {
    return this.skipcondition();
  }
  get BreakCondition() {
    return this.breakcondition();
  }
  get TimeScale() {
    return this.timescale();
  }
  get ContentType() {
    return this.contenttype();
  }
  get ReportId() {
    return this.reportid();
  }
  get Duration() {
    return this.duration();
  }
  get MinDuration() {
    return this.minduration();
  }
  get ShowDelay() {
    return this.showdelay();
  }
  get IsDangerous() {
    return this.isdangerous();
  }
  get IsTimeUpAsFinish() {
    return this.istimeupasfinish();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGuideStep(t, i) {
    return (i || new GuideStep()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  controller(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  successcondition() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  failurecondition() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tickcondition() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skipcondition() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  breakcondition() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  timescale() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  contenttype() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reportid() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  duration() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 5000;
    }
  }
  minduration() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -1;
    }
  }
  showdelay() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isdangerous() {
    var t = this.J7.__offset(this.z7, 30);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  istimeupasfinish() {
    var t = this.J7.__offset(this.z7, 32);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.GuideStep = GuideStep;
//# sourceMappingURL=GuideStep.js.map