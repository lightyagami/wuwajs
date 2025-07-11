"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBaseInfoComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCustomAoizRadius_1 = require("./FbCustomAoizRadius");
const FbEntityCategory_1 = require("./FbEntityCategory");
const FbEntityGravityConfig_1 = require("./FbEntityGravityConfig");
const FbEntityScanFunction_1 = require("./FbEntityScanFunction");
const FbHeadInfoChangeData_1 = require("./FbHeadInfoChangeData");
const FbHeadStateViewConfig_1 = require("./FbHeadStateViewConfig");
const FbFixProcessor_1 = require("../FixProcessor/FbFixProcessor");
class FbBaseInfoComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.bwh = false;
    this.Lwh = undefined;
    this.Awh = false;
    this.xwh = false;
    this.Rwh = false;
    this.wwh = undefined;
    this.Pwh = false;
    this.Uwh = undefined;
    this.Dwh = false;
    this.Bwh = 0;
    this.qwh = false;
    this.kwh = undefined;
    this.Gwh = false;
    this.Owh = undefined;
    this.Fwh = false;
    this.Nwh = undefined;
    this.Mb1 = false;
    this.Eb1 = false;
    this.Vwh = false;
    this.jwh = undefined;
    this.Hwh = false;
    this.Wwh = 0;
    this.Qwh = false;
    this.Kwh = 0;
    this.$wh = false;
    this.Xwh = undefined;
    this.Ywh = false;
    this.zwh = undefined;
    this.Jwh = false;
    this.Zwh = 0;
    this.ePh = false;
    this.tPh = 0;
    this.iPh = false;
    this.rPh = undefined;
    this.oPh = false;
    this.nPh = false;
    this.sPh = false;
    this.aPh = undefined;
    this.hPh = false;
    this.lPh = undefined;
    this._Ph = false;
    this.cPh = undefined;
    this.uPh = false;
    this.dPh = false;
    this.Kq_ = false;
    this.Xq_ = undefined;
    this.mPh = false;
    this.CPh = undefined;
    this.gPh = false;
    this.fPh = undefined;
    this.pPh = false;
    this.vPh = undefined;
    this.yPh = false;
    this.SPh = undefined;
    this.NZ_ = false;
    this.VZ_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBaseInfoComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get TidName() {
    if (!this.bwh) {
      this.bwh = true;
      this.Lwh = this.FbDataInternal.tidName();
    }
    return this.Lwh;
  }
  get IsShowNameOnHead() {
    if (!this.Awh) {
      this.Awh = true;
      this.xwh = this.FbDataInternal.isShowNameOnHead();
    }
    return this.xwh;
  }
  get Category() {
    if (!this.Rwh) {
      this.Rwh = true;
      this.wwh = FbEntityCategory_1.FbEntityCategory.Create(this.FbDataInternal.category());
    }
    return this.wwh;
  }
  get ScanFunction() {
    if (!this.Pwh) {
      this.Pwh = true;
      this.Uwh = FbEntityScanFunction_1.FbEntityScanFunction.Create(this.FbDataInternal.scanFunction());
    }
    return this.Uwh;
  }
  get HeadInfo() {
    if (!this.Dwh) {
      this.Dwh = true;
      this.Bwh = this.FbDataInternal.headInfo();
    }
    return this.Bwh;
  }
  get Camp() {
    if (!this.qwh) {
      this.qwh = true;
      this.kwh = this.FbDataInternal.camp();
    }
    return this.kwh;
  }
  get AoiLayer() {
    if (!this.Gwh) {
      this.Gwh = true;
      this.Owh = this.FbDataInternal.aoiLayer();
    }
    return this.Owh;
  }
  get AoiZRadius() {
    if (!this.Fwh) {
      this.Fwh = true;
      this.Nwh = this.FbDataInternal.aoiZRadius();
    }
    return this.Nwh;
  }
  get IsAoiFitterPlatform() {
    if (!this.Mb1) {
      this.Mb1 = true;
      this.Eb1 = this.FbDataInternal.isAoiFitterPlatform();
    }
    return this.Eb1;
  }
  get CustomAoiZRadius() {
    if (!this.Vwh) {
      this.Vwh = true;
      this.jwh = FbCustomAoizRadius_1.FbCustomAoizRadius.Create(this.FbDataInternal.customAoiZRadius());
    }
    return this.jwh;
  }
  get MapIcon() {
    if (!this.Hwh) {
      this.Hwh = true;
      this.Wwh = this.FbDataInternal.mapIcon();
    }
    return this.Wwh;
  }
  get PackId() {
    if (!this.Qwh) {
      this.Qwh = true;
      this.Kwh = this.FbDataInternal.packId();
    }
    return this.Kwh;
  }
  get Occupation() {
    if (!this.$wh) {
      this.$wh = true;
      this.Xwh = this.FbDataInternal.occupation();
    }
    return this.Xwh;
  }
  get HeadStateViewConfig() {
    if (!this.Ywh) {
      this.Ywh = true;
      this.zwh = FbHeadStateViewConfig_1.FbHeadStateViewConfig.Create(this.FbDataInternal.headStateViewConfig());
    }
    return this.zwh;
  }
  get EntityPropertyId() {
    if (!this.Jwh) {
      this.Jwh = true;
      this.Zwh = this.FbDataInternal.entityPropertyId();
    }
    return this.Zwh;
  }
  get FocusPriority() {
    if (!this.ePh) {
      this.ePh = true;
      this.tPh = this.FbDataInternal.focusPriority();
    }
    return this.tPh;
  }
  get OnlineInteractType() {
    if (!this.iPh) {
      this.iPh = true;
      this.rPh = this.FbDataInternal.onlineInteractType();
    }
    return this.rPh;
  }
  get NotAllowHidedByTargetRange() {
    if (!this.oPh) {
      this.oPh = true;
      this.nPh = this.FbDataInternal.notAllowHidedByTargetRange();
    }
    return this.nPh;
  }
  get LowerNpcDensity() {
    if (!this.sPh) {
      this.sPh = true;
      this.aPh = this.FbDataInternal.lowerNpcDensity();
    }
    return this.aPh;
  }
  get DataLayers() {
    if (!this.hPh) {
      this.hPh = true;
      this.lPh = new Array();
      var i = this.FbDataInternal.dataLayersLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.lPh.push(this.FbDataInternal.dataLayers(t));
        }
      }
    }
    return this.lPh;
  }
  get ChildEntityIds() {
    if (!this._Ph) {
      this._Ph = true;
      this.cPh = new Array();
      var i = this.FbDataInternal.childEntityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.cPh.push(this.FbDataInternal.childEntityIds(t));
        }
      }
    }
    return this.cPh;
  }
  get IsOnlineStandalone() {
    if (!this.uPh) {
      this.uPh = true;
      this.dPh = this.FbDataInternal.isOnlineStandalone();
    }
    return this.dPh;
  }
  get SpecifiedOnlineStandaloneParentUids() {
    if (!this.Kq_) {
      this.Kq_ = true;
      this.Xq_ = new Array();
      var i = this.FbDataInternal.specifiedOnlineStandaloneParentUidsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.Xq_.push(this.FbDataInternal.specifiedOnlineStandaloneParentUids(t));
        }
      }
    }
    return this.Xq_;
  }
  get FixProcessor() {
    if (!this.mPh) {
      this.mPh = true;
      this.CPh = FbFixProcessor_1.FbFixProcessor.Create(this.FbDataInternal.fixProcessor());
    }
    return this.CPh;
  }
  get EntityUpdateStrategy() {
    if (!this.gPh) {
      this.gPh = true;
      this.fPh = this.FbDataInternal.entityUpdateStrategy();
    }
    return this.fPh;
  }
  get TimeScaleModifyStrategy() {
    if (!this.pPh) {
      this.pPh = true;
      this.vPh = this.FbDataInternal.timeScaleModifyStrategy();
    }
    return this.vPh;
  }
  get GravityConfig() {
    if (!this.yPh) {
      this.yPh = true;
      this.SPh = FbEntityGravityConfig_1.FbEntityGravityConfig.Create(this.FbDataInternal.gravityConfig());
    }
    return this.SPh;
  }
  get HeadInfoChangeConfig() {
    if (!this.NZ_) {
      this.NZ_ = true;
      this.VZ_ = new Array();
      var i = this.FbDataInternal.headInfoChangeConfigLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.headInfoChangeConfig(t, new fb_component_1.HeadInfoChangeData());
          this.VZ_.push(FbHeadInfoChangeData_1.FbHeadInfoChangeData.Create(s));
        }
      }
    }
    return this.VZ_;
  }
}
exports.FbBaseInfoComponent = FbBaseInfoComponent;
//# sourceMappingURL=FbBaseInfoComponent.js.map