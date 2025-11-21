"use strict";

var RenderMaskComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var a = arguments.length;
  var r = a < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
        r = (a < 3 ? o(r) : a > 3 ? o(e, i, r) : o(e, i)) || r;
      }
    }
  }
  if (a > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderMaskComponent = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RenderDataManager_1 = require("../../../../Render/Data/RenderDataManager");
const ColorUtils_1 = require("../../../../Utils/ColorUtils");
const MAX_SPEED = 600;
let RenderMaskComponent = RenderMaskComponent_1 = class RenderMaskComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Jnl = false;
    this.Znl = 0;
    this.bsr = undefined;
    this.esl = false;
    this.tsl = undefined;
    this.fll = 0;
    this.vll = "";
    this.Hte = undefined;
    this.DebugMode = false;
    this.FollowEntity = undefined;
    this.Yrc = false;
    this.f11 = undefined;
    this.kRe = undefined;
    this.g11 = undefined;
    this._un = undefined;
  }
  OnInitData(t) {
    t = t.GetParam(RenderMaskComponent_1)[0];
    this.Lo = t;
    if (!this.Lo) {
      return false;
    }
    switch (this.Lo.RenderConfig.Type) {
      case IComponent_1.ERenderSpecifiedRangeType.FlowerBridge:
        this.Znl = this.Lo.RenderConfig.Radius;
        this.tsl = FNameUtil_1.FNameUtil.GetDynamicFName("PCG_FlowerBridge");
        this.vll = (0, AudioSystem_1.parseAudioEventPath)(this.Lo.RenderConfig.AkEvent);
        this.Yrc = true;
        break;
      case IComponent_1.ERenderSpecifiedRangeType.BookPage:
        this.Znl = this.Lo.RenderConfig.Radius;
        this.vll = (0, AudioSystem_1.parseAudioEventPath)(this.Lo.RenderConfig.AkEvent);
        break;
      case IComponent_1.ERenderSpecifiedRangeType.FogBarrier:
        this.f11 = Vector_1.Vector.Create();
        this.f11.FromConfigVector(this.Lo.RenderConfig.Size);
        this.f11.MultiplyEqual(2);
    }
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(1);
    if (this.Lo?.RenderConfig.Type === IComponent_1.ERenderSpecifiedRangeType.FlowerBridge) {
      this.bsr = UE.NewObject(UE.TraceSphereElement.StaticClass());
      this.bsr.bIsSingle = false;
      this.bsr.bTraceComplex = false;
      this.bsr.bIgnoreSelf = true;
      this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
      this.bsr.Radius = this.Znl;
      this.bsr.WorldContextObject = GlobalData_1.GlobalData.World;
    }
    return true;
  }
  OnEnd() {
    this.isl();
    if (this.bsr) {
      this.bsr.Dispose();
      this.bsr = undefined;
    }
    return true;
  }
  OnDisable(t) {
    this.isl();
  }
  OnEnable() {
    this.rsl();
  }
  OnTick(t) {
    var e = this.osl();
    var i = this.Jnl !== e;
    if (e) {
      this.C11();
      if (this.nsl()) {
        this.Jnl = e;
        this.rsl();
        this.Cl();
        return;
      } else {
        this.isl();
        return;
      }
    }
    if (i) {
      this.Jnl = e;
      this.isl();
    }
  }
  rsl() {
    if (!this.esl) {
      var t = this.p11();
      if (t?.IsValid()) {
        switch (this.Lo?.RenderConfig.Type) {
          case IComponent_1.ERenderSpecifiedRangeType.FlowerBridge:
          case IComponent_1.ERenderSpecifiedRangeType.BookPage:
            var e = UE.KismetMaterialLibrary.GetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), t, FNameUtil_1.FNameUtil.GetDynamicFName("FlowerBridge_Radius"));
            UE.KuroMaterialParameterCollectionManager.SetScalarParameterValueTimeCurve(GlobalData_1.GlobalData.GameInstance.GetWorld(), t, FNameUtil_1.FNameUtil.GetDynamicFName("FlowerBridge_Radius"), this.Znl, e, 0.4, GlobalData_1.GlobalData.GameInstance.GetWorld(), false);
            break;
          case IComponent_1.ERenderSpecifiedRangeType.FogBarrier:
            UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), t, FNameUtil_1.FNameUtil.GetDynamicFName("WidthHeight"), UE.KismetMathLibrary.Conv_VectorDoubleToLinearColor(this.f11.ToUeVector()));
            break;
          default:
            return;
        }
        if (!this.fll && !!this.Hte && !StringUtils_1.StringUtils.IsEmpty(this.vll)) {
          this.fll = AudioSystem_1.AudioSystem.PostEvent(this.vll, this.Hte.Owner);
        }
        this.esl = true;
      }
    }
  }
  isl() {
    if (this.esl) {
      var t = this.p11();
      if (t?.IsValid()) {
        switch (this.Lo?.RenderConfig.Type) {
          case IComponent_1.ERenderSpecifiedRangeType.FlowerBridge:
          case IComponent_1.ERenderSpecifiedRangeType.BookPage:
            var e = UE.KismetMaterialLibrary.GetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), t, FNameUtil_1.FNameUtil.GetDynamicFName("FlowerBridge_Radius"));
            UE.KuroMaterialParameterCollectionManager.SetScalarParameterValueTimeCurve(GlobalData_1.GlobalData.GameInstance.GetWorld(), t, FNameUtil_1.FNameUtil.GetDynamicFName("FlowerBridge_Radius"), 0, e, 0.4, GlobalData_1.GlobalData.GameInstance.GetWorld(), false);
            break;
          case IComponent_1.ERenderSpecifiedRangeType.FogBarrier:
            UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), t, FNameUtil_1.FNameUtil.GetDynamicFName("WidthHeight"), UE.KismetMathLibrary.Conv_VectorToLinearColor(Vector_1.Vector.ZeroVector));
            break;
          default:
            return;
        }
        if (this.fll) {
          AudioSystem_1.AudioSystem.ExecuteAction(this.fll, 0);
          this.fll = 0;
        }
        this.esl = false;
      }
    }
  }
  Cl() {
    var t;
    var e;
    if (this.p11()?.IsValid() && (t = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity)) {
      if ((t = t.Entity?.GetComponent(182)) && this.Yrc) {
        e = MathUtils_1.MathUtils.RangeClamp(t.Speed, 0, MAX_SPEED, 0, 1);
        if (this.DebugMode && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneGameplay", 7, "RenderMaskComponent", ["CurSpeed", t.Speed], ["RtpcValue", e]);
        }
        AudioSystem_1.AudioSystem.SetRtpcValue("interact_level_chun_huaqiao", e);
      }
      this.C11();
    }
  }
  nsl() {
    if (this.Lo?.RenderConfig.Type !== IComponent_1.ERenderSpecifiedRangeType.FlowerBridge) {
      return true;
    }
    if (this.bsr?.IsValid() && Global_1.Global.BaseCharacter?.IsValid() && this.tsl) {
      this.bsr.HitResult?.Clear();
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, Global_1.Global.BaseCharacter?.D_K2_GetActorLocation());
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, Global_1.Global.BaseCharacter?.D_K2_GetActorLocation());
      var t = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.bsr, "RenderMaskComponent.RangeCheck");
      if (!t) {
        return t;
      }
      var e = this.bsr.HitResult.GetHitCount() ?? 0;
      for (let t = 0; t < e; ++t) {
        var i = this.bsr.HitResult?.Actors?.Get(t)?.Tags.Contains(this.tsl);
        if (i) {
          return i;
        }
      }
    }
    return false;
  }
  osl() {
    var t;
    return !this._un?.IsLocked && (!(t = this.Lo?.Condition) || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(t, undefined, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id)));
  }
  ToggleDebugMode(t) {
    if (Info_1.Info.IsBuildDevelopmentOrDebug && (this.DebugMode = t, this.bsr)) {
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.bsr, ColorUtils_1.ColorUtils.LinearGreen);
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.bsr, ColorUtils_1.ColorUtils.LinearRed);
      this.bsr.SetDrawDebugTrace(this.DebugMode ? 1 : 0);
    }
  }
  C11() {
    var t = this.p11();
    if (t?.IsValid() && (this.FollowEntity && this.FollowEntity.Valid || (this.aGl(), this.FollowEntity))) {
      var e = this.FollowEntity.GetComponent(1);
      if (e) {
        switch (this.Lo?.RenderConfig.Type) {
          case IComponent_1.ERenderSpecifiedRangeType.FlowerBridge:
          case IComponent_1.ERenderSpecifiedRangeType.BookPage:
            UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), t, FNameUtil_1.FNameUtil.GetDynamicFName("FlowerBridge_CenterPosition"), UE.KismetMathLibrary.Conv_VectorDoubleToLinearColor(e.ActorLocationProxy.ToUeVector()));
            break;
          case IComponent_1.ERenderSpecifiedRangeType.FogBarrier:
            this.kRe ||= Vector_1.Vector.Create();
            this.g11 ||= Quat_1.Quat.Create();
            MathUtils_1.MathUtils.CommonTempRotator.Set(this.Lo.RenderConfig.Rotator?.Y ?? 0, this.Lo.RenderConfig.Rotator?.Z ?? 0, this.Lo.RenderConfig.Rotator?.X ?? 0);
            e.ActorRotationProxy.Quaternion().Multiply(MathUtils_1.MathUtils.CommonTempRotator.Quaternion(), this.g11);
            MathUtils_1.MathUtils.CommonTempVector.FromConfigVector(this.Lo.RenderConfig.Center);
            this.g11.RotateVector(MathUtils_1.MathUtils.CommonTempVector, this.kRe);
            this.kRe.AdditionEqual(e.ActorLocationProxy);
            var i = this.kRe.ToUeVector();
            var s = this.g11.GetForwardVector(MathUtils_1.MathUtils.CommonTempVector).ToUeVectorOld();
            UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), t, FNameUtil_1.FNameUtil.GetDynamicFName("CenterPoint"), UE.KismetMathLibrary.Conv_VectorDoubleToLinearColor(i));
            UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), t, FNameUtil_1.FNameUtil.GetDynamicFName("ForwardVector"), UE.KismetMathLibrary.Conv_VectorToLinearColor(s));
            if (this.DebugMode) {
              UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.World, this.kRe.ToUeVector(), this.f11.Multiply(0.5, MathUtils_1.MathUtils.CommonTempVector).ToUeVector(), ColorUtils_1.ColorUtils.LinearRed, this.g11.Rotator().ToUeRotator(), 1, 1);
            }
        }
      }
    }
  }
  aGl() {
    var t = this.Lo?.RenderConfig;
    switch (t.CenterTarget.Type) {
      case "Player":
        this.FollowEntity = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
        break;
      case "Self":
        this.FollowEntity = this.Entity;
        break;
      case "Target":
        this.FollowEntity = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(t.CenterTarget.EntityId)?.Entity;
    }
  }
  p11() {
    let t = undefined;
    switch (this.Lo?.RenderConfig.Type) {
      case IComponent_1.ERenderSpecifiedRangeType.FlowerBridge:
      case IComponent_1.ERenderSpecifiedRangeType.BookPage:
        t = RenderDataManager_1.RenderDataManager.Get().GetSceneInteractionMaterialParameterCollection();
        break;
      case IComponent_1.ERenderSpecifiedRangeType.FogBarrier:
        t = RenderDataManager_1.RenderDataManager.Get().GetGroundFogMaskMaterialParameterCollection();
    }
    if (t?.IsValid()) {
      return t;
    }
  }
};
RenderMaskComponent = RenderMaskComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(259)], RenderMaskComponent);
exports.RenderMaskComponent = RenderMaskComponent; //# sourceMappingURL=RenderMaskComponent.js.map