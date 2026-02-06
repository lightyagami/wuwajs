"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerDialogLogic = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const PlotAudioById_1 = require("../../../../../Core/Define/ConfigQuery/PlotAudioById");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PlotAudioModel_1 = require("../../../Plot/PlotAudioModel");
const PlotDefine_1 = require("../../../Plot/PlotDefine");
const SequenceDefine_1 = require("../../../Plot/Sequence/SequenceDefine");
class GuessJokerDialogLogic {
  constructor() {
    this.Pe = undefined;
    this.vZ1 = undefined;
    this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    this.Tlg = ResourceSystem_1.ResourceSystem.InvalidId;
    this.HDe = undefined;
    this._7g = 0;
  }
  InitData(e) {
    this.Pe = e;
  }
  PlayDialog(e, i) {
    if (this.Pe) {
      const u = ++this._7g;
      this.vZ1 = e;
      this.HDe = i;
      var s = this.mOg();
      var o = e.TidTalk;
      if (this.Pe.GetDialogText && (r = this.Pe.GetDialogText(s))) {
        r.ShowTextNew(o);
      }
      let t = false;
      if (this.Pe.OnDialogStart) {
        this.Pe.OnDialogStart(s, o, () => {
          if (u === this._7g) {
            if (t) {
              this.gOg();
            } else {
              t = true;
            }
          }
        });
      } else if (this.Pe.GetDialogItem && (r = this.Pe.GetDialogItem(s))) {
        r.SetUIActive(true);
        t = true;
      }
      var o = e.WhoId === PlotDefine_1.PLOT_SELF_SPEAKER_ID || e.WhoId === PlotDefine_1.PLOT_MESSAGE_SELF_SPEAKER_ID;
      if (!o) {
        this.fOg(e);
      }
      var s = e.TidTalk;
      var r = PlotAudioById_1.configPlotAudioById.GetConfig(s);
      if (r) {
        o = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(r);
        this.lZi = AudioSystem_1.AudioSystem.PostEvent(PlotDefine_1.PLOT_REVIEW_LOG_AUDIO_EVENT, undefined, {
          ExternalSourceName: PlotDefine_1.PLOT_REVIEW_LOG_EXTERNAL_SOURCE_NAME,
          ExternalSourceMediaName: o,
          CallbackMask: 1,
          CallbackHandler: (e, i) => {
            if (u === this._7g && e === 0) {
              if (t) {
                this.gOg();
              } else {
                t = true;
              }
            }
          }
        });
      } else {
        this.gOg();
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GuessJokerCard", 78, "GuessJokerDialogLogic未初始化");
      }
      i?.();
    }
  }
  gOg() {
    var e;
    var i;
    if (this.Pe && this.vZ1) {
      i = this.mOg();
      e = () => {
        this.HDe?.();
        this.HDe = undefined;
      };
      if (this.Pe.OnDialogEnd) {
        this.Pe.OnDialogEnd(i, e);
      } else {
        if (this.Pe.GetDialogItem && (i = this.Pe.GetDialogItem(i))) {
          i.SetUIActive(false);
        }
        e();
      }
    } else {
      this.HDe?.();
      this.HDe = undefined;
    }
  }
  mOg() {
    if (this.vZ1 && (this.vZ1.WhoId === PlotDefine_1.PLOT_SELF_SPEAKER_ID || this.vZ1.WhoId === PlotDefine_1.PLOT_MESSAGE_SELF_SPEAKER_ID)) {
      return 0;
    } else {
      return 1;
    }
  }
  fOg(t) {
    if (t.PlayVoice && t.TidTalk && !StringUtils_1.StringUtils.IsEmpty(t.TidTalk) && !t.NoMouthAnim && t.Type === "Talk" && t.Style?.Type !== "InnerVoice") {
      const s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.EntityId;
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
      if (e && e.Entity) {
        const o = e.Entity.GetComponent(188)?.MainAnimInstance;
        if (o) {
          e = PlotAudioById_1.configPlotAudioById.GetConfig(t.TidTalk);
          if (e && e.GenLipSync) {
            if (this.Tlg !== ResourceSystem_1.ResourceSystem.InvalidId) {
              ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Tlg);
              this.Tlg = ResourceSystem_1.ResourceSystem.InvalidId;
            }
            const r = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName(e);
            this.Tlg = ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.AnimSequence, e => {
              var i;
              this.Tlg = ResourceSystem_1.ResourceSystem.InvalidId;
              if (e?.IsValid() && (o.StopSlotAnimation(0, SequenceDefine_1.ABP_Mouth_Slot_Name), e = o.PlaySlotAnimationAsDynamicMontage(e, SequenceDefine_1.ABP_Mouth_Slot_Name, 0, 0, 1, 1, -1, 0, false), (i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s))?.Entity && i.Entity.GetComponent(199)?.ExpressionController?.ChangeFaceForMouthMontage(e), Log_1.Log.CheckDebug())) {
                Log_1.Log.Debug("GuessJokerCard", 78, "GuessJoker播放嘴型动画", ["TidTalk", t.TidTalk], ["entityId", s], ["assetPath", r]);
              }
            });
          }
        }
      }
    }
  }
  Clear() {
    this._7g++;
    AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 0, {
      TransitionDuration: 0
    });
    if (this.Tlg !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Tlg);
    }
    var e = this.mOg();
    this.Pe?.OnCancelDialogStartAnim?.(e);
    this.Tlg = ResourceSystem_1.ResourceSystem.InvalidId;
    this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    this.vZ1 = undefined;
    this.HDe?.();
    this.HDe = undefined;
  }
}
exports.GuessJokerDialogLogic = GuessJokerDialogLogic;
//# sourceMappingURL=GuessJokerDialogLogic.js.map