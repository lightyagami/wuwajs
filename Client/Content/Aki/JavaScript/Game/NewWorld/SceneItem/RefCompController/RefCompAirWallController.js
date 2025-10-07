"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefCompAirWallController = exports.AIR_WALL = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const RefCompControllerBase_1 = require("./RefCompControllerBase");
const WALL_COMMON_COLLISION_NAME = new UE.FName("InvisibleWallCommon");
const WALL_HUGE_BOSS_COLLISION_NAME = new UE.FName("InvisibleWallHugeBoss");
const WALL_ONLY_BULLET_COLLISION_NAME = new UE.FName("InvisibleWallBulletOnly");
const WALL_ONLY_MONSTER_COLLISION_NAME = new UE.FName("InvisibleWallMonsterOnly");
const WALL_ONLY_BLOCK_PLAYER_COLLISION_NAME = new UE.FName("InvisibleWallBlockPlayer");
const AirWallCollisionPresetToFName = new Map([[IAction_1.EAirWallCollisionPreset.HugeBoss, WALL_HUGE_BOSS_COLLISION_NAME], [IAction_1.EAirWallCollisionPreset.Normal, WALL_COMMON_COLLISION_NAME], [IAction_1.EAirWallCollisionPreset.OnlyBlockPlayer, WALL_ONLY_BLOCK_PLAYER_COLLISION_NAME], [IAction_1.EAirWallCollisionPreset.OnlyBullet, WALL_ONLY_BULLET_COLLISION_NAME], [IAction_1.EAirWallCollisionPreset.OnlyMonster, WALL_ONLY_MONSTER_COLLISION_NAME]]);
exports.AIR_WALL = new UE.FName("AirWall");
const PLANEWIDTH = new UE.FName("PlaneWidth");
const CIRCLERADIUS = new UE.FName("CircleRadius");
const PLANEHEIGHT = new UE.FName("PlaneHeight");
const DEFAULT_HIT_CD = 1;
const DEFAULT_THICKNESS = 100;
const PATH_LENGTH = 3;
const DEBUG_DRAW_TIME = 5;
const LOG_CATEGORY = "AirWallController";
class RefCompAirWallController extends RefCompControllerBase_1.RefCompControllerBase {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.Yvn = undefined;
    this.Jvn = undefined;
    this.zvn = new Map();
    this.Zvn = new Map();
    this.eMn = new Map();
    this.gme = undefined;
    this.tMn = undefined;
    this.FUd = undefined;
    this.PKs = (e, t, i) => {
      var o;
      var r;
      var l = this.zvn.get(e.GetName());
      if (l !== undefined) {
        if (l <= 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 7, "[AirWall]hitCd小于0, 短时间内会多次触发，不允许往下执行");
          }
        } else {
          o = TimeUtil_1.TimeUtil.GetServerTime();
          if ((r = this.eMn.get(e.GetName())) === undefined || !(o < r)) {
            this.eMn.set(e.GetName(), o + l);
            this.gme ||= Vector_1.Vector.Create(0, 0, 0);
            this.tMn ||= Quat_1.Quat.Create(0, 0, 0, 1);
            Vector_1.Vector.CrossProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(i), this.gme);
            this.gme.Normalize();
            r = Math.acos(Vector_1.Vector.DotProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(i)));
            Quat_1.Quat.ConstructorByAxisAngle(this.gme, r, this.tMn);
            this.gMn(e, this.tMn.ToUeQuat(), t.ToUeVector());
          }
        }
      }
    };
  }
  OnStart() {
    this.FUd = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.FUd.bIsSingle = true;
    this.FUd.bIgnoreSelf = true;
    this.FUd.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    this.FUd.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
    this.FUd.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.AcrossBlock);
  }
  OnEnd() {
    this.cMn();
    if (this.Yvn) {
      for (const e of this.Yvn.values()) {
        if (EffectSystem_1.EffectSystem.IsValid(e)) {
          EffectSystem_1.EffectSystem.StopEffectById(e, "[SceneItemReferenceComponent.OnClear]", false);
        }
      }
    }
    this.FUd?.Dispose();
    this.FUd = undefined;
  }
  static zld(e) {
    e.OnActorHit.Clear();
    e = e.GetComponentByClass(UE.PrimitiveComponent.StaticClass());
    if (e) {
      e.OnComponentHit.Clear();
    }
  }
  cMn() {
    if (this.Jvn?.length) {
      for (const t of this.Jvn) {
        var e = this.ActorSubsystem.GetActor(t);
        if (e?.IsValid() && (RefCompAirWallController.zld(e), e.SetActorEnableCollision(false), EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.BulletHitAirWall, this.PKs))) {
          EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.BulletHitAirWall, this.PKs);
        }
      }
      this.Jvn.length = 0;
      this.zvn.clear();
      this.Zvn.clear();
      this.eMn.clear();
    }
  }
  NUd(e, t) {
    return !!this.FUd && (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(LOG_CATEGORY) >= 4 && UE.KismetSystemLibrary.D_DrawDebugArrow(Global_1.Global.BaseCharacter, e.ToUeVector(), t.ToUeVector(), 50, ColorUtils_1.ColorUtils.LinearBlue, DEBUG_DRAW_TIME), this.FUd.WorldContextObject = Global_1.Global.BaseCharacter, TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.FUd, e), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.FUd, t), TraceElementCommon_1.TraceElementCommon.LineTrace(this.FUd, "NoAirWallBetweenTeamItemAndManager")) && (this.FUd.HitResult?.bBlockingHit ?? false);
  }
  VUd(t, i) {
    if (t) {
      if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(LOG_CATEGORY) >= 4) {
        UE.KismetSystemLibrary.D_DrawDebugBox(Global_1.Global.BaseCharacter, new UE.VectorDouble(t.Origin), new UE.VectorDouble(t.BoxExtent), ColorUtils_1.ColorUtils.LinearBlue, new UE.Rotator(), DEBUG_DRAW_TIME);
        UE.KismetSystemLibrary.D_DrawDebugSphere(Global_1.Global.BaseCharacter, new UE.VectorDouble(t.Origin), t.SphereRadius, 32, ColorUtils_1.ColorUtils.LinearRed, DEBUG_DRAW_TIME, 10);
      }
      let e = undefined;
      if (i.Type !== 1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 72, "[LevelEventToggleAirWall] 应该只配置在空气墙管理器实体中", ["context", i]);
        }
      } else if (i.EntityId) {
        i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(i.EntityId);
        if (i?.Valid && i.Entity?.Valid) {
          i = i.Entity.CheckGetComponent(1);
          if (i) {
            e = i.ActorLocationProxy;
            for (const l of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
              if (!l.IsControl()) {
                var o = l.EntityHandle?.Entity;
                if (o) {
                  var r = o.GetComponent(94);
                  if (r && r.GetTeamState() === 1) {
                    r = o.GetComponent(1).ActorLocationProxy;
                    if (!MathUtils_1.MathUtils.IsInsideBoxSphereBounds(t, r.ToUeVectorOld()) || this.NUd(e, r)) {
                      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLevelEnvChange, 2);
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  HandleAirWall(e, t) {
    let i = undefined;
    let o = undefined;
    this.Yvn ||= new Map();
    switch (e.Option.Type) {
      case IAction_1.EToggleAirWall.Open:
        i = e.Option;
        break;
      case IAction_1.EToggleAirWall.Close:
    }
    for (const n of e.ActorRefs) {
      var r;
      var l;
      var _;
      var a = n.PathName.split(".");
      if (a.length < PATH_LENGTH) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 7, "[ReferenceComponent:ChangeMaterial]actor路径错误", ["RefPath", n]);
        }
      } else {
        a = a[1] + "." + a[2];
        r = new UE.FName(a);
        if ((l = this.ActorSubsystem.GetActor(r))?.IsValid() && l.IsA(UE.Brush.StaticClass())) {
          if (!l.ActorHasTag(exports.AIR_WALL)) {
            l.Tags.Add(exports.AIR_WALL);
          }
          l.SetActorEnableCollision(!!i);
          if (i) {
            _ = l.GetComponentByClass(UE.PrimitiveComponent.StaticClass());
            if (t.Type === 1 && RefCompAirWallController.EnableTeleportIntoAirWall) {
              _.OnComponentHit.Add(RefCompAirWallController.Zld.bind(undefined, t.EntityId));
            }
            o = o ? MathUtils_1.MathUtils.BoxSphereBoundsUnion(o, _.D_GetComponentBounds()) : _.D_GetComponentBounds();
            if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(LOG_CATEGORY) >= 4) {
              _.OnComponentHit.Add(ControllerHolder_1.ControllerHolder.LevelRangeDebugDrawController.DebugDrawComponentHit);
            }
            if (AirWallCollisionPresetToFName.has(i.CollisionPreset)) {
              _.SetCollisionProfileName(AirWallCollisionPresetToFName.get(i.CollisionPreset));
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelPlay", 72, `空气墙配置${i.CollisionPreset}对应物理预设不存在`);
            }
            this.Jvn ||= new Array();
            if (!this.Jvn.includes(r)) {
              this.Jvn.push(r);
            }
            this.CMn(a, l, i);
          } else {
            this.Ivl(l, a, r);
          }
        }
      }
    }
    this.VUd(o, t);
  }
  Ivl(t, e, i) {
    RefCompAirWallController.zld(t);
    var o = this.Yvn?.get(e);
    if (EffectSystem_1.EffectSystem.IsValid(o ?? 0)) {
      EffectSystem_1.EffectSystem.StopEffectById(o, "[SceneItemReferenceComponent.HandleAirWall]", false);
    }
    if (this.Jvn) {
      for (let e = 0; e < this.Jvn.length; e++) {
        if (this.Jvn[e].op_Equality(i)) {
          this.Jvn.splice(e, 1);
          if (EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.BulletHitAirWall, this.PKs)) {
            EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.BulletHitAirWall, this.PKs);
          }
          break;
        }
      }
    }
    this.zvn.delete(t.GetName());
    this.Zvn.delete(t.GetName());
    this.eMn.delete(t.GetName());
    this.Yvn?.delete(e);
  }
  CMn(a, n, s) {
    var e = s.AirWallEffectData ?? "";
    if (e && this.Yvn?.get(a) === undefined) {
      const h = n.D_GetTransform();
      h.SetScale3D(Vector_1.Vector.OneVectorDouble);
      e = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, h, e, "[SceneItemReferenceComponent.SpawnAirWallEffect]", new EffectContext_1.EffectContext(this.Entity.Id), 3, undefined, (e, t) => {
        switch (e) {
          case 1:
          case 4:
          case 0:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 7, "[ReferenceComponent:SpawnAirWallEffect]生成空气墙特效失败", ["Result", e], ["PbDataId", this.PbDataId]);
            }
            return;
          case 5:
            break;
          default:
            return;
        }
        var i;
        var o;
        var r;
        var l;
        var _;
        if (!this.Jvn?.length || !n?.IsValid() || this.Jvn.findIndex(e => e.op_Equality(FNameUtil_1.FNameUtil.GetDynamicFName(a))) < 0) {
          EffectSystem_1.EffectSystem.StopEffectById(t, "[SceneItemReferenceComponent.SpawnAirWallEffect] 空气墙已经被关闭", true);
        } else {
          i = EffectSystem_1.EffectSystem.GetNiagaraComponent(t);
          n.SetActorEnableCollision(false);
          n.RootComponent.SetMobility(2);
          n.K2_SetActorRotation(Rotator_1.Rotator.ZeroRotator, true);
          o = n.BrushComponent.D_GetComponentBounds();
          r = new Rotator_1.Rotator(h.Rotator().Pitch, h.Rotator().Yaw, h.Rotator().Roll);
          _ = s.AirWallEffectThickness ?? DEFAULT_THICKNESS;
          _ = o?.BoxExtent.X - _ / 2;
          l = s.AirWallEffectHeight ?? 0;
          i?.SetFloatParameter(PLANEWIDTH, o?.BoxExtent.X * 2);
          i?.SetFloatParameter(CIRCLERADIUS, _);
          if (l) {
            i?.SetFloatParameter(PLANEHEIGHT, l);
          }
          if (o?.BoxExtent.Z) {
            _ = Vector_1.Vector.Create(0, 0, -o?.BoxExtent.Z);
            r.Quaternion().RotateVector(_, _);
            EffectSystem_1.EffectSystem.GetEffectActor(t)?.D_K2_AddActorWorldOffset(_.ToUeVector(), false, undefined, true);
          }
          n.K2_SetActorRotation(r.ToUeRotator(), true);
          n.RootComponent.SetMobility(0);
          n.SetActorEnableCollision(true);
        }
      }, undefined, false, true);
      this.Yvn.set(a, e);
    }
    e = s.HitEffectData ?? "";
    if (e) {
      this.Zvn.set(n.GetName(), e);
      this.zvn.set(n.GetName(), s.HitCd || DEFAULT_HIT_CD);
      n.OnActorHit.Add((e, t, i, o) => {
        this.ExecuteHitWall(e, t, i, o);
      });
      if (!EventSystem_1.EventSystem.HasWithTarget(n, EventDefine_1.EEventName.BulletHitAirWall, this.PKs)) {
        EventSystem_1.EventSystem.AddWithTarget(n, EventDefine_1.EEventName.BulletHitAirWall, this.PKs);
      }
    }
  }
  ExecuteHitWall(e, t, i, o) {
    var r;
    var l;
    if (t?.IsValid() && t instanceof TsBaseCharacter_1.default && (r = this.zvn.get(e.GetName())) !== undefined) {
      if (r <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 7, "[AirWall]hitCd小于0, 短时间内会多次触发，不允许往下执行");
        }
      } else if (o.bBlockingHit && (t = t.CharacterActorComponent) && t.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && t.IsWorldOwner()) {
        t = TimeUtil_1.TimeUtil.GetServerTime();
        if ((l = this.eMn.get(e.GetName())) === undefined || !(t < l)) {
          this.eMn.set(e.GetName(), t + r);
          this.gme ||= Vector_1.Vector.Create();
          this.tMn ||= Quat_1.Quat.Create();
          Vector_1.Vector.CrossProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(o.Normal), this.gme);
          this.gme.Normalize();
          l = Math.acos(Vector_1.Vector.DotProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(o.Normal)));
          Quat_1.Quat.ConstructorByAxisAngle(this.gme, l, this.tMn);
          t = UE.KismetMathLibrary.WD_LocalToWorld(GlobalData_1.GlobalData.World, o.ImpactPoint);
          this.gMn(e, this.tMn.ToUeQuat(), t);
        }
      }
    }
  }
  gMn(e, t, i) {
    t = new UE.TransformDouble(t, i, Vector_1.Vector.OneVectorDouble);
    i = this.Zvn.get(e.GetName());
    EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, t, i, "[SceneItemReferenceComponent.ExecuteHitWall]");
  }
  GetAirWallActors() {
    var e = [];
    if (this.Jvn && this.ActorSubsystem) {
      for (const i of this.Jvn) {
        var t = this.ActorSubsystem.GetActor(i);
        if (t?.IsValid()) {
          e.push(t);
        }
      }
    }
    return e;
  }
}
(exports.RefCompAirWallController = RefCompAirWallController).EnableTeleportIntoAirWall = false;
RefCompAirWallController.Zld = (e, t, i, o, r, l) => {
  if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e))?.Valid && e.Entity?.Valid && (e = e.Entity.CheckGetComponent(1)) && e.Owner?.IsValid() && Global_1.Global.BaseCharacter === i && t?.IsA(UE.BrushComponent.StaticClass())) {
    MathUtils_1.MathUtils.CommonTempVector.FromUeVector(l.ImpactNormal);
    i = Vector_1.Vector.Create(e.Owner.K2_GetActorLocation().op_Subtraction(l.ImpactPoint));
    MathUtils_1.MathUtils.CommonTempVector.Z = 0;
    i.Z = 0;
    MathUtils_1.MathUtils.CommonTempVector.Normalize();
    i.Normalize();
    if (!(MathUtils_1.MathUtils.CommonTempVector.DotProduct(i) <= MathCommon_1.MathCommon.KindaSmallNumber)) {
      if ((t = Global_1.Global.BaseCharacter?.GetMovementComponent())?.IsA(UE.CharacterMovementComponent.StaticClass())) {
        ControllerHolder_1.ControllerHolder.TeleportController.TeleportToPositionWithGravityNoLoading(e.Owner.D_K2_GetActorLocation(), Global_1.Global.BaseCharacter?.K2_GetActorRotation(), t.Kuro_GetGravityDirect(), "[RefCompAirWallController] 空气墙外侧保底");
      }
    }
  }
}; //# sourceMappingURL=RefCompAirWallController.js.map