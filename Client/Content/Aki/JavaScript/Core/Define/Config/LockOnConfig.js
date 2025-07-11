"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockOnConfig = undefined;
class LockOnConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Distance() {
    return this.distance();
  }
  get UpDistance() {
    return this.updistance();
  }
  get DownDistance() {
    return this.downdistance();
  }
  get SectorRadius() {
    return this.sectorradius();
  }
  get SectorAngle() {
    return this.sectorangle();
  }
  get ToleranceAngle() {
    return this.toleranceangle();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsLockOnConfig(t, s) {
    return (s || new LockOnConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  distance() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  updistance() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 300;
    }
  }
  downdistance() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 800;
    }
  }
  sectorradius() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sectorangle() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  toleranceangle() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 22.5;
    }
  }
}
exports.LockOnConfig = LockOnConfig;
//# sourceMappingURL=LockOnConfig.js.map