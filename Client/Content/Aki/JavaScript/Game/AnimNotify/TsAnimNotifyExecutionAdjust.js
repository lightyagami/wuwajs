"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GlobalData_1 = require("../GlobalData");
const PROFILE_KEY = "FightCameraLogicComponent_CheckCollision_ExecutionAdjust";
const AIRWALL_PORFILENAME = "InvisibleWall";
class TsAnimNotifyExecutionAdjust extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.DetectionRadius = 100;
    this.CaughtId = "";
  }
  Constructor() {}
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var o = e.CharacterActorComponent.Entity.GetComponent(53);
      if (o) {
        o = o.PendingCaughtList.get(this.CaughtId);
        if (o) {
          TsAnimNotifyExecutionAdjust.InitTrace();
          var r = e.CharacterActorComponent?.ActorLocationProxy;
          var i = TsAnimNotifyExecutionAdjust.SphereTrace;
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, r);
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, r);
          i.Radius = this.DetectionRadius;
          var s = TraceElementCommon_1.TraceElementCommon.SphereTrace(i, PROFILE_KEY);
          if (s) {
            let t = false;
            var n;
            var a = i.HitResult.ItemArray;
            for (let e = 0; e < i.HitResult.GetHitCount(); e++) {
              var c = a.Get(e);
              if (UE.KuroCollisionLibrary.GetCollisionProfileName(i.HitResult?.Components.Get(e), c)?.toString().includes(AIRWALL_PORFILENAME)) {
                t = true;
                break;
              }
            }
            if (t && (s = o[0].GetComponent(0))?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
              s = Vector_1.Vector.Create(s?.GetInitLocation());
              r = Vector_1.Vector.Create(r);
              n = Vector_1.Vector.Create();
              s.Subtraction(r, n);
              n.Normalize();
              n.Multiply(this.DetectionRadius, n);
              s = Vector_1.Vector.Create(e.CharacterActorComponent?.ActorLocation).AdditionEqual(n);
              e.CharacterActorComponent?.SetActorLocation(s.ToUeVector(), "ExecutionAdjustMove", false);
              r = o[0].GetComponent(3);
              e = Vector_1.Vector.Create(r?.ActorLocation).AdditionEqual(n);
              o[0].GetComponent(3)?.SetActorLocation(e.ToUeVector(), "ExecutionAdjustMove", false);
            }
          }
        }
      }
    }
    return true;
  }
  static InitTrace() {
    this.SphereTrace = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.SphereTrace.bIsSingle = false;
    this.SphereTrace.bIgnoreSelf = true;
    this.SphereTrace.bTraceComplex = true;
    this.SphereTrace.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    this.SphereTrace.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
    this.SphereTrace.WorldContextObject = GlobalData_1.GlobalData.World;
  }
  GetNotifyName() {
    return "处决调整位置";
  }
}
TsAnimNotifyExecutionAdjust.SphereTrace = undefined;
exports.default = TsAnimNotifyExecutionAdjust; //# sourceMappingURL=TsAnimNotifyExecutionAdjust.js.map