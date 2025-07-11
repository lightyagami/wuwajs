"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiWeaponModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const AiWeaponNet_1 = require("./AiWeaponNet");
class AiWeaponModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Eje = undefined;
    this.Sje = new Map();
    this.c6_ = false;
  }
  OnInit() {
    this.Eje = new AiWeaponNet_1.AiWeaponNet();
    this.Eje.RegisterNet();
    return !(this.c6_ = false);
  }
  OnClear() {
    this.Eje.UnRegisterNet();
    return !(this.Eje = undefined);
  }
  GetStaticWeaponConfig(e) {
    return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(2, e.toString());
  }
  GetStaticWeaponModelConfigs(e, t) {
    return DataTableUtil_1.DataTableUtil.LoadAiWeaponSocketConfigs(e.toString(), t);
  }
  GetWeaponConfigByConfigId(e, t) {
    var t = t.GetComponent(0).GetPbModelConfig();
    var o = this.GetStaticWeaponModelConfigs(e, t.ModelId);
    if (!o) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 57, "Ai改变武器失败,原因Config配置错误", ["Char", t.ModelId], ["Item config id", e]);
      }
    }
    return o;
  }
  HasWeaponConfig(e, t) {
    e = e.GetComponent(0).GetPbEntityInitData();
    e = (0, IComponent_1.getComponent)(e.ComponentsData, "WeaponComponent");
    if (!e) {
      return false;
    }
    var o;
    var i;
    var t = t.GetComponent(0).GetPbModelConfig();
    if (!this.c6_) {
      this.c6_ = true;
      for ([o, i] of DataTableUtil_1.DataTableUtil.LoadAllAiWeaponSockets()) {
        if (o && i) {
          var r = i.AiModelConfig;
          var n = new Set();
          for (let e = 0; e < r.Num(); ++e) {
            var a = r.GetKey(e);
            n.add(a);
          }
          this.Sje.set(o, n);
        }
      }
    }
    return this.Sje.get(e.WeaponId).has(t.ModelId);
  }
  get Net() {
    return this.Eje;
  }
}
exports.AiWeaponModel = AiWeaponModel;
//# sourceMappingURL=AiWeaponModel.js.map