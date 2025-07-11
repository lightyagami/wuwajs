"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortalModel = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class PortalModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Osr = undefined;
    this.r8a = undefined;
  }
  OnInit() {
    this.Osr = new Map();
    return true;
  }
  AddPortalPair(t, e) {
    if (!this.Osr.has(t)) {
      this.Osr.set(t, e);
    }
  }
  RemovePortalPair(t) {
    this.Osr.delete(t);
  }
  GetPortal(t) {
    return this.Osr.get(t);
  }
  GetPortals() {
    return this.Osr;
  }
  OnClear() {
    if ((this.Osr = undefined) !== this.r8a) {
      ActorSystem_1.ActorSystem.Put("PortalModel.OnClear", this.r8a);
      this.r8a = undefined;
    }
    return true;
  }
  OnLeaveLevel() {
    if (this.r8a !== undefined) {
      ActorSystem_1.ActorSystem.Put("PortalModel.OnLeaveLevel", this.r8a);
      this.r8a = undefined;
    }
    return true;
  }
  GetBpPortalActor() {
    if (this.r8a === undefined) {
      this.r8a = ActorSystem_1.ActorSystem.Spawn(UE.BP_Portal_C.StaticClass(), undefined, undefined);
    }
    return this.r8a;
  }
}
exports.PortalModel = PortalModel;
//# sourceMappingURL=PortalModel.js.map