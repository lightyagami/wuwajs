"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressInvestigation = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RegressInvestigation {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get InvestigationType() {
    return this.investigationtype();
  }
  get IfGlobal() {
    return this.ifglobal();
  }
  get QuestionnaireId() {
    return this.questionnaireid();
  }
  get Reward() {
    return this.reward();
  }
  get HyperLink() {
    return this.hyperlink();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRegressInvestigation(t, i) {
    return (i || new RegressInvestigation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  investigationtype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  ifglobal() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  questionnaireid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reward() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  hyperlink(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.RegressInvestigation = RegressInvestigation;
//# sourceMappingURL=RegressInvestigation.js.map