"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaEntranceShopTabView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const PayShopItem_1 = require("../../../PayShop/PayShopTab/TabItem/PayShopItem");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
class PhantomArenaEntranceShopItem extends PayShopItem_1.PayShopItem {
  OnStart() {
    super.OnStart();
    this.SetRedDotState(false);
    this.SetResellShowState(true);
  }
}
class PhantomArenaEntranceShopTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.ActivityId = 0;
    this.xqe = undefined;
    this.InitItem = () => {
      return new PhantomArenaEntranceShopItem();
    };
    this.OnRefreshGoods = () => {
      ModelManager_1.ModelManager.PhantomArenaModel.OnShopViewOpen(this.ActivityId);
      var e = ModelManager_1.ModelManager.PhantomArenaModel.GetShopList(this.ActivityId);
      this.xqe?.RefreshByData(e, undefined, undefined, true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem]];
  }
  OnStart() {
    this.ActivityId = this.ExtraParams;
    this.xqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.InitItem);
  }
  OnBeforeDestroy() {
    this.xqe = undefined;
  }
  OnBeforeShow() {
    this.OnRefreshGoods();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.OnRefreshGoods);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.OnRefreshGoods);
  }
}
exports.PhantomArenaEntranceShopTabView = PhantomArenaEntranceShopTabView;
//# sourceMappingURL=PhantomArenaEntranceShopTabView.js.map