"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeCheck = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
class SRange {
  constructor() {
    this.Radius = -0;
    this.TargetPosition = undefined;
    this.RangeComponentShape = undefined;
    this.VecLB = Vector_1.Vector.Create(0, 0, 0);
    this.VecRB = Vector_1.Vector.Create(0, 0, 0);
    this.VecLF = Vector_1.Vector.Create(0, 0, 0);
    this.VecRF = Vector_1.Vector.Create(0, 0, 0);
    this.High = 0;
    this.Low = 0;
    this.CylinderRadius = 0;
    this.CylinderHeight = 0;
    this.VolumeKey = undefined;
    this.Radius = 0;
    this.TargetPosition = Vector_1.Vector.Create(0, 0, 0);
    this.RangeComponentShape = undefined;
  }
}
class RangeCheck {
  constructor() {
    this.RangeMap = undefined;
    this.PlayerPosition = undefined;
    this.RangeMap = new Map();
  }
  OnInit() {
    return true;
  }
  OnClear() {
    this.RangeMap.clear();
    return !(this.RangeMap = undefined);
  }
  GetOrAdd(e) {
    if (!this.RangeMap) {
      if (this.MakeRange(e)) {
        return this.RangeMap.get(e);
      } else {
        return undefined;
      }
    }
    if (!this.RangeMap.get(e) && !this.MakeRange(e)) {
      return;
    }
    return this.RangeMap.get(e);
  }
  MakeRange(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
    if (!t) {
      return false;
    }
    var r = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent");
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Controller", 72, `[RangeCheck] MakeRange 但是 entityPbId:${e}, 没有RangeComponent`);
      }
      return false;
    }
    var o = new SRange();
    o.RangeComponentShape = r.Shape;
    this.RangeMap ||= new Map();
    switch (r.Shape.Type) {
      case "Sphere":
        var i = r.Shape.Center;
        var a = t.Transform.Pos;
        o.TargetPosition = Vector_1.Vector.Create(a.X + (i?.X ?? 0), a.Y + (i?.Y ?? 0), a.Z + (i?.Z ?? 0));
        o.Radius = r.Shape.Radius;
        break;
      case "Box":
        var a = t.Transform.Pos;
        var i = t.Transform.Rot;
        var s = r.Shape.Center;
        var n = r.Shape.Size;
        var h = r.Shape.Rotator;
        var i = Rotator_1.Rotator.Create(i?.Y ?? 0 + (h?.Y ?? 0), i?.Z ?? 0 + (h?.Z ?? 0), i?.X ?? 0 + (h?.X ?? 0)).Quaternion();
        var h = Vector_1.Vector.Create(a.X + (s?.X ?? 0), a.Y + (s?.Y ?? 0), a.Z + (s?.Z ?? 0));
        var a = Transform_1.Transform.Create(i, h, Vector_1.Vector.OneVector);
        var s = Vector_1.Vector.Create();
        var i = Vector_1.Vector.Create(n.X, -n.Y, -n.Z);
        a.TransformPosition(i, s);
        o.VecLB.Set(s.X, s.Y, s.Z);
        i.Set(-n.X, -n.Y, -n.Z);
        a.TransformPosition(i, s);
        o.VecRB.Set(s.X, s.Y, s.Z);
        i.Set(n.X, n.Y, -n.Z);
        a.TransformPosition(i, s);
        o.VecLF.Set(s.X, s.Y, s.Z);
        i.Set(-n.X, n.Y, -n.Z);
        a.TransformPosition(i, s);
        o.VecRF.Set(s.X, s.Y, s.Z);
        i.Set(-n.X, n.Y, n.Z);
        a.TransformPosition(i, s);
        var h = s.Z;
        i.Set(-n.X, n.Y, -n.Z);
        a.TransformPosition(i, s);
        var n = s.Z;
        o.High = h;
        o.Low = n;
        break;
      case "Cylinder":
        a = r.Shape.Center;
        i = t.Transform.Pos;
        o.TargetPosition = Vector_1.Vector.Create(i.X + (a?.X ?? 0), i.Y + (a?.Y ?? 0), i.Z + (a?.Z ?? 0));
        o.CylinderRadius = r.Shape.Radius;
        o.CylinderHeight = r.Shape.Height;
        break;
      case "Volume":
        o.VolumeKey = r.Shape.VolumeKey;
    }
    this.RangeMap.set(e, o);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Controller", 45, "EntityRange创建成功", ["entityData", t]);
    }
    return true;
  }
  MapCheckReached() {
    const r = new Array();
    this.RangeMap?.forEach((e, t) => {
      if (this.CheckReached(t)) {
        r.push(t);
      }
    });
    return r;
  }
  CheckReached(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (!t || !e) {
      return false;
    }
    this.PlayerPosition = t.Entity.GetComponent(1)?.ActorLocationProxy;
    if (!this.PlayerPosition) {
      return false;
    }
    var r = this.RangeMap.get(e);
    if (!r) {
      return false;
    }
    let o = false;
    switch (r.RangeComponentShape.Type) {
      case "Sphere":
        if (r.TargetPosition) {
          o = Vector_1.Vector.Distance(this.PlayerPosition, r.TargetPosition) < r.Radius;
        }
        break;
      case "Box":
        o = this.WGo(r);
    }
    return o;
  }
  WGo(e) {
    var t;
    var r;
    var o;
    var i;
    return !!e && !!(t = this.PlayerPosition) && !(e.High < t.Z) && !(e.Low > t.Z) && (r = e.VecLB, o = e.VecRB, i = e.VecLF, e = e.VecRF, !!r && !!o && !!i && !!e) && this.KGo(t, r, o) * this.KGo(t, e, i) >= 0 && this.KGo(t, o, e) * this.KGo(t, i, r) >= 0;
  }
  KGo(e, t, r) {
    return (r.X - t.X) * (e.Y - t.Y) - (e.X - t.X) * (r.Y - t.Y);
  }
  Remove(e) {
    if (this.RangeMap && this.RangeMap.get(e)) {
      this.RangeMap.delete(e);
    }
  }
  MapCheckReachedPosition(r) {
    let o = undefined;
    this.RangeMap?.forEach((e, t) => {
      if (this.CheckReachedPosition(t, r)) {
        o = t;
      }
    });
    return o;
  }
  CheckReachedPosition(e, t) {
    if (!e) {
      return false;
    }
    var r;
    var o;
    var i;
    var a = this.RangeMap.get(e);
    if (!a) {
      return false;
    }
    let s = false;
    switch (a.RangeComponentShape.Type) {
      case "Sphere":
        if (a.TargetPosition) {
          s = Vector_1.Vector.Distance(t, a.TargetPosition) < a.Radius;
        }
        break;
      case "Box":
        s = this.Fka(a, t);
        break;
      case "Cylinder":
        if (!!a.TargetPosition && !(Vector_1.Vector.Dist2D(t, a.TargetPosition) > a.CylinderRadius)) {
          r = t.Z - a.TargetPosition.Z;
          s = r <= a.CylinderHeight / 2 && r >= -a.CylinderHeight / 2;
        }
        break;
      case "Volume":
        if (a.VolumeKey) {
          if (r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroTriggerVolumeManager.StaticClass())) {
            if (r = r.GetKuroTriggerVolume(FNameUtil_1.FNameUtil.GetDynamicFName(a.VolumeKey))) {
              if (o = ActorSystem_1.ActorSystem.Get(UE.TriggerSphere.StaticClass(), new UE.TransformDouble(t.ToUeVector()))) {
                i = (0, puerts_1.$ref)(undefined);
                r.GetOverlappingActors(i);
                if ((0, puerts_1.$unref)(i).FindIndex(o) !== -1) {
                  s = true;
                }
                ActorSystem_1.ActorSystem.Put("CheckReachedPosition Volume", o);
              }
            } else if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Controller", 72, `[RangeCheck] CheckReachedPosition Volume 但是${e}:${a.VolumeKey}不存在`);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Controller", 72, "[RangeCheck] CheckReachedPosition Volume 但是KuroTriggerVolumeManager无效");
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Controller", 72, `[RangeCheck] CheckReachedPosition Volume 但是 entityPbId:${e} 没有配置VolumeKey`);
        }
    }
    return s;
  }
  Fka(e, t) {
    var r;
    var o;
    var i;
    return !!e && !!t && !(e.High < t.Z) && !(e.Low > t.Z) && (r = e.VecLB, o = e.VecRB, i = e.VecLF, e = e.VecRF, !!r && !!o && !!i && !!e) && this.KGo(t, r, o) * this.KGo(t, e, i) >= 0 && this.KGo(t, o, e) * this.KGo(t, i, r) >= 0;
  }
}
exports.RangeCheck = RangeCheck;
//# sourceMappingURL=RangeCheck.js.map