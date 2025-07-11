"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcConfigModel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const IGlobal_1 = require("../../../../../UniverseEditor/Interface/IGlobal");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
class NpcConfigModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.jZ = undefined;
  }
  OnInit() {
    this.XZ();
    return true;
  }
  XZ() {
    this.jZ = new Map();
    let e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.MontageConfigPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.MontageConfigPath);
    }
    var t = (0, puerts_1.$ref)("");
    UE.KuroStaticLibrary.LoadFileToString(t, e);
    if (t = (0, puerts_1.$unref)(t)) {
      for (const r of JSON.parse(t).Montages) {
        this.jZ.set(r.Id, r);
      }
    }
  }
  GetMontageConfig(e) {
    return this.jZ.get(e);
  }
}
exports.NpcConfigModel = NpcConfigModel;
//# sourceMappingURL=NpcConfigModel.js.map