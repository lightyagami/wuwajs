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
    this.S8f = Transform_1.Transform.Create();
    this.S8f.Set(r.GetLocation(), r.GetRotation(), r.GetScale3D());
  }
  GetTransformData(t, r, e) {
    if (t) {
      t.DeepCopy(this.S8f.GetLocation());
    }
    if (r instanceof Quat_1.Quat) {
      r.DeepCopy(this.S8f.GetRotation());
    } else if (r instanceof Rotator_1.Rotator) {
      this.S8f.GetRotation().Rotator(r);
    }
    if (e) {
      e.DeepCopy(this.S8f.GetScale3D());
    }
    return true;
  }
  GetTransform(t) {
    t.Set(this.S8f.GetLocation(), this.S8f.GetRotation(), this.S8f.GetScale3D());
    return true;
  }
  SetTransformData(t, r, e) {
    if (t) {
      this.S8f.SetLocation(t);
    }
    if (r instanceof Quat_1.Quat) {
      this.S8f.SetRotation(r);
    } else if (r instanceof Rotator_1.Rotator) {
      this.S8f.SetRotation(r.Quaternion());
    }
    if (e) {
      this.S8f.SetScale3D(e);
    }
    return true;
  }
  SetTransform(t) {
    this.S8f.Set(t.GetLocation(), t.GetRotation(), t.GetScale3D());
    return true;
  }
}
exports.SunSpiritNonePerform = SunSpiritNonePerform;
//# sourceMappingURL=SunSpiritNonePerform.js.map