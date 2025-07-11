"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchCommonTipsView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const FloroRanchCommonTipItem_1 = require("./Item/FloroRanchCommonTipItem");
class FloroRanchCommonTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.eOu = undefined;
    this.dV1 = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.dV1]];
  }
  async OnBeforeStartAsync() {
    this.eOu = new FloroRanchCommonTipItem_1.FloroRanchCommonTipItem();
    var e = this.GetItem(0);
    await this.eOu.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this.eOu.RefreshInfoTipByParam(e);
  }
}
exports.FloroRanchCommonTipsView = FloroRanchCommonTipsView;
//# sourceMappingURL=FloroRanchCommonTipsView.js.map