"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotReviewView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const PlotAudioModel_1 = require("../PlotAudioModel");
const PlotDefine_1 = require("../PlotDefine");
const PlotReviewDynamicScrollBaseItem_1 = require("./PlotReviewDynamicScrollBaseItem");
const PlotReviewDynamicScrollItem_1 = require("./PlotReviewDynamicScrollItem");
class PlotReviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.lqe = undefined;
    this.wZ_ = undefined;
    this.PlotReviewDynamicScrollView = undefined;
    this.RZ_ = -1;
    this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    this.zMc = false;
    this.fze = () => {
      if (!this.zMc) {
        this.zMc = true;
        this.GetUIDynScrollViewComponent(1).SetScrollProgress(1);
      }
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.AZ_ = (i, t, e) => {
      var s = new PlotReviewDynamicScrollItem_1.PlotReviewDynamicScrollItem();
      s.SetTalkItemToggleClickCallBack(this.PZ_);
      s.SetTalkItemCanToggleChangeCallBack(this.$Y1);
      return s;
    };
    this.PZ_ = i => {
      this.xZ_(i);
    };
    this.$Y1 = i => this.WY1(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIDynScrollViewComponent], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.wZ_ = new PlotReviewDynamicScrollBaseItem_1.PlotReviewDynamicScrollBaseItem();
    this.PlotReviewDynamicScrollView = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(1), this.GetItem(2), this.wZ_, this.AZ_);
    await Promise.all([this.PlotReviewDynamicScrollView.Init(), this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())]);
    this.lqe.SetCloseCallBack(this.AMo);
    this.PlotReviewDynamicScrollView.RefreshByData(this.Pe.PlotReviewItemDataList);
    await this.PlotReviewDynamicScrollView.WaitForInit();
    this.zMc = false;
    this.PlotReviewDynamicScrollView.BindLateUpdate(this.fze);
  }
  WY1(i) {
    var t;
    return !!this.Pe && !(t = this.Pe.PlotReviewItemDataList.length, i < 0) && !(t <= i) && (t = this.Pe.PlotReviewItemDataList[i]).Type !== 1 && !!(t = (i = t.Data.TalkItem).PlayVoice ? i.TidTalk : undefined) && !!PlotAudioById_1.configPlotAudioById.GetConfig(t);
  }
  xZ_(e) {
    var i;
    if (this.WY1(e)) {
      i = this.Pe.PlotReviewItemDataList[e].Data.TalkItem.TidTalk;
      i = PlotAudioById_1.configPlotAudioById.GetConfig(i);
      if (this.RZ_ === e) {
        this.ClearCurPlayAudio();
      } else {
        if (this.RZ_ >= 0) {
          this.ClearCurPlayAudio();
        }
        i = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(i);
        this.RZ_ = e;
        this.UZ_(e, true);
        this.lZi = AudioSystem_1.AudioSystem.PostEvent(PlotDefine_1.PLOT_REVIEW_LOG_AUDIO_EVENT, undefined, {
          ExternalSourceName: PlotDefine_1.PLOT_REVIEW_LOG_EXTERNAL_SOURCE_NAME,
          ExternalSourceMediaName: i,
          CallbackMask: 1,
          CallbackHandler: (i, t) => {
            if (i === 0 && e === this.RZ_) {
              this.wvo();
            }
          }
        });
      }
    }
  }
  ClearCurPlayAudio() {
    if (this.lZi !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 0, {
        TransitionDuration: 0
      });
      this.wvo();
    }
  }
  wvo() {
    if (this.RZ_ >= 0) {
      this.UZ_(this.RZ_, false);
    }
    this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    this.RZ_ = -1;
  }
  IsPlayingAudio() {
    return this.lZi !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
  }
  UZ_(i, t) {
    this.Pe.PlotReviewItemDataList[i].Data.IsPlaying = t;
    i = this.PlotReviewDynamicScrollView?.GetScrollItemFromIndex(i);
    if (i) {
      i.SetTalkItemToggleState(t ? 1 : 0);
    }
  }
  OnBeforeHide() {
    this.ClearCurPlayAudio();
  }
}
exports.PlotReviewView = PlotReviewView;
//# sourceMappingURL=PlotReviewView.js.map