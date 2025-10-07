"use strict";

var CommonConnectComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var r;
  var o = arguments.length;
  var n = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, s);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        n = (o < 3 ? r(n) : o > 3 ? r(e, i, n) : r(e, i)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonConnectComponent = exports.PassThroughPortalParam = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IUtil_1 = require("../../../../UniverseEditor/Interface/IUtil");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GameSplineUtils_1 = require("../../../LevelGamePlay/Common/GameSplineUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const PortalUtils_1 = require("../../../Utils/PortalUtils");
const ConnectNearbySensory_1 = require("../../Pawn/SensoryInfo/ConnectNearbySensory");
const PROFILE_KEY = "CommonConnectComponent_LineTrace";
const TRACE_CHECK_PRESET_NAME = new UE.FName("被控物检测_Normal");
class PassThroughPortalParam {
  constructor(t, e, i) {
    this.Type = 0;
    this.PortalPairId = 0;
    this.Distance = 0;
    this.Type = t ?? 0;
    this.PortalPairId = e ?? 0;
    this.Distance = i ?? 0;
  }
}
exports.PassThroughPortalParam = PassThroughPortalParam;
let CommonConnectComponent = CommonConnectComponent_1 = class CommonConnectComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.fie = 0;
    this.ActorComp = undefined;
    this.ConnectedEffectPath = undefined;
    this.ConnectedEffectStartPoint = undefined;
    this.ConnectedEffectEndPoint = undefined;
    this.EffectSplines = new Map();
    this.cQs = 0;
    this.mQs = MathUtils_1.MathUtils.MaxFloat;
    this.pQs = undefined;
    this.RSa = [];
    this.tXa = 0;
    this.NeedBeProcessingEntity = new Map();
    this.CanInteractEntity = new Set();
    this.ServerProcessingEntities = new Set();
    this.ServerProcessingEntitiesParams = new Map();
    this.iXa = -600601599;
    this.Tna = undefined;
    this.Lna = undefined;
    this.rXa = undefined;
    this.kCl = undefined;
    this.Dna = -1;
    this.bsh = undefined;
    this.uoe = undefined;
    this.Ana = t => {
      for (const e of this.Una) {
        if (e === t) {
          return true;
        }
      }
      return false;
    };
    this.Una = new Set();
    this.Rna = undefined;
    this.g_n = (t, e) => {
      if (!this.Kko() && this.pQs) {
        TimerSystem_1.TimerSystem.Remove(this.pQs);
        this.pQs = undefined;
        this.TryCancelAllConnect();
      } else if (this.Kko() && !this.pQs) {
        this.pQs = TimerSystem_1.TimerSystem.Forever(() => {
          this.xna();
        }, ModelManager_1.ModelManager.ConnectGamePlayModel.TryConnectInterval);
      }
    };
    this.DKo = [];
    this.mBe = undefined;
    this.EQs = undefined;
  }
  OnInitData(t) {
    switch (t.EntityType) {
      case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
        return this.Pna(t);
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        return this.wna(t);
      default:
        return false;
    }
  }
  OnStart() {
    switch (this.fie) {
      case 1:
        return this.Bna();
      case 2:
        return this.bna();
      default:
        return false;
    }
  }
  OnActivate() {
    switch (this.fie) {
      case 1:
        this.qna();
        break;
      case 2:
        this.Gna();
    }
  }
  OnTick(t) {
    switch (this.fie) {
      case 1:
        this.Ona(t);
        break;
      case 2:
        this.Nna(t);
    }
  }
  OnDisable() {
    if (this.fie === 2) {
      this.R1h();
    }
  }
  OnEnable() {
    if (this.fie === 2) {
      this.U1h();
    }
  }
  OnEnd() {
    this.ClearEffectSplines();
    switch (this.fie) {
      case 1:
        return this.kna();
      case 2:
        return this.Fna();
      default:
        return false;
    }
  }
  GetNeedBeProcessingEntity(t, e) {
    var i = ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationByEntityId(this.Entity.Id);
    for (const r of t) {
      var s = r.GetComponent(228);
      if ((!i || !i.has(r.Id)) && (!this.ServerProcessingEntities || !this.ServerProcessingEntities.has(r.Id))) {
        if (s && s !== this && this.CheckEntityMatchCondition(e, r)) {
          this.NeedBeProcessingEntity.set(r, new PassThroughPortalParam());
        }
      }
    }
  }
  CheckEntityMatchCondition(t, e) {
    if (t && !(t.length <= 0)) {
      var i = e?.GetComponent(1);
      var s = e?.GetComponent(197);
      if (i && s) {
        var r = i.CreatureData.GetBaseInfo();
        if (r) {
          for (const o of t) {
            let e = true;
            if ((0, IUtil_1.isEntitiyMatch)(o, r.Category)) {
              if (!!o.State?.State && !s.ContainsTagByName(o.State.State)) {
                e = false;
              }
              let t = false;
              if (o.HasProperty && o.HasProperty.length > 0) {
                for (const n of o.HasProperty) {
                  if (!s.ContainsTagByName(n)) {
                    t = true;
                    break;
                  }
                }
                if (t) {
                  continue;
                }
              }
              t = false;
              if (o.NoProperty && o.NoProperty.length > 0) {
                for (const h of o.NoProperty) {
                  if (s.ContainsTagByName(h)) {
                    t = true;
                    break;
                  }
                }
                if (t) {
                  continue;
                }
              }
              return [e, true];
            }
          }
        }
      }
    }
    return [false, false];
  }
  TryStartConnect() {
    if (!(this.NeedBeProcessingEntity.size <= 0)) {
      this.RSa.length = 0;
      for (var [t, e] of this.NeedBeProcessingEntity) {
        var i;
        var s;
        var r = [];
        if (e.Type !== 0 && (i = e.PortalPairId, s = ModelManager_1.ModelManager.CreatureModel?.GetEntity(i)?.Entity?.GetComponent(216))) {
          s = s.GetPairCreatureDataId();
          if (e.Type === 1) {
            r.push(MathUtils_1.MathUtils.NumberToLong(i));
            r.push(MathUtils_1.MathUtils.NumberToLong(s));
          } else if (e.Type === 2) {
            r.push(MathUtils_1.MathUtils.NumberToLong(s));
            r.push(MathUtils_1.MathUtils.NumberToLong(i));
          }
        }
        this.RSa.push({
          Target: t,
          PortalsId: r
        });
        ModelManager_1.ModelManager.ConnectGamePlayModel?.SetRelationPortalParam(t.Id, e);
      }
      this.RequestConnect(this.Entity, this.RSa, true);
    }
  }
  ServerConnectEntities(t) {
    var e = this.ActorComp.ActorLocationProxy;
    var i = UE.NewArray(UE.VectorDouble);
    var s = [];
    for (const _ of t) {
      var r = ModelManager_1.ModelManager.CreatureModel?.GetEntity(_);
      if (this.ConnectedEffectPath) {
        var o = r?.Entity?.GetComponent(1);
        if (!o) {
          continue;
        }
        var n = r.Entity.Id;
        var h = ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationPassThroughParam(n);
        switch (h?.Type) {
          case 0:
            this.ASa(e, i, o);
            var a = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(e, i, this.ConnectedEffectPath);
            if (a && this.ActorComp?.Owner) {
              EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(a.EffectHandle, true);
              this.EffectSplines.set(n, [a]);
            }
            break;
          case 1:
            this.USa(e, i, o, h.PortalPairId, true);
            this.xSa(i, o, e, n);
            break;
          case 2:
            this.USa(e, i, o, h.PortalPairId, false);
            this.xSa(i, o, e, n);
        }
      }
      s.push(r.Entity.Id);
      this.ServerProcessingEntities.delete(r.Entity.Id);
    }
    ModelManager_1.ModelManager.ConnectGamePlayModel?.AddConnectedRelation(this.Entity.Id, s);
  }
  ASa(t, e, i) {
    e.Empty();
    var s = Vector_1.Vector.Create(this.ConnectedEffectStartPoint ? this.ActorComp?.GetSocketLocation(this.ConnectedEffectStartPoint) : this.ActorComp?.ActorLocation);
    s.SubtractionEqual(t);
    e.Add(s.ToUeVector());
    var s = Vector_1.Vector.Create(this.ConnectedEffectEndPoint ? i.GetSocketLocation(this.ConnectedEffectEndPoint) : i.ActorLocation);
    s.SubtractionEqual(t);
    e.Add(s.ToUeVector());
  }
  USa(t, e, i, s, r) {
    e.Empty();
    var o = Vector_1.Vector.Create(this.ConnectedEffectStartPoint ? this.ActorComp?.GetSocketLocation(this.ConnectedEffectStartPoint) : this.ActorComp?.ActorLocation);
    var n = Vector_1.Vector.Create();
    o.Subtraction(t, n);
    e.Add(n.ToUeVector());
    var h = Vector_1.Vector.Create(this.ConnectedEffectEndPoint ? i.GetSocketLocation(this.ConnectedEffectEndPoint) : i.ActorLocation);
    var a = ModelManager_1.ModelManager.PortalModel?.GetPortal(s);
    var _ = Vector_1.Vector.Create();
    PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(h, s, !r, _);
    var c = Vector_1.Vector.Create((r ? a?.PortalWorldTransform1 : a?.PortalWorldTransform2).GetLocation());
    var l = Vector_1.Vector.Create((r ? a?.PortalWorldTransform1 : a?.PortalWorldTransform2).GetRotation().GetForwardVector());
    MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(o, _, c, l, _);
    if (!_.IsZero()) {
      _.SubtractionEqual(t);
      e.Add(_.ToUeVector());
    }
    var t = Vector_1.Vector.Create(i.ActorLocationProxy);
    h.Subtraction(t, n);
    e.Add(n.ToUeVector());
    var _ = Vector_1.Vector.Create();
    PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(o, s, r, _);
    c = Vector_1.Vector.Create((r ? a?.PortalWorldTransform2 : a?.PortalWorldTransform1).GetLocation());
    l = Vector_1.Vector.Create((r ? a?.PortalWorldTransform2 : a?.PortalWorldTransform1).GetRotation().GetForwardVector());
    MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(h, _, c, l, _);
    if (!_.IsZero()) {
      _.SubtractionEqual(t);
      e.Add(_.ToUeVector());
    }
  }
  xSa(t, e, i, s) {
    var r;
    var o = UE.NewArray(UE.VectorDouble);
    if (t.Num() === 4 && (r = [], o.Empty(), o.Add(t.Get(0)), o.Add(t.Get(1)), i = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(i, o, this.ConnectedEffectPath)) && this.ActorComp?.Owner && (EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(i.EffectHandle, true), r.push(i), o.Empty(), o.Add(t.Get(2)), o.Add(t.Get(3)), i = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(e.ActorLocationProxy, o, this.ConnectedEffectPath)) && e.Owner) {
      EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(i.EffectHandle, true);
      r.push(i);
      this.EffectSplines.set(s, r);
    }
  }
  UQs(t) {
    var e = [];
    for (const s of t) {
      var i = EntitySystem_1.EntitySystem.Get(s);
      if (i) {
        e.push({
          Target: i,
          PortalsId: []
        });
      }
      ModelManager_1.ModelManager.ConnectGamePlayModel?.RemoveRelationPortalType(s);
    }
    if (!(e.length <= 0)) {
      this.RequestConnect(this.Entity, e, false);
    }
  }
  TryCancelAllConnect() {
    var t = ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationByEntityId(this.Entity.Id);
    if (t && !(t.size <= 0)) {
      var e = [];
      for (const s of t) {
        var i = EntitySystem_1.EntitySystem.Get(s);
        if (i && !this.ServerProcessingEntities.has(s)) {
          e.push({
            Target: i,
            PortalsId: []
          });
        }
      }
      if (!(e.length <= 0)) {
        this.RequestConnect(this.Entity, e, false);
      }
    }
  }
  ServerDisconnectEntities(t) {
    for (const i of t) {
      var e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(i);
      if (e?.Entity) {
        this.ServerProcessingEntities.delete(e.Entity.Id);
        this.RemoveSpecificSpline(e.Entity.Id);
        ModelManager_1.ModelManager.ConnectGamePlayModel?.RemoveConnectRelation(this.Entity.Id, e.Entity.Id);
      }
    }
  }
  ClearEffectSplines() {
    for (var [, t] of this.EffectSplines) {
      for (const e of t) {
        if (EffectSystem_1.EffectSystem.IsValid(e.EffectHandle)) {
          EffectSystem_1.EffectSystem.StopEffectById(e.EffectHandle, "[SceneItemConnectorComponent.ClearEffectSplines]", true);
        }
        if (e.SplineActor?.IsValid()) {
          ActorSystem_1.ActorSystem.Put("SceneItemConnectorComponent.ClearEffectSplines", e.SplineActor);
        }
      }
    }
    this.EffectSplines.clear();
  }
  RemoveSpecificSpline(t) {
    var e = this.EffectSplines.get(t);
    if (e && !(e.length <= 0)) {
      for (const i of e) {
        if (EffectSystem_1.EffectSystem.IsValid(i.EffectHandle)) {
          EffectSystem_1.EffectSystem.StopEffectById(i.EffectHandle, "[SceneItemConnectorComponent.RemoveSpecificSpline]", true);
        }
        if (i.SplineActor?.IsValid()) {
          ActorSystem_1.ActorSystem.Put("SceneItemConnectorComponent.RemoveSpecificSpline", i.SplineActor);
        }
      }
      this.EffectSplines.delete(t);
    }
  }
  UpdateConnectorRange(t, i, h = undefined) {
    var e = ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationByEntityId(this.Entity.Id);
    if (e && !(e.size <= 0)) {
      var a = [];
      for (const f of e) {
        if (!this.ServerProcessingEntities.has(f)) {
          var _ = EntitySystem_1.EntitySystem.Get(f);
          if (_) {
            var c = _.GetComponent(1);
            if (c) {
              let e = Vector_1.Vector.Distance(this.ActorComp.ActorLocationProxy, c.ActorLocationProxy);
              let s = MathUtils_1.MathUtils.MaxFloat;
              let r = 0;
              let o = MathUtils_1.MathUtils.MaxFloat;
              let n = 0;
              var c = ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationPassThroughParam(f);
              ModelManager_1.ModelManager.PortalModel.GetPortals().forEach((t, e) => {
                var i = this.PSa(f, true, e);
                if (i < s) {
                  s = i;
                  r = e;
                }
                if ((i = this.PSa(f, false)) < o) {
                  o = i;
                  n = e;
                }
              });
              var l = Math.min(s, o);
              var m = s < o ? 1 : 2;
              if ((m = e < l ? 0 : m) !== c?.Type) {
                let t = 0;
                if (m != 0) {
                  t = m == 1 ? r : n;
                }
                e = l;
                ModelManager_1.ModelManager.ConnectGamePlayModel?.SetRelationPortalParam(f, new PassThroughPortalParam(m, t, e));
              }
              switch (m) {
                case 1:
                  e = s;
                  break;
                case 2:
                  e = o;
              }
              if (e > t) {
                a.push(f);
                this.jna(f);
              } else if (!this.CheckEntityMatchCondition(i, _) || !!h && !h(f) || !this.kwa(f)) {
                a.push(f);
              }
            } else {
              a.push(f);
            }
          } else {
            a.push(f);
          }
        }
      }
      this.UQs(a);
    }
  }
  kwa(e, i, s) {
    if (!this.uoe) {
      this.k7r();
    }
    var r = Global_1.Global.BaseCharacter;
    if (r) {
      this.uoe.ActorsToIgnore.Empty();
      this.uoe.ActorsToIgnore.Add(r);
    }
    this.uoe.SetDrawDebugTrace(CommonConnectComponent_1.DrawTraceDebug ? 2 : 0);
    var r = EntitySystem_1.EntitySystem.GetComponent(e, 1);
    if (!r) {
      return false;
    }
    i = i ?? ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationPassThroughParam(e)?.Type;
    if (i === 0) {
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, this.ActorComp.ActorLocation);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, r.ActorLocation);
      return !TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY) || this.O0a(r);
    }
    if (i === 1 || i === 2) {
      var o = Vector_1.Vector.Create(r.ActorLocationProxy);
      var i = i === 1;
      var s = s ?? ModelManager_1.ModelManager.ConnectGamePlayModel.GetRelationPassThroughParam(e).PortalPairId;
      var e = ModelManager_1.ModelManager.PortalModel?.GetPortal(s);
      if (!e) {
        return false;
      }
      var n = ModelManager_1.ModelManager.CreatureModel?.GetEntity(s)?.Entity?.GetComponent(216);
      var h = ModelManager_1.ModelManager.CreatureModel?.GetEntity(n.GetPairCreatureDataId())?.Entity?.GetComponent(216);
      var n = n?.GetTriggerComp();
      var h = h?.GetTriggerComp();
      if (!n || !h) {
        return false;
      }
      var a = Vector_1.Vector.Create();
      var o = Vector_1.Vector.Create(o);
      var _ = Vector_1.Vector.Create();
      PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(o, s, !i, _);
      var c = i ? e.PortalWorldTransform1 : e.PortalWorldTransform2;
      var l = Vector_1.Vector.Create(c.GetLocation());
      var c = Vector_1.Vector.Create(c.GetRotation().GetForwardVector());
      var m = Vector_1.Vector.Create(this.ActorComp.ActorLocation);
      MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(m, _, l, c, a);
      var _ = i ? n : h;
      var l = i ? e.PortalWorldTransform1 : e.PortalWorldTransform2;
      if (!this.Nwa(a, l, _.D_K2_GetComponentLocation(), _.BoxExtent)) {
        return false;
      }
      if (a.IsZero()) {
        return false;
      }
      let t = true;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, this.ActorComp.ActorLocation);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, a);
      if (!(t = !TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY) || this.Fwa())) {
        return t;
      }
      c = Vector_1.Vector.Create();
      PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(m, s, i, c);
      n = i ? e.PortalWorldTransform2 : e.PortalWorldTransform1;
      h = Vector_1.Vector.Create(n.GetLocation());
      l = Vector_1.Vector.Create(n.GetRotation().GetForwardVector());
      MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(c, o, h, l, a);
      if (a.IsZero()) {
        return false;
      }
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, a);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, o);
      if (!(t = !TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY) || this.Fwa(r))) {
        return t;
      }
    }
    return true;
  }
  Nwa(t, e, i, s) {
    e.SetLocation(i);
    i = e.InverseTransformPositionNoScale(t.ToUeVector());
    return Math.abs(i.Y) <= s.Y && Math.abs(i.Z) <= s.Z;
  }
  O0a(e) {
    if (this.uoe.HitResult.bBlockingHit) {
      for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
        var i = this.uoe.HitResult.Actors.Get(t);
        if (i !== undefined) {
          let t = undefined;
          if ((t = (UE.KuroStaticLibrary.IsImplementInterface(i.GetClass(), UE.BPI_CreatureInterface_C.StaticClass()) ? ActorUtils_1.ActorUtils : ModelManager_1.ModelManager.SceneInteractionModel).GetEntityByActor(i))?.Id === e.Entity.Id) {
            break;
          }
          return false;
        }
      }
    }
    return true;
  }
  Fwa(e) {
    if (this.uoe.HitResult.bBlockingHit) {
      for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
        var i = this.uoe.HitResult.Actors.Get(t);
        if (i !== undefined) {
          if (!e) {
            return false;
          }
          {
            let t = undefined;
            if ((t = (UE.KuroStaticLibrary.IsImplementInterface(i.GetClass(), UE.BPI_CreatureInterface_C.StaticClass()) ? ActorUtils_1.ActorUtils : ModelManager_1.ModelManager.SceneInteractionModel).GetEntityByActor(i))?.Id !== e.Entity.Id) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }
  PSa(t, e, i) {
    var s;
    var r;
    var o;
    var n;
    var h = ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationPassThroughParam(t);
    if (!h || !(s = ModelManager_1.ModelManager.PortalModel?.GetPortal(i ?? h.PortalPairId)) || !(t = EntitySystem_1.EntitySystem.GetComponent(t, 1)) || ([s, n] = e ? [Vector_1.Vector.Create(s.PortalWorldTransform1.GetRotation().GetForwardVector()), Vector_1.Vector.Create(s.PortalWorldTransform1.GetLocation())] : [Vector_1.Vector.Create(s.PortalWorldTransform2.GetRotation().GetForwardVector()), Vector_1.Vector.Create(s.PortalWorldTransform2.GetLocation())], r = this.ActorComp.ActorLocationProxy, o = Vector_1.Vector.Create(), r.Subtraction(n, o), o.Normalize(), Vector_1.Vector.DotProduct(s, o) < 0)) {
      return MathUtils_1.MathUtils.MaxFloat;
    } else {
      n = Vector_1.Vector.Create();
      PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(t.ActorLocationProxy, i ?? h.PortalPairId, !e, n);
      return Vector_1.Vector.Dist(n, r);
    }
  }
  UpdateSplineEffect() {
    var t;
    var e;
    var i = this.ActorComp.ActorLocationProxy;
    var s = UE.NewArray(UE.VectorDouble);
    for ([t, e] of this.EffectSplines) {
      var r = EntitySystem_1.EntitySystem.GetComponent(t, 1);
      if (r) {
        if (e.length === 1) {
          var o = ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationPassThroughParam(r.Entity.Id);
          if (o) {
            if (o.Type !== 0) {
              this.RemoveSpecificSpline(r.Entity.Id);
              this.USa(i, s, r, o.PortalPairId, o.Type === 1);
              this.xSa(s, r, i, r.Entity.Id);
            } else {
              this.ASa(i, s, r);
              e[0].SplineActor.D_K2_SetActorLocation(this.ActorComp?.ActorLocation, false, undefined, false);
              e[0].SplineComp.D_SetSplinePoints(s, 0);
            }
          }
        } else if (e.length === 2) {
          o = ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationPassThroughParam(r.Entity.Id);
          if (o) {
            if (o.Type === 0) {
              this.RemoveSpecificSpline(r.Entity.Id);
              this.ASa(i, s, r);
              var n = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(i, s, this.ConnectedEffectPath);
              if (!n || !this.ActorComp?.Owner) {
                break;
              }
              EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(n.EffectHandle, true);
              this.EffectSplines.set(r.Entity.Id, [n]);
            } else {
              this.USa(i, s, r, o.PortalPairId, o.Type === 1);
              n = UE.NewArray(UE.VectorDouble);
              e[0].SplineActor.D_K2_SetActorLocation(this.ActorComp?.ActorLocation, false, undefined, false);
              n.Empty();
              n.Add(s.Get(0));
              n.Add(s.Get(1));
              e[0].SplineComp.D_SetSplinePoints(n, 0);
              e[1].SplineActor.D_K2_SetActorLocation(r.ActorLocation, false, undefined, false);
              n.Empty();
              n.Add(s.Get(2));
              n.Add(s.Get(3));
              e[1].SplineComp.D_SetSplinePoints(n, 0);
            }
          }
        }
      }
    }
  }
  RequestConnect(t, e, i) {
    if (i && this.kCl) {
      this.kCl.CollectSampleAndSend(true);
    }
    var s = Protocol_1.Aki.Protocol.a$s.create();
    var t = t.GetComponent(0);
    var r = Protocol_1.Aki.Protocol.g$s.create();
    r.d$s = MathUtils_1.MathUtils.NumberToLong(t.GetCreatureDataId());
    r.YQa = [];
    for (const h of e) {
      var o = h.Target.GetComponent(0);
      var n = Protocol_1.Aki.Protocol.eR_.create();
      n.CVn = MathUtils_1.MathUtils.NumberToLong(o.GetCreatureDataId());
      n.zQa = h.PortalsId;
      r.YQa.push(n);
      this.ServerProcessingEntities.add(h.Target.Id);
    }
    r.C$s = i;
    s.g$s = r;
    Net_1.Net.Call(27965, s, t => {
      e.forEach(t => {
        this.ServerProcessingEntities.delete(t.Target.Id);
      });
      switch (t?.Q4n) {
        case Protocol_1.Aki.Protocol.Q4n.KRs:
        case Protocol_1.Aki.Protocol.Q4n.Proto_ErrConnectorEntityNoExist:
          break;
        default:
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 18740);
      }
    });
  }
  k7r() {
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.WorldContextObject = this.ActorComp.Owner;
    this.uoe.bIgnoreSelf = true;
    this.uoe.bIsSingle = false;
    this.uoe.bIsProfile = true;
    this.uoe.ProfileName = TRACE_CHECK_PRESET_NAME;
    this.uoe.SetDrawDebugTrace(2);
    this.uoe.DrawTime = 0.5;
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.uoe, ColorUtils_1.ColorUtils.LinearRed);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.uoe, ColorUtils_1.ColorUtils.LinearGreen);
  }
  wna(t) {
    this.fie = 2;
    t = t.GetParam(CommonConnectComponent_1)[0];
    this.Tna = t;
    return true;
  }
  bna() {
    this.ActorComp = this.Entity.GetComponent(3);
    this.Lna = this.Entity.GetComponent(121);
    this.rXa = this.Entity.GetComponent(206);
    this.kCl = this.Entity.GetComponent(67);
    if (this.Tna.LogicType.Type === "Range") {
      this.cQs = this.Tna.LogicType.EnterRange;
      this.mQs = this.Tna.LogicType.LeaveRange;
      this.ConnectedEffectPath = this.Tna.LogicType.EffectConfig.EffectPath;
      this.ConnectedEffectStartPoint = FNameUtil_1.FNameUtil.GetDynamicFName(this.Tna.LogicType.EffectConfig.StartPoint);
      this.ConnectedEffectEndPoint = FNameUtil_1.FNameUtil.GetDynamicFName(this.Tna.LogicType.EffectConfig.EndPoint);
    }
    return true;
  }
  Gna() {
    this.pQs = TimerSystem_1.TimerSystem.Forever(() => {
      this.Vna();
    }, ModelManager_1.ModelManager.ConnectGamePlayModel.TryConnectInterval);
    var t = new ConnectNearbySensory_1.ConnectNearbySensory();
    t.Init(this.mQs);
    t.OnEnterSensoryRange = t => this.Hna(t);
    t.OnExitSensoryRange = t => {
      this.jna(t);
    };
    this.bsh = t;
    this.Dna = this.Lna.AddSensoryInfo(t);
  }
  U1h() {
    this.pQs = TimerSystem_1.TimerSystem.Forever(() => {
      this.Vna();
    }, ModelManager_1.ModelManager.ConnectGamePlayModel.TryConnectInterval);
  }
  R1h() {
    if (this.pQs) {
      TimerSystem_1.TimerSystem.Remove(this.pQs);
      this.pQs = undefined;
      this.TryCancelAllConnect();
    }
  }
  Nna(t) {
    if (this.Tna.LogicType.Type === "Range") {
      if (!this.oXa()) {
        this.TryCancelAllConnect();
      }
      this.UpdateConnectorRange(this.mQs, this.Tna?.LogicType.KeepConditions, this.Ana);
      this.UpdateSplineEffect();
    }
  }
  Fna() {
    if (this.Dna >= 0) {
      this.Lna?.RemoveSensoryInfo(this.Dna);
      this.Dna = -1;
    }
    if (this.pQs) {
      TimerSystem_1.TimerSystem.Remove(this.pQs);
      this.pQs = undefined;
      this.TryCancelAllConnect();
    }
    return true;
  }
  Vna() {
    this.NeedBeProcessingEntity.clear();
    this.CanInteractEntity.clear();
    for (const s of this.Una) {
      var t;
      var e;
      var i = EntitySystem_1.EntitySystem.Get(s);
      if (i && i?.Valid) {
        if (!this.NeedBeProcessingEntity.has(i)) {
          [t, e] = this.yzt(i);
          if (t) {
            this.NeedBeProcessingEntity.set(i, new PassThroughPortalParam());
          }
          if (e && !this.CanInteractEntity.has(i)) {
            this.CanInteractEntity.add(i);
          }
        }
      }
    }
    ModelManager_1.ModelManager.PortalModel.GetPortals().forEach((t, e) => {
      this.wSa(e, true);
      this.wSa(e, false);
    });
    if (this.oXa()) {
      this.TryStartConnect();
    }
    if (this.tXa === 0 && this.CanInteractEntity.size !== 0) {
      if (!this.rXa?.HasTag(this.iXa)) {
        this.rXa?.AddTag(this.iXa);
        this.kZa(true);
      }
    } else if (this.tXa !== 0 && this.CanInteractEntity.size === 0 && this.rXa?.HasTag(this.iXa)) {
      this.rXa?.RemoveTag(this.iXa);
      this.kZa(false);
    }
    this.tXa = this.CanInteractEntity.size;
  }
  kZa(t) {
    var e = Protocol_1.Aki.Protocol.Zf_.create();
    var i = MathUtils_1.MathUtils.NumberToLong(this.ActorComp.CreatureData.GetCreatureDataId());
    e.F4n = i;
    e.SDs = t;
    Net_1.Net.Call(21247, e, t => {
      if (t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 28494);
      }
    });
  }
  oXa() {
    var t = this.Tna?.LogicType.TagConditions;
    if (t && t.length !== 0) {
      for (const e of t) {
        if (!this.rXa?.HasTag(e)) {
          return false;
        }
      }
    }
    return true;
  }
  wSa(t, e) {
    if (t) {
      var i = ModelManager_1.ModelManager.PortalModel.GetPortal(t);
      if (i && i.Portal1Enable && i.Portal2Enable) {
        var s = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t)?.Entity?.GetComponent(216);
        var r = (0, puerts_1.$ref)(undefined);
        s?.PortalCapture?.GetPair(r);
        var r = (0, puerts_1.$unref)(r);
        if (e ? s?.GetPbDataId() : r?.PbdataId) {
          var [s, r] = e ? [i.PortalWorldTransform1, i.PortalWorldTransform2] : [i.PortalWorldTransform2, i.PortalWorldTransform1];
          var i = Vector_1.Vector.Create(s.GetLocation());
          var o = Vector_1.Vector.Create(r.GetLocation());
          var n = this.ActorComp.ActorLocationProxy;
          const C = Vector_1.Vector.Create();
          n.Subtraction(i, C);
          C.Z = 0;
          C.Normalize();
          n = Vector_1.Vector.Create(s.GetRotation().GetForwardVector());
          n.Normalize();
          const M = Vector_1.Vector.DotProduct(n, C);
          if (!(M < 0)) {
            var h = Vector_1.Vector.Create(r.GetRotation().GetForwardVector());
            h.Normalize();
            var i = [];
            ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(o, this.cQs, 7, i);
            var a = this.Tna?.LogicType;
            var _ = ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationByEntityId(this.Entity.Id);
            for (const E of i) {
              var c = E.Entity;
              if (c && !_?.has(c.Id) && !this.ServerProcessingEntities.has(c.Id)) {
                var l;
                var m;
                var f;
                var v = c.GetComponent(1);
                if (v) {
                  const C = Vector_1.Vector.Create();
                  v.ActorLocationProxy.Subtraction(o, C);
                  C.Normalize();
                  C.Z = 0;
                  const M = Vector_1.Vector.DotProduct(h, C);
                  if (!(M < 0.5) && !(l = Vector_1.Vector.Create(), PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(v.ActorLocationProxy, t, !e, l), (v = Vector_1.Vector.Distance(l, this.ActorComp.ActorLocationProxy)) > this.cQs)) {
                    if (this.kwa(c.Id, e ? 1 : 2, t)) {
                      l = c.GetComponent(228);
                      [m, f] = this.CheckEntityMatchCondition(a?.MatchConditions, c);
                      if (l && (m && this.NeedBeProcessingEntity.set(c, new PassThroughPortalParam(e ? 1 : 2, t, v)), f)) {
                        this.CanInteractEntity.add(c);
                      }
                      this.Hna(c);
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
  yzt(t) {
    var e;
    if (ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationByEntityId(this.Entity.Id)?.has(t.Id) || this.ServerProcessingEntities.has(t.Id)) {
      return [false, true];
    } else if (this.ActorComp && (e = this.Tna?.LogicType) && t.GetComponent(1) && this.kwa(t.Id, 0) && t.GetComponent(228)) {
      return this.CheckEntityMatchCondition(e?.MatchConditions, t);
    } else {
      return [false, false];
    }
  }
  Hna(t) {
    if (t.GetComponent(228)) {
      this.Una.add(t.Id);
    }
    return true;
  }
  jna(t) {
    this.Una.delete(t);
    this.bsh?.OnEntityExitConnectRange(t);
  }
  Pna(t) {
    this.fie = 1;
    t = t.GetParam(CommonConnectComponent_1)[0];
    this.Rna = t;
    return true;
  }
  Bna() {
    this.ActorComp = this.Entity.GetComponent(203);
    this.mBe = this.Entity.GetComponent(134);
    if (this.Rna?.LogicType.MatchConditions) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    }
    this.mBe = this.Entity.GetComponent(134);
    if (this.Rna.LogicType.Type === "Range") {
      this.EQs = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.Rna.LogicType.ActiveState);
      this.cQs = this.Rna.LogicType.EnterRange;
      this.mQs = this.Rna.LogicType.LeaveRange;
      this.ConnectedEffectPath = this.Rna.LogicType.EffectConfig.EffectPath;
      this.ConnectedEffectStartPoint = FNameUtil_1.FNameUtil.GetDynamicFName(this.Rna.LogicType.EffectConfig.StartPoint);
      this.ConnectedEffectEndPoint = FNameUtil_1.FNameUtil.GetDynamicFName(this.Rna.LogicType.EffectConfig.EndPoint);
    }
    return true;
  }
  qna() {
    if (this.Kko() && this.Rna?.LogicType.MatchConditions) {
      this.pQs = TimerSystem_1.TimerSystem.Forever(() => {
        this.xna();
      }, ModelManager_1.ModelManager.ConnectGamePlayModel.TryConnectInterval);
    }
  }
  Ona(t) {
    if (this.Rna.LogicType.Type === "Range") {
      this.UpdateConnectorRange(this.mQs, this.Rna?.LogicType.KeepConditions);
    }
  }
  kna() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    }
    return true;
  }
  Kko() {
    return !!this.mBe && !!this.EQs && this.mBe.StateTagId === this.EQs;
  }
  xna() {
    this.LQs();
    this.TryStartConnect();
  }
  LQs() {
    if (this.ActorComp) {
      var t = this.Rna?.LogicType;
      if (t) {
        this.NeedBeProcessingEntity.clear();
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(this.ActorComp.ActorLocationProxy, this.cQs, 7, this.DKo);
        var e = [];
        for (const i of this.DKo) {
          e.push(i.Entity);
        }
        this.GetNeedBeProcessingEntity(e, t.MatchConditions);
      }
    }
  }
};
CommonConnectComponent.DrawTraceDebug = false;
CommonConnectComponent = CommonConnectComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(228)], CommonConnectComponent);
exports.CommonConnectComponent = CommonConnectComponent; //# sourceMappingURL=CommonConnectComponent.js.map