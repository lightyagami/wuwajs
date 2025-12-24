"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotateBonesToTargetManager = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const DoublyList_1 = require("../../../../../../Core/Container/DoublyList");
const CurveUtils_1 = require("../../../../../../Core/Utils/Curve/CurveUtils");
const Transform_1 = require("../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
class RotateBoneItem {
  constructor() {
    this.gKa = 0;
    this.fKa = 1;
    this.kJo = CurveUtils_1.CurveUtils.DefaultCubic;
  }
  Set(t, s, e = CurveUtils_1.CurveUtils.DefaultCubic) {
    this.gKa = t;
    this.fKa = s;
    this.kJo = e;
  }
  GetBoneAlpha(t) {
    return MathUtils_1.MathUtils.Lerp(this.gKa, this.fKa, this.kJo.GetCurrentValue(t));
  }
}
class RotateBonesParams {
  constructor(t, s) {
    this.Handle = t;
    this.pKa = new Map();
    this.Cce = 0;
    this.uAo = 1;
    this.GoingToEnd = false;
    var e = s.Num();
    for (let t = 0; t < e; ++t) {
      var i = s.Get(t);
      if (i) {
        this.pKa.set(i, new RotateBoneItem());
      }
    }
  }
  Set(t, s, e) {
    this.Cce = 0;
    this.uAo = t;
    for (var [i, r] of this.pKa) {
      i = e.get(i) ?? 0;
      r.Set(i, s);
    }
    this.GoingToEnd = s <= 0;
  }
  IsEnd() {
    return this.pKa.size === 0 || this.GoingToEnd && this.Cce >= this.uAo;
  }
  GetAndUpdate(t, s) {
    this.Cce += t;
    for (var [e, i] of this.pKa) {
      if (s.has(e)) {
        this.pKa.delete(e);
      } else {
        s.set(e, i.GetBoneAlpha(this.Cce / this.uAo));
      }
    }
  }
}
class RotateBonesToTargetManager {
  constructor(t) {
    this.ActorComp = t;
    this.Ffe = 0;
    this.cBe = undefined;
    this.OPt = new DoublyList_1.default(undefined);
    this.vKa = new Map();
    this.nXa = Vector_1.Vector.Create();
    this.sXa = false;
    this.MKa = Vector_1.Vector.Create();
    this.aXa = 100;
    this.hXa = 100;
    this.lle = Vector_1.Vector.Create();
    this.cBe = this.ActorComp.Entity.GetComponent(41);
  }
  ClearObject() {
    this.OPt.RemoveAllNodeWithoutHead();
    this.vKa.clear();
    this.MKa.Reset();
    return true;
  }
  SetDefaultTarget(t, s, e) {
    this.MKa.FromUeVector(t);
    this.aXa = s;
    this.hXa = e * e;
    if (this.OPt.GetHeadNode() === this.OPt.GetTailNode() && (this.lXa(this.nXa), this.sXa = false, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Test", 6, "RotateBones Init Default", ["CurrentTarget", this.nXa]);
    }
  }
  SetBoneToTarget(t, s) {
    t = new RotateBonesParams(++this.Ffe, t);
    t.Set(s, 1, this.vKa);
    this.OPt.AddTail(t);
    return t.Handle;
  }
  StopBoneToTarget(t, s) {
    let e = this.OPt.GetHeadNode()?.Next;
    while (e) {
      if (e.Element?.Handle === t) {
        e.Element.Set(s, 0, this.vKa);
        break;
      }
      e = e.Next;
    }
  }
  Update(t) {
    let s = this.OPt.GetTailNode();
    var e = this.OPt.GetHeadNode();
    this.vKa.clear();
    if (s !== e) {
      while (s && s !== e) {
        s.Element?.GetAndUpdate(t, this.vKa);
        if (s.Element?.IsEnd()) {
          this.OPt.RemoveThis(s);
        }
        s = s.Pre;
      }
      this.lXa(this.lle);
      var i;
      var r = Vector_1.Vector.DistSquared(this.lle, this.nXa);
      if (this.sXa) {
        if (r <= 100) {
          this.sXa = false;
        }
      } else if (r > this.hXa) {
        this.sXa = true;
      }
      if (this.sXa) {
        if ((r = Math.sqrt(r)) < (i = t * this.aXa)) {
          this.nXa.DeepCopy(this.lle);
        } else {
          RotateBonesToTargetManager.Lz.DeepCopy(this.nXa);
          Vector_1.Vector.Lerp(RotateBonesToTargetManager.Lz, this.lle, i / r, this.nXa);
        }
      }
    }
  }
  GetActivateBones(t) {
    t.Empty();
    for (var [s, e] of this.vKa) {
      t.Add(s, e);
    }
  }
  GetTargetOffset(t) {
    t.Set(this.nXa.X, this.nXa.Y, this.nXa.Z);
  }
  lXa(t) {
    if (this.cBe && this.cBe.SkillTarget) {
      RotateBonesToTargetManager.Z_e.FromUeTransform(this.ActorComp.Actor.Mesh.D_K2_GetComponentToWorld());
      RotateBonesToTargetManager.Lz.FromUeVector(this.cBe.GetTargetTransform().GetLocation());
      RotateBonesToTargetManager.Z_e.InverseTransformPosition(RotateBonesToTargetManager.Lz, t);
    } else {
      t.DeepCopy(this.MKa);
    }
  }
}
(exports.RotateBonesToTargetManager = RotateBonesToTargetManager).Lz = Vector_1.Vector.Create();
RotateBonesToTargetManager.Z_e = Transform_1.Transform.Create(); //# sourceMappingURL=RotateBonesToTargetManager.js.map