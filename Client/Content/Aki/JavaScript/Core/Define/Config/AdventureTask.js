"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdventureTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class AdventureTask {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ChapterId() {
    return this.chapterid();
  }
  get TaskText() {
    return this.tasktext();
  }
  get RecordId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.recordidLength(), this.recordid, this);
  }
  get NeedProgress() {
    return this.needprogress();
  }
  get DropIds() {
    return this.dropids();
  }
  get PathId() {
    return this.pathid();
  }
  get JumpTo() {
    return GameUtils_1.GameUtils.ConvertToMap(this.jumptoLength(), this.jumptoKey, this.jumptoValue, this);
  }
  jumptoKey(t) {
    return this.jumpto(t)?.key();
  }
  jumptoValue(t) {
    return this.jumpto(t)?.value();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsAdventureTask(t, s) {
    return (s || new AdventureTask()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  chapterid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tasktext(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetRecordidAt(t) {
    return this.recordid(t);
  }
  recordid(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  recordidLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recordidArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  needprogress() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  dropids() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  pathid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetJumptoAt(t, s) {
    return this.jumpto(t);
  }
  jumpto(t, s) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return (s || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  jumptoLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.AdventureTask = AdventureTask;
//# sourceMappingURL=AdventureTask.js.map