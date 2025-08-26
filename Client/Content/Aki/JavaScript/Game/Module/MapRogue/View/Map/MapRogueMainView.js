"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueMainView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const StateRef_1 = require("../../../../../Core/Utils/Audio/StateRef");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MapRogueDefine_1 = require("../../MapRogueDefine");
const MapRogueFloatTipsItem_1 = require("../Components/MapRogueFloatTipsItem");
const MapRoguePanelFetter_1 = require("../Components/MapRoguePanelFetter");
const MapRoguePanelLv_1 = require("../Components/MapRoguePanelLv");
const MapRogueMoodBar_1 = require("../MapRogueMoodBar");
const MapRogueMapModule_1 = require("./MapRogueMapModule");
const STATE_NONE = "none";
class MapRogueMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.MapModule = undefined;
    this.MoodBar = undefined;
    this.CaptionItem = undefined;
    this.PanelLv = undefined;
    this.PanelFetter = undefined;
    this.TipsItem = undefined;
    this.GameInfo = undefined;
    this.L91 = undefined;
    this.TQ1 = () => this.GameInfo.CanInteract;
    this.B6e = () => {
      ControllerHolder_1.ControllerHolder.MapRogueController.OpenExploreEnd();
    };
    this.dpt = () => {
      ControllerHolder_1.ControllerHolder.MapRogueController.OpenMapHelpView();
    };
    this.uT1 = () => {
      ControllerHolder_1.ControllerHolder.MapRogueController.OpenExplore();
    };
    this.hv1 = new StateRef_1.StateRef("game_maprogue_map_type", STATE_NONE);
    this.lv1 = new StateRef_1.StateRef("game_maprogue_map_vibe", STATE_NONE);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UISprite], [6, UE.UIItem], [8, UE.UIItem], [7, UE.UIItem], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.uT1]];
  }
  async OnBeforeStartAsync() {
    if (ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().OpenMapViewBlackScreen && !ModelManager_1.ModelManager.LoadingModel.IsLoading) {
      await ControllerHolder_1.ControllerHolder.BlackScreenController.AddBlackScreenAsync("Start", "MapRogueMainView.Create");
    }
    this.GameInfo = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    this.GameInfo.ActorPool?.Init();
    var e = [];
    await this.rU1();
    e.push(this.lFc());
    e.push(this.zDn());
    e.push(this._Fc());
    e.push(this.Rp1());
    e.push(this.Lp1());
    await Promise.all(e);
  }
  OnStart() {
    var e;
    var i = ConfigManager_1.ConfigManager.MapRogueConfig?.GetInsGridConfigByInstId(this.GameInfo.InstanceId);
    if (i) {
      e = this.GetText(3);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.Title);
      this.MoodBar.SetLimit(this.GameInfo.MoodMin, this.GameInfo.MoodMax);
      this.MoodBar.SetCurrentValue(this.GameInfo.Mood);
      this.MapModule.SetRolePos(this.GameInfo.PlayerGridIndex);
      this.MapModule.SetInteractState(false, false);
      this.RefreshProgress();
      this.hv1.State = i.MapMusicState;
      this.RefreshTeamLv();
      this.RefreshMoodMusicState();
      this.GameInfo.BindView(this);
      this.GameInfo.SetInteractAvailable(0, false);
      if (ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().OpenMapViewBlackScreen && !ModelManager_1.ModelManager.LoadingModel.IsLoading) {
        ControllerHolder_1.ControllerHolder.BlackScreenController.RemoveBlackScreen("Close", "MapRogueMainView.Create");
      }
      this.GameInfo.ViewOpenPromise?.SetResult();
    }
  }
  OnAfterShow() {
    this.MapModule.MapShow();
    this.GameInfo.ViewShowPromise?.SetResult();
    this.GameInfo.SetInteractAvailable(0, true);
  }
  async OnBeforeHideAsync() {
    if (this.GameInfo?.EnterBattleFlag) {
      await ControllerHolder_1.ControllerHolder.BlackScreenController.AddBlackScreenAsync("None", "MapRogueMainView.BattleClose");
    }
  }
  OnBeforeHide() {
    this.GameInfo.ViewShowPromise = new CustomPromise_1.CustomPromise();
    this.MapModule.MapHide();
  }
  OnBeforeDestroy() {
    this.GameInfo.ActorPool?.CancelLoad();
    this.GameInfo?.BindView(undefined);
    this.hv1.State = STATE_NONE;
    this.lv1.State = STATE_NONE;
    this.L91 = undefined;
  }
  OnAfterDestroy() {
    if (this.GameInfo?.EnterBattleFlag) {
      this.GameInfo.EnterBattleFlag = false;
      ControllerHolder_1.ControllerHolder.BlackScreenController.RemoveBlackScreen("Close", "MapRogueMainView.BattleClose");
    }
  }
  OnTick(e) {
    this.GameInfo.OnTick(e);
    this.MapModule?.OnTick(e);
  }
  ChangeGameStagePerformance(e, i) {}
  async lFc() {
    this.MapModule = new MapRogueMapModule_1.MapRogueMapModule(this.GameInfo);
    await this.MapModule.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  async zDn() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem();
    await this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.CaptionItem.SetCloseCallBack(this.B6e);
    this.CaptionItem.SetHelpCallBack(this.dpt);
    this.CaptionItem.SetCurrencyItemList([ModelManager_1.ModelManager.MapRogueModel.GetRogueCurrencyItemId()]);
  }
  async Rp1() {
    this.PanelLv = new MapRoguePanelLv_1.MapRoguePanelLv();
    await this.PanelLv.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
    this.PanelLv.CheckCanOpenMenu = this.TQ1;
  }
  async Lp1() {
    this.PanelFetter = new MapRoguePanelFetter_1.MapRoguePanelFetter();
    await this.PanelFetter.CreateByActorAsync(this.GetItem(7).GetOwner());
    this.AddChild(this.PanelFetter);
    this.PanelFetter.CheckCanOpenMenu = this.TQ1;
  }
  async _Fc() {
    this.MoodBar = new MapRogueMoodBar_1.MapRogueMoodBar();
    await this.MoodBar.CreateThenShowByResourceIdAsync("UiItem_MoodBar", this.GetItem(6));
  }
  async rU1() {
    this.TipsItem = new MapRogueFloatTipsItem_1.MapRogueFloatTipsItem();
    await this.TipsItem.CreateByResourceIdAsync("UiView_RogueFloatA", this.GetRootItem());
  }
  RefreshProgress() {
    var e = this.GameInfo.ExplorationCurrentProgress();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "RogueResExplore_3", e);
  }
  SetInteractAvailable(e) {
    this.MapModule?.SetInteractAvailable(e);
    this.MapModule?.SetInteractState(false, false);
  }
  RefreshTeamLv() {
    this.PanelLv?.SetLv(this.GameInfo.TeamLv);
  }
  SetTipsItem(e, i) {
    if (i) {
      this.TipsItem?.SetText(i);
    }
    this.TipsItem?.SetActive(e);
  }
  async OpenPopupView(e) {
    e = (0, MapRogueDefine_1.popupModelBaseGenerator)(e, this.GameInfo);
    await e.CreateThenShowByResourceIdAsync("UiItem_MapRoguePopup", this.GetItem(2));
    this.L91 = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishGuideStepByEvent, "MapRougePopViewOpen");
  }
  RefreshMoodMusicState() {
    var e = ConfigManager_1.ConfigManager.MapRogueConfig.GetMoodRuleById(this.GameInfo.MoodRuleId);
    if (e && !StringUtils_1.StringUtils.IsEmpty(e.MapMusicStateSwitch)) {
      this.lv1.State = e.MapMusicStateSwitch;
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i;
    if (e.length !== 0) {
      return ((i = e[0]) === "Mood" ? this.MoodBar : i === "MapRougeGrid" ? this.MapModule : this.L91)?.GetGuideUiItemAndUiItemForShowEx(e);
    }
  }
}
exports.MapRogueMainView = MapRogueMainView;
//# sourceMappingURL=MapRogueMainView.js.map