"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsActivityView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList"),
  ActivityButtonItem_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityButtonItem"),
  ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA"),
  ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase"),
  InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RacingBetsActivityView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments), this.gLt = void 0, this.nnl = void 0, this.snl = void 0, this.anl = void 0, this.Nxc = void 0, this.Vxc = void 0, this.Myc = void 0, this.BNe = () => {
      this.anl.FunctionButton.SetRedDotVisible(this.Nxc.RedPointShowState)
    }, this.ojc = () => {
      this.sjc()
    }, this.DFe = () => {
      this.Nxc.GetIfFirstOpen() && ControllerHolder_1.ControllerHolder.ActivityController.RequestReadActivity(this.Nxc);
      this.Nxc.GetPreGuideQuestFinishState() || UiManager_1.UiManager.OpenView("QuestView", this.Nxc.GetUnFinishPreGuideQuestId());
      var t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
      InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(t.GetSeasonConfig().DungeonInstanceId, [ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId()], t.GetSeasonConfig().DungeonEntranceId, 0), ModelManager_1.ModelManager.RacingBetsModel.SetIsFromActivityOpenDungeon()
    }, this.jxc = () => {
      var t = this.Nxc?.GetGroupRewardData(1),
        i = this.Nxc?.GetGroupRewardData(3);
      UiManager_1.UiManager.OpenView("RacingBetsActivityRewardView", [t, i])
    }, this.Hxc = () => {
      var t = this.Nxc?.GetGroupRewardData(2);
      UiManager_1.UiManager.OpenView("RacingBetsRewardView", [t])
    }
  }
  OnSetData() {
    this.Nxc = this.ActivityBaseData
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate, this.ojc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsRewardRefresh, this.BNe)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate, this.ojc), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsRewardRefresh, this.BNe)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.SpineSkeletonAnimationComponent]
    ]
  }
  async OnBeforeStartAsync() {
    this.gLt = new ActivityTitleTypeA_1.ActivityTitleTypeA, await this.gLt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.nnl = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA, await this.nnl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.snl = new ActivityRewardList_1.ActivityRewardList, await this.snl.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.anl = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData), await this.anl.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.Vxc = new ActivityButtonItem_1.ActivityButtonItem, await this.Vxc.CreateThenShowByActorAsync(this.GetItem(14).GetOwner()), this.Myc = new ActivityButtonItem_1.ActivityButtonItem, await this.Myc.CreateThenShowByActorAsync(this.GetItem(15).GetOwner())
  }
  OnStart() {
    var t, i, e = this.Nxc.LocalConfig;
    e && (this.gLt.SetTitleByText(this.Nxc.GetTitle()), i = e.DescTheme, t = !StringUtils_1.StringUtils.IsEmpty(i), this.gLt.SetSubTitleVisible(t), t && (this.gLt.SetSubTitleByTextId(i), t = e.DescThemeIcon) && this.gLt.SetSubTitleIconByPath(t), this.nnl.SetContentByTextId(e.Desc), i = this.Nxc.GetPreviewReward(), this.snl.SetTitleByTextId("CollectActivity_reward"), this.snl.InitGridLayout(this.snl.InitCommonGridItem), this.snl.RefreshItemLayout(i), this.anl.FunctionButton.SetFunction(this.DFe), this.Vxc.BindRedDot("RedDotRacingBetsActivityInternalReward"), this.Vxc.SetFunction(this.Hxc), this.Myc.BindRedDot("RedDotRacingBetsActivityReward"), this.Myc.SetFunction(this.jxc))
  }
  OnBeforeShow() {
    this.GetSpine(16).SetAnimation(0, "start", !1).AnimationComplete.Add(() => {
      this.GetSpine(16).SetAnimation(0, "idle", !0)
    })
  }
  OnBeforeHide() {
    this.GetSpine(16).ClearTracks()
  }
  OnRefreshView() {
    var t;
    this.Nxc.GetCurLegMatchData() && (t = this.Nxc.IsUnLock(), this.anl.SetPanelConditionVisible(!t), this.FNe(), t || this.anl.SetPerformanceConditionLock(this.Nxc.ConditionGroupId, this.Nxc.Id), this.anl.FunctionButton.SetUiActive(t), this.anl.FunctionButton.SetRedDotVisible(this.Nxc.RedPointShowState))
  }
  FNe() {
    var [, t] = this.GetTimeVisibleAndRemainTime();
    this.gLt.SetTimeTextByText(t)
  }
  ap1(t, i) {
    let e = "",
      n = !1;
    return n = 1 === i ? (e = "Dango_ActivityPage_StatusTime_Bet", !0) : 2 === i ? (e = "Dango_ActivityPage_StatusTime_Wait", !0) : 3 === i ? (e = "Dango_ActivityPage_StatusTime_Race", !0) : (e = 4 === i ? ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(t) ? "Dango_ActivityPage_StatusTime_FinalRaceEnd" : "Dango_ActivityPage_StatusTime_RaceEnd" : (Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 78, "当前比赛处于notOpen|end状态", ["state", i]), ""), !1), [e, n]
  }
  sjc() {
    var t, i, e, n, s, a, r = this.Nxc?.GetCurLegMatchData();
    r && (this.GetText(9).ShowTextNew(r.Name), 0 !== (e = r.GetLegMatchState())) && (n = ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(r.Id), s = r.GetLegRemindTime(), a = this.GetText(11), [i, t] = this.ap1(r.Id, e), 4 !== e && 0 < s || 4 === e && !n ? (s = 4 === e ? Math.max(s, 1) : s, LguiUtil_1.LguiUtil.SetLocalTextNew(a, i, TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(s).CountDownText)) : a.ShowTextNew(i), a.SetChangeColor(3 === e, a.changeColor), s = 4 === e, i = this.GetText(6), n && s ? (a = r.GetChampionDangoId(), e = ConfigManager_1.ConfigManager.DangoConfig?.GetDangoById(a).Name, LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Dango_MainPage_BetStatus_ChampDango", new LguiUtil_1.TableTextArgNew(e)), this.GetSprite(7).SetUIActive(!1), this.GetSprite(8).SetUIActive(!0)) : (s = 0 < (n = r.BetDangoId), t ? s ? (a = ConfigManager_1.ConfigManager.DangoConfig?.GetDangoById(n).Name, LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Dango_MainPage_BetStatus_Bet", new LguiUtil_1.TableTextArgNew(a))) : i.ShowTextNew("Dango_MainPage_BetStatus_NotBet") : i.ShowTextNew("Dango_ActivityPage_BetStatus_RaceEnd"), this.GetSprite(7).SetUIActive(!s && t), this.GetSprite(8).SetUIActive(s || !t)))
  }
  OnTimer(t) {
    this.FNe(), this.sjc()
  }
}
exports.RacingBetsActivityView = RacingBetsActivityView;
//# sourceMappingURL=RacingBetsActivityView.js.map