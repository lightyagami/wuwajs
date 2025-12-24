"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrAutoPilotCircle = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class InfrAutoPilotCircle {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get AutoPilotCirclePathId() {
    return this.autopilotcirclepathid();
  }
  get MapId() {
    return this.mapid();
  }
  get RoadBuildIdArray() {
    return GameUtils_1.GameUtils.ConvertToArray(this.roadbuildidarrayLength(), this.roadbuildidarray, this);
  }
  get PrefabPath() {
    return this.prefabpath();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsInfrAutoPilotCircle(t, i) {
    return (i || new InfrAutoPilotCircle()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  autopilotcirclepathid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRoadbuildidarrayAt(t) {
    return this.roadbuildidarray(t);
  }
  roadbuildidarray(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  roadbuildidarrayLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  roadbuildidarrayArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  prefabpath(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.InfrAutoPilotCircle = InfrAutoPilotCircle;
//# sourceMappingURL=InfrAutoPilotCircle.js.map