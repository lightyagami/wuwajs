"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapPlayerComponent = undefined;
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MapComponent_1 = require("../../Map/Base/MapComponent");
const MapUtil_1 = require("../../Map/MapUtil");
class WorldMapPlayerComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.PlayerUiPosition = Vector2D_1.Vector2D.Create(0, 0);
    this.PlayerWorldPosition = undefined;
    this.PlayerRotation = -0;
    this.PlayerOutOfBound = false;
  }
  get ComponentType() {
    return 5;
  }
  UpdatePlayerPosition() {
    var e;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t &&= t.Entity.GetComponent(3)) {
      if (ModelManager_1.ModelManager.MapModel.CurrentInWorld) {
        this.PlayerWorldPosition = t.ActorLocationProxy;
      } else {
        e = MapUtil_1.MapUtil.GetLastBigScenePlayerPosition();
        this.PlayerWorldPosition = e;
      }
      e = Vector2D_1.Vector2D.Create(this.PlayerWorldPosition.X, this.PlayerWorldPosition.Y);
      this.PlayerUiPosition = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(e, e);
      this.PlayerRotation = -(t.ActorRotation.Yaw + 90);
    }
  }
}
exports.WorldMapPlayerComponent = WorldMapPlayerComponent;
//# sourceMappingURL=WorldMapPlayerComponent.js.map