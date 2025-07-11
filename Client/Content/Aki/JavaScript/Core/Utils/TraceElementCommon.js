"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraceElementCommon = exports.TraceHandle = undefined;
const UE = require("ue");
const Time_1 = require("../Common/Time");
const FNameUtil_1 = require("./FNameUtil");
const OPEN_PROFILE_TEST = true;
const NO_PROFILE_KEY = "";
class TraceHandle {
  constructor(t = 0, e = 0) {
    this.Frame = t;
    this.Index = e;
  }
}
exports.TraceHandle = TraceHandle;
class TraceElementCommon {
  static LineTrace(t, e) {
    if (OPEN_PROFILE_TEST) {
      return UE.KuroTraceLibrary.LineTrace(t, e);
    } else {
      return UE.KuroTraceLibrary.LineTrace(t, NO_PROFILE_KEY);
    }
  }
  static BoxTrace(t, e) {
    if (OPEN_PROFILE_TEST) {
      return UE.KuroTraceLibrary.BoxTrace(t, e);
    } else {
      return UE.KuroTraceLibrary.BoxTrace(t, NO_PROFILE_KEY);
    }
  }
  static CapsuleTrace(t, e) {
    if (OPEN_PROFILE_TEST) {
      return UE.KuroTraceLibrary.CapsuleTrace(t, e);
    } else {
      return UE.KuroTraceLibrary.CapsuleTrace(t, NO_PROFILE_KEY);
    }
  }
  static SphereTrace(t, e) {
    if (OPEN_PROFILE_TEST) {
      return UE.KuroTraceLibrary.SphereTrace(t, e);
    } else {
      return UE.KuroTraceLibrary.SphereTrace(t, NO_PROFILE_KEY);
    }
  }
  static ShapeTrace(t, e, i, s) {
    i = FNameUtil_1.FNameUtil.GetDynamicFName(i);
    if (OPEN_PROFILE_TEST) {
      return UE.KuroTraceLibrary.ShapeTrace(t, e, i, s);
    } else {
      return UE.KuroTraceLibrary.ShapeTrace(t, e, i, NO_PROFILE_KEY);
    }
  }
  static AsyncLineTrace(t, e, i) {
    if (Time_1.Time.Frame !== this.DWl) {
      this.BWl = 0;
    } else {
      this.BWl++;
    }
    this.DWl = Time_1.Time.Frame;
    var s = new TraceHandle(this.DWl, this.BWl);
    if (OPEN_PROFILE_TEST) {
      UE.KuroTraceLibrary.AsyncLineTrace(t, e, i, this.DWl, this.BWl);
    } else {
      UE.KuroTraceLibrary.AsyncLineTrace(t, NO_PROFILE_KEY, i, this.DWl, this.BWl);
    }
    return s;
  }
  static AsyncBoxTrace(t, e, i) {
    if (Time_1.Time.Frame > this.qWl) {
      this.kWl = 0;
    } else {
      this.kWl++;
    }
    this.qWl = Time_1.Time.Frame;
    var s = new TraceHandle(this.qWl, this.kWl);
    if (OPEN_PROFILE_TEST) {
      UE.KuroTraceLibrary.AsyncBoxTrace(t, e, i, this.qWl, this.kWl);
    } else {
      UE.KuroTraceLibrary.AsyncBoxTrace(t, NO_PROFILE_KEY, i, this.qWl, this.kWl);
    }
    return s;
  }
  static AsyncCapsuleTrace(t, e, i) {
    if (Time_1.Time.Frame > this.GWl) {
      this.OWl = 0;
    } else {
      this.OWl++;
    }
    this.GWl = Time_1.Time.Frame;
    var s = new TraceHandle(this.GWl, this.OWl);
    if (OPEN_PROFILE_TEST) {
      UE.KuroTraceLibrary.AsyncCapsuleTrace(t, e, i, this.GWl, this.OWl);
    } else {
      UE.KuroTraceLibrary.AsyncCapsuleTrace(t, NO_PROFILE_KEY, i, this.GWl, this.OWl);
    }
    return s;
  }
  static AsyncSphereTrace(t, e, i) {
    if (Time_1.Time.Frame > this.FWl) {
      this.NWl = 0;
    } else {
      this.NWl++;
    }
    this.FWl = Time_1.Time.Frame;
    var s = new TraceHandle(this.FWl, this.NWl);
    if (OPEN_PROFILE_TEST) {
      UE.KuroTraceLibrary.AsyncSphereTrace(t, e, i, this.FWl, this.NWl);
    } else {
      UE.KuroTraceLibrary.AsyncSphereTrace(t, NO_PROFILE_KEY, i, this.FWl, this.NWl);
    }
    return s;
  }
  static SetStartLocation(t, e) {
    t.SetStartLocation(e.X, e.Y, e.Z);
  }
  static SetEndLocation(t, e) {
    t.SetEndLocation(e.X, e.Y, e.Z);
  }
  static SetTraceColor(t, e) {
    t.SetTraceColor(e.R, e.G, e.B, e.A);
  }
  static SetTraceHitColor(t, e) {
    t.SetTraceHitColor(e.R, e.G, e.B, e.A);
  }
  static SetBoxHalfSize(t, e) {
    t.SetBoxHalfSize(e.X, e.Y, e.Z);
  }
  static SetBoxOrientation(t, e) {
    t.SetBoxOrientation(e.Pitch, e.Yaw, e.Roll);
  }
  static GetHitLocation(t, e, i) {
    if (t && t.bBlockingHit) {
      i.X = t.LocationX_Array.Get(e);
      i.Y = t.LocationY_Array.Get(e);
      i.Z = t.LocationZ_Array.Get(e);
    }
  }
  static GetImpactPoint(t, e, i) {
    if (t.bBlockingHit) {
      i.X = t.ImpactPointX_Array.Get(e);
      i.Y = t.ImpactPointY_Array.Get(e);
      i.Z = t.ImpactPointZ_Array.Get(e);
    }
  }
  static GetImpactNormal(t, e, i) {
    if (t && t.bBlockingHit) {
      i.X = t.ImpactNormalX_Array.Get(e);
      i.Y = t.ImpactNormalY_Array.Get(e);
      i.Z = t.ImpactNormalZ_Array.Get(e);
    }
  }
  static IsHitOthers(i, s, E) {
    if (i.bBlockingHit) {
      var t = i.Actors.Num();
      for (let e = 0; e < t; ++e) {
        let t = i.Actors.Get(e);
        if (t) {
          while (t) {
            if (t !== s && t !== E) {
              t = t.GetAttachParentActor();
            }
          }
        }
        return true;
      }
    }
    return false;
  }
}
(exports.TraceElementCommon = TraceElementCommon).DWl = 0;
TraceElementCommon.BWl = 0;
TraceElementCommon.qWl = 0;
TraceElementCommon.kWl = 0;
TraceElementCommon.GWl = 0;
TraceElementCommon.OWl = 0;
TraceElementCommon.FWl = 0;
TraceElementCommon.NWl = 0; //# sourceMappingURL=TraceElementCommon.js.map