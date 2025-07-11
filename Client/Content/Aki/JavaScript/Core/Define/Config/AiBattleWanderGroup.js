"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiBattleWanderGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const FloatRange_1 = require("./SubType/FloatRange");
class AiBattleWanderGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get DistanceRange() {
    return GameUtils_1.GameUtils.ConvertToArray(this.distancerangeLength(), this.distancerange, this);
  }
  get NearActionRates() {
    return GameUtils_1.GameUtils.ConvertToArray(this.nearactionratesLength(), this.nearactionrates, this);
  }
  get MiddleActionRates() {
    return GameUtils_1.GameUtils.ConvertToArray(this.middleactionratesLength(), this.middleactionrates, this);
  }
  get FarActionRates() {
    return GameUtils_1.GameUtils.ConvertToArray(this.faractionratesLength(), this.faractionrates, this);
  }
  get TurnSpeeds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.turnspeedsLength(), this.turnspeeds, this);
  }
  get RunTurnSpeed() {
    return this.runturnspeed();
  }
  get WanderTime() {
    return this.wandertime();
  }
  get SumWanderTime() {
    return this.sumwandertime();
  }
  get OnlyForward() {
    return this.onlyforward();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsAiBattleWanderGroup(t, s) {
    return (s || new AiBattleWanderGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDistancerangeAt(t) {
    return this.distancerange(t);
  }
  distancerange(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  distancerangeLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  distancerangeArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetNearactionratesAt(t) {
    return this.nearactionrates(t);
  }
  nearactionrates(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  nearactionratesLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  nearactionratesArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetMiddleactionratesAt(t) {
    return this.middleactionrates(t);
  }
  middleactionrates(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  middleactionratesLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  middleactionratesArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFaractionratesAt(t) {
    return this.faractionrates(t);
  }
  faractionrates(t) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  faractionratesLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  faractionratesArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetTurnspeedsAt(t) {
    return this.turnspeeds(t);
  }
  turnspeeds(t) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  turnspeedsLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  turnspeedsArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  runturnspeed() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 360;
    }
  }
  wandertime(t) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  sumwandertime(t) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  onlyforward() {
    var t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.AiBattleWanderGroup = AiBattleWanderGroup;
//# sourceMappingURL=AiBattleWanderGroup.js.map