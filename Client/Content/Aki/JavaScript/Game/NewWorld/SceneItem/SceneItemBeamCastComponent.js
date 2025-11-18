"use strict";

var SceneItemBeamCastComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var a = arguments.length;
  var o = a < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        o = (a < 3 ? h(o) : a > 3 ? h(e, i, o) : h(e, i)) || o;
      }
    }
  }
  if (a > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemBeamCastComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const RoleTriggerController_1 = require("../Character/Role/RoleTriggerController");
const MANUAL_DELAY_UPDATE_MS = 100;
let SceneItemBeamCastComponent = SceneItemBeamCastComponent_1 = class SceneItemBeamCastComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.EIe = undefined;
    this.vtn = undefined;
    this.mBe = undefined;
    this.Lie = undefined;
    this.Hte = undefined;
    this.Smn = undefined;
    this.Imn = -0;
    this.Tmn = undefined;
    this.mWi = undefined;
    this.Lmn = Vector_1.Vector.Create();
    this.Dmn = Vector_1.Vector.Create();
    this.Rmn = -0;
    this.Umn = Vector_1.Vector.Create();
    this.Amn = Vector_1.Vector.Create();
    this.Pmn = -0;
    this.xmn = undefined;
    this.wmn = undefined;
    this.Bmn = undefined;
    this.bmn = undefined;
    this.qmn = undefined;
    this.jUn = undefined;
    this.Uai = false;
    this.j4a = undefined;
    this.nxe = 1;
    this.Rnn = () => {
      this.Uai = true;
      if (!this.mBe.IsInState(0)) {
        this.g_n();
      }
      if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
      }
    };
    this.g_n = () => {
      this.Gmn();
    };
    this.Nmn = (t, e) => {
      var i = this.ftn(e);
      if (!i || i.Id !== this.Entity.Id) {
        if (t) {
          this.Tmn.add(e);
        } else {
          this.Tmn.delete(e);
        }
        this.Gmn();
        this.W4a();
      }
    };
  }
  OnInitData(t) {
    this.EIe = this.Entity.GetComponent(0);
    t = t.GetParam(SceneItemBeamCastComponent_1)[0];
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[BeamCastComp] 组件配置缺失", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
      return false;
    }
    this.Lo = t;
    t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.Lo.TargetState);
    if (!t) {
      return false;
    }
    this.Imn = t;
    this.Rmn = this.Lo.Range.Height;
    t = this.Lo.Range.Center;
    this.Lmn.FromConfigVector(t);
    this.Dmn.FromConfigVector(t);
    this.Lmn.Z -= this.Lo.Range.Height / 2 - this.Lo.Range.Radius;
    this.Dmn.Z += this.Lo.Range.Height / 2 - this.Lo.Range.Radius;
    this.Umn.FromConfigVector(t);
    this.Amn.FromConfigVector(t);
    this.Umn.Z -= this.Lo.Range.Height / 2;
    this.Amn.Z = this.Umn.Z;
    this.bmn = UE.NewArray(UE.VectorDouble);
    this.bmn.Add(this.Umn.ToUeVector());
    this.bmn.Add(this.Amn.ToUeVector());
    return true;
  }
  OnStart() {
    this.vtn = this.Entity.GetComponent(86);
    this.mBe = this.Entity.GetComponent(137);
    this.Hte = this.Entity.GetComponent(206);
    this.Lie = this.Entity.GetComponent(200);
    if (this.vtn && this.mBe && this.Hte && this.Lie) {
      this.Tmn = new Set();
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[BeamCastComp] 组件缺失", ["PbDataId", this.EIe?.GetPbDataId()], ["RangeComponent", !!this.vtn], ["SceneItemStateComponent", !!this.mBe], ["SceneItemActorComponent", !!this.Hte], ["EntityCommonTagComponent", !!this.Lie]);
      }
      return false;
    }
  }
  OnActivate() {
    this.Omn("[BeamCastComp] 初始停止Tick");
    var t = this.Entity.GetComponent(126)?.CurrentTimeScale ?? 1;
    this.nxe = this.TimeDilation * t;
    if (this.Hte.GetIsSceneInteractionLoadCompleted()) {
      this.Rnn();
    } else {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
  }
  OnEnd() {
    this.Q4a();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn);
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    }
    if (this.qmn && EffectSystem_1.EffectSystem.IsValid(this.qmn)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.qmn, "[BeamCastComp.OnEnd]", true);
    }
    if (this.jUn && EffectSystem_1.EffectSystem.IsValid(this.jUn)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.jUn, "[BeamCastComp.OnEnd]", true);
    }
    if (this.wmn?.IsValid()) {
      this.wmn.K2_DetachFromActor();
      ActorSystem_1.ActorSystem.Put("SceneItemBeamCastComponent.OnEnd", this.wmn);
      this.wmn = undefined;
      this.Bmn = undefined;
    }
    this.Tmn = undefined;
    return !(this.mWi = undefined);
  }
  OnTick(t) {
    if (!!this.kmn() && !(this.Tmn.size < 0)) {
      this.Fmn();
    }
  }
  OnChangeTimeDilation(t) {
    var e = this.Entity.GetComponent(126)?.CurrentTimeScale ?? 1;
    this.nxe = t * e;
    if (this.qmn && EffectSystem_1.EffectSystem.IsValid(this.qmn)) {
      EffectSystem_1.EffectSystem.SetTimeScale(this.qmn, this.nxe);
    }
    if (this.jUn && EffectSystem_1.EffectSystem.IsValid(this.jUn)) {
      EffectSystem_1.EffectSystem.SetTimeScale(this.jUn, this.nxe);
    }
  }
  Gmn() {
    if (this.kmn()) {
      this.Vmn();
      if (this.Tmn.size < 0) {
        this.Omn("[BeamCastComp] 范围内无Actor，停止Tick");
      } else {
        this.Hmn();
      }
    } else {
      this.jmn();
      this.WUn();
      this.Omn("[BeamCastComp] 不在活跃状态，停止Tick");
    }
  }
  kmn() {
    return this.Uai && this.Lie.HasTag(this.Imn);
  }
  Wmn() {
    return this.Smn === undefined;
  }
  Hmn() {
    if (!this.Wmn()) {
      this.Enable(this.Smn, "SceneItemBeamCastComponent.EnableTraceTick");
      this.Smn = undefined;
    }
  }
  Omn(t) {
    if (this.Wmn()) {
      this.Smn = this.Disable(t);
    }
  }
  W4a() {
    if (this.j4a && TimerSystem_1.GameplayTimerSystem.Has(this.j4a)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.j4a);
      this.j4a = undefined;
    }
    this.j4a = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      if (this.kmn()) {
        this.Fmn();
        this.j4a = undefined;
      }
    }, MANUAL_DELAY_UPDATE_MS);
  }
  Q4a() {
    if (this.j4a && TimerSystem_1.GameplayTimerSystem.Has(this.j4a)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.j4a);
    }
    this.j4a = undefined;
  }
  WYr() {
    if (!this.mWi) {
      this.mWi = UE.NewObject(UE.TraceSphereElement.StaticClass());
      this.mWi.bIsSingle = true;
      this.mWi.ActorsToIgnore.Empty();
      var e = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(this.Hte.GetSceneInteractionLevelHandleId());
      for (let t = 0; t < e.Num(); t++) {
        this.mWi.ActorsToIgnore.Add(e.Get(t));
      }
      this.mWi.bIgnoreSelf = true;
      this.mWi.Radius = this.Lo.Range.Radius;
      var t = UE.NewArray(UE.BuiltinByte);
      t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
      t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic);
      if (!this.Lo?.IgnoreMonsterCollision) {
        t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
      }
      var t = (0, puerts_1.$ref)(t);
      this.mWi.SetObjectTypesQuery(t);
    }
    this.mWi.WorldContextObject = this.Hte.Owner;
    t = MathUtils_1.MathUtils.CommonTempVector;
    MathUtils_1.MathUtils.TransformPosition(this.Hte.ActorLocationProxy, this.Hte.ActorRotationProxy, this.Hte.ActorScaleProxy, this.Lmn, t);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, t);
    t = MathUtils_1.MathUtils.CommonTempVector;
    MathUtils_1.MathUtils.TransformPosition(this.Hte.ActorLocationProxy, this.Hte.ActorRotationProxy, this.Hte.ActorScaleProxy, this.Dmn, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, t);
  }
  Fmn() {
    this.WYr();
    let e = this.Rmn;
    let i = undefined;
    var t = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.mWi, "[BeamCastComp.TraceAndUpdate]");
    var s = this.mWi.HitResult;
    if (t && s?.bBlockingHit) {
      for (let t = 0; t < s.GetHitCount(); ++t) {
        var h = s.ImpactPointX_Array.Get(t);
        var a = s.ImpactPointY_Array.Get(t);
        var o = s.ImpactPointZ_Array.Get(t);
        var h = Vector_1.Vector.Create(h, a, o);
        var a = MathUtils_1.MathUtils.CommonTempVector;
        MathUtils_1.MathUtils.InverseTransformPosition(this.Hte.ActorLocationProxy, this.Hte.ActorRotationProxy, this.Hte.ActorScaleProxy, h, a);
        var o = a.Z - this.Umn.Z;
        if (!(o < 0) && !(o > e) && !!(h = s.Actors.Get(t))?.IsValid() && (!(a = this.ftn(h)) || a.Id !== this.Entity.Id)) {
          e = o;
          i = h;
        }
      }
    }
    this.Kmn(i, e);
    this.mWi.ClearCacheData();
  }
  Kmn(t, e) {
    this.Qmn(e);
    this.Xmn();
    this.KUn();
    var i;
    var e = this.EIe.GetEntityOnlineInteractType();
    var e = LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(e, false);
    var s = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id);
    var t = this.ftn(t);
    if (!!this.xmn?.Valid && (!t?.Valid || t.Id !== this.xmn.Id)) {
      i = this.xmn.Entity;
      this.xmn = undefined;
      if (e) {
        EventSystem_1.EventSystem.EmitWithTarget(i, EventDefine_1.EEventName.BeamCastStop, s);
      }
    }
    if (t?.Valid && !this.xmn?.Valid && (i = t.Entity, this.xmn = t, e)) {
      EventSystem_1.EventSystem.EmitWithTarget(i, EventDefine_1.EEventName.BeamCastStart, s);
    }
  }
  Qmn(t) {
    this.Pmn = MathUtils_1.MathUtils.Clamp(t, 0, this.Rmn);
    this.Amn.Z = this.Umn.Z + this.Pmn;
  }
  Vmn() {
    if (!this.wmn?.IsValid()) {
      this.wmn = ActorSystem_1.ActorSystem.Get(UE.BP_BasePathLine_C.StaticClass(), this.Hte.Owner.D_GetTransform());
      if (!this.wmn?.IsValid()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 39, "[BeamCastComp] BeamSplineActor创建失败", ["PbDataId", this.EIe?.GetPbDataId()]);
        }
        return;
      }
      this.wmn.K2_AttachToActor(this.Hte.Owner, undefined, 2, 2, 2, false);
      this.Bmn = this.wmn.GetComponentByClass(UE.SplineComponent.StaticClass());
      this.Bmn.ClearSplinePoints();
    }
    var t = this.Lo.EffectPath;
    if (!this.qmn || !EffectSystem_1.EffectSystem.IsValid(this.qmn)) {
      this.qmn = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.wmn.D_GetTransform(), t, "[BeamCastComp.CastBeam]", new EffectContext_1.EffectContext(this.Entity.Id));
      if (!EffectSystem_1.EffectSystem.IsValid(this.qmn)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 39, "[BeamCastComp] BeamEffect创建失败", ["PbDataId", this.EIe?.GetPbDataId()]);
        }
        return;
      }
      EffectSystem_1.EffectSystem.SetTimeScale(this.qmn, this.nxe);
      EffectSystem_1.EffectSystem.GetEffectActor(this.qmn).K2_AttachToActor(this.wmn, undefined, 2, 2, 2, false);
    }
    this.Fmn();
  }
  jmn() {
    var t = !!this.Lo?.DelayDestroyEffect;
    if (this.qmn && EffectSystem_1.EffectSystem.IsValid(this.qmn)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.qmn, "[BeamCastComp.StopBeam]", !t);
      this.qmn = undefined;
    }
    this.Kmn(undefined, t ? this.Pmn : 0);
  }
  hst() {
    var t;
    var e;
    var i;
    var s;
    if (!!this.Hte?.Owner && !!(t = this.Lo.HitEffectPath) && (!this.jUn || !EffectSystem_1.EffectSystem.IsValid(this.jUn))) {
      i = (e = this.Hte.ActorTransform).TransformPosition(this.Amn.ToUeVector());
      s = MathUtils_1.MathUtils.CommonTempQuat;
      Vector_1.Vector.UpVectorProxy.ToOrientationQuat(s);
      s = e.TransformRotation(s.ToUeQuat());
      s = new UE.TransformDouble(s, i, e.GetScale3D());
      this.jUn = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, s, t, "[BeamCastComp.UpdateHitEffect]", new EffectContext_1.EffectContext(this.Entity.Id));
      if (EffectSystem_1.EffectSystem.IsValid(this.jUn)) {
        EffectSystem_1.EffectSystem.SetTimeScale(this.jUn, this.nxe);
        EffectSystem_1.EffectSystem.GetEffectActor(this.jUn).K2_AttachToActor(this.Hte.Owner, undefined, 1, 1, 1, false);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[BeamCastComp] HitEffect创建失败", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
    }
  }
  WUn() {
    if (this.jUn && EffectSystem_1.EffectSystem.IsValid(this.jUn)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.jUn, "[BeamCastComp.StopHitEffect]", true);
    }
  }
  Xmn() {
    if (this.wmn?.IsValid()) {
      if (this.qmn) {
        EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(this.qmn, this.Pmn > 0);
      }
      this.bmn.Empty();
      this.bmn.Add(this.Umn.ToUeVector());
      this.bmn.Add(this.Amn.ToUeVector());
      this.Bmn.D_SetSplinePoints(this.bmn, 0, true);
    }
  }
  KUn() {
    var t;
    var e;
    if (this.Hte?.Owner?.IsValid()) {
      if (this.Pmn >= this.Rmn) {
        this.WUn();
      } else {
        this.hst();
        if (this.jUn && EffectSystem_1.EffectSystem.IsValid(this.jUn)) {
          t = EffectSystem_1.EffectSystem.GetEffectActor(this.jUn);
          (e = MathUtils_1.MathUtils.CommonTempRotator).Set(90, 0, 0);
          t?.D_K2_SetActorRelativeLocation(this.Amn.ToUeVector(), false, undefined, false);
          t?.K2_SetActorRelativeRotation(e.ToUeRotator(), false, undefined, false);
        }
      }
    }
  }
  ftn(t) {
    if (t?.IsValid()) {
      if (UE.KismetMathLibrary.EqualEqual_ObjectObject(t, RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger())) {
        return ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId);
      } else {
        return ModelManager_1.ModelManager.CreatureModel.GetEntityByChildActor(t);
      }
    }
  }
  ToggleDebugMode(t) {
    if (this.mWi) {
      if (t) {
        this.mWi.DrawTime = 0.5;
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.mWi, ColorUtils_1.ColorUtils.LinearGreen);
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.mWi, ColorUtils_1.ColorUtils.LinearRed);
      }
      this.mWi.SetDrawDebugTrace(t ? 2 : 0);
    }
  }
};
SceneItemBeamCastComponent = SceneItemBeamCastComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(218)], SceneItemBeamCastComponent);
exports.SceneItemBeamCastComponent = SceneItemBeamCastComponent; //# sourceMappingURL=SceneItemBeamCastComponent.js.map