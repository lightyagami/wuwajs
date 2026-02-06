"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WhirlpoolPoint = undefined;
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
class WhirlpoolPoint {
  constructor() {
    this.xe = 0;
    this.ToLocation = Vector_1.Vector.Create();
    this.BeginLocation = Vector_1.Vector.Create();
    this.WI = false;
    this.J7o = 0;
    this.H6 = 0;
    this.r1t = -1;
    this.dzo = 0;
    this.whf = true;
    this.Lhf = 0;
  }
  static GenId() {
    return WhirlpoolPoint.Czo++;
  }
  GetEnable() {
    return this.WI;
  }
  GetCancelByHit() {
    return this.whf;
  }
  GetMoveTime() {
    return this.J7o;
  }
  GetId() {
    return this.xe;
  }
  Begin(t, i, s, h, e = -1, r = 0, n = true, o = 0) {
    this.xe = t;
    this.J7o = i;
    this.ToLocation.FromUeVector(s);
    this.BeginLocation.FromUeVector(h);
    this.WI = true;
    this.H6 = 0;
    this.r1t = e;
    this.dzo = r;
    this.whf = n;
    this.Lhf = o;
  }
  UpdateLocation(t) {
    this.ToLocation.FromUeVector(t);
  }
  OnTick(t) {
    this.H6 += t;
    return !(this.r1t > 0) || !(this.r1t <= this.H6) || !(this.H6 = this.r1t, 1);
  }
  OnEnd() {
    this.WI = false;
  }
  ClearObject() {
    this.xe = 0;
    this.J7o = 0;
    this.WI = false;
    this.H6 = 0;
    return !(this.r1t = 0);
  }
  GetAlpha() {
    var t = this.H6 / this.J7o;
    switch (this.dzo) {
      case 1:
        return 1 + Math.pow(t - 1, 3);
      case 3:
        return Math.pow(t, 3);
      case 2:
        return 1 - t;
    }
    return t;
  }
  GetNeedTagId() {
    return this.Lhf;
  }
}
(exports.WhirlpoolPoint = WhirlpoolPoint).Czo = 0;
//# sourceMappingURL=WhirlpoolPoint.js.map