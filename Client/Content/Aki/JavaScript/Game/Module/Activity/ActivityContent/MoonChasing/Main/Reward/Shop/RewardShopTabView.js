"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardShopTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../../../../ConfirmBox/ConfirmBoxDefine");
const UiTabSequence_1 = require("../../../../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const LoopScrollView_1 = require("../../../../../../Util/ScrollView/LoopScrollView");
const RewardShopGridItem_1 = require("./RewardShopGridItem");
class RewardShopTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.LoopScrollView = undefined;
    this.t3i = (e, i, r) => {
      this.LoopScrollView.RefreshAllGridProxies();
    };
    this.Z1l = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131);
      e.FunctionMap.set(1, () => {
        UiManager_1.UiManager.CloseView("RewardMainView");
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 10, "PayShop:RewardShopTabView 商品VersionCode不同步,打开弹窗");
      }
    };
    this.sGe = () => {
      return new RewardShopGridItem_1.RewardShopGridItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem]];
  }
  OnStart() {
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.sGe);
  }
  async OnShowAsyncImplementImplement() {
    var e = ModelManager_1.ModelManager.MoonChasingRewardModel.GetShopDataList();
    await this.LoopScrollView.RefreshByDataAsync(e, false, true);
    ModelManager_1.ModelManager.MoonChasingRewardModel.ReadShopItemCheckFlag(e);
  }
  OnBeforeShow() {
    this.GetTabBehavior(UiTabSequence_1.UiTabSequence)?.GetLevelSequencePlayer()?.PlayLevelSequenceByName("Start");
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.t3i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShopVersionCodeChange, this.Z1l);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.t3i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShopVersionCodeChange, this.Z1l);
  }
}
exports.RewardShopTabView = RewardShopTabView;
//# sourceMappingURL=RewardShopTabView.js.map