"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleFettersTabView = undefined;
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const PhantomBattleFettersViewItem_1 = require("../../../Phantom/PhantomBattle/View/PhantomBattleFettersViewItem");
class PhantomBattleFettersTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.kvt = undefined;
  }
  async OnBeforeStartAsync() {
    this.kvt = new PhantomBattleFettersViewItem_1.PhantomBattleFettersViewItem();
    await this.kvt.CreateThenShowByActorAsync(this.GetRootItem().GetOwner());
  }
  OnBeforeShow() {
    var e = this.ExtraParams;
    if (e > 0) {
      this.kvt.SelectByFetterId(e);
    }
  }
}
exports.PhantomBattleFettersTabView = PhantomBattleFettersTabView;
//# sourceMappingURL=PhantomBattleFettersTabView.js.map