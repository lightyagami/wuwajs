"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoSkillView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RacingBetsDangoSkillItem_1 = require("./Item/RacingBetsDangoSkillItem");
class RacingBetsDangoSkillView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.aNc = undefined;
    this.lyt = () => {
      this.CloseMe();
    };
    this.hNc = () => new RacingBetsDangoSkillItem_1.RacingBetsDangoSkillItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.lyt], [3, this.lyt]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    if (e !== undefined) {
      this.aNc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.hNc);
      await this.aNc.RefreshByDataAsync(e);
    }
  }
}
exports.RacingBetsDangoSkillView = RacingBetsDangoSkillView;
//# sourceMappingURL=RacingBetsDangoSkillView.js.map