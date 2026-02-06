"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritNonePerform = undefined;
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const SunSpiritBasePerform_1 = require("./SunSpiritBasePerform");
class SunSpiritNonePerform extends SunSpiritBasePerform_1.SunSpiritBasePerform {
  constructor(t, r) {
    super(t);
    this.AYf = Transform_1.Transform.Create();
    this.AYf.Set(r.GetLocation(), r.GetRotation(), r.GetScale3D());
  }
  GetTransformData(t, r, e) {
    if (t) {
      t.DeepCopy(this.AYf.GetLocation());
    }
    if (r instanceof Quat_1.Quat) {
      r.DeepCopy(this.AYf.GetRotation());
    } else if (r instanceof Rotator_1.Rotator) {
      this.AYf.GetRotation().Rotator(r);
    }
    if (e) {
      e.DeepCopy(this.AYf.GetScale3D());
    }
    return true;
  }
  GetTransform(t) {
    t.Set(this.AYf.GetLocation(), this.AYf.GetRotation(), this.AYf.GetScale3D());
    return true;
  }
  SetTransformData(t, r, e) {
    if (t) {
      this.AYf.SetLocation(t);
    }
    if (r instanceof Quat_1.Quat) {
      this.AYf.SetRotation(r);
    } else if (r instanceof Rotator_1.Rotator) {
      this.AYf.SetRotation(r.Quaternion());
    }
    if (e) {
      this.AYf.SetScale3D(e);
    }
    return true;
  }
  SetTransform(t) {
    this.AYf.Set(t.GetLocation(), t.GetRotation(), t.GetScale3D());
    return true;
  }
}
exports.SunSpiritNonePerform = SunSpiritNonePerform;
//# sourceMappingURL=SunSpiritNonePerform.js.map