"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapAlterMapComponent = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MapComponent_1 = require("../../Map/Base/MapComponent");
class WorldMapAlterMapComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.WorldMapViewPlaySequenceFunction = undefined;
    this.InverseTowerCtrlRoot = undefined;
    this.AUc = undefined;
    this.$An = e => {
      if (e === "Invert") {
        this.AUc?.SetResult(true);
        this.AUc = undefined;
      }
    };
  }
  get ComponentType() {
    return 9;
  }
  get NYa() {
    var e = this.Parent;
    if (e !== undefined) {
      return e;
    }
    this.LogError(63, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  OnEnable() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnDisable() {
    this.PUc();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  PUc() {
    this.AUc?.SetResult(false);
    this.AUc = undefined;
  }
  async ChangeMapAsync(e, t) {
    var i = this.NYa.Map;
    i.UnBindMapTileDelegate();
    ControllerHolder_1.ControllerHolder.WorldMapController.ClearFocalMarkItem();
    this.NYa.CancelAllTasks();
    this.NYa.ReloadComponent(8);
    if (t !== undefined && e === i.MapId) {
      this.InverseTowerCtrlRoot.SetUIActive(true);
      this.PUc();
      this.AUc = new CustomPromise_1.CustomPromise();
      this.WorldMapViewPlaySequenceFunction?.("InverTower", true).then(() => {
        this.InverseTowerCtrlRoot.SetUIActive(false);
      });
    }
    await this.xUc(e, t);
  }
  async xUc(e, t) {
    var i;
    if ((await this.AUc?.Promise) === false) {
      this.AUc = undefined;
    } else {
      i = this.NYa.Map;
      ModelManager_1.ModelManager.WorldMapModel.SetWorldMapSelectedGravity(e, t);
      await i.ChangeMapAsync(e, ModelManager_1.ModelManager.WorldMapModel.WorldMapSelectGravity ?? 1);
      this.NYa.MapId = e;
      this.NYa.RecalculateMapSize();
      this.NYa.ReloadComponent(2);
      this.NYa.MultiFloorComponent.Reset();
      this.NYa.Reset(t === undefined);
      this.NYa.WorldMapStreamingComponent.BindAll(i.GetAllMapTileItems());
      this.NYa.WorldMapStreamingComponent.Update();
    }
  }
  ChangeMapGravity() {
    var e = ModelManager_1.ModelManager.WorldMapModel.WorldMapGravity;
    let t = e;
    switch (e) {
      case 1:
        t = 2;
        break;
      case 2:
        t = 1;
        break;
      default:
        return;
    }
    ModelManager_1.ModelManager.WorldMapModel.WorldMapSelectGravity = t;
    e = this.NYa.Map;
    this.ChangeMapAsync(e.MapId, ModelManager_1.ModelManager.WorldMapModel.WorldMapGravity);
  }
  get CanChangeMapGravity() {
    var e = this.NYa.Map.MapId;
    return ModelManager_1.ModelManager.WorldMapModel.IsGravityMap(e);
  }
  OnRemove() {
    ModelManager_1.ModelManager.WorldMapModel.WorldMapSelectGravity = undefined;
  }
}
exports.WorldMapAlterMapComponent = WorldMapAlterMapComponent;
//# sourceMappingURL=WorldMapAlterMapComponent.js.map