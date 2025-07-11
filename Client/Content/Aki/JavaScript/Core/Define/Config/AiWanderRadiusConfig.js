"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiWanderRadiusConfig = undefined;
class AiWanderRadiusConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RandomRadius() {
    return this.randomradius();
  }
  get MinWanderDistance() {
    return this.minwanderdistance();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsAiWanderRadiusConfig(t, i) {
    return (i || new AiWanderRadiusConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  randomradius() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 600;
    }
  }
  minwanderdistance() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 400;
    }
  }
}
exports.AiWanderRadiusConfig = AiWanderRadiusConfig;
//# sourceMappingURL=AiWanderRadiusConfig.js.map