"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksSceneController = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const SimpleLevelSequenceActor_1 = require("../../../LevelGamePlay/StaticScene/SimpleLevelSequenceActor");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RefCompDefine_1 = require("../../../NewWorld/SceneItem/RefCompController/RefCompDefine");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiCameraAnimationController_1 = require("../../UiCameraAnimation/UiCameraAnimationController");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const SEQUENCE_PATH = "DrinksSeqDrinkBase";
const MULTI_PARAM = 1000000;
const DRINK_EVENT = "play_ui_springfestival_mixwine_pour_{0}_{1}";
const stateMap = new Map([[0, "Dislike"], [1, "Like"], [2, "MaxLike"]]);
class DrinksSceneController {
  constructor() {
    this.SimpleSequenceActor = undefined;
    this.CupActor = undefined;
    this.CurOrnament = 0;
    this.IsJump = true;
    this.IsBatchingEnd = false;
    this.IgnorePause = false;
    this.NeedBatching = false;
    this.SceneCamera = undefined;
    this.RelativeLocation = Vector_1.Vector.Create();
    this.OrnamentLocation = Vector_1.Vector.Create();
    this.OrnamentRotation = Rotator_1.Rotator.Create();
    this.BatchingLocation = Vector_1.Vector.Create();
    this.i2g = () => {
      ControllerHolder_1.ControllerHolder.BlackScreenFadeController.RemoveFadeBlackScreen(0.5, "DrinksShake");
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotSequenceStarted, this.i2g);
      UiLayer_1.UiLayer.SetShowMaskLayer("DrinksGameplayView", false);
      this.SimpleSequenceActor.PlayToMark("G", undefined, undefined, new RefCompDefine_1.PlayRateStruct(), false);
      var i = ModelManager_1.ModelManager.DrinksModel.GetCurrentPlayData();
      var t = ModelManager_1.ModelManager.DrinksModel.GetRoleId();
      this.UpdateCupActor(i, t, true);
    };
    this.z8g = (i, t) => {
      if (!t) {
        this.RCg();
      }
    };
    this.RCg = () => {
      this.IgnorePause = true;
      this.r$g(this.CupActor, true);
      this.SimpleSequenceActor.PlayToMark("G", undefined, undefined, new RefCompDefine_1.PlayRateStruct(), true);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotViewChange, this.z8g);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotSequenceEnd, this.RCg);
      ModelManager_1.ModelManager.DrinksModel.EnterNextStep();
    };
    this.pxe = () => {
      var i;
      if (this.IgnorePause) {
        this.IgnorePause = false;
      } else if (this.IsJump) {
        this.IsJump = false;
        this.PlayStepEndSequence();
      } else if (this.IsBatchingEnd) {
        this.IsBatchingEnd = false;
        this.PlayStepEndSequence();
      } else if ((i = ModelManager_1.ModelManager.DrinksModel.GetCurStep()) <= 1) {
        ModelManager_1.ModelManager.DrinksModel.EnterNextStep();
      } else if (i === 4) {
        this.OnMixShowEnd();
      }
    };
    this.vxe = () => {
      this.CupActor?.SetActorHiddenInGame(true);
    };
    this.Cjo = (i, t) => {
      if (!t) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotViewChange, this.Cjo);
        t = ModelManager_1.ModelManager.DrinksModel.GetCurrentPlayData().RequireId;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSpringManorGameplayFinish, 0, t);
      }
    };
    this.Ajg = () => {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBlackFadeScreenStart, this.Ajg);
      TimerSystem_1.TimerSystem.Delay(() => {
        var i = ModelManager_1.ModelManager.DrinksModel.GetRoleId();
        if (ModelManager_1.ModelManager.DrinksModel.GameplayOpenWay === 3) {
          UiCameraAnimationManager_1.UiCameraAnimationManager.EnablePlayerActor();
          this.ShowNpc();
          ModelManager_1.ModelManager.DrinksModel.FlowSpecialRotationByRoleId(i, false);
        } else {
          UiCameraAnimationManager_1.UiCameraAnimationManager.DisablePlayerActor();
          ModelManager_1.ModelManager.DrinksModel.FlowSpecialRotationByRoleId(i, true);
        }
      }, 950);
    };
    this.NpcEntitySet = new Set();
    this.IsShowing = false;
    this.CacheRoleId = 0;
    this.CacheLocation = Vector_1.Vector.Create();
    this.CacheRotation = Rotator_1.Rotator.Create();
    this.CacheMainColorPalette = [0, 0, 0, 0];
    this.CacheWaterHighProcess = 0;
    this.CacheWaterCenterOffset = 0;
    this.CacheWaterMaskWidth = 0;
    this.CacheWaterLineColor = [0, 0, 0, 0];
    this.CacheWaterColorHigh = [0, 0, 0, 0];
    this.CacheWaterColorMiddle = [0, 0, 0, 0];
    this.CacheWaterColorDown = [0, 0, 0, 0];
    this.CacheUpColorAdd = [0, 0, 0, 0];
    this.CacheUpLightColor = [0, 0, 0, 0];
    this.CacheColorMidHighProcess = 0;
    this.CacheColorMidHighWidth = 0;
    this.CacheColorDownMidProcess = 0;
    this.CacheColorDownMidWidth = 0;
    this.CacheUpLightMaskProcess = 0;
    this.CacheWaterRoughness = 0;
    this.CacheWaterMetallic = 0;
    this.CacheFresnelRangeWater = 0;
    this.CacheFresnelColorAdd = [0, 0, 0, 0];
    this.CacheRefractIntensity = 0;
    this.CacheBubbleIntensity = 0;
    this.CacheBubbleSpeed = 0;
    this.CacheBatchingTag = [0, 0];
    this.CacheBatchPosHeightScale = 0;
    this.CacheOrnamentScale = 0;
    this.CacheOrnamentLocation = Vector_1.Vector.Create();
    this.CacheOrnamentRotation = Rotator_1.Rotator.Create();
    this.CacheBatchingScale1 = 0;
    this.CacheBatchingScale2 = 0;
    this.CacheBatchPosScale = 0;
    this.CacheBatchPos1 = Vector_1.Vector.Create();
    this.CacheBatchPos2 = Vector_1.Vector.Create();
    this.CacheOrnamentTag = 0;
    this.CacheBatching01 = 0;
    this.CacheBatching02 = 0;
  }
  async InitOnGameStart() {
    this.DestroySeq();
    await this.InitSeq();
    this.InitCup();
    this.CacheRoleId = ModelManager_1.ModelManager.DrinksModel.GetRoleId();
  }
  async InitSeq() {
    const t = new CustomPromise_1.CustomPromise();
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(SEQUENCE_PATH);
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LevelSequence, i => {
      if (ObjectUtils_1.ObjectUtils.IsValid(i)) {
        if (this.SimpleSequenceActor) {
          this.SimpleSequenceActor.SetSequenceData(i);
        } else {
          this.SimpleSequenceActor = new SimpleLevelSequenceActor_1.default(i);
          this.SimpleSequenceActor.AddOnPauseCallback(this.pxe);
          this.SimpleSequenceActor.AddOnStopCallback(this.vxe);
        }
        this.IgnorePause = true;
        this.SimpleSequenceActor.PlayToMark("B", undefined, undefined, new RefCompDefine_1.PlayRateStruct(), true);
      }
      t.SetResult(true);
    }, 100);
    return t.Promise;
  }
  InitCup() {
    var i = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("Cups"), 0);
    if (i) {
      this.CupActor = i;
      this.CupActor.DrinkOrnament_Tag = 0;
      this.CupActor.DrinksIngredientsFall_Tag01 = 0;
      this.CupActor.DrinksIngredientsFall_Tag02 = 0;
      this.r$g(this.CupActor, false);
      i = ModelManager_1.ModelManager.DrinksModel.GetRoleId();
      this.UpdateCupLocationOrigin(this.CupActor, i);
    } else {
      this.CupActor = undefined;
    }
  }
  UpdateCupLocationOrigin(i, t) {
    var e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("CupsTranform"), 0);
    if (e) {
      var s = e.D_K2_GetActorLocation();
      var t = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfigByRole(t);
      s.Z += t.CupZOffset / CommonDefine_1.THOUSAND;
      var h = i.GetComponentsByTag(UE.NiagaraComponent.StaticClass(), FNameUtil_1.FNameUtil.GetDynamicFName("CupInvisible"));
      i.D_K2_SetActorLocation(s, false, undefined, false);
      i.K2_SetActorRotation(e.K2_GetActorRotation(), false);
      var n = h.Num();
      this.RelativeLocation.Z = -t.CupZOffset / CommonDefine_1.THOUSAND;
      for (let i = 0; i < n; i++) {
        h.Get(i).K2_SetRelativeLocation(this.RelativeLocation.ToUeVectorOld(), false, undefined, false);
      }
    }
  }
  OnStepSequenceStart() {
    if (ModelManager_1.ModelManager.DrinksModel.GetCurStep() !== 2) {
      this.BeginPlayDrinksLevelSequence();
    } else {
      ModelManager_1.ModelManager.DrinksModel.GetProxy().HideClose();
      this.BeginPlayBatchingLevelSequence();
    }
  }
  BeginPlayDrinksLevelSequence() {
    this.IsJump = true;
    this.r$g(this.CupActor, false);
    this.SimpleSequenceActor.PlayToMark("B", undefined, undefined, new RefCompDefine_1.PlayRateStruct(), true);
  }
  BeginPlayBatchingLevelSequence() {
    this.IsJump = true;
    var i = ModelManager_1.ModelManager.DrinksModel.GetCurrentPlayData();
    var t = i.Batching && i.Batching.length > 0 ? "E" : "F";
    this.NeedBatching = i.Batching !== undefined && i.Batching.length > 0;
    this.SimpleSequenceActor.PlayToMark(t, undefined, undefined, new RefCompDefine_1.PlayRateStruct(), true);
  }
  OnBackToBeforeOrnament() {
    this.IgnorePause = true;
    this.r$g(this.CupActor, false);
    this.SimpleSequenceActor.PlayToMark("B", undefined, undefined, new RefCompDefine_1.PlayRateStruct(), true);
  }
  OnSetOrnament(i, t, e, s = true) {
    var h;
    if (i !== this.CurOrnament && (e = e ?? this.CupActor, this.CurOrnament = i, h = ConfigManager_1.ConfigManager.DrinksConfig.GetOrnament(i), e.DrinkOrnament_Tag = h.MeshTagId, (i = (h = ConfigManager_1.ConfigManager.DrinksConfig.GetOrnament(i)).Scale.get(t)) > 0 && (e.DrinkOrnament_Scale = i / 100), i = h.Location.get(t), this.OrnamentLocation.X = i.ArrayInt[0] / 100, this.OrnamentLocation.Y = i.ArrayInt[1] / 100, this.OrnamentLocation.Z = i.ArrayInt[2] / 100, e.DrinkOrnament_Location = this.OrnamentLocation.ToUeVectorOld(), i = h.Rotation.get(t), this.OrnamentRotation.Roll = i.ArrayInt[0] / 100, this.OrnamentRotation.Pitch = i.ArrayInt[1] / 100, this.OrnamentRotation.Yaw = i.ArrayInt[2] / 100, e.DrinkOrnament_Rotation = this.OrnamentRotation.ToUeRotator(), s)) {
      e.UpdateGobletLiguid();
    }
  }
  UpdateBatchingOnWater(i, t, e) {
    var s;
    if (t.length >= 1 && t[0] !== 0) {
      s = ConfigManager_1.ConfigManager.DrinksConfig.GetBatching(t[0]);
      i.DrinksBatching_Tag01 = s.MeshTagId;
      i.DrinksBatching_Scale01 = s.ScaleMap.get(e) / 100;
      i.DrinkBatchPosHeighScale = s.HeighScaleMap.get(e) / 100;
      i.DrinkBatchPosScale = s.PosScaleMap.get(e) / 100;
      s = s.PosOnLiquid1.get(e);
      this.BatchingLocation.X = s.ArrayInt[0] / 100;
      this.BatchingLocation.Y = s.ArrayInt[1] / 100;
      this.BatchingLocation.Z = s.ArrayInt[2] / 100;
      i.DrinkBatchPosOnLiquid01 = this.BatchingLocation.ToUeVectorOld();
    } else {
      i.DrinksBatching_Tag01 = 0;
    }
    if (t.length >= 2 && t[1] !== 0) {
      s = ConfigManager_1.ConfigManager.DrinksConfig.GetBatching(t[1]);
      i.DrinksBatching_Tag02 = s.MeshTagId;
      i.DrinksBatching_Scale02 = s.ScaleMap.get(e) / 100;
      t = s.PosOnLiquid2.get(e);
      this.BatchingLocation.X = t.ArrayInt[0] / 100;
      this.BatchingLocation.Y = t.ArrayInt[1] / 100;
      this.BatchingLocation.Z = t.ArrayInt[2] / 100;
      i.DrinkBatchPosOnLiquid02 = this.BatchingLocation.ToUeVectorOld();
    } else {
      i.DrinksBatching_Tag02 = 0;
    }
  }
  Destroy(i = false) {
    this.DestroySeq();
    this.DestroyCup();
    if (i) {
      this.UpdateCupActor(undefined, 0);
    }
  }
  DestroySeq() {
    this.SimpleSequenceActor?.Clear();
    this.SimpleSequenceActor = undefined;
  }
  DestroyCup() {
    this.CupActor = undefined;
  }
  PlayStepEndSequence() {
    var i = ModelManager_1.ModelManager.DrinksModel.GetCurStep();
    if (i <= 1) {
      this.PlayDrinksBaseSeq();
    } else if (i === 2) {
      this.PlayBatchingSeq();
    }
  }
  PlayDrinksBaseSeq() {
    var i = ModelManager_1.ModelManager.DrinksModel;
    var t = i.GetCurStep();
    var e = i.GetCurrentPlayData();
    var e = t === 1 ? e.DrinkBase[1] : e.DrinkBase[0];
    var i = i.GetDrinksByBaseId(e).GetAllBaseId();
    var e = i.indexOf(e);
    var s = ConfigManager_1.ConfigManager.DrinksConfig.GetQTESeqTime() / CommonDefine_1.THOUSAND;
    let h = "";
    t = t === 0 ? "empty" : "half";
    let n = "";
    n = e === 0 ? (h = "C", this.CupActor.Liquid_Time = s, "01") : e === 2 || i.length === 2 ? (this.CupActor.Liquid_Time = s * 3, h = "E", "03") : (this.CupActor.Liquid_Time = s * 2, h = "D", "02");
    e = StringUtils_1.StringUtils.Format(DRINK_EVENT, t, n);
    AudioSystem_1.AudioSystem.PostEvent(e);
    this.dvg();
    this.SimpleSequenceActor.PlayToMark(h, undefined, undefined, new RefCompDefine_1.PlayRateStruct(), false);
  }
  PlayBatchingSeq() {
    if (this.NeedBatching) {
      this.NeedBatching = false;
      this.mvg(this.CupActor);
      AudioSystem_1.AudioSystem.PostEvent("play_ui_springfestival_mixwine_drop");
      this.SimpleSequenceActor.PlayToMark("F", undefined, undefined, new RefCompDefine_1.PlayRateStruct(), false);
      this.IsBatchingEnd = true;
    } else {
      ControllerHolder_1.ControllerHolder.BlackScreenFadeController.AddFadeBlackScreen(0.05, false, false, undefined, "DrinksShake");
      this.IgnorePause = true;
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotSequenceStarted, this.i2g);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotSequenceEnd, this.RCg);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotViewChange, this.z8g);
      ControllerHolder_1.ControllerHolder.FlowController.StartFlow("剧情_调饮料a级摇雪克杯演出", 1, 1);
    }
  }
  PlayShowDrinks() {
    this.IsJump = false;
    UiCameraAnimationController_1.UiCameraAnimationController.ExitUiCameraMode();
    this.SimpleSequenceActor.PlayToMark("H", undefined, undefined, new RefCompDefine_1.PlayRateStruct(), false);
    TimerSystem_1.TimerSystem.Delay(() => {
      var i = ControllerHolder_1.ControllerHolder.CameraController.SceneCamera?.DisplayComponent?.CurSceneSubCamera;
      this.SceneCamera = i?.Camera;
    }, 200);
  }
  OnMixShowEnd() {
    UiCameraAnimationController_1.UiCameraAnimationController.EnterUiCameraMode();
    if (this.SceneCamera) {
      const i = ModelManager_1.ModelManager.DrinksModel.GetProxy();
      i.SetShakeCamera(this.SceneCamera);
    }
    this.SceneCamera = undefined;
    const i = ModelManager_1.ModelManager.DrinksModel.GetProxy();
    i.OnFinishMixingEnd();
  }
  dvg() {
    var i = ModelManager_1.ModelManager.DrinksModel;
    var t = i.GetCurStep();
    var i = i.GetCurrentPlayData();
    var t = t === 0 ? i.DrinkBase[0] : i.DrinkBase[1];
    var i = ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(t);
    var t = ModelManager_1.ModelManager.DrinksModel.GetRoleId();
    this.UpdateWaterById(this.CupActor, i.EffectId, [], t, false);
  }
  UpdateWaterById(i, t, e, s, h = true, n = true) {
    var t = ConfigManager_1.ConfigManager.DrinksConfig.GetParam(t);
    i.MainColorPalette = new UE.LinearColor(t.MainColorPalette[0] / MULTI_PARAM, t.MainColorPalette[1] / MULTI_PARAM, t.MainColorPalette[2] / MULTI_PARAM, t.MainColorPalette[3] / MULTI_PARAM);
    var r = (t.WaterHighProcessMap.get(s) ?? MULTI_PARAM) / MULTI_PARAM;
    var o = (t.WaterMaskCenterOffsetMap.get(s) ?? MULTI_PARAM) / MULTI_PARAM;
    var a = (t.WaterMaskWidthMap.get(s) ?? MULTI_PARAM) / MULTI_PARAM;
    i.Water_HighProcess = r;
    i.WaterMaskCenterOffset = o;
    i.WaterMaskWidth = a;
    i.WaterLineColor = new UE.LinearColor(t.WaterLineColor[0] / MULTI_PARAM, t.WaterLineColor[1] / MULTI_PARAM, t.WaterLineColor[2] / MULTI_PARAM, t.WaterLineColor[3] / MULTI_PARAM);
    i.WaterColor_High = new UE.LinearColor(t.WaterColorHigh[0] / MULTI_PARAM, t.WaterColorHigh[1] / MULTI_PARAM, t.WaterColorHigh[2] / MULTI_PARAM, t.WaterColorHigh[3] / MULTI_PARAM);
    i.WaterColor_Middle = new UE.LinearColor(t.WaterColorMiddle[0] / MULTI_PARAM, t.WaterColorMiddle[1] / MULTI_PARAM, t.WaterColorMiddle[2] / MULTI_PARAM, t.WaterColorMiddle[3] / MULTI_PARAM);
    i.WaterColor_Down = new UE.LinearColor(t.WaterColorDown[0] / MULTI_PARAM, t.WaterColorDown[1] / MULTI_PARAM, t.WaterColorDown[2] / MULTI_PARAM, t.WaterColorDown[3] / MULTI_PARAM);
    i.UPColor_Add = new UE.LinearColor(t.UpColorAdd[0] / MULTI_PARAM, t.UpColorAdd[1] / MULTI_PARAM, t.UpColorAdd[2] / MULTI_PARAM, t.UpColorAdd[3] / MULTI_PARAM);
    i.UpLighColor = new UE.LinearColor(t.UpLightColor[0] / MULTI_PARAM, t.UpLightColor[1] / MULTI_PARAM, t.UpLightColor[2] / MULTI_PARAM, t.UpLightColor[3] / MULTI_PARAM);
    i.WaterColor_MidHighProcess = t.ColorMidHighProcess / MULTI_PARAM;
    i.WaterColor_MidHighWidth = t.ColorMidHighWidth / MULTI_PARAM;
    i.WaterColor_DownMidProcess = t.ColorDownMidProcess / MULTI_PARAM;
    i.WaterColor_DownMidWidth = t.ColorDownMidWidth / MULTI_PARAM;
    i.UpLightMask_Process = t.UpLightMaskProcess / MULTI_PARAM;
    i.WaterRoughness = t.WaterRoughness / MULTI_PARAM;
    i.WaterMetallic = t.WaterMetallic / MULTI_PARAM;
    i.FresnelRangeWater = t.FresnelRangeWater / MULTI_PARAM;
    i.FresnelColorAdd = new UE.LinearColor(t.FresnelColorAdd[0] / MULTI_PARAM, t.FresnelColorAdd[1] / MULTI_PARAM, t.FresnelColorAdd[2] / MULTI_PARAM, t.FresnelColorAdd[3] / MULTI_PARAM);
    i.RefractIntensity = t.RefractIntensity / MULTI_PARAM;
    i.BubbleIntensity = t.BubbleIntensity / MULTI_PARAM;
    i.BubbleSpeed = t.BubbleSpeed / MULTI_PARAM;
    this.UpdateBatchingOnWater(i, e, s);
    if (h) {
      this.mvg(i, false);
    } else {
      i.DrinksIngredientsFall_Tag01 = 0;
      i.DrinksIngredientsFall_Tag02 = 0;
    }
    if (n) {
      i.UpdateGobletLiguid();
    }
  }
  mvg(i, t = true) {
    var e = ModelManager_1.ModelManager.DrinksModel.GetCurrentPlayData();
    if (e.Batching && (i.DrinksIngredientsFall_Tag01 = e.Batching.length > 0 ? ConfigManager_1.ConfigManager.DrinksConfig.GetBatching(e.Batching[0]).MeshTagId : 0, i.DrinksIngredientsFall_Tag02 = e.Batching.length > 1 ? ConfigManager_1.ConfigManager.DrinksConfig.GetBatching(e.Batching[1]).MeshTagId : 0, t)) {
      i.UpdateGobletLiguid();
    }
  }
  UpdateCupActor(a, _, M = false) {
    const l = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("Cups"), 0);
    if (l) {
      if (a) {
        this.UpdateCupLocationOrigin(l, _);
        let i = "";
        for (const t of ConfigManager_1.ConfigManager.DrinksConfig.GetAllInvite()) {
          if (t.RoleId === _) {
            i = t.CupMesh;
          }
        }
        ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.SkeletalMesh, i => {
          if (ObjectUtils_1.ObjectUtils.IsValid(i)) {
            var t = l.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
            if (t) {
              t.SetSkeletalMesh(i);
              t.SetVisibility(true);
              t.SetHiddenInGame(false);
              l.SetActorHiddenInGame(false);
              var e = l.GetComponentsByTag(UE.NiagaraComponent.StaticClass(), FNameUtil_1.FNameUtil.GetDynamicFName("CupVisible"));
              var s = e.Num();
              for (let i = 0; i < s; i++) {
                e.Get(i).SetHiddenInGame(false);
              }
              var h = l.GetComponentsByTag(UE.NiagaraComponent.StaticClass(), FNameUtil_1.FNameUtil.GetDynamicFName("CupInvisible"));
              var n = h.Num();
              for (let i = 0; i < n; i++) {
                h.Get(i).SetHiddenInGame(true);
              }
              var i = ModelManager_1.ModelManager.DrinksModel.GetMixConfig(a.DrinkBase);
              var r = [];
              if (a.Batching) {
                for (const o of a.Batching) {
                  r.push(o);
                }
              }
              this.UpdateWaterById(l, i.EffectId, r, _, M, false);
              this.OnSetOrnament(a.Ornament, _, l, false);
              l.Water_HighProcess_Seq = 0;
              l.UpdateGobletLiguid();
            }
          }
        }, 100);
      } else {
        l.SetActorHiddenInGame(true);
      }
    }
  }
  OnEndingPlotBegin() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotViewChange, this.Cjo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBlackFadeScreenStart, this.Ajg);
  }
  UpdateCupMontageLocation(i, t) {
    var e;
    var t = `Cups_${i}_${stateMap.get(t)}`;
    var t = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(t), 0);
    var s = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("Cups"), 0);
    if (t && s) {
      e = t.D_K2_GetActorLocation();
      t = t.K2_GetActorRotation();
      i = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfigByRole(i);
      e.Z += i.CupZOffset / CommonDefine_1.THOUSAND;
      s.D_K2_SetActorLocation(e, false, undefined, false);
      s.K2_SetActorRotation(t, false);
      s.UpdateGobletLiguid();
    }
  }
  r$g(i, t) {
    i.Water_HighProcess_Seq = t ? 0 : -1;
    i.UpdateGobletLiguid();
  }
  HideNpc() {
    for (const t of ConfigManager_1.ConfigManager.DrinksConfig.GetNeedHideNpcId()) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      if (i?.Valid && i.Entity && i.Entity.GetComponent(0).GetVisible()) {
        this.NpcEntitySet.add(t);
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(i.Entity, false, "[Drinks] 清场NPC");
      }
    }
  }
  ShowNpc() {
    for (const t of this.NpcEntitySet) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      if (i?.Valid && i.Entity) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(i.Entity, true, "[Drinks] 清场NPC");
      }
    }
    this.NpcEntitySet.clear();
  }
  CacheCurrentCupState() {
    var i;
    var t = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("Cups"), 0);
    if (t) {
      this.IsShowing = !t.bHidden;
      if (this.IsShowing) {
        i = t.D_K2_GetActorLocation();
        this.CacheLocation.FromUeVector(i);
        this.CacheRotation.FromUeRotator(t.K2_GetActorRotation());
        this.CacheMainColorPalette = this.$3g(t.MainColorPalette);
        this.CacheWaterHighProcess = t.Water_HighProcess;
        this.CacheWaterCenterOffset = t.WaterMaskCenterOffset;
        this.CacheWaterMaskWidth = t.WaterMaskWidth;
        this.CacheWaterLineColor = this.$3g(t.WaterLineColor);
        this.CacheWaterColorHigh = this.$3g(t.WaterColor_High);
        this.CacheWaterColorMiddle = this.$3g(t.WaterColor_Middle);
        this.CacheWaterColorDown = this.$3g(t.WaterColor_Down);
        this.CacheUpColorAdd = this.$3g(t.UPColor_Add);
        this.CacheUpLightColor = this.$3g(t.UpLighColor);
        this.CacheColorMidHighProcess = t.WaterColor_MidHighProcess;
        this.CacheColorMidHighWidth = t.WaterColor_MidHighWidth;
        this.CacheColorDownMidProcess = t.WaterColor_DownMidProcess;
        this.CacheColorDownMidWidth = t.WaterColor_DownMidWidth;
        this.CacheUpLightMaskProcess = t.UpLightMask_Process;
        this.CacheWaterRoughness = t.WaterRoughness;
        this.CacheWaterMetallic = t.WaterMetallic;
        this.CacheFresnelRangeWater = t.FresnelRangeWater;
        this.CacheFresnelColorAdd = this.$3g(t.FresnelColorAdd);
        this.CacheRefractIntensity = t.RefractIntensity;
        this.CacheBubbleIntensity = t.BubbleIntensity;
        this.CacheBubbleSpeed = t.BubbleSpeed;
        this.CacheBatchingTag = [t.DrinksBatching_Tag01, t.DrinksBatching_Tag02];
        this.CacheBatchPosHeightScale = t.DrinkBatchPosHeighScale;
        this.CacheOrnamentScale = t.DrinkOrnament_Scale;
        this.CacheOrnamentLocation.FromUeVector(t.DrinkOrnament_Location);
        this.CacheOrnamentRotation.FromUeRotator(t.DrinkOrnament_Rotation);
        this.CacheBatchingScale1 = t.DrinksBatching_Scale01;
        this.CacheBatchingScale2 = t.DrinksBatching_Scale02;
        this.CacheBatchPosScale = t.DrinkBatchPosScale;
        this.CacheBatchPos1.FromUeVector(t.DrinkBatchPosOnLiquid01);
        this.CacheBatchPos2.FromUeVector(t.DrinkBatchPosOnLiquid02);
        this.CacheOrnamentTag = t.DrinkOrnament_Tag;
        this.CacheBatching01 = t.DrinksBatching_Tag01;
        this.CacheBatching02 = t.DrinksBatching_Tag02;
      }
    } else {
      this.IsShowing = false;
    }
  }
  $3g(i) {
    return [i.R, i.G, i.B, i.A];
  }
  ApplyCurrentCupState() {
    if (this.IsShowing) {
      const r = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("Cups"), 0);
      if (r) {
        let i = "";
        for (const t of ConfigManager_1.ConfigManager.DrinksConfig.GetAllInvite()) {
          if (t.RoleId === this.CacheRoleId) {
            i = t.CupMesh;
          }
        }
        ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.SkeletalMesh, i => {
          if (ObjectUtils_1.ObjectUtils.IsValid(i)) {
            var t = r.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
            if (t) {
              t.SetSkeletalMesh(i);
              t.SetVisibility(true);
              t.SetHiddenInGame(false);
              r.SetActorHiddenInGame(false);
              var e = r.GetComponentsByTag(UE.NiagaraComponent.StaticClass(), FNameUtil_1.FNameUtil.GetDynamicFName("CupVisible"));
              var s = e.Num();
              for (let i = 0; i < s; i++) {
                e.Get(i).SetHiddenInGame(false);
              }
              var h = r.GetComponentsByTag(UE.NiagaraComponent.StaticClass(), FNameUtil_1.FNameUtil.GetDynamicFName("CupInvisible"));
              var n = h.Num();
              for (let i = 0; i < n; i++) {
                h.Get(i).SetHiddenInGame(true);
              }
              r.D_K2_SetActorLocation(this.CacheLocation.ToUeVector(), false, undefined, false);
              r.K2_SetActorRotation(this.CacheRotation.ToUeRotator(), false);
              r.MainColorPalette = new UE.LinearColor(this.CacheMainColorPalette[0], this.CacheMainColorPalette[1], this.CacheMainColorPalette[2], this.CacheMainColorPalette[3]);
              r.Water_HighProcess = this.CacheWaterHighProcess;
              r.WaterMaskCenterOffset = this.CacheWaterCenterOffset;
              r.WaterMaskWidth = this.CacheWaterMaskWidth;
              r.WaterLineColor = new UE.LinearColor(this.CacheWaterLineColor[0], this.CacheWaterLineColor[1], this.CacheWaterLineColor[2], this.CacheWaterLineColor[3]);
              r.WaterColor_High = new UE.LinearColor(this.CacheWaterColorHigh[0], this.CacheWaterColorHigh[1], this.CacheWaterColorHigh[2], this.CacheWaterColorHigh[3]);
              r.WaterColor_Middle = new UE.LinearColor(this.CacheWaterColorMiddle[0], this.CacheWaterColorMiddle[1], this.CacheWaterColorMiddle[2], this.CacheWaterColorMiddle[3]);
              r.WaterColor_Down = new UE.LinearColor(this.CacheWaterColorDown[0], this.CacheWaterColorDown[1], this.CacheWaterColorDown[2], this.CacheWaterColorDown[3]);
              r.UPColor_Add = new UE.LinearColor(this.CacheUpColorAdd[0], this.CacheUpColorAdd[1], this.CacheUpColorAdd[2], this.CacheUpColorAdd[3]);
              r.UpLighColor = new UE.LinearColor(this.CacheUpLightColor[0], this.CacheUpLightColor[1], this.CacheUpLightColor[2], this.CacheUpLightColor[3]);
              r.WaterColor_MidHighProcess = this.CacheColorMidHighProcess;
              r.WaterColor_MidHighWidth = this.CacheColorMidHighWidth;
              r.WaterColor_DownMidProcess = this.CacheColorDownMidProcess;
              r.WaterColor_DownMidWidth = this.CacheColorDownMidWidth;
              r.UpLightMask_Process = this.CacheUpLightMaskProcess;
              r.WaterRoughness = this.CacheWaterRoughness;
              r.WaterMetallic = this.CacheWaterMetallic;
              r.FresnelRangeWater = this.CacheFresnelRangeWater;
              r.FresnelColorAdd = new UE.LinearColor(this.CacheFresnelColorAdd[0], this.CacheFresnelColorAdd[1], this.CacheFresnelColorAdd[2], this.CacheFresnelColorAdd[3]);
              r.RefractIntensity = this.CacheRefractIntensity;
              r.BubbleIntensity = this.CacheBubbleIntensity;
              r.BubbleSpeed = this.CacheBubbleSpeed;
              r.DrinksBatching_Tag01 = this.CacheBatchingTag[0];
              r.DrinksBatching_Tag02 = this.CacheBatchingTag[1];
              r.DrinkBatchPosHeighScale = this.CacheBatchPosHeightScale;
              r.DrinkOrnament_Scale = this.CacheOrnamentScale;
              r.DrinkOrnament_Location = this.CacheOrnamentLocation.ToUeVectorOld();
              r.DrinkOrnament_Rotation = this.CacheOrnamentRotation.ToUeRotator();
              r.DrinksBatching_Scale01 = this.CacheBatchingScale1;
              r.DrinksBatching_Scale02 = this.CacheBatchingScale2;
              r.DrinkBatchPosScale = this.CacheBatchPosScale;
              r.DrinkBatchPosOnLiquid01 = this.CacheBatchPos1.ToUeVectorOld();
              r.DrinkBatchPosOnLiquid02 = this.CacheBatchPos2.ToUeVectorOld();
              r.DrinkOrnament_Tag = this.CacheOrnamentTag;
              r.DrinksBatching_Tag01 = this.CacheBatching01;
              r.DrinksBatching_Tag02 = this.CacheBatching02;
              r.UpdateGobletLiguid();
            }
          }
        }, 100);
      }
    } else {
      this.UpdateCupActor(undefined, 0);
    }
  }
}
exports.DrinksSceneController = DrinksSceneController;
//# sourceMappingURL=DrinksSceneController.js.map