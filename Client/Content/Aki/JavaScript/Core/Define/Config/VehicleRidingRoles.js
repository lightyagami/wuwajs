"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleRidingRoles = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class VehicleRidingRoles {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Description() {
    return this.description();
  }
  get CreatorId() {
    return this.creatorid();
  }
  get TemplateId() {
    return this.templateid();
  }
  get SkinTemplates() {
    return GameUtils_1.GameUtils.ConvertToMap(this.skintemplatesLength(), this.skintemplatesKey, this.skintemplatesValue, this);
  }
  skintemplatesKey(t) {
    return this.skintemplates(t)?.key();
  }
  skintemplatesValue(t) {
    return this.skintemplates(t)?.value();
  }
  get RegionId() {
    return this.regionid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsVehicleRidingRoles(t, i) {
    return (i || new VehicleRidingRoles()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  creatorid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  templateid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSkintemplatesAt(t, i) {
    return this.skintemplates(t);
  }
  skintemplates(t, i) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  skintemplatesLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  regionid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.VehicleRidingRoles = VehicleRidingRoles;
//# sourceMappingURL=VehicleRidingRoles.js.map