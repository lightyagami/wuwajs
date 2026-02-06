"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringFestivalAreaCamera = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const Vector_1 = require("./SubType/Vector");
class SpringFestivalAreaCamera {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get CameraName() {
    return this.cameraname();
  }
  get CameraLocation() {
    return this.cameralocation();
  }
  get CameraRotator() {
    return this.camerarotator();
  }
  get CameraFov() {
    return this.camerafov();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsSpringFestivalAreaCamera(t, r) {
    return (r || new SpringFestivalAreaCamera()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cameraname(t) {
    var r = this.J7.__offset(this.z7, 6);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  cameralocation(t) {
    var r = this.J7.__offset(this.z7, 8);
    if (r) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
  camerarotator(t) {
    var r = this.J7.__offset(this.z7, 10);
    if (r) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
  camerafov() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 90;
    }
  }
}
exports.SpringFestivalAreaCamera = SpringFestivalAreaCamera;
//# sourceMappingURL=SpringFestivalAreaCamera.js.map