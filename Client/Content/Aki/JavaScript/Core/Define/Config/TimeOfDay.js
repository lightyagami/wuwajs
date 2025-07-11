"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeOfDay = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const DicIntString_1 = require("./SubType/DicIntString");
class TimeOfDay {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get InitTime() {
    return this.inittime();
  }
  get Rate() {
    return this.rate();
  }
  get StateSpan() {
    return GameUtils_1.GameUtils.ConvertToMap(this.statespanLength(), this.statespanKey, this.statespanValue, this);
  }
  statespanKey(t) {
    return this.statespan(t)?.key();
  }
  statespanValue(t) {
    return this.statespan(t)?.value();
  }
  get A() {
    return this.a();
  }
  get V() {
    return this.v();
  }
  get BanTag() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bantagLength(), this.bantag, this);
  }
  get TimePreset() {
    return GameUtils_1.GameUtils.ConvertToMap(this.timepresetLength(), this.timepresetKey, this.timepresetValue, this);
  }
  timepresetKey(t) {
    return this.timepreset(t)?.key();
  }
  timepresetValue(t) {
    return this.timepreset(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTimeOfDay(t, i) {
    return (i || new TimeOfDay()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  inittime() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rate() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetStatespanAt(t, i) {
    return this.statespan(t);
  }
  statespan(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  statespanLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  a() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  v() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBantagAt(t) {
    return this.bantag(t);
  }
  bantag(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  bantagLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTimepresetAt(t, i) {
    return this.timepreset(t);
  }
  timepreset(t, i) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  timepresetLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TimeOfDay = TimeOfDay;
//# sourceMappingURL=TimeOfDay.js.map