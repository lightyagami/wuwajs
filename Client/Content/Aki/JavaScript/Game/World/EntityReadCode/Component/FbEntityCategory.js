"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityCategory = undefined;
class FbEntityCategory {
  constructor(t) {
    this.FbDataInternal = t;
    this.MPh = false;
    this.EPh = undefined;
    this.IPh = false;
    this.TPh = undefined;
    this.bPh = false;
    this.LPh = undefined;
    this.APh = false;
    this.xPh = undefined;
    this.RPh = false;
    this.wPh = undefined;
    this.PPh = false;
    this.UPh = undefined;
    this.DPh = false;
    this.BPh = 0;
    this.qPh = false;
    this.kPh = undefined;
    this.GPh = false;
    this.OPh = undefined;
    this.FPh = false;
    this.NPh = undefined;
    this.VPh = false;
    this.jPh = undefined;
    this.HPh = false;
    this.WPh = undefined;
    this.QPh = false;
    this.KPh = undefined;
    this.$Ph = false;
    this.XPh = undefined;
    this.YPh = false;
    this.zPh = undefined;
    this.JPh = false;
    this.ZPh = undefined;
    this.AXh = false;
    this.xXh = undefined;
    this.cr_ = false;
    this.ur_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityCategory(t);
    }
  }
  get MainType() {
    if (!this.MPh) {
      this.MPh = true;
      this.EPh = this.FbDataInternal.mainType();
    }
    return this.EPh;
  }
  get EntityPlotBindingType() {
    if (!this.IPh) {
      this.IPh = true;
      this.TPh = this.FbDataInternal.entityPlotBindingType();
    }
    return this.TPh;
  }
  get ControlMatchType() {
    if (!this.bPh) {
      this.bPh = true;
      this.LPh = this.FbDataInternal.controlMatchType();
    }
    return this.LPh;
  }
  get MonsterMatchType() {
    if (!this.APh) {
      this.APh = true;
      this.xPh = this.FbDataInternal.monsterMatchType();
    }
    return this.xPh;
  }
  get ItemFoundation() {
    if (!this.RPh) {
      this.RPh = true;
      this.wPh = this.FbDataInternal.itemFoundation();
    }
    return this.wPh;
  }
  get HideInFlowType() {
    if (!this.PPh) {
      this.PPh = true;
      this.UPh = this.FbDataInternal.hideInFlowType();
    }
    return this.UPh;
  }
  get ExploratoryDegree() {
    if (!this.DPh) {
      this.DPh = true;
      this.BPh = this.FbDataInternal.exploratoryDegree();
    }
    return this.BPh;
  }
  get TraceMatchType() {
    if (!this.qPh) {
      this.qPh = true;
      this.kPh = this.FbDataInternal.traceMatchType();
    }
    return this.kPh;
  }
  get DestructibleType() {
    if (!this.GPh) {
      this.GPh = true;
      this.OPh = this.FbDataInternal.destructibleType();
    }
    return this.OPh;
  }
  get CollectType() {
    if (!this.FPh) {
      this.FPh = true;
      this.NPh = this.FbDataInternal.collectType();
    }
    return this.NPh;
  }
  get NpcType() {
    if (!this.VPh) {
      this.VPh = true;
      this.jPh = this.FbDataInternal.npcType();
    }
    return this.jPh;
  }
  get AnimalType() {
    if (!this.HPh) {
      this.HPh = true;
      this.WPh = this.FbDataInternal.animalType();
    }
    return this.WPh;
  }
  get BulletPenetrationType() {
    if (!this.QPh) {
      this.QPh = true;
      this.KPh = this.FbDataInternal.bulletPenetrationType();
    }
    return this.KPh;
  }
  get MechanismType() {
    if (!this.$Ph) {
      this.$Ph = true;
      this.XPh = this.FbDataInternal.mechanismType();
    }
    return this.XPh;
  }
  get InhaledItemType() {
    if (!this.YPh) {
      this.YPh = true;
      this.zPh = this.FbDataInternal.inhaledItemType();
    }
    return this.zPh;
  }
  get PullStatueMatchType() {
    if (!this.JPh) {
      this.JPh = true;
      this.ZPh = this.FbDataInternal.pullStatueMatchType();
    }
    return this.ZPh;
  }
  get VehicleType() {
    if (!this.AXh) {
      this.AXh = true;
      this.xXh = this.FbDataInternal.vehicleType();
    }
    return this.xXh;
  }
  get FishingMechanismType() {
    if (!this.cr_) {
      this.cr_ = true;
      this.ur_ = this.FbDataInternal.fishingMechanismType();
    }
    return this.ur_;
  }
}
exports.FbEntityCategory = FbEntityCategory;
//# sourceMappingURL=FbEntityCategory.js.map