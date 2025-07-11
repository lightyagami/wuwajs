"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PackageCapacity = undefined;
class PackageCapacity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get PackageId() {
    return this.packageid();
  }
  get Capacity() {
    return this.capacity();
  }
  __init(t, a) {
    this.z7 = t;
    this.J7 = a;
    return this;
  }
  static getRootAsPackageCapacity(t, a) {
    return (a || new PackageCapacity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  packageid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  capacity() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PackageCapacity = PackageCapacity;
//# sourceMappingURL=PackageCapacity.js.map