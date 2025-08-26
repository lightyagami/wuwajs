"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceAssistant = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BlackScreenFadeController_1 = require("../../../BlackScreen/BlackScreenFadeController");
const LevelLoadingController_1 = require("../../../LevelLoading/LevelLoadingController");
const LoginDefine_1 = require("../../../Login/Data/LoginDefine");
const FlowController_1 = require("../../Flow/FlowController");
const SequenceController_1 = require("../SequenceController");
const SequenceDefine_1 = require("../SequenceDefine");
const SeqBaseAssistant_1 = require("./SeqBaseAssistant");
const CONSTRAIN = new UE.FName("bConstrainAspectRatio");
const MAX_FRAME = 99999999;
class SubSeqInfo {
  constructor() {
    this.havePlayerArray = new Array();
    this.endFrameArray = new Array();
  }
}
class SequenceAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments);
    this.Cio = ResourceSystem_1.ResourceSystem.InvalidId;
    this.gio = undefined;
    this.fio = false;
    this.vio = undefined;
    this.qua = new Set();
    this.hzl = new Map();
  }
  Load(t) {
    if (StringUtils_1.StringUtils.IsEmpty(this.Model.Config?.Path)) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("剧情SequenceDA路径为空，检查配置");
      t(false);
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 38, "[剧情加载等待] SequenceDA-开始");
      }
      this.Cio = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.GetAsset(this.Model.Config.Path, UE.BP_SequenceData_C, e => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 38, "[剧情加载等待] SequenceDA-结束");
        }
        this.Cio = ResourceSystem_1.ResourceSystem.InvalidId;
        if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
          this.Model.SequenceData = e;
          this.Cio = ResourceSystem_1.ResourceSystem.InvalidId;
          t(true);
        } else {
          t(false);
        }
      });
    }
  }
  PreAllPlay() {
    if (this.Model.EndLeastTime === undefined && (this.Model.EndLeastTime = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.SequenceEndLeastTime, this.Model.EndLeastTime < TimerSystem_1.MIN_TIME * TimeUtil_1.TimeUtil.Millisecond)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "配置的最后一句话淡出时间不能小于最小时间", ["CurTime", this.Model.EndLeastTime], ["MinTime", TimerSystem_1.MIN_TIME * TimeUtil_1.TimeUtil.Millisecond]);
      }
      this.Model.EndLeastTime = SequenceDefine_1.DEFAULT_LAST_SUBTITLE_TIME;
    }
    this.Mio();
    if (this.Model.UseRuntimeData) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "运行时获取FadeEnd数据");
      }
      this.Eio();
    } else {
      this.Sio();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "处理FadeEnd数据完成", ["FadeEnd", this.Model.IsFadeEnd]);
    }
    if (this.Model.SequenceData.SaveFinalTransform) {
      if (this.Model.UseRuntimeData) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "运行时处理SequenceData最终位置");
        }
        this.yio();
      } else {
        this.Iio();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "处理SequenceData数据完成", ["FinalPosNum", this.Model.CurFinalPos.length]);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 38, "不使用最终位置");
    }
    if (this.Model.Type === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 45, "过场生成SubSeuqenceMap");
      }
      this.lzl();
    }
  }
  PreEachPlay() {
    var e = this.Model.GetCurrentSequence();
    if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
      this.fio = true;
      this.gR1();
      this.Tio();
      this.Lio();
      this.Dio();
      if (this.Model.UseRuntimeData) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "运行时处理SequenceData帧信息");
        }
        this.Rio();
      } else {
        this.Uio();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "处理SequenceData数据完成", ["SubtitleStartNum", this.Model.CurSubtitleStartFrames.length], ["SubtitleEndNum", this.Model.CurSubtitleEndFrames.length], ["ShotStartNum", this.Model.CurShotStartFrames.length], ["ShotEndNum", this.Model.CurShotEndFrames.length]);
      }
    } else {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("剧情Sequence失效", ["index", this.Model.SubSeqIndex]);
    }
  }
  Play(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "开始播放剧情Sequence：", ["Name", this.Model.CurLevelSeqActor.GetSequence().GetName()]);
    }
    let t = 0;
    var i = ModelManager_1.ModelManager.SequenceModel.GetCurrentSequence();
    if (this.egl(i)) {
      ModelManager_1.ModelManager.PlotModel.LastPlotAspect = 2.38;
    } else {
      ModelManager_1.ModelManager.PlotModel.LastPlotAspect = 1.77;
    }
    var i = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.FlowAdaptation);
    if (i && BlackScreenFadeController_1.BlackScreenFadeController.ChangeAspect(ModelManager_1.ModelManager.PlotModel.LastPlotAspect)) {
      i = CommonParamById_1.configCommonParamById.GetIntConfig("BlackScreenFadeLerpFullTime") ?? 3;
      t = i;
    }
    if (t) {
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0, () => {
        this.lwr(e);
      }, t);
    } else {
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0, undefined, 0);
      this.lwr(e);
    }
  }
  lwr(e) {
    this.Model.NeedsQueueLatentAction = true;
    var t = new Set([...this.Model.CurSubtitleStartFrames, ...this.Model.CurSubtitleEndFrames]);
    const i = UE.NewArray(UE.BuiltinInt);
    t.forEach(e => {
      i.Add(e);
    });
    this.Model.CurLevelSeqActor.SequencePlayer.SetKeyFrames(i);
    if (this.Model.TwiceAnimFlag) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 0");
      this.Model.CurLevelSeqActor.SequencePlayer.Play();
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 1");
    } else {
      this.Model.CurLevelSeqActor.SequencePlayer.Play();
    }
    SequenceController_1.SequenceController.TriggerCutChange();
    this.Model.TalkNpcList = this.Model.CurLevelSeqActor?.GetBindingByTag(SequenceDefine_1.TALK_NPC_TAG, true);
    this.Model.NeedsQueueLatentAction = false;
    this.Model.RunLatentActions();
    this.Model.IsPaused = false;
    this.vio = e;
    this.Model.CurLevelSeqActor.SequencePlayer.OnStop.Add(e);
  }
  EachStop() {
    SequenceController_1.SequenceController.FlushDialogueState();
    this.fio = false;
    this.Model.CurLevelSeqActor.SequencePlayer.OnStop.Clear();
    this.vio = undefined;
    this.Model.CurLevelSeqActor.SequencePlayer.ClearKeyFrames();
    this.Model.CurLevelSeqActor.ResetBindings();
    ActorSystem_1.ActorSystem.Put("SequenceAssistant.EachStop", this.Model.CurLevelSeqActor);
    this.Model.CurLevelSeqActor = undefined;
    this.Model.TalkNpcList = undefined;
    this.Aio();
  }
  AllStop() {}
  End() {
    if (this.Cio !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Cio);
      this.Cio = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (this.fio) {
      this.Model.CurLevelSeqActor.SequencePlayer.OnStop.Clear();
      this.Model.CurLevelSeqActor.SequencePlayer.GoToEndAndStop(0);
      this.Model.CurLevelSeqActor.ResetBindings();
      ActorSystem_1.ActorSystem.Put("SequenceAssistant.End", this.Model.CurLevelSeqActor);
      this.Model.CurLevelSeqActor = undefined;
    }
    if (this.gio) {
      this.gio.Remove();
    }
    this.Model.RelativeTransform = undefined;
    this.fio = false;
    this.Aio();
    this.qua.clear();
    this.hzl.clear();
  }
  gR1() {
    var t = UE.NewArray(UE.BuiltinName);
    var e = this.Model.GetCurrentSequence();
    switch (ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(9)) {
      case LoginDefine_1.ELoginSex.Boy:
        t.Add(SequenceDefine_1.MALE_TAG);
        break;
      case LoginDefine_1.ELoginSex.Girl:
        t.Add(SequenceDefine_1.FEMALE_TAG);
        break;
      default:
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 45, "Reattach获取不到性别");
        }
    }
    t.Add(SequenceDefine_1.HERO_TAG);
    UE.KuroSequenceRuntimeFunctionLibrary.SearchAttachAndReattach(e, t, SequenceDefine_1.FREEATTACH_TAG);
    UE.KuroSequenceRuntimeFunctionLibrary.ResetMovieSceneCompiledData(e);
    var i = e.MovieScene.MasterTracks;
    var r = i?.Num() || 0;
    for (let e = 0; e < r; e++) {
      var o = i.Get(e);
      if (o instanceof UE.MovieSceneSubTrack) {
        var s = o.Sections;
        var a = s?.Num() || 0;
        for (let e = 0; e < a; e++) {
          var n = s.Get(e);
          if (n instanceof UE.MovieSceneSubSection) {
            UE.KuroSequenceRuntimeFunctionLibrary.SearchAttachAndReattach(n.SubSequence, t, SequenceDefine_1.FREEATTACH_TAG);
            UE.KuroSequenceRuntimeFunctionLibrary.ResetMovieSceneCompiledData(n.SubSequence);
          }
        }
      }
    }
  }
  Tio() {
    var e = this.Model.GetCurrentSequence();
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(9);
    if (GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.FlowAdaptation)) {
      UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByName(e, CONSTRAIN, false);
    } else {
      UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByName(e, CONSTRAIN, true);
    }
    switch (t) {
      case LoginDefine_1.ELoginSex.Boy:
        UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(e, SequenceDefine_1.MALE_TAG, false);
        UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(e, SequenceDefine_1.FEMALE_TAG, true);
        break;
      case LoginDefine_1.ELoginSex.Girl:
        UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(e, SequenceDefine_1.FEMALE_TAG, false);
        UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(e, SequenceDefine_1.MALE_TAG, true);
        break;
      default:
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "剧情Seq播放时无法获取性别");
        }
        UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(e, SequenceDefine_1.FEMALE_TAG, true);
        UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(e, SequenceDefine_1.MALE_TAG, true);
    }
    UE.KuroSequenceRuntimeFunctionLibrary.ResetMovieSceneCompiledData(e);
    var i = e.MovieScene.MasterTracks;
    var r = i?.Num() || 0;
    for (let e = 0; e < r; e++) {
      var o = i.Get(e);
      if (o instanceof UE.MovieSceneSubTrack) {
        var s = o.Sections;
        var a = s?.Num() || 0;
        for (let e = 0; e < a; e++) {
          var n = s.Get(e);
          if (n instanceof UE.MovieSceneSubSection) {
            UE.KuroSequenceRuntimeFunctionLibrary.ResetMovieSceneCompiledData(n.SubSequence);
          }
        }
      }
    }
  }
  Lio() {
    var e = this.Model.GetCurrentSequence();
    var t = ActorSystem_1.ActorSystem.Spawn(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined);
    var i = new UE.MovieSceneSequencePlaybackSettings();
    i.PlayRate = this.Model.PlayRate;
    t.PlaybackSettings = i;
    t.SetSequence(e);
    this.Model.CurLevelSeqActor = t;
    var i = this.Model.CurLevelSeqActor.SequencePlayer;
    this.Model.CurStartFrame = i.GetStartTime().Time.FrameNumber.Value;
    this.Model.CurEndFrame = i.GetEndTime().Time.FrameNumber.Value;
    var e = i.GetFrameRate();
    this.Model.CurFrameRate = e.Numerator / e.Denominator;
    if (this.Model.CurStartFrame !== 0 && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 17, "剧情Seq开始帧不规范，编号不是0");
    }
  }
  Mio() {
    let t = undefined;
    if (!this.Model.SequenceData.是否固定起始点) {
      let e = undefined;
      if (this.Model.SequenceData.IsTransformOverride) {
        var i = UE.KismetMathLibrary.Conv_TransformToTransformDouble(this.Model.SequenceData.OverrideTransform);
        e = i;
      } else if (!StringUtils_1.StringUtils.IsEmpty(this.Model.SequenceData.绑定起始点标签)) {
        switch (this.Model.SequenceData.绑定起始点标签) {
          case "Player":
            e = Global_1.Global.BaseCharacter?.D_GetTransform();
            break;
          case "SequenceCamera":
            e = CameraController_1.CameraController.SequenceCamera.GetComponent(9).CineCamera.D_GetTransform();
            break;
          default:
            for (var [r, o] of this.Model.BindingEntityMap) {
              if (o.Valid && r.toString() === this.Model.SequenceData.绑定起始点标签) {
                e = o.Entity.GetComponent(1).ActorTransform;
                break;
              }
            }
        }
      }
      if (!e || e.GetLocation().IsZero()) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("需要绑定起始点的Sequence读不到坐标", ["UseTransform", this.Model.SequenceData.IsTransformOverride], ["UseTag", this.Model.SequenceData.绑定起始点标签]);
      } else {
        t = e;
      }
    }
    i = this.Model.GetCurrentSequence();
    let e = new UE.VectorDouble(0);
    var s = (0, puerts_1.$ref)(e);
    if (i.D_GetCenterOffset(s)) {
      e = (0, puerts_1.$unref)(s);
    } else {
      if (!t) {
        return;
      }
      e.Set(0, 0, 0);
    }
    this.Model.RelativeTransform = Transform_1.Transform.Create(Quat_1.Quat.IdentityProxy, Vector_1.Vector.ZeroVectorProxy, Vector_1.Vector.OneVectorProxy);
    if (t) {
      t.AddToTranslation(e);
      this.Model.RelativeTransform.FromUeTransform(t);
    } else {
      this.Model.RelativeTransform.SetLocation(e);
    }
    this.Model.RelativeTransform.SetScale3D(Vector_1.Vector.OneVectorProxy);
  }
  Dio() {
    this.Model.CurLevelSeqActor.bOverrideInstanceData = true;
    var e = this.Model.CurLevelSeqActor.DefaultInstanceData;
    if (this.Model.RelativeTransform) {
      e.TransformOrigin = this.Model.RelativeTransform.ToUeTransformOld();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "剧情Sequence起始点被改变", ["x", e.TransformOrigin.GetTranslation().X], ["y", e.TransformOrigin.GetTranslation().Y], ["z", e.TransformOrigin.GetTranslation().Z]);
    }
  }
  Aio() {
    this.Model.CurSubtitleStartFrames.length = 0;
    this.Model.CurSubtitleEndFrames.length = 0;
    this.Model.CurShotStartFrames.length = 0;
    this.Model.CurShotEndFrames.length = 0;
    this.Model.CurStartFrame = undefined;
    this.Model.CurEndFrame = undefined;
  }
  Uio() {
    var e = this.Model.GetCurrentKeyFramesInfo();
    var t = e.SubtitleStartFrames;
    var i = t.Num();
    for (let e = 0; e < i; e++) {
      this.Model.CurSubtitleStartFrames.push(t.Get(e));
    }
    var r = e.SubtitleEndFrames;
    var o = r.Num();
    for (let e = 0; e < o; e++) {
      this.Model.CurSubtitleEndFrames.push(r.Get(e));
    }
    var s = e.ShotStartFrames;
    var a = s.Num();
    for (let e = 0; e < a; e++) {
      this.Model.CurShotStartFrames.push(s.Get(e));
    }
    var n = e.ShotEndFrames;
    var l = n.Num();
    for (let e = 0; e < l; e++) {
      this.Model.CurShotEndFrames.push(n.Get(e));
    }
  }
  Eio() {
    this.Model.IsFadeEnd.length = 0;
    var i = this.Model.SequenceData;
    for (let t = 0; t < i.剧情资源.Num(); t++) {
      var a = i.剧情资源.Get(t);
      var n = UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackEnd(a) - 1;
      let e = 0;
      e = this.GetFadeAmountAt(a, n);
      a = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(a, UE.MovieSceneCinematicShotTrack.StaticClass());
      a = a && a.Num() > 0 ? a.Get(0) : undefined;
      if (ObjectUtils_1.ObjectUtils.IsValid(a)) {
        var l = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(a);
        if (l.Num() > 0) {
          let i = undefined;
          let r = 0;
          let o = 0;
          let s = 0;
          for (let t = l.Num() - 1; t >= 0; t--) {
            var h = l.Get(t);
            let e = UE.KuroSequenceRuntimeFunctionLibrary.GetEndFrame(h);
            if ((e = e > n ? n : e) > r) {
              i = h;
              s = i.Parameters.StartFrameOffset.Value;
              o = UE.KuroSequenceRuntimeFunctionLibrary.GetStartFrame(i);
              r = e;
            }
          }
          var _;
          var a = i?.GetSequence();
          if (ObjectUtils_1.ObjectUtils.IsValid(a) && (_ = UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(a), _ = n - o + s + _, (a = this.GetFadeAmountAt(a, _)) >= 0)) {
            e = a;
          }
        }
      }
      this.Model.IsFadeEnd.push(e > 0.9);
    }
  }
  GetFadeAmountAt(e, t) {
    var i = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(e, UE.MovieSceneFadeTrack.StaticClass());
    if (!i || i.Num() <= 0) {
      return -1;
    }
    var r = [];
    for (let e = 0; e < i.Num(); e++) {
      var o = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(i.Get(e));
      for (let e = 0; e < o.Num(); e++) {
        r.push(o.Get(e));
      }
    }
    if (r.length === 0) {
      return -1;
    }
    let s = 0;
    var a = new UE.FrameTime(new UE.FrameNumber(t), 0);
    for (const l of r) {
      var n = l;
      if (UE.KuroSequenceRuntimeFunctionLibrary.SectionContains(n, a)) {
        s = n.FloatCurve.Times.Num() !== 0 || n.FloatCurve.bHasDefaultValue ? UE.KuroSequenceRuntimeFunctionLibrary.GetFadeAmountAt(n, a) : -1;
        break;
      }
    }
    return s;
  }
  Sio() {
    if (this.Model.SequenceData.GeneratedData) {
      for (let e = 0; e < this.Model.SequenceData.GeneratedData.IsFadeEnd.Num(); e++) {
        this.Model.IsFadeEnd.push(this.Model.SequenceData.GeneratedData.IsFadeEnd.Get(e));
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 26, "使用了最终黑幕，却没有后处理");
    }
  }
  Iio() {
    if (this.Model.SequenceData.GeneratedData) {
      var t = this.Model.SequenceData.GeneratedData.FinalPos;
      var i = t.Num();
      for (let e = 0; e < i; e++) {
        var r = t.Get(e);
        var o = Rotator_1.Rotator.Create(r.Rotator());
        var r = Vector_1.Vector.Create(r.GetLocation());
        if (this.Model.GetType() === 0 || this.Model.GetType() === 2) {
          o.Yaw += 90;
        }
        this.Model.AddFinalPos(Transform_1.Transform.Create(o.Quaternion(), r, Vector_1.Vector.OneVectorProxy));
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 38, "使用了最终位置，但是没有后处理位置。");
    }
  }
  JumpToNextSubtitleOrChildSeq() {
    if (this.Model.IsPaused) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "JumpSequence Cache");
      }
      this.Model.NeedJumpWhenResume = true;
    } else {
      const o = this.Model.CurLevelSeqActor.SequencePlayer;
      const s = o.GetCurrentTime().Time.FrameNumber.Value;
      let e = MAX_FRAME;
      for (const a of this.Model.CurSubtitleStartFrames) {
        if (a === s) {
          return;
        }
        if (a > s) {
          e = a;
          break;
        }
      }
      let t = MAX_FRAME;
      for (const n of this.Model.CurShotStartFrames) {
        if (n > s) {
          t = n;
          break;
        }
      }
      let i = 0;
      var r = this.Model.GetType();
      if ((i = r === 1 ? e : Math.min(e, t)) === 0 || i === MAX_FRAME || i >= this.Model.CurEndFrame) {
        i = this.Model.CurEndFrame;
        if (this.Model.WillFinish()) {
          if ((this.Model.CurEndFrame - s) / this.Model.CurFrameRate > this.Model.EndLeastTime) {
            LevelLoadingController_1.LevelLoadingController.OpenLoading(0, 3, undefined, this.Model.EndLeastTime);
            ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
            this.gio = TimerSystem_1.TimerSystem.Delay(() => {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Plot", 26, "Sequence最后一句话淡出跳至结束", ["curFrame", s], ["targetFrame", i]);
              }
              this.gio = undefined;
              o.GoToEndAndStop(0);
            }, this.Model.EndLeastTime * TimeUtil_1.TimeUtil.InverseMillisecond);
          }
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "Sequence跳至结束", ["curFrame", s], ["targetFrame", i]);
          }
          o.OnStop.Clear();
          o.GoToEndAndStop(0);
          if (this.vio) {
            SequenceController_1.SequenceController.FlushDialogueState();
            this.Model.TwiceAnimFlag = true;
            this.vio();
            this.Model.TwiceAnimFlag = false;
          }
        }
      } else if (i > s && i < this.Model.CurEndFrame) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "SequenceAssistant:Sequence跳至下一句", ["curFrame", s], ["targetFrame", i]);
        }
        this.xio(i);
      }
    }
  }
  xio(e, t = 0) {
    if (this.Model.State === 3) {
      e = new UE.FrameNumber(e);
      e = new UE.FrameTime(e, 0);
      e = new UE.MovieSceneSequencePlaybackParams(e, 0, "", 0, t);
      this.Model.CurLevelSeqActor.SequencePlayer.SetPlaybackPositionWithNoEval(e);
    }
  }
  PauseSequence(e) {
    if (this.Model.State !== 3) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "剧情Sequence未开始播放");
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "Sequence Pause", ["reason", e]);
      }
      if (this.Model.CurLevelSeqActor.SequencePlayer.IsPlaying()) {
        this.Model.CurLevelSeqActor.SequencePlayer.PauseOnNextFrame();
      }
      this.Model.IsPaused = true;
      if (e) {
        this.qua.add(e);
      }
    }
  }
  ResumeSequence(e) {
    if (this.Model.State !== 3) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "剧情Sequence未开始播放");
      }
    } else {
      if (e) {
        this.qua.delete(e);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "Sequence Resume", ["reasonSet", this.qua], ["NeedJump", this.Model.NeedJumpWhenResume]);
      }
      if (!(this.qua.size > 0)) {
        if (this.Model.CurLevelSeqActor.SequencePlayer.IsPaused()) {
          this.Model.CurLevelSeqActor.SequencePlayer.Play();
        }
        this.Model.IsPaused = false;
        if (this.Model.NeedJumpWhenResume) {
          this.JumpToNextSubtitleOrChildSeq();
        }
      }
    }
  }
  Rio() {
    var e = this.Model.SequenceData.剧情资源.Get(this.Model.SubSeqIndex);
    var t = e.MovieScene.MasterTracks;
    var i = t?.Num() || 0;
    var r = e.MovieScene.TickResolution;
    var o = e.MovieScene.DisplayRate;
    var s = o.Denominator * r.Numerator / (o.Numerator * r.Denominator);
    for (let e = 0; e < i; e++) {
      var a = t.Get(e);
      if (!a.bIsEvalDisabled) {
        if (a instanceof UE.MovieSceneDialogueTrack) {
          var n = a.Sections;
          var l = n?.Num() || 0;
          for (let e = 0; e < l; e++) {
            var h = n.Get(e);
            if (h instanceof UE.MovieSceneDialogueSection) {
              this.Model.CurSubtitleStartFrames.push(h.GetStartFrame().Value.Value / s);
              this.Model.CurSubtitleEndFrames.push(h.GetEndFrame().Value.Value / s);
            }
          }
        } else if (a instanceof UE.MovieSceneDialogueStateTrack) {
          if (!a.bIsEvalDisabled) {
            var _ = a.Sections;
            var u = _?.Num() || 0;
            for (let e = 0; e < u; e++) {
              var c = _.Get(e);
              if (c instanceof UE.MovieSceneDialogueStateSection && c.SectionData.State === 0) {
                this.Model.CurSubtitleStartFrames.push(c.GetStartFrame().Value.Value / s);
                this.Model.CurSubtitleEndFrames.push(c.GetEndFrame().Value.Value / s);
              }
            }
          }
        } else if (a instanceof UE.MovieSceneSubTrack) {
          var f = a.Sections;
          var v = f?.Num() || 0;
          for (let e = 0; e < v; e++) {
            var S = f.Get(e);
            if (S instanceof UE.MovieSceneSubSection) {
              this.Model.CurShotStartFrames.push(S.GetStartFrame().Value.Value / s);
              this.Model.CurShotEndFrames.push(S.GetEndFrame().Value.Value / s);
            }
          }
        }
      }
    }
    if (this.Model.GetType() === 1) {
      this.Model.CurShotStartFrames.length = 0;
      this.Model.CurShotEndFrames.length = 0;
      o = this.wio(e);
      this.Model.CurShotStartFrames.push(0);
      o?.forEach(e => {
        this.Model.CurShotStartFrames.push(e);
      });
      this.Model.CurShotStartFrames.pop();
      o?.forEach(e => {
        this.Model.CurShotEndFrames.push(e);
      });
    }
    this.Model.CurSubtitleStartFrames.sort((e, t) => e - t);
    this.Model.CurSubtitleEndFrames.sort((e, t) => e - t);
    this.Model.CurShotStartFrames.sort((e, t) => e - t);
    this.Model.CurShotEndFrames.sort((e, t) => e - t);
  }
  wio(e) {
    var i = new Array();
    if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
      let t = undefined;
      const f = UE.KuroSequenceRuntimeFunctionLibrary.GetMasterTracks(e);
      for (let e = 0; e < f.Num(); e++) {
        var r = f.Get(e);
        if (r instanceof UE.MovieSceneSubTrack) {
          t = r;
          break;
        }
      }
      if (t) {
        const v = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(t);
        for (let e = 0; e < v.Num(); e++) {
          var o = v.Get(e);
          var s = o.GetSequence();
          var a = o.GetStartFrame().Value.Value;
          var n = o.GetEndFrame().Value.Value;
          var l = o.Parameters.StartFrameOffset.Value;
          var h = UE.KuroSequenceRuntimeFunctionLibrary.GetSpawnables(s);
          for (let e = 0; e < h.Num(); e++) {
            var _ = h.Get(e);
            if (UE.KuroSequenceRuntimeFunctionLibrary.GetObjectTemplate(_).GetClass() === UE.CineCameraActor.StaticClass()) {
              const f = UE.KuroSequenceRuntimeFunctionLibrary.GetTracks(_);
              for (let e = 0; e < f.Num(); e++) {
                var u = f.Get(e);
                if (u.GetClass() === UE.MovieScene3DTransformTrack.StaticClass()) {
                  const v = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(u);
                  for (let e = 0; e < v.Num(); e++) {
                    var c = v.Get(e).GetEndFrame().Value.Value - l + a - UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(s);
                    if (a < c && c <= n) {
                      i.push(c);
                    } else if (n < c) {
                      i.push(n);
                    }
                  }
                  break;
                }
              }
              break;
            }
          }
        }
        i.sort((e, t) => e - t);
        return i;
      }
    }
  }
  yio() {
    var t = this.Model.SequenceData;
    for (let e = 0; e < t.剧情资源.Num(); e++) {
      var i;
      var r = t.剧情资源.Get(e);
      var o = this.GetFinalPosition(r, FNameUtil_1.FNameUtil.IsNothing(t.GeneratedData?.BlendOutTag) ? SequenceDefine_1.HERO_TAG : t.GeneratedData.BlendOutTag);
      if (o) {
        i = Rotator_1.Rotator.Create(o.Rotator());
        o = Vector_1.Vector.Create(o.GetLocation());
        if (t.类型 === 0 || t.类型 === 2) {
          i.Yaw += 90;
        }
        if (o.IsNearlyZero()) {
          FlowController_1.FlowController.LogError("Seq最终位置提取到0点坐标", ["name", r.GetName()]);
        }
        r = Transform_1.Transform.Create(i.Quaternion(), o, Vector_1.Vector.OneVectorProxy);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "提取到坐标点", ["index", e], ["result", r]);
        }
        this.Model.AddFinalPos(r);
      } else {
        this.Model.CurFinalPos.push(undefined);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "提取不到坐标点", ["index", e]);
        }
      }
    }
  }
  GetFinalPosition(t, i) {
    var r = new UE.FrameTime(new UE.FrameNumber(UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(t)), 0);
    var o = new UE.FrameTime(new UE.FrameNumber(UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackEnd(t) - 1), 0);
    var e = Transform_1.Transform.Create();
    const s = this.GetSequenceLastTransform(t, i, r, o, e);
    if (s) {
      return e.ToUeTransformOld();
    }
    t = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(t, UE.MovieSceneCinematicShotTrack.StaticClass());
    t = t.Num() > 0 ? t.Get(0) : undefined;
    if (ObjectUtils_1.ObjectUtils.IsValid(t)) {
      var a = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(t);
      var n = a.Num();
      var l = new Array();
      for (let e = 0; e < n; e++) {
        var h;
        var _;
        var u = a.Get(e);
        const t = u.GetSequence();
        if (ObjectUtils_1.ObjectUtils.IsValid(t) && t.FindBindingByTag(i).Guid.IsValid) {
          h = u.GetStartFrame().Value.Value;
          _ = u.GetEndFrame().Value.Value;
          if (!(h > o.FrameNumber.Value) && !(_ <= r.FrameNumber.Value)) {
            l.push(u);
          }
        }
      }
      l.sort((e, t) => t.GetEndFrame().Value.Value - e.GetEndFrame().Value.Value);
      var c = new UE.FrameTime();
      var f = new UE.FrameTime();
      for (const g of l) {
        const t = g.GetSequence();
        var v = UE.KuroSequenceRuntimeFunctionLibrary.GetStartFrame(g) < r.FrameNumber.Value ? r.FrameNumber.Value - UE.KuroSequenceRuntimeFunctionLibrary.GetStartFrame(g) : 0;
        var v = g.Parameters.StartFrameOffset.Value + UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(t) + v;
        var S = UE.KuroSequenceRuntimeFunctionLibrary.GetEndFrame(g) - 1 > o.FrameNumber.Value ? o.FrameNumber.Value - UE.KuroSequenceRuntimeFunctionLibrary.GetStartFrame(g) : UE.KuroSequenceRuntimeFunctionLibrary.GetEndFrame(g) - UE.KuroSequenceRuntimeFunctionLibrary.GetStartFrame(g) - 1;
        var S = g.Parameters.StartFrameOffset.Value + UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(t) + S;
        c.FrameNumber.Value = v;
        f.FrameNumber.Value = S;
        const s = this.GetSequenceLastTransform(t, i, c, f, e);
        if (s) {
          return e.ToUeTransformOld();
        }
      }
    }
  }
  GetSequenceLastTransform(t, e, i, r, o) {
    var s = t.FindBindingsByTag(e);
    let a = undefined;
    for (let e = 0; e < s.Num(); e++) {
      var n = s.Get(e);
      if ((a = UE.KuroSequenceRuntimeFunctionLibrary.FindBindingById(t, n.Guid)).BindingID.IsValid()) {
        break;
      }
      a = undefined;
    }
    if (!a) {
      return false;
    }
    e = UE.KuroSequenceRuntimeFunctionLibrary.FindTracksByType(a, UE.MovieScene3DTransformTrack.StaticClass());
    if (e.Num() !== 1) {
      return false;
    }
    let l = undefined;
    var e = e.Get(0);
    var h = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(e);
    for (let e = 0; e < h.Num(); e++) {
      var _ = h.Get(e);
      if (UE.KuroSequenceRuntimeFunctionLibrary.SectionContains(_, r)) {
        l = r;
        break;
      }
      var u = _.GetEndFrame();
      var _ = _.GetStartFrame();
      if (u.Type !== 2 && !(u.Value.Value <= i.FrameNumber.Value) && !(_.Value.Value > r.FrameNumber.Value)) {
        if (l) {
          if (u.Value.Value - 1 > l.FrameNumber.Value) {
            l.FrameNumber.Value = u.Value.Value - 1;
          }
        } else {
          l = new UE.FrameTime(new UE.FrameNumber(u.Value.Value - 1), 0);
        }
      }
    }
    return !!l && (e = UE.KuroSequenceRuntimeFunctionLibrary.GetFrameTransform(e, l), o.FromUeTransform(e), true);
  }
  egl(e) {
    if (!e) {
      return false;
    }
    e = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(e, UE.MovieSceneCinematicShotTrack.StaticClass());
    const t = e?.Num() > 0 ? e?.Get(0) : undefined;
    if (!ObjectUtils_1.ObjectUtils.IsValid(t)) {
      return false;
    }
    var i = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(t);
    var r = i.Num();
    var o = new Array();
    for (let e = 0; e < r; e++) {
      var s = i.Get(e);
      o.push(s);
    }
    let a = undefined;
    for (const c of o) {
      a = c.GetSequence();
    }
    if (!a) {
      return false;
    }
    e = this.tgl(a, SequenceDefine_1.CAMERA_TAG);
    if (!e) {
      return false;
    }
    let n = false;
    var l = e.Tracks;
    for (let e = 0; e < l.Num(); e++) {
      const t = l.Get(e);
      if (t instanceof UE.MovieSceneBoolTrack) {
        var h = t;
        if (h) {
          n = false;
          for (let e = 0; e < h.Sections.Num(); e++) {
            var _ = h.Sections.Get(e);
            if (_) {
              var u = _;
              if (u) {
                if (u.BoolCurve?.bHasDefaultValue) {
                  n = u.BoolCurve?.DefaultValue;
                } else {
                  n = true;
                  for (let e = 0; e < u.BoolCurve?.Values.Num(); e++) {
                    if (!u.BoolCurve?.Values.Get(e)) {
                      n = false;
                      break;
                    }
                  }
                }
              }
            }
          }
          break;
        }
      }
    }
    return n;
  }
  tgl(e, t) {
    var r = e.MovieScene.Spawnables;
    var o = r.Num() ?? 0;
    var s = this.igl(e, t);
    if (s && !(s.length <= 0)) {
      let i = undefined;
      for (let e = 0; e < o; e++) {
        if (this.rgl(r.Get(e)?.Guid, s.at(0).ObjectGuid)) {
          i = r.Get(e);
          break;
        }
      }
      if (i) {
        var a = e.MovieScene.Possessables;
        let t = undefined;
        for (let e = 0; e < a.Num(); e++) {
          var n = a.Get(e);
          if (this.rgl(n.ParentGuid, i.Guid)) {
            t = n;
            break;
          }
        }
        if (t) {
          return this.ogl(e, t.Guid);
        }
      }
    }
  }
  ogl(e, t) {
    var i = e.MovieScene.ObjectBindings;
    let r = undefined;
    for (let e = 0; e < i.Num(); e++) {
      var o = i.Get(e);
      if (this.rgl(t, o.ObjectGuid)) {
        r = o;
        break;
      }
    }
    return r;
  }
  igl(t, e) {
    var e = t.MovieScene.BindingGroups.Get(e);
    var i = [];
    if (e) {
      var r = e.IDs;
      var o = r?.Num() || 0;
      for (let e = 0; e < o; e++) {
        var s = r.Get(e);
        var a = t.MovieScene.ObjectBindings;
        var n = a.Num();
        for (let e = 0; e < n; e++) {
          var l = a.Get(e);
          if (this.rgl(l.ObjectGuid, s.Guid)) {
            i.push(l);
          }
        }
      }
    }
    if (i.length > 0) {
      return i;
    }
  }
  rgl(e, t) {
    return e.A === t.A && e.B === t.B && e.C === t.C && e.D === t.D;
  }
  LoadNecessaryData(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 38, "[剧情加载等待] SequenceDA-开始");
    }
    this.Cio = ResourceSystem_1.ResourceSystem.LoadAsync(this.Model.Config.Path, UE.BP_SequenceData_C, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 38, "[剧情加载等待] SequenceDA-结束");
      }
      this.Cio = ResourceSystem_1.ResourceSystem.InvalidId;
      if (ObjectUtils_1.ObjectUtils.IsValid(e) && (this.Model.SequenceData = e, this.Cio = ResourceSystem_1.ResourceSystem.InvalidId, this.Model.SubSeqLen = this.Model.SequenceData.剧情资源.Num(), this.Model.LastIndex = 0, this.Model.SubSeqIndex = 0, this.Model.NextIndex = 0, this.Mio(), this.Model.UseRuntimeData ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "运行时获取FadeEnd数据"), this.Eio()) : this.Sio(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "处理FadeEnd数据完成", ["FadeEnd", this.Model.IsFadeEnd]), this.Model.SequenceData.SaveFinalTransform ? (this.Model.UseRuntimeData ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "运行时处理SequenceData最终位置"), this.yio()) : this.Iio(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "处理SequenceData数据完成", ["FinalPosNum", this.Model.CurFinalPos.length])) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 38, "不使用最终位置"), this.Model.Type === 0)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 45, "过场生成SubSeuqenceMap");
        }
        this.lzl();
      }
      t?.();
    });
  }
  ReadNeedHidePlayer() {
    var e = ModelManager_1.ModelManager.SequenceModel.GetCurrentSequence();
    if (e) {
      var t = this.hzl.get(e);
      if (t) {
        var i = this.Model.CurLevelSeqActor?.SequencePlayer?.GetCurrentTime().Time.FrameNumber.Value;
        if (i) {
          for (let e = 0; e < t.endFrameArray.length; e++) {
            if (i < t.endFrameArray[e]) {
              return !t.havePlayerArray[e];
            }
          }
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 45, "不存在的subInfo");
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 45, "读取现在的Seq失败");
    }
    return false;
  }
  lzl() {
    var t = this.Model.SequenceData;
    this.hzl.clear();
    for (let e = 0; e < t.剧情资源.Num(); e++) {
      var i = t.剧情资源.Get(e);
      this.czl(i);
    }
  }
  czl(t) {
    var i = t.MovieScene.MasterTracks;
    var r = i?.Num() || 0;
    for (let e = 0; e < r; e++) {
      var o = i.Get(e);
      if (o instanceof UE.MovieSceneSubTrack) {
        var s = o.Sections;
        var a = s?.Num() || 0;
        var n = new SubSeqInfo();
        for (let e = 0; e < a; e++) {
          var l;
          var h = s.Get(e);
          if (h instanceof UE.MovieSceneSubSection && h) {
            if (h.SubSequence) {
              l = !!h.SubSequence.FindBindingByTag(SequenceDefine_1.HERO_TAG).Guid.IsValid();
              n.havePlayerArray.push(l);
              n.endFrameArray.push(h.GetEndFrame().Value.Value);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Plot", 45, "失效的SubSequence", ["name", h.GetName()]);
            }
          }
        }
        this.hzl.set(t, n);
      }
    }
  }
}
exports.SequenceAssistant = SequenceAssistant;
//# sourceMappingURL=SequenceAssistant.js.map