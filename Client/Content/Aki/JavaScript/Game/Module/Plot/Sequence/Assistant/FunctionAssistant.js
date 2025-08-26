"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionAssistant = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const IAction_1 = require("../../../../../UniverseEditor/Interface/IAction");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
const PlotController_1 = require("../../PlotController");
const SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class FunctionAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments);
    this.hio = undefined;
    this.lio = undefined;
    this.Tvl = undefined;
  }
  Load(i) {
    var e = this._io(this.Model.Config.FrameEvents);
    this.SetFrameEvents(this.Model.Config.FrameEvents);
    this.hio = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("FunctionAssistant.Load", e, e => {
      this.hio = undefined;
      i(e ?? false);
    });
  }
  PreAllPlay() {
    this.lio = undefined;
    ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.OnSeqStart();
  }
  AllStop() {
    this.Model.FrameEvents.clear();
  }
  End() {
    if (this.hio) {
      this.hio.Cancel();
    }
    if (this.lio) {
      this.lio.Remove();
      UiManager_1.UiManager.CloseView("PlotLogoView");
    }
    ModelManager_1.ModelManager.PlotModel.PlotWeather.StopAllWeather();
    ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.OnSeqEnd();
    this.Model.FrameEvents.clear();
    this.sfu();
  }
  _io(e) {
    var i = new Array();
    if (e?.length) {
      for (const o of e) {
        if (o.EventActions?.length) {
          for (const r of o.EventActions) {
            let e = undefined;
            switch (r.Name) {
              case "AwakeEntity":
                var t = r.Params;
                e = t.EntityIds;
                break;
              case "ChangeEntityState":
                t = r.Params;
                e = t.Type !== IAction_1.EChangeEntityState.BatchDirectly ? [t.EntityId] : [...t.EntityIds];
            }
            if (e && e.length > 0) {
              for (const a of e) {
                i.push(a);
              }
            }
          }
        }
      }
    }
    return i;
  }
  SetFrameEvents(e) {
    if (e && e.length !== 0) {
      for (const i of e) {
        this.Model.FrameEvents.set(i.EventKey, i.EventActions);
        this.Model.ActionQueue.Push(i.EventKey);
      }
    }
  }
  RunSequenceFrameEvents(o) {
    if (this.Model.State !== 5) {
      var e = this.Model.GetFrameEvents(o);
      if (!this.Model.ActionQueue || this.Model.ActionQueue.Size <= 0) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 45, "ActionQueue为空");
        }
      } else {
        if (this.Model.ActionQueue.Pop() !== o && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "编辑器与Seq帧事件顺序不一致，可能会导致跳过的表现错误");
        }
        if (e && e.length !== 0) {
          ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(e, () => {}, true);
          let t = undefined;
          this.Model.FrameEventsMap.forEach((e, i) => {
            if (e.has(o)) {
              t = i;
            }
          });
          if (t) {
            this.Model.FrameEventsMap.delete(t);
          }
        } else {
          ControllerHolder_1.ControllerHolder.FlowController.LogError("没有找到对应的帧事件", ["key", o]);
        }
      }
    }
  }
  ShowLogo(e) {
    e *= CommonDefine_1.MILLIONSECOND_PER_SECOND;
    if (e < TimerSystem_1.MIN_TIME) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "展示logo时间过短，不展示");
      }
    } else {
      UiManager_1.UiManager.OpenView("PlotLogoView");
      this.lio = TimerSystem_1.TimerSystem.Delay(() => {
        UiManager_1.UiManager.CloseView("PlotLogoView");
        this.lio = undefined;
      }, e);
    }
  }
  async OpenBackgroundImage(e, i, t = true) {
    var o;
    var r = PlotController_1.PlotController.GetCurrentViewName();
    if (r && UiManager_1.UiManager.IsViewShow(r)) {
      o = UiManager_1.UiManager.GetViewByName(r);
      await (this.Tvl = o).OpenBackgroundUi(e, i, t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 45, "Ui预览图:尝试打开预览图但PlotView未打开", ["viewName", r]);
    }
  }
  async OpenBackgroundImageInArray(e, i) {
    var t;
    var o = PlotController_1.PlotController.GetCurrentViewName();
    if (o && UiManager_1.UiManager.IsViewShow(o)) {
      t = UiManager_1.UiManager.GetViewByName(o);
      await (this.Tvl = t).OpenBackgroundUiForSeekSpine(e, i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 45, "Ui预览图:尝试打开预览图但PlotView未打开", ["viewName", o]);
    }
  }
  async PlayUiLevelSequence(e) {
    var i = PlotController_1.PlotController.GetCurrentViewName();
    if (i && UiManager_1.UiManager.IsViewShow(i)) {
      await UiManager_1.UiManager.GetViewByName(i).PlayUiLevelSeq(e);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 45, "Ui预览图:尝试打开预览图但PlotView未打开", ["viewName", i]);
    }
  }
  async CloseBackgroundImage() {
    var e = PlotController_1.PlotController.GetCurrentViewName();
    if (e && UiManager_1.UiManager.IsViewShow(e)) {
      await UiManager_1.UiManager.GetViewByName(e).CloseBackgroundUiThis();
      this.Tvl = undefined;
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 45, "Ui预览图:尝试打开预览图但PlotView未打开", ["viewName", e]);
    }
  }
  PlaySpineAnim(e, i = true) {
    if (this.Tvl && e) {
      this.Tvl.PlaySonUiSpine(e, i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 45, "Ui预览图:this.NowView不存在或者名字为空所以返回", ["spineName", e]);
    }
  }
  PlaySpineAnimInArray(e) {
    if (!this.Tvl || e.Num() <= 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 45, "Ui预览图:this.NowView不存在或者数组为空所以返回");
      }
    } else {
      this.Tvl.PlaySonUiSpineInArray(e);
    }
  }
  CloseSpineAnimation(e) {
    var i = PlotController_1.PlotController.GetCurrentViewName();
    if (i && UiManager_1.UiManager.IsViewShow(i)) {
      UiManager_1.UiManager.GetViewByName(i).CloseSpineAnimation(e);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 45, "Ui预览图:尝试关闭某个Spine动画但PlotView未打开", ["viewName", i]);
    }
  }
  CloseSpineAnimationInArray(i) {
    var e = PlotController_1.PlotController.GetCurrentViewName();
    if (e && UiManager_1.UiManager.IsViewShow(e)) {
      var t = UiManager_1.UiManager.GetViewByName(e);
      if (i.Num() <= 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 45, "Ui预览图:未填入数组，关闭失败");
        }
      } else {
        for (let e = 0; e < i.Num(); e++) {
          t.CloseSpineAnimation(i.Get(e));
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 45, "Ui预览图:尝试关闭某个Spine动画但PlotView未打开", ["viewName", e]);
    }
  }
  AdditionSeqPlay(e, i, t, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 45, "[额外Seq播放]AdditionSeqPlay:", ["levelSequence", e.GetName()], ["boneName", t], ["frame", o]);
    }
    this.afu(e, i, t, o);
  }
  AdditionSeqEnd() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 45, "[额外Seq播放]AdditionSeqEnd:", ["levelSequence", this.Model.AdditionSeqDirector?.GetName()]);
    }
    if (this.Model.AdditionSeqDirector && this.Model.AdditionSeqDirector.SequencePlayer) {
      var i = this.Model.CurLevelSeqActor?.GetBindingByTag(new UE.FName("Dart"), true);
      if (i) {
        for (let e = 0; e < i.Num(); e++) {
          var t = i.Get(e);
          if (t && t.IsA(UE.Actor.StaticClass()) && (t = t) && t.GetWorld()) {
            t.K2_DetachFromActor(0, 0, 0);
          }
        }
      }
      this.sfu();
    }
  }
  sfu() {
    var e = this.Model.AdditionSeqDirector;
    if (e && e.IsValid()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 45, "[额外Seq播放]AdditionGenerateDirector 销毁");
      }
      ActorSystem_1.ActorSystem.Put("AdditionSeqEnd", e);
      this.Model.AdditionSeqDirector = undefined;
    }
  }
  afu(e, t, o, i = 0) {
    var r = new UE.MovieSceneSequencePlaybackSettings();
    r.bDisableMovementInput = false;
    r.bDisableLookAtInput = false;
    if (this.Model.AdditionSeqDirector) {
      if (this.Model.AdditionSeqDirector.GetSequence() !== e) {
        this.AdditionSeqEnd();
        this.Model.AdditionSeqDirector = ActorSystem_1.ActorSystem.Spawn(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined);
      }
    } else {
      this.Model.AdditionSeqDirector = ActorSystem_1.ActorSystem.Spawn(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined);
    }
    var a = this.Model.AdditionSeqDirector.SequencePlayer;
    if (a?.IsValid()) {
      this.Model.AdditionSeqDirector.PlaybackSettings = r;
      this.Model.AdditionSeqDirector.SetSequence(e);
      a.Play();
      a.SetPlaybackPosition(new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(new UE.FrameNumber(i), 0), 0, "", 0, 0));
      const g = this.Model.AdditionSeqDirector.GetBindingByTag(new UE.FName("Target"), true);
      if (g.Num() <= 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 45, "[额外Seq播放]AdditionGenerateDirector 获取绑定目标 Target");
        }
        this.Model.AdditionSeqDirector.SequencePlayer.Stop();
      } else {
        var n = g.Get(0);
        var s = this.Model.CurLevelSeqActor?.GetBindingByTag(new UE.FName("Dart"), true);
        if (!s || s.Num() <= 0) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 45, "[额外Seq播放]AdditionGenerateDirector 获取不到要绑定的物品 Dart");
          }
          this.Model.AdditionSeqDirector.SequencePlayer.Stop();
        } else {
          for (let e = 0; e < s.Num(); e++) {
            var l = s.Get(e);
            if (l && l.IsA(UE.Actor.StaticClass())) {
              if (l && l.GetWorld()) {
                const g = n.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
                let i = undefined;
                for (let e = 0; e < g.Num(); e++) {
                  var _ = g.Get(e);
                  if (_.IsA(UE.SkeletalMeshComponent.StaticClass())) {
                    if (_.GetName() === t.toString()) {
                      if (Log_1.Log.CheckInfo()) {
                        Log_1.Log.Info("Plot", 45, "[额外Seq播放]找到了skeletalComp", ["skeletalCompName", _.GetName()]);
                      }
                      i = _;
                      break;
                    }
                  }
                }
                if (i) {
                  l.K2_AttachToComponent(i, o, 0, 0, 1, false);
                } else {
                  l.K2_AttachToActor(n, o, 0, 0, 1, false);
                }
              } else if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Plot", 45, "[额外Seq播放]AdditionGenerateDirector actor NotValid");
              }
            }
          }
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Plot", 45, "[额外Seq播放]AdditionGenerateDirector 没找到Player");
    }
  }
}
exports.FunctionAssistant = FunctionAssistant;
//# sourceMappingURL=FunctionAssistant.js.map