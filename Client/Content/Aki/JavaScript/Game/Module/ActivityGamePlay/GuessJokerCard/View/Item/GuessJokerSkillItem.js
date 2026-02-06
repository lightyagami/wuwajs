"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerSkillItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ToggleActionItem_1 = require("../../../../Common/Toggle/ToggleActionItem");
class GuessJokerSkillItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$_i = undefined;
    this.NTt = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    this.$_i = new ToggleActionItem_1.ToggleActionItem();
    await this.$_i.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {
    this.$_i.SetFunction(this.NTt);
  }
  BindClickCallback(e) {
    this.NTt = e;
  }
  SetText(e) {
    this.$_i.SetToggleText(e);
  }
}
exports.GuessJokerSkillItem = GuessJokerSkillItem;
//# sourceMappingURL=GuessJokerSkillItem.js.map