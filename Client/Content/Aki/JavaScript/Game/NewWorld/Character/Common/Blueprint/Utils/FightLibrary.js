"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightLibrary = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const GlobalData_1 = require("../../../../../GlobalData");
const CampUtils_1 = require("./CampUtils");
class FightLibrary {
  static Init() {
    var t = UE.DataTableUtil_C.LoadAllCampConfigs(GlobalData_1.GlobalData.GameInstance);
    for (let r = CampUtils_1.CampUtils.Camp.length = 0; r < t.Num(); ++r) {
      var e = t.Get(r);
      var a = new Array();
      CampUtils_1.CampUtils.Camp.push(a);
      for (let r = 0; r < e.Value.Num(); ++r) {
        var i = e.Value.Get(r);
        a.push(i === 0 ? 2 : i === 1 ? 1 : 0);
      }
    }
  }
  static GetHitMapConfig(r) {
    var t = (0, puerts_1.$ref)(false);
    var e = (0, puerts_1.$ref)(undefined);
    UE.DataTableUtil_C.LoadHitMapConfig(r, GlobalData_1.GlobalData.GameInstance, e, t);
    if ((0, puerts_1.$unref)(t)) {
      return (0, puerts_1.$unref)(e);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Config", 4, "找不到受击映射配置", ["selfCamp:", r.toString()]);
    }
  }
}
exports.FightLibrary = FightLibrary;
//# sourceMappingURL=FightLibrary.js.map