"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const CiacconaGalDefine_1 = require("../../CiacconaGalDefine");
const CiacconaGalTextConfig_1 = require("../../CiacconaGalTextConfig");
const CiacconaGalTitleItem_1 = require("../CiacconaGalTitleItem");
const CiacconaGalStepPlayerNormalPanel_1 = require("./CiacconaGalStepPlayerNormalPanel");
const CiacconaGalStepPlayerRechoosePanel_1 = require("./CiacconaGalStepPlayerRechoosePanel");
class CiacconaGalView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yLc = undefined;
    this.JUc = undefined;
    this.lqe = undefined;
    this.sVc = undefined;
    this.Hea = undefined;
    this.MFc = 0;
    this.EFc = 0;
    this.oM1 = "";
    this.FR1 = 0;
    this.k51 = "";
    this.O51 = false;
    this.nH1 = false;
    this._ii = 0;
    this.AOe = e => {
      this.yLc.Refresh();
      if (this.MFc !== e) {
        this.MFc = e;
        var i;
        var e = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e);
        AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_com_click_small");
        if (e.ImagePath) {
          this.q51(e.ImagePath);
        }
        if (!this.oM1) {
          var t = ModelManager_1.ModelManager.CiacconaGalModel.GetCurStepDataList();
          for (let e = t.length - 1; e >= 0; e--) {
            var s = t[e];
            if (s.ImagePath) {
              this.nM1(s.ImagePath);
              break;
            }
          }
        }
        if (e.AudioEvent) {
          if (this.EFc) {
            AudioSystem_1.AudioSystem.ExecuteAction(this.EFc, 0, {
              TransitionDuration: CiacconaGalDefine_1.CIACCONA_VO_CROSSFADE_DURATION
            });
          }
          this.EFc = AudioSystem_1.AudioSystem.PostEvent(e.AudioEvent);
        }
        if (e.MusicState) {
          i = e.MusicState;
          AudioSystem_1.AudioSystem.SetState(CiacconaGalDefine_1.CIACCONA_MUSIC_STATE_NAME, i);
        }
        if (!!e.SubEndingId && (!(i = ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(e.SubEndingId)).IsFinished || !!i.IsFaked) && !!i.ShouldExitOnFirstFinish) {
          this.UiViewSequence.HideSequenceName = "Close02";
          this.UiViewSequence.CloseSequenceName = "Close02";
        }
      }
    };
    this.K2c = e => {
      this._ii = e;
      this.GetItem(4).SetUIActive((e === 2 || e === 3) && !this.O51);
      this.GetItem(5).SetUIActive(e === 1 && !this.O51);
    };
    this.D1c = () => {
      if (this.O51) {
        this.G51();
      } else {
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.OnClick();
      }
    };
    this.ZUc = (e, i) => {
      if (!this.O51) {
        this.yLc.PlayCloseAsync();
        this.JUc.SetActive(true);
        this.JUc.PlayStart();
        this.JUc.Refresh(e, i);
        this.nH1 = true;
      }
    };
    this.eBc = (e, i) => {
      if (!this.O51) {
        this.yLc.SetActive(true);
        this.yLc.PlayStart();
        this.JUc.PlayCloseAsync();
        e.ChosenId = i.Id;
        e = i.ToStepId === 0 ? e.NextStepId : i.ToStepId;
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.TryContinue(e);
        this.nH1 = false;
      }
    };
    this.tBc = () => {
      if (!this.O51) {
        this.yLc.SetActive(true);
        this.yLc.PlayStart();
        this.JUc.PlayCloseAsync();
        this.nH1 = false;
      }
    };
    this.aVc = () => {
      this.O51 = true;
      this.Hea?.PlayLevelSequenceByName("Hide");
      this.lqe?.SetUiActive(false);
      this.GetButton(6).RootUIComp.SetUIActive(false);
      this.GetItem(4).SetUIActive(false);
      this.GetItem(5).SetUIActive(false);
      (this.nH1 ? this.JUc : this.yLc)?.PlayCloseAsync();
    };
    this.B_e = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(295);
      e.FunctionMap.set(2, () => {
        if (ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.GetCurState() === 5) {
          ControllerHolder_1.ControllerHolder.CiacconaGalController.ExitAvg();
        } else {
          this.CloseMe();
        }
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.$An = e => {
      if (e === "Change") {
        this.nM1(this.k51);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.D1c], [6, this.aVc]];
  }
  OnBeforeShow() {
    this.sM1();
    this.GetTexture(3).SetUIActive(false);
  }
  async OnBeforeStartAsync() {
    this.yLc = new CiacconaGalStepPlayerNormalPanel_1.CiacconaGalStepPlayerNormalPanel();
    this.JUc = new CiacconaGalStepPlayerRechoosePanel_1.CiacconaGalStepPlayerReChoosePanel();
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.sVc = new CiacconaGalTitleItem_1.CiacconaTitleInspirationItem(ModelManager_1.ModelManager.CiacconaGalModel.ActivityData);
    var e = this.GetItem(1);
    await Promise.all([this.yLc.CreateThenShowByResourceIdAsync("UiItem_PlotReasoningInfoA", e), this.JUc.CreateByResourceIdAsync("UiItem_PlotReasoningInfoB", e), this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())]);
    await this.sVc.CreateThenShowByResourceIdAsync("PnlTimeInfo", this.lqe.GetToggleRootItem());
    this.lqe.SetCloseCallBack(this.B_e);
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetTitleByTextIdAndArgNew(CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_AVG_TITLE));
  }
  OnStart() {
    ControllerHolder_1.ControllerHolder.CiacconaGalController.AddOnStepDataUpdate(this.AOe);
    ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.AddOnStateChange(this.K2c);
    ControllerHolder_1.ControllerHolder.CiacconaGalController.SetGalViewReady(true);
    var e = ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.CurHandlingChapterId;
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(e);
    if (e.MusicEvent) {
      this.FR1 = AudioSystem_1.AudioSystem.PostEvent(e.MusicEvent);
    }
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.CiacconaGalController.SetGalViewReady(false);
    ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.RemoveOnStateChange(this.K2c);
    ControllerHolder_1.ControllerHolder.CiacconaGalController.RemoveOnStepDataUpdate(this.AOe);
    if (this.EFc) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.EFc, 0, {
        TransitionDuration: CiacconaGalDefine_1.CIACCONA_VO_CROSSFADE_DURATION
      });
    }
    if (this.FR1) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.FR1, 0, {
        TransitionDuration: CiacconaGalDefine_1.CIACCONA_VO_CROSSFADE_DURATION
      });
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaAvgInspirationChoiceShow, false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaAvgReChoose, this.ZUc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaReChooseConfirm, this.eBc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaReChooseCancel, this.tBc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaAvgReChoose, this.ZUc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaReChooseConfirm, this.eBc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaReChooseCancel, this.tBc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  q51(e) {
    this.k51 = e;
    this.Hea?.PlayLevelSequenceByName("Next");
  }
  async nM1(e) {
    this.oM1 = e;
    await this.SetTextureAsync(e, this.GetTexture(3));
    this.GetTexture(3).SetUIActive(true);
  }
  sM1() {
    ResourceSystem_1.ResourceSystem.Load(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon01"), UE.Texture, this.MemoryTag);
    ResourceSystem_1.ResourceSystem.Load(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon02"), UE.Texture, this.MemoryTag);
    ResourceSystem_1.ResourceSystem.Load(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon03"), UE.Texture, this.MemoryTag);
    ResourceSystem_1.ResourceSystem.Load(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon04"), UE.Texture, this.MemoryTag);
    ResourceSystem_1.ResourceSystem.Load(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon05"), UE.Texture, this.MemoryTag);
  }
  G51() {
    this.O51 = false;
    this.Hea?.PlayLevelSequenceByName("Show");
    this.lqe?.SetUiActive(true);
    this.yLc?.SetActive(!this.nH1);
    if (!this.nH1) {
      this.yLc?.PlayStart();
    }
    this.JUc?.SetActive(this.nH1);
    if (this.nH1) {
      this.JUc?.PlayStart();
    }
    this.GetButton(6).RootUIComp.SetUIActive(true);
    this.K2c(this._ii);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0) {
      var i = e[0];
      if (i === "ChoicesSelect" || i === "FirstChoice") {
        return this.yLc.GetGuideUiItemAndUiItemForShowEx(e);
      }
      if (i === "Inspiration") {
        e = this.sVc?.GetRootItem();
        if (e) {
          return [e, e];
        }
      }
    }
  }
}
exports.CiacconaGalView = CiacconaGalView;
//# sourceMappingURL=CiacconaGalView.js.map