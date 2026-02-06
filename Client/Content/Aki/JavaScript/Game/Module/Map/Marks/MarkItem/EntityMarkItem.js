"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityMarkItem = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const EntityMarkItemView_1 = require("../MarkItemView/EntityMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class EntityMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, t, r, i, a, n) {
    super(e, t, r, a, n, 1);
    this.TrackTarget = i;
  }
  GetMarkItemViewType() {
    return 9;
  }
  CreateView() {
    return new EntityMarkItemView_1.EntityMarkItemView(this);
  }
  InitPosition() {
    if (!this.TrackTarget) {
      this.SetTrackData(ModelManager_1.ModelManager.MapModel.GetConfigMarkTrackTarget(this.MarkId));
    }
    this.UpdateVisibleRelativeState();
  }
  CheckCanShowView() {
    return (typeof this.TrackTarget != "number" || !!ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(this.TrackTarget)) && super.CheckCanShowView();
  }
  get MapId() {
    if (this.MarkType === 16) {
      return ModelManager_1.ModelManager.MapModel.CurrentMapConfigId;
    } else {
      return this.MarkConfig.MapId;
    }
  }
}
exports.EntityMarkItem = EntityMarkItem;
//# sourceMappingURL=EntityMarkItem.js.map