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
class TsAnimNotifyStateCaughtBinding extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.CaughtIds = undefined;
    this.DetectionRadius = 500;
  }
  Constructor() {}
  K2_NotifyBegin(e, t, i) {
    var r;
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent.Entity) && (t = e.GetComponent(210)?.CreateAnimNotifyContent(t.GetName(), this.exportIndex), r = e.GetComponent(40), !!(e = e.GetComponent(52))) && (this.DetectionRadius > 0 && this.CheckPosition(e), e.SetCaughtBindingAnsInfo(t), e.BeginCaught(this.CaughtIds, r?.CurrentSkill?.SkillId ?? 0), true);
  }
  CheckPosition(i) {
    for (let e = 0; e < this.CaughtIds.Num(); e++) {
      var r = this.CaughtIds.Get(e);
      var o = i.Entity.GetComponent(3);
      var r = i.PendingCaughtList.get(r);
      if (!r) {
        return;
      }
      TsAnimNotifyStateCaughtBinding.InitTrace();
      var n = o?.ActorLocationProxy;
      var a = TsAnimNotifyStateCaughtBinding.SphereTrace;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(a, n);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(a, n);
      a.Radius = this.DetectionRadius;
      var s = TraceElementCommon_1.TraceElementCommon.SphereTrace(a, PROFILE_KEY);
      if (!s) {
        return;
      }
      let t = false;
      for (let e = 0; e < a.HitResult.GetHitCount(); e++) {
        if (a.HitResult?.Components.Get(e).GetCollisionProfileName()?.toString().includes(AIRWALL_PORFILENAME)) {
          t = true;
          break;
        }
      }
      if (!t) {
        return;
      }
      var c;
      var s = r[0].GetComponent(0);
      if (s?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
        s = Vector_1.Vector.Create(s?.GetInitLocation());
        n = Vector_1.Vector.Create(n);
        c = Vector_1.Vector.Create();
        s.Subtraction(n, c);
        c.Normalize();
        c.Multiply(this.DetectionRadius, c);
        s = Vector_1.Vector.Create(o?.ActorLocation).AdditionEqual(c);
        o?.SetActorLocation(s.ToUeVector(), "ExecutionAdjustMove", false);
        n = r[0].GetComponent(3);
        o = Vector_1.Vector.Create(n?.ActorLocation).AdditionEqual(c);
        r[0].GetComponent(3)?.SetActorLocation(o.ToUeVector(), "ExecutionAdjustMove", false);
      }
    }
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
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!e.CharacterActorComponent && !!(e = e.CharacterActorComponent.Entity) && !!(e = e.GetComponent(52)) && !(e.EndCaught(), 0);
  }
  GetNotifyName() {
    return "抓取绑定";
  }
}
TsAnimNotifyStateCaughtBinding.SphereTrace = undefined;
exports.default = TsAnimNotifyStateCaughtBinding; //# sourceMappingURL=TsAnimNotifyStateCaughtBinding.js.map