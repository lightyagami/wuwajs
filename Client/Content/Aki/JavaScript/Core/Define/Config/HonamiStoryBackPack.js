"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryBackPack = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class HonamiStoryBackPack {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Wide() {
    return this.wide();
  }
  get Size() {
    return GameUtils_1.GameUtils.ConvertToArray(this.sizeLength(), this.size, this);
  }
  get CanOrganize() {
    return this.canorganize();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsHonamiStoryBackPack(t, i) {
    return (i || new HonamiStoryBackPack()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  wide() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSizeAt(t) {
    return this.size(t);
  }
  size(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  sizeLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  sizeArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  canorganize() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.HonamiStoryBackPack = HonamiStoryBackPack;
//# sourceMappingURL=HonamiStoryBackPack.js.map