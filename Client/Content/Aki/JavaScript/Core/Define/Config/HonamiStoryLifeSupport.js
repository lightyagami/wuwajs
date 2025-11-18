"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryLifeSupport = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class HonamiStoryLifeSupport {
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
  get Level() {
    return this.level();
  }
  get Icon() {
    return this.icon();
  }
  get SteadyValue() {
    return this.steadyvalue();
  }
  get ConsumeItems() {
    return GameUtils_1.GameUtils.ConvertToMap(this.consumeitemsLength(), this.consumeitemsKey, this.consumeitemsValue, this);
  }
  consumeitemsKey(t) {
    return this.consumeitems(t)?.key();
  }
  consumeitemsValue(t) {
    return this.consumeitems(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsHonamiStoryLifeSupport(t, i) {
    return (i || new HonamiStoryLifeSupport()).__init(t.readInt32(t.position()) + t.position(), t);
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
  level() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  steadyvalue() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConsumeitemsAt(t, i) {
    return this.consumeitems(t);
  }
  consumeitems(t, i) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  consumeitemsLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.HonamiStoryLifeSupport = HonamiStoryLifeSupport;
//# sourceMappingURL=HonamiStoryLifeSupport.js.map