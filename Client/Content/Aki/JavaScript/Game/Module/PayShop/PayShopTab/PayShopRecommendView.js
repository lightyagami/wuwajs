"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopRecommendView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const PayShopDefine_1 = require("../PayShopDefine");
const PayShopSwitchItem_1 = require("./TabItem/PayShopSwitchItem");
class RecommendData {
  constructor() {
    this.TabViewName = undefined;
    this.Param = undefined;
    this.TabName = "";
    this.Id = 0;
    this.Sort = 0;
  }
}
class PayShopRecommendView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.TabGroup = undefined;
    this.TabViewComponent = undefined;
    this.CurrentSelectTabId = 0;
    this.pk = 0;
    this.$Sl = [];
    this.fqe = (e, i) => {
      return new PayShopSwitchItem_1.PayShopSwitchItem();
    };
    this.pqe = e => {
      var i = this.$Sl[e];
      var t = i.TabViewName;
      var o = this.TabGroup.GetTabItemByIndex(e);
      var s = i.Id;
      this.TabViewComponent.ToggleCallBack(e, t, o, s, e);
      var t = new LogReportDefine_1.OnClickPayShopTabLogEvent();
      t.i_shop_id = 1;
      t.i_tab_id = i.Id;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [3, UE.UIItem], [2, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem]];
  }
  OnStart() {
    this.TabGroup = new TabComponent_1.TabComponent(this.GetHorizontalLayout(2).GetRootComponent(), this.fqe, this.pqe, this.GetItem(3));
    this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(false);
    this.GetItem(0).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(7), 1);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:TabView 界面Start", ["ViewName", this.GetViewName()]);
    }
  }
  OnTickUiTabViewBase(e) {
    var i = TimeUtil_1.TimeUtil.GetServerTime();
    if (i - this.pk >= 1) {
      this.pk = i;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DiscountShopTimerRefresh);
    }
  }
  OnShowUiTabViewFromToggle() {
    this.GetText(5).SetUIActive(false);
    this.f4e();
  }
  f4e() {
    this.XSl();
    let e = 0;
    if (this.ExtraParams && (e = this.ExtraParams) >= this.$Sl.length) {
      e = 0;
    }
    this.TabGroup.ResetLastSelectTab();
    this.CHe().finally(() => {
      this.TabGroup.SelectToggleByIndex(e, true);
      this.TabViewComponent.SetCurrentTabViewState(true);
    });
  }
  XSl() {
    this.$Sl = [];
    for (const i of ModelManager_1.ModelManager.PayShopModel.GetNeedShowRecommendData()) {
      var e = new RecommendData();
      if (i.RecommendType === 1) {
        e.TabViewName = PayShopDefine_1.recommendTabView[2];
      } else if (i.RecommendType === 2) {
        e.TabViewName = PayShopDefine_1.recommendTabView[3];
      } else if (i.RecommendType === 3) {
        if (!ModelManager_1.ModelManager.WeekCardModel.GetWeekCardIsOpen()) {
          continue;
        }
        e.TabViewName = PayShopDefine_1.recommendTabView[4];
      } else if (i.RecommendType === 4) {
        e.TabViewName = PayShopDefine_1.recommendTabView[5];
      }
      e.TabName = i.TabName;
      e.Param = i.RecommendId;
      e.Id = i.Id;
      e.Sort = i.Sort;
      this.$Sl.push(e);
    }
    this.$Sl.sort((e, i) => e.Sort - i.Sort);
  }
  OnAfterShow() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:TabView 界面AfterShow", ["ViewName", this.GetViewName()]);
    }
  }
  async CHe() {
    var e;
    var i;
    var t = this.$Sl.length;
    await this.TabGroup.RefreshTabItemByLengthAsync(t);
    var t = this.TabGroup.GetTabItemMap();
    for ([e, i] of t) {
      i.BindRedDot("PayShopTab", this.$Sl[e].Id);
      i.UpdateTitle(this.$Sl[e].TabName);
      i.GetRootItem().SetUIActive(false);
      i.GetRootItem().SetUIActive(true);
    }
  }
  OnBeforeDestroy() {
    this.TabGroup.Destroy();
    if (this.TabViewComponent) {
      this.TabViewComponent.DestroyTabViewComponent();
      this.TabViewComponent = undefined;
    }
  }
  RefreshView() {
    this.f4e();
  }
}
exports.PayShopRecommendView = PayShopRecommendView;
//# sourceMappingURL=PayShopRecommendView.js.map