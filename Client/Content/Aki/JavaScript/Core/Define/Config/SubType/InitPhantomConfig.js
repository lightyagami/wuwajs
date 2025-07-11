"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitPhantomConfig = undefined;
class InitPhantomConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ItemId() {
    return this.itemid();
  }
  get RandGroupId() {
    return this.randgroupid();
  }
  get RandNum() {
    return this.randnum();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsInitPhantomConfig(t, i) {
    return (i || new InitPhantomConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  randgroupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  randnum() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.InitPhantomConfig = InitPhantomConfig;
//# sourceMappingURL=InitPhantomConfig.js.map