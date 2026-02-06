"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorSkinRecommendView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const MotorSkinRecommendItem_1 = require("./MotorSkinRecommendItem");
class MotorSkinRecommendView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.Zkg = undefined;
    this.A6i = undefined;
    this.t3i = () => {
      this.Og();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.ExtraParams;
    this.A6i = ModelManager_1.ModelManager.PayShopModel.GetRecommendDataById(e);
    var i = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(this.A6i.RecommendId);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Shop", 5, "PayGiftData is null", ["id", e]);
      }
    }
    var i = this.A6i.PrefabPath;
    var e = [];
    this.Zkg = new MotorSkinRecommendItem_1.MotorSkinItemContent();
    e.push(this.Zkg.CreateByResourceIdAsync(i));
    await Promise.all(e);
    this.Zkg.SetUiActive(true);
    this.Zkg.GetOriginalItem().SetUIParent(this.GetItem(0));
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPayItemSuccess, this.t3i);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPayItemSuccess, this.t3i);
  }
  OnBeforeShow() {
    this.Og();
    (this.GetTabBehavior(UiTabSequence_1.UiTabSequence)?.GetLevelSequencePlayer()).PlayLevelSequenceByName("Start");
  }
  Og() {
    this.Zkg.Refresh(this.A6i.Id);
  }
}
exports.MotorSkinRecommendView = MotorSkinRecommendView;
//# sourceMappingURL=MotorSkinRecommendView.js.map