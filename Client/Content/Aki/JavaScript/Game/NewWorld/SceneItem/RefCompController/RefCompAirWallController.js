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
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const LevelGamePlayUtils_1 = require("../../../LevelGamePlay/LevelGamePlayUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const ResponsibilityChain_1 = require("../../../Utils/ResponsibilityChain/ResponsibilityChain");
const RefCompControllerBase_1 = require("./RefCompControllerBase");
const WALL_COMMON_COLLISION_NAME = new UE.FName("InvisibleWallCommon");
const WALL_HUGE_BOSS_COLLISION_NAME = new UE.FName("InvisibleWallHugeBoss");
const WALL_ONLY_BULLET_COLLISION_NAME = new UE.FName("InvisibleWallBulletOnly");
const WALL_ONLY_MONSTER_COLLISION_NAME = new UE.FName("InvisibleWallMonsterOnly");
const WALL_ONLY_BLOCK_PLAYER_COLLISION_NAME = new UE.FName("InvisibleWallBlockPlayer");
const WALL_OVERLAP_PLAYER_COLLISION_NAME = new UE.FName("InvisibleWallOverlapPlayer");
const AirWallCollisionPresetToFName = new Map([[IAction_1.EAirWallCollisionPreset.HugeBoss, WALL_HUGE_BOSS_COLLISION_NAME], [IAction_1.EAirWallCollisionPreset.Normal, WALL_COMMON_COLLISION_NAME], [IAction_1.EAirWallCollisionPreset.OnlyBlockPlayer, WALL_ONLY_BLOCK_PLAYER_COLLISION_NAME], [IAction_1.EAirWallCollisionPreset.OnlyBullet, WALL_ONLY_BULLET_COLLISION_NAME], [IAction_1.EAirWallCollisionPreset.OnlyMonster, WALL_ONLY_MONSTER_COLLISION_NAME], [IAction_1.EAirWallCollisionPreset.PlayerOverlap, WALL_OVERLAP_PLAYER_COLLISION_NAME]]);
exports.AIR_WALL = new UE.FName("AirWall");
const PLANEWIDTH = new UE.FName("PlaneWidth");
const CIRCLERADIUS = new UE.FName("CircleRadius");
const PLANEHEIGHT = new UE.FName("PlaneHeight");
const DEFAULT_HIT_CD = 1;
const DEFAULT_THICKNESS = 100;
const PATH_LENGTH = 3;
const DEBUG_DRAW_TIME = 5;
const LOG_CATEGORY = "AirWallController";
class AirWallEffectParameterContext {
  constructor(e, t, i, r, l, a, o, s) {
    this.ActorRef = e;
    this.AirWall = t;
    this.Config = i;
    this.Transform = r;
    this.AirWallEffectViewHandles = l;
    this.AirWallRefs = a;
    this.EntityId = o;
    this.PbDataId = s;
  }
  IsValid() {
    return !StringUtils_1.StringUtils.IsNothing(this.ActorRef) && this.AirWall?.IsValid();
  }
}
class AirWallEffectHandler extends ResponsibilityChain_1.AbstractHandler {
  GetEffectHandleMap(e) {
    return e.AirWallEffectViewHandles;
  }
  GetEffectHandleKey(e) {
    return e.ActorRef;
  }
  GetAirWallActor(e) {
    return e.AirWall;
  }
  SpawnEffectCallback(t, e, i) {
    switch (e) {
      case 1:
      case 4:
      case 0:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 7, "[ReferenceComponent:SpawnAirWallEffect]生成空气墙特效失败", ["Result", e], ["PbDataId", t.PbDataId]);
        }
        return;
      case 5:
        break;
      default:
        return;
    }
    var r = t.AirWall;
    if (!t.AirWallRefs?.length || !r?.IsValid() || t.AirWallRefs.findIndex(e => e.op_Equality(FNameUtil_1.FNameUtil.GetDynamicFName(t.ActorRef))) < 0) {
      EffectSystem_1.EffectSystem.StopEffectById(i, "[SceneItemReferenceComponent.SpawnAirWallEffect] 空气墙已经被关闭", true);
    } else {
      this.SetNiagaraParam(t, i);
    }
  }
  CanHandle(e) {
    var t = this.GetEffectPath(e);
    var t = !StringUtils_1.StringUtils.IsNothing(t);
    var e = this.GetEffectHandleMap(e).get(this.GetEffectHandleKey(e));
    return t && e === undefined;
  }
  ExecuteProcessing(e) {
    var t = this.GetEffectPath(e);
    var t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e.Transform, t, "[AirWallEffectHandler.ExecuteProcessing]", new EffectContext_1.EffectContext(e.EntityId), 3, undefined, this.SpawnEffectCallback.bind(this, e), undefined, false, true);
    this.GetEffectHandleMap(e).set(this.GetEffectHandleKey(e), t);
  }
  ShouldStop(e) {
    var t = this.GetEffectHandleMap(e).get(this.GetEffectHandleKey(e));
    return !StringUtils_1.StringUtils.IsNothing(this.GetEffectPath(e)) && !!t;
  }
  ExecuteStopping(e) {
    var t = this.GetEffectHandleMap(e);
    var e = this.GetEffectHandleKey(e);
    var i = t.get(e);
    if (i && EffectSystem_1.EffectSystem.IsValid(i)) {
      EffectSystem_1.EffectSystem.StopEffectById(i, "[AirWallEffectHandler.ExecuteStopping]", false);
    }
    t.delete(e);
  }
}
class AirWallEffectCommonHandler extends AirWallEffectHandler {
  GetEffectPath(e) {
    return e.Config.AirWallEffectData ?? "";
  }
  SetNiagaraParam(e, t) {
    var i = this.GetAirWallActor(e);
    MathUtils_1.MathUtils.CommonTempRotator.FromUeRotator(i.K2_GetActorRotation());
    i.SetActorEnableCollision(false);
    i.RootComponent.SetMobility(2);
    i.K2_SetActorRotation(Rotator_1.Rotator.ZeroRotator, true);
    var r = EffectSystem_1.EffectSystem.GetNiagaraComponent(t);
    var l = e.AirWall.BrushComponent.D_GetComponentBounds();
    var a = new Rotator_1.Rotator();
    a.FromUeRotator(e.Transform.Rotator());
    var o = e.Config.AirWallEffectThickness ?? DEFAULT_THICKNESS;
    var o = l?.BoxExtent.X - o / 2;
    var e = e.Config.AirWallEffectHeight ?? 0;
    r?.SetFloatParameter(PLANEWIDTH, l?.BoxExtent.X * 2);
    r?.SetFloatParameter(CIRCLERADIUS, o);
    if (e) {
      r?.SetFloatParameter(PLANEHEIGHT, e);
    }
    if (l?.BoxExtent.Z) {
      o = Vector_1.Vector.Create(0, 0, -l?.BoxExtent.Z);
      a.Quaternion().RotateVector(o, o);
      EffectSystem_1.EffectSystem.GetEffectActor(t)?.D_K2_AddActorWorldOffset(o.ToUeVector(), false, undefined, true);
    }
    i.K2_SetActorRotation(MathUtils_1.MathUtils.CommonTempRotator.ToUeRotator(), true);
    i.RootComponent.SetMobility(0);
    i.SetActorEnableCollision(true);
  }
}
class AirWallEffectSplineHandler extends AirWallEffectHandler {
  GetEffectPath(e) {
    return e.Config.VectorArrayAirWallEffectData ?? "";
  }
  SetNiagaraParam(e, t) {
    var i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e.PbDataId);
    if (i) {
      if (i = (0, IComponent_1.getComponent)(i.ComponentsData, "SplineComponent")) {
        LevelGamePlayUtils_1.LevelGamePlayUtils.SetSplinePointEffectParam(t, e.AirWall.GetTransform(), i.Option.Points);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 72, "[AirWallEffectSplineHandler.SetNiagaraParam] 无法找到样条组件配置", ["PbDataId", e.PbDataId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GeneralLogicTree", 72, "[AirWallEffectSplineHandler.SetNiagaraParam] 本地无法找到实体数据", ["PbDataId", e.PbDataId]);
    }
  }
}
class RefCompAirWallController extends RefCompControllerBase_1.RefCompControllerBase {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.gMf = undefined;
    this.CMf = undefined;
    this.zvn = new Map();
    this.Zvn = new Map();
    this.eMn = new Map();
    this.gme = undefined;
    this.tMn = undefined;
    this.wkd = undefined;
    this.pMf = undefined;
    this.PKs = (e, t, i) => {
      var r;
      var l;
      var a = this.zvn.get(e.GetName());
      if (a !== undefined) {
        if (a <= 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 7, "[AirWall]hitCd小于0, 短时间内会多次触发，不允许往下执行");
          }
        } else {
          r = TimeUtil_1.TimeUtil.GetServerTime();
          if ((l = this.eMn.get(e.GetName())) === undefined || !(r < l)) {
            this.eMn.set(e.GetName(), r + a);
            this.gme ||= Vector_1.Vector.Create(0, 0, 0);
            this.tMn ||= Quat_1.Quat.Create(0, 0, 0, 1);
            Vector_1.Vector.CrossProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(i), this.gme);
            this.gme.Normalize();
            l = Math.acos(Vector_1.Vector.DotProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(i)));
            Quat_1.Quat.ConstructorByAxisAngle(this.gme, l, this.tMn);
            this.gMn(e, this.tMn.ToUeQuat(), t.ToUeVector());
          }
        }
      }
    };
    this.Off = (e, t) => {
      var i;
      var r;
      var l;
      var a;
      if (e && e.IsValid()) {
        if (this.Zvn.get(e.GetName())) {
          r = e.GetName();
          if (t && t.IsValid() && t instanceof TsBaseCharacter_1.default && (a = this.zvn.get(r)) !== undefined) {
            if (a <= 0) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("SceneItem", 7, "[AirWall]hitCd小于0, 短时间内会多次触发，不允许往下执行");
              }
            } else if ((l = t.CharacterActorComponent) && l.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && l.IsWorldOwner()) {
              l = TimeUtil_1.TimeUtil.GetServerTime();
              if ((i = this.eMn.get(r)) === undefined || !(l < i)) {
                this.eMn.set(r, l + a);
                this.gme ||= Vector_1.Vector.Create(0, 0, 0);
                this.tMn ||= Quat_1.Quat.Create(0, 0, 0, 1);
                i = e.D_K2_GetActorLocation();
                r = t.D_K2_GetActorLocation();
                (l = Vector_1.Vector.Create(r.X - i.X, r.Y - i.Y, 0)).Normalize();
                Vector_1.Vector.CrossProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(l), this.gme);
                this.gme.Normalize();
                a = Math.acos(Vector_1.Vector.DotProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(l)));
                Quat_1.Quat.ConstructorByAxisAngle(this.gme, a, this.tMn);
                this.gMn(e, this.tMn.ToUeQuat(), r);
              }
            }
          }
        } else {
          RefCompAirWallController.U_d(e);
          this.Gff(e);
        }
      }
    };
  }
  get AirWallEffectViewHandles() {
    this.gMf ||= new Map();
    return this.gMf;
  }
  get AirWallRefs() {
    this.CMf ||= new Array();
    return this.CMf;
  }
  get AirWallEffectChain() {
    var e;
    var t;
    if (!this.pMf) {
      e = new AirWallEffectSplineHandler();
      t = new AirWallEffectCommonHandler();
      e.SetNext(t);
      this.pMf = e;
    }
    return this.pMf;
  }
  OnStart() {
    this.wkd = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.wkd.bIsSingle = true;
    this.wkd.bIgnoreSelf = true;
    this.wkd.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    this.wkd.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
    this.wkd.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.AcrossBlock);
  }
  OnEnd() {
    this.cMn();
    if (this.AirWallEffectViewHandles) {
      for (const e of this.AirWallEffectViewHandles.values()) {
        if (EffectSystem_1.EffectSystem.IsValid(e)) {
          EffectSystem_1.EffectSystem.StopEffectById(e, "[SceneItemReferenceComponent.OnClear]", false);
        }
      }
    }
    this.wkd?.Dispose();
    this.wkd = undefined;
  }
  static U_d(e) {
    e.OnActorHit.Clear();
    e = e.GetComponentByClass(UE.PrimitiveComponent.StaticClass());
    if (e) {
      e.OnComponentHit.Clear();
    }
  }
  Gff(e) {
    e.OnActorBeginOverlap.Remove(this.Off);
  }
  cMn() {
    if (this.AirWallRefs?.length) {
      for (const t of this.AirWallRefs) {
        var e = this.ActorSubsystem.GetActor(t);
        if (e?.IsValid() && (RefCompAirWallController.U_d(e), this.Gff(e), e.SetActorEnableCollision(false), EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.BulletHitAirWall, this.PKs))) {
          EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.BulletHitAirWall, this.PKs);
        }
      }
      this.AirWallRefs.length = 0;
      this.zvn.clear();
      this.Zvn.clear();
      this.eMn.clear();
    }
  }
  Lkd(e, t) {
    return !!this.wkd && (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(LOG_CATEGORY) >= 4 && UE.KismetSystemLibrary.D_DrawDebugArrow(Global_1.Global.BaseCharacter, e.ToUeVector(), t.ToUeVector(), 50, ColorUtils_1.ColorUtils.LinearBlue, DEBUG_DRAW_TIME), this.wkd.WorldContextObject = Global_1.Global.BaseCharacter, TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.wkd, e), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.wkd, t), TraceElementCommon_1.TraceElementCommon.LineTrace(this.wkd, "NoAirWallBetweenTeamItemAndManager")) && (this.wkd.HitResult?.bBlockingHit ?? false);
  }
  Pkd(t, i) {
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
            for (const a of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
              if (!a.IsControl()) {
                var r = a.EntityHandle?.Entity;
                if (r) {
                  var l = r.GetComponent(101);
                  if (l && l.GetTeamState() === 1) {
                    l = r.GetComponent(1).ActorLocationProxy;
                    if (!MathUtils_1.MathUtils.IsInsideBoxSphereBounds(t, l.ToUeVectorOld()) || this.Lkd(e, l)) {
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
    let r = undefined;
    switch (e.Option.Type) {
      case IAction_1.EToggleAirWall.Open:
        i = e.Option;
        break;
      case IAction_1.EToggleAirWall.Close:
    }
    for (const n of e.ActorRefs) {
      var l;
      var a;
      var o;
      var s = n.PathName.split(".");
      if (s.length < PATH_LENGTH) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 7, "[ReferenceComponent:ChangeMaterial]actor路径错误", ["RefPath", n]);
        }
      } else {
        s = s[1] + "." + s[2];
        l = new UE.FName(s);
        if ((a = this.ActorSubsystem.GetActor(l))?.IsValid() && a.IsA(UE.Brush.StaticClass())) {
          if (!a.ActorHasTag(exports.AIR_WALL)) {
            a.Tags.Add(exports.AIR_WALL);
          }
          a.SetActorEnableCollision(!!i);
          if (i) {
            o = a.GetComponentByClass(UE.PrimitiveComponent.StaticClass());
            if (t.Type === 1 && RefCompAirWallController.EnableTeleportIntoAirWall) {
              o.OnComponentHit.Add(RefCompAirWallController.k_d.bind(undefined, t.EntityId));
            }
            r = r ? MathUtils_1.MathUtils.BoxSphereBoundsUnion(r, o.D_GetComponentBounds()) : o.D_GetComponentBounds();
            if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(LOG_CATEGORY) >= 4) {
              o.OnComponentHit.Add(ControllerHolder_1.ControllerHolder.LevelRangeDebugDrawController.DebugDrawComponentHit);
            }
            if (AirWallCollisionPresetToFName.has(i.CollisionPreset)) {
              o.SetCollisionProfileName(AirWallCollisionPresetToFName.get(i.CollisionPreset));
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelPlay", 72, `空气墙配置${i.CollisionPreset}对应物理预设不存在`);
            }
            if (!this.AirWallRefs.includes(l)) {
              this.AirWallRefs.push(l);
            }
            this.CMn(s, a, i);
          } else {
            this.Ivl(a, s, l);
          }
        }
      }
    }
    this.Pkd(r, t);
  }
  Ivl(t, e, i) {
    RefCompAirWallController.U_d(t);
    this.Gff(t);
    var r = this.AirWallEffectViewHandles?.get(e);
    if (EffectSystem_1.EffectSystem.IsValid(r ?? 0)) {
      EffectSystem_1.EffectSystem.StopEffectById(r, "[SceneItemReferenceComponent.HandleAirWall]", false);
    }
    if (this.AirWallRefs) {
      for (let e = 0; e < this.AirWallRefs.length; e++) {
        if (this.AirWallRefs[e].op_Equality(i)) {
          this.AirWallRefs.splice(e, 1);
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
    this.AirWallEffectViewHandles?.delete(e);
  }
  CMn(e, t, i) {
    var r = t.GetName();
    var l = t.D_GetTransform();
    l.SetScale3D(Vector_1.Vector.OneVectorDouble);
    var e = new AirWallEffectParameterContext(e, t, i, l, this.AirWallEffectViewHandles, this.AirWallRefs, this.Entity.Id, this.PbDataId);
    this.AirWallEffectChain.Stop(e);
    this.AirWallEffectChain.Handle(e);
    var l = i.HitEffectData ?? "";
    if (l) {
      this.Zvn.set(r, l);
      if (i.CollisionPreset === IAction_1.EAirWallCollisionPreset.PlayerOverlap) {
        t.OnActorBeginOverlap.Add(this.Off);
      }
      this.zvn.set(r, i.HitCd || DEFAULT_HIT_CD);
      t.OnActorHit.Add((e, t, i, r) => {
        this.ExecuteHitWall(e, t, i, r);
      });
      if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.BulletHitAirWall, this.PKs)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.BulletHitAirWall, this.PKs);
      }
    } else if (this.Zvn.has(r)) {
      this.Zvn.delete(r);
    }
  }
  ExecuteHitWall(e, t, i, r) {
    var l;
    var a;
    if (t?.IsValid() && t instanceof TsBaseCharacter_1.default && (l = this.zvn.get(e.GetName())) !== undefined) {
      if (l <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 7, "[AirWall]hitCd小于0, 短时间内会多次触发，不允许往下执行");
        }
      } else if (r.bBlockingHit && (t = t.CharacterActorComponent) && t.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && t.IsWorldOwner()) {
        t = TimeUtil_1.TimeUtil.GetServerTime();
        if ((a = this.eMn.get(e.GetName())) === undefined || !(t < a)) {
          this.eMn.set(e.GetName(), t + l);
          this.gme ||= Vector_1.Vector.Create();
          this.tMn ||= Quat_1.Quat.Create();
          Vector_1.Vector.CrossProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(r.Normal), this.gme);
          this.gme.Normalize();
          a = Math.acos(Vector_1.Vector.DotProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(r.Normal)));
          Quat_1.Quat.ConstructorByAxisAngle(this.gme, a, this.tMn);
          t = UE.KismetMathLibrary.WD_LocalToWorld(GlobalData_1.GlobalData.World, r.ImpactPoint);
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
    if (this.AirWallRefs && this.ActorSubsystem) {
      for (const i of this.AirWallRefs) {
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
RefCompAirWallController.k_d = (e, t, i, r, l, a) => {
  if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e))?.Valid && e.Entity?.Valid && (e = e.Entity.CheckGetComponent(1)) && e.Owner?.IsValid() && Global_1.Global.BaseCharacter === i && t?.IsA(UE.BrushComponent.StaticClass())) {
    MathUtils_1.MathUtils.CommonTempVector.FromUeVector(a.ImpactNormal);
    i = Vector_1.Vector.Create(e.Owner.K2_GetActorLocation().op_Subtraction(a.ImpactPoint));
    MathUtils_1.MathUtils.CommonTempVector.Z = 0;
    i.Z = 0;
    MathUtils_1.MathUtils.CommonTempVector.Normalize();
    i.Normalize();
    if (!(MathUtils_1.MathUtils.CommonTempVector.DotProduct(i) <= MathCommon_1.MathCommon.KindaSmallNumber)) {
      if ((t = Global_1.Global.BaseCharacter?.GetMovementComponent())?.IsA(UE.CharacterMovementComponent.StaticClass())) {
        ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayer({
          ClientReason: "[RefCompAirWallController] 空气墙外侧保底",
          TargetPosition: e.Owner.D_K2_GetActorLocation(),
          TargetRotation: Global_1.Global.BaseCharacter?.K2_GetActorRotation(),
          TargetGravityDirect: t.Kuro_GetGravityDirect()
        });
      }
    }
  }
}; //# sourceMappingURL=RefCompAirWallController.js.map