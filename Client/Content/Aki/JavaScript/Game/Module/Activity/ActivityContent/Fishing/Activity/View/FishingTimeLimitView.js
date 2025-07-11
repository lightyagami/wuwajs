"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingTimeLimitView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const TabViewComponent_1 = require("../../../../../Common/TabComponent/TabViewComponent");
const ActivityFishingController_1 = require("../ActivityFishingController");
const FishingRewardMainTabItem_1 = require("./Components/FishingRewardMainTabItem");
class FishingTimeLimitView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.CaptionItem = undefined;
    this.TabItemList = [];
    this.TabViewComponent = undefined;
    this.ActivityDataBase = undefined;
    this.yvt = [];
    this.Ntl = true;
    this.Ftl = "";
    this.Cua = 0;
    this.jFi = () => {
      var i = this.ActivityDataBase.GetTimeLimitRewardRedDotState();
      var e = this.ActivityDataBase.GetLimitTimeShopRedDotState();
      this.TabItemList[0].SetRedDotVisible(i);
      this.TabItemList[1].SetRedDotVisible(e);
    };
    this.pqe = i => {
      if (i !== this.Cua) {
        this.Cx_(this.Cua, false, true);
      }
      this.Cua = i;
      var e = this.yvt[i];
      this.P6e(e, i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var i;
    this.ActivityDataBase = ActivityFishingController_1.ActivityFishingController.GetCurrentActivityData();
    if (this.ActivityDataBase) {
      (i = []).push(this.zDn());
      i.push(this.qvt());
      i.push(ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopInfo(true));
      this.Gvt();
      this.gx_();
      await Promise.all(i);
    }
  }
  async zDn() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    await this.CaptionItem.SetCurrencyItemList([this.ActivityDataBase.MilestoneRewardItemId]);
    this.CaptionItem.SetCloseCallBack(() => {
      this.CloseMe();
    });
  }
  async qvt() {
    var i = new FishingRewardMainTabItem_1.FishingRewardMainTabItem();
    this.TabItemList.push(i);
    i.TabIndex = 0;
    i.SetSelectedCallBack(this.pqe);
    var e = new FishingRewardMainTabItem_1.FishingRewardMainTabItem();
    this.TabItemList.push(e);
    e.TabIndex = 1;
    e.SetSelectedCallBack(this.pqe);
    await Promise.all([i.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), e.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())]);
    this.jFi();
  }
  Gvt() {
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  OnStart() {
    this.Ftl = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    this.u3e();
  }
  OnBeforeShow() {
    this.jFi();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingTimeLimitRewardListRefresh, this.jFi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingTimeLimitRewardProgressRefresh, this.jFi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingTimeLimitShopRefresh, this.jFi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingTimeLimitRewardListRefresh, this.jFi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingTimeLimitRewardProgressRefresh, this.jFi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingTimeLimitShopRefresh, this.jFi);
  }
  gx_() {
    this.yvt = this.ActivityDataBase.GetRewardTabList();
    this.Cx_(0, true, true);
  }
  Cx_(i, e, t) {
    this.TabItemList[i].SetToggleState(e ? 1 : 0, t);
  }
  P6e(i, e) {
    var t = i.ChildViewName;
    this.TabViewComponent.ToggleCallBack(i, t, this.TabItemList[e], this.ActivityDataBase);
    var t = i.Icon;
    if (t) {
      this.CaptionItem.SetTitleIcon(t);
    }
    var e = i.TabName;
    if (e) {
      this.CaptionItem.SetTitleByTextIdAndArgNew(e);
    }
  }
  OnTick(i) {
    if (this.Ntl) {
      this.u3e();
    }
  }
  u3e() {
    var i = this.ActivityDataBase.GetLimitTimeEndTime();
    if (i - TimeUtil_1.TimeUtil.GetServerTime() < 0) {
      this.Ntl = false;
      ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
    } else {
      i = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(i, this.Ftl);
      this.GetText(4).SetText(i);
    }
  }
}
exports.FishingTimeLimitView = FishingTimeLimitView;
//# sourceMappingURL=FishingTimeLimitView.js.map