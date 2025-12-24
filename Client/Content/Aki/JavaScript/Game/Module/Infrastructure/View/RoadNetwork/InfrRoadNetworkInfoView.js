"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrRoadNetworkInfoView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const InfrMaterialsDeliveryInfoPanel_1 = require("../MaterialsDelivery/InfrMaterialsDeliveryInfoPanel");
class InfrRoadNetworkInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.LSc = new InfrMaterialsDeliveryInfoPanel_1.InfrMaterialsDeliveryInfoPanel();
    this.$vf = undefined;
    this.q5m = e => {
      this.dTf(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.w5m();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureSelectRoadNetworkMark, this.q5m);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureSelectRoadNetworkMark, this.q5m);
  }
  async w5m() {
    await this.LSc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner(), this.OpenParam.InfoParam);
  }
  OnStart() {
    this.dTf(this.OpenParam);
  }
  dTf(e) {
    this.$vf = e.CloseCb;
    this.LSc.SetClickBtnBuildCb(e.BuildCb);
    this.LSc.SetClickCaptionCloseBtnCb(() => {
      this.Wvf();
    });
    this.LSc.Refresh(e.InfoParam);
  }
  async Wvf() {
    await this.CloseMeAsync();
    this.$vf?.();
  }
}
exports.InfrRoadNetworkInfoView = InfrRoadNetworkInfoView;
//# sourceMappingURL=InfrRoadNetworkInfoView.js.map