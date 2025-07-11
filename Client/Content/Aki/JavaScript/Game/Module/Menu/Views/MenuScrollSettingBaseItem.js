"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScrollSettingBaseItem = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MenuScrollSettingBaseItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.FireSaveMenuChange = e => {};
    this.PlaySequenceByName = e => {};
    this.wqe = undefined;
  }
  Initialize(e, t, i) {
    this.FireSaveMenuChange = t;
    this.PlaySequenceByName = i;
    this.wqe = e;
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {}
  OnStart() {}
  OnBeforeDestroy() {
    this.Clear();
  }
  ClearItem() {
    this.Destroy();
  }
  Clear() {
    this.OnClear();
  }
  OnClear() {}
  async ClearAsync() {}
  OnRemoveEvents() {}
  PlaySequenceFromName(e) {}
  GetItemClickLimit(e) {
    return !e.GetSelfInteractive() && (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotModify"), true);
  }
  ExecuteUpdate(e, t) {
    this.Data = e;
    this.Update(e, t);
    this.SetDetailVisible(e.GetIsDetailTextVisible());
  }
  SetDetailVisible(e) {
    if (!!this.Data && (!e || !!this.Data.HasDetailText())) {
      this.Data.SetDetailTextVisible(e);
      this.OnSetDetailVisible(e);
    }
  }
  OnSetDetailVisible(e) {}
}
exports.MenuScrollSettingBaseItem = MenuScrollSettingBaseItem;
//# sourceMappingURL=MenuScrollSettingBaseItem.js.map