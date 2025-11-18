"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryEquip = undefined;
class HonamiStoryEquip {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get EnhanceLevel() {
    return this.enhancelevel();
  }
  get RoleId() {
    return this.roleid();
  }
  get RoleEnhanceLevel() {
    return this.roleenhancelevel();
  }
  get Tag() {
    return this.tag();
  }
  get TagEnhanceLevel() {
    return this.tagenhancelevel();
  }
  get GroupId() {
    return this.groupid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsHonamiStoryEquip(t, e) {
    return (e || new HonamiStoryEquip()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  enhancelevel() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleenhancelevel() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tag() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tagenhancelevel() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.HonamiStoryEquip = HonamiStoryEquip;
//# sourceMappingURL=HonamiStoryEquip.js.map