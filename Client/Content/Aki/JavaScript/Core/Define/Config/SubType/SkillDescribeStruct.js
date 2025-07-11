"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillDescribeStruct = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
class SkillDescribeStruct {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Title() {
    return this.title();
  }
  get Content() {
    return this.content();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsSkillDescribeStruct(t, e) {
    return (e || new SkillDescribeStruct()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  title(t) {
    var e = this.J7.__offset(this.z7, 4);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  content(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.SkillDescribeStruct = SkillDescribeStruct;
//# sourceMappingURL=SkillDescribeStruct.js.map