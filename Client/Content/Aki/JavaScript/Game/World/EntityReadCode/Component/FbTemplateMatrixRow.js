"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTemplateMatrixRow = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbSpawnTemplateEntityConfig_1 = require("./FbSpawnTemplateEntityConfig");
class FbTemplateMatrixRow {
  constructor(t) {
    this.FbDataInternal = t;
    this.tuh = false;
    this.iuh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTemplateMatrixRow(t);
    }
  }
  get Items() {
    if (!this.tuh) {
      this.tuh = true;
      this.iuh = new Array();
      var e = this.FbDataInternal.itemsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.items(t, new fb_component_1.SpawnTemplateEntityConfig());
          this.iuh.push(FbSpawnTemplateEntityConfig_1.FbSpawnTemplateEntityConfig.Create(i));
        }
      }
    }
    return this.iuh;
  }
}
exports.FbTemplateMatrixRow = FbTemplateMatrixRow;
//# sourceMappingURL=FbTemplateMatrixRow.js.map