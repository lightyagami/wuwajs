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
    this.rEf = undefined;
    this.i6m = e => {
      this.ePf(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.QVm();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureSelectRoadNetworkMark, this.i6m);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureSelectRoadNetworkMark, this.i6m);
  }
  async QVm() {
    await this.LSc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner(), this.OpenParam.InfoParam);
  }
  OnStart() {
    this.ePf(this.OpenParam);
  }
  ePf(e) {
    this.rEf = e.CloseCb;
    this.LSc.SetClickBtnBuildCb(e.BuildCb);
    this.LSc.SetClickCaptionCloseBtnCb(() => {
      this.oEf();
    });
    this.LSc.Refresh(e.InfoParam);
  }
  async oEf() {
    await this.CloseMeAsync();
    this.rEf?.();
  }
}
exports.InfrRoadNetworkInfoView = InfrRoadNetworkInfoView;
//# sourceMappingURL=InfrRoadNetworkInfoView.js.map