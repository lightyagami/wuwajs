"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnrichmentAreaItem = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MapUtil_1 = require("../../MapUtil");
const EnrichmentAreaItemView_1 = require("../MarkItemView/EnrichmentAreaItemView");
const ServerMarkItem_1 = require("./ServerMarkItem");
class EnrichmentAreaItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, r, t, i) {
    super(e, r, t, i);
    this.gNa = undefined;
    this.Lw1 = undefined;
  }
  get MarkConfig() {
    return this.gNa;
  }
  set MarkConfig(e) {
    this.gNa = e;
  }
  get EnrichmentAreaConf() {
    if (this.Lw1 === undefined) {
      this.Lw1 = ConfigManager_1.ConfigManager.MapConfig.GetEnrichmentAreaConfigByEnrichmentId(this.EntityConfigId);
    }
    return this.Lw1;
  }
  get MarkType() {
    return 22;
  }
  get MapId() {
    return this.EnrichmentAreaConf.LevelId;
  }
  get InstanceDungeonId() {
    return this.ServerMarkInfo.InstanceDungeonId;
  }
  GetMarkItemViewType() {
    return 7;
  }
  CreateView() {
    return new EnrichmentAreaItemView_1.EnrichmentAreaItemView(this);
  }
  OnInitialize() {
    super.OnInitialize();
    var e;
    var r = this.ServerMarkInfo;
    this.SetTrackData(r.TrackTarget);
    if (ModelManager_1.ModelManager.MapModel.CacheEnrichmentAreaEntityId !== r.EntityConfigId) {
      var t = this.EnrichmentAreaConf.EntityIds;
      if (t) {
        var i = [];
        for (const o of t) {
          var a = MapUtil_1.MapUtil.GetEntityPositionByConfig(o, this.MapId);
          if (a.Equality(Vector_1.Vector.ZeroVectorProxy)) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Map", 63, "[地图系统]_富集区标记->采集物实体坐标异常，请检查配置", ["富集区Id", r.EntityConfigId], ["采集物Id", o]);
            }
          } else {
            a = MapUtil_1.MapUtil.WorldPosition2UiPosition(a);
            i.push(Vector2D_1.Vector2D.Create(a.X, a.Y));
          }
        }
        const n = MapUtil_1.MapUtil.FindMinCircle(i);
        ModelManager_1.ModelManager.MapModel.CacheEnrichmentAreaWorldMapCircle = n;
      }
      ModelManager_1.ModelManager.MapModel.CacheEnrichmentAreaEntityId = r.EntityConfigId ?? 0;
    }
    const n = ModelManager_1.ModelManager.MapModel.CacheEnrichmentAreaWorldMapCircle;
    if (n) {
      t = MapUtil_1.MapUtil.UiPosition2WorldPosition(Vector_1.Vector.Create(n.X, n.Y, 0));
      e = CommonParamById_1.configCommonParamById.GetFloatConfig("RichZoneExtraRadius");
      this.MarkItemEntity.GetComponent(11).RangeSize = n.R + e;
      this.SetTrackData(t);
    }
    this.SetConfigId(5);
    this.UpdateVisibleRelativeState();
  }
  SetConfigId(e) {
    this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    this.gNa = e;
    this.OnAfterSetConfigId({
      ShowRange: e.ShowRange,
      MarkPic: e.UnlockMarkPic,
      ShowPriority: e.ShowPriority,
      Scale: e.Scale,
      CornerScale: e.CornerScale
    });
  }
  GetEnrichmentItemNameId() {
    return ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.EnrichmentAreaConf.ItemId).Name;
  }
  CheckCanShowIcon() {
    var e = this.MapType;
    if (this.MarkConfig.MapShow === 1 && e !== 1 || this.MarkConfig.MapShow === 2 && e === 1) {
      return this.IsTracking();
    } else {
      return super.CheckCanShowView();
    }
  }
  SetTitleText(e) {
    var r = this.MarkConfig.MarkTitle;
    var t = ConfigManager_1.ConfigManager.MapConfig.GetLocalText(this.GetEnrichmentItemNameId());
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, r, t);
  }
}
exports.EnrichmentAreaItem = EnrichmentAreaItem;
//# sourceMappingURL=EnrichmentAreaItem.js.map