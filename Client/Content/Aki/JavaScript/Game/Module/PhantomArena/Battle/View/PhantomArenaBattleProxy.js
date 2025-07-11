"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleProxy = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomArenaCanvasManager_1 = require("../Canvas/PhantomArenaCanvasManager");
const PhantomArenaBattleDialog_1 = require("../Dialog/PhantomArenaBattleDialog");
const PhantomArenaBattleViewGamepadLogic_1 = require("../Gamepad/PhantomArenaBattleViewGamepadLogic");
const PhantomArenaBattleGuideManager_1 = require("../Guide/PhantomArenaBattleGuideManager");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
const PhantomArenaRoundOverCheck_1 = require("../PhantomArenaRoundOverCheck");
const PhantomArenaProcessManager_1 = require("../Process/PhantomArenaProcessManager");
const PhantomArenaPassiveSkillTriggerLogic_1 = require("../SkillInteract/PhantomArenaPassiveSkillTriggerLogic");
const PhantomArenaBuffEffectManager_1 = require("./BuffEffect/PhantomArenaBuffEffectManager");
const PhantomArenaBanButtonFunctionModule_1 = require("./PhantomArenaBanButtonFunctionModule");
const PhantomArenaBattleServerActionQueue_1 = require("./PhantomArenaBattleServerActionQueue");
class PhantomArenaBattleProxy {
  constructor() {
    this.Yzt = undefined;
    this.RX1 = PhantomArenaDefine_1.INVALID_CARD_ID;
    this.heu = 0;
    this.CaptionItem = undefined;
    this.OwnArea = undefined;
    this.OpponentArea = undefined;
    this.CardRecycle = undefined;
    this.DiscardPanel = undefined;
    this.ChooseCardPanel = undefined;
    this.SkillTriggerMask = undefined;
    this.CanvasManager = new PhantomArenaCanvasManager_1.PhantomArenaCanvasManager();
    this.ProcessManager = new PhantomArenaProcessManager_1.PhantomArenaProcessManager(this);
    this.BuffEffectManager = new PhantomArenaBuffEffectManager_1.PhantomArenaBuffEffectManager(this);
    this.GuideManager = new PhantomArenaBattleGuideManager_1.PhantomArenaBattleGuideManager(this);
    this.DialogManager = new PhantomArenaBattleDialog_1.PhantomArenaBattleDialog();
    this.RoundOverCheck = new PhantomArenaRoundOverCheck_1.PhantomArenaRoundOverCheck(this);
    this.GamepadLogic = new PhantomArenaBattleViewGamepadLogic_1.PhantomArenaBattleViewGamepadLogic(this);
    this.ServerActionQueue = new PhantomArenaBattleServerActionQueue_1.PhantomArenaBattleServerActionQueue(this);
    this.BanButtonClickModule = new PhantomArenaBanButtonFunctionModule_1.PhantomArenaBanButtonFunctionModule();
    this.InCantDragStateSet = new Set();
    this.ShowTimeStart = () => {
      this.UnRegisterCantDragReason(4);
      this.ServerActionQueue.PauseAction();
      this.RegisterCantDragReason(3);
      var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.Round;
      var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.ReplaceCardData.ReplaceNum;
      if (t === 1 && e !== 0) {
        this.ProcessManager.SetState(2);
      } else {
        this.ProcessManager.SetState(3);
      }
    };
    this.ShowOwnChangeCard = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaChangeCardView();
    };
    this.ShowBothDrawCard = async () => {
      await this.StartTimeDrawCardTween();
      this.ProcessManager.SetState(4);
    };
    this.ShowOpponentStartPanel = () => {
      var t = {
        ContentTextId: "PhantomBattle_1044",
        IsOwn: false,
        Callback: () => {
          this.ProcessManager.SetState(5);
        }
      };
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaStartView(t);
    };
    this.StartAiOperation = async () => {
      await this.OpponentArea.StartAiOperation();
      this.ProcessManager.SetState(6);
    };
    this.ShowOwnStartPanel = () => {
      var t = {
        ContentTextId: "PhantomBattle_1045",
        IsOwn: true,
        Callback: () => {
          this.ProcessManager.SetState(7);
        }
      };
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaStartView(t);
    };
    this.ShowOwnCoreCard = () => {
      var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.Round;
      const e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
      if (t === 1 && e.TaskData !== undefined) {
        ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaCoreCardView(() => {
          this.OwnArea.RolePanel.ActiveIsFourCostShowInFirstTime();
          this.ProcessManager.SetState(8);
        });
      } else if (e.CanShowFourCostView) {
        ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaCoreCardView(() => {
          e.CanShowFourCostView = false;
          this.OwnArea.HandArea.AddCard(this.Yzt.GetOwnCardLibraryItem(), [e.CoreCardId]);
          this.ProcessManager.SetState(8);
        });
      } else {
        this.ProcessManager.SetState(8);
      }
    };
    this.ShowOwnPlaying = () => {
      this.ServerActionQueue.ResumeAction();
      this.RoundOverCheck.StartCheck();
      this.Yzt.SetTimeEndBtnInteractive(true);
      this.UnRegisterCantDragReason(3);
    };
    this.RoundOver = async () => {
      this.RegisterCantDragReason(4);
      this.Yzt.SetTimeEndBtnInteractive(false);
      this.RoundOverCheck.Clear();
      await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleRoundOver();
      this.OwnArea.HideCardList();
      await this.EndTimeDiscardCardTween();
      this.ProcessManager.SetState(10);
    };
    this.JumpLoading = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaBattleLoading();
    };
    this.HideLayoutClick = () => {
      this.itu(0);
      this.OwnArea.HideCardList();
    };
    this.CloseClick = () => {
      if (!this.InCantDragStateSet.has(4)) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonController.OnClickInstanceDungeonExitButton(ModelManager_1.ModelManager.PhantomArenaBattleModel.OnClickExitButtonConfirm);
      }
    };
    this.HelpClick = () => {
      if (!this.InCantDragStateSet.has(4)) {
        ControllerHolder_1.ControllerHolder.TutorialController.OpenExclusiveTutorial(101);
      }
    };
    this.TimeEndClick = () => {
      var t;
      if (!this.InCantDragState()) {
        if (this.GuideManager.CheckCanExecuteAndShowFailTips("BvbEndTurn")) {
          t = () => {
            this.GuideManager.FinishCurrentGuide();
            this.ProcessManager.SetState(9);
          };
          if (!this.RoundOverCheck.HasAnyOperation && ModelManager_1.ModelManager.PhantomArenaBattleModel.IsNeedShowTimeEndConfirm) {
            ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.ShowTimeEndConfirm(t);
          } else {
            t();
          }
        }
      }
    };
    this.OnOwnBattleStatusChange = t => {
      for (const e of t) {
        if (e === Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife || e === Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife) {
          this.OwnArea.RolePanel.RefreshLifeNumWithEffect();
        } else if (e === Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint) {
          this.CardRecycle.RefreshCostNum();
          this.OwnArea.HandArea.RefreshHandCardSequence();
          this.OwnArea.RolePanel.RefreshSkillEffect();
        }
      }
    };
    this.OnOpponentBattleStatusChange = t => {
      for (const e of t) {
        if (e === Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife || e === Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife) {
          this.OpponentArea.RefreshLifeNumWithEffect();
        }
      }
    };
    this.OnOwnCardLibraryChange = () => {
      this.Yzt.RefreshOwnCardLibraryNum();
    };
    this.OnOpponentHandCardChange = () => {
      var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HandCardNum;
      this.OpponentArea.HandArea.RefreshHandCardNum(t);
    };
    this.OnOpponentCardLibraryChange = () => {
      this.Yzt.RefreshOpponentCardLibraryNum();
    };
    this.OnOwnHandCardAdd = t => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "刷新手牌");
      }
      this.OwnArea.HandArea.AddCard(this.Yzt.GetOwnCardLibraryItem(), t);
    };
    this.OnTriggerSkillEffect = () => {
      this.BuffEffectManager.ShowSkillEffect();
    };
    this.OnNotifyCardTaskData = t => {
      (t ? this.OwnArea.RolePanel : this.OpponentArea).RefreshTask();
    };
    this.OnOwnHandCardRemove = t => {
      this.OwnArea.HandArea.DiscardCard(this.Yzt.GetOwnCardLibraryItem(), t);
    };
    this.OnCardAttrRefresh = t => {
      if (this.TipsItem.IsInActive && this.TipsItem.GetCardId() === t) {
        this.TipsItem.RefreshContent();
      }
      this.OpponentArea.FunctionalArea.RefreshBattleCard(t);
      this.OwnArea.FunctionalArea.RefreshBattleCard(t);
    };
    this.OnCardFactorsRefresh = t => {
      if (this.TipsItem.IsInActive && this.TipsItem.GetCardId() === t) {
        this.TipsItem.RefreshContent();
      }
      this.OpponentArea.FunctionalArea.RefreshBattleCard(t);
      this.OwnArea.FunctionalArea.RefreshBattleCard(t);
    };
    this.OnNotifyBattleCardChange = (t, e, i) => {
      (t ? (this.OwnArea.FunctionalArea.RefreshBattleCard(e), this.OwnArea) : (this.OpponentArea.FunctionalArea.RefreshBattleCard(e), this.OpponentArea)).FunctionalArea.RefreshBattleCard(i);
    };
    this.OnOwnBattleAttrChange = t => {};
    this.OnOpponentBattleAttrChange = t => {};
    this.OnRefreshRound = () => {
      this.Yzt.RefreshRoundNum();
    };
    this.OnRefreshBattleCardNum = () => {
      this.Yzt.RefreshLimitText();
    };
    this.OnInputControllerMainTypeChange = t => {
      if (t === 2) {
        this.GamepadLogic.ResetGamepadOperation();
      }
    };
    this.OnRefreshHandCardState = () => {
      this.OwnArea.HandArea.RefreshHandCardSequence();
    };
    this.TipsItem = undefined;
    this.DetailsTipsItem = undefined;
    this.SkillTipsItem = undefined;
    this.IsInPanelInteract = false;
    this.HSu = false;
  }
  RegisterView(t) {
    this.Yzt = t;
  }
  RefreshByWorldDone() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "世界加载完成,刷新界面");
    }
    ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleStart();
    this.Show();
  }
  Show() {
    this.Yzt.SetTimeEndBtnInteractive(false);
    this.Yzt.RefreshOwnCardLibraryNum();
    this.Yzt.RefreshOpponentCardLibraryNum();
    this.Yzt.RefreshRoundNum();
    this.Yzt.RefreshLimitText();
    this.OwnArea.RolePanel.RefreshAll();
    this.OpponentArea.RefreshAll();
    this.CardRecycle.RefreshCostNum();
    this.OpponentArea.FunctionalArea.RefreshAllBattleCard();
    this.OwnArea.FunctionalArea.RefreshAllBattleCard();
  }
  Destroy() {
    this.ProcessManager.Clear();
    this.CanvasManager.ClearAreaCanvas();
    this.OpponentArea.Clear();
    this.DialogManager.Clear();
  }
  GetDragRootItem() {
    return this.Yzt.GetDragRootItem();
  }
  GetOpponentCardLibraryItem() {
    return this.Yzt.GetOpponentCardLibraryItem();
  }
  ShowLine() {}
  HideLine() {}
  SetCaptionItemActive(t) {
    this.Yzt.SetCaptionItemActive(t);
  }
  ShowAddBuffEffect(t, e) {
    this.OwnArea.FunctionalArea.ShowAddBuffEffect(t, e);
    this.OpponentArea.FunctionalArea.ShowAddBuffEffect(t, e);
  }
  TriggerPassiveSkillInteract(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "触发被动技能选择");
    }
    new PhantomArenaPassiveSkillTriggerLogic_1.PhantomArenaPassiveSkillTriggerLogic(t, this).Execute();
  }
  RegisterCantDragReason(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "添加不可拖动状态", ["状态", t], ["状态集合", this.InCantDragStateSet]);
    }
    this.InCantDragStateSet.add(t);
  }
  UnRegisterCantDragReason(t) {
    this.InCantDragStateSet.delete(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "删除不可拖动状态", ["状态", t], ["状态集合", this.InCantDragStateSet]);
    }
  }
  InCantDragState() {
    return this.InCantDragStateSet.size > 0;
  }
  SetSelectedCardId(t, e) {
    if (this.RX1 !== PhantomArenaDefine_1.INVALID_CARD_ID) {
      this.leu(false);
    }
    this.RX1 = t;
    this.heu = e;
    this.leu(true);
  }
  CancelSelectedCard() {
    if (this.RX1 !== PhantomArenaDefine_1.INVALID_CARD_ID) {
      this.leu(false);
    }
    this.RX1 = PhantomArenaDefine_1.INVALID_CARD_ID;
    this.heu = 0;
  }
  leu(t) {
    var e;
    if (this.heu === 1) {
      if (e = this.OwnArea.HandArea.GetCardProxy(this.RX1)) {
        e.SetCardSelectedState(t);
      }
    } else if (this.heu === 2) {
      if (e = this.OwnArea.FunctionalArea.GetCardProxyByCardId(this.RX1)) {
        e.SetCardSelectedState(t);
      }
    } else if (this.heu === 3 && (e = this.OpponentArea.FunctionalArea.GetCardProxyByCardId(this.RX1))) {
      e.SetCardSelectedState(t);
    }
  }
  PlayRoundOverEffect() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "播放回合结束扫光效果");
    }
    this.Yzt.SetRoundEffectActive(true);
  }
  HideRoundOverEffect() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "隐藏回合结束扫光效果");
    }
    this.Yzt.SetRoundEffectActive(false);
  }
  CheckRepeatCondition() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
    return (t.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint) !== 0 || !!t.HasFourCostInHand()) && t.GetHandCardIdList().length !== 0;
  }
  GetOwnCardLibraryItem() {
    return this.Yzt.GetOwnCardLibraryItem();
  }
  itu(t) {
    this.TipsItem.SetTipsActive(t === 1);
    this.DetailsTipsItem.SetTipsActive(t === 2);
    this.SkillTipsItem.SetTipsActive(t === 3);
  }
  HideCardTips() {
    this.itu(0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardDetailShowHideChange, false);
  }
  ShowCardTips(t) {
    this.TipsItem.RefreshTips(t);
    this.itu(1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardDetailShowHideChange, true);
  }
  SwitchCardTips(t) {
    if (this.TipsItem.IsInActive) {
      this.HideCardTips();
    } else {
      this.ShowCardTips(t);
    }
  }
  SwitchFourCostTips(t, e) {
    var i = t ? 1 : 2;
    if (this.DetailsTipsItem.IsInActive && i === this.DetailsTipsItem.ShowType) {
      this.itu(0);
    } else {
      e = {
        AttachItem: e,
        ShowType: i
      };
      i = (t ? ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData : ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).TaskData;
      this.DetailsTipsItem.RefreshByTaskData(i);
      this.DetailsTipsItem.SetTipsPosition(e);
      this.itu(2);
    }
  }
  ShowSkillTips(t, e) {
    this.SkillTipsItem.Refresh(t);
    this.SkillTipsItem.SetAttachItem(e);
    this.itu(3);
  }
  HideSkillTips() {
    this.SkillTipsItem.SetTipsActive(false);
  }
  async StartTimeDrawCardTween() {
    await Promise.all([this.OpponentArea.HandArea.StartTimeDrawCard(this.Yzt.GetOpponentCardLibraryItem()), this.OwnArea.HandArea.StartTimeDrawCard(this.Yzt.GetOwnCardLibraryItem())]);
  }
  async EndTimeDiscardCardTween() {
    await Promise.all([this.OwnArea.HandArea.EndTimeDiscardCard(this.Yzt.GetOwnCardLibraryItem()), this.OpponentArea.HandArea.EndTimeDiscardCard(this.Yzt.GetOpponentCardLibraryItem())]);
  }
  SetIsMainInVisible(t) {
    this.HSu = t;
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirtyByGroupItem(this.Yzt.GetRootItem());
  }
  get IsMainInVisible() {
    return this.HSu;
  }
}
exports.PhantomArenaBattleProxy = PhantomArenaBattleProxy;
//# sourceMappingURL=PhantomArenaBattleProxy.js.map