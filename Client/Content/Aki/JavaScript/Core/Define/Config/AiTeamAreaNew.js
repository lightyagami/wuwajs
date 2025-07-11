"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiTeamAreaNew = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const FloatRange_1 = require("./SubType/FloatRange");
class AiTeamAreaNew {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MaxCharacter() {
    return this.maxcharacter();
  }
  get ReactionTime() {
    return this.reactiontime();
  }
  get CharTypes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.chartypesLength(), this.chartypes, this);
  }
  get AreaAngle() {
    return this.areaangle();
  }
  get AreaDistance() {
    return this.areadistance();
  }
  get AttackWeightId() {
    return this.attackweightid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsAiTeamAreaNew(t, e) {
    return (e || new AiTeamAreaNew()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxcharacter() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  reactiontime(t) {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  GetChartypesAt(t) {
    return this.chartypes(t);
  }
  chartypes(t) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  chartypesLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  chartypesArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  areaangle() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 75;
    }
  }
  areadistance(t) {
    var e = this.J7.__offset(this.z7, 14);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  attackweightid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
}
exports.AiTeamAreaNew = AiTeamAreaNew;
//# sourceMappingURL=AiTeamAreaNew.js.map