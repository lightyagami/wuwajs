"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardMainView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const TabViewComponent_1 = require("../../../../../Common/TabComponent/TabViewComponent");
const PayShopController_1 = require("../../../../../PayShop/PayShopController");
const ActivityMoonChasingController_1 = require("../../Activity/ActivityMoonChasingController");
const RewardGrandItem_1 = require("./RewardGrandItem");
const RewardInstanceController_1 = require("./RewardInstanceController");
const RewardMainTabItem_1 = require("./RewardMainTabItem");
class RewardMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.mOn = new RewardInstanceController_1.RewardInstanceController();
    this.Caption = undefined;
    this.GrandItem = undefined;
    this.TabItemList = [];
    this.TabViewComponent = undefined;
    this.nxa = true;
    this.dOn = e => {
      if (e === ModelManager_1.ModelManager.MoonChasingRewardModel.GetSpecialTaskData().TaskId) {
        this.fua();
      } else {
        this.jFi();
      }
    };
    this.Kva = () => {
      this.jFi();
    };
    this.m2e = () => {
      this.CloseMe();
    };
    this.pqe = e => {
      this.mOn.TabItemToggleClick(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.nxa = this.OpenParam ?? true;
    this.mOn.RegisterMainView(this);
    await Promise.all([PayShopController_1.PayShopController.SendRequestPayShopInfo(true), this.mOn.InitMainView()]);
    this.mOn.RefreshTabList();
  }
  OnBeforeShow() {
    ActivityMoonChasingController_1.ActivityMoonChasingController.CheckIsActivityClose();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TakenRewardTargetData, this.dOn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MoonChasingRefreshRewardRedDot, this.Kva);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TakenRewardTargetData, this.dOn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MoonChasingRefreshRewardRedDot, this.Kva);
  }
  async InitCaption() {
    this.Caption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetTokenItemId();
    await this.Caption.SetCurrencyItemList([e]);
    this.Caption.SetCloseCallBack(this.m2e);
  }
  async InitGrandItem() {
    this.GrandItem = new RewardGrandItem_1.RewardGrandItem();
    await this.GrandItem.CreateByActorAsync(this.GetItem(4).GetOwner());
    this.fua();
  }
  fua() {
    this.GrandItem.SetActive(false);
    var e = ModelManager_1.ModelManager.MoonChasingRewardModel.GetSpecialTaskData();
    this.GrandItem.Refresh(e);
    this.GrandItem.SetActive(true);
  }
  jFi() {
    var e = ModelManager_1.ModelManager.MoonChasingRewardModel.GetAllTaskDataRedDotState(false);
    this.TabItemList[0].SetRedDotVisible(e);
    var e = ModelManager_1.ModelManager.MoonChasingRewardModel.GetShopRedDotState();
    this.TabItemList[1].SetRedDotVisible(e);
  }
  async InitTabComponent() {
    var e = new RewardMainTabItem_1.RewardMainTabItem();
    this.TabItemList.push(e);
    e.TabIndex = 0;
    e.SetSelectedCallBack(this.pqe);
    var t = new RewardMainTabItem_1.RewardMainTabItem();
    this.TabItemList.push(t);
    t.TabIndex = 1;
    t.SetSelectedCallBack(this.pqe);
    await Promise.all([e.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), t.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())]);
    this.jFi();
  }
  InitTabViewComponent() {
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  SetTabState(e, t, i) {
    this.TabItemList[e].SetToggleState(t ? 1 : 0, i);
  }
  SwitchTabView(e, t) {
    var i = e.ChildViewName;
    this.TabViewComponent.ToggleCallBack(e, i, this.TabItemList[t], this.nxa);
    var e = this.TabItemList[0].GetRootItem();
    var i = this.TabItemList[1].GetRootItem();
    var n = e.GetHierarchyIndex();
    var a = i.GetHierarchyIndex();
    if ((!(a < n) || t !== 0) && (!(n < a) || t !== 1)) {
      e.SetHierarchyIndex(a);
      i.SetHierarchyIndex(n);
    }
  }
}
exports.RewardMainView = RewardMainView;
//# sourceMappingURL=RewardMainView.js.map