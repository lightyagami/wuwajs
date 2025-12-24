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
const PhantomArenaSkillInteractFactory_1 = require("../SkillInteract/PhantomArenaSkillInteractFactory");
const PhantomArenaBuffEffectManager_1 = require("./BuffEffect/PhantomArenaBuffEffectManager");
const PhantomArenaBanButtonFunctionModule_1 = require("./PhantomArenaBanButtonFunctionModule");
const PhantomArenaBattleServerActionQueue_1 = require("./PhantomArenaBattleServerActionQueue");
class PhantomArenaBattleProxy {
  constructor() {
    this.Yzt = undefined;
    this.ZX1 = PhantomArenaDefine_1.INVALID_CARD_ID;
    this.Deu = 0;
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
      this.UnRegisterCantDragReason(3);
      this.ServerActionQueue.PauseAction();
      this.RegisterCantDragReason(2);
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
      if (ModelManager_1.ModelManager.PhantomArenaBattleModel.GetPhantomBattleSettleNotify()) {
        this.ProcessManager.SetState(6);
      } else {
        this.ProcessManager.SetState(7);
      }
    };
    this.ShowGameOver = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.TriggerPhantomBattleBoardSettle();
      this.ServerActionQueue.ResumeAction();
    };
    this.ShowOwnStartPanel = () => {
      var t = {
        ContentTextId: "PhantomBattle_1045",
        IsOwn: true,
        Callback: () => {
          this.ProcessManager.SetState(8);
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
          this.ProcessManager.SetState(9);
        });
      } else if (e.CanShowFourCostView) {
        ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaCoreCardView(() => {
          e.CanShowFourCostView = false;
          this.OwnArea.HandArea.AddCard([e.CoreCardId]);
          this.ProcessManager.SetState(9);
        });
      } else {
        this.ProcessManager.SetState(9);
      }
    };
    this.ShowOwnPlaying = () => {
      this.ServerActionQueue.ResumeAction();
      this.RoundOverCheck.StartCheck();
      this.Yzt.SetTimeEndBtnInteractive(true);
      this.UnRegisterCantDragReason(2);
    };
    this.RoundOver = async () => {
      this.RegisterCantDragReason(3);
      this.Yzt.SetTimeEndBtnInteractive(false);
      this.RoundOverCheck.Clear();
      this.ServerActionQueue.PauseAction();
      await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleRoundOver();
      await this.ServerActionQueue.ResumeAction();
      await this.ServerActionQueue.WaitHandleFinish();
      this.OwnArea.HideCardList();
      await this.EndTimeDiscardCardTween();
      this.ProcessManager.SetState(11);
    };
    this.JumpLoading = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaBattleLoading();
    };
    this.HideLayoutClick = () => {
      this.Ltu(0);
      this.OwnArea.HideCardList();
    };
    this.CloseClick = () => {
      if (!this.InCantDragStateSet.has(3)) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonController.OnClickInstanceDungeonExitButton(() => {
          this.GuideManager.TryExitCurrentGuide();
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OnClickExitButtonConfirm();
        });
      }
    };
    this.HelpClick = () => {
      if (!this.InCantDragStateSet.has(3)) {
        if (ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb) {
          ControllerHolder_1.ControllerHolder.TutorialController.OpenExclusiveTutorial(101);
        } else {
          ControllerHolder_1.ControllerHolder.TutorialController.OpenExclusiveTutorial(102);
        }
      }
    };
    this.TimeEndClick = () => {
      var t;
      if (!this.InCantDragState()) {
        if (this.GuideManager.CheckCanExecuteAndShowFailTips("BvbEndTurn")) {
          if (this.ServerActionQueue.InAction()) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1189");
          } else {
            t = () => {
              this.GuideManager.FinishCurrentGuide();
              this.ProcessManager.SetState(10);
            };
            if (!this.RoundOverCheck.HasAnyOperation && ModelManager_1.ModelManager.PhantomArenaBattleModel.IsNeedShowTimeEndConfirm) {
              ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.ShowTimeEndConfirm(t);
            } else {
              t();
            }
          }
        }
      }
    };
    this.OnOwnBattleStatusChange = t => {
      for (const e of t) {
        if (e === Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife || e === Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife) {
          this.OwnArea.RolePanel.RefreshLifeNumWithEffect();
        } else if (e === Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint) {
          this.RoundOverCheck.RepeatCheck();
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
      this.OwnArea.HandArea.AddCard(t);
    };
    this.OnTriggerSkillEffect = () => {
      this.ServerActionQueue.PushSkillEffectAction();
    };
    this.OnNotifyCardTaskData = t => {
      (t ? this.OwnArea : this.OpponentArea).RolePanel.RefreshTask();
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
      if (t === ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.FieldData?.CardData?.CardId) {
        this.OwnArea.RefreshFiledArea();
      } else if (t === ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.FieldData?.CardData?.CardId) {
        this.OpponentArea.RefreshFiledArea();
      }
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
    this.OnOwnBattleAttrChange = t => {
      if (t.includes(Protocol_1.Aki.Protocol.GC1.Proto_Defence)) {
        this.OwnArea.RolePanel.RefreshShieldNum();
      }
    };
    this.OnOpponentBattleAttrChange = t => {
      if (t.includes(Protocol_1.Aki.Protocol.GC1.Proto_Defence)) {
        this.OpponentArea.RolePanel.RefreshShieldNum();
      }
    };
    this.OnRefreshRound = () => {
      this.Yzt.RefreshRoundNum();
    };
    this.OnRefreshBattleCardNum = () => {
      this.Yzt.RefreshLimitText();
    };
    this.OnInputControllerMainTypeChange = (t, e) => {
      if (t === 2) {
        this.GamepadLogic.ResetGamepadOperation();
      }
      t = e === 2;
      this.OpponentArea.SwitchFieldState(t);
      this.OpponentArea.RolePanel.RefreshSkillState();
      this.OwnArea.SwitchFieldState(t);
    };
    this.OnRefreshHandCardState = () => {
      this.OwnArea.HandArea.RefreshHandCardSequence();
    };
    this.OnPhantomBattleBoardSettleNotify = () => {
      if (!this.ProcessManager.IsNotInOwnPlaying) {
        ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.TriggerPhantomBattleBoardSettle();
      }
    };
    this.OnOpponentSealFieldChange = t => {
      this.OpponentArea.FiledArea?.RefreshSelf();
    };
    this.OnOwnSealRecycleChange = t => {};
    this.TipsItem = undefined;
    this.DetailsTipsItem = undefined;
    this.SkillTipsItem = undefined;
    this.InPanelInteractType = 0;
    this.j7c = false;
    this.FieldInteractClick = (t, e) => {
      if (!t.CardData?.IsNpcCard && !this.InCantDragState()) {
        if (this.GuideManager.CheckCanExecuteAndShowFailTips("BvbUseFieldCardSkill")) {
          if (t.IsInSeal) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1133");
          } else if (t.HasClickActiveSkill) {
            if (t.IsCanInteractive) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("PhantomArena", 10, "使用领域", ["领域", t.CardConfigId]);
              }
              this.OnHandleFiledClick(t, e);
            }
          } else {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1132");
          }
        }
      }
    };
    this.FieldFinishSkillInteract = t => {
      t = {
        CardId: t.CardData.CardId
      };
      this.GuideManager.TryFinishGuideByType("BvbUseFieldCardSkill", 0, t);
    };
    this.FieldPointerEnter = (t, e, i) => {
      this.ShowFiledTips(t, e, i);
    };
    this.FieldPointerExit = () => {
      this.HideFiledTips();
    };
  }
  RegisterView(t) {
    this.Yzt = t;
  }
  RefreshByWorldDone() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "世界加载完成,刷新界面");
    }
    ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleStart();
    this.Show(true);
  }
  Show(t) {
    this.Yzt.SetTimeEndBtnInteractive(false);
    this.Yzt.RefreshOwnCardLibraryNum();
    this.Yzt.RefreshOpponentCardLibraryNum();
    this.Yzt.RefreshRoundNum();
    this.Yzt.RefreshLimitText();
    this.OwnArea.RefreshAll(t);
    this.OpponentArea.RefreshAll(t);
    this.CardRecycle.RefreshCostNum();
  }
  Destroy() {
    this.ProcessManager.Clear();
    this.CanvasManager.ClearAreaCanvas();
    this.OpponentArea.Clear();
    this.DialogManager.Clear();
    ModelManager_1.ModelManager.PhantomArenaBattleModel.ClearWaitBattleData();
  }
  GetDragRootItem() {
    return this.Yzt.GetDragRootItem();
  }
  GetOpponentCardLibraryItem() {
    return this.Yzt.GetOpponentCardLibraryItem();
  }
  GetSkillTriggerAttachItem() {
    return this.Yzt.GetSkillTriggerAttachItem();
  }
  async PlayShowFieldEffect() {
    await this.Yzt.PlayShowFieldEffect();
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
    if (this.ZX1 !== t || this.Deu !== e) {
      if (this.ZX1 !== PhantomArenaDefine_1.INVALID_CARD_ID) {
        this.Beu(false);
      }
      this.ZX1 = t;
      this.Deu = e;
      this.Beu(true);
    }
  }
  CancelSelectedCard() {
    if (this.ZX1 !== PhantomArenaDefine_1.INVALID_CARD_ID) {
      this.Beu(false);
    }
    this.ZX1 = PhantomArenaDefine_1.INVALID_CARD_ID;
    this.Deu = 0;
  }
  Beu(t) {
    var e;
    if (this.Deu === 1) {
      if (e = this.OwnArea.HandArea.GetCardProxy(this.ZX1)) {
        e.SetCardSelectedState(t);
      }
    } else if (this.Deu === 2) {
      if (e = this.OwnArea.FunctionalArea.GetCardProxyByCardId(this.ZX1)) {
        e.SetCardSelectedState(t);
      }
    } else if (this.Deu === 3 && (e = this.OpponentArea.FunctionalArea.GetCardProxyByCardId(this.ZX1))) {
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
  Ltu(t) {
    this.TipsItem.SetTipsActive(t === 1);
    this.DetailsTipsItem.SetTipsActive(t);
    this.SkillTipsItem.SetTipsActive(t === 4);
  }
  HideCardTips() {
    this.Ltu(0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardDetailShowHideChange, false);
  }
  ShowCardTips(t, e) {
    this.TipsItem.RefreshTips(t, e);
    this.Ltu(1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardDetailShowHideChange, true);
  }
  SwitchCardTips(t) {
    if (this.TipsItem.IsInActive) {
      this.HideCardTips();
      return false;
    } else {
      this.ShowCardTips(t, true);
      return true;
    }
  }
  SwitchFourCostTips(t, e) {
    var i = t ? 1 : 2;
    if (this.DetailsTipsItem.IsInActive && i === this.DetailsTipsItem.ShowType) {
      this.Ltu(0);
    } else {
      e = {
        TriggerItem: e,
        PositionType: t ? 3 : 0,
        ShowType: i
      };
      i = (t ? ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData : ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).TaskData;
      this.DetailsTipsItem.RefreshByTaskData(i);
      this.DetailsTipsItem.SetTipsPositionByTriggerItem(e);
      this.Ltu(2);
    }
  }
  ShowSkillTips(t, e) {
    this.SkillTipsItem.Refresh(t);
    this.SkillTipsItem.SetTipsPosition(e, t.IsOwn);
    this.Ltu(4);
  }
  HideSkillTips() {
    this.Ltu(0);
  }
  ShowFiledTips(e, i, h) {
    var s = e.IsOwn ? 3 : 4;
    if (this.DetailsTipsItem.IsInActive && s === this.DetailsTipsItem.ShowType) {
      this.Ltu(0);
    } else {
      let t = undefined;
      i = {
        TriggerItem: i,
        PositionType: t = h ? e.IsOwn ? 3 : 0 : e.IsOwn ? 2 : 1,
        ShowType: s
      };
      this.DetailsTipsItem.RefreshByCardData(e.CardData);
      this.DetailsTipsItem.SetTipsPositionByTriggerItem(i);
      this.Ltu(3);
    }
  }
  HideFiledTips() {
    this.Ltu(0);
  }
  async StartTimeDrawCardTween() {
    await Promise.all([this.OpponentArea.HandArea.StartTimeDrawCard(this.Yzt.GetOpponentCardLibraryItem()), this.OwnArea.HandArea.StartTimeDrawCard(this.Yzt.GetOwnCardLibraryItem())]);
  }
  async EndTimeDiscardCardTween() {
    await Promise.all([this.OwnArea.HandArea.EndTimeDiscardCard(this.Yzt.GetOwnCardLibraryItem()), this.OpponentArea.HandArea.EndTimeDiscardCard(this.Yzt.GetOpponentCardLibraryItem())]);
  }
  get IsInPanelInteract() {
    return this.InPanelInteractType !== 0;
  }
  SetInPanelInteractType(t) {
    this.InPanelInteractType = t;
    this.Yzt.RefreshUiBlurBehaviour();
  }
  SetIsMainInVisible(t) {
    this.j7c = t;
    this.Yzt.RefreshUiBlurBehaviour();
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirtyByGroupItem(this.Yzt.GetRootItem());
  }
  get IsMainInVisible() {
    return this.j7c;
  }
  async ShowNpcFieldSealEffect() {
    this.Yzt.LockNpcField();
    await this.OpponentArea.LockFiledArea();
  }
  async ShowNpcFieldUnlockEffect() {
    this.Yzt.UnlockNpcField();
    await this.OpponentArea.UnlockFiledArea();
  }
  async ShowOwnFieldSealEffect() {
    await this.OwnArea.ShowFiledArea();
  }
  async ShowOwnFieldUnlockEffect() {
    await this.OwnArea.UnlockFiledArea();
  }
  async OnHandleFiledClick(t, e) {
    this.RegisterCantDragReason(6);
    try {
      var i;
      if (await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCardTargetInfo(t.CardData.CardId, t.ClickActiveSkillId, true, true)) {
        if (i = ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.CardSkillTriggerInfo) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "执行领域技能", ["领域", t.CardConfigId]);
          }
          await this.OwnArea.FiledArea?.TriggerSkill();
          if ((await PhantomArenaSkillInteractFactory_1.PhantomArenaSkillInteractFactory.GetSkillInteract(i.InteractType).Execute(this, e)) !== 1) {
            this.GuideManager.FinishCurrentGuide();
          } else {
            this.OwnArea.FiledArea?.ResetSkillTrigger();
          }
        }
        this.UnRegisterCantDragReason(6);
      } else {
        this.UnRegisterCantDragReason(6);
      }
    } catch {
      this.UnRegisterCantDragReason(6);
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "使用领域失败", ["领域", t.CardConfigId]);
      }
    }
  }
}
exports.PhantomArenaBattleProxy = PhantomArenaBattleProxy;
//# sourceMappingURL=PhantomArenaBattleProxy.js.map