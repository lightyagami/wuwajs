"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var r = arguments.length;
  var a = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (h = t[o]) {
        a = (r < 3 ? h(a) : r > 3 ? h(e, i, a) : h(e, i)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceCameraPlayerComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const Log_1 = require("../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../GameSettings/GameSettingsManager");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
const UiLayerType_1 = require("../Ui/Define/UiLayerType");
const UiLayer_1 = require("../Ui/UiLayer");
const CameraModel_1 = require("./CameraModel");
const CameraUtility_1 = require("./CameraUtility");
const PROFILE_KEY1 = "SequenceCameraPlayerComponent_CheckCameraLocation";
const PROFILE_KEY2 = "SequenceCameraPlayerComponent_ProcessHideShelterCharacter";
const SEQUENCE_CAMERA = new UE.FName("SequenceCamera");
const ROLE_TAG = new UE.FName("Role");
const RELATIVE_LENGTH = 10000;
let SequenceCameraPlayerComponent = class SequenceCameraPlayerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ZPr = undefined;
    this._sr = UE.NewArray(UE.Actor);
    this.nZo = undefined;
    this.exr = undefined;
    this.vxr = -0;
    this.uAo = -0;
    this.Mxr = 1;
    this.Exr = 1;
    this.Sxr = 1;
    this.yxr = -0;
    this.Ixr = undefined;
    this.rRe = undefined;
    this.Txr = undefined;
    this.Lxr = undefined;
    this.Dxr = false;
    this.Rxr = false;
    this.Uxr = 0;
    this.GPe = UE.NewArray(UE.Actor);
    this.Axr = UE.NewArray(UE.Actor);
    this.wxr = undefined;
    this.Bxr = false;
    this.Mth = undefined;
    this.Sth = false;
    this.sor = undefined;
    this.Tae = undefined;
    this.bxr = undefined;
    this.qxr = undefined;
    this.Gxr = undefined;
    this.g1t = FNameUtil_1.FNameUtil.EMPTY;
    this.Nxr = FNameUtil_1.FNameUtil.EMPTY;
    this.Oxr = undefined;
    this.kxr = Vector_1.Vector.Create(RELATIVE_LENGTH, RELATIVE_LENGTH, RELATIVE_LENGTH);
    this.Fxr = false;
    this.Vxr = 0;
    this.hQa = true;
    this.xKd = false;
    this.Hxr = true;
    this.dCm = new Set();
    this.Lz = Vector_1.Vector.Create();
    this.Fse = undefined;
    this.jxr = undefined;
    this.Wxr = false;
    this.Wse = Vector_1.Vector.Create();
    this.Kxr = Vector_1.Vector.Create();
    this.ZHa = Rotator_1.Rotator.Create();
    this.mCm = Rotator_1.Rotator.Create();
    this.Qxr = undefined;
    this.Xxr = Vector_1.Vector.Create();
    this.$xr = Vector_1.Vector.Create();
    this.Yxr = Vector_1.Vector.Create();
    this.I7 = Vector_1.Vector.Create();
  }
  get IsDitherEffectEnabled() {
    return this.dCm.size > 0;
  }
  SetPlayCameraSequenceEnabled(t) {
    this.Hxr = t;
  }
  SetPawn(t) {
    if (t instanceof TsBaseCharacter_1.default) {
      this.SetCharacter(t);
    }
  }
  SetCharacter(t) {
    if (this.bxr?.IsValid()) {
      this.bxr = t;
    } else {
      this.Tae = t;
    }
  }
  PlayCameraSequence(t, e, i, s, h, r, a, o, n, _ = false, l = true, m = true, E = false, C = false, c = undefined) {
    if (!this.Hxr) {
      return false;
    }
    if (this.Dxr) {
      if (!this.Jxr(this.Tae, s)) {
        return false;
      }
      this.StopSequence();
    }
    if (this.ZPr.CineCamera.GetAttachParentActor()) {
      this.ZPr.CineCamera.K2_DetachFromActor();
    }
    this.Fxr = n;
    if (a) {
      this.kxr.FromUeVector(a);
    } else {
      this.kxr.Set(RELATIVE_LENGTH, RELATIVE_LENGTH, RELATIVE_LENGTH);
    }
    this.Vxr = o;
    this.bxr = this.Tae;
    this.Tae = s;
    this.Nxr = r;
    this.g1t = h;
    if (!FNameUtil_1.FNameUtil.IsEmpty(this.g1t)) {
      if (!this.Oxr?.IsValid() && !(this.Oxr = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble), this.Oxr.K2_GetRootComponent())) {
        this.Oxr.D_AddComponentByClass(UE.SceneComponent.StaticClass(), false, this.Oxr.D_GetTransform(), false);
      }
      this.Oxr.K2_AttachToComponent(this.Tae.Mesh, this.g1t, 2, 2, 2, false);
    }
    this.zxr(t, l, m, c);
    n = this.S9e(C, _);
    this.Bxr = e;
    this.wxr = i;
    if (n && (this.GQe(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSequenceCameraStatus, true), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DelaySetNearClipPlane 1"), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Camera", 38, "进入Sequence相机，最小近裁面"), E)) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.Amount 0");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayCameraLevelSequence, t.CameraSequence, s, this.exr, CameraUtility_1.CameraUtility.GetRootTransform(s));
    return n;
  }
  StopSequence() {
    this.Zxr();
  }
  SetBlendTime(t, e) {
    this.Exr = t;
    this.Sxr = e;
  }
  GetCurrentLevelSequenceActor() {
    return this.exr;
  }
  GetIsInCinematic() {
    return this.Dxr;
  }
  ResetCameraRatioSetting() {
    var t;
    var e = this.ZPr?.CineCamera?.GetCineCameraComponent();
    if (e) {
      if (t = e.GetDefaultFilmbackPresetName()) {
        e.SetFilmbackPresetByName(t);
      }
      e.bConstrainAspectRatio = false;
    }
  }
  OnStart() {
    this.ewr();
    this.ZPr = this.Entity.GetComponent(9);
    return this.ZPr.Valid;
  }
  ewr() {
    this.qxr = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.qxr.bIsSingle = true;
    this.qxr.bIgnoreSelf = true;
    this.qxr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
    this.Gxr = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Gxr.bIsSingle = false;
    this.Gxr.bIgnoreSelf = true;
    this.Gxr.ActorsToIgnore = this._sr;
    this.Gxr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn);
    this.Gxr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer);
    this.Gxr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
    this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Fse.bIsSingle = true;
    this.Fse.bIgnoreSelf = true;
    this.Fse.bTraceComplex = true;
    this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
    this.jxr = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.jxr.bIsSingle = true;
    this.jxr.bIgnoreSelf = true;
    this.jxr.bTraceComplex = true;
    if (this.Fxr) {
      this.jxr.DrawTime = 5;
      this.jxr.SetDrawDebugTrace(2);
    }
    this.jxr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
  }
  OnEnd() {
    this.ZPr = undefined;
    this.GPe.Empty();
    if (this.exr) {
      this.exr.SequencePlayer?.OnStop.Clear();
      const t = this.exr;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("SequenceCameraPlayerComponent.OnEnd", t);
      });
      this.exr = undefined;
    }
    this.nZo = undefined;
    this.Ixr = undefined;
    this.rRe = undefined;
    this.Txr = undefined;
    this.Lxr = undefined;
    this.Exr = 1;
    this.Sxr = 1;
    this.xKd = false;
    this.Dxr = false;
    if (this.Rxr) {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(2);
      UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Float, true, "SeqCamera");
      UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Pop, true, "SeqCamera");
      UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Guide, true, "SeqCamera");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCameraSequenceSetUiVisible, true);
    }
    return true;
  }
  OnAfterTick(t) {
    if (this.exr) {
      if (!this.Tae?.IsValid() || !this.nwr()?.IsValid()) {
        this.StopSequence();
        return;
      }
      var e = this.Tae.GetEntityIdNoBlueprint();
      if (!e || !EntitySystem_1.EntitySystem.Get(e)) {
        this.StopSequence();
        return;
      }
    }
    if (this.Ixr && this.rRe && this.Txr) {
      this.twr();
      this.iwr();
      this.vxr += t * MathUtils_1.MathUtils.MillisecondToSecond * this.Mxr;
      this.exr.SequencePlayer.PlayToSeconds(this.vxr);
      this.fCm();
      this.owr();
      this.CheckCollision(false);
      this.gCm();
      if (this.vxr >= this.uAo) {
        this.Zxr();
      } else if (this.Rxr && this.Uxr > 0 && this.vxr >= this.Uxr) {
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(2);
        UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Float, true, "SeqCamera");
        UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Pop, true, "SeqCamera");
        UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Guide, true, "SeqCamera");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCameraSequenceSetUiVisible, true);
        this.Rxr = false;
      }
    } else if (this.yxr) {
      this.yxr = Math.max(0, this.yxr - t * MathUtils_1.MathUtils.MillisecondToSecond);
      this.fCm();
      this.CheckCollision(true);
    }
  }
  iwr() {
    this.Mxr = this.Tae?.GetEntityNoBlueprint()?.GetComponent(126)?.CurrentTimeScale ?? 1;
  }
  nwr() {
    return this.sor ?? ControllerHolder_1.ControllerHolder.CameraController.GetCharacter();
  }
  zxr(t, e = true, i = true, s = undefined) {
    var h;
    this.hQa = true;
    this.Exr = t.BlendInTime;
    this.Sxr = t.BlendOutTime;
    this.xKd = t.NeedWaitInPlot;
    this.nZo = t.CameraSequence;
    if (this.nZo) {
      this.ResetCameraRatioSetting();
      this.ZPr?.CineCamera?.ResetSeqCineCamSetting();
      (h = new UE.MovieSceneSequencePlaybackSettings()).bDisableMovementInput = e;
      h.bDisableLookAtInput = i;
      this.exr = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined, false);
      this.exr.PlaybackSettings = h;
      this.exr.SetSequence(this.nZo);
      e = this.exr.SequencePlayer.GetStartTime();
      this.vxr = (e.Time.FrameNumber.Value + e.Time.SubFrame) * e.Rate.Denominator / e.Rate.Numerator;
      i = this.exr.SequencePlayer.GetEndTime();
      this.uAo = (i.Time.FrameNumber.Value + i.Time.SubFrame) * i.Rate.Denominator / i.Rate.Numerator;
      if (t.EnableSpecificSequenceTime) {
        this.uAo = Math.min(this.uAo, t.SpecificSequenceTime);
      }
      this.Sth = false;
      if (s && (this.uAo = Math.min(this.uAo, s.OverrideSequenceTime), this.Sxr = s.OverrideBlendOutTime, s.IsRecoverRotation)) {
        this.Sth = true;
        this.Mth ||= new UE.Rotator();
        h = ControllerHolder_1.ControllerHolder.CameraController.CameraRotator;
        this.Mth.Pitch = h.Pitch;
        this.Mth.Yaw = h.Yaw;
        this.Mth.Roll = h.Roll;
      }
      this.qxr.WorldContextObject = GlobalData_1.GlobalData.World;
      this.Gxr.WorldContextObject = GlobalData_1.GlobalData.World;
      this.swr();
    }
  }
  GQe(t) {
    this.Rxr = t.IsHideHud;
    if (this.Rxr) {
      this.Uxr = t.HideHudTime;
      var e = t.VisibleChild;
      var i = e.Num();
      if (i <= 0) {
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(2);
      } else {
        var s = [];
        for (let t = 0; t < i; t++) {
          s.push(e.Get(t));
        }
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(2, s);
      }
      UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Float, false, "SeqCamera");
      UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Pop, false, "SeqCamera");
      UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Guide, false, "SeqCamera");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCameraSequenceSetUiVisible, false);
    }
  }
  swr() {
    if (this.exr && (this.GPe.Add(this.ZPr.CineCamera), this.exr.SetBindingByTag(SEQUENCE_CAMERA, this.GPe, false), this.GPe.Empty(), this.Tae)) {
      this.Axr.Add(this.Tae);
      this.exr.SetBindingByTag(ROLE_TAG, this.Axr, false);
      this.Axr.Empty();
    }
  }
  S9e(t, e) {
    let i = false;
    if ((t || !this.awr(e) && !this.CheckSphereCollision()) && this.hwr()) {
      this.lwr();
      i = true;
    } else {
      this.Zxr();
    }
    return i;
  }
  awr(t) {
    var e = UE.KuroStaticLibrary.GetSequenceTracksForObjectBindingID(this.exr, SEQUENCE_CAMERA);
    var e = UE.KuroStaticLibrary.GetTrackByClass(e, UE.MovieScene3DTransformTrack.StaticClass());
    if (!e) {
      return false;
    }
    var e = UE.KuroStaticLibrary.D_GetFirstLocationFromSeqTrack(e);
    var i = this.nwr();
    var e = CameraUtility_1.CameraUtility.GetRootTransform(i).TransformPosition(e);
    this.qxr.Radius = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CollisionProbeSize;
    this.qxr.ActorsToIgnore.Empty();
    if (t) {
      this.qxr.ActorsToIgnore.Add(ControllerHolder_1.ControllerHolder.CameraController.GetCharacter());
    }
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.qxr, e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.qxr, e);
    var t = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.qxr, PROFILE_KEY1);
    if (t && this.qxr.HitResult?.Actors?.Get(0) === i) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Camera", 57, "Seq相机初始位置与角色碰撞，请检查Seq的相机初始位置");
      }
      return false;
    }
    return t;
  }
  hwr() {
    if (!this.nZo) {
      return false;
    }
    var t = this.nwr();
    if (!t) {
      return false;
    }
    if (!this.exr) {
      return false;
    }
    var e = t.CharacterActorComponent.Entity.GetComponent(181);
    if (e.Valid) {
      e.StopModelBuffer();
    }
    this.exr.bOverrideInstanceData = true;
    var i = this.exr.DefaultInstanceData;
    if (!i) {
      return false;
    }
    this.Ixr = i;
    this.Txr = CameraUtility_1.CameraUtility.GetRootTransform(t);
    this.Lxr = t?.CharacterActorComponent?.Entity?.GetComponent(45);
    if (e.Valid) {
      i = e.MainAnimInstance;
      if (UE.KuroStaticLibrary.IsObjectClassByName(i, CharacterNameDefines_1.CharacterNameDefines.ANIM_INSTANCE_ROLE)) {
        this.rRe = i;
      }
    } else {
      this.rRe = undefined;
    }
    this.owr();
    t = this.exr.SequencePlayer;
    t.Play();
    t.SetPlayRate(0);
    t.Pause();
    t.JumpToSeconds(this.vxr);
    return true;
  }
  Zxr() {
    if (this.Bxr) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(this.wxr);
      if (this.Sth) {
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(this.Mth);
        this.Sth = false;
      }
    } else {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_GetActorRotation());
    }
    if (ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent?.CameraCollision) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraCollision.IsNpcDitherEnable = true;
    }
    this.Fxr = false;
    this.Dxr = false;
    if (this.Rxr) {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(2);
      UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Float, true, "SeqCamera");
      UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Pop, true, "SeqCamera");
      UiLayer_1.UiLayer.SetLayerRenderable(UiLayerType_1.ELayerType.Guide, true, "SeqCamera");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCameraSequenceSetUiVisible, true);
      this.Rxr = false;
    }
    this.Sxr = this.Wxr ? 0 : this.Sxr;
    ControllerHolder_1.ControllerHolder.CameraController.ExitCameraMode(1, this.Sxr);
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ForceTickOutSide();
    this.yxr = this.Sxr;
    if (this.exr) {
      this.exr.SequencePlayer.Stop();
      this.exr.PlaybackSettings.bDisableMovementInput = false;
      this.exr.PlaybackSettings.bDisableLookAtInput = false;
      const t = this.exr;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("SequenceCameraPlayerComponent.SequenceStopInternal", t);
      });
      this.exr = undefined;
    }
    this.nZo = undefined;
    if (this.Tae?.IsValid()) {
      this.Tae.CharRenderingComponent?.OnFinalizedLevelSequence();
    }
    this.xKd = false;
    this.Ixr = undefined;
    this.rRe = undefined;
    this.Txr = undefined;
    this.sor = undefined;
    if (!FNameUtil_1.FNameUtil.IsEmpty(this.g1t)) {
      if (this.Oxr?.IsValid()) {
        this.Oxr.K2_DetachFromActor(1, 1, 1);
      }
    }
    this.g1t = FNameUtil_1.FNameUtil.EMPTY;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSequenceCameraStatus, false);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DelaySetNearClipPlane " + CameraModel_1.CAMER_DEFAULT_NEAR_CLIP);
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.MOTIONBLUR);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 38, "退出Sequence相机，正常近裁面");
    }
  }
  twr() {
    if (this.Lxr.HasDeltaBaseMovementData) {
      this.Txr.AddToTranslation(this.Lxr.DeltaBaseMovementOffset);
      this.Txr.ConcatenateRotation(this.Lxr.DeltaBaseMovementQuat.ToUeQuat());
    }
  }
  owr() {
    var t;
    if (FNameUtil_1.FNameUtil.IsEmpty(this.g1t)) {
      t = this._wr(this.Txr);
      t = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(t);
      this.Ixr.TransformOrigin = t;
    } else if (this.Oxr?.IsValid() && (this.Ixr.TransformOriginActor = this.Oxr, this.ZPr?.CineCamera)) {
      t = this.ZPr.CineCamera.D_K2_GetActorLocation();
      this.ZPr.CineCamera.D_K2_SetActorLocation(t, false, undefined, false);
    }
  }
  gCm() {
    if (this.IsDitherEffectEnabled && this.Tae?.IsValid() && this.Qxr?.IsValid()) {
      var i = ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent;
      if (i) {
        this.Lz.DeepCopy(this.Qxr.GetLocation());
        this.Kxr.DeepCopy(this.ZPr.CineCamera.D_K2_GetActorLocation());
        this.ZHa.DeepCopy(this.ZPr.CineCamera.K2_GetActorRotation());
        CameraUtility_1.CameraUtility.GetRotatorInGravity(this.ZHa, this.mCm);
        var s = Vector_1.Vector.DistSquared(this.Lz, this.Kxr);
        let t = 1;
        if (s < i.StartHideDistanceSquared) {
          t = MathUtils_1.MathUtils.RangeClamp(Math.sqrt(s), i.StartHideDistance, i.CompleteHideDistance, i.StartDitherValue, 0.01);
        }
        s = this.mCm.Pitch;
        let e = 1;
        if (s > i.StartHidePitch) {
          e = MathUtils_1.MathUtils.RangeClamp(s, i.StartHidePitch, i.CompleteHidePitch, i.StartDitherValue, 0.01);
        }
        s = Math.min(t, e);
        this.Tae.SetDitherEffect(s, 1);
      }
    }
  }
  Jxr(t, e) {
    return !!e?.IsValid() && (!t?.IsValid() || t === e || !(t = t.GetEntityNoBlueprint()?.GetComponent(0), e = e.GetEntityNoBlueprint()?.GetComponent(0), !t?.IsRole() || !e?.IsMonster()));
  }
  lwr() {
    this._sr.Empty();
    this._sr.Add(ControllerHolder_1.ControllerHolder.CameraController.GetCharacter());
    if (this.sor) {
      this._sr.Add(this.sor);
    }
    ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(1, this.Exr, 0);
    if (ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent?.CameraCollision) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraCollision.IsNpcDitherEnable = false;
    }
    this.Dxr = true;
  }
  _wr(t) {
    return new UE.TransformDouble(t.GetRotation(), t.GetTranslation(), t.GetScale3D());
  }
  OnChangeTimeDilation(t) {}
  fCm() {
    var t;
    if (this.Tae?.IsValid()) {
      if (FNameUtil_1.FNameUtil.IsEmpty(this.Nxr)) {
        t = this.Tae.GetEntityNoBlueprint().GetComponent(181);
        this.Qxr = t.GetCameraTransform();
      } else {
        this.Qxr = this.GetBoneTransform(this.Nxr);
      }
    }
  }
  CheckCollision(t) {
    if (this.Qxr?.IsValid()) {
      this.Fse.WorldContextObject = GlobalData_1.GlobalData.World;
      this._sr.Empty();
      this._sr.Add(ControllerHolder_1.ControllerHolder.CameraController.GetCharacter());
      this.Fse.ActorsToIgnore = this._sr;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, this.Qxr.GetLocation());
      this.Kxr.DeepCopy(this.ZPr.CineCamera.D_K2_GetActorLocation());
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, this.Kxr);
      this.Fse.Radius = 10;
      this.Wxr = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Fse, PROFILE_KEY2);
      if (this.Wxr && (t || this.hQa)) {
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Fse.HitResult, 0, this.Wse);
        this.ZPr.CineCamera.D_K2_SetActorLocation(this.Wse.ToUeVector(), false, undefined, false);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 22, "CheckCollision  SocketTransform 不存在");
    }
  }
  CheckSphereCollision() {
    return this.Vxr !== 0 && (this.jxr.WorldContextObject = GlobalData_1.GlobalData.World, this.Tae.GetEntityNoBlueprint().GetComponent(181).GetCameraPosition(this.Xxr), this.$xr.DeepCopy(this.Tae.CharacterActorComponent.ActorForwardProxy), this.$xr.Multiply(this.kxr.X, this.$xr), this.Yxr.DeepCopy(Vector_1.Vector.OneVectorProxy), this.Yxr.Multiply(this.kxr.Y, this.Yxr), this.I7.DeepCopy(Vector_1.Vector.UpVectorProxy), this.I7.Multiply(this.kxr.Z, this.I7), this.Xxr.Addition(this.$xr, this.Xxr), this.Xxr.Addition(this.Yxr, this.Xxr), this.Xxr.Addition(this.I7, this.Xxr), this._sr.Empty(), this._sr.Add(ControllerHolder_1.ControllerHolder.CameraController.GetCharacter()), this.jxr.ActorsToIgnore = this._sr, TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.jxr, this.Xxr), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.jxr, this.Xxr), this.jxr.Radius = this.Vxr, TraceElementCommon_1.TraceElementCommon.SphereTrace(this.jxr, PROFILE_KEY2));
  }
  GetBoneTransform(t) {
    return this.Tae.Mesh.D_GetSocketTransform(t, 0);
  }
  SetDitherEffectEnable(t) {
    this.dCm.add(t);
  }
  SetDitherEffectDisable(t) {
    this.dCm.delete(t);
  }
  SetCameraCollisionState(t) {
    this.hQa = t;
  }
  DrawCube(t, e, i) {
    var s;
    var h;
    var r;
    if (t) {
      i = new UE.LinearColor(i, i, i, i);
      r = t.GetLocation();
      s = new UE.Vector(10, 10, 10);
      s = new UE.VectorDouble(s.X * 0.5, s.Y * 0.5, s.Z * 0.5);
      h = t.Rotator();
      UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.World, r, s, i, h, e, 30);
      r = UE.KismetMathLibrary.D_TransformLocation(t, new UE.VectorDouble(0.5, 0.5, 0.5));
      s = UE.KismetMathLibrary.D_TransformLocation(t, new UE.VectorDouble(-0.5, -0.5, -0.5));
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, r, s, i, e, 15);
      h = UE.KismetMathLibrary.D_TransformLocation(t, new UE.VectorDouble(0.5, -0.5, 0.5));
      r = UE.KismetMathLibrary.D_TransformLocation(t, new UE.VectorDouble(-0.5, 0.5, 0.5));
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, h, r, i, e, 15);
    }
  }
  SaveSeqCamera() {
    var t = new CameraModel_1.SeqCameraThings();
    t.CameraLocation = this.ZPr.CineCamera.D_K2_GetActorLocation();
    t.CameraRotation = this.ZPr.CineCamera.K2_GetActorRotation();
    t.OriginRootTransform = this.Txr;
    t.ConstrainAspectRatio = this.ZPr.CineCamera["Constrain Aspect Ratio"];
    t.CurrentAperture = this.ZPr.CineCamera["Current Aperture"];
    t.CurrentFocalLength = this.ZPr.CineCamera["Current Focal Length"];
    t.FocusSettings = this.ZPr.CineCamera["Focus Settings"];
    t.LensSettings = this.ZPr.CineCamera["Lens Settings"];
    t.FieldOfView = this.ZPr.CineCamera.GetCineCameraComponent().FieldOfView;
    return t;
  }
  GetIfNeedWaitInPlot() {
    return this.xKd;
  }
};
SequenceCameraPlayerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(10)], SequenceCameraPlayerComponent);
exports.SequenceCameraPlayerComponent = SequenceCameraPlayerComponent; //# sourceMappingURL=SequenceCameraPlayerComponent.js.map