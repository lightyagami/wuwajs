"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssInsSelectView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const InstOnlineType_1 = require("../../../../../Core/Define/Config/SubType/InstOnlineType");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const CommonCurrencyItem_1 = require("../../../Common/CommonCurrencyItem");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const ConfirmBoxController_1 = require("../../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const EditBattleTeamController_1 = require("../../../EditBattleTeam/EditBattleTeamController");
const InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController");
const InstanceDungeonMatchingCountDown_1 = require("../../../InstanceDungeon/InstanceDungeonMatchingCountDown");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const AbyssButtonItem_1 = require("./AbyssButtonItem");
const DangoAbyssGoalItem_1 = require("./DangoAbyssGoalItem");
const DangoWorldQuestItem_1 = require("./DangoWorldQuestItem");
const ENTRANCELOOP = "DangoAbyssLoop2";
const MATCHING_ITEM_OFFSET = -98;
class DangoAbyssInsSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pth = undefined;
    this.fqt = undefined;
    this.C0t = undefined;
    this.Yja = 0;
    this.wVl = undefined;
    this.Ayc = undefined;
    this.Pyc = undefined;
    this.xyc = undefined;
    this.Dyc = undefined;
    this.Uyc = undefined;
    this.Byc = undefined;
    this.s4e = undefined;
    this.pp1 = undefined;
    this.Oyc = () => {
      var e;
      var t;
      var i;
      if (ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssUnLockState(this.C0t.AbyssDataList[this.Yja].GetConfig().Id)) {
        e = this.C0t.AbyssDataList[this.Yja].GetConfig().Id;
        e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig().InstId;
        e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).OnlineType;
        if (ModelManager_1.ModelManager.GameModeModel.IsMulti && e !== InstOnlineType_1.InstOnlineType.Single) {
          this.fwc();
        } else {
          this.mwc();
        }
      } else {
        e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(300);
        if ((i = this.C0t.AbyssDataList[this.Yja].GetConfig().ConsumeItem).size > 0) {
          t = Array.from(i.keys())[0];
          i = i.get(t);
          e.SetTextArgs(i.toString());
          e.FunctionMap.set(2, () => {
            ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestChallengeUnlock(this.C0t.AbyssDataList[this.Yja].GetConfig().Id);
          });
          ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
        }
      }
    };
    this.kyc = () => {
      var e;
      var t;
      var i;
      if (ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssUnLockState(this.C0t.AbyssDataList[this.Yja].GetConfig().Id)) {
        this.dwc();
      } else {
        e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(300);
        if ((i = this.C0t.AbyssDataList[this.Yja].GetConfig().ConsumeItem).size > 0) {
          t = Array.from(i.keys())[0];
          i = i.get(t);
          e.SetTextArgs(i.toString());
          e.FunctionMap.set(2, () => {
            ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestChallengeUnlock(this.C0t.AbyssDataList[this.Yja].GetConfig().Id);
          });
          ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
        }
      }
    };
    this.dwc = () => {
      if (ControllerHolder_1.ControllerHolder.OnlineController.ShowTipsWhenOnlineDisabled([2])) {
        var e = this.C0t.AbyssDataList[this.Yja].GetConfig();
        const t = e.InstId;
        var e = e.InstEntranceId;
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId = e;
        ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = true;
        this.Pth.BindOnStopTimer(() => ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() !== 1);
        if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10021)) {
          if (ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(t)) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInstanceTip");
          } else if (!ModelManager_1.ModelManager.GameModeModel.IsMulti || (e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize()) <= 1) {
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(t);
          } else if (e < ModelManager_1.ModelManager.OnlineModel.TeamMaxSize) {
            (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(327)).IsEscViewTriggerCallBack = false;
            e.FunctionMap.set(2, () => {
              InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(t, true);
            });
            e.FunctionMap.set(1, () => {
              InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(t);
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
          } else {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CanNotMatching");
          }
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("IsNotOpenOnline");
        }
      }
    };
    this.mwc = () => {
      ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = false;
      var e = this.C0t.AbyssDataList[this.Yja].GetConfig().Id;
      ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectEntranceId = this.C0t.AbyssDataList[this.Yja].GetConfig().InstEntranceId;
      ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectChallengeId = e;
      ControllerHolder_1.ControllerHolder.DangoAbyssController.StartAbyssChallenge(e);
    };
    this.fwc = () => {
      var e = this.C0t.AbyssDataList[this.Yja].GetConfig();
      const t = e.InstId;
      var e = e.InstEntranceId;
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId = e;
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = true;
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingId(t);
        if (ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 1) {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(t, false);
        } else {
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(326)).IsEscViewTriggerCallBack = false;
          e.FunctionMap.set(2, () => {
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(t, true);
          });
          e.FunctionMap.set(1, () => {
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(t, false);
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 27, "非联机下无法进行组队挑战，请联系程序查BUG");
      }
    };
    this.sGe = () => {
      return new DangoScrollItem();
    };
    this.InitCommonGridItem = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.plo = () => {
      this.PlaySequence("PreLeft");
      this.Yja--;
      this.Og();
      if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() === 0) {
        this.Pth?.PlayAnimation("Close");
        this.Pth?.SetUiActive(false);
      }
    };
    this.qyc = () => {
      this.PlaySequence("PreRight");
      this.Yja++;
      this.Og();
      if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() === 0) {
        this.Pth?.PlayAnimation("Close");
        this.Pth?.SetUiActive(false);
      }
    };
    this.$Ye = () => {
      switch (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()) {
        case 2:
          this.Pth?.PlayAnimation("Finish");
          UiManager_1.UiManager.OpenView("OnlineInstanceMatchTips");
          break;
        case 0:
          this.Pth?.PlayAnimation("Close");
          break;
        case 1:
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("MatchingOtherCancel");
          this.Pth?.PlayAnimation("Start");
          this.Fli(true);
          this.Vli();
          break;
        case 4:
          this.Fli(false);
          ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = true;
          if (UiManager_1.UiManager.IsViewOpen("InstanceDungeonMonsterPreView")) {
            UiManager_1.UiManager.CloseView("InstanceDungeonMonsterPreView");
          }
          EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId(), true);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterTeam);
      }
    };
    this.py1 = () => {
      this.Og();
    };
    this.YYe = () => {
      this.Fli(true);
      this.Pth?.PlayAnimation("Start");
      this.Pth?.BindOnStopTimer(() => ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() !== 1);
      this.Vli();
    };
    this.n3c = () => {
      var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByTypeAndSubType(10, 1);
      var t = new Array();
      for (const r of e) {
        var i = new DangoAbyssGoalItem_1.GoalPanelData();
        var n = ModelManager_1.ModelManager.QuestNewModel.GetQuestName(r.Id);
        i.Title = n;
        t.push(i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText], [10, UE.UIHorizontalLayout], [11, UE.UIItem], [12, UE.UIHorizontalLayout], [13, UE.UIItem], [14, UE.UITexture], [15, UE.UIItem], [16, UE.UIText], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIScrollViewWithScrollbarComponent], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIText]];
    this.BtnBindInfo = [[0, this.AMo], [2, this.plo], [3, this.qyc]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMatchingChange, this.$Ye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMatchingBegin, this.YYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssUnlockChallengeStateUpdate, this.py1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMatchingChange, this.$Ye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMatchingBegin, this.YYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssUnlockChallengeStateUpdate, this.py1);
  }
  async OnBeforeStartAsync() {
    this.C0t = this.OpenParam;
    var e = [];
    this.Byc = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.sGe);
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(12), this.InitCommonGridItem);
    this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    e.push(this.wVl.CreateByActorAsync(this.GetItem(20).GetOwner()));
    this.Ayc = new AbyssButtonItem_1.AbyssButtonItem();
    e.push(this.Ayc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.Ayc.BindClickCallBack(() => {
      var e = this.C0t.AbyssDataList[this.Yja].GetConfig().Id;
      ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssRankView(e);
    });
    this.Pyc = new AbyssButtonItem_1.AbyssButtonItem();
    e.push(this.Pyc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.Pyc.BindClickCallBack(() => {
      ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssLimitRewardView();
    });
    this.xyc = new AbyssButtonItem_1.AbyssButtonItem();
    e.push(this.xyc.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.xyc.BindClickCallBack(() => {
      ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssRewardView();
    });
    this.Dyc = new ButtonItem_1.ButtonItem();
    this.Dyc.SetFunction(this.kyc);
    e.push(this.Dyc.CreateThenShowByActorAsync(this.GetItem(17).GetOwner()));
    this.Uyc = new ButtonItem_1.ButtonItem();
    this.Uyc.SetFunction(this.Oyc);
    e.push(this.Uyc.CreateThenShowByActorAsync(this.GetItem(18).GetOwner()));
    this.Pth = new InstanceDungeonMatchingCountDown_1.InstanceDungeonMatchingCountDown();
    e.push(this.Pth.CreateByResourceIdAsync("UiItem_OnlineApplyUILayer_Prefab", this.GetItem(21)));
    await Promise.all(e);
    this.fqt = new CommonCurrencyItem_1.CommonCurrencyItem();
    var e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssKeyItemId();
    await this.fqt.CreateThenShowByActorAsync(this.GetItem(22).GetOwner());
    this.fqt.RefreshTemp(e);
    this.fqt.SetUiActive(false);
    this.Pth.GetOriginalItem()?.SetAnchorOffsetY(MATCHING_ITEM_OFFSET);
    this.Pth.SetUiActive(false);
    this.pp1 = new DangoWorldQuestItem_1.DangoWorldQuestItem();
    this.pp1.Init(this.GetScrollViewWithScrollbar(26), this.GetItem(27));
    const t = this.C0t.ActivityData.GetCurrentCanSelectChallengeId();
    this.Yja = this.C0t.AbyssDataList.findIndex(e => e.GetConfig().Id === t);
    this.Yja = this.Yja === -1 ? 0 : this.Yja;
  }
  OnAfterShow() {
    this.Pth.BindOnClickBtnCancelMatching(() => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CancelMatchRequest();
    });
    this.Pth.BindOnAfterCloseAnimation(e => {
      if (e === "Close") {
        this.Fli(false);
      }
    });
    if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() === 1) {
      this.Fli(true);
      this.Pth?.PlayAnimation("Start");
      this.Pth.StartTimer();
    }
  }
  RefreshRedDot() {
    this.Pyc?.BindRedDot("RedDotDangoLimitReward", this.C0t?.ActivityData?.Id);
    this.xyc?.BindRedDot("RedDotDangoCommonReward", this.C0t?.ActivityData?.Id);
    this.Ayc?.SetRedDotVisible(false);
  }
  W8e() {
    this.Pyc?.UnBindRedDot();
    this.xyc?.UnBindRedDot();
  }
  OnBeforeShow() {
    this.pp1?.Refresh();
    ModelManager_1.ModelManager.DangoAbyssModel.SetInAbyssFlow(false);
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(ENTRANCELOOP, true, true, "1001");
    ModelManager_1.ModelManager.DangoAbyssModel.SetInAbyssFlow(false);
    this.Og();
    this.RefreshRedDot();
  }
  OnBeforeHide() {
    this.W8e();
  }
  Og() {
    var e = this.C0t.AbyssDataList[this.Yja].GetConfig().Id;
    this.tGc(e);
    this.iGc(e);
    this.rGc(e);
    this.nGc(e);
    this.Hyc(e);
    this.sGc(e);
    this.yVt(e);
    this.ewa(e);
    this.Wyc(e);
    this.Qyc(e);
    this.kp1(e);
    this.Kyc(this.C0t);
    this.jNc(this.C0t);
    this.d8c(this.C0t);
    this.n3c();
    this._6c(e);
    this.St1(e);
    this.BR1(e);
  }
  _6c(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title);
    }
  }
  St1(e) {
    var t = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("shenyuan"), 1);
    if (t?.IsValid() && (e = e) !== 0) {
      e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e).AbyssColor;
      e = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(e));
      t.GetComponentByClass(UE.NiagaraComponent.StaticClass()).SetNiagaraVariableLinearColor("Color", e);
    }
  }
  kp1(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetRankOpen();
    this.Ayc?.SetActive(t);
  }
  jNc(e) {
    var e = e.ActivityData;
    var t = e.CheckInLimitTime();
    this.GetItem(5).SetUIActive(t);
    if (t) {
      t = e.GetRemainTimeText();
      this.Pyc?.SetNumText(t);
    }
  }
  d8c(e) {
    e = e.ActivityData.GetRewardFinishProgressText();
    this.xyc?.SetNumText(e);
  }
  Kyc(e) {
    var t = e.AbyssDataList.length > 1;
    if (this.Yja === 0) {
      this.GetButton(2).RootUIComp.SetUIActive(false);
    } else {
      this.GetButton(2).RootUIComp.SetUIActive(t);
    }
    if (this.Yja === e.AbyssDataList.length - 1) {
      this.GetButton(3).RootUIComp.SetUIActive(false);
    } else {
      this.GetButton(3).RootUIComp.SetUIActive(t);
    }
  }
  tGc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Title);
    }
  }
  iGc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.SubTitle);
    }
  }
  rGc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.Desc);
    }
  }
  nGc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    if (e) {
      this.Byc.RefreshByData(e.UnlockLittleRole);
      this.GetItem(28).SetUIActive(e.UnlockLittleRole.length > 0);
    }
  }
  BR1(e) {
    var t = this.lq1(e);
    this.GetItem(29).SetUIActive(t);
    if (t) {
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssMaxProgress(e);
      this.GetText(30).SetText(StringUtils_1.StringUtils.Format("{0}%", t.toFixed(0)));
    }
  }
  Hyc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetReward();
    this.s4e.RefreshByData(e);
  }
  sGc(e) {
    var t = !ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssUnLockState(e);
    this.GetItem(24).SetUIActive(t);
    var e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    if (e && t && (t = e.ConsumeItem).size > 0) {
      e = Array.from(t.keys())[0];
      t = t.get(e);
      e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
      this.SetTextureByPath(e.Icon, this.GetTexture(14));
      this.GetText(16).SetText(t.toString());
    }
  }
  lq1(e) {
    var t = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetCanChallenge();
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssPreChallengeFinishState(e);
    var n = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssConditionFinishState(e);
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssTimeLimitState(e);
    return t && i && n && e;
  }
  yVt(t) {
    var i = this.lq1(t);
    var t = this.C0t.ActivityData.GetAbyssChallengeDataById(t).GetConfig().InstId;
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t).OnlineType;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) {
      this.Dyc.SetActive(false);
      this.Uyc.SetActive(false);
    } else {
      let e = false;
      e = t !== InstOnlineType_1.InstOnlineType.Single && (InstOnlineType_1.InstOnlineType.Multi, true);
      this.Dyc.SetActive(e && i);
      this.Uyc.SetActive(i);
      if (t === InstOnlineType_1.InstOnlineType.Mixture && ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        this.Uyc?.SetLocalTextNew("AbyssMPChallenge");
      } else {
        this.Uyc?.SetLocalTextNew("AbyssSoloChallenge");
      }
      t = e && i;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssTeamBtnVisibleRefresh, t);
    }
  }
  ewa(e) {
    this.Dyc?.SetRedDotVisible(false);
    this.Uyc?.SetRedDotVisible(false);
  }
  Wyc(e) {
    var t = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetCanChallenge();
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssPreChallengeFinishState(e);
    var n = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssConditionFinishState(e);
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssTimeLimitState(e);
    this.wVl?.SetActive(!t || !e || !i || !n);
  }
  Qyc(e) {
    if (ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssPreChallengeFinishState(e)) {
      if (!ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssConditionFinishState(e)) {
        var t = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
        if (t) {
          var t = t.UnLockDesc;
          if (t !== "") {
            this.wVl?.SetTextByTextId(t);
            return;
          }
        }
      }
      if (!ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssTimeLimitState(e)) {
        t = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssUnlockTimeText(e);
        e = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("AbyssUnlockTime"), t);
        this.wVl?.SetTextByText(e);
      }
    } else {
      this.wVl?.SetTextByTextId("AbyssNeedPreChallengeFinish");
    }
  }
  Fli(e) {
    this.GetItem(19).SetUIActive(e);
    this.GetItem(25).SetUIActive(!e);
  }
  Vli() {
    this.Pth.SetMatchingTime(0);
    this.Pth.StartTimer();
  }
  OnBeforeDestroy() {
    this.fqt?.Destroy();
    this.pp1?.Clear();
  }
}
exports.DangoAbyssInsSelectView = DangoAbyssInsSelectView;
class DangoScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem]];
  }
  Refresh(e, t, i) {
    this.Aqe(e);
    this.kR1(e);
  }
  Aqe(e) {
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e).GetConfig().Icon;
    this.SetTextureByPath(e, this.GetTexture(0));
  }
  kR1(e) {
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e);
    if (e) {
      this.GetItem(1).SetUIActive(!e.GetIfLock());
    } else {
      this.GetItem(1).SetUIActive(false);
    }
  }
}
//# sourceMappingURL=DangoAbyssInsSelectView.js.map