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
  K2_NotifyBegin(e, t, r) {
    var i;
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent.Entity) && (t = e.GetComponent(220)?.CreateAnimNotifyContent(t.GetName(), this.exportIndex), i = e.GetComponent(41), !!(e = e.GetComponent(53))) && (this.DetectionRadius > 0 && this.CheckPosition(e), e.SetCaughtBindingAnsInfo(t), e.BeginCaught(this.CaughtIds, i?.CurrentSkill?.SkillId ?? 0), true);
  }
  CheckPosition(r) {
    for (let e = 0; e < this.CaughtIds.Num(); e++) {
      var i = this.CaughtIds.Get(e);
      var o = r.Entity.GetComponent(3);
      var i = r.PendingCaughtList.get(i);
      if (!i) {
        return;
      }
      TsAnimNotifyStateCaughtBinding.InitTrace();
      var a = o?.ActorLocationProxy;
      var n = TsAnimNotifyStateCaughtBinding.SphereTrace;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, a);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, a);
      n.Radius = this.DetectionRadius;
      var s = TraceElementCommon_1.TraceElementCommon.SphereTrace(n, PROFILE_KEY);
      if (!s) {
        return;
      }
      let t = false;
      var c = n.HitResult.ItemArray;
      for (let e = 0; e < n.HitResult.GetHitCount(); e++) {
        var u = c.Get(e);
        if (UE.KuroCollisionLibrary.GetCollisionProfileName(n.HitResult?.Components.Get(e), u)?.toString().includes(AIRWALL_PORFILENAME)) {
          t = true;
          break;
        }
      }
      if (!t) {
        return;
      }
      var h;
      var s = i[0].GetComponent(0);
      if (s?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
        s = Vector_1.Vector.Create(s?.GetInitLocation());
        a = Vector_1.Vector.Create(a);
        h = Vector_1.Vector.Create();
        s.Subtraction(a, h);
        h.Normalize();
        h.Multiply(this.DetectionRadius, h);
        s = Vector_1.Vector.Create(o?.ActorLocation).AdditionEqual(h);
        o?.SetActorLocation(s.ToUeVector(), "ExecutionAdjustMove", false);
        a = i[0].GetComponent(3);
        o = Vector_1.Vector.Create(a?.ActorLocation).AdditionEqual(h);
        i[0].GetComponent(3)?.SetActorLocation(o.ToUeVector(), "ExecutionAdjustMove", false);
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
    return e instanceof TsBaseCharacter_1.default && !!e.CharacterActorComponent && !!(e = e.CharacterActorComponent.Entity) && !!(e = e.GetComponent(53)) && !(e.EndCaught(), 0);
  }
  GetNotifyName() {
    return "抓取绑定";
  }
}
TsAnimNotifyStateCaughtBinding.SphereTrace = undefined;
exports.default = TsAnimNotifyStateCaughtBinding; //# sourceMappingURL=TsAnimNotifyStateCaughtBinding.js.map