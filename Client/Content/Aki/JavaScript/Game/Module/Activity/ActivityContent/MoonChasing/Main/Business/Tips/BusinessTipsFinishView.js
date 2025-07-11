"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessTipsFinishView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem");
const GlobalData_1 = require("../../../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../../Ui/Common/PopupCaptionItem");
const UiViewData_1 = require("../../../../../../../Ui/Define/UiViewData");
const LevelSequencePlayer_1 = require("../../../../../../Common/LevelSequencePlayer");
const BusinessDefine_1 = require("../BusinessDefine");
const CharacterItemWithLine_1 = require("../Common/Character/CharacterItemWithLine");
const CharacterListModule_1 = require("../Common/Character/CharacterListModule");
const MoonChasingPopularityUpData_1 = require("../Model/MoonChasingPopularityUpData");
const TWEEN_TIME = 1;
class RewardItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.ItemId = i;
    this.psa = 0;
    this.rDa = 0;
    this.qte = 0;
    this.CurrentValueDelegate = undefined;
    this.ExpTweener = undefined;
    this.$pt = undefined;
    this.Msa = i => {
      this.GetText(1)?.SetText(i.toString());
    };
    this.oDa = () => {
      this.KillExpTweener();
      AudioSystem_1.AudioSystem.PostEvent("play_ui_figure_up_2");
      this.$pt.PlaySequenceAsync("Add", new CustomPromise_1.CustomPromise()).finally(() => {
        if (!this.IsDestroyOrDestroying) {
          this.ExpTweener = UE.LTweenBPLibrary.IntTo(GlobalData_1.GlobalData.World, this.CurrentValueDelegate, this.rDa, this.qte, TWEEN_TIME);
          this.ExpTweener.OnCompleteCallBack.Bind(this.Esa);
        }
      });
    };
    this.Esa = () => {
      this.KillExpTweener();
      this.GetText(3)?.SetUIActive(true);
      this.GetText(2)?.SetUIActive(false);
      this.$pt?.PlayLevelSequenceByName("Addition02");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    await this.SetItemIconAsync(this.GetTexture(0), this.ItemId);
  }
  OnStart() {
    this.GetText(1)?.SetUIActive(true);
    this.GetText(2)?.SetUIActive(false);
    this.GetText(3)?.SetUIActive(false);
    this.Tsa(false);
    this.CurrentValueDelegate = (0, puerts_1.toManualReleaseDelegate)(this.Msa);
  }
  OnBeforeDestroy() {
    this.KillExpTweener();
    (0, puerts_1.releaseManualReleaseDelegate)(this.Msa);
    this.CurrentValueDelegate = undefined;
    this.$pt?.Clear();
  }
  KillExpTweener() {
    if (this.ExpTweener) {
      this.ExpTweener.Kill();
      this.ExpTweener = undefined;
    }
  }
  ysa() {
    this.GetText(1)?.SetText(this.psa.toString());
    this.GetText(3)?.SetText(this.qte.toString());
  }
  async ShowAddValue() {
    this.GetText(2)?.SetUIActive(true);
    this.GetText(2)?.SetText("+" + this.rDa);
    await this.kCa();
  }
  async kCa() {
    await this.$pt.PlaySequenceAsync("Addition01", new CustomPromise_1.CustomPromise());
    if (!this.IsDestroyOrDestroying) {
      if (this.qte === this.rDa) {
        this.ExpTweener = UE.LTweenBPLibrary.IntTo(GlobalData_1.GlobalData.World, this.CurrentValueDelegate, this.psa, this.qte, TWEEN_TIME);
        this.ExpTweener.OnCompleteCallBack.Bind(this.Esa);
      } else {
        this.ExpTweener = UE.LTweenBPLibrary.IntTo(GlobalData_1.GlobalData.World, this.CurrentValueDelegate, this.psa, this.rDa, TWEEN_TIME);
        this.ExpTweener.OnCompleteCallBack.Bind(this.oDa);
      }
    }
  }
  Tsa(i) {
    this.GetItem(4)?.SetUIActive(i);
    if (i) {
      i = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
      this.GetText(5)?.SetText(i.Ratio + "%");
    }
  }
  UpdateItem(i, e, t) {
    this.qte = i;
    this.rDa = e;
    this.ysa();
    this.Tsa(t);
  }
}
class BusinessTipsFinishView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CharacterListModule = undefined;
    this.FirstReward = undefined;
    this.SecondReward = undefined;
    this.CaptionItem = undefined;
    this.TDe = undefined;
    this.dke = () => new CharacterItemWithLine_1.CharacterItemWithLine();
    this.Mke = () => {
      var i = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
      var e = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
      var t = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPlayerRoleId();
      var s = i.LastPopularity < e ? "Moonfiesta_Title1" : "Moonfiesta_Title2";
      var t = new MoonChasingPopularityUpData_1.MoonChasingPopularityUpData(t, i.LastPopularity, e, i.GetRoleDialog(), s);
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenTipsPopularityUpView(t);
    };
    this.Bwa = (i, e) => {
      if (e === "New01" && ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData().IsBest) {
        AudioSystem_1.AudioSystem.PostEvent("play_ui_zhuiyuejie_positive");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [5, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[6, this.Mke]];
  }
  async U3e() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7));
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetWishItemId();
    await this.CaptionItem.SetCurrencyItemList([i, e]);
  }
  Qpa() {
    var i;
    if (ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData().EvaluationLevel < BusinessDefine_1.SPECIAL_LEVEL) {
      (i = new UiViewData_1.UiViewData()).StartSequenceName = "Start01";
      this.UiViewSequence?.SetSequenceName(i);
    }
  }
  async OnBeforeStartAsync() {
    this.RootActor?.OnSequencePlayEvent.Bind(this.Bwa);
    this.Qpa();
    this.GetButton(6)?.RootUIComp.SetUIActive(false);
    this.CharacterListModule = new CharacterListModule_1.CharacterListModule(this.dke);
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetWishItemId();
    this.FirstReward = new RewardItem(i);
    this.SecondReward = new RewardItem(e);
    await Promise.all([this.CharacterListModule.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), this.FirstReward.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.SecondReward.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.U3e()]);
    var i = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
    await this.CharacterListModule.RefreshByDataAsync(i.GetResultCharacterList());
    this.FirstReward.UpdateItem(i.Gold, i.BaseGold, i.IsTriggerEvent && i.IsInvestSuccess);
    this.SecondReward.UpdateItem(i.Wish, i.BaseWish, false);
    this.GetItem(1)?.SetUIActive(!i.IsBest);
    this.GetItem(2)?.SetUIActive(i.IsBest);
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEvaluateByLevel(i.EvaluationLevel);
    await this.SetTextureAsync(e.Icon, this.GetTexture(0));
  }
  OnAfterPlayStartSequence() {
    AudioSystem_1.AudioSystem.PostEvent("play_ui_figure_up_end");
    this.FirstReward?.ShowAddValue();
    this.SecondReward?.ShowAddValue().finally(() => {
      this.TDe = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.TDe = undefined;
        this.GetButton(6)?.RootUIComp.SetUIActive(true);
        this.UiViewSequence?.PlaySequencePurely("AtnStart");
      }, TWEEN_TIME * 1000);
    });
  }
  OnBeforeDestroy() {
    this.RootActor?.OnSequencePlayEvent.Unbind();
    this.GAn();
  }
  GAn() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.BusinessTipsFinishView = BusinessTipsFinishView;
//# sourceMappingURL=BusinessTipsFinishView.js.map