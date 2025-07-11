"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreasureBoxMarkItem = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const TreasureBoxMarkItemView_1 = require("../MarkItemView/TreasureBoxMarkItemView");
const ServerMarkItem_1 = require("./ServerMarkItem");
class TreasureBoxMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, r, t, i) {
    super(e, r, t, i);
    this.DetectorId = 0;
    this.NDi = false;
  }
  get MarkType() {
    return 18;
  }
  get IsNewCustomMarkItem() {
    return this.NDi;
  }
  OnInitialize() {
    super.OnInitialize();
    var e = this.ServerMarkInfo;
    this.SetTrackData(e.TrackTarget);
    this.SetConfigId(this.ConfigId);
    this.UpdateVisibleRelativeState();
  }
  GetMarkItemViewType() {
    return 27;
  }
  CreateView() {
    return new TreasureBoxMarkItemView_1.TreasureBoxMarkItemView(this);
  }
  SetConfigId(e) {
    this.ServerMarkInfo.MarkConfigId = e;
    this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetTreasureBoxMarkConfig(e);
    this.OnAfterSetConfigId(e);
  }
  SetIsNew(e) {
    this.NDi = e;
  }
  GetTitleText() {
    var e = ConfigManager_1.ConfigManager.MapConfig.GetTreasureBoxMarkConfig(this.ConfigId);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkTitle);
  }
  GetDescText() {
    var e = ConfigManager_1.ConfigManager.MapConfig.GetTreasureBoxMarkConfig(this.ConfigId);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkDesc);
  }
  GetInteractiveFlag() {
    return false;
  }
}
exports.TreasureBoxMarkItem = TreasureBoxMarkItem;
//# sourceMappingURL=TreasureBoxMarkItem.js.map