"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneObjectAirWallEffect = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const RefCompAirWallController_1 = require("../../../NewWorld/SceneItem/RefCompController/RefCompAirWallController");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const EffectGlobal_1 = require("../../Effect/EffectGlobal");
const PROFILE_KEY = "SceneObjectAirWallEffect_Update";
const RADIUS = 1;
class SceneObjectAirWallEffect {
  constructor() {
    this.ActorToAttach = undefined;
    this.IsReady = false;
    this.IsEnabled = false;
    this.BKs = Vector_1.Vector.Create();
    this.wKs = Vector_1.Vector.Create();
    this.bsr = undefined;
  }
  koe() {
    var e = UE.NewObject(UE.TraceSphereElement.StaticClass());
    e.WorldContextObject = GlobalData_1.GlobalData.World;
    e.bIsSingle = false;
    e.bIgnoreSelf = true;
    e.Radius = RADIUS;
    var t = UE.NewArray(UE.BuiltinByte);
    t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
    var t = (0, puerts_1.$ref)(t);
    e.SetObjectTypesQuery(t);
    if (EffectGlobal_1.EffectGlobal.SceneObjectAirWallEffectShowDebugTrace) {
      e.DrawTime = 5;
      e.SetDrawDebugTrace(2);
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(e, ColorUtils_1.ColorUtils.LinearGreen);
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(e, ColorUtils_1.ColorUtils.LinearRed);
    }
    this.bsr = e;
  }
  GetActorLocation() {
    this.wKs.FromUeVector(this.ActorToAttach.D_K2_GetComponentLocation());
  }
  Start(e) {
    if (e) {
      this.ActorToAttach = e;
      this.IsReady = true;
      this.koe();
    }
  }
  AfterRegistered() {
    if (this.IsReady) {
      this.GetActorLocation();
      this.BKs.DeepCopy(this.wKs);
      this.IsEnabled = true;
    }
  }
  BeforeUnregistered() {
    this.IsEnabled = false;
  }
  Update(e) {
    if (this.IsEnabled && this.ActorToAttach?.IsValid()) {
      this.GetActorLocation();
      var t = this.bsr;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.BKs);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.wKs);
      var r = TraceElementCommon_1.TraceElementCommon.SphereTrace(t, PROFILE_KEY);
      const n = t.HitResult;
      if (r && n?.bBlockingHit) {
        const n = t.HitResult;
        var o = n.GetHitCount();
        for (let e = 0; e < o; e++) {
          var i;
          var l;
          var s = n.Actors.Get(e);
          if (s.Tags.FindIndex(RefCompAirWallController_1.AIR_WALL) !== -1) {
            i = Vector_1.Vector.Create();
            TraceElementCommon_1.TraceElementCommon.GetImpactPoint(n, e, i);
            l = Vector_1.Vector.Create();
            TraceElementCommon_1.TraceElementCommon.GetImpactNormal(n, e, l);
            EventSystem_1.EventSystem.EmitWithTarget(s, EventDefine_1.EEventName.BulletHitAirWall, s, i, l);
          }
        }
      }
      this.BKs.DeepCopy(this.wKs);
    }
  }
}
exports.SceneObjectAirWallEffect = SceneObjectAirWallEffect;
//# sourceMappingURL=SceneObjectAirWallEffect.js.map