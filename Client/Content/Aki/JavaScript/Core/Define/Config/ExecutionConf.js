"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExecutionConf = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ExecutionConf {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ExecutionRoleId() {
    return this.executionroleid();
  }
  get ExecutionSkillId() {
    return this.executionskillid();
  }
  get LimitExecutionTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.limitexecutiontagsLength(), this.limitexecutiontags, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsExecutionConf(t, i) {
    return (i || new ExecutionConf()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  executionroleid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  executionskillid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLimitexecutiontagsAt(t) {
    return this.limitexecutiontags(t);
  }
  limitexecutiontags(t, i) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, i) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  limitexecutiontagsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ExecutionConf = ExecutionConf;
//# sourceMappingURL=ExecutionConf.js.map