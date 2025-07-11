"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDungeonResultView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RacingBetsLegMatchResultItem_1 = require("./Item/RacingBetsLegMatchResultItem");
class RacingBetsDungeonResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PTc = undefined;
    this.uat = undefined;
    this.xTc = () => new RacingBetsLegMatchResultItem_1.RacingBetsLegMatchResultItem();
    this.lyt = e => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.lyt]];
  }
  async OnBeforeStartAsync() {
    var [e, t] = this.OpenParam;
    this.uat = t;
    this.PTc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.xTc);
    var t = e.GetLegMatchResultList();
    this.GetText(0).ShowTextNew(e.Name);
    await this.PTc.RefreshByDataAsync(t);
  }
  OnStart() {
    this.GetVerticalLayout(1).GetOwner().GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play();
  }
  OnBeforeDestroy() {
    this.uat.SetResult(undefined);
  }
}
exports.RacingBetsDungeonResultView = RacingBetsDungeonResultView;
//# sourceMappingURL=RacingBetsDungeonResultView.js.map