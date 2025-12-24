"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleTeam = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const Vector_1 = require("./SubType/Vector");
class VehicleTeam {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TemplateList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.templatelistLength(), this.templatelist, this);
  }
  get PositionList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.positionlistLength(), this.positionlist, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsVehicleTeam(t, i) {
    return (i || new VehicleTeam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTemplatelistAt(t) {
    return this.templatelist(t);
  }
  templatelist(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  templatelistLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  templatelistArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetPositionlistAt(t, i) {
    return this.positionlist(t);
  }
  positionlist(t, i) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return (i || new Vector_1.Vector()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  positionlistLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.VehicleTeam = VehicleTeam;
//# sourceMappingURL=VehicleTeam.js.map