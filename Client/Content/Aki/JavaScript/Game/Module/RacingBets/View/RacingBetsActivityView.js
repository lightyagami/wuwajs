"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsActivityView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList");
const ActivityButtonItem_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityButtonItem");
const ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA");
const ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase");
const InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RacingBetsActivityView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.gLt = undefined;
    this.nnl = undefined;
    this.snl = undefined;
    this.anl = undefined;
    this.Nxc = undefined;
    this.Vxc = undefined;
    this.Myc = undefined;
    this.BNe = () => {
      this.anl.FunctionButton.SetRedDotVisible(this.Nxc.RedPointShowState);
    };
    this.ae1 = () => {
      this.le1();
    };
    this.DFe = () => {
      if (this.Nxc.GetIfFirstOpen()) {
        ControllerHolder_1.ControllerHolder.ActivityController.RequestReadActivity(this.Nxc);
      }
      if (!this.Nxc.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("QuestView", this.Nxc.GetUnFinishPreGuideQuestId());
      }
      var t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
      InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(t.GetSeasonConfig().DungeonInstanceId, [ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId()], t.GetSeasonConfig().DungeonEntranceId, 0);
      ModelManager_1.ModelManager.RacingBetsModel.SetIsFromActivityOpenDungeon();
    };
    this.jxc = () => {
      var t = this.Nxc?.GetGroupRewardData(1);
      var i = this.Nxc?.GetGroupRewardData(3);
      UiManager_1.UiManager.OpenView("RacingBetsActivityRewardView", [t, i]);
    };
    this.Hxc = () => {
      var t = this.Nxc?.GetGroupRewardData(2);
      UiManager_1.UiManager.OpenView("RacingBetsRewardView", [t]);
    };
  }
  OnSetData() {
    this.Nxc = this.ActivityBaseData;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate, this.ae1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsRewardRefresh, this.BNe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate, this.ae1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsRewardRefresh, this.BNe);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIItem], [16, UE.SpineSkeletonAnimationComponent]];
  }
  async OnBeforeStartAsync() {
    this.gLt = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.gLt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.nnl = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    await this.nnl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.snl = new ActivityRewardList_1.ActivityRewardList();
    await this.snl.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.anl = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await this.anl.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.Vxc = new ActivityButtonItem_1.ActivityButtonItem();
    await this.Vxc.CreateThenShowByActorAsync(this.GetItem(14).GetOwner());
    this.Myc = new ActivityButtonItem_1.ActivityButtonItem();
    await this.Myc.CreateThenShowByActorAsync(this.GetItem(15).GetOwner());
  }
  OnStart() {
    var t;
    var i;
    var e = this.Nxc.LocalConfig;
    if (e) {
      this.gLt.SetTitleByText(this.Nxc.GetTitle());
      i = e.DescTheme;
      t = !StringUtils_1.StringUtils.IsEmpty(i);
      this.gLt.SetSubTitleVisible(t);
      if (t && (this.gLt.SetSubTitleByTextId(i), t = e.DescThemeIcon)) {
        this.gLt.SetSubTitleIconByPath(t);
      }
      this.nnl.SetContentByTextId(e.Desc);
      i = this.Nxc.GetPreviewReward();
      this.snl.SetTitleByTextId("CollectActivity_reward");
      this.snl.InitGridLayout(this.snl.InitCommonGridItem);
      this.snl.RefreshItemLayout(i);
      this.anl.FunctionButton.SetFunction(this.DFe);
      this.Vxc.BindRedDot("RedDotRacingBetsActivityInternalReward");
      this.Vxc.SetFunction(this.Hxc);
      this.Myc.BindRedDot("RedDotRacingBetsActivityReward");
      this.Myc.SetFunction(this.jxc);
    }
  }
  OnBeforeShow() {
    this.GetSpine(16).SetAnimation(0, "start", false).AnimationComplete.Add(() => {
      this.GetSpine(16).SetAnimation(0, "idle", true);
    });
  }
  OnBeforeHide() {
    this.GetSpine(16).ClearTracks();
  }
  OnRefreshView() {
    var t;
    if (this.Nxc.GetCurLegMatchData()) {
      t = this.Nxc.IsUnLock();
      this.anl.SetPanelConditionVisible(!t);
      this.FNe();
      if (!t) {
        this.anl.SetPerformanceConditionLock(this.Nxc.ConditionGroupId, this.Nxc.Id);
      }
      this.anl.FunctionButton.SetUiActive(t);
      this.anl.FunctionButton.SetRedDotVisible(this.Nxc.RedPointShowState);
    }
  }
  FNe() {
    var [, t] = this.GetTimeVisibleAndRemainTime();
    this.gLt.SetTimeTextByText(t);
  }
  Ap1(t, i) {
    let e = "";
    let n = false;
    n = i === 1 ? (e = "Dango_ActivityPage_StatusTime_Bet", true) : i === 2 ? (e = "Dango_ActivityPage_StatusTime_Wait", true) : i === 3 ? (e = "Dango_ActivityPage_StatusTime_Race", true) : (e = i === 4 ? ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(t) ? "Dango_ActivityPage_StatusTime_FinalRaceEnd" : "Dango_ActivityPage_StatusTime_RaceEnd" : (Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 78, "当前比赛处于notOpen|end状态", ["state", i]), ""), false);
    return [e, n];
  }
  le1() {
    var t;
    var i;
    var e;
    var n;
    var s;
    var a;
    var r = this.Nxc?.GetCurLegMatchData();
    if (r && (this.GetText(9).ShowTextNew(r.Name), (e = r.GetLegMatchState()) !== 0)) {
      n = ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(r.Id);
      s = r.GetLegRemindTime();
      a = this.GetText(11);
      [i, t] = this.Ap1(r.Id, e);
      if (e !== 4 && s > 0 || e === 4 && !n) {
        s = e === 4 ? Math.max(s, 1) : s;
        LguiUtil_1.LguiUtil.SetLocalTextNew(a, i, TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(s).CountDownText);
      } else {
        a.ShowTextNew(i);
      }
      a.SetChangeColor(e === 3, a.changeColor);
      s = e === 4;
      i = this.GetText(6);
      if (n && s) {
        a = r.GetChampionDangoId();
        e = ConfigManager_1.ConfigManager.DangoConfig?.GetDangoById(a).Name;
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Dango_MainPage_BetStatus_ChampDango", new LguiUtil_1.TableTextArgNew(e));
        this.GetSprite(7).SetUIActive(false);
        this.GetSprite(8).SetUIActive(true);
      } else {
        s = (n = r.BetDangoId) > 0;
        if (t) {
          if (s) {
            a = ConfigManager_1.ConfigManager.DangoConfig?.GetDangoById(n).Name;
            LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Dango_MainPage_BetStatus_Bet", new LguiUtil_1.TableTextArgNew(a));
          } else {
            i.ShowTextNew("Dango_MainPage_BetStatus_NotBet");
          }
        } else {
          i.ShowTextNew("Dango_ActivityPage_BetStatus_RaceEnd");
        }
        this.GetSprite(7).SetUIActive(!s && t);
        this.GetSprite(8).SetUIActive(s || !t);
      }
    }
  }
  OnTimer(t) {
    this.FNe();
    this.le1();
  }
}
exports.RacingBetsActivityView = RacingBetsActivityView;
//# sourceMappingURL=RacingBetsActivityView.js.map