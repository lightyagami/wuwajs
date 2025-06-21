"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaEntranceShopTabView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  PayShopItem_1 = require("../../../PayShop/PayShopTab/TabItem/PayShopItem"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
class PhantomArenaEntranceShopItem extends PayShopItem_1.PayShopItem {
  OnStart() {
    super.OnStart(), this.SetRedDotState(!1), this.SetResellShowState(!0)
  }
}
class PhantomArenaEntranceShopTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments), this.xqe = void 0, this.InitItem = () => {
      return new PhantomArenaEntranceShopItem
    }, this.OnRefreshGoods = () => {
      ModelManager_1.ModelManager.PhantomArenaModel.OnShopViewOpen();
      var e = ModelManager_1.ModelManager.PhantomArenaModel.GetShopList();
      this.xqe?.RefreshByData(e, void 0, void 0, !0)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem]
    ]
  }
  OnStart() {
    this.xqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.InitItem)
  }
  OnBeforeDestroy() {
    this.xqe = void 0
  }
  OnBeforeShow() {
    this.OnRefreshGoods()
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.OnRefreshGoods)
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.OnRefreshGoods)
  }
}
exports.PhantomArenaEntranceShopTabView = PhantomArenaEntranceShopTabView;
//# sourceMappingURL=PhantomArenaEntranceShopTabView.js.map