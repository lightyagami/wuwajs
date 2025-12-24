"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisChat = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ArtemisChat {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get LockChatContent() {
    return this.lockchatcontent();
  }
  get LockChatTexture() {
    return this.lockchattexture();
  }
  get ChatContent() {
    return this.chatcontent();
  }
  get ChatTexture() {
    return this.chattexture();
  }
  get IsLeft() {
    return this.isleft();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsArtemisChat(t, s) {
    return (s || new ArtemisChat()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lockchatcontent(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  lockchattexture(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  chatcontent(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  chattexture(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  isleft() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.ArtemisChat = ArtemisChat;
//# sourceMappingURL=ArtemisChat.js.map