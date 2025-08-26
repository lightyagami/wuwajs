"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Queue_1 = require("../../../../Core/Container/Queue");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoginDefine_1 = require("../../Login/Data/LoginDefine");
const FlowSequence_1 = require("../Flow/FlowSequence");
const SequenceDefine_1 = require("./SequenceDefine");
class SequenceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.State = 0;
    this.IsPaused = false;
    this.Config = undefined;
    this.SequenceData = undefined;
    this.MainSeqCharacterMesh = undefined;
    this.TalkNpcList = undefined;
    this.BindingActorMap = new Map();
    this.BindingEntityMap = new Map();
    this.ControlEntityMap = new Map();
    this.FrameEvents = new Map();
    this.ActionQueue = new Queue_1.Queue();
    this.FrameEventsMap = new Map();
    this.IsViewTargetControl = false;
    this.IsSubtitleUiUse = false;
    this.IsWaitRenderData = false;
    this.PreviousMotionBlur = 0;
    this.SubSeqLen = 0;
    this.SubSeqIndex = FlowSequence_1.INVALID_INDEX;
    this.PlayRate = 1;
    this.SeqMainCharacter = undefined;
    this.BlendInCharacter = undefined;
    this.BlendInCharacters = new Array();
    this.BlendOutCharacter = undefined;
    this.BlendOutCharacters = new Array();
    this.NeedsQueueLatentAction = false;
    this.LatentActions = [];
    this.LastIndex = FlowSequence_1.INVALID_INDEX;
    this.NextIndex = FlowSequence_1.INVALID_INDEX;
    this.HidePlayerEntityHandle = undefined;
    this.FinishCallback = undefined;
    this.Type = undefined;
    this.RelativeTransform = undefined;
    this.CurFinalPos = [];
    this.IsFadeEnd = [];
    this.CurLanguageAudio = 0;
    this.CurLevelSeqActor = undefined;
    this.CurSubtitleStartFrames = [];
    this.CurSubtitleEndFrames = [];
    this.CurShotStartFrames = [];
    this.CurShotEndFrames = [];
    this.CurStartFrame = 0;
    this.CurEndFrame = 0;
    this.CurFrameRate = 0;
    this.SelectedOption = 0;
    this.CurSubtitle = new SequenceDefine_1.PlotSubtitleConfig();
    this.NeedJumpWhenResume = false;
    this._Du = undefined;
    this.IsSubtitleConfigInit = false;
    this.DefaultGuardTime = 0;
    this.DefaultAudioDelay = 0;
    this.DefaultAudioTransitionDuration = 0;
    this.EndLeastTime = undefined;
    this.UseRuntimeData = true;
    this.HasPlayedBefore = false;
    this.IsSeamless = false;
    this.PoseSwitched = false;
    this.MuteQteList = new Set();
    this.IsMuteAllQte = false;
    this.DisableMotionBlurFrame = 0;
    this.BeginSwitchFrame = 0;
    this.TwiceAnimFlag = false;
    this.AdditionSeqDirector = undefined;
    this.NpcGroupPerform = new Array();
    this.NpcRelationMap = new Map();
    this.NeedHideNpcSet = new Set();
  }
  get SeqMainCharacterModelConfig() {
    if (!this._Du) {
      var t = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(9);
      let i = SequenceDefine_1.FEMALE_SEQ_MODEL_ID;
      if (t === LoginDefine_1.ELoginSex.Boy) {
        i = SequenceDefine_1.MALE_SEQ_MODEL_ID;
      }
      t = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, i.toString());
      this._Du = t;
    }
    return this._Du;
  }
  Reset() {
    this.IsPaused = undefined;
    this.Config = undefined;
    this.SequenceData = undefined;
    this.BindingActorMap.clear();
    this.BindingEntityMap.clear();
    this.ControlEntityMap.clear();
    this.FrameEvents.clear();
    this.ActionQueue.Clear();
    this.FrameEventsMap.clear();
    this.IsViewTargetControl = undefined;
    this.IsSubtitleUiUse = undefined;
    this.PreviousMotionBlur = undefined;
    this.SubSeqLen = undefined;
    this.SubSeqIndex = FlowSequence_1.INVALID_INDEX;
    this.PlayRate = 1;
    this.SeqMainCharacter = undefined;
    this.NeedsQueueLatentAction = undefined;
    this.CurLevelSeqActor = undefined;
    this.LatentActions.length = 0;
    this.LastIndex = FlowSequence_1.INVALID_INDEX;
    this.NextIndex = FlowSequence_1.INVALID_INDEX;
    this.HidePlayerEntityHandle = undefined;
    this.CurSubtitleStartFrames.length = 0;
    this.CurSubtitleEndFrames.length = 0;
    this.CurShotStartFrames.length = 0;
    this.CurShotEndFrames.length = 0;
    this.CurFinalPos.length = 0;
    this.IsFadeEnd.length = 0;
    this.CurStartFrame = undefined;
    this.CurEndFrame = undefined;
    this.CurFrameRate = undefined;
    this.SelectedOption = undefined;
    this.CurSubtitle.Clear();
    this.Type = undefined;
    this.RelativeTransform = undefined;
    this.CurLanguageAudio = 0;
    this.NeedJumpWhenResume = false;
    this.AdditionSeqDirector = undefined;
    this.BlendInCharacters = new Array();
    this.BlendOutCharacters = new Array();
    this.NpcGroupPerform.length = 0;
    this.NpcRelationMap.clear();
    this.NeedHideNpcSet.clear();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 38, "清理引用数据-SequenceModel");
    }
  }
  GetCurrentSequence() {
    if (this.SubSeqIndex < this.SubSeqLen) {
      return this.SequenceData?.剧情资源.Get(this.SubSeqIndex);
    } else {
      return undefined;
    }
  }
  GetCurrentKeyFramesInfo() {
    if (this.SequenceData?.GeneratedData?.KeyFrames.IsValidIndex(this.SubSeqIndex)) {
      return this.SequenceData.GeneratedData.KeyFrames.Get(this.SubSeqIndex);
    } else {
      return undefined;
    }
  }
  IsFinish() {
    return this.SubSeqIndex === FlowSequence_1.FINISH_INDEX;
  }
  WillFinish() {
    return this.NextIndex === FlowSequence_1.FINISH_INDEX;
  }
  QueueLatentAction(i) {
    this.LatentActions.push(i);
  }
  RunLatentActions() {
    for (const i of this.LatentActions) {
      i();
    }
    this.LatentActions.length = 0;
  }
  GetLastFadeEnd() {
    return this.LastIndex >= 0 && this.IsFadeEnd.length > this.LastIndex && this.IsFadeEnd[this.LastIndex];
  }
  GetLastTransform() {
    if (this.LastIndex >= 0 && this.CurFinalPos.length > this.LastIndex) {
      return this.CurFinalPos[this.LastIndex];
    } else {
      return undefined;
    }
  }
  GetFrameEvents(i) {
    return this.FrameEvents.get(i);
  }
  GetType() {
    if (!this.Type && !this.UseRuntimeData) {
      this.Type = this.SequenceData.类型;
    }
    return this.Type;
  }
  HasSubtitle() {
    return this.CurSubtitleStartFrames.length !== 0 && this.CurSubtitleEndFrames.length !== 0;
  }
  get IsEnding() {
    return this.State === 5;
  }
  get IsPlaying() {
    return this.State !== 0;
  }
  AddFinalPos(i) {
    var t;
    if (!i) {
      this.CurFinalPos.push(i);
    }
    if (this.RelativeTransform) {
      t = Transform_1.Transform.Create();
      i.ComposeTransforms(this.RelativeTransform, t);
      this.CurFinalPos.push(t);
    } else {
      this.CurFinalPos.push(i);
    }
  }
}
exports.SequenceModel = SequenceModel;
//# sourceMappingURL=SequenceModel.js.map