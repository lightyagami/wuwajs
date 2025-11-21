"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsCardTipsView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const SurvivorsRogueCardBase_1 = require("../../Card/SurvivorsRogueCardBase");
class SurvivorsCardTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.eVi = undefined;
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Jvt]];
  }
  async OnBeforeStartAsync() {
    this.eVi = new SurvivorsRogueCardBase_1.SurvivorsRogueCardBase();
    await this.eVi.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    var s = this.OpenParam;
    this.eVi?.Apply(s);
  }
}
exports.SurvivorsCardTipsView = SurvivorsCardTipsView;
//# sourceMappingURL=SurvivorsCardTipsView.js.map