"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScratchCardActivityRe = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ScratchCardActivityRe {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ItemId() {
    return this.itemid();
  }
  get TaskIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.taskidlistLength(), this.taskidlist, this);
  }
  get JumpId() {
    return this.jumpid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsScratchCardActivityRe(t, i) {
    return (i || new ScratchCardActivityRe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTaskidlistAt(t) {
    return this.taskidlist(t);
  }
  taskidlist(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  taskidlistLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  taskidlistArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ScratchCardActivityRe = ScratchCardActivityRe;
//# sourceMappingURL=ScratchCardActivityRe.js.map