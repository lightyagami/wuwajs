"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleRandomEventView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RogueBattleRandomEventItem_1 = require("../Component/RogueBattleRandomEventItem");
class RogueBattleRandomEventView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OptionLayout = undefined;
    this.Bqe = () => new RogueBattleRandomEventItem_1.RogueBattleRandomEventItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.OptionLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.Bqe);
    var e = this.OpenParam;
    await this.OptionLayout.RefreshByDataAsync(e.fIc);
  }
}
exports.RogueBattleRandomEventView = RogueBattleRandomEventView;
//# sourceMappingURL=RogueBattleRandomEventView.js.map