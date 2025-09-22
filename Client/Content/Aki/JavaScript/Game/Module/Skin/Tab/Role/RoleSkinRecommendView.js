"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinRecommendView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const RoleSkinRecommendItem_1 = require("./RoleSkinRecommendItem");
class RoleSkinRecommendView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.CFl = undefined;
    this.A6i = undefined;
    this.t3i = (e, i, t) => {
      if (this.A6i.RecommendId === e) {
        this.Og();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.ExtraParams;
    this.A6i = ModelManager_1.ModelManager.PayShopModel.GetRecommendDataById(e);
    var i = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(this.A6i.RecommendId);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Shop", 27, "PayShopData is null", ["id", e]);
      }
    }
    var i = this.A6i.PrefabPath;
    var e = [];
    this.CFl = new RoleSkinRecommendItem_1.RoleSkinItemContent();
    e.push(this.CFl.CreateByResourceIdAsync(i));
    await Promise.all(e);
    this.CFl.SetUiActive(true);
    this.CFl.GetOriginalItem().SetUIParent(this.GetItem(0));
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.t3i);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.t3i);
  }
  OnBeforeShow() {
    this.Og();
    (this.GetTabBehavior(UiTabSequence_1.UiTabSequence)?.GetLevelSequencePlayer()).PlayLevelSequenceByName("Start");
  }
  Og() {
    this.CFl.Refresh(this.A6i.Id);
  }
}
exports.RoleSkinRecommendView = RoleSkinRecommendView;
//# sourceMappingURL=RoleSkinRecommendView.js.map