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
    this.G1u = undefined;
    this.Z0u = undefined;
    this.Xbe = undefined;
    this.F1u = () => {
      var t = {
        ChallengeId: this.ViewModel.GetRepeatChallenge(),
        OpenView: "PhantomArenaChallengeDetailTabView"
      };
      UiManager_1.UiManager.OpenView("PhantomArenaMainView", t, () => {
        this.GetItem(8).SetUIActive(false);
      });
    };
    this.i71 = () => {
      this.Back();
    };
    this.dou = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaEntranceShopMainView", "PhantomArenaEntranceTaskTabView");
    };
    this.Pdu = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaMasterInfoView");
    };
    this.XL1 = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaHelpView", PhantomArenaDefine_1.HELP_ID_ENTRANCE);
    };
    this.rTu = t => {
      var e;
      if (t === 0) {
        e = this.ViewModel.GetTabView();
        this.OpenChildView(e);
      } else if (t === 1) {
        this.K5t();
      }
    };
    this.fqe = (t, e) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.pqe = t => {};
    this.yqe = t => new CommonTabData_1.CommonTabData("", undefined);
    this.kOe = t => {
      var [e, i] = ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime();
      this.G1u?.SetUiActive(e);
      if (e) {
        this.G1u?.SetText(i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UITexture], [11, UE.UITexture], [12, UE.UIText], [13, UE.UIButtonComponent]];
    this.BtnBindInfo = [[13, this.Pdu]];
  }
  OnRegisterDefaultChildView() {
    this.DefaultChildViewName = "PhantomArenaEntranceGymTabView";
  }
  OnRegisterContentItem() {
    this.ContentItem = this.GetItem(7);
  }
  OnRegisterViewData() {
    this.ViewModel = new PhantomArenaEntranceViewModel_1.PhantomArenaEntranceViewModel();
    this.ViewModel.Bind(this.rTu);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var t = [];
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(7));
    t.push(this._yn());
    var e = this.GetItem(2);
    this.G1u = new ActivityButtonItem_1.ActivityButtonItem();
    this.G1u.SetFunction(this.dou);
    t.push(this.G1u.CreateThenShowByActorAsync(e.GetOwner()));
    var e = this.GetItem(3);
    this.Z0u = new ActivityButtonItem_1.ActivityButtonItem();
    this.Z0u.SetFunction(this.Pdu);
    t.push(this.Z0u.CreateThenShowByActorAsync(e.GetOwner()));
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
    this.UiViewSequence.AddSequenceFinishEvent("MatchStart", this.F1u);
  }
  OnBeforeShow() {
    this.nOe();
    this.K8e();
  }
  OnBeforeHide() {
    this.W8e();
  }
  OnBeforeDestroy() {
    this.ViewModel.UnBind(this.rTu);
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
    var e = ModelManager_1.ModelManager.PhantomArenaModel;
    var i = e.GetMasterLevel();
    this.GetText(1).SetText(i.toString());
    var n = e.GetMasterExpNextNeed();
    var n = StringUtils_1.StringUtils.Format("/{0}", n.toString());
    this.GetText(5).SetText(n);
    var n = e.GetMasterExpNow();
    this.GetText(4).SetText(n.toString());
    var a = e.GetMasterLevelConfig(i);
    if (a) {
      t = a.TitleId;
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterTitleById(t);
      this.SetTextureByPath(t.Icon, this.GetTexture(10));
      this.SetTextureByPath(t.IconBg, this.GetTexture(11));
      n = (n - a.ExpNeed) / a.ExpNext;
      [a, n] = (this.GetSprite(6).SetFillAmount(n), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.Name), ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime());
      this.G1u?.SetUiActive(a);
      if (a) {
        this.Xbe = TimerSystem_1.RealTimeTimerSystem.Forever(this.kOe, TimeUtil_1.TimeUtil.InverseMillisecond);
        this.G1u?.SetText(n);
      }
      t = e.GetMasterLevelMax();
      this.Z0u?.SetLocalTextNew(PhantomArenaDefine_1.ENTRANCE_LEVEL_COUNT_ID, i, t);
    }
  }
  K5t() {
    this.GetItem(8).SetUIActive(true);
    this.UiViewSequence.PlaySequence("MatchStart");
  }
  K8e() {
    this.G1u?.BindRedDot("RedDotPhantomArenaLimitReward");
    this.Z0u?.BindRedDot("RedDotPhantomArenaLevelReward");
  }
  W8e() {
    this.G1u?.UnBindRedDot();
    this.Z0u?.UnBindRedDot();
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