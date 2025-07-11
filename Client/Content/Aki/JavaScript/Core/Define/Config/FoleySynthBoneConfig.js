"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoleySynthBoneConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FoleySynthBoneConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get BoneName() {
    return this.bonename();
  }
  get Model1Ceil() {
    return this.model1ceil();
  }
  get Model1CeilEventPath() {
    return this.model1ceileventpath();
  }
  get Model1Floor() {
    return this.model1floor();
  }
  get Model1FloorEventPath() {
    return this.model1flooreventpath();
  }
  get Model1CeilInterpolation() {
    return this.model1ceilinterpolation();
  }
  get Model1FloorInterpolation() {
    return this.model1floorinterpolation();
  }
  get Model1RtpcPath() {
    return this.model1rtpcpath();
  }
  get Model2Ceil() {
    return this.model2ceil();
  }
  get Model2CeilEventPath() {
    return this.model2ceileventpath();
  }
  get Model2Floor() {
    return this.model2floor();
  }
  get Model2FloorPath() {
    return this.model2floorpath();
  }
  get Model2FloorPrecent() {
    return this.model2floorprecent();
  }
  get Model2RptcVelocityMax() {
    return this.model2rptcvelocitymax();
  }
  get Model2RptcAccelerationMax() {
    return this.model2rptcaccelerationmax();
  }
  get Model2RptcVelocityDuring() {
    return this.model2rptcvelocityduring();
  }
  get Model2CeilInterpolation() {
    return this.model2ceilinterpolation();
  }
  get Model2FloorInterpolation() {
    return this.model2floorinterpolation();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsFoleySynthBoneConfig(t, e) {
    return (e || new FoleySynthBoneConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  bonename(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  model1ceil() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  model1ceileventpath(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  model1floor() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  model1flooreventpath(t) {
    var e = this.J7.__offset(this.z7, 16);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  model1ceilinterpolation() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  model1floorinterpolation() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  model1rtpcpath(t) {
    var e = this.J7.__offset(this.z7, 22);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  model2ceil() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  model2ceileventpath(t) {
    var e = this.J7.__offset(this.z7, 26);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  model2floor() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  model2floorpath(t) {
    var e = this.J7.__offset(this.z7, 30);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  model2floorprecent() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  model2rptcvelocitymax(t) {
    var e = this.J7.__offset(this.z7, 34);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  model2rptcaccelerationmax(t) {
    var e = this.J7.__offset(this.z7, 36);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  model2rptcvelocityduring(t) {
    var e = this.J7.__offset(this.z7, 38);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  model2ceilinterpolation() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  model2floorinterpolation() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FoleySynthBoneConfig = FoleySynthBoneConfig;
//# sourceMappingURL=FoleySynthBoneConfig.js.map