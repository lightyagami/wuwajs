"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slide = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntFloat_1 = require("./SubType/DicIntFloat");
const FloatRange_1 = require("./SubType/FloatRange");
class Slide {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get FallingLateralFrictions() {
    return GameUtils_1.GameUtils.ConvertToMap(this.fallinglateralfrictionsLength(), this.fallinglateralfrictionsKey, this.fallinglateralfrictionsValue, this);
  }
  fallinglateralfrictionsKey(t) {
    return this.fallinglateralfrictions(t)?.key();
  }
  fallinglateralfrictionsValue(t) {
    return this.fallinglateralfrictions(t)?.value();
  }
  get SlideFriction() {
    return this.slidefriction();
  }
  get SlideAccel() {
    return this.slideaccel();
  }
  get SlideAccelUp() {
    return this.slideaccelup();
  }
  get SlideAccelDown() {
    return this.slideacceldown();
  }
  get MaxSlideHorizontalSeed() {
    return this.maxslidehorizontalseed();
  }
  get SlideModeSwitchRange() {
    return this.slidemodeswitchrange();
  }
  get Ski() {
    return this.ski();
  }
  get SkiMaxSpHor() {
    return this.skimaxsphor();
  }
  get SkiMaxSpVer() {
    return this.skimaxspver();
  }
  get JumpRate() {
    return this.jumprate();
  }
  get TurnSpeed() {
    return this.turnspeed();
  }
  get SkiHorizontalInputSpeedThreshold() {
    return this.skihorizontalinputspeedthreshold();
  }
  get SpeedReduceCurve() {
    return this.speedreducecurve();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSlide(t, i) {
    return (i || new Slide()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetFallinglateralfrictionsAt(t, i) {
    return this.fallinglateralfrictions(t);
  }
  fallinglateralfrictions(t, i) {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return (i || new DicIntFloat_1.DicIntFloat()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  fallinglateralfrictionsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  slidefriction() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 2;
    }
  }
  slideaccel() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  slideaccelup() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  slideacceldown() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  maxslidehorizontalseed() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 500;
    }
  }
  slidemodeswitchrange(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  ski() {
    var t = this.J7.__offset(this.z7, 20);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  skimaxsphor() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 2000;
    }
  }
  skimaxspver() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 2000;
    }
  }
  jumprate() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  turnspeed() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 720;
    }
  }
  skihorizontalinputspeedthreshold(t) {
    var i = this.J7.__offset(this.z7, 30);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  speedreducecurve(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.Slide = Slide;
//# sourceMappingURL=Slide.js.map