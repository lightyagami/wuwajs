"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractAudioMaterial = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class InteractAudioMaterial {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get CollisionMaterial() {
    return this.collisionmaterial();
  }
  get IsActiveImpacter() {
    return this.isactiveimpacter();
  }
  get AudioEvent() {
    return this.audioevent();
  }
  get ImpactMass() {
    return this.impactmass();
  }
  get Maxforce() {
    return this.maxforce();
  }
  get MinimumPosteventForce() {
    return this.minimumposteventforce();
  }
  get MinimumTimeBetweenAkevent() {
    return this.minimumtimebetweenakevent();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsInteractAudioMaterial(t, i) {
    return (i || new InteractAudioMaterial()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  collisionmaterial(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  isactiveimpacter() {
    var t = this.J7.__offset(this.z7, 6);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  audioevent(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  impactmass() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxforce() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  minimumposteventforce() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  minimumtimebetweenakevent() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.InteractAudioMaterial = InteractAudioMaterial;
//# sourceMappingURL=InteractAudioMaterial.js.map