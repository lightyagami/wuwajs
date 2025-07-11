"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResRoomPool = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResRoomPool {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BehaviorTree() {
    return this.behaviortree();
  }
  get RoomsMusicState() {
    return this.roomsmusicstate();
  }
  get MonsterDesc() {
    return GameUtils_1.GameUtils.ConvertToArray(this.monsterdescLength(), this.monsterdesc, this);
  }
  get MonsterDescParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.monsterdescparamsLength(), this.monsterdescparams, this);
  }
  get MonsterFig() {
    return GameUtils_1.GameUtils.ConvertToArray(this.monsterfigLength(), this.monsterfig, this);
  }
  get EnvDesc() {
    return GameUtils_1.GameUtils.ConvertToArray(this.envdescLength(), this.envdesc, this);
  }
  get EnvFig() {
    return GameUtils_1.GameUtils.ConvertToArray(this.envfigLength(), this.envfig, this);
  }
  get EnvDescParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.envdescparamsLength(), this.envdescparams, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRogueResRoomPool(t, s) {
    return (s || new RogueResRoomPool()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  behaviortree() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roomsmusicstate(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetMonsterdescAt(t) {
    return this.monsterdesc(t);
  }
  monsterdesc(t, s) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  monsterdescLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMonsterdescparamsAt(t) {
    return this.monsterdescparams(t);
  }
  monsterdescparams(t, s) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  monsterdescparamsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMonsterfigAt(t) {
    return this.monsterfig(t);
  }
  monsterfig(t, s) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  monsterfigLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetEnvdescAt(t) {
    return this.envdesc(t);
  }
  envdesc(t, s) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  envdescLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetEnvfigAt(t) {
    return this.envfig(t);
  }
  envfig(t, s) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  envfigLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetEnvdescparamsAt(t) {
    return this.envdescparams(t);
  }
  envdescparams(t, s) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  envdescparamsLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RogueResRoomPool = RogueResRoomPool;
//# sourceMappingURL=RogueResRoomPool.js.map