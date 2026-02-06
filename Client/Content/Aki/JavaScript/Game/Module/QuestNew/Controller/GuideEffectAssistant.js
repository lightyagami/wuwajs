"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideEffectAssistant = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const QuestDefine_1 = require("../QuestDefine");
const SAMPLE_STEP = 200;
const SHOW_EFFECT_DISTANCE = 50000;
const TRACE_DISTANCE = 500;
const PROFILE_KEY = "GuideEffectAssistant_GenerateNavigationPoint";
class EffectData {
  constructor() {
    this.Duration = 0;
    this.ShowTime = 0;
    this.HideTime = 0;
    this.EffectHandle = 0;
    this.SplinePoints = undefined;
    this.CurActor = undefined;
    this.SplineData = undefined;
    this.SplineLength = 0;
    this.State = 0;
    this.BestIndex = 0;
  }
}
class GuideEffectAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.$oo = 0;
    this.Yoo = 0;
    this.Joo = IComponent_1.EEffectSplineCreateMode.WholeLine;
    this._0e = 0;
    this.zoo = new Map();
    this.Zoo = new Set();
    this.ero = (e, i) => {
      if (i === QuestDefine_1.SCAN_SKILL_ID && e === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()) {
        if (this.$oo) {
          i = this.zoo.get(this.$oo);
          if (i) {
            var s;
            var n;
            var o = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
            let e = MathUtils_1.MathUtils.MaxFloat;
            let t = -1;
            for ([s, n] of i) {
              if (!n.SplinePoints) {
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Guide", 31, "当前追踪任务Spline未找到", ["TrackQuestId:", this.$oo], ["SplineId", s]);
                }
                return;
              }
              var [r, a, _] = this.tro(o, n);
              if (!!r && !(_ > ConfigManager_1.ConfigManager.LevelGamePlayConfig.GenExtraGuideEffectMaxDist)) {
                n.BestIndex = a;
                if (_ < e) {
                  e = _;
                  t = s;
                }
              }
            }
            var f;
            var l;
            var E = e > ConfigManager_1.ConfigManager.LevelGamePlayConfig.GenExtraGuideEffectMinDist;
            this.iro();
            for ([f, l] of i) {
              var h;
              var c = this.oro(o, l, l.BestIndex, f === t && E);
              if (this.Yoo <= 0) {
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Guide", 31, "当前位置无法生成spline", ["TrackQuestId:", this.$oo], ["SplineId", f]);
                }
              } else {
                h = l.SplineData.Effect;
                h = this.rro(h, c);
                l.CurActor = c;
                if (EffectSystem_1.EffectSystem.IsValid(h)) {
                  l.EffectHandle = h;
                  l.State = 1;
                  EffectSystem_1.EffectSystem.GetEffectActor(h).K2_AttachToActor(c, undefined, 2, 2, 2, false);
                  if ((c = EffectSystem_1.EffectSystem.GetNiagaraComponent(h)) instanceof UE.NiagaraComponent) {
                    c.ReinitializeSystem();
                  }
                  if (this.Joo === IComponent_1.EEffectSplineCreateMode.EquidistantPoint) {
                    h = Math.ceil(l.SplineLength / this._0e);
                    c.SetIntParameter(new UE.FName("SpawnCount"), h);
                  }
                  l.ShowTime = Time_1.Time.Now;
                  l.HideTime = l.ShowTime + l.Duration * TimeUtil_1.TimeUtil.InverseMillisecond;
                }
              }
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Guide", 33, "当前追踪任务未配置引导特效", ["TrackQuestId:", this.$oo]);
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Guide", 33, "当前无追踪任务");
        }
      }
    };
    this.nro = (e, t, i) => {
      if (t === Protocol_1.Aki.Protocol.hTs.a3_ && this.zoo.has(e)) {
        if (this.$oo === e) {
          this.iro();
          this.$oo = undefined;
        }
        this.zoo.delete(e);
      }
    };
    this.$Ct = e => {
      if (e === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        this.iro();
        e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
        this.$oo = e ? e.Id : undefined;
      }
    };
    this.sAm = -1;
    this.aAm = undefined;
    this.hAm = undefined;
    this.lAm = () => {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.lAm);
      if (this.sAm !== -1 && this.aAm && this.hAm && Global_1.Global.BaseCharacter) {
        this._Am(this.sAm, this.aAm, this.hAm);
      }
    };
  }
  rro(e, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Guide", 31, "[GuideEffectAssistant] 生成新的特效");
    }
    var i = MathUtils_1.MathUtils.DefaultTransformDouble;
    return EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, i, e, "[GuideEffectAssistant.GenerateEffectHandle]", new EffectContext_1.EffectContext(undefined, t));
  }
  OnDestroy() {
    this.zoo.clear();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.ero);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.nro);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.ero);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.nro);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct);
  }
  iro() {
    var e = this.zoo.get(this.$oo);
    if (e) {
      for (var [, t] of e) {
        this.sro(t);
      }
    }
  }
  sro(e) {
    var t = e.CurActor;
    if (t?.IsValid()) {
      var i = e.EffectHandle;
      if (EffectSystem_1.EffectSystem.IsValid(i)) {
        if (e.State === 1) {
          const s = e.CurActor;
          this.Zoo.add(s);
          EffectSystem_1.EffectSystem.AddFinishCallback(e.EffectHandle, e => {
            this.aro(s);
          });
          e.CurActor = undefined;
          EffectSystem_1.EffectSystem.StopEffectById(i, "[GuideEffectAssistant.ClearCurSplineAndEffectHandle]", false);
          e.State = 2;
        }
      } else {
        ActorSystem_1.ActorSystem.Put("GuideEffectAssistant.ClearSplineAndEffectHandle", t);
        e.CurActor = undefined;
      }
    }
  }
  aro(e) {
    if (e?.IsValid() && this.Zoo.has(e)) {
      this.Zoo.delete(e);
      ActorSystem_1.ActorSystem.Put("GuideEffectAssistant.AfterEffectEnd", e);
    }
  }
  UpdateQuestGuideEffect(e) {
    if (this.$oo) {
      var t = this.zoo.get(this.$oo);
      if (t) {
        for (var [, i] of t) {
          if (Time_1.Time.Now >= i.HideTime) {
            this.iro();
            i.HideTime = Number.MAX_VALUE;
          }
        }
      }
    }
  }
  tro(e, t) {
    var i;
    var s;
    var t = t.SplinePoints;
    let n = Number.MAX_VALUE;
    let o = -1;
    for ([i, s] of t.entries()) {
      var r = Vector_1.Vector.Dist(s, e);
      if (r < n) {
        n = r;
        o = i;
      }
    }
    if (o === -1) {
      return [false, 0, 0];
    } else {
      return [true, o, n];
    }
  }
  oro(t, e, i, s) {
    var n = ActorSystem_1.ActorSystem.Get(UE.BP_BasePathLine_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    n.D_K2_SetActorLocation(t.ToUeVector(), false, undefined, true);
    var o = n.GetComponentByClass(UE.SplineComponent.StaticClass());
    var r = e.SplinePoints;
    var a = UE.NewArray(UE.VectorDouble);
    if (s) {
      this.hro(t, r[i], a);
    }
    var _ = i + 1 + Math.ceil(SHOW_EFFECT_DISTANCE / SAMPLE_STEP);
    _ = MathUtils_1.MathUtils.Clamp(_, i + 1, r.length);
    for (let e = i + 1; e < _; e++) {
      var f = Vector_1.Vector.Create();
      f.DeepCopy(r[e]);
      f.SubtractionEqual(t);
      a.Add(f.ToUeVector());
    }
    o.D_SetSplinePoints(a, 0, true);
    this.Yoo = a.Num();
    return n;
  }
  hro(t, e, i) {
    var s = UE.NavigationSystemV1.FindPathToLocationSynchronously(GlobalData_1.GlobalData.World, t.ToUeVectorOld(), e.ToUeVectorOld(), undefined, undefined, true);
    for (let e = 0; e < s.PathPoints.Num(); e++) {
      var n = Vector_1.Vector.Create(s.PathPoints.Get(e));
      n.SubtractionEqual(t);
      var n = n.ToUeVector();
      this.aoe(n, GlobalData_1.GlobalData.World);
      n.Set(n.X, n.Y, n.Z + ConfigManager_1.ConfigManager.LevelGamePlayConfig.ExtraGuideEffectRaiseDist);
      i.Add(n);
    }
  }
  lro(e, t) {
    var i;
    var s = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
    if (s) {
      if (i = (0, IComponent_1.getComponent)(s.ComponentsData, "SplineComponent")) {
        s = Vector_1.Vector.Create(s.Transform?.Pos.X ?? 0, s.Transform?.Pos.Y ?? 0, s.Transform?.Pos.Z ?? 0);
        if (i.Option.Type !== IComponent_1.ESplineType.Effect) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Level", 31, "[SceneItemGuidePathComponent.LoadPathAsset] SplineComponent配置类型不是Effect", ["SplineEntityId", e]);
          }
        } else {
          this.Joo = i.Option.CreateOption.Type;
          if (this.Joo === IComponent_1.EEffectSplineCreateMode.EquidistantPoint) {
            i = i.Option.CreateOption;
            this._0e = i.Space;
          }
          if (Global_1.Global.BaseCharacter) {
            this._Am(e, s, t);
          } else {
            this.sAm = e;
            this.aAm = s;
            this.hAm = t;
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.lAm);
          }
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Level", 31, "[SceneItemGuidePathComponent.LoadPathAsset] 无法找到SplineComponent配置", ["SplineEntityId", e]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Level", 31, "[SceneItemGuidePathComponent.LoadPathAsset] 无法找到Spline Entity", ["SplineEntityId", e]);
    }
  }
  _Am(e, t, i) {
    var s = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(e, Global_1.Global.BaseCharacter.EntityId, 1);
    var n = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(e);
    if (ObjectUtils_1.ObjectUtils.IsValid(n)) {
      n.D_K2_SetActorLocation(t.ToUeVector(), false, undefined, false);
      var o = new Array();
      for (let e = 0; e < s.GetNumberOfSplinePoints() - 1; ++e) {
        var r = s.GetDistanceAlongSplineAtSplinePoint(e);
        var a = s.GetDistanceAlongSplineAtSplinePoint(e + 1);
        for (let e = r; e < a; e += SAMPLE_STEP) {
          const _ = s.D_GetLocationAtDistanceAlongSpline(e, 1);
          o.push(Vector_1.Vector.Create(_));
        }
      }
      const _ = s.D_GetLocationAtSplinePoint(s.GetNumberOfSplinePoints() - 1, 1);
      o.push(Vector_1.Vector.Create(_));
      i.SplinePoints = o;
      i.SplineData = n.SplineData;
      i.SplineLength = s.GetSplineLength();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "[SceneItemGuidePathComponent.LoadPathAsset] Spline生成失败", ["SplineEntityId", e]);
    }
  }
  ClearQuestTraceEffect(e) {
    this.zoo.delete(e);
  }
  aoe(e, t) {
    if (!GuideEffectAssistant.uoe) {
      const i = UE.NewObject(UE.TraceLineElement.StaticClass());
      i.bIsSingle = true;
      i.bIgnoreSelf = true;
      i.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
      GuideEffectAssistant.uoe = i;
    }
    const i = GuideEffectAssistant.uoe;
    i.WorldContextObject = t;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, e);
    i.SetEndLocation(e.X, e.Y, e.Z - TRACE_DISTANCE);
    var t = TraceElementCommon_1.TraceElementCommon.LineTrace(i, PROFILE_KEY);
    var s = i.HitResult;
    if (t) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(s, 0, e);
    } else {
      i.SetEndLocation(e.X, e.Y, e.Z + TRACE_DISTANCE);
      if (TraceElementCommon_1.TraceElementCommon.LineTrace(i, PROFILE_KEY)) {
        s = i.HitResult;
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(s, 0, e);
      }
    }
  }
  AddQuestTraceEffect(e, t, i) {
    var s = new EffectData();
    let n = new Map();
    if (this.zoo.has(e)) {
      n = this.zoo.get(e);
    } else {
      this.zoo.set(e, n);
    }
    n.set(i, s);
    s.Duration = t;
    this.lro(i, s);
  }
  RemoveQuestTraceEffect(e, t) {
    var i;
    var e = this.zoo.get(e);
    if (e !== undefined && (i = e.get(t)) !== undefined) {
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(t, t);
      this.sro(i);
      e.delete(t);
    }
  }
}
(exports.GuideEffectAssistant = GuideEffectAssistant).uoe = undefined;
//# sourceMappingURL=GuideEffectAssistant.js.map