"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyTaskGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class DailyTaskGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TaskIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.taskidsLength(), this.taskids, this);
  }
  get TypeId() {
    return this.typeid();
  }
  get CountryId() {
    return this.countryid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsDailyTaskGroup(t, s) {
    return (s || new DailyTaskGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTaskidsAt(t) {
    return this.taskids(t);
  }
  taskids(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  taskidsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  taskidsArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  typeid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  countryid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DailyTaskGroup = DailyTaskGroup;
//# sourceMappingURL=DailyTaskGroup.js.map