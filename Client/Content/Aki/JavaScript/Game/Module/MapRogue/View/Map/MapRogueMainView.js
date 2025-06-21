"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapRogueMainView = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  StateRef_1 = require("../../../../../Core/Utils/Audio/StateRef"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  MapRogueDefine_1 = require("../../MapRogueDefine"),
  MapRogueFloatTipsItem_1 = require("../Components/MapRogueFloatTipsItem"),
  MapRoguePanelFetter_1 = require("../Components/MapRoguePanelFetter"),
  MapRoguePanelLv_1 = require("../Components/MapRoguePanelLv"),
  MapRogueMoodBar_1 = require("../MapRogueMoodBar"),
  MapRogueMapModule_1 = require("./MapRogueMapModule"),
  STATE_NONE = "none";
class MapRogueMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.MapModule = void 0, this.MoodBar = void 0, this.CaptionItem = void 0, this.PanelLv = void 0, this.PanelFetter = void 0, this.TipsItem = void 0, this.GameInfo = void 0, this.$71 = void 0, this.VW1 = () => this.GameInfo.CanInteract, this.B6e = () => {
      ControllerHolder_1.ControllerHolder.MapRogueController.OpenExploreEnd()
    }, this.dpt = () => {
      ControllerHolder_1.ControllerHolder.MapRogueController.OpenMapHelpView()
    }, this.GI1 = () => {
      ControllerHolder_1.ControllerHolder.MapRogueController.OpenExplore()
    }, this.Gp1 = new StateRef_1.StateRef("game_maprogue_map_type", STATE_NONE), this.Fp1 = new StateRef_1.StateRef("game_maprogue_map_vibe", STATE_NONE)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [8, UE.UIItem],
      [7, UE.UIItem],
      [9, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [9, this.GI1]
    ]
  }
  async OnBeforeStartAsync() {
    ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().OpenMapViewBlackScreen && !ModelManager_1.ModelManager.LoadingModel.IsLoading && await ControllerHolder_1.ControllerHolder.BlackScreenController.AddBlackScreenAsync("Start", "MapRogueMainView.Create"), this.GameInfo = ModelManager_1.ModelManager.MapRogueModel.GameInfo, this.GameInfo.ActorPool?.Init();
    var e = [];
    e.push(this.LD1()), e.push(this.lFc()), e.push(this.zDn()), e.push(this._Fc()), e.push(this.op1()), e.push(this.np1()), await Promise.all(e)
  }
  OnStart() {
    var e, i = ConfigManager_1.ConfigManager.MapRogueConfig?.GetInsGridConfigByInstId(this.GameInfo.InstanceId);
    i && (e = this.GetText(3), LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.Title), this.MoodBar.SetLimit(this.GameInfo.MoodMin, this.GameInfo.MoodMax), this.MoodBar.SetCurrentValue(this.GameInfo.Mood), this.MapModule.SetRolePos(this.GameInfo.PlayerGridIndex), this.MapModule.SetInteractState(!1, !1), this.RefreshProgress(), this.Gp1.State = i.MapMusicState, this.RefreshTeamLv(), this.RefreshMoodMusicState(), this.GameInfo.BindView(this), this.GameInfo.SetInteractAvailable(0, !1), ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().OpenMapViewBlackScreen && !ModelManager_1.ModelManager.LoadingModel.IsLoading && ControllerHolder_1.ControllerHolder.BlackScreenController.RemoveBlackScreen("Close", "MapRogueMainView.Create"), this.GameInfo.ViewOpenPromise?.SetResult())
  }
  OnAfterShow() {
    this.MapModule.MapShow(), this.GameInfo.ViewShowPromise?.SetResult(), this.GameInfo.SetInteractAvailable(0, !0)
  }
  async OnBeforeHideAsync() {
    this.GameInfo?.EnterBattleFlag && await ControllerHolder_1.ControllerHolder.BlackScreenController.AddBlackScreenAsync("None", "MapRogueMainView.BattleClose")
  }
  OnBeforeHide() {
    this.GameInfo.ViewShowPromise = new CustomPromise_1.CustomPromise, this.MapModule.MapHide()
  }
  OnBeforeDestroy() {
    this.GameInfo.ActorPool?.CancelLoad(), this.GameInfo?.BindView(void 0), this.Gp1.State = STATE_NONE, this.Fp1.State = STATE_NONE, this.$71 = void 0
  }
  OnAfterDestroy() {
    this.GameInfo?.EnterBattleFlag && (this.GameInfo.EnterBattleFlag = !1, ControllerHolder_1.ControllerHolder.BlackScreenController.RemoveBlackScreen("Close", "MapRogueMainView.BattleClose"))
  }
  OnTick(e) {
    this.GameInfo.OnTick(e), this.MapModule?.OnTick(e)
  }
  ChangeGameStagePerformance(e, i) {}
  async lFc() {
    this.MapModule = new MapRogueMapModule_1.MapRogueMapModule(this.GameInfo), await this.MapModule.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())
  }
  async zDn() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem, await this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.CaptionItem.SetCloseCallBack(this.B6e), this.CaptionItem.SetHelpCallBack(this.dpt), this.CaptionItem.SetCurrencyItemList([ModelManager_1.ModelManager.MapRogueModel.GetRogueCurrencyItemId()])
  }
  async op1() {
    this.PanelLv = new MapRoguePanelLv_1.MapRoguePanelLv, await this.PanelLv.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()), this.PanelLv.CheckCanOpenMenu = this.VW1
  }
  async np1() {
    this.PanelFetter = new MapRoguePanelFetter_1.MapRoguePanelFetter, await this.PanelFetter.CreateByActorAsync(this.GetItem(7).GetOwner()), this.AddChild(this.PanelFetter), this.PanelFetter.CheckCanOpenMenu = this.VW1
  }
  async _Fc() {
    this.MoodBar = new MapRogueMoodBar_1.MapRogueMoodBar, await this.MoodBar.CreateThenShowByResourceIdAsync("UiItem_MoodBar", this.GetItem(6))
  }
  async LD1() {
    this.TipsItem = new MapRogueFloatTipsItem_1.MapRogueFloatTipsItem, await this.TipsItem.CreateByResourceIdAsync("UiView_RogueFloatA", this.GetRootItem()), this.SetTipsItem(!0, "RogueRes_Map_Loading")
  }
  RefreshProgress() {
    var e = this.GameInfo.ExplorationCurrentProgress();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "RogueResExplore_3", e)
  }
  SetInteractAvailable(e) {
    this.MapModule?.SetInteractAvailable(e), this.MapModule?.SetInteractState(!1, !1)
  }
  RefreshTeamLv() {
    this.PanelLv?.SetLv(this.GameInfo.TeamLv)
  }
  SetTipsItem(e, i) {
    i && this.TipsItem?.SetText(i), this.TipsItem?.SetActive(e)
  }
  async OpenPopupView(e) {
    e = (0, MapRogueDefine_1.popupModelBaseGenerator)(e, this.GameInfo);
    await e.CreateThenShowByResourceIdAsync("UiItem_MapRoguePopup", this.GetItem(2)), this.$71 = e, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishGuideStepByEvent, "MapRougePopViewOpen")
  }
  RefreshMoodMusicState() {
    var e = ConfigManager_1.ConfigManager.MapRogueConfig.GetMoodRuleById(this.GameInfo.MoodRuleId);
    e && !StringUtils_1.StringUtils.IsEmpty(e.MapMusicStateSwitch) && (this.Fp1.State = e.MapMusicStateSwitch)
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i;
    if (0 !== e.length) return ("Mood" === (i = e[0]) ? this.MoodBar : "MapRougeGrid" === i ? this.MapModule : this.$71)?.GetGuideUiItemAndUiItemForShowEx(e)
  }
}
exports.MapRogueMainView = MapRogueMainView;
//# sourceMappingURL=MapRogueMainView.js.map