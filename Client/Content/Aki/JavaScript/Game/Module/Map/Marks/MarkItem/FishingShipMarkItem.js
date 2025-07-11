"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingShipMarkItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FishingShipMarkItemView_1 = require("../MarkItemView/FishingShipMarkItemView");
const ServerMarkItem_1 = require("./ServerMarkItem");
class FishingShipMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, r, i, t) {
    super(e, r, i, t);
    this.gNa = undefined;
  }
  get MarkConfig() {
    return this.gNa;
  }
  set MarkConfig(e) {
    this.gNa = e;
  }
  get MapId() {
    return this.ServerMarkInfo.MapId;
  }
  get InstanceDungeonId() {
    return this.ServerMarkInfo.InstanceDungeonId;
  }
  GetMultiMapId() {
    return 0;
  }
  GetTitleText() {
    return ConfigManager_1.ConfigManager.TextConfig.GetMultiText(this.MarkConfig.MarkTitle);
  }
  GetMarkItemViewType() {
    return 11;
  }
  CreateView() {
    return new FishingShipMarkItemView_1.FishingShipMarkItemView(this);
  }
  OnInitialize() {
    super.OnInitialize();
    this.EnableCachePosition = false;
    var e = this.ServerMarkInfo;
    this.SetTrackData(e.TrackTarget);
    this.SetConfigId(e.MarkConfigId);
    this.UpdateVisibleRelativeState();
  }
  SetConfigId(e) {
    this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    this.gNa = e;
    this.MarkItemEntity.GetComponent(15).MapMarkConfig = e;
    this.OnAfterSetConfigId({
      ShowRange: e.ShowRange,
      MarkPic: e.UnlockMarkPic,
      ShowPriority: e.ShowPriority,
      Scale: e.Scale,
      CornerScale: e.CornerScale
    });
  }
  CheckCanShowView() {
    var e = ModelManager_1.ModelManager.FishingModel.IsOnShipVehicle();
    return super.CheckCanShowView() && !e;
  }
}
exports.FishingShipMarkItem = FishingShipMarkItem;
//# sourceMappingURL=FishingShipMarkItem.js.map