"use strict";

var SceneItemGuidePathComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var h = arguments.length;
  var n = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (o = t[r]) {
        n = (h < 3 ? o(n) : h > 3 ? o(e, i, n) : o(e, i)) || n;
      }
    }
  }
  if (h > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemGuidePathComponent = exports.SCAN_SKILL_ID = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelGamePlayUtils_1 = require("../../LevelGamePlay/LevelGamePlayUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const colorString = FNameUtil_1.FNameUtil.GetDynamicFName("Color");
const colorRed = new UE.LinearColor(12, 2, 2, 1);
const colorBlue = new UE.LinearColor(6, 8, 15, 1);
const colorYellow = new UE.LinearColor(12, 8, 4, 1);
const finishTag = 1298716444;
const activatedTag = -3775711;
const normalTag = -1152559349;
exports.SCAN_SKILL_ID = 210004;
let SceneItemGuidePathComponent = SceneItemGuidePathComponent_1 = class SceneItemGuidePathComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Hte = undefined;
    this.Lie = undefined;
    this.tfn = undefined;
    this.md = undefined;
    this.sxr = undefined;
    this.ifn = undefined;
    this.ofn = 0;
    this.rfn = 0;
    this.dce = false;
    this.r$t = false;
    this.rvi = 0;
    this.nfn = undefined;
    this.sfn = undefined;
    this.afn = undefined;
    this.hfn = undefined;
    this.lfn = false;
    this._fn = 0;
    this.Joo = undefined;
    this._0e = 0;
    this.zie = undefined;
    this.qIc = undefined;
    this.ufn = new Map();
    this.cfn = (t, e = false) => {
      if (!this.lfn || !!e) {
        if (this.dce) {
          this.mfn(t);
        } else {
          this.dfn(false, () => {
            this.mfn(t);
          });
        }
      }
    };
    this.ero = (t, e) => {
      if (e === exports.SCAN_SKILL_ID && t === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() && !(e = Global_1.Global.BaseCharacter?.CharacterActorComponent, t = Vector_1.Vector.Create(e?.ActorLocationProxy), e = Vector_1.Vector.Create(this.Hte?.ActorLocationProxy), Vector_1.Vector.Distance(t, e) > this._fn)) {
        t = this.Entity.GetComponent(0);
        e = LevelGamePlayUtils_1.LevelGamePlayUtils.GetScanCompositeResult(t);
        this.cfn(e.Interval, true);
      }
    };
    this.g_n = (t, e) => {
      if (t === 1298716444) {
        this.r$t = true;
        if (Info_1.Info.EnableForceTick) {
          this.Cfn(1, true);
        } else {
          this.tfn.HasFinishTag = true;
        }
      } else if (t === -3775711) {
        this.dce = true;
        if (!Info_1.Info.EnableForceTick) {
          this.tfn.HasActiveTag = true;
        }
        this.dfn(true);
      } else if (t === -1152559349 && (this.r$t && (this.r$t = false, Info_1.Info.EnableForceTick || (this.tfn.HasFinishTag = false)), this.dce)) {
        this.dce = false;
        if (!Info_1.Info.EnableForceTick) {
          this.tfn.HasActiveTag = false;
        }
      }
    };
    this.gfn = (t, e) => {
      if (!Info_1.Info.EnableForceTick && t === 5) {
        this.sxr = this.Disable("[SceneItemGuidePathComponent.OnEffectFinish] 特效加载完成，由C++组件接管tick");
        const i = EffectSystem_1.EffectSystem.GetNiagaraComponent(e);
        this.tfn.NiagaraComponent = EffectSystem_1.EffectSystem.GetSureNiagaraComponent(e);
        this.qIc = TimerSystem_1.TimerSystem.Delay(() => {
          var t;
          this.qIc = undefined;
          if (this.H51()) {
            this.tfn.StartTick(this.sfn, this.afn, this.hfn, colorString, this.rfn / 1000, this.ofn / 1000);
          }
          if (this.Joo === IComponent_1.EEffectSplineCreateMode.EquidistantPoint) {
            t = Math.ceil(this.zie.GetSplineLength() / this._0e);
            i.SetIntParameter(new UE.FName("SpawnCount"), t);
          }
        }, 100);
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemGuidePathComponent_1)[0];
    this.Lo = t;
    if (this.Lo.ColorChangeOption !== undefined) {
      switch (this.Lo.ColorChangeOption.Type) {
        case IComponent_1.EColorChangeStrategyOfSplineEffect.RGB:
          if (this.ffn(this.Lo.ColorChangeOption)) {
            break;
          }
          return false;
      }
    }
    if (this.Lo.ScanOption !== undefined) {
      this.lfn = true;
      this._fn = this.Lo.ScanOption.ResponseRange;
    }
    return true;
  }
  ffn(t) {
    var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.RedState);
    if (this.ufn.has(e)) {
      return false;
    }
    this.ufn.set(e, colorRed);
    e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.YellowState);
    if (this.ufn.has(e)) {
      return false;
    }
    this.ufn.set(e, colorYellow);
    e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.BlueState);
    return !this.ufn.has(e) && (this.ufn.set(e, colorBlue), this.sfn = this.ufn.get(normalTag), this.hfn = this.ufn.get(finishTag), this.afn = this.sfn.op_Subtraction(this.ufn.get(activatedTag)), true);
  }
  OnActivate() {
    this.Hte = this.Entity.GetComponent(1);
    this.Lie = this.Entity.GetComponent(196);
    this.sxr = this.Disable("[SceneItemGuidePathComponent.OnActivate] 默认Disable");
    if (!Info_1.Info.EnableForceTick) {
      this.tfn = this.Hte.Owner.GetComponentByClass(UE.KuroSceneItemGuidePathComponent.StaticClass());
      if (!this.tfn?.IsValid()) {
        this.tfn = this.Hte.Owner.AddComponentByClass(UE.KuroSceneItemGuidePathComponent.StaticClass(), false, new UE.Transform(), false);
      }
      this.tfn.SetComponentTickEnabled(false);
    }
    this.pfn();
    return true;
  }
  vfn() {
    var t = (this.Entity?.GetComponent(0)).GetPbEntityInitData();
    var t = (0, IComponent_1.getComponent)(t.ComponentsData, "EntityStateComponent").StateChangeBehaviors;
    if (t?.length > 0 && (t = t[0].DelayChangeState)) {
      this.rfn = t.Time * TimeUtil_1.TimeUtil.InverseMillisecond;
    }
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnScanStart, this.cfn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnScanStart, this.cfn);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharUseSkill, this.ero)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.ero);
    }
    if (this.md?.IsValid()) {
      this.Mfn();
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(this.Lo.SplineEntityId, this.Entity.GetComponent(0).GetPbDataId());
    }
    if (this.qIc) {
      TimerSystem_1.TimerSystem.Remove(this.qIc);
    }
    return true;
  }
  OnTick(t) {
    if (Info_1.Info.EnableForceTick) {
      this.Efn(t);
    }
  }
  OnForceTick(t) {
    this.Efn(t);
  }
  Efn(e) {
    if (this.r$t) {
      this.Cfn(1, true);
    } else {
      let t = this.dce ? 1 : 0;
      if (!this.dce && this.rfn !== 0) {
        this.ofn -= e;
        this.ofn = this.ofn <= 0 ? 0 : this.ofn;
        t = this.ofn / this.rfn;
      }
      this.Cfn(t, false);
    }
  }
  pfn() {
    var t;
    var e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.Lo.SplineEntityId);
    if (e) {
      if (t = (0, IComponent_1.getComponent)(e.ComponentsData, "SplineComponent")) {
        if (t.Option.Type !== IComponent_1.ESplineType.Effect) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Level", 31, "[SceneItemGuidePathComponent.LoadPathAsset] SplineComponent配置类型不是Effect", ["SplineEntityId", this.Lo.SplineEntityId]);
          }
        } else {
          this.zie = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(this.Lo.SplineEntityId, this.Entity.GetComponent(0).GetPbDataId());
          this.Joo = t.Option.CreateOption.Type;
          if (t.Option.CreateOption.Type === IComponent_1.EEffectSplineCreateMode.EquidistantPoint) {
            this._0e = t.Option.CreateOption.Space;
          }
          t = Vector_1.Vector.Create(e.Transform?.Pos.X ?? 0, e.Transform?.Pos.Y ?? 0, e.Transform?.Pos.Z ?? 0);
          this.md = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(this.Lo.SplineEntityId);
          this.md.D_K2_SetActorLocation(t.ToUeVector(), false, undefined, false);
          if (this.Entity.GetComponent(0).GetBaseInfo()?.ScanFunction?.ScanId) {
            EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnScanStart, this.cfn);
          } else {
            this.szr();
          }
          if (this.lfn) {
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.ero);
          }
          if (this.Lo.ColorChangeOption) {
            EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
            this.vfn();
            this.Sfn();
          }
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Level", 31, "[SceneItemGuidePathComponent.LoadPathAsset] 无法找到SplineComponent配置", ["SplineEntityId", this.Lo.SplineEntityId]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Level", 31, "[SceneItemGuidePathComponent.LoadPathAsset] 无法找到Spline Entity", ["SplineEntityId", this.Lo.SplineEntityId]);
    }
  }
  dfn(e = false, i = undefined) {
    var t = Protocol_1.Aki.Protocol.Ems.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(this.Hte.CreatureData.GetCreatureDataId());
    Net_1.Net.Call(19524, t, t => {
      if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 25988);
      }
      this.ofn = t.ZLs;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 31, "response", ["entityID", t.F4n], ["resetTime", t.ZLs]);
      }
      if (e && this.tfn?.IsValid() && this.H51()) {
        this.tfn.StartTick(this.sfn, this.afn, this.hfn, colorString, this.rfn / 1000, this.ofn / 1000);
      }
      if (i !== undefined) {
        i();
      }
    });
  }
  Sfn() {
    if (this.Lie.HasTag(-3775711)) {
      this.dce = true;
      if (!Info_1.Info.EnableForceTick) {
        this.tfn.HasActiveTag = true;
      }
    }
    if (this.Lie.HasTag(1298716444)) {
      this.r$t = true;
      if (!Info_1.Info.EnableForceTick) {
        this.tfn.HasFinishTag = true;
      }
    }
  }
  mfn(t) {
    this.szr();
    if (this.sxr !== undefined) {
      this.Enable(this.sxr, "SceneItemGuidePathComponent.ShowGuidePath");
    }
    if ((this.sxr = undefined) !== this.ifn) {
      TimerSystem_1.TimerSystem.Remove(this.ifn);
      this.ifn = undefined;
    }
    this.ifn = TimerSystem_1.TimerSystem.Delay(() => {
      this.Mfn();
      if (this.sxr === undefined) {
        this.sxr = this.Disable("[SceneItemGuidePathComponent.ShowGuidePath] 超时触发Disable");
      }
      this.ifn = undefined;
    }, t * TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  Mfn() {
    if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
      if (!Info_1.Info.EnableForceTick) {
        this.tfn.SetComponentTickEnabled(false);
      }
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[SceneItemGuidePathComponent.HideEffect]", false);
      this.rvi = 0;
    }
  }
  szr() {
    if (!this.rvi) {
      this.NQt();
    }
  }
  Cfn(t, e) {
    let i = undefined;
    i = e ? this.hfn : this.sfn.op_Subtraction(this.afn.op_Multiply(t));
    if (!this.nfn?.IsValid()) {
      this.yfn();
    }
    this.nfn?.SetColorParameter(colorString, i);
  }
  NQt() {
    var t = this.md.SplineData;
    this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.Hte.ActorTransform, t.Effect, "[SceneItemGuidePathComponent.SpawnEffect]", new EffectContext_1.EffectContext(this.Entity.Id), 3, undefined, this.gfn);
    if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
      EffectSystem_1.EffectSystem.GetEffectActor(this.rvi).K2_AttachToActor(this.md, undefined, 2, 2, 2, false);
    }
    this.yfn();
  }
  yfn() {
    if (EffectSystem_1.EffectSystem.IsValid(this.rvi) && (this.nfn = EffectSystem_1.EffectSystem.GetNiagaraComponent(this.rvi), this.nfn?.IsValid())) {
      this.nfn.bForceSolo = true;
    }
  }
  H51() {
    return this.Lo.ColorChangeOption !== undefined;
  }
};
SceneItemGuidePathComponent = SceneItemGuidePathComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(153)], SceneItemGuidePathComponent);
exports.SceneItemGuidePathComponent = SceneItemGuidePathComponent; //# sourceMappingURL=SceneItemGuidePathComponent.js.map