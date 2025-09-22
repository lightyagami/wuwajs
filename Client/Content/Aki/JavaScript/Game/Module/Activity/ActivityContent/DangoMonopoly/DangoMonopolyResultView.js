"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyResultView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../../Ui/UiManager");
const DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
const RewardSmallItemGrid_1 = require("../../../ItemReward/View/RewardSmallItemGrid");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const DangoMonopolyDefine_1 = require("./DangoMonopolyDefine");
const DangoMonopolyResultRoundItem_1 = require("./DangoMonopolyResultRoundItem");
const DangoMonopolyViewBase_1 = require("./DangoMonopolyViewBase");
class DangoMonopolyResultView extends DangoMonopolyViewBase_1.DangoMonopolyViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.RoundScrollView = undefined;
    this.RewardScrollView = undefined;
    this.ShowBoardData = undefined;
    this.LastBoardData = undefined;
    this.ShowDangoActorList = [];
    this.LastDangoActorList = [];
    this.DangoActorListMap = new Map();
    this.DangoActorPromise = undefined;
    this.ShowDangoIdList = undefined;
    this.MoveDangoPromise = undefined;
    this.MoveInTime = ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetDangoMoveInTime();
    this.MoveOutTime = ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetDangoMoveOutTime();
    this.MoveOutDelayTime = ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetDangoMoveOutDelayTime();
    this.MoveChangeCheckTime = ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetDangoChangeCheckTime();
    this.MoveInCurve = undefined;
    this.MoveOutCurve = undefined;
    this.TempVec = new UE.VectorDouble(0);
    this.ShowVec = new UE.VectorDouble(0);
    this.ShowCase = "DangoMonopolyCase";
    this.IsMovingIn = false;
    this.IsMovingOut = false;
    this.IsMoveChangeCheck = false;
    this.MoveInDelta = 0;
    this.MoveOutDelta = 0;
    this.MoveOutDelayDelta = 0;
    this.MoveChangeCheckDelta = 0;
    this.MoveInPromise = undefined;
    this.MoveOutPromise = undefined;
    this.ShowLog = false;
    this.LastChangeId = 0;
    this.ShowChangeId = 0;
    this.IsMovingChange = false;
    this.rO1 = () => {
      this.ActivityData.UpdateBoardGridUiInfoShow(false);
    };
    this.I5t = () => {
      if (this.ActivityData.IsShowRoundWelcome(false)) {
        this.CloseMe();
      } else {
        this.ActivityData.OpenViewDangoMonopolyTransition(async () => {
          this.CloseMe();
          return this.OpenParam?.ClosePromise?.Promise;
        });
      }
    };
    this.hnl = () => {
      var t = new DangoMonopolyResultRoundItem_1.DangoMonopolyResultRoundItem();
      t.ClickCallBack = this.UVc;
      return t;
    };
    this.UVc = t => {
      this.LastBoardData = this.ShowBoardData;
      this.ShowBoardData = t;
      var i;
      var s;
      var e = this.ShowBoardData.IsFinish();
      var h = e ? this.ShowBoardData.GetAllGridRewardItemList() : [];
      this.RewardScrollView?.RefreshByData(h);
      this.GetItem(10)?.SetUIActive(!e);
      this.GetItem(3)?.SetUIActive(e);
      if (e) {
        h = this.GetText(4);
        e = this.ShowBoardData.FinishTitle;
        LguiUtil_1.LguiUtil.SetLocalTextNew(h, e, t.GetPosition());
        h = this.GetText(5);
        e = this.ShowBoardData.FinishDesc;
        t = this.ShowBoardData.GetDangoBuffShowList().map(t => t.DangoName).map(t => ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t));
        i = this.ShowBoardData.RecordRollDiceTimes.toString();
        s = this.ShowBoardData.GetRecordTriggerBuffTotalTimes().toString();
        LguiUtil_1.LguiUtil.SetLocalTextNew(h, e, ...t, i, s);
      } else {
        this.GetText(11)?.ShowTextNew(this.ft1());
      }
      if (this.LastBoardData === this.ShowBoardData) {
        this.LoadDangoActorList();
      } else {
        this.IsMoveChangeCheck = true;
        this.MoveChangeCheckDelta = 0;
      }
      if (this.IsShow) {
        this.PlaySequence("Switch");
      }
    };
    this.rOe = () => {
      var t = new RewardSmallItemGrid_1.RewardSmallItemGrid();
      t.BindOnCanExecuteChange(() => false);
      t.BindOnExtendToggleClicked(this.wYt);
      return t;
    };
    this.wYt = t => {
      t = t.Data?.ConfigId ?? 0;
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIGridLayout], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIText]];
    this.BtnBindInfo = [[0, this.I5t]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, ["DataParam", this.OpenParam]);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DangoMonopolyEnterNextRound, this.rO1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DangoMonopolyEnterNextRound, this.rO1);
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    this.RoundScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.hnl, true);
    this.RewardScrollView = new GenericLayout_1.GenericLayout(this.GetGridLayout(6), this.rOe, this.GetItem(7).GetOwner());
  }
  OnStart() {
    this.UpdateMoveParam();
    this.ActivityData.UpdateBoardGridUiInfoShow(false);
    this.InitCurve();
    this.UpdateData();
  }
  OnBeforeShow() {
    if (this.OpenParam?.ShowPromise?.IsPending()) {
      this.OpenParam.ShowPromise.SetResult();
    }
  }
  OnAfterShow() {}
  OnBeforeDestroy() {
    this.ActivityData.UpdateBoardGridUiInfoShow(true);
    this.DestroyDangoActor();
    this.OpenParam?.ClosePromise?.SetResult();
  }
  ft1() {
    if (this.ShowBoardData?.IsRunning()) {
      if (this.ShowBoardData?.IsLock()) {
        return DangoMonopolyDefine_1.dangoMonopolyTextKey.DangoMonopolyBoardLock;
      } else {
        return DangoMonopolyDefine_1.dangoMonopolyTextKey.ResultTipsBoardRunning;
      }
    } else {
      return DangoMonopolyDefine_1.dangoMonopolyTextKey.ResultTipsBoardUnOpen;
    }
  }
  UpdateData() {
    var t = this.OpenParam?.BoardId ?? 1;
    var t = this.ActivityData.BoardMap.get(t);
    this.ShowBoardData = t;
    this.RoundScrollView?.RefreshByData(this.ActivityData.BoardList ?? [], undefined, () => {
      this.RoundScrollView?.DeselectCurrentGridProxy();
      var t = this.ShowBoardData?.Index ?? 0;
      this.RoundScrollView?.ScrollToGridIndex(t);
      this.RoundScrollView?.SelectGridProxy(t);
    });
    var t = this.OpenParam?.ShowType === 1;
    this.GetLoopScrollViewComponent(1)?.RootUIComp.SetUIActive(t);
  }
  async LoadDangoActorList() {
    if (this.MoveDangoPromise?.IsPending()) {
      this.IsMovingChange = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("DangoMonopoly", 69, "移动过程中变更,先记录,等结束后触发");
      }
    } else {
      await this.MoveDangoActorList();
      this.MoveDangoPromise?.SetResult();
      this.LogMovingProcessState("MoveProcessEnd");
    }
  }
  async MoveDangoActorList() {
    this.LastChangeId = this.ShowChangeId;
    this.ShowChangeId = this.ShowBoardData?.Id ?? 0;
    this.MoveDangoPromise = new CustomPromise_1.CustomPromise();
    this.UpdateShowDangoIdList();
    await this.GetShowDangoActorList();
    await Promise.all([this.MoveOutLastDangoList(), this.MoveInShowDangoList()]);
    if (this.IsMovingChange) {
      this.IsMovingChange = false;
      this.LogMovingProcessState("移动结束,触发移动过程中的变更");
      await this.MoveDangoActorList();
    }
    return true;
  }
  async GetShowDangoActorList() {
    await this.DangoActorPromise;
    this.LastDangoActorList = this.ShowDangoActorList;
    var t;
    var i = this.ShowChangeId;
    if (this.DangoActorListMap.has(i)) {
      this.ShowDangoActorList = this.DangoActorListMap.get(i);
    } else {
      t = this.ShowDangoIdList.map(t => {
        return {
          UiModelUseWay: 14,
          DangoId: t,
          Odds: 0,
          DangoPointCase: this.ShowCase,
          DangoCamera: StringUtils_1.EMPTY_STRING,
          DangoOffset: 0
        };
      });
      this.DangoActorPromise = UiSceneManager_1.UiSceneManager.LoadDangoActorList(t, t => {
        t.SetActorHiddenInGame(true);
      });
      this.ShowDangoActorList = await this.DangoActorPromise;
      this.DangoActorListMap.set(i, this.ShowDangoActorList);
      this.UpdateDangoAttach();
    }
    return this.ShowDangoActorList;
  }
  UpdateShowDangoIdList() {
    var t = this.ActivityData.GetDangoId();
    var i = this.ShowBoardData?.GetDangoBuffShowList().map(t => t.DangoId).reverse() ?? [];
    i.push(t);
    this.ShowDangoIdList = i;
  }
  UpdateDangoFadeIn(t) {
    for (const i of t ?? this.ShowDangoActorList) {
      UiModelUtil_1.UiModelUtil.DangoFadeOut(i);
    }
  }
  UpdateDangoFadeOut(t) {
    for (const i of t ?? this.LastDangoActorList) {
      UiModelUtil_1.UiModelUtil.DangoFadeIn(i);
    }
  }
  async MoveOutLastDangoList() {
    if (this.LastChangeId && this.LastChangeId !== this.ShowChangeId) {
      this.ReturnStand(this.LastDangoActorList, "MoveOutStart");
      await TimerSystem_1.GameplayTimerSystem.Wait(TimerSystem_1.MIN_TIME);
      this.MoveOutStart();
      await this.MoveOutPromise?.Promise;
    }
  }
  async MoveInShowDangoList() {
    if (this.ShowChangeId !== this.LastChangeId) {
      await TimerSystem_1.GameplayTimerSystem.Wait(TimerSystem_1.MIN_TIME);
      this.MoveInStart();
      await this.MoveInPromise?.Promise;
    }
  }
  UpdateDangoAttach() {
    this.TempVec.Set(0, 0, 0);
    for (let t = 1; t < this.ShowDangoActorList.length; t++) {
      var i;
      var s = this.ShowDangoActorList[t];
      var e = this.ShowDangoActorList[t - 1].Model?.CheckGetComponent(1)?.MainMeshComponent;
      if (e) {
        this.TempVec.Z = DangoManager_1.DangoManager.GetDangoData(this.ShowDangoIdList[t - 1]).ModelHeight;
        i = new UE.FName("Root");
        s.K2_AttachToComponent(e, i, 2, 2, 2, false);
        s.D_K2_AddActorLocalOffset(this.TempVec, true, undefined, false);
        s.SetActorHiddenInGame(false);
      }
    }
    var t = this.ShowDangoActorList[0];
    if (t) {
      this.TempVec.Set(1000, 1000, 1000);
      t.D_K2_AddActorLocalOffset(this.TempVec, true, undefined, false);
      t.SetActorHiddenInGame(false);
    }
  }
  async DestroyDangoActor() {
    await this.DangoActorPromise;
    this.DangoActorListMap.forEach(t => {
      for (const i of t) {
        UiSceneManager_1.UiSceneManager.DestroyDangoActor(i);
      }
    });
    this.ShowDangoActorList = [];
    this.LastDangoActorList = [];
    this.DangoActorListMap.clear();
  }
  UpdateMoveParam() {
    var t = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(this.ShowCase), 1);
    if (t) {
      t = t.D_GetTransform().GetLocation();
      this.ShowVec.Set(t.X, t.Y, t.Z);
    }
  }
  async InitCurve() {
    this.MoveInCurve = await this.LoadCurveFloat("MonopolyDangoInCurve");
    this.MoveOutCurve = await this.LoadCurveFloat("MonopolyDangoOutCurve");
  }
  async LoadCurveFloat(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    return new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat).Promise;
  }
  GetTotalDistance(t) {
    var i;
    if (t) {
      i = t.FloatCurve.Keys.Num();
      return t.FloatCurve.Keys.Get(i - 1)?.Time ?? 0;
    } else {
      return 0;
    }
  }
  GetTotalHeight(t) {
    if (t) {
      return t.FloatCurve.Keys.Get(1)?.Value ?? 0;
    } else {
      return 0;
    }
  }
  TU1(t, i, s, e) {
    t = MathUtils_1.MathUtils.Clamp(Number(t), 0, 1);
    t = i ? 1 - t : t;
    t = this.GetTotalDistance(s) * t;
    s = s.GetFloatValue(t);
    e = e[0];
    this.TempVec.Set(this.ShowVec.X, (i ? t : -t) + this.ShowVec.Y, s + this.ShowVec.Z);
    e?.D_K2_SetActorLocation(this.TempVec, true, undefined, false);
    this.ShowLog;
  }
  SetDangoMoveInProgress(t) {
    this.TU1(t, true, this.MoveInCurve, this.ShowDangoActorList);
  }
  SetDangoMoveOutProgress(t) {
    this.TU1(t, false, this.MoveOutCurve, this.LastDangoActorList);
  }
  OnBeforeShowImplementImplement() {
    UiManager_1.UiManager.AddTickView(this);
  }
  OnAfterHideImplementImplement() {
    UiManager_1.UiManager.RemoveTickView(this);
    this.MoveInEnd();
    this.MoveOutEnd();
  }
  Tick(t) {
    this.UpdateMoveInTick(t);
    this.UpdateMoveOutTick(t);
    this.UpdateMoveChangeCheckTick(t);
  }
  AfterTick() {}
  MoveInStart() {
    return !this.IsMovingIn && (this.IsMovingIn = true, this.MoveInDelta = 0, this.MoveInPromise = new CustomPromise_1.CustomPromise(), this.SetActorListHidden(false, this.ShowDangoActorList), this.PlayJumpAni(this.ShowDangoActorList, this.MoveInCurve), true);
  }
  MoveOutStart() {
    return !this.IsMovingOut && (this.IsMovingOut = true, this.MoveOutDelta = 0, this.MoveOutDelayDelta = 0, this.MoveOutPromise = new CustomPromise_1.CustomPromise(), this.SetDangoMoveOutProgress(0), this.SetActorListHidden(false, this.LastDangoActorList), this.PlayJumpAni(this.LastDangoActorList, this.MoveOutCurve), true);
  }
  MoveInEnd() {
    return !!this.IsMovingIn && (this.ResetMoveInRecord(), true);
  }
  MoveOutEnd() {
    return !!this.IsMovingOut && (this.ReturnStand(this.LastDangoActorList, "MoveOutEnd"), this.SetActorListHidden(true, this.LastDangoActorList), this.ResetMoveOutRecord(), true);
  }
  UpdateMoveInTick(t) {
    return !!this.IsMovingIn && (this.MoveInDelta >= this.MoveInTime ? this.MoveInEnd() : (this.MoveInDelta += t, t = this.MoveInDelta / this.MoveInTime, this.SetDangoMoveInProgress(t)), true);
  }
  UpdateMoveOutTick(t) {
    return !!this.IsMovingOut && (this.UpdateMoveOutDelayTick(t) || (this.MoveOutDelta >= this.MoveOutTime ? this.MoveOutEnd() : (this.MoveOutDelta += t, t = this.MoveOutDelta / this.MoveOutTime, this.SetDangoMoveOutProgress(t))), true);
  }
  UpdateMoveOutDelayTick(t) {
    return !!this.IsMovingOut && !(this.MoveOutDelayDelta >= this.MoveOutDelayTime) && !(this.MoveOutDelayDelta += t, 0);
  }
  ResetMoveInRecord() {
    this.IsMovingIn = false;
    this.MoveInDelta = 0;
    this.MoveInPromise?.SetResult();
  }
  ResetMoveOutRecord() {
    this.IsMovingOut = false;
    this.MoveOutDelta = 0;
    this.MoveOutDelayDelta = 0;
    this.MoveOutPromise?.SetResult();
  }
  SetActorListHidden(i, t) {
    t.forEach(t => {
      t.SetActorHiddenInGame(i);
    });
  }
  UpdateMoveChangeCheckTick(t) {
    return !!this.IsMoveChangeCheck && (this.MoveChangeCheckDelta >= this.MoveChangeCheckTime ? (this.IsMoveChangeCheck = false, this.MoveChangeCheckDelta = 0, this.LoadDangoActorList()) : this.MoveChangeCheckDelta += t, true);
  }
  PlayJumpAni(t, i) {
    var s = this.GetTotalDistance(i);
    var i = this.GetTotalHeight(i);
    this.PlayJumpAniParam(t, s, i);
  }
  PlayJumpAniParam(t, i = 0, s = 0) {
    t.forEach(t => {
      t.SetState(2, i, s);
    });
  }
  ReturnStand(t, i = 0) {
    t.forEach(t => {
      t.GetStateMachine()?.GetDangoBp()?.ReturnStand();
    });
  }
  LogInfo() {
    this.LogMovingProcessState("Sum");
  }
  LogMovingProcessState(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, t, ["IsMovingChange", this.IsMovingChange], ["MoveDangoPromise-IsPending", !!this.MoveDangoPromise?.IsPending()]);
    }
  }
}
exports.DangoMonopolyResultView = DangoMonopolyResultView;
//# sourceMappingURL=DangoMonopolyResultView.js.map