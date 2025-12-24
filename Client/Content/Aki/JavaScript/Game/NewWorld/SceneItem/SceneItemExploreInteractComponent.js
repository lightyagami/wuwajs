"use strict";

var SceneItemExploreInteractComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var o;
  var r = arguments.length;
  var s = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, i, n);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        s = (r < 3 ? o(s) : r > 3 ? o(e, i, s) : o(e, i)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(e, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemExploreInteractComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ExploreSkillInteractById_1 = require("../../../Core/Define/ConfigQuery/ExploreSkillInteractById");
const GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneTeamController_1 = require("../../Module/SceneTeam/SceneTeamController");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const SceneItemMoveComponent_1 = require("./Common/Component/SceneItemMoveComponent");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const CameraController_1 = require("../../Camera/CameraController");
const OUTLET_ANGLE_LIMIT_COS_VALUE = Math.cos(30 / 180 * Math.PI);
const DEFAULT_MAX_DISTANCE = 60;
const OVERWRITE_HOOK_LOCATION_KEY = "OverwriteLocation";
const manipulateInteractPointPointStateTagMap = new Map([[0, -422517001], [1, 1725677503], [2, -1335742570], [3, 968645625]]);
class HangPointData {
  constructor(t, e) {
    this.HangPointActor = t;
    this.HangPointDir = e;
  }
}
let SceneItemExploreInteractComponent = SceneItemExploreInteractComponent_1 = class SceneItemExploreInteractComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Hte = undefined;
    this.EIe = undefined;
    this.Oln = undefined;
    this.vtn = undefined;
    this.Gce = undefined;
    this.YO = undefined;
    this.Lie = undefined;
    this.ac = 4;
    this.Trl = undefined;
    this.Hfn = undefined;
    this.Gal = -1;
    this.Oal = undefined;
    this.HangPointData = new Set();
    this.IsMoving = false;
    this.kal = undefined;
    this.Nal = undefined;
    this.AttachParent = undefined;
    this.DKo = [];
    this.Fal = undefined;
    this.Jzl = undefined;
    this.Zzl = false;
    this.Evl = undefined;
    this.aln = undefined;
    this.Rhl = undefined;
    this._sr = new Set();
    this.d4l = new Set();
    this.m4l = new Set();
    this.C4l = new Set();
    this.Ui_ = Vector_1.Vector.Create(50, 50, 150);
    this.Di_ = undefined;
    this.Rnn = () => {
      var t = this.Hte.GetInteractionMainActor();
      if (t &&= t.GetActorByKey(OVERWRITE_HOOK_LOCATION_KEY)) {
        this.Evl = Vector_1.Vector.Create(t.D_K2_GetActorLocation());
      }
      switch (this.Lo.Option.Type) {
        case IComponent_1.EExploreSkillInteractType.PullGiant:
        case IComponent_1.EExploreSkillInteractType.StatueInteractPoint:
          this.ChangeManipulateInteractPointState(0);
          break;
        case IComponent_1.EExploreSkillInteractType.PullStatue:
          this.Val();
      }
    };
    this.GUe = (t, e, i) => {
      var n = this.g4l(e);
      if (this.f4l(e) && n) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
      }
    };
    this.eln = t => {
      switch (this.Lo.Option.Type) {
        case IComponent_1.EExploreSkillInteractType.PullGiant:
        case IComponent_1.EExploreSkillInteractType.StatueInteractPoint:
        case IComponent_1.EExploreSkillInteractType.RagDollCrushingRock:
        case IComponent_1.EExploreSkillInteractType.RagDollDestroySolidRock:
        case IComponent_1.EExploreSkillInteractType.LonelyDollPollutant:
        case IComponent_1.EExploreSkillInteractType.Custom:
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOverlapSceneItemExploreInteractRange, t, this);
      }
    };
  }
  get Bi_() {
    if (!this.Di_) {
      var t = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("FloatStatue.BoundSize");
      if (t) {
        var e = t.Value.split(",");
        if (e.length !== this.Ui_.Tuple.length) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 31, "雕像移动射线检测盒体FloatStatue.BoundSize配置错误,非x,y,z形式", ["Value", t.Value]);
          }
        } else {
          for (let t = 0; t < this.Ui_.Tuple.length; t++) {
            this.Ui_.Tuple[t] = parseFloat(e[t]) * 100 / 2;
          }
        }
      }
      this.Di_ = UE.NewObject(UE.TraceBoxElement.StaticClass());
      this.Di_.WorldContextObject = this.Hte.Owner;
      this.Di_.bIsSingle = false;
      this.Di_.bIgnoreSelf = true;
      this.Di_.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
      var i = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(this.Hte.GetSceneInteractionLevelHandleId());
      for (let t = 0; t < i.Num(); t++) {
        this.Di_.ActorsToIgnore.Add(i.Get(t));
      }
      this.Di_.DrawTime = 0.5;
      TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(this.Di_, this.Ui_.ToUeVector());
    }
    this.Di_.SetDrawDebugTrace(SceneItemExploreInteractComponent_1.StatueTraceDebug ? 1 : 0);
    return this.Di_;
  }
  get Location() {
    return this.Evl ?? this.Hte.ActorLocationProxy;
  }
  get CreatureDataId() {
    return this.EIe.GetCreatureDataId();
  }
  get IsLocked() {
    return this.Oln.IsLocked;
  }
  get InteractActions() {
    switch (this.Lo.Option.Type) {
      case IComponent_1.EExploreSkillInteractType.PullGiant:
      case IComponent_1.EExploreSkillInteractType.Custom:
        return this.Lo.Option.Actions;
      default:
        return;
    }
  }
  get OnlineTypeCanInteract() {
    return LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(this.Hfn);
  }
  get Type() {
    return this.Lo?.Option.Type;
  }
  get ExploreSkillUiResource() {
    return this.Lo?.ExploreSkillUiResource;
  }
  OnInitData(t) {
    var t = t.GetParam(SceneItemExploreInteractComponent_1)[0];
    this.Lo = t;
    if (this.Lo.PlayerStateRestritionId) {
      t = {
        Type: "CheckPlayerStateRestriction",
        RestrictionId: this.Lo.PlayerStateRestritionId
      };
      this.YO = {
        Type: 0,
        Conditions: [t]
      };
    }
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(212);
    this.EIe = this.Entity.GetComponent(0);
    this.Oln = this.Entity.GetComponent(139);
    this.Lie = this.Entity.GetComponent(206);
    EventSystem_1.EventSystem.OnceWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    if (this.Lo.Option.Type !== IComponent_1.EExploreSkillInteractType.PullStatue) {
      this.Disable("非拉取雕像类型不用tick");
    }
    this.Lrl();
    var t = this.EIe?.GetBaseInfo();
    this.Hfn = t?.OnlineInteractType;
    switch (this.Lo.Option.Type) {
      case IComponent_1.EExploreSkillInteractType.PullGiant:
      case IComponent_1.EExploreSkillInteractType.StatueInteractPoint:
      case IComponent_1.EExploreSkillInteractType.RagDollCrushingRock:
      case IComponent_1.EExploreSkillInteractType.RagDollDestroySolidRock:
      case IComponent_1.EExploreSkillInteractType.LonelyDollPollutant:
      case IComponent_1.EExploreSkillInteractType.Custom:
        this.vtn = this.Entity.GetComponent(89);
        if (this.vtn?.Valid) {
          this.vtn.AddOnPlayerOverlapCallback(this.eln);
        }
        break;
      case IComponent_1.EExploreSkillInteractType.PullStatue:
        this.Gce = this.Entity.GetComponent(137);
    }
    this.p4l();
    return true;
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.GUe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    }
    return true;
  }
  p4l() {
    if (this.Lo?.IgnoresCollisionCfg) {
      this.aln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass());
      var t = this.Lo.IgnoresCollisionCfg;
      for (const o of t.IgnoreEntitys) {
        var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o);
        if (e && e.Valid && e.Entity && e.Entity.Valid) {
          this.m4l.add(e.Entity);
        } else {
          this.C4l.add(o);
        }
      }
      if (this.C4l.size > 0) {
        if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.GUe)) {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
        }
      }
      for (const r of t.IgnoreActors) {
        var i = r.PathName.split(".")[1] + "." + r.PathName.split(".")[2];
        var n = this.aln.GetActor(new UE.FName(i));
        if (n) {
          this._sr.add(n);
        } else {
          this.d4l.add(i);
        }
      }
      if (this.d4l.size > 0) {
        this.Rhl = t => {
          var e = t?.toString();
          if (e && this.d4l.has(e) && (this.d4l.delete(e), e = this.aln?.GetActor(t))) {
            this._sr.add(e);
          }
          if (this.d4l.size === 0) {
            this.aln?.OnAddToSubsystem.Remove(this.Rhl);
          }
        };
        this.aln.OnAddToSubsystem.Add(this.Rhl);
      }
    }
  }
  CheckTraceResult(t, e) {
    if (t) {
      for (let t = 0; t < e.HitResult.Actors.Num(); t++) {
        var i = e.HitResult.Actors.Get(t);
        if (i !== undefined && !this._sr.has(i)) {
          let t = undefined;
          if ((!(t = (UE.KuroStaticLibrary.IsImplementInterface(i.GetClass(), UE.BPI_CreatureInterface_C.StaticClass()) ? ActorUtils_1.ActorUtils : ModelManager_1.ModelManager.SceneInteractionModel).GetEntityByActor(i)) || !this.m4l.has(t.Entity)) && t?.Entity !== this.Entity) {
            return true;
          }
        }
      }
    }
    return false;
  }
  OnTick(t) {
    if (this.Lo.Option.Type === IComponent_1.EExploreSkillInteractType.PullStatue) {
      this.Hal(t);
    }
  }
  Lrl() {
    switch (this.Lo.Option.Type) {
      case IComponent_1.EExploreSkillInteractType.PullGiant:
        this.Trl = -611134292;
        break;
      case IComponent_1.EExploreSkillInteractType.StatueInteractPoint:
        this.Trl = -2047045017;
        break;
      case IComponent_1.EExploreSkillInteractType.RagDollCrushingRock:
        this.Trl = -798481435;
        break;
      case IComponent_1.EExploreSkillInteractType.RagDollDestroySolidRock:
        this.Trl = -154105489;
        break;
      case IComponent_1.EExploreSkillInteractType.LonelyDollPollutant:
        this.Trl = 795459287;
        break;
      case IComponent_1.EExploreSkillInteractType.Custom:
        var t = this.Lo.Option.LockConfigId;
        var t = ExploreSkillInteractById_1.configExploreSkillInteractById.GetConfig(t)?.Tag;
        if (t) {
          this.Trl = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
        }
    }
  }
  get MarkTagId() {
    return this.Trl;
  }
  Val() {
    var t;
    if (this.Lo && this.Lo.Option.Type === IComponent_1.EExploreSkillInteractType.PullStatue) {
      if ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.Lo.Option.StatueInteractPointId)) && t.Entity) {
        this.Oal = t.Entity.GetComponent(159);
        (this.Oal.AttachParent = this).eJl();
      } else {
        this.Gal = this.Lo.Option.StatueInteractPointId;
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
      }
    }
  }
  eJl() {
    if (this.Oal && this.Lo && this.Lo.Option.Type === IComponent_1.EExploreSkillInteractType.PullStatue) {
      var t = this.Oal.HangingPoints;
      if (t === undefined || t.length !== 4) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 31, "[SceneItemExploreInteractComponent]雕像交互点挂点数量不正确", ["PbDataId", this.Lo.Option.StatueInteractPointId]);
        }
      } else {
        this.HangPointData.clear();
        for (const o of t) {
          var e = (this.Hte?.GetInteractionMainActor()).GetActorByKey(o);
          if (e === undefined) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneItem", 31, "[SceneItemExploreInteractComponent]雕像交互点挂点不存在", ["PbDataId", this.Lo.Option.StatueInteractPointId], ["PointKey", o]);
            }
            return;
          }
          var i = Vector_1.Vector.Create(e.D_K2_GetActorLocation());
          var n = Vector_1.Vector.Create(this.Hte.ActorLocationProxy);
          i.Subtraction(n, n);
          n.Z = 0;
          n.Normalize();
          this.HangPointData.add(new HangPointData(e, n));
        }
      }
    }
  }
  g4l(t) {
    if (!(this.HangPointData.size > 0)) {
      if (!t?.Valid) {
        return false;
      }
      t = t.Entity.GetComponent(0);
      if (this.Gal !== t?.GetPbDataId()) {
        return false;
      }
      if (this.Lo.Option.Type === IComponent_1.EExploreSkillInteractType.PullStatue) {
        this.Val();
      }
    }
    return true;
  }
  f4l(t) {
    return this.C4l.size === 0 || !!t?.Valid && (this.C4l.has(t.PbDataId) && (this.m4l.add(t.Entity), this.C4l.delete(t.PbDataId)), this.C4l.size === 0);
  }
  get PullTime() {
    switch (this.Lo.Option.Type) {
      case IComponent_1.EExploreSkillInteractType.PullGiant:
      case IComponent_1.EExploreSkillInteractType.StatueInteractPoint:
        return this.Lo.Option.PullTime;
      default:
        return -1;
    }
  }
  get MatchRoleOption() {
    return this.Lo?.MatchRoleOption;
  }
  OnClear() {
    this.vtn?.RemoveOnPlayerOverlapCallback(this.eln);
    return true;
  }
  CheckCondition() {
    return this.YO === undefined || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.YO, this.Hte.Owner, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id));
  }
  TypeSpecialCheck() {
    return this.Lo.Option.Type !== IComponent_1.EExploreSkillInteractType.StatueInteractPoint || this.jal();
  }
  ChangeManipulateInteractPointState(t) {
    if (this.Valid && this.ac !== t) {
      this.Lie.RemoveTag(manipulateInteractPointPointStateTagMap.get(this.ac));
      this.ac = t;
      this.Lie.AddTag(manipulateInteractPointPointStateTagMap.get(this.ac));
    }
  }
  GetLockWeight(t) {
    var e = this.Lo?.SearchTargetCfg;
    if (!e) {
      return 0;
    }
    switch (e.Type) {
      case IComponent_1.EExploreSkillSearchTargetCfg.EnterScreenWeight:
        return e.Weight;
      case IComponent_1.EExploreSkillSearchTargetCfg.AngleWeight:
        return this.CalcAngleWeight(t);
      default:
        return 0;
    }
  }
  CalcAngleWeight(t) {
    var e = this.Lo.SearchTargetCfg;
    var i = this.Hte.ActorLocationProxy;
    var n = Vector_1.Vector.Create(i);
    n.SubtractionEqual(t);
    n.Normalize();
    var o = Vector_1.Vector.Create();
    CameraController_1.CameraController.CameraRotator.Vector(o);
    o.Normalize();
    let r = -MathUtils_1.MathUtils.MaxFloat;
    var s = Vector_1.Vector.DotProduct(n, o);
    for (const a of e.AngleWeight) {
      if (s > Math.cos(a.Angle / 180 * Math.PI)) {
        r = a.Weight;
      }
    }
    if (r === -MathUtils_1.MathUtils.MaxFloat) {
      return -MathUtils_1.MathUtils.MaxFloat;
    } else {
      n = Vector_1.Vector.Dist(i, t) / 100;
      o = DEFAULT_MAX_DISTANCE - n < 1 ? 1 : DEFAULT_MAX_DISTANCE - n;
      return r * o;
    }
  }
  Hal(t) {
    if (this.Oal === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Temp", 31, "[SceneItemExploreInteractComponent]雕像交互点未初始化", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
    } else if (this.HangPointData.size !== 0) {
      var i = Global_1.Global.BaseCharacter;
      var i = Vector_1.Vector.Create(i?.D_K2_GetActorLocation());
      var n = Vector_1.Vector.Create(this.Hte.ActorLocationProxy);
      i.Subtraction(this.Hte.ActorLocationProxy, n);
      n.Z = 0;
      n.Normalize();
      let t = -MathUtils_1.MathUtils.MaxFloat;
      let e = undefined;
      for (const r of this.HangPointData) {
        var o = Vector_1.Vector.DotProduct(r.HangPointDir, n);
        if (o > t) {
          t = o;
          e = r.HangPointActor;
        }
      }
      if (e !== undefined) {
        this.Oal.AttachStatueInteractPoint = e;
      }
    }
  }
  StartMove(t, e, i) {
    if (this.kal !== undefined) {
      var n = new SceneItemMoveComponent_1.MoveTarget(t, i);
      this.IsMoving = true;
      if (!this.Lie?.HasTag(180377415)) {
        this.Lie?.AddTag(180377415);
      }
      this.Gce.AddMoveTarget(n);
      const o = () => {
        if (this.Lie?.HasTag(180377415)) {
          this.Lie?.RemoveTag(180377415);
        }
        this.IsMoving = false;
        this.kal.RequestMatchOutlet(this.Entity, t, e);
        this.kal = undefined;
        this.Gce.RemoveStopMoveCallback(o);
        this.eJl();
      };
      this.Gce.AddStopMoveCallback(o);
      this.Gce.AddSimpleRotation(this.Hte.Owner, this.Hte.ActorRotationProxy, e, i);
    }
  }
  StartInteractPullStatue() {
    this.Zzl = true;
    this.Jzl = this.Fal;
  }
  EndInteractPullStatue() {
    this.Zzl = false;
    this.Jzl = undefined;
  }
  TraceToOutlet(t, e) {
    var i = Vector_1.Vector.Create(this.Hte.ActorLocationProxy);
    i.Z += this.Ui_.Z;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Bi_, i);
    t.Z += this.Ui_.Z;
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Bi_, t);
    TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(this.Bi_, e);
    var i = TraceElementCommon_1.TraceElementCommon.BoxTrace(this.Bi_, "[StatueInteractBoxTrace]");
    if (i) {
      for (let t = 0; t < this.Bi_.HitResult.Actors.Num(); t++) {
        var n = this.Bi_.HitResult.Actors.Get(t);
        if (n !== undefined) {
          let t = undefined;
          n = (t = (UE.KuroStaticLibrary.IsImplementInterface(n.GetClass(), UE.BPI_CreatureInterface_C.StaticClass()) ? ActorUtils_1.ActorUtils : ModelManager_1.ModelManager.SceneInteractionModel).GetEntityByActor(n))?.Entity?.GetComponent(290);
          if (!t || !n) {
            return true;
          }
        }
      }
    }
    return false;
  }
  get HangingPoints() {
    if (this.Lo.Option.Type === IComponent_1.EExploreSkillInteractType.StatueInteractPoint) {
      return this.Lo.Option.HangingPointList;
    }
  }
  set AttachStatueInteractPoint(t) {
    if (this.Nal !== t && (this.Nal !== undefined && this.Hte?.Owner?.K2_DetachFromActor(1, 1, 1), (this.Nal = t) !== undefined)) {
      this.Hte?.Owner?.K2_AttachToActor(t, undefined, 2, 2, 1, false);
    }
  }
  get AttachStatueInteractPoint() {
    return this.Nal;
  }
  MoveToOutlet() {
    var t;
    var e;
    var i;
    if (this.Type === IComponent_1.EExploreSkillInteractType.StatueInteractPoint && this.AttachParent !== undefined) {
      t = Vector_1.Vector.Create(this.Jzl.GetMatchLocation(this.AttachParent.Entity));
      e = Rotator_1.Rotator.Create(this.Jzl.GetMatchRotation(this.AttachParent.Entity));
      i = Vector_1.Vector.Dist(this.Location, t);
      i = Math.min(i / ModelManager_1.ModelManager.ManipulateInteractModel.StatueInteractMoveSpeed, ModelManager_1.ModelManager.ManipulateInteractModel.StatueInteractMaxMoveTime);
      this.AttachParent.kal = this.Jzl;
      this.Jzl.EntityInSocket = this.AttachParent.Entity;
      this.AttachParent.StartMove(t, e, i);
      this.Fal = undefined;
    }
  }
  jal() {
    if (this.Zzl) {
      return false;
    }
    if (this.AttachParent === undefined || this.AttachParent.IsMoving) {
      return false;
    }
    if (this.Oln?.IsLocked) {
      return false;
    }
    if (this.Lie?.HasTag(-709838471)) {
      return false;
    }
    var t = this.AttachParent.Entity.GetComponent(139);
    if (t === undefined || t.IsLocked) {
      return false;
    }
    t = this.AttachParent.Entity.GetComponent(206);
    if (t === undefined || t.HasTag(-709838471)) {
      return false;
    }
    t = this.AttachParent.Entity.GetComponent(212);
    if (t === undefined) {
      return false;
    }
    var e = this.AttachParent.MatchRoleOption;
    if (e && e?.length > 0 && !SceneTeamController_1.SceneTeamController.IsMatchRoleOption(e)) {
      return false;
    }
    e = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(3);
    if (e === undefined) {
      return false;
    }
    this.Fal = undefined;
    var t = Vector_1.Vector.Create(t.ActorLocationProxy);
    var i = Vector_1.Vector.Create(e.ActorLocationProxy);
    var e = Vector_1.Vector.Dist2D(t, i);
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(e, 7, this.DKo);
    var n = Vector_1.Vector.Create(t);
    n.SubtractionEqual(i);
    n.Z = 0;
    n.Normalize();
    let o = MathUtils_1.MathUtils.MaxFloat;
    for (const _ of this.DKo) {
      var r = _.Entity?.GetComponent(290);
      if (r !== undefined && !r.EntityInSocket && r.TryMatch(this.AttachParent.Entity)) {
        var s = _.Entity?.GetComponent(212);
        if (s !== undefined) {
          var a = Vector_1.Vector.Create(s.ActorLocationProxy);
          a.SubtractionEqual(i);
          a.Z = 0;
          a.Normalize();
          var a = Vector_1.Vector.DotProduct(n, a);
          var h = ModelManager_1.ModelManager.ManipulateInteractModel?.StatueInteractCheckAngle;
          let t = OUTLET_ANGLE_LIMIT_COS_VALUE;
          if (!(a < (t = h !== undefined && h > 0 ? Math.cos(h / 180 * Math.PI) : t)) && !((a = Vector_1.Vector.Dist2D(i, s.ActorLocationProxy)) > o) && !(h = r.GetMatchLocation(this.AttachParent.Entity), s = r.GetMatchRotation(this.AttachParent.Entity), this.AttachParent.TraceToOutlet(h, s))) {
            o = a;
            this.Fal = r;
          }
        }
      }
    }
    return this.Fal !== undefined;
  }
};
SceneItemExploreInteractComponent.StatueTraceDebug = false;
SceneItemExploreInteractComponent = SceneItemExploreInteractComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(159)], SceneItemExploreInteractComponent);
exports.SceneItemExploreInteractComponent = SceneItemExploreInteractComponent; //# sourceMappingURL=SceneItemExploreInteractComponent.js.map