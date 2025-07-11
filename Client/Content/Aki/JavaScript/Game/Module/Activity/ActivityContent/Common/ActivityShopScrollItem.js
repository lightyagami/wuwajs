"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityShopScrollItem = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
class ActivityShopScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i, t, r) {
    super();
    this.i6c = r;
    this.LoopScrollView = undefined;
    this.ZHe = undefined;
    this.HOi = undefined;
    this.r6c = 0;
    this.t3i = (e, i, t) => {
      i = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(i);
      this.LoopScrollView.RefreshByDataAsync(i, false, true);
    };
    this.Z1l = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131);
      e.FunctionMap.set(1, () => {
        UiManager_1.UiManager.CloseViewById(this.r6c);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "PayShop:DockyardBuyTabView 商品VersionCode不同步,打开弹窗");
      }
    };
    this.sGe = () => {
      return new this.i6c();
    };
    this.ZHe = e;
    this.HOi = i;
    this.r6c = t;
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.t3i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShopVersionCodeChange, this.Z1l);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.t3i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShopVersionCodeChange, this.Z1l);
  }
  OnStart() {
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.ZHe, this.HOi.GetOwner(), this.sGe);
    this.AddEventListener();
  }
  async Refresh(e) {
    var i = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e);
    await this.LoopScrollView.RefreshByDataAsync(i, false, true);
    ModelManager_1.ModelManager.PayShopModel.ReadShopItemCheckFlag(e);
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
}
exports.ActivityShopScrollItem = ActivityShopScrollItem;
//# sourceMappingURL=ActivityShopScrollItem.js.map