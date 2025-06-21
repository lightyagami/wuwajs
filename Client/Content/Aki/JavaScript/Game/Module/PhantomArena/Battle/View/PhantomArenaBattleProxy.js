"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleProxy = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PhantomArenaCanvasManager_1 = require("../Canvas/PhantomArenaCanvasManager"),
  PhantomArenaBattleDialog_1 = require("../Dialog/PhantomArenaBattleDialog"),
  PhantomArenaBattleViewGamepadLogic_1 = require("../Gamepad/PhantomArenaBattleViewGamepadLogic"),
  PhantomArenaBattleGuideManager_1 = require("../Guide/PhantomArenaBattleGuideManager"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine"),
  PhantomArenaRoundOverCheck_1 = require("../PhantomArenaRoundOverCheck"),
  PhantomArenaProcessManager_1 = require("../Process/PhantomArenaProcessManager"),
  PhantomArenaPassiveSkillTriggerLogic_1 = require("../SkillInteract/PhantomArenaPassiveSkillTriggerLogic"),
  PhantomArenaBuffEffectManager_1 = require("./BuffEffect/PhantomArenaBuffEffectManager"),
  PhantomArenaBanButtonFunctionModule_1 = require("./PhantomArenaBanButtonFunctionModule"),
  PhantomArenaBattleServerActionQueue_1 = require("./PhantomArenaBattleServerActionQueue");
class PhantomArenaBattleProxy {
  constructor() {
    this.Yzt = void 0, this.DK1 = PhantomArenaDefine_1.INVALID_CARD_ID, this.dZ1 = 0, this.CaptionItem = void 0, this.OwnArea = void 0, this.OpponentArea = void 0, this.CardRecycle = void 0, this.DiscardPanel = void 0, this.ChooseCardPanel = void 0, this.SkillTriggerMask = void 0, this.CanvasManager = new PhantomArenaCanvasManager_1.PhantomArenaCanvasManager, this.ProcessManager = new PhantomArenaProcessManager_1.PhantomArenaProcessManager(this), this.BuffEffectManager = new PhantomArenaBuffEffectManager_1.PhantomArenaBuffEffectManager(this), this.GuideManager = new PhantomArenaBattleGuideManager_1.PhantomArenaBattleGuideManager(this), this.DialogManager = new PhantomArenaBattleDialog_1.PhantomArenaBattleDialog, this.RoundOverCheck = new PhantomArenaRoundOverCheck_1.PhantomArenaRoundOverCheck(this), this.GamepadLogic = new PhantomArenaBattleViewGamepadLogic_1.PhantomArenaBattleViewGamepadLogic(this), this.ServerActionQueue = new PhantomArenaBattleServerActionQueue_1.PhantomArenaBattleServerActionQueue(this), this.BanButtonClickModule = new PhantomArenaBanButtonFunctionModule_1.PhantomArenaBanButtonFunctionModule, this.InCantDragStateSet = new Set, this.ShowTimeStart = () => {
      this.ServerActionQueue.PauseAction(), this.RegisterCantDragReason(3);
      var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.Round,
        e = ModelManager_1.ModelManager.PhantomArenaBattleModel.ReplaceCardData.ReplaceNum;
      1 === t && 0 !== e ? this.ProcessManager.SetState(2) : this.ProcessManager.SetState(3)
    }, this.ShowOwnChangeCard = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaChangeCardView()
    }, this.ShowBothDrawCard = async () => {
      await this.StartTimeDrawCardTween(), this.ProcessManager.SetState(4)
    }, this.ShowOpponentStartPanel = () => {
      var t = {
        ContentTextId: "PhantomBattle_1044",
        IsOwn: !1,
        Callback: () => {
          this.ProcessManager.SetState(5)
        }
      };
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaStartView(t)
    }, this.StartAiOperation = async () => {
      await this.OpponentArea.StartAiOperation(), this.ProcessManager.SetState(6)
    }, this.ShowOwnStartPanel = () => {
      var t = {
        ContentTextId: "PhantomBattle_1045",
        IsOwn: !0,
        Callback: () => {
          this.ProcessManager.SetState(7)
        }
      };
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaStartView(t)
    }, this.ShowOwnCoreCard = () => {
      var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.Round;
      const e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
      1 === t && void 0 !== e.TaskData ? ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaCoreCardView(() => {
        this.OwnArea.RolePanel.ActiveIsFourCostShowInFirstTime(), this.ProcessManager.SetState(8)
      }) : e.CanShowFourCostView ? ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaCoreCardView(() => {
        e.CanShowFourCostView = !1, this.OwnArea.HandArea.AddCard(this.Yzt.GetOwnCardLibraryItem(), [e.CoreCardId]), this.ProcessManager.SetState(8)
      }) : this.ProcessManager.SetState(8)
    }, this.ShowOwnPlaying = () => {
      this.ServerActionQueue.ResumeAction(), this.RoundOverCheck.StartCheck(), this.Yzt.SetTimeEndBtnInteractive(!0), this.UnRegisterCantDragReason(3)
    }, this.RoundOver = async () => {
      this.Yzt.SetTimeEndBtnInteractive(!1), this.RoundOverCheck.Clear(), await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleRoundOver(), this.OwnArea.HideCardList(), await this.EndTimeDiscardCardTween(), this.ProcessManager.SetState(10)
    }, this.JumpLoading = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaBattleLoading()
    }, this.HideLayoutClick = () => {
      this.aeu(0), this.OwnArea.HideCardList()
    }, this.CloseClick = () => {
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.OnClickInstanceDungeonExitButton(ModelManager_1.ModelManager.PhantomArenaBattleModel.OnClickExitButtonConfirm)
    }, this.HelpClick = () => {
      ControllerHolder_1.ControllerHolder.TutorialController.OpenExclusiveTutorial(101)
    }, this.TimeEndClick = () => {
      var t;
      this.InCantDragState() || this.GuideManager.CheckCanExecuteAndShowFailTips("BvbEndTurn") && (t = () => {
        this.GuideManager.FinishCurrentGuide(), this.ProcessManager.SetState(9)
      }, !this.RoundOverCheck.HasAnyOperation && ModelManager_1.ModelManager.PhantomArenaBattleModel.IsNeedShowTimeEndConfirm ? ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.ShowTimeEndConfirm(t) : t())
    }, this.OnOwnBattleStatusChange = t => {
      for (const e of t) e === Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleLife || e === Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleMaxLife ? this.OwnArea.RolePanel.RefreshLifeNumWithEffect() : e === Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleCostPoint && (this.CardRecycle.RefreshCostNum(), this.OwnArea.HandArea.RefreshHandCardSequence(), this.OwnArea.RolePanel.RefreshSkillEffect())
    }, this.OnOpponentBattleStatusChange = t => {
      for (const e of t) e !== Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleLife && e !== Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleMaxLife || this.OpponentArea.RefreshLifeNumWithEffect()
    }, this.OnOwnCardLibraryChange = () => {
      this.Yzt.RefreshOwnCardLibraryNum()
    }, this.OnOpponentHandCardChange = () => {
      var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HandCardNum;
      this.OpponentArea.HandArea.RefreshHandCardNum(t)
    }, this.OnOpponentCardLibraryChange = () => {
      this.Yzt.RefreshOpponentCardLibraryNum()
    }, this.OnOwnHandCardAdd = t => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "刷新手牌"), this.OwnArea.HandArea.AddCard(this.Yzt.GetOwnCardLibraryItem(), t)
    }, this.OnTriggerSkillEffect = () => {
      this.BuffEffectManager.ShowSkillEffect()
    }, this.OnNotifyCardTaskData = t => {
      (t ? this.OwnArea.RolePanel : this.OpponentArea).RefreshTask()
    }, this.OnOwnHandCardRemove = t => {
      this.OwnArea.HandArea.DiscardCard(this.Yzt.GetOwnCardLibraryItem(), t)
    }, this.OnCardAttrRefresh = t => {
      this.TipsItem.IsInActive && this.TipsItem.GetCardId() === t && this.TipsItem.RefreshContent(), this.OpponentArea.FunctionalArea.RefreshBattleCard(t), this.OwnArea.FunctionalArea.RefreshBattleCard(t)
    }, this.OnCardFactorsRefresh = t => {
      this.TipsItem.IsInActive && this.TipsItem.GetCardId() === t && this.TipsItem.RefreshContent(), this.OpponentArea.FunctionalArea.RefreshBattleCard(t), this.OwnArea.FunctionalArea.RefreshBattleCard(t)
    }, this.OnNotifyBattleCardChange = (t, e, i) => {
      (t ? (this.OwnArea.FunctionalArea.RefreshBattleCard(e), this.OwnArea) : (this.OpponentArea.FunctionalArea.RefreshBattleCard(e), this.OpponentArea)).FunctionalArea.RefreshBattleCard(i)
    }, this.OnOwnBattleAttrChange = t => {}, this.OnOpponentBattleAttrChange = t => {}, this.OnRefreshRound = () => {
      this.Yzt.RefreshRoundNum()
    }, this.OnRefreshBattleCardNum = () => {
      this.Yzt.RefreshLimitText()
    }, this.OnInputControllerMainTypeChange = t => {
      2 === t && this.GamepadLogic.ResetGamepadOperation()
    }, this.OnRefreshHandCardState = () => {
      this.OwnArea.HandArea.RefreshHandCardSequence()
    }, this.TipsItem = void 0, this.DetailsTipsItem = void 0, this.SkillTipsItem = void 0, this.IsInPanelInteract = !1, this.Uuu = !1
  }
  RegisterView(t) {
    this.Yzt = t
  }
  RefreshByWorldDone() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "世界加载完成,刷新界面"), ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleStart(), this.Show()
  }
  Show() {
    this.Yzt.SetTimeEndBtnInteractive(!1), this.Yzt.RefreshOwnCardLibraryNum(), this.Yzt.RefreshOpponentCardLibraryNum(), this.Yzt.RefreshRoundNum(), this.Yzt.RefreshLimitText(), this.OwnArea.RolePanel.RefreshAll(), this.OpponentArea.RefreshAll(), this.CardRecycle.RefreshCostNum(), this.OpponentArea.FunctionalArea.RefreshAllBattleCard(), this.OwnArea.FunctionalArea.RefreshAllBattleCard()
  }
  Destroy() {
    this.ProcessManager.Clear(), this.CanvasManager.ClearAreaCanvas(), this.OpponentArea.Clear(), this.DialogManager.Clear()
  }
  GetDragRootItem() {
    return this.Yzt.GetDragRootItem()
  }
  GetOpponentCardLibraryItem() {
    return this.Yzt.GetOpponentCardLibraryItem()
  }
  ShowLine() {}
  HideLine() {}
  SetCaptionItemActive(t) {
    this.Yzt.SetCaptionItemActive(t)
  }
  ShowAddBuffEffect(t, e) {
    this.OwnArea.FunctionalArea.ShowAddBuffEffect(t, e), this.OpponentArea.FunctionalArea.ShowAddBuffEffect(t, e)
  }
  TriggerPassiveSkillInteract(t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "触发被动技能选择"), new PhantomArenaPassiveSkillTriggerLogic_1.PhantomArenaPassiveSkillTriggerLogic(t, this).Execute()
  }
  RegisterCantDragReason(t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "添加不可拖动状态", ["状态", t], ["状态集合", this.InCantDragStateSet]), this.InCantDragStateSet.add(t)
  }
  UnRegisterCantDragReason(t) {
    this.InCantDragStateSet.delete(t), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "删除不可拖动状态", ["状态", t], ["状态集合", this.InCantDragStateSet])
  }
  InCantDragState() {
    return 0 < this.InCantDragStateSet.size
  }
  SetSelectedCardId(t, e) {
    this.DK1 !== PhantomArenaDefine_1.INVALID_CARD_ID && this.mZ1(!1), this.DK1 = t, this.dZ1 = e, this.mZ1(!0)
  }
  CancelSelectedCard() {
    this.DK1 !== PhantomArenaDefine_1.INVALID_CARD_ID && this.mZ1(!1), this.DK1 = PhantomArenaDefine_1.INVALID_CARD_ID, this.dZ1 = 0
  }
  mZ1(t) {
    var e;
    1 === this.dZ1 ? (e = this.OwnArea.HandArea.GetCardProxy(this.DK1)) && e.SetCardSelectedState(t) : 2 === this.dZ1 ? (e = this.OwnArea.FunctionalArea.GetCardProxyByCardId(this.DK1)) && e.SetCardSelectedState(t) : 3 === this.dZ1 && (e = this.OpponentArea.FunctionalArea.GetCardProxyByCardId(this.DK1)) && e.SetCardSelectedState(t)
  }
  PlayRoundOverEffect() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "播放回合结束扫光效果"), this.Yzt.SetRoundEffectActive(!0)
  }
  HideRoundOverEffect() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "隐藏回合结束扫光效果"), this.Yzt.SetRoundEffectActive(!1)
  }
  CheckRepeatCondition() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
    return !(0 === t.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleCostPoint) && !t.HasFourCostInHand()) && 0 !== t.GetHandCardIdList().length
  }
  GetOwnCardLibraryItem() {
    return this.Yzt.GetOwnCardLibraryItem()
  }
  aeu(t) {
    this.TipsItem.SetTipsActive(1 === t), this.DetailsTipsItem.SetTipsActive(2 === t), this.SkillTipsItem.SetTipsActive(3 === t)
  }
  HideCardTips() {
    this.aeu(0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardDetailShowHideChange, !1)
  }
  ShowCardTips(t) {
    this.TipsItem.RefreshTips(t), this.aeu(1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardDetailShowHideChange, !0)
  }
  SwitchCardTips(t) {
    this.TipsItem.IsInActive ? this.HideCardTips() : this.ShowCardTips(t)
  }
  SwitchFourCostTips(t, e) {
    var i = t ? 1 : 2;
    this.DetailsTipsItem.IsInActive && i === this.DetailsTipsItem.ShowType ? this.aeu(0) : (e = {
      AttachItem: e,
      ShowType: i
    }, i = (t ? ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData : ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).TaskData, this.DetailsTipsItem.RefreshByTaskData(i), this.DetailsTipsItem.SetTipsPosition(e), this.aeu(2))
  }
  ShowSkillTips(t, e) {
    this.SkillTipsItem.Refresh(t), this.SkillTipsItem.SetAttachItem(e), this.aeu(3)
  }
  HideSkillTips() {
    this.SkillTipsItem.SetTipsActive(!1)
  }
  async StartTimeDrawCardTween() {
    await Promise.all([this.OpponentArea.HandArea.StartTimeDrawCard(this.Yzt.GetOpponentCardLibraryItem()), this.OwnArea.HandArea.StartTimeDrawCard(this.Yzt.GetOwnCardLibraryItem())])
  }
  async EndTimeDiscardCardTween() {
    await Promise.all([this.OwnArea.HandArea.EndTimeDiscardCard(this.Yzt.GetOwnCardLibraryItem()), this.OpponentArea.HandArea.EndTimeDiscardCard(this.Yzt.GetOpponentCardLibraryItem())])
  }
  SetIsMainInVisible(t, e) {
    this.Uuu = t, ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirtyByGroupItem(e)
  }
  get IsMainInVisible() {
    return this.Uuu
  }
}
exports.PhantomArenaBattleProxy = PhantomArenaBattleProxy;
//# sourceMappingURL=PhantomArenaBattleProxy.js.map