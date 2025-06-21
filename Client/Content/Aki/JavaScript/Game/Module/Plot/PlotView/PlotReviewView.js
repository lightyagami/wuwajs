"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PlotReviewView = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  DynScrollView_1 = require("../../Util/ScrollView/DynScrollView"),
  PlotAudioModel_1 = require("../PlotAudioModel"),
  PlotDefine_1 = require("../PlotDefine"),
  PlotReviewDynamicScrollBaseItem_1 = require("./PlotReviewDynamicScrollBaseItem"),
  PlotReviewDynamicScrollItem_1 = require("./PlotReviewDynamicScrollItem");
class PlotReviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Pe = void 0, this.lqe = void 0, this.wZ_ = void 0, this.PlotReviewDynamicScrollView = void 0, this.RZ_ = -1, this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE, this.zMc = !1, this.fze = () => {
      this.zMc || (this.zMc = !0, this.GetUIDynScrollViewComponent(1).SetScrollProgress(1))
    }, this.AMo = () => {
      this.CloseMe()
    }, this.AZ_ = (i, t, e) => {
      var s = new PlotReviewDynamicScrollItem_1.PlotReviewDynamicScrollItem;
      return s.SetTalkItemToggleClickCallBack(this.PZ_), s.SetTalkItemCanToggleChangeCallBack(this.TX1), s
    }, this.PZ_ = i => {
      this.xZ_(i)
    }, this.TX1 = i => this.bX1(i)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIDynScrollViewComponent],
      [2, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam, this.lqe = new PopupCaptionItem_1.PopupCaptionItem, this.wZ_ = new PlotReviewDynamicScrollBaseItem_1.PlotReviewDynamicScrollBaseItem, this.PlotReviewDynamicScrollView = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(1), this.GetItem(2), this.wZ_, this.AZ_), await Promise.all([this.PlotReviewDynamicScrollView.Init(), this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())]), this.lqe.SetCloseCallBack(this.AMo), this.PlotReviewDynamicScrollView.RefreshByData(this.Pe.PlotReviewItemDataList), await this.PlotReviewDynamicScrollView.WaitForInit(), this.zMc = !1, this.PlotReviewDynamicScrollView.BindLateUpdate(this.fze)
  }
  bX1(i) {
    var t;
    return !(!this.Pe || (t = this.Pe.PlotReviewItemDataList.length, i < 0) || t <= i || 1 === (t = this.Pe.PlotReviewItemDataList[i]).Type || !(t = (i = t.Data.TalkItem).PlayVoice ? i.TidTalk : void 0) || !PlotAudioById_1.configPlotAudioById.GetConfig(t))
  }
  xZ_(e) {
    var i;
    this.bX1(e) && (i = this.Pe.PlotReviewItemDataList[e].Data.TalkItem.TidTalk, i = PlotAudioById_1.configPlotAudioById.GetConfig(i), this.RZ_ === e ? this.ClearCurPlayAudio() : (0 <= this.RZ_ && this.ClearCurPlayAudio(), i = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(i), this.RZ_ = e, this.UZ_(e, !0), this.lZi = AudioSystem_1.AudioSystem.PostEvent(PlotDefine_1.PLOT_REVIEW_LOG_AUDIO_EVENT, void 0, {
      ExternalSourceName: PlotDefine_1.PLOT_REVIEW_LOG_EXTERNAL_SOURCE_NAME,
      ExternalSourceMediaName: i,
      CallbackMask: 1,
      CallbackHandler: (i, t) => {
        0 === i && e === this.RZ_ && this.wvo()
      }
    })))
  }
  ClearCurPlayAudio() {
    this.lZi !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE && (AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 0, {
      TransitionDuration: 0
    }), this.wvo())
  }
  wvo() {
    0 <= this.RZ_ && this.UZ_(this.RZ_, !1), this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE, this.RZ_ = -1
  }
  IsPlayingAudio() {
    return this.lZi !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE
  }
  UZ_(i, t) {
    this.Pe.PlotReviewItemDataList[i].Data.IsPlaying = t;
    i = this.PlotReviewDynamicScrollView?.GetScrollItemFromIndex(i);
    i && i.SetTalkItemToggleState(t ? 1 : 0)
  }
  OnBeforeHide() {
    this.ClearCurPlayAudio()
  }
}
exports.PlotReviewView = PlotReviewView;
//# sourceMappingURL=PlotReviewView.js.map