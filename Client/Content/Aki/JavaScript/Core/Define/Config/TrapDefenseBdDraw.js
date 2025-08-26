"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdDraw = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntArray_1 = require("./SubType/IntArray");
class TrapDefenseBdDraw {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get DrawMode() {
    return this.drawmode();
  }
  get BdWeights() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bdweightsLength(), this.bdweights, this);
  }
  get QualityWeight() {
    return GameUtils_1.GameUtils.ConvertToArray(this.qualityweightLength(), this.qualityweight, this);
  }
  get MostBdBounusWeight() {
    return GameUtils_1.GameUtils.ConvertToArray(this.mostbdbounusweightLength(), this.mostbdbounusweight, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsTrapDefenseBdDraw(t, s) {
    return (s || new TrapDefenseBdDraw()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  drawmode() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBdweightsAt(t, s) {
    return this.bdweights(t);
  }
  bdweights(t, s) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return (s || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  bdweightsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetQualityweightAt(t) {
    return this.qualityweight(t);
  }
  qualityweight(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  qualityweightLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  qualityweightArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetMostbdbounusweightAt(t) {
    return this.mostbdbounusweight(t);
  }
  mostbdbounusweight(t) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  mostbdbounusweightLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mostbdbounusweightArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.TrapDefenseBdDraw = TrapDefenseBdDraw;
//# sourceMappingURL=TrapDefenseBdDraw.js.map