"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssInsSelectView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  InstOnlineType_1 = require("../../../../../Core/Define/Config/SubType/InstOnlineType"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  CommonCurrencyItem_1 = require("../../../Common/CommonCurrencyItem"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  ConfirmBoxController_1 = require("../../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  EditBattleTeamController_1 = require("../../../EditBattleTeam/EditBattleTeamController"),
  InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
  InstanceDungeonMatchingCountDown_1 = require("../../../InstanceDungeon/InstanceDungeonMatchingCountDown"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  AbyssButtonItem_1 = require("./AbyssButtonItem"),
  DangoAbyssGoalItem_1 = require("./DangoAbyssGoalItem"),
  DangoWorldQuestItem_1 = require("./DangoWorldQuestItem"),
  ENTRANCELOOP = "DangoAbyssLoop2",
  MATCHING_ITEM_OFFSET = -98;
class DangoAbyssInsSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Pth = void 0, this.fqt = void 0, this.C0t = void 0, this.Yja = 0, this.wVl = void 0, this.Ayc = void 0, this.Pyc = void 0, this.xyc = void 0, this.Dyc = void 0, this.Uyc = void 0, this.Byc = void 0, this.s4e = void 0, this.K01 = void 0, this.Oyc = () => {
      var e, t, i;
      ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssUnLockState(this.C0t.AbyssDataList[this.Yja].GetConfig().Id) ? (e = this.C0t.AbyssDataList[this.Yja].GetConfig().Id, e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig().InstId, e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).OnlineType, ModelManager_1.ModelManager.GameModeModel.IsMulti && e !== InstOnlineType_1.InstOnlineType.Single ? this.fwc() : this.mwc()) : (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(300), 0 < (i = this.C0t.AbyssDataList[this.Yja].GetConfig().ConsumeItem).size && (t = Array.from(i.keys())[0], i = i.get(t), e.SetTextArgs(i.toString()), e.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestChallengeUnlock(this.C0t.AbyssDataList[this.Yja].GetConfig().Id)
      }), ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e)))
    }, this.kyc = () => {
      var e, t, i;
      ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssUnLockState(this.C0t.AbyssDataList[this.Yja].GetConfig().Id) ? this.dwc() : (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(300), 0 < (i = this.C0t.AbyssDataList[this.Yja].GetConfig().ConsumeItem).size && (t = Array.from(i.keys())[0], i = i.get(t), e.SetTextArgs(i.toString()), e.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestChallengeUnlock(this.C0t.AbyssDataList[this.Yja].GetConfig().Id)
      }), ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e)))
    }, this.dwc = () => {
      if (ControllerHolder_1.ControllerHolder.OnlineController.ShowTipsWhenOnlineDisabled([2])) {
        var e = this.C0t.AbyssDataList[this.Yja].GetConfig();
        const t = e.InstId;
        var e = e.InstEntranceId;
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId = e, ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = !0, this.Pth.BindOnStopTimer(() => 1 !== ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()), ModelManager_1.ModelManager.FunctionModel.IsOpen(10021) ? ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(t) ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInstanceTip") : !ModelManager_1.ModelManager.GameModeModel.IsMulti || (e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize()) <= 1 ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(t) : e < ModelManager_1.ModelManager.OnlineModel.TeamMaxSize ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(111)).FunctionMap.set(2, () => {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(t, !0)
        }), e.FunctionMap.set(1, () => {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(t)
        }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e)) : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CanNotMatching") : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("IsNotOpenOnline")
      }
    }, this.mwc = () => {
      ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = !1;
      var e = this.C0t.AbyssDataList[this.Yja].GetConfig().Id;
      ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectEntranceId = this.C0t.AbyssDataList[this.Yja].GetConfig().InstEntranceId, ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectChallengeId = e, ControllerHolder_1.ControllerHolder.DangoAbyssController.StartAbyssChallenge(e)
    }, this.fwc = () => {
      var e = this.C0t.AbyssDataList[this.Yja].GetConfig();
      const t = e.InstId;
      var e = e.InstEntranceId;
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId = e, ModelManager_1.ModelManager.GameModeModel.IsMulti ? (ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = !0, ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingId(t), ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 1 ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(t, !1) : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(111)).FunctionMap.set(2, () => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(t, !0)
      }), e.FunctionMap.set(1, () => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(t, !1)
      }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e))) : Log_1.Log.CheckError() && Log_1.Log.Error("InstanceDungeon", 27, "非联机下无法进行组队挑战，请联系程序查BUG")
    }, this.sGe = () => {
      return new DangoScrollItem
    }, this.InitCommonGridItem = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid
    }, this.AMo = () => {
      this.CloseMe()
    }, this.plo = () => {
      this.PlaySequence("PreLeft"), this.Yja--, this.Og(), 0 === ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() && (this.Pth?.PlayAnimation("Close"), this.Pth?.SetUiActive(!1))
    }, this.qyc = () => {
      this.PlaySequence("PreRight"), this.Yja++, this.Og(), 0 === ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() && (this.Pth?.PlayAnimation("Close"), this.Pth?.SetUiActive(!1))
    }, this.$Ye = () => {
      switch (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()) {
        case 2:
          this.Pth?.PlayAnimation("Finish"), UiManager_1.UiManager.OpenView("OnlineInstanceMatchTips");
          break;
        case 0:
          this.Pth?.PlayAnimation("Close");
          break;
        case 1:
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("MatchingOtherCancel"), this.Pth?.PlayAnimation("Start"), this.Fli(!0), this.Vli();
          break;
        case 4:
          this.Fli(!1), ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = !0, UiManager_1.UiManager.IsViewOpen("InstanceDungeonMonsterPreView") && UiManager_1.UiManager.CloseView("InstanceDungeonMonsterPreView"), EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId(), !0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterTeam)
      }
    }, this.Kv1 = () => {
      this.Og()
    }, this.YYe = () => {
      this.Fli(!0), this.Pth?.PlayAnimation("Start"), this.Pth?.BindOnStopTimer(() => 1 !== ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()), this.Vli()
    }, this.n3c = () => {
      var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByTypeAndSubType(10, 1),
        t = new Array;
      for (const r of e) {
        var i = new DangoAbyssGoalItem_1.GoalPanelData,
          n = ModelManager_1.ModelManager.QuestNewModel.GetQuestName(r.Id);
        i.Title = n, t.push(i)
      }
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIItem],
      [12, UE.UIHorizontalLayout],
      [13, UE.UIItem],
      [14, UE.UITexture],
      [15, UE.UIItem],
      [16, UE.UIText],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIItem],
      [23, UE.UIItem],
      [24, UE.UIItem],
      [25, UE.UIItem],
      [26, UE.UIScrollViewWithScrollbarComponent],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIItem],
      [30, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.AMo],
      [2, this.plo],
      [3, this.qyc]
    ]
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMatchingChange, this.$Ye), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMatchingBegin, this.YYe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssUnlockChallengeStateUpdate, this.Kv1)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMatchingChange, this.$Ye), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMatchingBegin, this.YYe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssUnlockChallengeStateUpdate, this.Kv1)
  }
  async OnBeforeStartAsync() {
    this.C0t = this.OpenParam;
    var e = [],
      e = (this.Byc = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.sGe), this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(12), this.InitCommonGridItem), this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock, e.push(this.wVl.CreateByActorAsync(this.GetItem(20).GetOwner())), this.Ayc = new AbyssButtonItem_1.AbyssButtonItem, e.push(this.Ayc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())), this.Ayc.BindClickCallBack(() => {
        var e = this.C0t.AbyssDataList[this.Yja].GetConfig().Id;
        ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssRankView(e)
      }), this.Pyc = new AbyssButtonItem_1.AbyssButtonItem, e.push(this.Pyc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())), this.Pyc.BindClickCallBack(() => {
        ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssLimitRewardView()
      }), this.xyc = new AbyssButtonItem_1.AbyssButtonItem, e.push(this.xyc.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())), this.xyc.BindClickCallBack(() => {
        ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssRewardView()
      }), this.Dyc = new ButtonItem_1.ButtonItem, this.Dyc.SetFunction(this.kyc), e.push(this.Dyc.CreateThenShowByActorAsync(this.GetItem(17).GetOwner())), this.Uyc = new ButtonItem_1.ButtonItem, this.Uyc.SetFunction(this.Oyc), e.push(this.Uyc.CreateThenShowByActorAsync(this.GetItem(18).GetOwner())), this.Pth = new InstanceDungeonMatchingCountDown_1.InstanceDungeonMatchingCountDown, e.push(this.Pth.CreateByResourceIdAsync("UiItem_OnlineApplyUILayer_Prefab", this.GetItem(21))), await Promise.all(e), this.fqt = new CommonCurrencyItem_1.CommonCurrencyItem, ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssKeyItemId());
    await this.fqt.CreateThenShowByActorAsync(this.GetItem(22).GetOwner()), this.fqt.RefreshTemp(e), this.fqt.SetUiActive(!1), this.Pth.GetOriginalItem()?.SetAnchorOffsetY(MATCHING_ITEM_OFFSET), this.Pth.SetUiActive(!1), this.K01 = new DangoWorldQuestItem_1.DangoWorldQuestItem, this.K01.Init(this.GetScrollViewWithScrollbar(26), this.GetItem(27));
    const t = this.C0t.ActivityData.GetCurrentCanSelectChallengeId();
    this.Yja = this.C0t.AbyssDataList.findIndex(e => e.GetConfig().Id === t), this.Yja = -1 === this.Yja ? 0 : this.Yja
  }
  OnAfterShow() {
    this.Pth.BindOnClickBtnCancelMatching(() => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CancelMatchRequest()
    }), this.Pth.BindOnAfterCloseAnimation(e => {
      "Close" === e && this.Fli(!1)
    }), 1 === ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() && (this.Fli(!0), this.Pth?.PlayAnimation("Start"), this.Pth.StartTimer())
  }
  RefreshRedDot() {
    this.Pyc?.BindRedDot("RedDotDangoLimitReward", this.C0t?.ActivityData?.Id), this.xyc?.BindRedDot("RedDotDangoCommonReward", this.C0t?.ActivityData?.Id), this.Ayc?.SetRedDotVisible(!1)
  }
  W8e() {
    this.Pyc?.UnBindRedDot(), this.xyc?.UnBindRedDot()
  }
  OnBeforeShow() {
    this.K01?.Refresh(), ModelManager_1.ModelManager.DangoAbyssModel.SetInAbyssFlow(!1), UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(ENTRANCELOOP, !0, !0, "1001"), ModelManager_1.ModelManager.DangoAbyssModel.SetInAbyssFlow(!1), this.Og(), this.RefreshRedDot()
  }
  OnBeforeHide() {
    this.W8e()
  }
  Og() {
    var e = this.C0t.AbyssDataList[this.Yja].GetConfig().Id;
    this.tGc(e), this.iGc(e), this.rGc(e), this.nGc(e), this.Hyc(e), this.sGc(e), this.yVt(e), this.ewa(e), this.Wyc(e), this.Qyc(e), this.dp1(e), this.Kyc(this.C0t), this.jNc(this.C0t), this.d8c(this.C0t), this.n3c(), this._6c(e), this.it1(e), this.lR1(e)
  }
  _6c(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title)
  }
  it1(e) {
    var t = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("shenyuan"), 1);
    t?.IsValid() && 0 !== (e = e) && (e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e).AbyssColor, e = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(e)), t.GetComponentByClass(UE.NiagaraComponent.StaticClass()).SetNiagaraVariableLinearColor("Color", e))
  }
  dp1(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetRankOpen();
    this.Ayc?.SetActive(t)
  }
  jNc(e) {
    var e = e.ActivityData,
      t = e.CheckInLimitTime();
    this.GetItem(5).SetUIActive(t), t && (t = e.GetRemainTimeText(), this.Pyc?.SetNumText(t))
  }
  d8c(e) {
    e = e.ActivityData.GetRewardFinishProgressText();
    this.xyc?.SetNumText(e)
  }
  Kyc(e) {
    var t = 1 < e.AbyssDataList.length;
    0 === this.Yja ? this.GetButton(2).RootUIComp.SetUIActive(!1) : this.GetButton(2).RootUIComp.SetUIActive(t), this.Yja === e.AbyssDataList.length - 1 ? this.GetButton(3).RootUIComp.SetUIActive(!1) : this.GetButton(3).RootUIComp.SetUIActive(t)
  }
  tGc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Title)
  }
  iGc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.SubTitle)
  }
  rGc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.Desc)
  }
  nGc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    e && (this.Byc.RefreshByData(e.UnlockLittleRole), this.GetItem(28).SetUIActive(0 < e.UnlockLittleRole.length))
  }
  lR1(e) {
    var t = this.xO1(e);
    this.GetItem(29).SetUIActive(t), t && (t = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssMaxProgress(e), this.GetText(30).SetText(StringUtils_1.StringUtils.Format("{0}%", t.toFixed(0))))
  }
  Hyc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetReward();
    this.s4e.RefreshByData(e)
  }
  sGc(e) {
    var t = !ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssUnLockState(e),
      e = (this.GetItem(24).SetUIActive(t), this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig());
    e && t && 0 < (t = e.ConsumeItem).size && (e = Array.from(t.keys())[0], t = t.get(e), e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e), this.SetTextureByPath(e.Icon, this.GetTexture(14)), this.GetText(16).SetText(t.toString()))
  }
  xO1(e) {
    var t = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetCanChallenge(),
      i = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssPreChallengeFinishState(e),
      n = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssConditionFinishState(e),
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssTimeLimitState(e);
    return t && i && n && e
  }
  yVt(t) {
    var i = this.xO1(t),
      t = this.C0t.ActivityData.GetAbyssChallengeDataById(t).GetConfig().InstId,
      t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t).OnlineType;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) this.Dyc.SetActive(!1), this.Uyc.SetActive(!1);
    else {
      let e = !1;
      e = t !== InstOnlineType_1.InstOnlineType.Single && (InstOnlineType_1.InstOnlineType.Multi, !0), this.Dyc.SetActive(e && i), this.Uyc.SetActive(i), t === InstOnlineType_1.InstOnlineType.Mixture && ModelManager_1.ModelManager.GameModeModel.IsMulti ? this.Uyc?.SetLocalTextNew("AbyssMPChallenge") : this.Uyc?.SetLocalTextNew("AbyssSoloChallenge");
      t = e && i;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssTeamBtnVisibleRefresh, t)
    }
  }
  ewa(e) {
    this.Dyc?.SetRedDotVisible(!1), this.Uyc?.SetRedDotVisible(!1)
  }
  Wyc(e) {
    var t = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetCanChallenge(),
      i = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssPreChallengeFinishState(e),
      n = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssConditionFinishState(e),
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssTimeLimitState(e);
    this.wVl?.SetActive(!(t && e && i && n))
  }
  Qyc(e) {
    if (ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssPreChallengeFinishState(e)) {
      if (!ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssConditionFinishState(e)) {
        var t = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
        if (t) {
          var t = t.UnLockDesc;
          if ("" !== t) return void this.wVl?.SetTextByTextId(t)
        }
      }
      ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssTimeLimitState(e) || (t = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssUnlockTimeText(e), e = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("AbyssUnlockTime"), t), this.wVl?.SetTextByText(e))
    } else this.wVl?.SetTextByTextId("AbyssNeedPreChallengeFinish")
  }
  Fli(e) {
    this.GetItem(19).SetUIActive(e), this.GetItem(25).SetUIActive(!e)
  }
  Vli() {
    this.Pth.SetMatchingTime(0), this.Pth.StartTimer()
  }
  OnBeforeDestroy() {
    this.fqt?.Destroy(), this.K01?.Clear()
  }
}
exports.DangoAbyssInsSelectView = DangoAbyssInsSelectView;
class DangoScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem]
    ]
  }
  Refresh(e, t, i) {
    this.Aqe(e), this._R1(e)
  }
  Aqe(e) {
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e).GetConfig().Icon;
    this.SetTextureByPath(e, this.GetTexture(0))
  }
  _R1(e) {
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e);
    e ? this.GetItem(1).SetUIActive(!e.GetIfLock()) : this.GetItem(1).SetUIActive(!1)
  }
}
//# sourceMappingURL=DangoAbyssInsSelectView.js.map