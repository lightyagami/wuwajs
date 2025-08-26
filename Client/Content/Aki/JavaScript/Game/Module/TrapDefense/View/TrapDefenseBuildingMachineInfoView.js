"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingMachineInfoView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const TrapDefenseBuildingDevelopDetailItem_1 = require("./Item/TrapDefenseBuildingDevelopDetailItem");
class TrapDefenseBuildingMachineInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.InfoItem = undefined;
    this.sO1 = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.sO1]];
  }
  async OnBeforeStartAsync() {
    this.InfoItem = new TrapDefenseBuildingDevelopDetailItem_1.TrapDefenseBuildingDevelopDetailInfoItem(false);
    await this.InfoItem.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    var e = this.OpenParam;
    if (e) {
      this.InfoItem.UpdateDetail(e);
    }
  }
  OnBeforeDestroy() {
    this.InfoItem = undefined;
  }
}
exports.TrapDefenseBuildingMachineInfoView = TrapDefenseBuildingMachineInfoView;
//# sourceMappingURL=TrapDefenseBuildingMachineInfoView.js.map