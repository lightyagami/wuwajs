"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackMoonEntrust = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class TrackMoonEntrust {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Title() {
    return this.title();
  }
  get Content() {
    return this.content();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get Guaranteed() {
    return this.guaranteed();
  }
  get JumpType() {
    return this.jumptype();
  }
  get JumpParam() {
    return this.jumpparam();
  }
  get CapacityMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.capacitymapLength(), this.capacitymapKey, this.capacitymapValue, this);
  }
  capacitymapKey(t) {
    return this.capacitymap(t)?.key();
  }
  capacitymapValue(t) {
    return this.capacitymap(t)?.value();
  }
  get Consume() {
    return GameUtils_1.GameUtils.ConvertToMap(this.consumeLength(), this.consumeKey, this.consumeValue, this);
  }
  consumeKey(t) {
    return this.consume(t)?.key();
  }
  consumeValue(t) {
    return this.consume(t)?.value();
  }
  get Star() {
    return this.star();
  }
  get EntrustType() {
    return this.entrusttype();
  }
  get IdeaSuccRatio() {
    return GameUtils_1.GameUtils.ConvertToMap(this.ideasuccratioLength(), this.ideasuccratioKey, this.ideasuccratioValue, this);
  }
  ideasuccratioKey(t) {
    return this.ideasuccratio(t)?.key();
  }
  ideasuccratioValue(t) {
    return this.ideasuccratio(t)?.value();
  }
  get IdeaSuccMul() {
    return GameUtils_1.GameUtils.ConvertToArray(this.ideasuccmulLength(), this.ideasuccmul, this);
  }
  get AttributionSuccRatio() {
    return GameUtils_1.GameUtils.ConvertToArray(this.attributionsuccratioLength(), this.attributionsuccratio, this);
  }
  get AttributeMaxValue() {
    return this.attributemaxvalue();
  }
  get InvestLimit() {
    return this.investlimit();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTrackMoonEntrust(t, i) {
    return (i || new TrackMoonEntrust()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  title(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  content(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  guaranteed() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  jumptype() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  jumpparam() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCapacitymapAt(t, i) {
    return this.capacitymap(t);
  }
  capacitymap(t, i) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  capacitymapLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConsumeAt(t, i) {
    return this.consume(t);
  }
  consume(t, i) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  consumeLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  star() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entrusttype() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetIdeasuccratioAt(t, i) {
    return this.ideasuccratio(t);
  }
  ideasuccratio(t, i) {
    var s = this.J7.__offset(this.z7, 26);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  ideasuccratioLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetIdeasuccmulAt(t) {
    return this.ideasuccmul(t);
  }
  ideasuccmul(t) {
    var i = this.J7.__offset(this.z7, 28);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  ideasuccmulLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  ideasuccmulArray() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetAttributionsuccratioAt(t) {
    return this.attributionsuccratio(t);
  }
  attributionsuccratio(t) {
    var i = this.J7.__offset(this.z7, 30);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  attributionsuccratioLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  attributionsuccratioArray() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  attributemaxvalue() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  investlimit() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TrackMoonEntrust = TrackMoonEntrust;
//# sourceMappingURL=TrackMoonEntrust.js.map