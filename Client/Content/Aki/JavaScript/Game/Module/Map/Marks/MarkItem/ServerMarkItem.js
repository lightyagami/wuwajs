"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerMarkItem = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MapDefine_1 = require("../../MapDefine");
const ServerMarkItemView_1 = require("../MarkItemView/ServerMarkItemView");
const MarkItem_1 = require("./MarkItem");
class ServerMarkItem extends MarkItem_1.MarkItem {
  constructor(e, t, r, i) {
    super(t, r, i, e.TrackSource ?? 1);
    this.MinShowScale = 0;
    this.MaxShowScale = 0;
    this.ServerMarkInfo = undefined;
    this.MultiMapIdInternal = undefined;
    this.ServerMarkInfo = e;
    if (MapDefine_1.serverMarkIgnoreReadConfigSet.has(e.MarkType)) {
      this.ShowPriority = 0;
    } else {
      t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.MarkConfigId);
      this.ShowPriority = t ? t.ShowPriority : 0;
    }
  }
  get MarkId() {
    return this.ServerMarkInfo?.MarkId;
  }
  get MarkType() {
    return this.ServerMarkInfo?.MarkType ?? 0;
  }
  get ConfigId() {
    return this.ServerMarkInfo.MarkConfigId;
  }
  get TrackPosition() {
    if (this.ServerMarkInfo.TrackTarget instanceof Vector_1.Vector || this.ServerMarkInfo.TrackTarget instanceof Vector2D_1.Vector2D) {
      return this.ServerMarkInfo.TrackTarget;
    } else {
      return Vector_1.Vector.ZeroVectorProxy;
    }
  }
  get EntityConfigId() {
    return this.ServerMarkInfo.EntityConfigId;
  }
  get RawInstanceDungeonId() {
    return this.ServerMarkInfo.InstanceDungeonId;
  }
  IsMultiMap() {
    return this.GetMultiMapId() !== 0;
  }
  get TrackAreaId() {
    if (this.EntityConfigId === undefined || this.EntityConfigId === 0) {
      return 0;
    } else {
      return ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(this.EntityConfigId, this.MapId);
    }
  }
  GetMultiMapId() {
    if (this.EntityConfigId === undefined || this.EntityConfigId === 0) {
      return 0;
    } else {
      return this.GetMultiMapIdSub();
    }
  }
  GetMultiMapIdSub() {
    if (this.MultiMapIdInternal === undefined) {
      var e = this.TrackAreaId;
      var t = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(e);
      for (const r of ConfigManager_1.ConfigManager.MapConfig.GetAllSubMapConfig()) {
        if (r.Area.includes(t) || r.Area.includes(e)) {
          this.MultiMapIdInternal = r.Id;
          break;
        }
      }
      if (this.MultiMapIdInternal === undefined) {
        this.MultiMapIdInternal = 0;
      }
    }
    return this.MultiMapIdInternal;
  }
  get IsServerDisable() {
    return this.ServerMarkInfo.ServerMarkState === Protocol_1.Aki.Protocol.htm.Proto_MarkDisable;
  }
  get MapId() {
    return this.ServerMarkInfo.MapId;
  }
  get InstanceDungeonId() {
    return this.ServerMarkInfo.InstanceDungeonId;
  }
  GetMarkItemViewType() {
    return 21;
  }
  CreateView() {
    return new ServerMarkItemView_1.ServerMarkItemView(this);
  }
  CheckInShowRange(e) {
    return this.MapType !== 2 || !!this.IsIgnoreScaleShow || this.MinShowScale === this.MaxShowScale || this.MinShowScale < e && this.MaxShowScale > e;
  }
  OnAfterSetConfigId(e) {
    if (e) {
      if (e.ShowRange) {
        this.MinShowScale = e.ShowRange[0] ?? 0;
        this.MaxShowScale = e.ShowRange[1] ?? 0;
      }
      this.IconPath = e.MarkPic;
      this.InnerView?.OnIconPathChanged(this.IconPath);
      if (e.ShowPriority) {
        this.ShowPriority = e.ShowPriority;
      }
      this.ConfigScale = e.Scale ?? 1;
      this.CornerScale = e.CornerScale ?? 1;
    }
  }
  CheckCanShowView() {
    var e = this.GetCurrentMapShowScale();
    var e = this.CheckInShowRange(e) || this.IsTracked;
    if (this.IsCanShowViewIntermediately !== e) {
      this.NeedPlayShowOrHideSeq = e ? "ShowView" : "HideView";
    }
    return e;
  }
  GetAreaText() {
    var e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(this.ConfigId)?.AreaShowText ?? [];
    if (e.length > 0) {
      return e.map(e => ConfigManager_1.ConfigManager.MapConfig.GetLocalText(e)).join("-");
    } else {
      return ModelManager_1.ModelManager.MapModel.GetMarkAreaText(this.MapId, this.EntityConfigId);
    }
  }
}
exports.ServerMarkItem = ServerMarkItem;
//# sourceMappingURL=ServerMarkItem.js.map