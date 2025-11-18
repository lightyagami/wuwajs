"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestRefMapBlockConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class QuestRefMapBlockConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get QuestId() {
    return this.questid();
  }
  get MapBlockId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.mapblockidLength(), this.mapblockid, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsQuestRefMapBlockConfig(t, s) {
    return (s || new QuestRefMapBlockConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  questid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMapblockidAt(t) {
    return this.mapblockid(t);
  }
  mapblockid(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  mapblockidLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapblockidArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.QuestRefMapBlockConfig = QuestRefMapBlockConfig;
//# sourceMappingURL=QuestRefMapBlockConfig.js.map