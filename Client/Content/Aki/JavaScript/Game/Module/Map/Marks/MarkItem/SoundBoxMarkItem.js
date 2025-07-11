"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundBoxMarkItem = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SoundBoxMarkItemView_1 = require("../MarkItemView/SoundBoxMarkItemView");
const ServerMarkItem_1 = require("./ServerMarkItem");
class SoundBoxMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, t, r, i) {
    super(e, t, r, i);
    this.DetectorId = 0;
    this.NDi = false;
  }
  get MarkType() {
    return this.ServerMarkInfo?.MarkType ?? 16;
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
    return 22;
  }
  CreateView() {
    return new SoundBoxMarkItemView_1.SoundBoxMarkItemView(this);
  }
  SetConfigId(e) {
    this.ServerMarkInfo.MarkConfigId = e;
    this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetSoundBoxMarkConfig(e);
    this.OnAfterSetConfigId(e);
  }
  SetIsNew(e) {
    this.NDi = e;
  }
  GetTitleText() {
    var e = ConfigManager_1.ConfigManager.MapConfig.GetSoundBoxMarkConfig(this.ConfigId);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkTitle);
  }
  GetDescText() {
    var e = ConfigManager_1.ConfigManager.MapConfig.GetSoundBoxMarkConfig(this.ConfigId);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkDesc);
  }
  GetSoundBoxEntityId() {
    return this.ServerMarkInfo?.EntityConfigId;
  }
  GetInteractiveFlag() {
    return false;
  }
}
exports.SoundBoxMarkItem = SoundBoxMarkItem;
//# sourceMappingURL=SoundBoxMarkItem.js.map