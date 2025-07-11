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
      var o = e.CharacterActorComponent.Entity.GetComponent(52);
      if (o) {
        o = o.PendingCaughtList.get(this.CaughtId);
        if (o) {
          TsAnimNotifyExecutionAdjust.InitTrace();
          var i;
          var r = e.CharacterActorComponent?.ActorLocationProxy;
          var s = TsAnimNotifyExecutionAdjust.SphereTrace;
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, r);
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, r);
          s.Radius = this.DetectionRadius;
          var n = TraceElementCommon_1.TraceElementCommon.SphereTrace(s, PROFILE_KEY);
          if (n) {
            let t = false;
            for (let e = 0; e < s.HitResult.GetHitCount(); e++) {
              if (s.HitResult?.Components.Get(e).GetCollisionProfileName()?.toString().includes(AIRWALL_PORFILENAME)) {
                t = true;
                break;
              }
            }
            if (t && (n = o[0].GetComponent(0))?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
              n = Vector_1.Vector.Create(n?.GetInitLocation());
              r = Vector_1.Vector.Create(r);
              i = Vector_1.Vector.Create();
              n.Subtraction(r, i);
              i.Normalize();
              i.Multiply(this.DetectionRadius, i);
              n = Vector_1.Vector.Create(e.CharacterActorComponent?.ActorLocation).AdditionEqual(i);
              e.CharacterActorComponent?.SetActorLocation(n.ToUeVector(), "ExecutionAdjustMove", false);
              r = o[0].GetComponent(3);
              e = Vector_1.Vector.Create(r?.ActorLocation).AdditionEqual(i);
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