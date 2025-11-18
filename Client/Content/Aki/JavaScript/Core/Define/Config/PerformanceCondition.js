"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformanceCondition = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const GameplayTagArray_1 = require("./SubType/GameplayTagArray");
class PerformanceCondition {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get WaterHeight() {
    return GameUtils_1.GameUtils.ConvertToArray(this.waterheightLength(), this.waterheight, this);
  }
  get StandingNormalZ() {
    return GameUtils_1.GameUtils.ConvertToArray(this.standingnormalzLength(), this.standingnormalz, this);
  }
  get DisableTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.disabletagsLength(), this.disabletags, this);
  }
  get Radius() {
    return GameUtils_1.GameUtils.ConvertToArray(this.radiusLength(), this.radius, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPerformanceCondition(t, i) {
    return (i || new PerformanceCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWaterheightAt(t) {
    return this.waterheight(t);
  }
  waterheight(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  waterheightLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  waterheightArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetStandingnormalzAt(t) {
    return this.standingnormalz(t);
  }
  standingnormalz(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  standingnormalzLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  standingnormalzArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDisabletagsAt(t, i) {
    return this.disabletags(t);
  }
  disabletags(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new GameplayTagArray_1.GameplayTagArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  disabletagsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRadiusAt(t) {
    return this.radius(t);
  }
  radius(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  radiusLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  radiusArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.PerformanceCondition = PerformanceCondition;
//# sourceMappingURL=PerformanceCondition.js.map