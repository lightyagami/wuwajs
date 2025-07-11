"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortalUtils = undefined;
const UE = require("ue");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const ModelManager_1 = require("../Manager/ModelManager");
class PortalUtils {
  static GetMappingPosToOtherPortal(t, r, a, i) {
    if (!r) {
      i.DeepCopy(t);
      return i;
    }
    r = ModelManager_1.ModelManager.PortalModel?.GetPortal(r);
    if (r && r.Portal1Enable && r.Portal2Enable) {
      var [a, r] = a ? [r.PortalWorldTransform1, r.PortalWorldTransform2] : [r.PortalWorldTransform2, r.PortalWorldTransform1];
      if (a && r) {
        return PortalUtils.GetMappingPosByPortalTransform(t, a, r, i);
      }
    }
  }
  static GetMappingPosByPortalTransform(t, r, a, i) {
    if (r && a) {
      r = r.InverseTransformPosition(t.ToUeVector());
      t = PortalUtils.HWs.TransformPosition(r);
      r = a.TransformPosition(t);
      i.DeepCopy(r);
      return i;
    }
  }
  static GetMappingVecByPortalTransform(t, r, a, i) {
    if (r && a) {
      r = r.InverseTransformVector(t.ToUeVector());
      t = PortalUtils.HWs.TransformVector(r);
      r = a.TransformVector(t);
      i.DeepCopy(r);
      return i;
    }
  }
  static GetMappingTransformToOtherPortal(t, r, a) {
    if (!r) {
      return t;
    }
    r = ModelManager_1.ModelManager.PortalModel?.GetPortal(r);
    if (r && r.Portal1Enable && r.Portal2Enable) {
      var [a, r] = a ? [r.PortalWorldTransform1, r.PortalWorldTransform2] : [r.PortalWorldTransform2, r.PortalWorldTransform1];
      if (a && r) {
        return PortalUtils.GetMappingTransformByPortalTransform(t, a, r);
      }
    }
  }
  static GetMappingTransformByPortalTransform(t, r, a) {
    if (r && a && t) {
      return t.GetRelativeTransform(r).op_Multiply(PortalUtils.HWs).op_Multiply(a);
    }
  }
  static GetMappingOffsetTransformToOtherPortal(t, r, a, i = undefined, e = 0) {
    if (!r) {
      return t;
    }
    r = ModelManager_1.ModelManager.PortalModel?.GetPortal(r);
    if (r && r.Portal1Enable && r.Portal2Enable) {
      var [a, r] = a ? [r.PortalWorldTransform1, r.PortalWorldTransform2] : [r.PortalWorldTransform2, r.PortalWorldTransform1];
      if (a && r) {
        return PortalUtils.GetMappingOffsetTransformByPortalTransform(t, a, r, undefined, i, e);
      }
    }
  }
  static GetMappingOffsetTransformByPortalTransform(t, r, a, i = Vector_1.Vector.DownVectorProxy, e = undefined, s = 200) {
    t = PortalUtils.GetMappingTransformByPortalTransform(t, r, a);
    if (t) {
      while (this.oWa.length < 6) {
        this.oWa.push(Vector_1.Vector.Create());
      }
      var o = Quat_1.Quat.Create(t.GetRotation());
      var l = this.oWa[0];
      l.FromConfigVector(i);
      l.UnaryNegation(l);
      var i = this.oWa[1];
      o.GetForwardVector(i);
      var n = this.oWa[2];
      o.GetRightVector(n);
      var M = this.oWa[3];
      l.CrossProduct(i, M);
      var f = M.SizeSquared();
      l.CrossProduct(n, M);
      var M = M.SizeSquared();
      if (M < f) {
        MathUtils_1.MathUtils.LookRotationUpFirst(i, l, o);
      } else {
        MathUtils_1.MathUtils.LookRotationUpFirst(n, l, o);
        M = this.oWa[3];
        o.GetForwardVector(M);
        f = M.CrossProductEqual(l);
        MathUtils_1.MathUtils.LookRotationUpFirst(f, l, o);
      }
      t.SetRotation(o.ToUeQuat());
      if (e && s !== 0) {
        i = this.oWa[4];
        MathUtils_1.MathUtils.CommonTempVector.FromUeVector(e);
        PortalUtils.GetMappingVecByPortalTransform(MathUtils_1.MathUtils.CommonTempVector, r, a, i);
        i.GetSafeNormal(i);
        n = i.IsNearlyZero() ? a.GetRotation().GetForwardVector().op_Multiply(s) : i.Multiply(s, this.oWa[5]).ToUeVector();
        t.AddToTranslation(new UE.VectorDouble(n.X, n.Y, n.Z));
      }
      return t;
    }
  }
}
(exports.PortalUtils = PortalUtils).HWs = new UE.TransformDouble(new UE.Quat(Vector_1.Vector.ZAxisVector, Math.PI));
PortalUtils.oWa = []; //# sourceMappingURL=PortalUtils.js.map