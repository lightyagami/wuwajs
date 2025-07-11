"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MingSuNpcMarkItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MingSuNpcMarkItemView_1 = require("../MarkItemView/MingSuNpcMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class MingSuNpcMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, r, t, a, i, n = 1) {
    super(e, r, t, a, i, n);
    this.InnerView = undefined;
  }
  GetMarkItemViewType() {
    return 17;
  }
  CreateView() {
    return new MingSuNpcMarkItemView_1.MingSuNpcMarkItemView(this);
  }
  get IsTowerEntrance() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsTowerEntrance(this.MarkConfigId);
  }
  GamePlayIsFinish() {
    var e = this.MarkConfig;
    var r = e.RelativeType;
    if (r === 1 && this.MarkConfig.RelativeSubType === 5) {
      r = e.RelativeId;
      return ModelManager_1.ModelManager.MingSuModel.GetDarkCoastDeliveryDataByLevelPlayId(r).GetDarkCoastDeliveryGuardState() === 4;
    }
    return false;
  }
}
exports.MingSuNpcMarkItem = MingSuNpcMarkItem;
//# sourceMappingURL=MingSuNpcMarkItem.js.map