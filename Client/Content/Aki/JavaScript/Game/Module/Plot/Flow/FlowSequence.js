"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowSequence = exports.INVALID_INDEX = exports.FINISH_INDEX = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const HoldingHandsController_1 = require("../../HoldHands/HoldingHandsController");
const MovementLockController_1 = require("../../MovementLock/MovementLockController");
const TeleportController_1 = require("../../Teleport/TeleportController");
const PlotController_1 = require("../PlotController");
const SequenceController_1 = require("../Sequence/SequenceController");
const FlowNetworks_1 = require("./FlowNetworks");
exports.FINISH_INDEX = -1;
exports.INVALID_INDEX = -2;
class FlowSequence {
  constructor() {
    this.f$i = false;
    this.p$i = false;
    this.v$i = undefined;
    this.M$i = new Map();
    this.E$i = exports.INVALID_INDEX;
    this.S$i = undefined;
    this.nx = undefined;
    this.y$i = false;
    this.I$i = false;
    this.T$i = false;
    this.L$i = 0;
    this.D$i = undefined;
    this.R$i = [];
    this.Djs = new Map();
    this.Ajs = new Map();
    this.SubtitleActionPromise = undefined;
    this.OptionActionPromise = undefined;
    this.fkl = new Map();
    this.L9_ = new Map();
    this.Q9u = undefined;
    this.njc = new Array();
    this.U$i = -1;
    this.A$i = false;
    this.owt = e => {
      e *= 1000;
      if (e > TimerSystem_1.MIN_TIME && e < TimerSystem_1.MAX_TIME) {
        this.Q9u = TimerSystem_1.TimerSystem.Delay(() => {
          ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(true);
          this.Q9u = undefined;
        }, e);
      } else {
        ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(true);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence] Seq开始播放允许跳过", ["time", e]);
      }
    };
    this.P$i = () => {
      this.nx.CurTalkId = -1;
      this.nx.CurOptionId = -1;
      this.nx.CurSubActionId = 0;
      this.nx.CurShowTalk = undefined;
      this.nx.CurShowTalkActionId = 0;
      ModelManager_1.ModelManager.PlotModel.GrayOptionMap.clear();
      ModelManager_1.ModelManager.PlotModel.CurShowTalk = undefined;
      ModelManager_1.ModelManager.PlotModel.OptionEnable = true;
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotSequencePlay, this.owt);
      this.Clear();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence] 停止");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotEndShowTalk);
      ControllerHolder_1.ControllerHolder.FlowController.RunNextAction();
    };
    this.x$i = e => {
      var t;
      if (this.SubtitleActionPromise) {
        t = this.SubtitleActionPromise;
        this.SubtitleActionPromise = undefined;
        t.SetResult();
      }
      if (this.T$i && e) {
        if (this.w$i()) {
          this.OnSelectOption(ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(this.S$i));
        } else if (this.L$i >= this.v$i.TalkItems.length) {
          this.OnSequenceStop();
        } else {
          t = this.v$i.TalkItems[this.L$i].Id;
          this.OnSubtitleStart(t);
          this.OnSubtitleEnd(t);
        }
      }
    };
    this.B$i = e => {
      var t;
      if (this.OptionActionPromise) {
        t = this.OptionActionPromise;
        this.OptionActionPromise = undefined;
        t.SetResult();
      }
      if (e && this.T$i) {
        if (this.L$i >= this.v$i.TalkItems.length) {
          this.OnSequenceStop();
        } else {
          t = this.v$i.TalkItems[this.L$i].Id;
          this.OnSubtitleStart(t);
          this.OnSubtitleEnd(t);
        }
      }
    };
    this.OnSequenceStop = () => {
      this.b$i();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence] Seq播放完毕");
      }
      this.p$i = false;
      this.Stop();
    };
  }
  get IsInit() {
    return this.f$i;
  }
  get IsPlaying() {
    return this.p$i;
  }
  Clear() {
    this.f$i = false;
    this.p$i = false;
    this.v$i = undefined;
    this.M$i.clear();
    this.E$i = exports.INVALID_INDEX;
    this.S$i = undefined;
    this.nx = undefined;
    this.y$i = false;
    this.I$i = false;
    this.T$i = false;
    this.L$i = undefined;
    this.D$i = undefined;
    this.R$i.length = 0;
    this.Djs.clear();
    this.Ajs.clear();
    this.U$i = -1;
    this.A$i = false;
    this.fkl.clear();
    this.L9_.clear();
    this.Q9u?.Remove();
    this.Q9u = undefined;
    this.njc.length = 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 38, "清理引用数据-FlowSequence");
    }
  }
  Init(e, t) {
    this.Clear();
    this.v$i = e;
    if (!this.v$i || StringUtils_1.StringUtils.IsEmpty(this.v$i.SequenceDataAsset)) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("[FlowSequence] 配置错误");
    } else {
      this.v$i.TalkSequence?.forEach((e, t) => {
        e.forEach(e => {
          if (this.M$i.has(e)) {
            ControllerHolder_1.ControllerHolder.FlowController.LogError("[FlowSequence] 初始化分段时Id重复");
          } else {
            this.M$i.set(e, t);
          }
        });
      });
      this.nx = t;
      this.nx.CurTalkId = -1;
      this.nx.CurOptionId = -1;
      this.nx.CurSubActionId = 0;
      this.E$i = 0;
      this.L$i = 0;
      this.f$i = true;
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotSequencePlay, this.owt);
    }
  }
  Start(e) {
    if (this.IsInit && !this.IsPlaying) {
      this.p$i = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence] 开始");
      }
      if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelA") {
        ModelManager_1.ModelManager.SequenceModel.Type = 0;
      } else if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelB") {
        ModelManager_1.ModelManager.SequenceModel.Type = 1;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotStartShowTalk, this.v$i);
      ModelManager_1.ModelManager.PlotModel.CurShowTalk = this.v$i;
      const i = new Array();
      this.v$i.TalkFrameEvents?.forEach(e => {
        var t;
        i.push(e.FrameEvent);
        if (ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.has(e.Position?.TalkItemId)) {
          if (t = ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.get(e.Position.TalkItemId)) {
            t.add(e.FrameEvent.EventKey);
            ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.set(e.Position.TalkItemId, t);
          }
        } else {
          (t = new Set()).add(e.FrameEvent.EventKey);
          ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.set(e.Position.TalkItemId, t);
        }
      });
      const t = [];
      if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelB") {
        this.v$i.TalkItems?.forEach(e => {
          if (e.TidTalk && e.PlayVoice) {
            t.push(e.TidTalk);
          }
        });
      }
      if (this.nx.IsBackground) {
        SequenceController_1.SequenceController.ManualFinish();
        SequenceController_1.SequenceController.LoadData({
          Path: this.v$i.SequenceDataAsset,
          ResetCamera: this.v$i.ResetCamera,
          FrameEvents: i
        }, () => {
          this.Skip();
        });
      } else {
        SequenceController_1.SequenceController.Play({
          Path: this.v$i.SequenceDataAsset,
          ResetCamera: this.v$i.ResetCamera,
          FrameEvents: i,
          SeqBlendAnim: this.v$i.SeqBlendAnim
        }, t, this.OnSequenceStop, true, true, this.nx.IsWaitRenderData, 1, e);
      }
    }
  }
  Stop(e = 0) {
    if (this.IsInit) {
      if (this.IsPlaying) {
        this.p$i = false;
        SequenceController_1.SequenceController.ManualFinish();
      }
      this.q$i().finally(this.P$i);
    }
  }
  async q$i() {
    await PlotController_1.PlotController.CheckFormation();
    await PlotController_1.PlotController.CheckSwitchSubLevel();
    if (MovementLockController_1.MovementLockController.LockMode === 2) {
      await ControllerHolder_1.ControllerHolder.GameModeController?.ResetStreamingSourceAttachment();
    }
    if (this.T$i && !ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
      var e = this.S$i ? this.M$i.get(this.S$i.Id) : 0;
      if (e >= 0 && e < this.R$i.length && this.R$i[e]) {
        ModelManager_1.ModelManager.PlotModel.IsFadeIn = true;
      }
      if (this.D$i) {
        if (e = e < this.D$i.length ? this.D$i[e] : undefined) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "SaveFinalPos", ["transform", e]);
          }
          await TeleportController_1.TeleportController.TeleportToPositionNoLoading(e.GetLocation().ToUeVector(), e.GetRotation().Rotator().ToUeRotator(), "FlowSequence.Stop", false);
          FlowNetworks_1.FlowNetworks.RequestSeqEndPosition(this.nx, e.GetLocation(), e.GetRotation().Rotator());
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "剧情SeqDA的FinalPos未配置，跳过时最终位置将不准确，联系策划修改");
        }
      }
      for (const s of this.njc) {
        var t;
        var i;
        var o = ModelManager_1.ModelManager.HoldingHandsModel.GetRelation(s.toString());
        if (o && (t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(o.Leader?.Entity), i = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(o.Follower?.Entity), t) && i) {
          HoldingHandsController_1.HoldingHandsController.RequestHoldHands(o.Key, t, i, o.LeaderHandType, false, false, "FlowSequence结束");
        }
      }
    }
  }
  Skip() {
    if (this.IsInit && this.IsPlaying && !this.T$i) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence] 执行跳过");
      }
      this.T$i = true;
      if (ModelManager_1.ModelManager.SequenceModel.CurFinalPos?.length !== 0) {
        this.D$i = Object.assign([], ModelManager_1.ModelManager.SequenceModel.CurFinalPos);
      }
      ModelManager_1.ModelManager.SequenceModel.IsFadeEnd.forEach(e => {
        this.R$i.push(e);
      });
      ModelManager_1.ModelManager.SequenceModel.FrameEvents.forEach((e, t) => {
        this.Ajs.set(t, e);
      });
      ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.forEach((e, t) => {
        this.Djs.set(t, e);
      });
      ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.forEach((e, t) => {
        this.Djs.set(t, e);
      });
      for (const t of ModelManager_1.ModelManager.SequenceModel.NeedHideNpcSet) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t, true, "显示NPC", false);
      }
      var e;
      ModelManager_1.ModelManager.SequenceModel.NeedHideNpcSet.clear();
      if (ModelManager_1.ModelManager.SequenceModel.PlotBindingVehicle?.Entity) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(ModelManager_1.ModelManager.SequenceModel.PlotBindingVehicle?.Entity, true, "Plot enable vehicle", false);
        ModelManager_1.ModelManager.SequenceModel.PlotBindingVehicle = undefined;
      }
      for (const i of ModelManager_1.ModelManager.SequenceModel.NpcGroupPerform) {
        this.njc.push(i);
      }
      SequenceController_1.SequenceController.ManualFinish();
      this.p$i = false;
      if (this.fkl.size > 0) {
        for (const o of this.fkl.keys()) {
          this.OnQteEnd(o);
        }
      }
      if (this.y$i) {
        this.OnSubtitleEnd(this.S$i.Id);
      } else if (this.w$i() && !this.I$i) {
        this.RunSequenceFrameEventsWhenSkip(this.S$i?.Id);
        this.OnSelectOption(ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(this.S$i));
      } else if (this.L$i >= this.v$i.TalkItems.length) {
        this.RunSequenceFrameEventsWhenSkip(this.S$i?.Id);
        this.OnSequenceStop();
      } else {
        this.RunSequenceFrameEventsWhenSkip(this.S$i?.Id);
        e = this.v$i.TalkItems[this.L$i].Id;
        this.OnSubtitleStart(e);
        this.OnSubtitleEnd(e);
      }
    }
  }
  w$i() {
    return !!this.S$i?.Options && this.S$i?.Options?.length > 0;
  }
  b$i() {
    if (this.A$i && !this.I$i) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("遗漏选项", ["Miss TalkItem Id", this.U$i]);
    }
    this.U$i = this.S$i?.Id ?? -1;
    this.A$i = this.w$i();
  }
  OnJumpTalk(t) {
    if (this.IsInit && (this.E$i = this.M$i.get(t) ?? exports.FINISH_INDEX, SequenceController_1.SequenceController.SetNextSequenceIndex(this.E$i), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "[FlowSequence] JumpTalk设置下个分支Seq", ["NextIndex", this.E$i]), this.L$i = this.v$i.TalkItems.findIndex(e => e.Id === t), this.T$i)) {
      this.OnSubtitleStart(t);
      this.OnSubtitleEnd(t);
    }
  }
  OnFinishTalk() {
    if (this.IsInit && (this.E$i = exports.FINISH_INDEX, SequenceController_1.SequenceController.SetNextSequenceIndex(this.E$i), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "[FlowSequence] FinishTalk设置结束"), this.T$i)) {
      this.OnSequenceStop();
    }
  }
  OnSubtitleStart(t) {
    var e;
    if (this.IsInit) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "[FlowSequence][Subtitle] 字幕显示", ["talkId", t]);
      }
      e = this.v$i.TalkItems.find(e => e.Id === t);
      if (this.GetNextTalkItem().Id !== t) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("[FlowSequence][Subtitle] Seq字幕顺序与编辑器对不上", ["talkId", t], ["SeqIndex", ModelManager_1.ModelManager.SequenceModel.SubSeqIndex], ["index in seq", this.L$i]);
        this.L$i = this.v$i.TalkItems.indexOf(e);
      }
      this.L$i++;
      if (!e) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("[FlowSequence][Subtitle] 依赖编辑器的Seq找不到字幕", ["talkItem.ID", t]);
      }
      this.y$i = true;
      this.nx.CurTalkId = t;
      this.nx.CurOptionId = -1;
      this.S$i = e;
      this.b$i();
      this.I$i = false;
    }
  }
  OnSubtitleEnd(e) {
    if (this.T$i) {
      this.RunSequenceFrameEventsWhenSkip(e);
    }
    return !!this.IsInit && !!this.y$i && !(e !== undefined && this.S$i.Id !== e ? (ControllerHolder_1.ControllerHolder.FlowController.LogError("[FlowSequence] 结束对话Id错误", ["id", e], ["cur", this.S$i.Id]), 1) : (this.y$i = false, this.SubtitleActionPromise = new CustomPromise_1.CustomPromise(), Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 26, "[FlowSequence][Subtitle] 字幕关闭"), this.G$i(this.S$i.Actions, this.x$i), 0));
  }
  OnQteStart(t) {
    var e = this.v$i.TalkItems.find(e => e.Id === t);
    if (this.GetNextTalkItem().Id !== t) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("[FlowSequence][Subtitle] Qte在Seq中顺序与编辑器不符合", ["id", t], ["SeqIndex", ModelManager_1.ModelManager.SequenceModel.SubSeqIndex], ["index in seq", this.L$i]);
      this.L$i = this.v$i.TalkItems.indexOf(e);
    }
    this.L$i++;
    this.fkl.set(t, e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "[FlowSequence][Subtitle] Qte开启", ["id", t]);
    }
    return e.QteId;
  }
  OnQteExecute(t, i) {
    var o = this.fkl.get(t);
    if (o && (this.L9_.set(t, -1), o.Options) && o.Options.length !== 0) {
      for (let e = 0; e < o.Options.length; e++) {
        var s = o.Options[e];
        if (s.TypeParams) {
          switch (s.TypeParams.Type) {
            case "QteSucceed":
              if (i && (this.w9_(o, e), Log_1.Log.CheckInfo())) {
                Log_1.Log.Info("Plot", 26, "[FlowSequence][Subtitle] Qte成功执行", ["id", t], ["optionIndex", e]);
              }
              break;
            case "QteFailed":
              if (!i) {
                this.w9_(o, e);
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Plot", 26, "[FlowSequence][Subtitle] Qte失败执行", ["id", t], ["optionIndex", e]);
                }
              }
              break;
            case "QteSucceedDelayExec":
              if (i) {
                this.L9_.set(t, e);
              }
              break;
            case "QteFailedDelayExec":
              if (!i) {
                this.L9_.set(t, e);
              }
          }
        }
      }
    }
  }
  OnQteEnd(e) {
    if (this.fkl.has(e)) {
      if (!this.L9_.has(e)) {
        if (!this.T$i) {
          return;
        }
        this.OnQteExecute(e, false);
      }
      var t = this.fkl.get(e);
      var i = this.L9_.get(e);
      this.L9_.delete(e);
      this.fkl.delete(e);
      if (i !== -1 && (this.w9_(t, i), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Plot", 26, "[FlowSequence][Subtitle] Qte关闭", ["id", e], ["delay option index", i], ["delay no more", this.T$i]);
      }
    }
  }
  OnSelectOption(e) {
    if (!this.IsInit) {
      return false;
    }
    if (this.nx.CurOptionId !== -1 || this.I$i) {
      return false;
    }
    this.I$i = true;
    var t;
    var i;
    var o = this.S$i;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "[FlowSequence] 选择选项", ["index", e]);
    }
    i = e < (t = o.Options?.length ?? 0) ? o.Options[e].Actions : undefined;
    if (t <= e) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("[FlowSequence] 选项超出下标");
      return false;
    } else {
      ControllerHolder_1.ControllerHolder.FlowController.SelectOption(o.Id, e);
      this.OptionActionPromise = new CustomPromise_1.CustomPromise();
      this.G$i(i, this.B$i);
      return true;
    }
  }
  w9_(e, t) {
    if (e.Options && e.Options.length !== 0) {
      ControllerHolder_1.ControllerHolder.FlowController.SelectOption(e.Id, t);
      this.G$i(e.Options[t].Actions, undefined, true);
    }
  }
  G$i(e, t, i = false) {
    ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(e, e => {
      t?.(e);
    }, i);
  }
  CreateSubtitleFromTalkItem(t) {
    var e;
    if (this.IsInit) {
      if (!(e = this.v$i.TalkItems.find(e => e.Id === t))) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("[FlowSequence] 剧情Seq找不到字幕", ["talkId", t]);
      }
      return e;
    }
  }
  GetNextTalkItem() {
    if (this.L$i !== undefined && this.v$i !== undefined && this.v$i.TalkItems.length > 0 && this.v$i.TalkItems.length > this.L$i) {
      return this.v$i.TalkItems[this.L$i];
    } else {
      return undefined;
    }
  }
  RunSequenceFrameEventsWhenSkip(i) {
    if (i) {
      let e = undefined;
      if (e = this.Djs.has(i) ? this.Djs.get(i) : e) {
        e.forEach(e => {
          var t = this.Ajs.get(e);
          if (t && t.length !== 0) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Plot", 45, "RunSequenceFrameEventsWhenSkip", ["id", i], ["key", e]);
            }
            ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(t, () => {});
          }
        });
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 45, "RunSequenceFrameEventsWhenSkip 但id为空");
    }
  }
  GetAllQte() {
    const t = new Array();
    this.v$i?.TalkItems.forEach(e => {
      if (e.Type === "QTE") {
        t.push(e.QteId);
      }
    });
    return t;
  }
}
exports.FlowSequence = FlowSequence;
//# sourceMappingURL=FlowSequence.js.map