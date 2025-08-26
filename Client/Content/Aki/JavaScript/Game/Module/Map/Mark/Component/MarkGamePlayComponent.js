"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkGamePlayComponent = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MapComponent_1 = require("../../Base/MapComponent");
class MarkGamePlayComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.MarkId = 0;
    this.MarkType = 0;
    this.MapId = 0;
    this.Gravity = 0;
  }
  get ComponentType() {
    return 10;
  }
  set GamePlayState(e) {
    this.PropertyMap.set(0, e);
  }
  get GamePlayState() {
    return this.PropertyMap.tryGet(0, 0);
  }
  get IsFinish() {
    return this.GamePlayState === 2;
  }
  get IsHide() {
    return this.GamePlayState === 3;
  }
  get IsDisable() {
    return this.MarkId === 0 || ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(this.MarkId).ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable || this.IsHide;
  }
  get IsTeleportLocked() {
    return this.MarkId === 0 || ModelManager_1.ModelManager.MapModel.IsTeleportLocked(this.MarkId);
  }
  get InGravityLayer() {
    return this.MarkId !== 0 && (this.Gravity === 0 || this.Gravity === ModelManager_1.ModelManager.WorldMapModel.WorldMapGravity);
  }
  get CanShowGravityChildIcon() {
    return this.MarkId !== 0 && this.Gravity !== 0 && !this.InGravityLayer;
  }
}
exports.MarkGamePlayComponent = MarkGamePlayComponent;
//# sourceMappingURL=MarkGamePlayComponent.js.map