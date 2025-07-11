"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressTaskDynamicScrollItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const ActivityRegressTaskScrollItemPanel_1 = require("./ActivityRegressTaskScrollItemPanel");
const ActivityRegressTaskTitlePanel_1 = require("./ActivityRegressTaskTitlePanel");
class ActivityRegressTaskDynamicScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.uma = undefined;
    this.gLt = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.uma = new ActivityRegressTaskScrollItemPanel_1.ActivityRegressTaskScrollItemPanel();
    var e = this.GetItem(0).GetOwner();
    await this.uma.CreateThenShowByActorAsync(e, undefined, true);
    this.gLt = new ActivityRegressTaskTitlePanel_1.ActivityRegressTaskTitlePanel();
    var e = this.GetItem(1).GetOwner();
    await this.gLt.CreateThenShowByActorAsync(e, undefined, true);
  }
  GetUsingItem(e) {
    if (e.ItemType === 0) {
      return this.cma(1);
    } else if (e.ItemType === 1) {
      return this.cma(0);
    } else {
      return undefined;
    }
  }
  cma(e) {
    return this.GetItem(e).GetOwner();
  }
  Update(e, t) {
    var s = e.ItemType === 0;
    this.gLt.SetUiActive(s);
    this.uma.SetUiActive(!s);
    if (s) {
      this.gLt.RefreshByData(e);
    } else if (!s) {
      this.uma.GetRootItem().SetAnchorOffsetY(0);
      this.uma.RefreshByData(e);
    }
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.ActivityRegressTaskDynamicScrollItem = ActivityRegressTaskDynamicScrollItem;
//# sourceMappingURL=ActivityRegressTaskDynamicScrollItem.js.map