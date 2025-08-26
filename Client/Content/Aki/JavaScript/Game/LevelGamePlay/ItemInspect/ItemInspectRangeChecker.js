"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInspectRangeChecker = undefined;
const UE = require("ue");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../GlobalData");
const ColorUtils_1 = require("../../Utils/ColorUtils");
class ItemInspectRangeChecker {
  constructor() {
    this.Location = Vector_1.Vector.Create();
    this.Rotation = Rotator_1.Rotator.Create();
  }
  static Create(t, e, s, i) {
    let r = undefined;
    if (r = t === 0 ? new ConeRangeChecker() : r) {
      r.AU(e, s, i);
      return r;
    }
  }
  AU(t, e, s) {
    this.Location.DeepCopy(e);
    this.Rotation.DeepCopy(s);
    this.OnInit(t);
  }
}
class ConeRangeChecker extends (exports.ItemInspectRangeChecker = ItemInspectRangeChecker) {
  constructor() {
    super(...arguments);
    this.UpToDownVector = Vector_1.Vector.Create();
    this.cz = Vector_1.Vector.Create();
    this.nna = 0;
    this.Znl = 0;
  }
  OnInit(t) {
    this.Rotation.Vector(this.UpToDownVector);
    this.nna = t.Height;
    this.Znl = t.Radius;
  }
  IsPointInside(t) {
    this.cz.DeepCopy(t);
    return MathUtils_1.MathUtils.IsLocationInsideCone(this.Location, this.UpToDownVector, this.nna, this.Znl, this.cz);
  }
  DebugDraw() {
    var t = this.nna;
    var e = this.Znl;
    var s = Math.sqrt(t * t + e * e);
    var e = Math.atan(e / t);
    UE.KismetSystemLibrary.D_DrawDebugCone(GlobalData_1.GlobalData.World, this.Location.ToUeVector(), this.UpToDownVector.ToUeVector(), s, e, e, 12, ColorUtils_1.ColorUtils.LinearRed, 1);
  }
}
//# sourceMappingURL=ItemInspectRangeChecker.js.map