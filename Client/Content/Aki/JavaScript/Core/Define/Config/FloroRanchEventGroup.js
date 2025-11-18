"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEventGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class FloroRanchEventGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Group() {
    return this.group();
  }
  get Period() {
    return this.period();
  }
  get Rate() {
    return this.rate();
  }
  get Event() {
    return GameUtils_1.GameUtils.ConvertToArray(this.eventLength(), this.event, this);
  }
  get Round() {
    return GameUtils_1.GameUtils.ConvertToMap(this.roundLength(), this.roundKey, this.roundValue, this);
  }
  roundKey(t) {
    return this.round(t)?.key();
  }
  roundValue(t) {
    return this.round(t)?.value();
  }
  get Protect() {
    return GameUtils_1.GameUtils.ConvertToMap(this.protectLength(), this.protectKey, this.protectValue, this);
  }
  protectKey(t) {
    return this.protect(t)?.key();
  }
  protectValue(t) {
    return this.protect(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFloroRanchEventGroup(t, i) {
    return (i || new FloroRanchEventGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  group() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  period() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rate() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetEventAt(t) {
    return this.event(t);
  }
  event(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  eventLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  eventArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRoundAt(t, i) {
    return this.round(t);
  }
  round(t, i) {
    var r = this.J7.__offset(this.z7, 16);
    if (r) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  roundLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetProtectAt(t, i) {
    return this.protect(t);
  }
  protect(t, i) {
    var r = this.J7.__offset(this.z7, 18);
    if (r) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  protectLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FloroRanchEventGroup = FloroRanchEventGroup;
//# sourceMappingURL=FloroRanchEventGroup.js.map