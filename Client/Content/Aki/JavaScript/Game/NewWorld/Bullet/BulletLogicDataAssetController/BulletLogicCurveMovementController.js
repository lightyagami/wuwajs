"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicCurveMovementController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const BulletController_1 = require("../BulletController");
const BulletUtil_1 = require("../BulletUtil");
const BulletLogicController_1 = require("./BulletLogicController");
const PROFILE_KEY = "BulletLogicCurveMovementController_GetDestLocation";
const HEIGHT_DETECT = 500;
const DRAW_DURATION = 5;
class BulletLogicCurveMovementController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e);
    this.zie = undefined;
    this.r1t = -0;
    this.uoe = undefined;
    this._7o = 0;
    this.u7o = 1;
    this.Hte = this.Bullet.GetComponent(178);
    this.a7o = this.Bullet.GetBulletInfo();
  }
  OnInit() {
    ResourceSystem_1.ResourceSystem.LoadAsync(this.LogicController.SplineTrace.ToAssetPathName(), UE.Class, t => {
      this.c7o(t);
    });
    this.a7o.BulletDataMain.Execution.MovementReplaced = true;
  }
  OnBulletDestroy() {
    if (this.zie) {
      ActorSystem_1.ActorSystem.Put("BulletLogicCurveMovementController.OnBulletDestroy", this.zie.GetOwner());
      this.zie = undefined;
    }
  }
  c7o(t) {
    var e;
    var i;
    if (this.Bullet?.Valid && this.LogicController.SplineTrace) {
      i = (e = this.m7o()) ? UE.KismetMathLibrary.D_FindLookAtRotation(this.Hte.ActorLocation, e) : undefined;
      i = UE.KismetMathLibrary.MakeTransformDouble(this.Hte.ActorLocation, e ? i : this.Hte.ActorRotation, Vector_1.Vector.OneVector);
      t = ActorSystem_1.ActorSystem.Get(t, i);
      if (ObjectUtils_1.ObjectUtils.IsValid(t)) {
        if (t.IsA(UE.BP_BasePathLineBullet_C.StaticClass())) {
          this.zie = t.Spline;
          i = this.zie.GetNumberOfSplinePoints();
          t = this.zie.D_GetLocationAtSplinePoint(i - 1, 1);
          i = this.zie.D_GetLocationAtSplinePoint(0, 1);
          i = UE.VectorDouble.DistSquared(i, t);
          t = e ? UE.VectorDouble.DistSquared(this.Hte.ActorLocation, e) : this.zie.GetSplineLength();
          if (e) {
            this.u7o = Math.sqrt(t / i);
            this.zie.GetOwner().D_SetActorScale3D(Vector_1.Vector.OneVectorDouble.op_Multiply(this.u7o));
          }
          this.r1t = this.d7o();
          this.zie.Duration = this.r1t;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 20, "加载的Spline不是BP_BasePathLineBullet_C类型");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 20, "加载的Spline为空");
      }
    }
  }
  BulletLogicAction(t) {
    var e;
    var i;
    if (this.zie && (e = this._7o, this.a7o.NeedDestroy || (i = this.zie.D_GetLocationAtTime(e, 1, true), this.Hte.SetActorLocation(i), this.LogicController.IsForwardTangent && (i = this.zie.GetRotationAtTime(e, 1, true), this.Hte.SetActorRotation(i)), this._7o += t * this.Hte.TimeDilation), e >= this.r1t) && (ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(this.LogicController.EffectOnReach) && (i = this.Hte.Owner, t = EffectSystem_1.EffectSystem.SpawnEffect(i, i.D_GetTransform(), this.LogicController.EffectOnReach.ToAssetPathName(), "[BulletLogicCurveMovementController.BulletLogicAction]", new EffectContext_1.EffectContext(this.a7o.Attacker ? this.a7o.Attacker.Id : undefined)), EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, t, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation)), this.LogicController.IsDestroyReach)) {
      BulletController_1.BulletController.DestroyBullet(this.Bullet.Id, this.LogicController.IsSummonOnReach);
    }
  }
  koe() {
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.WorldContextObject = GlobalData_1.GlobalData.World;
    this.uoe.bIsSingle = true;
    this.uoe.bIgnoreSelf = true;
    this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    this.uoe.DrawTime = DRAW_DURATION;
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.uoe, ColorUtils_1.ColorUtils.LinearGreen);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.uoe, ColorUtils_1.ColorUtils.LinearRed);
  }
  m7o() {
    var t = this.a7o.Target?.Valid ? this.a7o.TargetActorComp : undefined;
    if (this.LogicController.UseTargetLocation) {
      return BulletUtil_1.BulletUtil.GetTargetLocation(t, FNameUtil_1.FNameUtil.NONE, this.a7o);
    }
    if (!this.uoe) {
      this.koe();
    }
    var e = t?.Valid;
    var i = (0, puerts_1.$ref)(undefined);
    UE.BPL_Fight_C.获取Actor周围坐标点((e ? t : this.a7o.AttackerActorComp).Owner, e ? this.LogicController.Rotate : this.LogicController.SelfRotate, 0, e ? this.LogicController.Length : this.LogicController.SelfLength, this.Hte.Owner, i);
    var t = (0, puerts_1.$unref)(i);
    t.Z += e ? this.LogicController.Height : this.LogicController.SelfHeight;
    this.uoe.SetStartLocation(t.X, t.Y, t.Z + HEIGHT_DETECT);
    this.uoe.SetEndLocation(t.X, t.Y, t.Z - HEIGHT_DETECT);
    var i = t;
    var t = TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY);
    var s = this.uoe.HitResult;
    if (t && s.bBlockingHit) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(s, 0, i);
      i.Z += e ? this.LogicController.Height : this.LogicController.SelfHeight;
    }
    return i;
  }
  d7o() {
    var t = this.LogicController.Duration;
    var e = this.LogicController.MaxSpeed;
    var i = this.LogicController.MinSpeed;
    var s = this.zie.GetSplineLength() * this.u7o;
    var i = i > 0 ? s / i : MathUtils_1.MathUtils.MaxFloat;
    var s = e > 0 ? s / e : 0;
    return MathUtils_1.MathUtils.Clamp(t, s, i) * TimeUtil_1.TimeUtil.InverseMillisecond;
  }
}
exports.BulletLogicCurveMovementController = BulletLogicCurveMovementController;
//# sourceMappingURL=BulletLogicCurveMovementController.js.map