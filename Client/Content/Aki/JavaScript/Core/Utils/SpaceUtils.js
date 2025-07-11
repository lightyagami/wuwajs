"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceUtils = undefined;
const Log_1 = require("../Common/Log");
const Quat_1 = require("./Math/Quat");
const Vector_1 = require("./Math/Vector");
const MathUtils_1 = require("./MathUtils");
const boundPoints = [Vector_1.Vector.Create(1, 1, 1), Vector_1.Vector.Create(1, 1, -1), Vector_1.Vector.Create(1, -1, 1), Vector_1.Vector.Create(1, -1, -1), Vector_1.Vector.Create(-1, 1, 1), Vector_1.Vector.Create(-1, 1, -1), Vector_1.Vector.Create(-1, -1, 1), Vector_1.Vector.Create(-1, -1, -1)];
class SpaceUtils {
  static vz() {
    if (this.Mz.length) {
      return this.Mz.pop();
    } else {
      return Vector_1.Vector.Create();
    }
  }
  static Ez(t) {
    this.Mz.push(...t);
    t.length = 0;
  }
  static IsComponentInRingArea(t, i, s, h = undefined) {
    var e = s.D_GetComponentBounds();
    this.Sz.FromUeVector(e.Origin);
    this.yz.FromUeVector(e.BoxExtent);
    var r = i.X * i.X;
    if (r < this.yz.X * this.yz.X || r < this.yz.Y * this.yz.Y) {
      this.Sz.Z = 0;
      this.yz.Z = 0;
      this.q9s.Set(t.X, t.Y, 0);
      return this.G9s(this.Sz, this.yz, this.q9s, i.X);
    }
    this.Iz.FromUeQuat(s.K2_GetComponentQuaternion());
    this.Sz.Subtraction(t, this.Tz);
    var o;
    var a;
    var c = i.Z;
    var n = i.Y * i.Y;
    let _ = 0;
    let u = 0;
    for (const l of boundPoints) {
      this.yz.Multiply(l, this.Lz);
      this.Iz.RotateVector(this.Lz, this.Lz);
      this.Lz.AdditionEqual(this.Tz);
      if (h) {
        o = this.Lz.DotProduct(h);
        if (u !== 3) {
          if (c < o) {
            u |= 1;
          } else if (c < -o) {
            u |= 2;
          } else {
            u = 3;
          }
        }
      } else if (u !== 3) {
        if (this.Lz.Z > c) {
          u |= 1;
        } else if (-this.Lz.Z > c) {
          u |= 2;
        } else {
          u = 3;
        }
      }
      if (h) {
        Vector_1.Vector.VectorPlaneProject(this.Lz, h, this.fHo);
        o = this.fHo.SizeSquared();
        if (_ !== 3) {
          if (r < o) {
            _ |= 1;
          } else if (o < n) {
            _ |= 2;
          } else {
            _ = 3;
          }
        }
      } else {
        a = this.Lz.SizeSquared2D();
        if (_ !== 3) {
          if (r < a) {
            _ |= 1;
          } else if (a < n) {
            _ |= 2;
          } else {
            _ = 3;
          }
        }
      }
      if (u === 3 && _ === 3) {
        return true;
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 20, "无法命中", ["inHeight", u], ["inDist", _]);
    }
    return false;
  }
  static G9s(t, i, s, h) {
    s.Subtraction(t, this.O9s);
    if (this.O9s.X < 0) {
      this.O9s.X = -this.O9s.X;
    }
    if (this.O9s.Y < 0) {
      this.O9s.Y = -this.O9s.Y;
    }
    this.O9s.SubtractionEqual(i);
    let e = false;
    if (this.O9s.X < 0) {
      this.O9s.X = 0;
      e = true;
    }
    if (this.O9s.Y < 0) {
      if (e) {
        return true;
      }
      this.O9s.Y = 0;
    }
    return this.O9s.DotProduct(this.O9s) <= h * h;
  }
  static RPc(t) {
    return this.yz.X > t || this.yz.Y > t;
  }
  static IsComponentInSectorArea(t, i, s, h) {
    var e = h.D_GetComponentBounds();
    this.yz.FromUeVector(e.BoxExtent);
    if (this.RPc(i.X)) {
      return true;
    }
    this.Sz.FromUeVector(e.Origin);
    this.Iz.FromUeQuat(h.K2_GetComponentQuaternion());
    this.Sz.Subtraction(t, this.Tz);
    s.Inverse(this.Dz);
    var r = i.X * i.X;
    var o = MathUtils_1.MathUtils.DegToRad * i.Y * 0.5;
    var a = o < Math.PI * 0.5;
    var c = i.Z;
    let n = 0;
    let _ = 0;
    let u = 0;
    for (const V of boundPoints) {
      this.yz.Multiply(V, this.Lz);
      this.Iz.RotateVector(this.Lz, this.Lz);
      this.Lz.AdditionEqual(this.Tz);
      this.Dz.RotateVector(this.Lz, this.Lz);
      if (_ !== 3) {
        if (this.Lz.Z > c) {
          _ |= 1;
        } else if (-this.Lz.Z > c) {
          _ |= 2;
        } else {
          _ = 3;
        }
      }
      var l;
      var p = this.Lz.SizeSquared2D();
      if (n !== 3 && p <= r) {
        n = 3;
      }
      var p = Math.atan2(this.Lz.Y, this.Lz.X);
      if (u !== 3) {
        if (a) {
          if (o < p) {
            (l = this.vz()).DeepCopy(this.Lz);
            this.Rz.push(l);
          } else if (o < -p) {
            (l = this.vz()).DeepCopy(this.Lz);
            this.Uz.push(l);
          } else {
            u = 3;
          }
        } else if (Math.abs(p) <= o) {
          u = 3;
        }
      }
      if (_ === 3 && n === 3 && u === 3) {
        if (a) {
          this.Ez(this.Uz);
          this.Ez(this.Rz);
        }
        return true;
      }
    }
    if (a) {
      if (_ === 3 && n === 3 && this.Az()) {
        this.Ez(this.Uz);
        this.Ez(this.Rz);
        return true;
      }
      this.Ez(this.Uz);
      this.Ez(this.Rz);
    }
    return false;
  }
  static Az() {
    for (const t of this.Uz) {
      for (const i of this.Rz) {
        if (!(Math.abs(i.Y - t.Y) < MathUtils_1.MathUtils.SmallNumber) && i.X - (i.X - t.X) / (i.Y - t.Y) * i.Y >= 0) {
          return true;
        }
      }
    }
    return false;
  }
  static IsLocationInSideBullet(t, i) {
    var s = Vector_1.Vector.DistSquared(t.GetCollisionLocation(), i);
    var i = t.BulletDataMain.Base;
    var h = i.Size;
    switch (i.Shape) {
      case 0:
        if (s < h.X * h.X && s < h.Y * h.Y && s < h.Z * h.Z) {
          return true;
        } else {
          return false;
        }
      case 1:
        if (s < h.X * h.X) {
          return true;
        } else {
          return false;
        }
      case 3:
        if (s < h.Y * h.Y) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  }
}
(exports.SpaceUtils = SpaceUtils).Sz = Vector_1.Vector.Create();
SpaceUtils.yz = Vector_1.Vector.Create();
SpaceUtils.Iz = Quat_1.Quat.Create();
SpaceUtils.Lz = Vector_1.Vector.Create();
SpaceUtils.Tz = Vector_1.Vector.Create();
SpaceUtils.fHo = Vector_1.Vector.Create();
SpaceUtils.Dz = Quat_1.Quat.Create();
SpaceUtils.Mz = new Array();
SpaceUtils.Uz = new Array();
SpaceUtils.Rz = new Array();
SpaceUtils.q9s = Vector_1.Vector.Create();
SpaceUtils.O9s = Vector_1.Vector.Create(); //# sourceMappingURL=SpaceUtils.js.map