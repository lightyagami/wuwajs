"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillInput = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SkillInput {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get InputArray() {
    return GameUtils_1.GameUtils.ConvertToArray(this.inputarrayLength(), this.inputarray, this);
  }
  get SkillArray() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillarrayLength(), this.skillarray, this);
  }
  get Description() {
    return this.description();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSkillInput(t, i) {
    return (i || new SkillInput()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetInputarrayAt(t) {
    return this.inputarray(t);
  }
  inputarray(t, i) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  inputarrayLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSkillarrayAt(t) {
    return this.skillarray(t);
  }
  skillarray(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  skillarrayLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillarrayArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.SkillInput = SkillInput;
//# sourceMappingURL=SkillInput.js.map