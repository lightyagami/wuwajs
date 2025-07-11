"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomizedThumbnail = undefined;
class CustomizedThumbnail {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get AreaId() {
    return this.areaid();
  }
  get MarkId() {
    return this.markid();
  }
  get DefaultSelected() {
    return this.defaultselected();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsCustomizedThumbnail(t, i) {
    return (i || new CustomizedThumbnail()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  areaid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  markid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  defaultselected() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.CustomizedThumbnail = CustomizedThumbnail;
//# sourceMappingURL=CustomizedThumbnail.js.map