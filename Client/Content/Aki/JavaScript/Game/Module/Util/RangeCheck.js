"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RangeCheck = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager");
class SRange {
  constructor() {
    this.Radius = -0, this.TargetPosition = void 0, this.RangeComponentShape = void 0, this.VecLB = Vector_1.Vector.Create(0, 0, 0), this.VecRB = Vector_1.Vector.Create(0, 0, 0), this.VecLF = Vector_1.Vector.Create(0, 0, 0), this.VecRF = Vector_1.Vector.Create(0, 0, 0), this.High = 0, this.Low = 0, this.CylinderRadius = 0, this.CylinderHeight = 0, this.VolumeKey = void 0, this.Radius = 0, this.TargetPosition = Vector_1.Vector.Create(0, 0, 0), this.RangeComponentShape = void 0
  }
}
class RangeCheck {
  constructor() {
    this.RangeMap = void 0, this.PlayerPosition = void 0, this.RangeMap = new Map
  }
  OnInit() {
    return !0
  }
  OnClear() {
    return this.RangeMap.clear(), !(this.RangeMap = void 0)
  }
  GetOrAdd(e) {
    if (!this.RangeMap) return this.MakeRange(e) ? this.RangeMap.get(e) : void 0;
    if (!this.RangeMap.get(e) && !this.MakeRange(e)) return;
    return this.RangeMap.get(e)
  }
  MakeRange(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
    if (!t) return !1;
    var r = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent");
    if (!r) return Log_1.Log.CheckError() && Log_1.Log.Error("Controller", 72, `[RangeCheck] MakeRange 但是 entityPbId:${e}, 没有RangeComponent`), !1;
    var o = new SRange;
    switch (o.RangeComponentShape = r.Shape, this.RangeMap || (this.RangeMap = new Map), r.Shape.Type) {
      case "Sphere":
        var i = r.Shape.Center,
          a = t.Transform.Pos;
        o.TargetPosition = Vector_1.Vector.Create(a.X + (i?.X ?? 0), a.Y + (i?.Y ?? 0), a.Z + (i?.Z ?? 0)), o.Radius = r.Shape.Radius;
        break;
      case "Box":
        var a = t.Transform.Pos,
          i = t.Transform.Rot,
          s = r.Shape.Center,
          n = r.Shape.Size,
          h = r.Shape.Rotator,
          i = Rotator_1.Rotator.Create(i?.Y ?? 0 + (h?.Y ?? 0), i?.Z ?? 0 + (h?.Z ?? 0), i?.X ?? 0 + (h?.X ?? 0)).Quaternion(),
          h = Vector_1.Vector.Create(a.X + (s?.X ?? 0), a.Y + (s?.Y ?? 0), a.Z + (s?.Z ?? 0)),
          a = Transform_1.Transform.Create(i, h, Vector_1.Vector.OneVector),
          s = Vector_1.Vector.Create(),
          i = Vector_1.Vector.Create(n.X, -n.Y, -n.Z),
          h = (a.TransformPosition(i, s), o.VecLB.Set(s.X, s.Y, s.Z), i.Set(-n.X, -n.Y, -n.Z), a.TransformPosition(i, s), o.VecRB.Set(s.X, s.Y, s.Z), i.Set(n.X, n.Y, -n.Z), a.TransformPosition(i, s), o.VecLF.Set(s.X, s.Y, s.Z), i.Set(-n.X, n.Y, -n.Z), a.TransformPosition(i, s), o.VecRF.Set(s.X, s.Y, s.Z), i.Set(-n.X, n.Y, n.Z), a.TransformPosition(i, s), s.Z),
          n = (i.Set(-n.X, n.Y, -n.Z), a.TransformPosition(i, s), s.Z);
        o.High = h, o.Low = n;
        break;
      case "Cylinder":
        a = r.Shape.Center, i = t.Transform.Pos;
        o.TargetPosition = Vector_1.Vector.Create(i.X + (a?.X ?? 0), i.Y + (a?.Y ?? 0), i.Z + (a?.Z ?? 0)), o.CylinderRadius = r.Shape.Radius, o.CylinderHeight = r.Shape.Height;
        break;
      case "Volume":
        o.VolumeKey = r.Shape.VolumeKey
    }
    return this.RangeMap.set(e, o), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Controller", 45, "EntityRange创建成功", ["entityData", t]), !0
  }
  MapCheckReached() {
    const r = new Array;
    return this.RangeMap?.forEach((e, t) => {
      this.CheckReached(t) && r.push(t)
    }), r
  }
  CheckReached(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (!t || !e) return !1;
    if (this.PlayerPosition = t.Entity.GetComponent(1)?.ActorLocationProxy, !this.PlayerPosition) return !1;
    var r = this.RangeMap.get(e);
    if (!r) return !1;
    let o = !1;
    switch (r.RangeComponentShape.Type) {
      case "Sphere":
        r.TargetPosition && (o = Vector_1.Vector.Distance(this.PlayerPosition, r.TargetPosition) < r.Radius);
        break;
      case "Box":
        o = this.WGo(r)
    }
    return o
  }
  WGo(e) {
    var t, r, o, i;
    return !!e && !!(t = this.PlayerPosition) && !(e.High < t.Z || e.Low > t.Z) && (r = e.VecLB, o = e.VecRB, i = e.VecLF, e = e.VecRF, !!(r && o && i && e)) && 0 <= this.KGo(t, r, o) * this.KGo(t, e, i) && 0 <= this.KGo(t, o, e) * this.KGo(t, i, r)
  }
  KGo(e, t, r) {
    return (r.X - t.X) * (e.Y - t.Y) - (e.X - t.X) * (r.Y - t.Y)
  }
  Remove(e) {
    this.RangeMap && this.RangeMap.get(e) && this.RangeMap.delete(e)
  }
  MapCheckReachedPosition(r) {
    let o = void 0;
    return this.RangeMap?.forEach((e, t) => {
      this.CheckReachedPosition(t, r) && (o = t)
    }), o
  }
  CheckReachedPosition(e, t) {
    if (!e) return !1;
    var r, o, i, a = this.RangeMap.get(e);
    if (!a) return !1;
    let s = !1;
    switch (a.RangeComponentShape.Type) {
      case "Sphere":
        a.TargetPosition && (s = Vector_1.Vector.Distance(t, a.TargetPosition) < a.Radius);
        break;
      case "Box":
        s = this.Fka(a, t);
        break;
      case "Cylinder":
        !a.TargetPosition || Vector_1.Vector.Dist2D(t, a.TargetPosition) > a.CylinderRadius || (r = t.Z - a.TargetPosition.Z, s = r <= a.CylinderHeight / 2 && r >= -a.CylinderHeight / 2);
        break;
      case "Volume":
        a.VolumeKey ? (r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroTriggerVolumeManager.StaticClass())) ? (r = r.GetKuroTriggerVolume(FNameUtil_1.FNameUtil.GetDynamicFName(a.VolumeKey))) ? (o = ActorSystem_1.ActorSystem.Get(UE.TriggerSphere.StaticClass(), new UE.TransformDouble(t.ToUeVector()))) && (i = (0, puerts_1.$ref)(void 0), r.GetOverlappingActors(i), -1 !== (0, puerts_1.$unref)(i).FindIndex(o) && (s = !0), ActorSystem_1.ActorSystem.Put("CheckReachedPosition Volume", o)) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Controller", 72, `[RangeCheck] CheckReachedPosition Volume 但是${e}:${a.VolumeKey}不存在`) : Log_1.Log.CheckError() && Log_1.Log.Error("Controller", 72, "[RangeCheck] CheckReachedPosition Volume 但是KuroTriggerVolumeManager无效") : Log_1.Log.CheckError() && Log_1.Log.Error("Controller", 72, `[RangeCheck] CheckReachedPosition Volume 但是 entityPbId:${e} 没有配置VolumeKey`)
    }
    return s
  }
  Fka(e, t) {
    var r, o, i;
    return !!e && !!t && !(e.High < t.Z || e.Low > t.Z) && (r = e.VecLB, o = e.VecRB, i = e.VecLF, e = e.VecRF, !!(r && o && i && e)) && 0 <= this.KGo(t, r, o) * this.KGo(t, e, i) && 0 <= this.KGo(t, o, e) * this.KGo(t, i, r)
  }
}
exports.RangeCheck = RangeCheck;
//# sourceMappingURL=RangeCheck.js.map