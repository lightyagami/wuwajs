"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapMultiFloorComponent = undefined;
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ExploreProgressDefine_1 = require("../../ExploreProgress/ExploreProgressDefine");
const MapComponent_1 = require("../../Map/Base/MapComponent");
class WorldMapMultiFloorComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.MultiMapFloorLayout = undefined;
    this.Sal = undefined;
    this.yal = undefined;
    this.MultiMapFloorContainer = undefined;
    this.WorldMapViewPlaySequenceFunction = undefined;
    this.Eal = false;
    this.OnChangeMultiMapFloor = (e, t) => {
      this.Ial(e, true, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate, e);
    };
  }
  get ComponentType() {
    return 6;
  }
  get NYa() {
    var e = this.Parent;
    if (e !== undefined) {
      return e;
    }
    this.LogError(63, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  get SelectedMultiMapGroupId() {
    return this.Sal;
  }
  get SelectedMultiMapFloorId() {
    return this.yal;
  }
  OnEnable() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapSubMapChanged, this.OnChangeMultiMapFloor);
  }
  OnDisable() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapSubMapChanged, this.OnChangeMultiMapFloor);
  }
  Reset() {
    this.Sal = undefined;
    this.yal = undefined;
    this.SetMultiMapMenuActive(false);
  }
  InitMultiMap() {
    var e;
    var t = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
    var i = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigByAreaId(t);
    if (i) {
      e = i.GroupId;
      i = i.Floor;
      this.SelectMultiMapFloor(t, e, i, false);
    }
  }
  UpdateMultiMap() {
    var e = this.Tal();
    var t = this.NYa.Map.GetSubMapGroupIdByPosition();
    if (this.SelectedMultiMapGroupId !== t && (this.SelectedMultiMapFloorId === undefined || this.SelectedMultiMapFloorId === 0)) {
      if (t === 0) {
        this.SelectMultiMapFloor(e, undefined, undefined);
      } else {
        this.SelectMultiMapFloor(e, t, 0);
      }
    }
  }
  Tal() {
    if (this.NYa.ClickedItem?.IsMultiMap()) {
      var e = this.NYa.ClickedItem.GetMultiMapId();
      var e = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(e);
      if (e) {
        if (e.Area.length > 0) {
          return e.Area[0];
        } else {
          return 0;
        }
      }
    }
    return this.NYa.Map.GetWorldMapCenterAreaId();
  }
  SelectMultiMapFloor(e, t, n, s = true) {
    e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e);
    e = e ? ModelManager_1.ModelManager.AreaModel.GetAreaId(e, ExploreProgressDefine_1.AREA_LEVEL) : 0;
    e = ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(e);
    let r = e;
    if (e && t !== undefined && n !== undefined) {
      let e = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigByGroupId(t)) ?? [];
      (e = e.filter(e => ModelManager_1.ModelManager.MapModel.CheckUnlockMultiMapIds(e.Id) || e.Floor === 0)).sort((e, t) => t.Floor - e.Floor);
      if (e.length !== 1) {
        let i = undefined;
        let o = 0;
        if (n !== undefined) {
          e.forEach((e, t) => {
            if (e.Floor === n) {
              i = t;
              o = e.Id;
            }
          });
        }
        this.Sal = t;
        if ((this.yal = i) !== undefined) {
          ModelManager_1.ModelManager.WorldMapModel.WorldMapCurrentMultiMapId = o;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapSelectMultiMap, o);
          this.Ial(i, false, s);
        }
        this.SetMultiMapMenuActive(r);
        this.MultiMapFloorLayout.RefreshByDataAsync(e, false);
        this.MultiMapFloorLayout.SelectGridProxy(i ?? 0);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate, i ?? 0);
      }
    } else {
      this.Sal = undefined;
      this.yal = undefined;
      ModelManager_1.ModelManager.WorldMapModel.WorldMapCurrentMultiMapId = undefined;
      r = false;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapSelectMultiMap, 0);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate, 0);
      this.Ial(0, false, s);
      this.SetMultiMapMenuActive(r);
    }
  }
  DeSelectMultiMapFloor(e = true) {
    var t = this.Tal();
    this.SelectMultiMapFloor(t, undefined, undefined, e);
  }
  async SetMultiMapMenuActive(e) {
    if (this.Eal !== e) {
      this.Eal = e;
      if (this.Eal) {
        this.MultiMapFloorContainer.SetUIActive(true);
        await this.WorldMapViewPlaySequenceFunction?.("LevelShow", false);
      } else {
        await this.WorldMapViewPlaySequenceFunction?.("LevelHide", false);
      }
      this.MultiMapFloorContainer.SetUIActive(this.Eal);
    }
    return true;
  }
  Ial(e, t, i) {
    if (this.Eal) {
      this.MultiMapFloorLayout.DeselectCurrentGridProxy();
      this.MultiMapFloorLayout.SelectGridProxy(e);
    }
    this.yal = e;
    if (this.SelectedMultiMapGroupId === undefined || e === 0) {
      this.NYa.Map.HideSubMapTile();
      if (t) {
        this.UpdateMultiMap();
      }
    } else {
      this.NYa.Map.ShowSubMapTile(this.SelectedMultiMapGroupId, e, !i);
    }
  }
}
exports.WorldMapMultiFloorComponent = WorldMapMultiFloorComponent;
//# sourceMappingURL=WorldMapMultiFloorComponent.js.map