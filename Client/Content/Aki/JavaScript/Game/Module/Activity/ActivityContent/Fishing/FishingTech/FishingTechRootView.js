"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingTechRootView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RedDotController_1 = require("../../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const TabViewComponent_1 = require("../../../../Common/TabComponent/TabViewComponent");
const FishingDefine_1 = require("../FishingDefine");
const FishingTechTabItem_1 = require("./FishingTechTabItem");
class FishingTechRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CaptionItem = undefined;
    this.TabViewComponent = undefined;
    this.TabItemList = [];
    this.TabDataList = [];
    this.CurrentTabIndex = -1;
    this.gU = false;
    this.WYl = e => {
      var t = this.CurrentTabIndex;
      this.CurrentTabIndex = e;
      if (t !== -1) {
        this.TabItemList[t].SetToggleState(0, true);
      }
      var t = this.TabDataList[e];
      var i = t.ChildViewName;
      this.TabViewComponent.ToggleCallBack(t, i, this.TabItemList[e]);
    };
    this.Lke = e => this.CurrentTabIndex !== e;
    this.qdi = (e, t) => {
      if (FishingDefine_1.fishingItemList.includes(e)) {
        this.BNe();
      }
    };
    this.DTt = (e, t, i) => {
      if (FishingDefine_1.fishingItemList.includes(e.s5n)) {
        this.BNe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.DTt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.DTt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  async OnBeforeStartAsync() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    await Promise.all([this.qvt()]);
    this.CaptionItem.SetCloseCallBack(() => {
      this.CloseMe();
    });
    await this.CaptionItem.SetCurrencyItemList([FishingDefine_1.FISHING_CURRENCY_ITEMID]);
  }
  OnStart() {
    var e;
    var t;
    var i;
    RedDotController_1.RedDotController.BindRedDot("FishingNormalTech", this.GetItem(4));
    RedDotController_1.RedDotController.BindRedDot("FishingRoleTech", this.GetItem(5));
    if (this.OpenParam) {
      if (!((t = (e = this.OpenParam).Type - 1) < 0) && !(t >= this.TabItemList.length)) {
        this.TabItemList[t]?.SetToggleState(1, true);
        this.CurrentTabIndex = t;
        i = (t = this.TabDataList[this.CurrentTabIndex]).ChildViewName;
        this.TabViewComponent.ToggleCallBack(t, i, this.TabItemList[this.CurrentTabIndex], e.NodeId);
      }
    } else {
      this.TabItemList[0].SetToggleState(1, true);
    }
  }
  OnBeforeShow() {
    if (this.gU) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingTechViewComeBack);
      this.BNe();
    }
    this.gU = true;
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("FishingNormalTech", this.GetItem(4));
    RedDotController_1.RedDotController.UnBindGivenUi("FishingRoleTech", this.GetItem(5));
  }
  async qvt() {
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
    this.TabDataList = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("FishingTechRootView");
    await Promise.all([this.C5e(this.GetItem(2)), this.C5e(this.GetItem(3))]);
  }
  async C5e(e) {
    var t = new FishingTechTabItem_1.FishingTechTabItem();
    t.GridIndex = this.TabItemList.length;
    t.SetSelectedCallBack(this.WYl);
    t.SetCanExecuteChange(this.Lke);
    this.TabItemList.push(t);
    await t.CreateThenShowByActorAsync(e.GetOwner());
  }
  BNe() {
    for (const e of ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechList()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh, e.Id);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingRoleTechRefresh, 4);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingRoleTechRefresh, 5);
  }
}
exports.FishingTechRootView = FishingTechRootView;
//# sourceMappingURL=FishingTechRootView.js.map