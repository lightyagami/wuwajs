"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaEntranceView = void 0;
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityButtonItem_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityButtonItem"),
  CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData"),
  TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem"),
  TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaRootViewBase_1 = require("../PhantomArenaRootViewBase"),
  PhantomArenaEntranceViewModel_1 = require("./PhantomArenaEntranceViewModel");
class PhantomArenaEntranceView extends PhantomArenaRootViewBase_1.PhantomArenaRootViewBase {
  constructor() {
    super(...arguments), this.TabViewComponent = void 0, this.TabComponent = void 0, this.Wnu = void 0, this.$_u = void 0, this.Xbe = void 0, this.Qnu = () => {
      var t = {
        ChallengeId: this.ViewModel.GetRepeatChallenge(),
        OpenView: "PhantomArenaChallengeDetailTabView"
      };
      UiManager_1.UiManager.OpenView("PhantomArenaMainView", t, () => {
        this.GetItem(8).SetUIActive(!1)
      })
    }, this.Sj1 = () => {
      this.Back()
    }, this.Rtu = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaEntranceShopMainView", "PhantomArenaEntranceTaskTabView")
    }, this.bau = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaMasterInfoView")
    }, this.EL1 = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaHelpView", PhantomArenaDefine_1.HELP_ID_ENTRANCE)
    }, this.Gcu = t => {
      var e;
      0 === t ? (e = this.ViewModel.GetTabView(), this.OpenChildView(e)) : 1 === t && this.K5t()
    }, this.fqe = (t, e) => {
      return new CommonTabItem_1.CommonTabItem
    }, this.pqe = t => {}, this.yqe = t => new CommonTabData_1.CommonTabData("", void 0), this.kOe = t => {
      var [e, i] = ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime();
      this.Wnu?.SetUiActive(e), e && this.Wnu?.SetText(i)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UITexture],
      [11, UE.UITexture],
      [12, UE.UIText],
      [13, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [13, this.bau]
    ]
  }
  OnRegisterDefaultChildView() {
    this.DefaultChildViewName = "PhantomArenaEntranceGymTabView"
  }
  OnRegisterContentItem() {
    this.ContentItem = this.GetItem(7)
  }
  OnRegisterViewData() {
    this.ViewModel = new PhantomArenaEntranceViewModel_1.PhantomArenaEntranceViewModel, this.ViewModel.Bind(this.Gcu)
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var t = [],
      e = (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(7)), t.push(this._yn()), this.GetItem(2)),
      e = (this.Wnu = new ActivityButtonItem_1.ActivityButtonItem, this.Wnu.SetFunction(this.Rtu), t.push(this.Wnu.CreateThenShowByActorAsync(e.GetOwner())), this.GetItem(3));
    this.$_u = new ActivityButtonItem_1.ActivityButtonItem, this.$_u.SetFunction(this.bau), t.push(this.$_u.CreateThenShowByActorAsync(e.GetOwner())), await Promise.all(t)
  }
  async _yn() {
    var t = new CommonTabComponentData_1.CommonTabComponentData(this.fqe, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), t, this.Sj1, !0), await this.TabComponent.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.TabComponent.SetScrollViewVisible(!1), this.TabComponent.NeedCaptionSwitchWithToggle = !1, this.TabComponent.SetHelpButtonShowState(!0), this.TabComponent.SetHelpButtonCallBack(this.EL1), this.TabComponent.SetTitleByTextIdAndArgNew("Activity_100805001_Title"), await this.TabComponent.RefreshTabItemByLengthAsync(0)
  }
  OnStart() {
    this.GetItem(8).SetUIActive(!1), this.UiViewSequence.AddSequenceFinishEvent("MatchStart", this.Qnu)
  }
  OnBeforeShow() {
    this.nOe(), this.K8e()
  }
  OnBeforeHide() {
    this.W8e()
  }
  OnBeforeDestroy() {
    this.ViewModel.UnBind(this.Gcu), this.TabViewComponent?.DestroyTabViewComponent(), this.TabViewComponent = void 0, this.Xbe && (TimerSystem_1.RealTimeTimerSystem.Has(this.Xbe) && TimerSystem_1.RealTimeTimerSystem.Remove(this.Xbe), this.Xbe = void 0)
  }
  nOe() {
    var t, e = ModelManager_1.ModelManager.PhantomArenaModel,
      i = e.GetMasterLevel(),
      n = (this.GetText(1).SetText(i.toString()), e.GetMasterExpNextNeed()),
      n = StringUtils_1.StringUtils.Format("/{0}", n.toString()),
      n = (this.GetText(5).SetText(n), e.GetMasterExpNow()),
      a = (this.GetText(4).SetText(n.toString()), e.GetMasterLevelConfig(i));
    a && (t = a.TitleId, t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterTitleById(t), this.SetTextureByPath(t.Icon, this.GetTexture(10)), this.SetTextureByPath(t.IconBg, this.GetTexture(11)), n = (n - a.ExpNeed) / a.ExpNext, [a, n] = (this.GetSprite(6).SetFillAmount(n), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.Name), ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime()), this.Wnu?.SetUiActive(a), a && (this.Xbe = TimerSystem_1.RealTimeTimerSystem.Forever(this.kOe, TimeUtil_1.TimeUtil.InverseMillisecond), this.Wnu?.SetText(n)), t = e.GetMasterLevelMax(), this.$_u?.SetLocalTextNew(PhantomArenaDefine_1.ENTRANCE_LEVEL_COUNT_ID, i, t))
  }
  K5t() {
    this.GetItem(8).SetUIActive(!0), this.UiViewSequence.PlaySequence("MatchStart")
  }
  K8e() {
    this.Wnu?.BindRedDot("RedDotPhantomArenaLimitReward"), this.$_u?.BindRedDot("RedDotPhantomArenaLevelReward")
  }
  W8e() {
    this.Wnu?.UnBindRedDot(), this.$_u?.UnBindRedDot()
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    return !t || 0 === t.length || "GuideHook" !== t[0] || t.length < 2 ? void 0 : this.GetCurChildView()?.GetGuideUiItemAndUiItemForShowEx(t)
  }
}
exports.PhantomArenaEntranceView = PhantomArenaEntranceView;
//# sourceMappingURL=PhantomArenaEntranceView.js.map