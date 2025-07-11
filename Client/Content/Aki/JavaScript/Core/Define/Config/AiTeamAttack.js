"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiTeamAttack = undefined;
class AiTeamAttack {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ExtraWeight() {
    return this.extraweight();
  }
  get DistanceCoefficient() {
    return this.distancecoefficient();
  }
  get AngleCoefficient() {
    return this.anglecoefficient();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsAiTeamAttack(t, i) {
    return (i || new AiTeamAttack()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  extraweight() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 3000;
    }
  }
  distancecoefficient() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  anglecoefficient() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 100;
    }
  }
}
exports.AiTeamAttack = AiTeamAttack;
//# sourceMappingURL=AiTeamAttack.js.map