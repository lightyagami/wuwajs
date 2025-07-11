"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkWhiteCatView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const DreamLinkController_1 = require("../DreamLinkController");
const DreamLinkRoleSelectPanel_1 = require("./DreamLinkRoleSelectPanel");
const DreamLinkBossInstanceItem_1 = require("./SubView/DreamLinkBossInstanceItem");
class DreamLinkWhiteCatView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.Otl = undefined;
    this.Scl = undefined;
    this.p4e = undefined;
    this.vVt = undefined;
    this.ANe = undefined;
    this.Rml = undefined;
    this.Uml = false;
    this.Ecl = 0;
    this.$An = i => {
      if (i === "Start") {
        this.GetSpine(3).SetAnimation(0, "start", false);
      } else if (i === "idle") {
        this.GetSpine(3).SetAnimation(0, "idle", true);
      }
    };
    this.Dwa = () => {
      if (this.Rml) {
        this.vVt.RefreshAllGridProxies();
        this.Dml(this.Rml);
      }
    };
    this.BNe = () => {
      this.p4e.SetRedDotVisible(this.ActivityBaseData.CheckHasBossReward());
    };
    this.Icl = () => {
      var i = new DreamLinkBossInstanceItem_1.DreamLinkBossInstanceItem();
      i.ToggleFunction = this.Tcl;
      return i;
    };
    this.Tcl = (i, t) => {
      this.Rml = i;
      this.Dml(i);
      if (this.Ecl !== t) {
        this.vVt.DeselectCurrentGridProxy(true);
        this.Ecl = t;
        this.vVt.SelectGridProxy(this.Ecl);
      }
    };
    this.OnBtnConfirmClick = () => {
      var i = this.Rml.GetBossRoleIdList();
      for (const s of i) {
        if (s === 0) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("DaMaoTips_NotEnough");
          return;
        }
      }
      var t = this.Rml.InstId;
      var e = {
        w6n: this.ActivityBaseData.Id,
        vDs: false,
        FMl: this.Rml.TypeId
      };
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Qah = e;
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(t, i, 0, 0);
    };
    this.OpenBossReward = () => {
      this.ActivityBaseData.SaveFirstCheckRedDotState(7);
      UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", this.ActivityBaseData.GetBossRewardData());
      this.BNe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.SpineSkeletonAnimationComponent], [4, UE.SpineSkeletonAnimationComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UILoopScrollViewComponent], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.ActivityBaseData = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    var i = [];
    this.Otl = new PopupCaptionItem_1.PopupCaptionItem();
    this.Otl.SetCloseCallBack(() => {
      this.CloseMe();
    });
    i.push(this.Otl.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Scl = new DreamLinkRoleSelectPanel_1.DreamLinkRoleSelectPanel();
    i.push(this.Scl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    var t = this.GetItem(2);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(undefined);
    i.push(this.ANe.CreateThenShowByActorAsync(t.GetOwner()));
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(7), this.GetItem(8).GetOwner(), this.Icl);
    this.p4e = new ButtonItem_1.ButtonItem(this.GetItem(9));
    this.p4e.SetFunction(this.OpenBossReward);
    await Promise.all(i);
    this.ANe.FunctionButton.SetFunction(this.OnBtnConfirmClick);
    this.ANe.SetLockConditionButtonVisible(false);
    await this.v4e();
  }
  OnStart() {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0;
    var t = i ? "nvzhu" : "nanzhu";
    this.GetSpine(4).SetAnimation(0, t, true);
    this.GetItem(5).SetUIActive(!i);
    this.GetItem(6).SetUIActive(i);
  }
  OnBeforeShow() {
    this.BNe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.Dwa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DreamLinkRewardRefresh, this.BNe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.Dwa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DreamLinkRewardRefresh, this.BNe);
  }
  OnTick(i) {
    if (this.Uml) {
      this.Aml();
    }
  }
  Dml(i) {
    this.Rml = i;
    this.Uml = i.GetTickState();
    this.Scl.SetActive(i.IsUnlock);
    this.ActivityBaseData.FixBossRoleId(i.InstId);
    this.Scl.RefreshInstId(i.InstId);
    this.ANe.FunctionButton.SetActive(i.IsUnlock);
    this.ANe.SetPanelConditionVisible(!i.IsUnlock);
    this.Aml();
    i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i.InstId);
    if (i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), i.MapName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), i.DungeonDesc);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), i.MonsterTips);
    }
  }
  Aml() {
    if (this.Rml) {
      this.ANe.SetLockTextByText(this.Rml.GetUnlockText());
    }
  }
  async v4e() {
    await this.vVt.RefreshByDataAsync(this.ActivityBaseData.GetAllBossInstData(), undefined, true);
    this.vVt.SelectGridProxy(0, true);
  }
}
exports.DreamLinkWhiteCatView = DreamLinkWhiteCatView;
//# sourceMappingURL=DreamLinkWhiteCatView.js.map