"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectGamePlayModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class ConnectGamePlayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.TryConnectInterval = 500;
    this.uQs = new Map();
    this.OSa = new Map();
  }
  AddConnectedRelation(e, t) {
    let o = this.uQs.get(e);
    if (!o) {
      o = new Set();
      this.uQs.set(e, o);
    }
    for (const s of t) {
      o.add(s);
    }
  }
  SetRelationPortalParam(e, t) {
    this.OSa.set(e, t);
  }
  RemoveConnectRelation(e, t) {
    e = this.uQs.get(e);
    if (e) {
      e.delete(t);
    }
  }
  RemoveRelationPortalType(e) {
    this.OSa.delete(e);
  }
  GetRelationByEntityId(e) {
    return this.uQs.get(e);
  }
  GetRelationPassThroughParam(e) {
    return this.OSa.get(e);
  }
}
exports.ConnectGamePlayModel = ConnectGamePlayModel;
//# sourceMappingURL=ConnectGamePlayModel.js.map