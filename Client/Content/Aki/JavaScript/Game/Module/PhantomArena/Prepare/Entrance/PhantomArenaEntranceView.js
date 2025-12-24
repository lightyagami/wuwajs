"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaEntranceView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityButtonItem_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityButtonItem");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem");
const TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaRootViewBase_1 = require("../PhantomArenaRootViewBase");
const PhantomArenaEntranceViewModel_1 = require("./PhantomArenaEntranceViewModel");
class PhantomArenaEntranceView extends PhantomArenaRootViewBase_1.PhantomArenaRootViewBase {
  constructor() {
    super(...arguments);
    this.TabViewComponent = undefined;
    this.TabComponent = undefined;
    this.Muu = undefined;
    this.Zpu = undefined;
    this.Xbe = undefined;
    this.Euu = () => {
      var t = {
        ChallengeId: this.ViewModel.GetRepeatChallenge(),
        OpenView: ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.ActivityId) ? "PhantomArenaChallengeDetailTabViewNew" : "PhantomArenaChallengeDetailTabView",
        ActivityId: this.ActivityId
      };
      UiManager_1.UiManager.OpenView("PhantomArenaMainView", t, () => {
        this.GetItem(8).SetUIActive(false);
      });
    };
    this.i71 = () => {
      this.Back();
    };
    this.Gou = () => {
      var t = {
        TabViewName: "PhantomArenaEntranceTaskTabView",
        ActivityId: this.ActivityId
      };
      UiManager_1.UiManager.OpenView("PhantomArenaEntranceShopMainView", t);
    };
    this.dmu = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaMasterInfoView", this.ActivityId);
    };
    this.XL1 = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaHelpView", PhantomArenaDefine_1.HELP_ID_ENTRANCE);
    };
    this.fTu = t => {
      var i;
      if (t === 0) {
        i = this.ViewModel.GetTabView();
        this.OpenChildView(i);
      } else if (t === 1) {
        this.K5t();
      }
    };
    this.fqe = (t, i) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.pqe = t => {};
    this.yqe = t => new CommonTabData_1.CommonTabData("", undefined);
    this.kOe = t => {
      var [i, e] = ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime(this.ActivityId);
      this.Muu?.SetUiActive(i);
      if (i) {
        this.Muu?.SetText(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UITexture], [11, UE.UITexture], [12, UE.UIText], [13, UE.UIButtonComponent]];
    this.BtnBindInfo = [[13, this.dmu]];
  }
  OnRegisterDefaultChildView() {
    this.DefaultChildViewName = "PhantomArenaEntranceGymTabView";
  }
  OnRegisterContentItem() {
    this.ContentItem = this.GetItem(7);
  }
  OnRegisterViewData() {
    this.ViewModel = new PhantomArenaEntranceViewModel_1.PhantomArenaEntranceViewModel();
    this.ViewModel.Bind(this.fTu);
  }
  async OnBeforeStartAsync() {
    this.ActivityId = this.OpenParam;
    await super.OnBeforeStartAsync();
    var t = [];
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(7));
    t.push(this._yn());
    var i = this.GetItem(2);
    this.Muu = new ActivityButtonItem_1.ActivityButtonItem();
    this.Muu.SetFunction(this.Gou);
    t.push(this.Muu.CreateThenShowByActorAsync(i.GetOwner()));
    var i = this.GetItem(3);
    this.Zpu = new ActivityButtonItem_1.ActivityButtonItem();
    this.Zpu.SetFunction(this.dmu);
    t.push(this.Zpu.CreateThenShowByActorAsync(i.GetOwner()));
    await Promise.all(t);
  }
  async _yn() {
    var t = new CommonTabComponentData_1.CommonTabComponentData(this.fqe, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), t, this.i71, true);
    await this.TabComponent.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.TabComponent.SetScrollViewVisible(false);
    this.TabComponent.NeedCaptionSwitchWithToggle = false;
    this.TabComponent.SetHelpButtonShowState(true);
    this.TabComponent.SetHelpButtonCallBack(this.XL1);
    this.TabComponent.SetTitleByTextIdAndArgNew("Activity_100805001_Title");
    await this.TabComponent.RefreshTabItemByLengthAsync(0);
  }
  OnStart() {
    this.GetItem(8).SetUIActive(false);
    this.UiViewSequence.AddSequenceFinishEvent("MatchStart", this.Euu);
  }
  OnBeforeShow() {
    this.nOe();
    this.K8e();
  }
  OnBeforeHide() {
    this.W8e();
  }
  OnBeforeDestroy() {
    this.ViewModel.UnBind(this.fTu);
    this.TabViewComponent?.DestroyTabViewComponent();
    this.TabViewComponent = undefined;
    if (this.Xbe) {
      if (TimerSystem_1.RealTimeTimerSystem.Has(this.Xbe)) {
        TimerSystem_1.RealTimeTimerSystem.Remove(this.Xbe);
      }
      this.Xbe = undefined;
    }
  }
  nOe() {
    var t;
    var i = ModelManager_1.ModelManager.PhantomArenaModel;
    var e = i.GetMasterLevel(this.ActivityId);
    this.GetText(1).SetText(e.toString());
    var n = i.GetMasterExpNextNeed(this.ActivityId);
    var n = StringUtils_1.StringUtils.Format("/{0}", n.toString());
    this.GetText(5).SetText(n);
    var n = i.GetMasterExpNow(this.ActivityId);
    this.GetText(4).SetText(n.toString());
    var a = i.GetMasterLevelConfig(e, this.ActivityId);
    if (a) {
      t = a.TitleId;
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterTitleById(t);
      this.SetTextureByPath(t.Icon, this.GetTexture(10));
      this.SetTextureByPath(t.IconBg, this.GetTexture(11));
      n = (n - a.ExpNeed) / a.ExpNext;
      [a, n] = (this.GetSprite(6).SetFillAmount(n), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.Name), ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime(this.ActivityId));
      this.Muu?.SetUiActive(a);
      if (a) {
        this.Xbe = TimerSystem_1.RealTimeTimerSystem.Forever(this.kOe, TimeUtil_1.TimeUtil.InverseMillisecond);
        this.Muu?.SetText(n);
      }
      t = i.GetMasterLevelMax(this.ActivityId);
      this.Zpu?.SetLocalTextNew(PhantomArenaDefine_1.ENTRANCE_LEVEL_COUNT_ID, e, t);
    }
  }
  K5t() {
    this.GetItem(8).SetUIActive(true);
    this.UiViewSequence.PlaySequence("MatchStart");
  }
  K8e() {
    this.Muu?.BindRedDot("RedDotPhantomArenaLimitReward", this.ActivityId);
    this.Zpu?.BindRedDot("RedDotPhantomArenaLevelReward", this.ActivityId);
  }
  W8e() {
    this.Muu?.UnBindRedDot();
    this.Zpu?.UnBindRedDot();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!t || t.length === 0 || t[0] !== "GuideHook" || t.length < 2) {
      return undefined;
    } else {
      return this.GetCurChildView()?.GetGuideUiItemAndUiItemForShowEx(t);
    }
  }
}
exports.PhantomArenaEntranceView = PhantomArenaEntranceView;
//# sourceMappingURL=PhantomArenaEntranceView.js.map