"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksSoftDrinkData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class DrinksSoftDrinkData {
  constructor(t) {
    this.Id = t;
    this.CountMap = new Map();
    this.FlavorRange = new Map();
  }
  UpdateConfig(t, r) {
    this.CountMap.set(t, r);
  }
  GetFlavorRange() {
    if (!(this.FlavorRange.size > 0)) {
      for (var [, t] of this.CountMap) {
        var r;
        var s;
        var e;
        var i;
        for ([r, s] of ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(t).Flavor) {
          if (this.FlavorRange.has(r)) {
            [e, i] = this.FlavorRange.get(r);
            if (s < e) {
              this.FlavorRange.set(r, [s, i]);
            } else if (s > i) {
              this.FlavorRange.set(r, [e, s]);
            }
          } else {
            this.FlavorRange.set(r, [s, s]);
          }
        }
      }
    }
    return this.FlavorRange;
  }
  GetMenuBaseId() {
    return this.CountMap.get(1);
  }
  GetAllBaseId() {
    var t;
    var r;
    var s = this.CountMap.size === 2 ? [0, 0] : [0, 0, 0];
    for ([t, r] of this.CountMap) {
      s[t - 1] = r;
    }
    return s;
  }
}
exports.DrinksSoftDrinkData = DrinksSoftDrinkData;
//# sourceMappingURL=DrinksSoftDrinkData.js.map