"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingUpGradeCurve = undefined;
class BuildingUpGradeCurve {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get GroupId() {
    return this.groupid();
  }
  get Level() {
    return this.level();
  }
  get UpGradePrice() {
    return this.upgradeprice();
  }
  get HeatAddition() {
    return this.heataddition();
  }
  get GoldAddition() {
    return this.goldaddition();
  }
  get GoldAdditionFix() {
    return this.goldadditionfix();
  }
  get WishAddition() {
    return this.wishaddition();
  }
  get WishAdditionFix() {
    return this.wishadditionfix();
  }
  get EnergyAddition() {
    return this.energyaddition();
  }
  get ModelId() {
    return this.modelid();
  }
  get IdeaRatioAddition() {
    return this.idearatioaddition();
  }
  get SuccessAddition() {
    return this.successaddition();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsBuildingUpGradeCurve(t, i) {
    return (i || new BuildingUpGradeCurve()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  upgradeprice() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  heataddition() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  goldaddition() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  goldadditionfix() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  wishaddition() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  wishadditionfix() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  energyaddition() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  modelid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  idearatioaddition() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  successaddition() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BuildingUpGradeCurve = BuildingUpGradeCurve;
//# sourceMappingURL=BuildingUpGradeCurve.js.map