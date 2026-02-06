"use strict";

var CharacterMeshDitherDetectComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var r = arguments.length;
  var a = r < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, i, e, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (h = t[o]) {
        a = (r < 3 ? h(a) : r > 3 ? h(i, e, a) : h(i, e)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(i, e, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterMeshDitherDetectComponent = undefined;
const UE = require("ue");
const PriorityQueue_1 = require("../../../../../Core/Container/PriorityQueue");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const CameraUtility_1 = require("../../../../Camera/CameraUtility");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const MIN_DITHER = 0.01;
const MAX_VALUE = 9999999;
const COMPONENT_DISABLE_KEY = -1;
const PROFILE_KEY = "MeshDitherDetectTrace";
class MeshDitherDetectConfig {
  constructor(t, i) {
    this.Id = 0;
    this.MarkDelete = false;
    this.Priority = 0;
    this.BaseBoneName = CharacterNameDefines_1.CharacterNameDefines.BIP_001_SPINE;
    this.TargetBoneName = CharacterNameDefines_1.CharacterNameDefines.BIP_001_NECK;
    this.BasisBoneName = CharacterNameDefines_1.CharacterNameDefines.BIP_001_SPINE;
    this.CapsuleAdditionRadius = 0;
    this.CapsuleAdditionHeight = 0;
    this.CapsuleAdditionOffset = Vector_1.Vector.Create();
    this.CapsuleAdditionRotator = Rotator_1.Rotator.Create();
    this.EnableDebug = false;
    this.OverrideDitherConfig = false;
    this.StartHideDistance = 0;
    this.CompleteHideDistance = 0;
    this.StartDitherValue = 0;
    this.Id = i;
    this.Priority = t.Priority;
    this.BaseBoneName = t.TraceConfig.BaseBoneName;
    this.TargetBoneName = t.TraceConfig.TargetBoneName;
    this.BasisBoneName = t.TraceConfig.BasisBoneName;
    this.CapsuleAdditionRadius = t.TraceConfig.AdditionCapsuleSize.X;
    this.CapsuleAdditionHeight = t.TraceConfig.AdditionCapsuleSize.Y;
    this.CapsuleAdditionOffset.DeepCopy(t.TraceConfig.AdditionCapsuleOffset);
    this.CapsuleAdditionRotator.DeepCopy(t.TraceConfig.AdditionCapsuleRotator);
    this.EnableDebug = t.TraceConfig.Debug;
    this.OverrideDitherConfig = t.DitherConfig.OverrideDefaultDitherConfig;
    this.StartHideDistance = t.DitherConfig.StartHideDistance;
    this.CompleteHideDistance = t.DitherConfig.CompleteHideDistance;
    this.StartDitherValue = t.DitherConfig.StartDitherValue;
  }
}
let CharacterMeshDitherDetectComponent = CharacterMeshDitherDetectComponent_1 = class CharacterMeshDitherDetectComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.MeshDitherDetectConfig = undefined;
    this.BNg = 0;
    this.kNg = new Map();
    this.qNg = new PriorityQueue_1.PriorityQueue(CharacterMeshDitherDetectComponent_1.ONg);
    this.sDe = undefined;
    this.Hte = undefined;
    this.Gce = undefined;
    this.mWi = undefined;
    this.vsg = COMPONENT_DISABLE_KEY;
    this.GNg = false;
    this.FNg = MAX_VALUE;
    this.NNg = Quat_1.Quat.Create();
    this.VNg = Quat_1.Quat.Create();
    this.HNg = Quat_1.Quat.Create();
    this.jNg = Quat_1.Quat.Create();
    this.$Ng = Vector_1.Vector.Create();
    this.WNg = Vector_1.Vector.Create();
    this.Lz = Vector_1.Vector.Create();
    this.dHo = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.H1g = Rotator_1.Rotator.Create();
    this.EPn = Rotator_1.Rotator.Create();
    this.KJ = Quat_1.Quat.Create();
  }
  static get Dependencies() {
    return [3, 189];
  }
  get TraceCapsuleWidth() {
    return Math.max(0, (this.Hte?.Actor.CapsuleComponent?.GetScaledCapsuleRadius() ?? 0) + (this.MeshDitherDetectConfig?.CapsuleAdditionRadius ?? 0));
  }
  get TraceCapsuleHeight() {
    return Math.max(0, (this.Hte?.Actor.CapsuleComponent?.GetScaledCapsuleHalfHeight() ?? 0) + (this.MeshDitherDetectConfig?.CapsuleAdditionHeight ?? 0));
  }
  OnStart() {
    super.OnStart();
    this.Hte = this.Entity.GetComponent(3);
    this.Gce = this.Entity.GetComponent(189);
    this.sDe = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity);
    this.vsg = this.Disable("[Mesh虚化检测]组件默认禁用");
    return true;
  }
  EnableDetectDither(t) {
    t = new MeshDitherDetectConfig(t, ++this.BNg);
    this.qNg.Push(t);
    this.kNg.set(t.Id, t);
    this.QNg();
    return t.Id;
  }
  DisableDetectDither(t) {
    t = this.kNg.get(t);
    if (t) {
      t.MarkDelete = true;
      this.QNg();
    }
  }
  OnTick(t) {
    var i;
    if (this.Hte?.Valid) {
      if (this.GNg && (this.WYr(), this.KNg(), TraceElementCommon_1.TraceElementCommon.CapsuleTrace(this.mWi, PROFILE_KEY))) {
        i = this.mWi.HitResult;
        this.XNg(i);
        this.YNg();
      } else {
        this.JNg();
      }
    }
  }
  WYr() {
    if (!this.mWi) {
      this.mWi = new UE.TraceCapsuleElement();
      this.mWi.bIsSingle = false;
      this.mWi.bIgnoreSelf = true;
      this.mWi.WorldContextObject = this.Hte.Owner;
      this.mWi.ActorsToIgnore.Add(this.Hte.Actor);
      this.mWi.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
      this.mWi.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic);
      this.mWi.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Vehicle);
    }
  }
  KNg() {
    if (!this.Gce.IsStandardGravity) {
      Quat_1.Quat.FindBetween(Vector_1.Vector.UpVectorProxy, this.Gce.GravityUp, this.NNg);
      this.NNg.Inverse(this.VNg);
    }
    CameraUtility_1.CameraUtility.GetSocketLocation(undefined, this.MeshDitherDetectConfig.BasisBoneName, this.Lz, this.sDe);
    if (this.Gce.IsStandardGravity) {
      this.Hte.ActorQuatProxy.RotateVector(this.MeshDitherDetectConfig.CapsuleAdditionOffset, this.Tz);
      this.Lz.AdditionEqual(this.Tz);
    } else {
      this.VNg.Multiply(this.Hte.ActorQuatProxy, this.KJ);
      this.KJ.RotateVector(this.MeshDitherDetectConfig.CapsuleAdditionOffset, this.Tz);
      this.NNg.RotateVector(this.Tz, this.dHo);
      this.Lz.AdditionEqual(this.dHo);
    }
    this.$Ng.DeepCopy(this.Lz);
    this.WNg.DeepCopy(this.Lz);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, this.$Ng);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, this.WNg);
    CameraUtility_1.CameraUtility.GetSocketLocation(undefined, this.MeshDitherDetectConfig.BaseBoneName, this.Lz, this.sDe);
    CameraUtility_1.CameraUtility.GetSocketLocation(undefined, this.MeshDitherDetectConfig.TargetBoneName, this.dHo, this.sDe);
    this.dHo.SubtractionEqual(this.Lz);
    MathUtils_1.MathUtils.LookRotationUpFirst(this.Hte.ActorForwardProxy, this.dHo, this.Gue);
    if (this.Gce.IsStandardGravity) {
      Quat_1.Quat.FindBetween(Vector_1.Vector.UpVectorProxy, this.dHo, this.NNg);
      this.NNg.Inverse(this.VNg);
      GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Gue, this.VNg, this.H1g);
      this.H1g.AdditionEqual(this.MeshDitherDetectConfig.CapsuleAdditionRotator);
    } else {
      GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Gue, this.VNg, this.H1g);
      Quat_1.Quat.FindBetween(this.Gce.GravityUp, this.dHo, this.HNg);
      this.HNg.Inverse(this.jNg);
      GravityUtils_1.GravityUtils.GetRotatorInGravity(this.H1g, this.jNg, this.EPn);
      this.EPn.AdditionEqual(this.MeshDitherDetectConfig.CapsuleAdditionRotator);
      GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.HNg, this.H1g);
    }
    GravityUtils_1.GravityUtils.GetRotatorInNormal(this.H1g, this.NNg, this.Gue);
    TraceElementCommon_1.TraceElementCommon.SetCapsuleOrientation(this.mWi, this.Gue.Normalize(this.Gue));
    this.mWi.Radius = this.TraceCapsuleWidth;
    this.mWi.HalfHeight = this.TraceCapsuleHeight;
    if (Macro_1.NOT_SHIPPING_ENVIRONMENT && this.MeshDitherDetectConfig.EnableDebug) {
      UE.KismetSystemLibrary.D_DrawDebugCoordinateSystem(GlobalData_1.GlobalData.World, this.$Ng.ToUeVector(), this.Gue.ToUeRotator(), 64, 0, 4);
      this.mWi.SetDrawDebugTrace(1);
      this.mWi.DrawTime = 5;
    }
  }
  XNg(i) {
    var e = i.GetHitCount();
    this.FNg = MAX_VALUE;
    for (let t = 0; t < e; ++t) {
      if (i.Actors.Get(t)) {
        if (!i.Components?.Get(t)?.IsValid()) {
          return;
        }
        TraceElementCommon_1.TraceElementCommon.GetImpactPoint(i, t, this.Lz);
        var s = Vector_1.Vector.Dist(this.Lz, this.$Ng);
        if (!(s >= this.FNg)) {
          this.FNg = s;
        }
      }
    }
  }
  QNg() {
    var t = this.zNg();
    this.GNg = !!t;
    this.MeshDitherDetectConfig = t;
    if (this.GNg) {
      if (this.vsg !== COMPONENT_DISABLE_KEY) {
        this.Enable(this.vsg, "[Mesh虚化检测]开启组件Tick功能");
        this.vsg = COMPONENT_DISABLE_KEY;
      }
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(false);
    } else {
      if (this.vsg === COMPONENT_DISABLE_KEY) {
        this.vsg = this.Disable("[Mesh虚化检测]关闭组件Tick功能");
      }
      this.JNg();
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(true);
    }
  }
  zNg() {
    while (!this.qNg.Empty) {
      var t = this.qNg.Top;
      if (!t) {
        return;
      }
      if (!t.MarkDelete) {
        return t;
      }
      this.qNg.Pop();
      this.kNg.delete(t.Id);
    }
  }
  YNg() {
    var t = this.MeshDitherDetectConfig.OverrideDitherConfig ? MathUtils_1.MathUtils.RangeClamp(this.FNg, this.MeshDitherDetectConfig.CompleteHideDistance, this.MeshDitherDetectConfig.StartHideDistance, MIN_DITHER, this.MeshDitherDetectConfig.StartDitherValue) : MathUtils_1.MathUtils.RangeClamp(this.FNg, this.Hte.CompleteHideDistance, this.Hte.StartHideDistance, MIN_DITHER, this.Hte.StartDitherValue);
    this.Hte.Actor.SetDitherEffect(t, 1);
  }
  JNg() {
    this.Hte?.Actor.SetDitherEffect(1, 1);
  }
  ZNg() {
    this.MeshDitherDetectConfig = undefined;
    this.qNg.Clear();
    this.kNg.clear();
  }
  OnEnd() {
    super.OnEnd();
    this.ZNg();
    this.Hte = undefined;
    return !(this.Gce = undefined);
  }
};
CharacterMeshDitherDetectComponent.ONg = (t, i) => t.Priority === i.Priority ? -1 : i.Priority - t.Priority;
CharacterMeshDitherDetectComponent = CharacterMeshDitherDetectComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(346)], CharacterMeshDitherDetectComponent);
exports.CharacterMeshDitherDetectComponent = CharacterMeshDitherDetectComponent; //# sourceMappingURL=CharacterMeshDitherDetectComponent.js.map