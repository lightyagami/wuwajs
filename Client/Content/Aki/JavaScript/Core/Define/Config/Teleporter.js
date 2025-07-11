"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Teleporter = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class Teleporter {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MapId() {
    return this.mapid();
  }
  get ObjectId() {
    return this.objectid();
  }
  get FogId() {
    return this.fogid();
  }
  get Type() {
    return this.type();
  }
  get TeleportEntityConfigId() {
    return this.teleportentityconfigid();
  }
  get Plot() {
    return this.plot();
  }
  get AfterNetworkAction() {
    return this.afternetworkaction();
  }
  get ShowWorldMap() {
    return this.showworldmap();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsTeleporter(t, r) {
    return (r || new Teleporter()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  objectid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  fogid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  teleportentityconfigid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  plot(t) {
    var r = this.J7.__offset(this.z7, 16);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  afternetworkaction() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showworldmap() {
    var t = this.J7.__offset(this.z7, 20);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.Teleporter = Teleporter;
//# sourceMappingURL=Teleporter.js.map