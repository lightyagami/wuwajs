"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerShopTabView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const PayShopItem_1 = require("./TabItem/PayShopItem");
const PayShopSwitchItem_1 = require("./TabItem/PayShopSwitchItem");
const TIMEGAP = 1000;
class BabelTowerShopTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.TabGroup = undefined;
    this.PayShopGoodsList = [];
    this.CurrentSelectTabId = 0;
    this.LoopScrollView = undefined;
    this._3i = 0;
    this.TDe = undefined;
    this.t3i = (e, t, i) => {
      if (this._3i === t && this.CurrentSelectTabId === i) {
        this.LoopScrollView.RefreshAllGridProxies();
      }
    };
    this.i3i = e => {
      this.RefreshLoopScroll(this.CurrentSelectTabId);
    };
    this.InitItem = () => {
      return new PayShopItem_1.PayShopItem();
    };
    this.fqe = (e, t) => {
      return new PayShopSwitchItem_1.PayShopSwitchItem();
    };
    this.pqe = e => {
      var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(this._3i);
      this.CurrentSelectTabId = t[e];
      this.RefreshLoopScroll(this.CurrentSelectTabId);
    };
    this.GetProxyData = e => this.PayShopGoodsList[e];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [3, UE.UIItem], [2, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [8, UE.UIItem], [9, UE.UIText]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GoodsSoldOut, this.i3i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.t3i);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GoodsSoldOut, this.i3i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.t3i);
  }
  OnStart() {
    this.TabGroup = new TabComponent_1.TabComponent(this.GetHorizontalLayout(2).GetRootComponent(), this.fqe, this.pqe, this.GetItem(3));
    var e = this.GetScrollItem();
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), e.GetOwner(), this.InitItem);
    this.GetItem(0).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.TabGroup.SelectToggleByIndex(0);
  }
  GetScrollItem() {
    return this.GetItem(0);
  }
  RefreshLoopScroll(e) {
    this.PayShopGoodsList = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(this._3i, e);
    this.LoopScrollView.ReloadProxyData(this.GetProxyData, this.PayShopGoodsList.length, false);
    this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(this.PayShopGoodsList.length > 0);
    this.GetItem(8).SetUIActive(this.PayShopGoodsList.length <= 0);
  }
  OnAfterShow() {
    this._3i = this.Params;
    let e = 0;
    if (this.ExtraParams) {
      const i = this.ExtraParams;
      var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(this._3i);
      e = t.findIndex(e => e === i);
      e = MathUtils_1.MathUtils.Clamp(e, 0, t.length - 1);
    }
    this.GetText(5).SetUIActive(false);
    this.CHe(e);
    this.kot();
    this.OnDiscountShopAfterShow();
  }
  OnDiscountShopAfterShow() {}
  kot() {
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.o3i();
    }, TIMEGAP);
  }
  xHe() {
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  o3i() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DiscountShopTimerRefresh);
  }
  CHe(i) {
    const s = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(this._3i);
    var e = s.length;
    this.TabGroup.ResetLastSelectTab();
    this.TabGroup.RefreshTabItemByLength(e, () => {
      var e;
      var t;
      for ([e, t] of this.TabGroup.GetTabItemMap()) {
        t.UpdateView(this._3i, s[e]);
        t.BindRedDot("PayShopTab", s[e]);
      }
      this.TabGroup.SelectToggleByIndex(i, true);
    });
  }
  RefreshView(e) {
    if (typeof e != "number") {
      this.RefreshLoopScroll(this.CurrentSelectTabId);
    }
  }
  OnBeforeHide() {
    this.xHe();
  }
  OnBeforeDestroy() {
    this.TabGroup.Destroy();
    this.LoopScrollView.ClearGridProxies();
  }
}
exports.BabelTowerShopTabView = BabelTowerShopTabView;
//# sourceMappingURL=BabelTowerShopView.js.map