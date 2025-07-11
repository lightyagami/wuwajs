"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDynamicEntityMatch = undefined;
const FbEntityCategory_1 = require("./FbEntityCategory");
const FbEntityState_1 = require("./FbEntityState");
class FbDynamicEntityMatch {
  constructor(t) {
    this.FbDataInternal = t;
    this.Rwh = false;
    this.wwh = undefined;
    this.yFh = false;
    this.SFh = undefined;
    this.V1h = false;
    this.j1h = undefined;
    this.Bch = false;
    this.Cbo = undefined;
    this.MFh = false;
    this.EFh = undefined;
    this.IFh = false;
    this.TFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDynamicEntityMatch(t);
    }
  }
  get Category() {
    if (!this.Rwh) {
      this.Rwh = true;
      this.wwh = FbEntityCategory_1.FbEntityCategory.Create(this.FbDataInternal.category());
    }
    return this.wwh;
  }
  get CategoryType() {
    if (!this.yFh) {
      this.yFh = true;
      this.SFh = this.FbDataInternal.categoryType();
    }
    return this.SFh;
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var i = this.FbDataInternal.entityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = FbEntityState_1.FbEntityState.Create(this.FbDataInternal.state());
    }
    return this.Cbo;
  }
  get HasProperty() {
    if (!this.MFh) {
      this.MFh = true;
      this.EFh = new Array();
      var i = this.FbDataInternal.hasPropertyLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.EFh.push(this.FbDataInternal.hasProperty(t));
        }
      }
    }
    return this.EFh;
  }
  get NoProperty() {
    if (!this.IFh) {
      this.IFh = true;
      this.TFh = new Array();
      var i = this.FbDataInternal.noPropertyLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.TFh.push(this.FbDataInternal.noProperty(t));
        }
      }
    }
    return this.TFh;
  }
}
exports.FbDynamicEntityMatch = FbDynamicEntityMatch;
//# sourceMappingURL=FbDynamicEntityMatch.js.map