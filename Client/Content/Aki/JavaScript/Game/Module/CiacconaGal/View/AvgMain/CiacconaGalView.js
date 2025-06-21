"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalView = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  CiacconaGalDefine_1 = require("../../CiacconaGalDefine"),
  CiacconaGalTextConfig_1 = require("../../CiacconaGalTextConfig"),
  CiacconaGalTitleItem_1 = require("../CiacconaGalTitleItem"),
  CiacconaGalStepPlayerNormalPanel_1 = require("./CiacconaGalStepPlayerNormalPanel"),
  CiacconaGalStepPlayerRechoosePanel_1 = require("./CiacconaGalStepPlayerRechoosePanel");
class CiacconaGalView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.yLc = void 0, this.JUc = void 0, this.lqe = void 0, this.sVc = void 0, this.Hea = void 0, this.MFc = 0, this.EFc = 0, this.DS1 = "", this.fR1 = 0, this.t51 = "", this.i51 = !1, this.M91 = !1, this._ii = 0, this.AOe = e => {
      if (this.yLc.Refresh(), this.MFc !== e) {
        this.MFc = e;
        var i, e = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e);
        if (AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_com_click_small"), e.ImagePath && this.r51(e.ImagePath), !this.DS1) {
          var t = ModelManager_1.ModelManager.CiacconaGalModel.GetCurStepDataList();
          for (let e = t.length - 1; 0 <= e; e--) {
            var s = t[e];
            if (s.ImagePath) {
              this.BS1(s.ImagePath);
              break
            }
          }
        }
        e.AudioEvent && (this.EFc && AudioSystem_1.AudioSystem.ExecuteAction(this.EFc, 0, {
          TransitionDuration: CiacconaGalDefine_1.CIACCONA_VO_CROSSFADE_DURATION
        }), this.EFc = AudioSystem_1.AudioSystem.PostEvent(e.AudioEvent)), e.MusicState && (i = e.MusicState, AudioSystem_1.AudioSystem.SetState(CiacconaGalDefine_1.CIACCONA_MUSIC_STATE_NAME, i)), !e.SubEndingId || (i = ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(e.SubEndingId)).IsFinished && !i.IsFaked || !i.ShouldExitOnFirstFinish || (this.UiViewSequence.HideSequenceName = "Close02", this.UiViewSequence.CloseSequenceName = "Close02")
      }
    }, this.K2c = e => {
      this._ii = e, this.GetItem(4).SetUIActive((2 === e || 3 === e) && !this.i51), this.GetItem(5).SetUIActive(1 === e && !this.i51)
    }, this.D1c = () => {
      this.i51 ? this.o51() : ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.OnClick()
    }, this.ZUc = (e, i) => {
      this.i51 || (this.yLc.PlayCloseAsync(), this.JUc.SetActive(!0), this.JUc.PlayStart(), this.JUc.Refresh(e, i), this.M91 = !0)
    }, this.eBc = (e, i) => {
      this.i51 || (this.yLc.SetActive(!0), this.yLc.PlayStart(), this.JUc.PlayCloseAsync(), e.ChosenId = i.Id, e = 0 === i.ToStepId ? e.NextStepId : i.ToStepId, ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.TryContinue(e), this.M91 = !1)
    }, this.tBc = () => {
      this.i51 || (this.yLc.SetActive(!0), this.yLc.PlayStart(), this.JUc.PlayCloseAsync(), this.M91 = !1)
    }, this.aVc = () => {
      this.i51 = !0, this.Hea?.PlayLevelSequenceByName("Hide"), this.lqe?.SetUiActive(!1), this.GetButton(6).RootUIComp.SetUIActive(!1), this.GetItem(4).SetUIActive(!1), this.GetItem(5).SetUIActive(!1), (this.M91 ? this.JUc : this.yLc)?.PlayCloseAsync()
    }, this.B_e = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(295);
      e.FunctionMap.set(2, () => {
        5 === ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.GetCurState() ? ControllerHolder_1.ControllerHolder.CiacconaGalController.ExitAvg() : this.CloseMe()
      }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e)
    }, this.$An = e => {
      "Change" === e && this.BS1(this.t51)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [2, this.D1c],
      [6, this.aVc]
    ]
  }
  OnBeforeShow() {
    this.kS1(), this.GetTexture(3).SetUIActive(!1)
  }
  async OnBeforeStartAsync() {
    this.yLc = new CiacconaGalStepPlayerNormalPanel_1.CiacconaGalStepPlayerNormalPanel, this.JUc = new CiacconaGalStepPlayerRechoosePanel_1.CiacconaGalStepPlayerReChoosePanel, this.lqe = new PopupCaptionItem_1.PopupCaptionItem, this.sVc = new CiacconaGalTitleItem_1.CiacconaTitleInspirationItem(ModelManager_1.ModelManager.CiacconaGalModel.ActivityData);
    var e = this.GetItem(1);
    await Promise.all([this.yLc.CreateThenShowByResourceIdAsync("UiItem_PlotReasoningInfoA", e), this.JUc.CreateByResourceIdAsync("UiItem_PlotReasoningInfoB", e), this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())]), await this.sVc.CreateThenShowByResourceIdAsync("PnlTimeInfo", this.lqe.GetToggleRootItem()), this.lqe.SetCloseCallBack(this.B_e), this.lqe.SetHelpBtnActive(!1), this.lqe.SetTitleByTextIdAndArgNew(CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_AVG_TITLE))
  }
  OnStart() {
    ControllerHolder_1.ControllerHolder.CiacconaGalController.AddOnStepDataUpdate(this.AOe), ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.AddOnStateChange(this.K2c), ControllerHolder_1.ControllerHolder.CiacconaGalController.SetGalViewReady(!0);
    var e = ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.CurHandlingChapterId,
      e = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(e);
    e.MusicEvent && (this.fR1 = AudioSystem_1.AudioSystem.PostEvent(e.MusicEvent)), this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.CiacconaGalController.SetGalViewReady(!1), ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.RemoveOnStateChange(this.K2c), ControllerHolder_1.ControllerHolder.CiacconaGalController.RemoveOnStepDataUpdate(this.AOe), this.EFc && AudioSystem_1.AudioSystem.ExecuteAction(this.EFc, 0, {
      TransitionDuration: CiacconaGalDefine_1.CIACCONA_VO_CROSSFADE_DURATION
    }), this.fR1 && AudioSystem_1.AudioSystem.ExecuteAction(this.fR1, 0, {
      TransitionDuration: CiacconaGalDefine_1.CIACCONA_VO_CROSSFADE_DURATION
    }), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaAvgInspirationChoiceShow, !1)
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaAvgReChoose, this.ZUc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaReChooseConfirm, this.eBc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaReChooseCancel, this.tBc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaAvgReChoose, this.ZUc), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaReChooseConfirm, this.eBc), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaReChooseCancel, this.tBc), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An)
  }
  r51(e) {
    this.t51 = e, this.Hea?.PlayLevelSequenceByName("Next")
  }
  async BS1(e) {
    this.DS1 = e, await this.SetTextureAsync(e, this.GetTexture(3)), this.GetTexture(3).SetUIActive(!0)
  }
  kS1() {
    ResourceSystem_1.ResourceSystem.Load(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon01"), UE.Texture), ResourceSystem_1.ResourceSystem.Load(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon02"), UE.Texture), ResourceSystem_1.ResourceSystem.Load(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon03"), UE.Texture), ResourceSystem_1.ResourceSystem.Load(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon04"), UE.Texture), ResourceSystem_1.ResourceSystem.Load(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon05"), UE.Texture)
  }
  o51() {
    this.i51 = !1, this.Hea?.PlayLevelSequenceByName("Show"), this.lqe?.SetUiActive(!0), this.yLc?.SetActive(!this.M91), this.M91 || this.yLc?.PlayStart(), this.JUc?.SetActive(this.M91), this.M91 && this.JUc?.PlayStart(), this.GetButton(6).RootUIComp.SetUIActive(!0), this.K2c(this._ii)
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length) {
      var i = e[0];
      if ("ChoicesSelect" === i || "FirstChoice" === i) return this.yLc.GetGuideUiItemAndUiItemForShowEx(e);
      if ("Inspiration" === i) {
        e = this.sVc?.GetRootItem();
        if (e) return [e, e]
      }
    }
  }
}
exports.CiacconaGalView = CiacconaGalView;
//# sourceMappingURL=CiacconaGalView.js.map