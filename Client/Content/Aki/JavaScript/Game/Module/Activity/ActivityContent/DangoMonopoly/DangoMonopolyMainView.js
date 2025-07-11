"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyMainView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiLayerType_1 = require("../../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const DangoMonopolyBuffStateItem_1 = require("./DangoMonopolyBuffStateItem");
const DangoMonopolyDefine_1 = require("./DangoMonopolyDefine");
const DangoMonopolyMainCaption_1 = require("./DangoMonopolyMainCaption");
const DangoMonopolyPosition_1 = require("./DangoMonopolyPosition");
const DangoMonopolyRoundRewardItem_1 = require("./DangoMonopolyRoundRewardItem");
const DangoMonopolyViewBase_1 = require("./DangoMonopolyViewBase");
class DangoMonopolyMainView extends DangoMonopolyViewBase_1.DangoMonopolyViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.zJa = undefined;
    this.bVc = undefined;
    this.H3e = undefined;
    this.LVc = undefined;
    this.ShowBoardData = undefined;
    this.IsCheckShow = false;
    this.WaitTimeActiveClose = 500;
    this.RewardViewClosePromise = undefined;
    this.ResultClosePromise = undefined;
    this.ResultShowPromise = undefined;
    this.RefreshTimerHandle = undefined;
    this.IsBoardLock = false;
    this.DangoPosition = undefined;
    this.IsOverView = false;
    this.OnTimerRefresh = () => {
      this.CheckBoardUnlockTime();
    };
    this.Usa = () => {
      var t;
      if (!this.ActivityData?.IsDangoMoveProcess) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(4)).IsEscViewTriggerCallBack = false;
        t.FunctionMap.set(1, () => {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LeaveInstanceExternalCancel);
        });
        t.FunctionMap.set(2, () => {
          this.CloseMe();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    };
    this.wVc = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(DangoMonopolyDefine_1.DANGO_MONOPOLY_HELP_ID);
    };
    this.RVc = () => {
      this.ActivityData.SetActivitySpeed();
      this.UpdateSpeed();
    };
    this.AVc = () => {
      this.ActivityData.OpenViewDangoMonopolyTransition(async () => {
        var t = new CustomPromise_1.CustomPromise();
        UiManager_1.UiManager.OpenView("DangoMonopolyResultView", {
          ShowType: 1,
          BoardId: this.ShowBoardData?.Id ?? 0,
          IsShowAllRound: true,
          ShowPromise: t
        });
        return t.Promise;
      });
    };
    this.PVc = () => {
      if (!this.CheckActivityClose()) {
        this.ActivityData.OpenViewDiceTask();
      }
    };
    this.xVc = () => {
      if (!this.CheckActivityClose()) {
        if (this.ActivityData?.IsExistGridReward()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("DangoMonopoly", 69, "OnClickBtnUseDice - 格子奖励未领取");
          }
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("DangoMonopoly", 69, "RollDice=>点击掷骰子", ["棋盘初始化状态", this.ActivityData.IsBoardEntityInit]);
          }
          if (!this.ActivityData.RequestUseDice()) {
            if (this.ActivityData.IsRunningBoardLock()) {
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(DangoMonopolyDefine_1.dangoMonopolyTextKey.DangoMonopolyBoardLock);
            } else {
              this.PVc();
            }
          }
        }
      }
    };
    this.gDo = () => {
      return new DangoMonopolyBuffStateItem_1.DangoMonopolyBuffStateItem();
    };
    this.t8_ = () => {
      var t = new DangoMonopolyRoundRewardItem_1.DangoMonopolyRoundRewardItem();
      t.ClickCallBack = this.hoc;
      return t;
    };
    this.hoc = t => {
      if (!this.CheckActivityClose()) {
        if (t.IsCanReceived) {
          this.ActivityData.RequestReceiveBoard(t.BoardId, true);
        } else {
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t.ItemId);
        }
      }
    };
    this.ut1 = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("DangoMonopoly", 69, "MoveDango=>团子移动开始");
      }
      this.UpdateSpeed();
      this.UpdateDiceUseState();
      this.ResetAngleOfView();
      this.SetMoveDangoUiState(false);
      this.MoveDangoOneStepAsync(true);
    };
    this.Wr1 = () => {
      this.UpdateReward(true);
    };
    this._n1 = () => {
      this.RewardViewClosePromise?.SetResult();
    };
    this.gM1 = () => {
      this.DangoPosition?.SetActive(false);
    };
    this.CM1 = () => {
      this.UpdateDangoPosition();
    };
    this.WR1 = () => {
      this.UpdateAngleOfView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIVerticalLayout], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent], [11, UE.UISprite], [12, UE.UIText], [13, UE.UIText], [14, UE.UILoopScrollViewComponent], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIText], [23, UE.UIExtendToggle]];
    this.BtnBindInfo = [[1, this.RVc], [8, this.AVc], [9, this.PVc], [10, this.xVc], [23, this.WR1]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    this.zJa = new DangoMonopolyMainCaption_1.DangoMonopolyMainCaption();
    await this.zJa.Init(this.GetItem(0));
    this.zJa.OnCloseCallback = this.Usa;
    this.zJa.SetBtnHelpVisible(true);
    this.zJa.OnHelpCallback = this.wVc;
    this.bVc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(5), this.gDo, this.GetItem(6).GetOwner());
    var t = this.GetLoopScrollViewComponent(14);
    var i = this.GetItem(15).GetOwner();
    this.H3e = new LoopScrollView_1.LoopScrollView(t, i, this.t8_, true);
    var t = this.GetItem(16);
    this.LVc = new DangoMonopolyRoundRewardItem_1.DangoMonopolyRoundRewardItem();
    await this.LVc.CreateThenShowByActorAsync(t.GetOwner());
    this.LVc.ClickCallBack = this.hoc;
    this.DangoPosition = new DangoMonopolyPosition_1.DangoMonopolyPosition();
    await this.DangoPosition.Init(this.RootItem);
  }
  OnStart() {
    if (this.ActivityData) {
      this.GetItem(7)?.SetUIActive(false);
      this.UpdateAngleOfViewBtnState();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyViewStart);
      this.CheckShowProcess();
    } else {
      this.DVc();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DangoMonopolyMoveStart, this.ut1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DangoMonopolyBoardRewardUpdate, this.Wr1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseRewardView, this._n1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DangoMonopolyStartShowProcess, this.gM1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DangoMonopolyEndShowProcess, this.CM1);
    RedDotController_1.RedDotController.BindRedDot("DangoMonopolyTask", this.GetItem(19));
    RedDotController_1.RedDotController.BindRedDot("DangoMonopolyDiceNum", this.GetItem(20), this.UpdateDiceUseState.bind(this));
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DangoMonopolyMoveStart, this.ut1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DangoMonopolyBoardRewardUpdate, this.Wr1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseRewardView, this._n1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DangoMonopolyStartShowProcess, this.gM1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DangoMonopolyEndShowProcess, this.CM1);
    RedDotController_1.RedDotController.UnBindRedDot("DangoMonopolyTask");
    RedDotController_1.RedDotController.UnBindRedDot("DangoMonopolyDiceNum");
  }
  OnBeforeShow() {
    if (this.UpdateActivityData()) {
      this.zJa.SetCurrencyItemList([this.ActivityData.DiceItemId]);
      this.UpdateShowBoardData(this.ActivityData.CurrentBoardData);
      this.UpdateData();
      this.RefreshTimerHandle = TimerSystem_1.RealTimeTimerSystem.Forever(this.OnTimerRefresh, 500);
    } else {
      this.DVc();
    }
  }
  CheckBoardUnlockTime() {
    if (this.ActivityData.IsRunningBoardLock() !== this.IsBoardLock) {
      this.UpdateData();
    }
    this.UpdateBoardRemainTime();
  }
  CheckActivityClose() {
    return !!this.ActivityData.CheckIfClose() && (ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView(), true);
  }
  ClearTimer() {
    if (TimerSystem_1.RealTimeTimerSystem.Has(this.RefreshTimerHandle)) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.RefreshTimerHandle);
      this.RefreshTimerHandle = undefined;
    }
  }
  OnBeforeHide() {
    this.ClearTimer();
    this.SetBattleFloatVisible(false);
  }
  OnAfterShow() {
    this.SetBattleFloatVisible(true);
  }
  async SetBattleFloatVisible(t) {
    if (ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetIsOpenHintShow()) {
      await this.ActivityData?.BoardInitPromise?.Promise;
      if (t) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActiveBattleView);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DisActiveBattleView);
      }
      UiLayer_1.UiLayer.GetFloatUnit(UiLayerType_1.ELayerType.BattleFloat, 0).SetUIActive(t);
    }
  }
  async CheckShowProcess() {
    await ControllerHolder_1.ControllerHolder.GuideController.WaitForCurrentTutorialFinish();
    UiLayer_1.UiLayer.SetShowMaskLayer("DangoMonopolyMainView", true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyViewShowProcessStartOrEnd, true);
    await this.ActivityData.BoardInitPromise?.Promise;
    UiLayer_1.UiLayer.SetShowMaskLayer("DangoMonopolyMainView", false);
    await this.CheckShowInfo();
    await this.CheckUpdateDangoPosition();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyViewShowProcessStartOrEnd, false);
  }
  async CheckUpdateDangoPosition() {
    await TimerSystem_1.RealTimeTimerSystem.Wait(TimerSystem_1.MIN_TIME * 2);
    await this.UpdateDangoPosition();
  }
  async CheckShowInfo() {
    if (!this.IsCheckShow) {
      this.IsCheckShow = true;
      await this.CheckWelcome();
      await this.CheckEnterNextRound();
    }
  }
  async CheckWelcome(t = false) {
    await this.ActivityData.BoardInitPromise?.Promise;
    await this.ActivityData?.CheckShowRoundWelcomeProcess();
    this.DangoPosition?.SetActive(t);
    if (this.ActivityData?.IsExistGridReward()) {
      await this.ActivityData.RequestReceiveGrid();
      await this.AwaitRewardShowClose();
    }
  }
  DVc() {
    this.GetButton(1)?.RootUIComp.SetUIActive(false);
    this.GetButton(8)?.RootUIComp.SetUIActive(false);
    this.GetButton(23)?.RootUIComp.SetUIActive(false);
    this.GetItem(17)?.SetUIActive(false);
    this.GetItem(18)?.SetUIActive(false);
  }
  UpdateShowBoardData(t) {
    this.ShowBoardData = t ?? this.ActivityData.BoardList[0];
  }
  OnBeforeDestroy() {
    this.ClearTimer();
    this.LVc?.Destroy();
    this.DangoPosition?.Destroy();
    this.ActivityData?.GameplayExit();
    UiLayer_1.UiLayer.SetShowMaskLayer("DangoMonopolyMainView", false);
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LeaveInstanceExternalConfirm);
  }
  UpdateBtnRoundRecord() {
    var t = this.ActivityData.GetFinishedRoundNum() > 0;
    this.GetButton(8)?.RootUIComp.SetUIActive(t);
  }
  UpdateData() {
    var t = this.ActivityData;
    var i = this.ShowBoardData?.GetPosition() ?? 1;
    var e = t.GetTotalRoundNum();
    var t = t.GetFinishedRoundNum();
    var e = "/" + e;
    var i = "" + i;
    this.GetText(3)?.SetText(i);
    this.GetText(12)?.SetText(t.toString());
    this.GetText(4)?.SetText(e);
    this.GetText(13)?.SetText(e);
    var i = this.GetBuffItemData();
    this.bVc?.RefreshByData(i, undefined, true);
    this.UpdateReward();
    this.UpdateProgress();
    this.UpdateSpeed();
    this.UpdateBtnRoundRecord();
    this.UpdateDiceUseState();
    this.UpdateBoardLockTips();
  }
  GetBuffItemData() {
    return this.ShowBoardData?.GetDangoBuffShowList() ?? [];
  }
  UpdateBoardLockTips() {
    this.IsBoardLock = !!this.ActivityData.IsRunningBoardLock();
    var t = this.GetItem(21);
    var i = this.ActivityData.IsFinishAllRound();
    t?.SetUIActive(i);
    this.GetButton(9)?.RootUIComp.SetUIActive(!i);
    if (i) {
      this.GetText(22)?.ShowTextNew(DangoMonopolyDefine_1.dangoMonopolyTextKey.DangoMonopolyAllRoundFinish);
    } else {
      t?.SetUIActive(this.IsBoardLock);
      this.UpdateBoardRemainTime();
    }
  }
  UpdateBoardRemainTime() {
    if (this.IsBoardLock) {
      this.GetText(22)?.SetText(this.ActivityData.GetBoardRemainTimeStr());
    }
  }
  UpdateDiceUseState() {
    var t = this.GetSprite(11);
    var i = !this.ActivityData.IsCanUseDice();
    t.SetUIActive(i);
    var t = !this.ShowBoardData?.IsFinish();
    this.GetButton(10)?.RootUIComp.SetUIActive(t);
  }
  UpdateReward(t = false) {
    const i = this.ActivityData.BoardList.map(t => {
      return {
        IsReceived: t.IsRewarded,
        IsCanReceived: t.IsCanReceiveReward(),
        ItemId: t.RewardItemId,
        Count: t.RewardItemCount,
        BoardId: t.Id,
        IsCurrent: t.IsRunning(),
        Position: t.GetPosition()
      };
    });
    var e = i[i.length - 1];
    i.pop();
    this.H3e?.RefreshByData(i, true, () => {
      this.UpdateRewardPos(i, t);
    });
    this.LVc?.Refresh(e);
  }
  UpdateRewardPos(t, i = false) {
    var e = this.GetRewardPos(t);
    this.H3e?.ScrollToGridIndex(e);
    if (i &&= this.H3e?.UnsafeGetGridProxy(Math.min(e + 1, t.length - 1))) {
      e = i.RewardItem.GetRootItem();
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirtyByItem(e);
    }
  }
  GetRewardPos(t) {
    var i = t.findIndex(t => t.IsCanReceived);
    if (!(i >= 0)) {
      i = t.findIndex(t => t.IsCurrent);
    }
    return Math.max(0, i - 1);
  }
  UpdateProgress() {}
  UpdateSpeed() {
    var t = this.ActivityData.GetSpeedStr();
    this.GetText(2)?.SetText(t);
  }
  SetMoveDangoUiState(t) {
    this.GetItem(18)?.SetUIActive(t);
    this.GetButton(8)?.RootUIComp.SetUIActive(t);
    this.GetExtendToggle(23)?.RootUIComp.SetUIActive(t);
    this.zJa?.SetBtnCloseVisible(t);
    this.zJa?.SetBtnHelpVisible(t);
    this.zJa?.SetCurrencyVisible(t);
  }
  async MoveDangoOneStepAsync(t = false) {
    if (this.ActivityData.CurrentBoardData?.IsMoveToTarget()) {
      if (this.CheckActivityClose()) {
        return undefined;
      } else {
        await this.ActivityData.MoveDangoEnd();
        await this.DangoMonopolyMoveEnd();
        await this.UpdateDangoPosition();
        return;
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "MoveDango=>团子移动一步");
    }
    this.DangoPosition?.SetActive(false);
    const i = this.ActivityData.GetMoveDangoId();
    var e = this.ActivityData.RunningGridData?.Id ?? 0;
    var e = this.ActivityData.BoardGridUiInfoMap.get(e);
    if (t) {
      await e?.OutBeforeGridUpdate();
    }
    this.ActivityData.CurrentBoardData?.MoveDangoOneStep();
    const o = this.ActivityData.RunningGridData?.Id ?? 0;
    const s = this.ActivityData.BoardGridUiInfoMap.get(o);
    await Promise.all([(async () => {
      await ControllerHolder_1.ControllerHolder.ChessController.MoveItemToPointAsync(i, o);
      if (this.ActivityData.CurrentBoardData?.IsMoveToTarget()) {
        await s?.EnterEndGirdUpdate();
      }
    })(), s?.EnterStartGridUpdate(), e?.OutStartGridUpdate()]);
    await this.CheckTriggerBuffAsync();
    await this.ShowPromise?.Promise;
    await this.MoveDangoOneStepAsync();
  }
  async CheckTriggerBuffAsync() {
    var t;
    var i = this.ActivityData.RunningGridData;
    if (i) {
      if (i.IsExistDango()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("DangoMonopoly", 69, "MoveDango=>团子移动触发特性");
        }
        t = new CustomPromise_1.CustomPromise();
        UiManager_1.UiManager.OpenView("DangoMonopolyBuffActiveView", {
          BoardId: this.ShowBoardData?.Id ?? 0,
          GridData: i,
          Promise: t
        });
        await t.Promise;
        await TimerSystem_1.GameplayTimerSystem.Wait(this.WaitTimeActiveClose);
      }
      if (i.MoveFinishBuffId) {
        this.ActivityData.OpenViewDangoTips(i.MoveFinishBuffId);
      }
      await this.CheckGridIsActiveDouble(i);
    }
  }
  CheckBuffIsWhenMoveFire(t) {
    if (this.ActivityData.BuffIsWhenMoveFire(t)) {
      this.ActivityData.OpenViewDangoTips(t);
      this.ShowBoardData?.AddRecordTriggerBuff(t);
    }
  }
  async CheckGridIsActiveDouble(t) {
    if (t?.PropertyIsDouble()) {
      this.CheckBuffIsWhenMoveFire(t.AddPropertyId);
      const i = [];
      t.BelongBoard.GridList.slice(t.Index).forEach(t => {
        t = this.ActivityData.BoardGridUiInfoMap.get(t.Id);
        if (t) {
          i.push(t.PlayActiveSequence());
        }
      });
      await Promise.all(i);
    }
  }
  async DangoMonopolyMoveEnd() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "MoveDango=>团子移动结束");
    }
    this.SetMoveDangoUiState(true);
    this.ActivityData.ResetSpeed();
    this.UpdateData();
    await this.AwaitRewardShowClose();
    if (this.ActivityData.CurrentBoardData?.IsFinish()) {
      await this.ResultClosePromise?.Promise;
      await this.ResultShowPromise?.Promise;
      this.ResultClosePromise = new CustomPromise_1.CustomPromise();
      this.ResultShowPromise = new CustomPromise_1.CustomPromise();
      this.ActivityData.OpenViewDangoMonopolyTransition(async () => {
        UiManager_1.UiManager.OpenView("DangoMonopolyResultView", {
          ShowType: 0,
          BoardId: this.ShowBoardData?.Id ?? 0,
          IsShowAllRound: false,
          ClosePromise: this.ResultClosePromise,
          ShowPromise: this.ResultShowPromise
        });
        return this.ResultShowPromise?.Promise;
      });
      await this.ResultShowPromise.Promise;
      await this.CheckEnterNextRound();
    }
  }
  async CheckEnterNextRound() {
    if (await this.ActivityData.CheckEnterNextRound()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("DangoMonopoly", 69, "Board=>进入下一轮");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyViewShowProcessStartOrEnd, true);
      this.UpdateShowBoardData(this.ActivityData.CurrentBoardData);
      this.UpdateData();
      await this.ResultClosePromise?.Promise;
      await this.CheckWelcome(true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyViewShowProcessStartOrEnd, false);
    }
  }
  async AwaitRewardShowClose() {
    if (UiManager_1.UiManager.GetViewByName("CommonRewardView")) {
      this.RewardViewClosePromise = new CustomPromise_1.CustomPromise();
      await this.RewardViewClosePromise.Promise;
      this.RewardViewClosePromise = undefined;
    }
  }
  async UpdateDangoPosition(t = true) {
    await this.ActivityData.BoardInitPromise?.Promise;
    var i = this.GetDangoCursorPosition();
    this.DangoPosition?.UpdatePosition(i, t);
  }
  GetDangoCursorPosition() {
    var t;
    var i = this.ActivityData.GetRunningGridId();
    var i = this.ActivityData.BoardGridUiInfoMap.get(i);
    if (i) {
      return i.GetCursorPosition();
    } else {
      i = this.ActivityData.MainRoleDangoEntityId;
      if ((i = ModelManager_1.ModelManager.CreatureModel.GetEntity(i))?.Valid && i.IsInit && i.Entity) {
        t = ((i = i.Entity.GetComponent(1))?.SkeletalMesh?.Bounds?.BoxExtent.Z ?? 0) * 2;
        return UiModelUtil_1.UiModelUtil.GetActorLguiPos(i.Owner, Vector_1.Vector.Create(0, 0, t));
      } else {
        return new UE.Vector2D();
      }
    }
  }
  async UpdateAngleOfView() {
    await this.ActivityData.MoveCameraPromise?.Promise;
    this.IsOverView = !this.IsOverView;
    this.DangoPosition?.SetActive(false);
    if (this.IsOverView) {
      await this.ActivityData.MoveCameraToOverview();
    } else {
      await this.ActivityData.MoveCameraToMainDango();
      await this.UpdateDangoPosition();
    }
  }
  UpdateAngleOfViewBtnState() {
    var t = this.IsOverView ? 1 : 0;
    this.GetExtendToggle(23)?.SetToggleStateForce(t);
  }
  ResetAngleOfView() {
    if (this.IsOverView) {
      this.IsOverView = false;
      this.UpdateAngleOfViewBtnState();
    }
  }
}
exports.DangoMonopolyMainView = DangoMonopolyMainView;
//# sourceMappingURL=DangoMonopolyMainView.js.map