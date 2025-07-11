"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiPatrol = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class AiPatrol {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get CirclePatrol() {
    return this.circlepatrol();
  }
  get PathSpline() {
    return this.pathspline();
  }
  get IsNavigation() {
    return this.isnavigation();
  }
  get StartIndex() {
    return this.startindex();
  }
  get LimitNpcDistance() {
    return this.limitnpcdistance();
  }
  get TurnSpeed() {
    return this.turnspeed();
  }
  get Loop() {
    return this.loop();
  }
  get EndDistance() {
    return this.enddistance();
  }
  get Sampling() {
    return this.sampling();
  }
  get ContainZ() {
    return this.containz();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsAiPatrol(t, i) {
    return (i || new AiPatrol()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  circlepatrol() {
    var t = this.J7.__offset(this.z7, 6);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  pathspline(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  isnavigation() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  startindex() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  limitnpcdistance() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1000;
    }
  }
  turnspeed() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 180;
    }
  }
  loop() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  enddistance() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 50;
    }
  }
  sampling() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  containz() {
    var t = this.J7.__offset(this.z7, 24);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.AiPatrol = AiPatrol;
//# sourceMappingURL=AiPatrol.js.map