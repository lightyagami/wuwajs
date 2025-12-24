"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreOpenDetection = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PreOpenDetection {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SoundAreaType() {
    return this.soundareatype();
  }
  get PlayType() {
    return this.playtype();
  }
  get PlayTypeArray() {
    return GameUtils_1.GameUtils.ConvertToArray(this.playtypearrayLength(), this.playtypearray, this);
  }
  get DetectionId() {
    return this.detectionid();
  }
  get ConditionGroup() {
    return this.conditiongroup();
  }
  get TeleportEntityId() {
    return this.teleportentityid();
  }
  get DungeonEntranceId() {
    return this.dungeonentranceid();
  }
  get InstanceID() {
    return this.instanceid();
  }
  get Spoiler() {
    return this.spoiler();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPreOpenDetection(t, i) {
    return (i || new PreOpenDetection()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  soundareatype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  playtype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPlaytypearrayAt(t) {
    return this.playtypearray(t);
  }
  playtypearray(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  playtypearrayLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  playtypearrayArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  detectionid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditiongroup() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  teleportentityid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dungeonentranceid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instanceid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  spoiler() {
    var t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.PreOpenDetection = PreOpenDetection;
//# sourceMappingURL=PreOpenDetection.js.map