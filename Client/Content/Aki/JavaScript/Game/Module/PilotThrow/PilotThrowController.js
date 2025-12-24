"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PilotThrowController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const TimeUtil_1 = require("../../Common/TimeUtil");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const GameSplineUtils_1 = require("../../LevelGamePlay/Common/GameSplineUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const PILOT_AUTO_THROW_SKILL_ID = 210043;
class PilotThrowController extends ControllerBase_1.ControllerBase {
  static EnterInteractHookPoint(t, e, o) {
    let r = true;
    ModelManager_1.ModelManager.PilotThrowModel.InitInteractInfo(t, e, o);
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)?.Entity;
    if (e) {
      o = e.GetComponent(88)?.GetHookInteractConfig();
      if (o) {
        var t = o.AutoThrowType;
        var i = o.TargetList;
        if (t && i.length === 1) {
          var i = Vector_1.Vector.Create(i[0].Position.X ?? 0, i[0].Position.Y ?? 0, i[0].Position.Z ?? 0);
          var e = Vector_1.Vector.Create(e.GetComponent(1)?.ActorLocationProxy);
          var l = o?.FlySpeed ?? ModelManager_1.ModelManager.PilotThrowModel.Setting.初速度;
          var a = o?.Gravity ?? ModelManager_1.ModelManager.PilotThrowModel.Setting.重力加速度;
          var t = this.Fxf(e, i, a, l, t);
          if (t) {
            ModelManager_1.ModelManager.PilotThrowModel.LaunchDirection.DeepCopy(t);
            ModelManager_1.ModelManager.PilotThrowModel.LaunchSpeed = l;
            ModelManager_1.ModelManager.PilotThrowModel.LaunchGravity = a;
            ModelManager_1.ModelManager.PilotThrowModel.NeedMotorRide = o.IsAutoRide ?? false;
            ModelManager_1.ModelManager.PilotThrowModel.DisableInterrupt = o.DisableInterrupt ?? false;
            t = Vector_1.Vector.Create();
            t.DeepCopy(i);
            t.SubtractionEqual(e);
            t.Normalize();
            ModelManager_1.ModelManager.PilotThrowModel.ForceLookDir = t;
            l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
            if (!l || !l.Entity) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("PilotThrow", 31, "PilotThrowController.EnterInteractHookPoint:当前编队实体为空");
              }
              return;
            }
            l.Entity.GetComponent(41).BeginSkillAsync(PILOT_AUTO_THROW_SKILL_ID);
            TimerSystem_1.TimerSystem.Delay(() => {
              this.RequestChangePilotState(true);
            }, ModelManager_1.ModelManager.PilotThrowModel.Setting.自动投掷转状态延迟 * TimeUtil_1.TimeUtil.InverseMillisecond);
            r = false;
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PilotThrow", 31, "[PilotThrowController] EnterInteractHookPoint CalculateLaunchAngle result is null");
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PilotThrow", 31, "[PilotThrowController] EnterInteractHookPoint hookPointConfig is null");
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PilotThrow", 31, "[PilotThrowController] EnterInteractHookPoint hookPointConfig is null");
    }
    if (r) {
      TimerSystem_1.TimerSystem.Delay(() => {
        UiManager_1.UiManager.OpenView("PilotThrowView");
      }, 1000);
    }
  }
  static GenerateProjectilePoints() {
    this.hsr ||= UE.NewArray(UE.VectorDouble);
    var t;
    var e;
    var o = ModelManager_1.ModelManager.PilotThrowModel.Setting;
    if (o) {
      if (e = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(ControllerHolder_1.ControllerHolder.CameraController.CameraLocation, this.hsr, o.样条特效.ToAssetPathName())) {
        if ((t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) && t.Entity) {
          this.usr = e.EffectHandle;
          this.csr = e.SplineActor;
          this.msr = e.SplineComp;
          this.dsr = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, o.终点特效.ToAssetPathName(), "[PilotThrowController] FinalDestinationEffectHandle", new EffectContext_1.EffectContext(t.Entity.Id));
          e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(ModelManager_1.ModelManager.PilotThrowModel.GetCurrentInteractHookPoint())?.Entity?.GetComponent(88)?.GetHookInteractConfig();
          ModelManager_1.ModelManager.PilotThrowModel.LaunchSpeed = e?.FlySpeed ?? o.初速度;
          ModelManager_1.ModelManager.PilotThrowModel.LaunchGravity = e?.Gravity ?? o.重力加速度;
          ModelManager_1.ModelManager.PilotThrowModel.NeedMotorRide = e?.IsAutoRide ?? false;
          ModelManager_1.ModelManager.PilotThrowModel.DisableInterrupt = e?.DisableInterrupt ?? false;
          this.ResumeTick();
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PilotThrow", 31, "[PilotThrowController] GenerateProjectilePoints currentEntity is null");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PilotThrow", 31, "[PilotThrowController] GenerateProjectilePoints projectileSpine is null");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PilotThrow", 31, "[PilotThrowController] GenerateProjectilePoints setting is null");
    }
  }
  static ClearProjectilePoints() {
    if (this.usr && EffectSystem_1.EffectSystem.IsValid(this.usr)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.usr, "[PortalController] ClearProjectilePoints", true);
      this.usr = undefined;
    }
    if (this.dsr && EffectSystem_1.EffectSystem.IsValid(this.dsr)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.dsr, "[PortalController] ClearProjectilePoints", true);
      this.dsr = undefined;
    }
    if (this.csr && this.csr.IsValid()) {
      ActorSystem_1.ActorSystem.Put("PilotThrowController.ClearProjectilePoints", this.csr);
      this.csr = undefined;
      this.msr = undefined;
    }
    this.PauseTick();
  }
  static psr() {
    if (this.msr) {
      var t = ModelManager_1.ModelManager.PilotThrowModel.Setting;
      if (t) {
        var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        if (e && e.Entity) {
          e = e.Entity.GetComponent(3);
          if (e && e.Owner && e.Owner.IsValid()) {
            var o = ModelManager_1.ModelManager.PilotThrowModel.GetCurrentInteractHookPoint();
            var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o)?.Entity?.GetComponent(88)?.GetHookInteractConfig();
            if (o) {
              var r = o.Gravity ?? t.重力加速度;
              var o = o.FlySpeed ?? t.初速度;
              var i = Vector_1.Vector.Create(e.ActorLocationProxy);
              var l = Vector_1.Vector.Create();
              l.FromUeVector(e.ActorTransform.TransformVector(t.抛物线起点偏移));
              i.AdditionEqual(l);
              this.kWm.Set(0, 0, 0);
              this.qWm.DeepCopy(ControllerHolder_1.ControllerHolder.CameraController.CameraRotator);
              this.OWm ||= Rotator_1.Rotator.Create(t.初速度仰角, 0, 0);
              MathUtils_1.MathUtils.ComposeRotator(this.OWm, this.qWm, MathUtils_1.MathUtils.CommonTempRotator);
              MathUtils_1.MathUtils.CommonTempRotator.Vector(this.kWm);
              this.kWm.Normalize();
              ModelManager_1.ModelManager.PilotThrowModel.LaunchDirection.DeepCopy(this.kWm);
              this.kWm.MultiplyEqual(o);
              if (!this.GWm) {
                this.GWm = UE.NewArray(UE.BuiltinByte);
                this.GWm.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
                this.GWm.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible);
                this.GWm.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
              }
              this.FWm ||= new UE.PredictProjectilePathParams();
              var l = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, i.ToUeVector());
              this.FWm.StartLocation = l;
              this.FWm.LaunchVelocity = this.kWm.ToUeVectorOld();
              this.FWm.bTraceWithCollision = true;
              this.FWm.ProjectileRadius = t.射线检测半径;
              this.FWm.ObjectTypes = this.GWm;
              this.FWm.bTraceComplex = false;
              this.FWm.DrawDebugType = t.DebugMode ? 2 : 0;
              this.FWm.DrawDebugTime = 0.1;
              this.FWm.MaxSimTime = 40;
              this.FWm.SimFrequency = 3;
              this.FWm.OverrideGravityZ = r;
              var o = UE.NewArray(UE.Actor);
              o.Add(e.Owner);
              this.FWm.ActorsToIgnore = o;
              this.NWm ||= (0, puerts_1.$ref)(new UE.PredictProjectilePathResult());
              var r = UE.GameplayStatics.Blueprint_PredictProjectilePath_Advanced(GlobalData_1.GlobalData.World, this.FWm, this.NWm);
              var a = (0, puerts_1.$unref)(this.NWm).PathData;
              if (this.hsr) {
                this.hsr.Empty();
              } else {
                this.hsr = UE.NewArray(UE.VectorDouble);
              }
              var n = new UE.VectorDouble(l);
              for (let e = 0; e < a.Num(); e++) {
                let t = new UE.VectorDouble(a.Get(e).Location);
                t = t.op_Subtraction(n);
                this.hsr.Add(t);
              }
              this.msr.D_SetSplinePoints(this.hsr, 0, true);
              this.csr.D_K2_SetActorLocation(i.ToUeVector(), false, undefined, true);
              MathUtils_1.MathUtils.CommonTempVector.FromUeVector(this.hsr.Get(this.hsr.Num() - 1));
              MathUtils_1.MathUtils.CommonTempVector.AdditionEqual(i);
              ModelManager_1.ModelManager.PilotThrowModel.ProjectileSplineLastPoint.DeepCopy(MathUtils_1.MathUtils.CommonTempVector);
              if (r) {
                if (this.dsr && EffectSystem_1.EffectSystem.IsValid(this.dsr)) {
                  EffectSystem_1.EffectSystem.GetEffectActor(this.dsr)?.D_K2_SetActorLocation(MathUtils_1.MathUtils.CommonTempVector.ToUeVector(), false, undefined, true);
                } else {
                  e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
                  this.dsr = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, t.终点特效.ToAssetPathName(), "[PilotThrowController] FinalDestinationEffectHandle", new EffectContext_1.EffectContext(e.Entity.Id));
                }
              } else if (this.dsr && EffectSystem_1.EffectSystem.IsValid(this.dsr)) {
                EffectSystem_1.EffectSystem.StopEffectById(this.dsr, "[PortalController] ClearProjectilePoints", true);
                this.dsr = undefined;
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("PilotThrow", 31, "[PilotThrowController] UpdateProjectileSpline hookPointConfig is null");
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PilotThrow", 31, "[PilotThrowController] UpdateProjectileSpline actorComp is null");
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PilotThrow", 31, "[PilotThrowController] UpdateProjectileSpline curEntity is null");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PilotThrow", 31, "[PilotThrowController] UpdateProjectileSpline setting is null");
      }
    }
  }
  static OnTick(t) {
    this.psr();
  }
  static OnInit() {
    this.PauseTick();
    return true;
  }
  static Fxf(t, e, o, r, i) {
    var l;
    var a;
    var n = Vector_1.Vector.Create();
    n.DeepCopy(e);
    n.SubtractionEqual(t);
    var e = Math.sqrt(n.X * n.X + n.Y * n.Y);
    var t = n.Z;
    if (e < 0.001) {
      if (t > 0 && r * r >= Math.abs(o) * 2 * t) {
        return Vector_1.Vector.Create(0, 0, 1);
      } else {
        return undefined;
      }
    } else {
      e = e;
      t = t;
      l = (a = r * r) * a - (o = Math.abs(o)) * (o * e * e + a * 2 * t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PilotThrow", 31, `[PilotThrowController] CalculateLaunchAngle Debug - v0=${r}, g=${o}, d=${e}, h=${t}`, ["v0Sq", a], ["g*d²", o * e * e], ["2*v0²*h", a * 2 * t], ["discriminant", l]);
      }
      if (l < 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PilotThrow", 31, "[PilotThrowController] CalculateLaunchAngle 初速度不足或参数设置错误", ["距离", e], ["高度差", t], ["初速度", r], ["重力", o]);
        }
        return;
      } else {
        r = (a + (t = Math.sqrt(l))) / (o * e);
        l = (a - t) / (o * e);
        a = (i === IComponent_1.EPilotThrowAutoThrowType.HighAngle ? Math.max : Math.min)(Math.abs(r), Math.abs(l)) === Math.abs(r) ? r : l;
        t = Math.atan(a);
        o = Math.atan2(n.Y, n.X);
        e = Rotator_1.Rotator.Create(t, o, 0);
        i = Vector_1.Vector.Create();
        e.Vector(i);
        (r = Vector_1.Vector.Create()).X = Math.cos(t) * Math.cos(o);
        r.Y = Math.cos(t) * Math.sin(o);
        r.Z = Math.sin(t);
        r.Normalize();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PilotThrow", 31, "[PilotThrowController] CalculateLaunchAngle Debug", ["direction", r], ["dir", i]);
        }
        return r;
      }
    }
  }
  static RequestChangePilotState(t) {
    var e = Protocol_1.Aki.Protocol.jzm.create();
    e.nKn = t ? Protocol_1.Aki.Protocol.Wzm.Proto_PTOThrow : Protocol_1.Aki.Protocol.Wzm.Proto_PTOCancel;
    Net_1.Net.Call(28549, e, () => {});
  }
}
(exports.PilotThrowController = PilotThrowController).hsr = undefined;
PilotThrowController.usr = undefined;
PilotThrowController.csr = undefined;
PilotThrowController.msr = undefined;
PilotThrowController.dsr = undefined;
PilotThrowController.GWm = undefined;
PilotThrowController.FWm = undefined;
PilotThrowController.NWm = undefined;
PilotThrowController.kWm = Vector_1.Vector.Create();
PilotThrowController.qWm = Rotator_1.Rotator.Create();
PilotThrowController.OWm = undefined; //# sourceMappingURL=PilotThrowController.js.map