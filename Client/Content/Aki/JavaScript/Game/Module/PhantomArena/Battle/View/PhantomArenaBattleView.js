"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PhantomArenaOwnArea_1 = require("../Area/PhantomArenaOwnArea"),
  OpponentArea_1 = require("../Opponent/OpponentArea"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine"),
  PhantomArenaChooseCardPanel_1 = require("./Choose/PhantomArenaChooseCardPanel"),
  PhantomArenaDiscardCardPanel_1 = require("./Discard/PhantomArenaDiscardCardPanel"),
  PhantomArenaBattleDetailsTips_1 = require("./Panel/PhantomArenaBattleDetailsTips"),
  PhantomArenaBattleSkillTips_1 = require("./Panel/PhantomArenaBattleSkillTips"),
  PhantomArenaBattleTips_1 = require("./Panel/PhantomArenaBattleTips"),
  PhantomArenaCardRecycle_1 = require("./Panel/PhantomArenaCardRecycle"),
  PhantomArenaSkillTriggerMask_1 = require("./Panel/PhantomArenaSkillTriggerMask"),
  PhantomArenaBattleProxy_1 = require("./PhantomArenaBattleProxy");
class PhantomArenaBattleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.MSr = void 0, this.FirstShowDirty = !0
  }
  OnRegisterComponent() {
    this.MSr = new PhantomArenaBattleProxy_1.PhantomArenaBattleProxy, this.MSr.RegisterView(this), this.OpenParam = this.MSr, this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UILayoutBase],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIText],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIText],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIText],
      [20, UE.UIItem],
      [21, UE.UIItem]
    ], this.BtnBindInfo = [
      [5, this.MSr.HideLayoutClick],
      [7, this.MSr.TimeEndClick]
    ]
  }
  zDn() {
    this.MSr.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(15)), this.MSr.CaptionItem.SetCloseCallBack(this.MSr.CloseClick), this.MSr.CaptionItem.SetHelpCallBack(this.MSr.HelpClick)
  }
  async Ti1() {
    this.MSr.OwnArea = new PhantomArenaOwnArea_1.PhantomArenaOwnArea, this.MSr.OwnArea.RegisterViewProxy(this.MSr), await this.MSr.OwnArea.InitArea(this.GetItem(0), this.GetItem(1), this.GetItem(10))
  }
  async bi1() {
    this.MSr.OpponentArea = new OpponentArea_1.OpponentArea, this.MSr.OpponentArea.RegisterViewProxy(this.MSr), await this.MSr.OpponentArea.InitArea(this.GetLayoutBase(2), this.GetItem(3), this.GetItem(11))
  }
  async UD1() {
    this.MSr.CardRecycle = new PhantomArenaCardRecycle_1.PhantomArenaCardRecycle, this.MSr.CardRecycle.RegisterViewProxy(this.MSr), await this.MSr.CardRecycle.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())
  }
  async LD1() {
    this.MSr.TipsItem = new PhantomArenaBattleTips_1.PhantomArenaBattleTips, await this.MSr.TipsItem.CreateByResourceIdAsync("UiItem_CardTips", this.GetItem(14))
  }
  async LZ1() {
    this.MSr.DetailsTipsItem = new PhantomArenaBattleDetailsTips_1.PhantomArenaBattleDetailsTips, this.MSr.DetailsTipsItem.SetMaskAttach(this.GetItem(21)), await this.MSr.DetailsTipsItem.CreateByResourceIdAsync("PnlCardTips", this.GetItem(14))
  }
  async heu() {
    this.MSr.SkillTipsItem = new PhantomArenaBattleSkillTips_1.PhantomArenaBattleSkillTips, await this.MSr.SkillTipsItem.CreateByResourceIdAsync("PnlSkillTips", this.GetItem(14))
  }
  async j21() {
    this.MSr.DiscardPanel = new PhantomArenaDiscardCardPanel_1.PhantomArenaDiscardCardPanel, this.MSr.DiscardPanel.RegisterViewProxy(this.MSr), await this.MSr.DiscardPanel.CreateByResourceIdAsync("UiView_CardBusted", this.GetItem(9))
  }
  async S31() {
    this.MSr.ChooseCardPanel = new PhantomArenaChooseCardPanel_1.PhantomArenaChooseCardPanel, this.MSr.ChooseCardPanel.RegisterViewProxy(this.MSr), await this.MSr.ChooseCardPanel.CreateByResourceIdAsync("UiView_CardChoose", this.GetItem(9))
  }
  async d81() {
    this.MSr.SkillTriggerMask = new PhantomArenaSkillTriggerMask_1.PhantomArenaSkillTriggerMask, this.MSr.SkillTriggerMask.RegisterViewProxy(this.MSr), await this.MSr.SkillTriggerMask.CreateByResourceIdAsync("UiItem_SkillRelease", this.GetItem(6))
  }
  async OnBeforeStartAsync() {
    this.zDn(), await Promise.all([this.Ti1(), this.bi1(), this.UD1(), this.LD1(), this.LZ1(), this.heu(), this.j21(), this.S31(), this.d81()]), this.MSr.ProcessManager.InitStateMap()
  }
  OnStart() {
    this.MSr.BanButtonClickModule.RegisterButton(this.GetButton(7)), this.MSr.BanButtonClickModule.RegisterButton(this.MSr.CaptionItem.GetCloseBtn()), this.MSr.BanButtonClickModule.RegisterButton(this.MSr.CaptionItem.GetHelpBtn())
  }
  OnBeforeShow() {
    this.FirstShowDirty ? this.FirstShowDirty = !1 : this.MSr.Show()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OwnBattleStatusChange, this.MSr.OnOwnBattleStatusChange), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpponentBattleStatusChange, this.MSr.OnOpponentBattleStatusChange), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OwnCardLibraryChange, this.MSr.OnOwnCardLibraryChange), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpponentHandCardChange, this.MSr.OnOpponentHandCardChange), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpponentCardLibraryChange, this.MSr.OnOpponentCardLibraryChange), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OwnHandCardAdd, this.MSr.OnOwnHandCardAdd), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomArenaTriggerSkillEffect, this.MSr.OnTriggerSkillEffect), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NotifyCardTaskData, this.MSr.OnNotifyCardTaskData), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OwnHandCardRemove, this.MSr.OnOwnHandCardRemove), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomArenaCardAttrRefresh, this.MSr.OnCardAttrRefresh), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomArenaCardFactorsRefresh, this.MSr.OnCardFactorsRefresh), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NotifyBattleCardChange, this.MSr.OnNotifyBattleCardChange), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OwnBattleAttrChange, this.MSr.OnOwnBattleAttrChange), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpponentBattleAttrChange, this.MSr.OnOpponentBattleAttrChange), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshRound, this.MSr.OnRefreshRound), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshBattleCardNum, this.MSr.OnRefreshBattleCardNum), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.MSr.OnInputControllerMainTypeChange), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshHandCardState, this.MSr.OnRefreshHandCardState)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OwnBattleStatusChange, this.MSr.OnOwnBattleStatusChange), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpponentBattleStatusChange, this.MSr.OnOpponentBattleStatusChange), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OwnCardLibraryChange, this.MSr.OnOwnCardLibraryChange), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpponentHandCardChange, this.MSr.OnOpponentHandCardChange), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpponentCardLibraryChange, this.MSr.OnOpponentCardLibraryChange), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OwnHandCardAdd, this.MSr.OnOwnHandCardAdd), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomArenaTriggerSkillEffect, this.MSr.OnTriggerSkillEffect), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NotifyCardTaskData, this.MSr.OnNotifyCardTaskData), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OwnHandCardRemove, this.MSr.OnOwnHandCardRemove), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomArenaCardAttrRefresh, this.MSr.OnCardAttrRefresh), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomArenaCardFactorsRefresh, this.MSr.OnCardFactorsRefresh), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NotifyBattleCardChange, this.MSr.OnNotifyBattleCardChange), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OwnBattleAttrChange, this.MSr.OnOwnBattleAttrChange), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpponentBattleAttrChange, this.MSr.OnOpponentBattleAttrChange), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshRound, this.MSr.OnRefreshRound), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshBattleCardNum, this.MSr.OnRefreshBattleCardNum), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.MSr.OnInputControllerMainTypeChange), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshHandCardState, this.MSr.OnRefreshHandCardState)
  }
  OnBeforeDestroy() {
    this.MSr.Destroy()
  }
  GetDragRootItem() {
    return this.GetItem(4)
  }
  GetOwnCardLibraryItem() {
    return this.GetItem(17)
  }
  GetOpponentCardLibraryItem() {
    return this.GetItem(18)
  }
  SetCaptionItemActive(e) {
    this.GetItem(15).SetUIActive(e)
  }
  SetRoundEffectActive(e) {
    this.GetItem(20).SetUIActive(e)
  }
  RefreshOwnCardLibraryNum() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.CardLibraryNum;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "PhantomBattle_1022", e)
  }
  RefreshOpponentCardLibraryNum() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.CardLibraryNum;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "PhantomBattle_1022", e)
  }
  SetTimeEndBtnInteractive(e) {
    var t = this.GetButton(7);
    e ? this.MSr.BanButtonClickModule.ResumeButton(t, "TimeEndBtn.SetTimeEndBtnInteractive") : this.MSr.BanButtonClickModule.BanButton(t, "TimeEndBtn.SetTimeEndBtnInteractive")
  }
  RefreshRoundNum() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId,
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(e),
      t = ModelManager_1.ModelManager.PhantomArenaBattleModel.Round,
      e = e.MaxRoundNum;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), "PhantomBattle_1082", t, e)
  }
  RefreshLimitText() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.BattleCardNum;
    this.GetText(19).SetText(e.toString() + "/" + PhantomArenaDefine_1.LIMIT_BATTLE_CARD_NUM)
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t, i;
    if (e && !(e.length <= 0)) return "CardEffect" === (t = e[0]) || "CardAttr" === t || "DetailCard" === t ? this.MSr.TipsItem?.GetGuideUiItemAndUiItemForShowEx(e) : "BattleCard" === t || "BattleCardById" === t ? ("Own" === e[1] ? this.MSr.OwnArea : this.MSr.OpponentArea)?.FunctionalArea?.GetGuideUiItemAndUiItemForShowEx(e) : "HandCard" === t ? this.MSr.OwnArea?.HandArea?.GetGuideUiItemAndUiItemForShowEx(e) : "HandArea" === t ? ((i = this.MSr.OwnArea?.HandArea?.GetGuideUiItemAndUiItemForShowEx(e)) && 1 < i.length && (i[1] = this.GetGuideUiItem("8")), i) : "Task" === t ? this.MSr.OwnArea?.RolePanel?.GetGuideUiItemAndUiItemForShowEx(e) : void 0
  }
}
exports.PhantomArenaBattleView = PhantomArenaBattleView;
//# sourceMappingURL=PhantomArenaBattleView.js.map