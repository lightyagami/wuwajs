"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiSense = undefined;
const FloatRange_1 = require("./SubType/FloatRange");
class AiSense {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SenseType() {
    return this.sensetype();
  }
  get DefaultEnabled() {
    return this.defaultenabled();
  }
  get SenseDistanceRange() {
    return this.sensedistancerange();
  }
  get HorizontalAngle() {
    return this.horizontalangle();
  }
  get VerticalAngle() {
    return this.verticalangle();
  }
  get CantBeBlock() {
    return this.cantbeblock();
  }
  get BlockType() {
    return this.blocktype();
  }
  get WalkSenseRate() {
    return this.walksenserate();
  }
  get AirSenseRate() {
    return this.airsenserate();
  }
  get SenseTarget() {
    return this.sensetarget();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsAiSense(t, e) {
    return (e || new AiSense()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sensetype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  defaultenabled() {
    var t = this.J7.__offset(this.z7, 8);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  sensedistancerange(t) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  horizontalangle(t) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  verticalangle(t) {
    var e = this.J7.__offset(this.z7, 14);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  cantbeblock() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  blocktype() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  walksenserate() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  airsenserate() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  sensetarget() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.AiSense = AiSense;
//# sourceMappingURL=AiSense.js.map