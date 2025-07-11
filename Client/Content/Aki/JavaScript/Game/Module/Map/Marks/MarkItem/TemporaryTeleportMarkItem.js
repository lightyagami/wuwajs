"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemporaryTeleportMarkItem = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const TemporaryTeleportMarkItemView_1 = require("../MarkItemView/TemporaryTeleportMarkItemView");
const ServerMarkItem_1 = require("./ServerMarkItem");
class TemporaryTeleportMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, t, r, i) {
    super(e, t, r, i);
    this.NDi = false;
    this.Zbn = e => {
      this.uil();
    };
  }
  get TeleportId() {
    return this.ServerMarkInfo?.TeleportId ?? 0;
  }
  get MarkType() {
    return 15;
  }
  get IsNewCustomMarkItem() {
    return this.NDi;
  }
  OnUpdate(e) {
    super.OnUpdate(e);
    if (this.MapType === 1) {
      this.uil();
    }
  }
  _il() {
    var e;
    if (this.InnerView && (e = this.InnerView)) {
      e.UpdateIcon();
    }
  }
  uil() {
    var e = this.IsSelectThisFloor;
    this.IsSelectThisFloor = this.GetIsSelectThisFloor();
    if (e !== this.IsSelectThisFloor) {
      this._il();
    }
  }
  ShowSecondaryUiMultiMapIcon() {
    return this.IsMultiMap();
  }
  GetMultiMapId() {
    if (this.TrackAreaId) {
      return this.GetMultiMapIdSub();
    } else {
      return 0;
    }
  }
  get TrackAreaId() {
    return this.ServerMarkInfo?.AreaId ?? 0;
  }
  OnInitialize() {
    super.OnInitialize();
    var e = this.ServerMarkInfo;
    this.SetTrackData(e.TrackTarget);
    this.SetConfigId(this.ConfigId);
    this.UpdateVisibleRelativeState();
    if (this.MapType === 2) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate, this.Zbn);
    }
    this.uil();
  }
  OnDestroy() {
    super.OnDestroy();
    if (this.MapType === 2) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate, this.Zbn);
    }
  }
  GetMarkItemViewType() {
    return 25;
  }
  CreateView() {
    return new TemporaryTeleportMarkItemView_1.TemporaryTeleportMarkItemView(this);
  }
  SetConfigId(e) {
    this.ServerMarkInfo.MarkConfigId = e;
    this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetTemporaryTeleportMarkConfigById(e);
    this.OnAfterSetConfigId(e);
  }
  SetIsNew(e) {
    this.NDi = e;
  }
  GetTitleText() {
    var e = ConfigManager_1.ConfigManager.MapConfig.GetTemporaryTeleportMarkConfigById(this.ConfigId);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkTitle);
  }
  GetDescText() {
    var e = ConfigManager_1.ConfigManager.MapConfig.GetTemporaryTeleportMarkConfigById(this.ConfigId);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkDesc);
  }
}
exports.TemporaryTeleportMarkItem = TemporaryTeleportMarkItem;
//# sourceMappingURL=TemporaryTeleportMarkItem.js.map