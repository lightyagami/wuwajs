"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryWeaponSuitData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class HonamiStoryWeaponSuitData {
  constructor(t) {
    this.Name = "";
    this.Desc = "";
    this.DescSimple = "";
    this.Args = [];
    this.ArgsSimple = [];
    this.WeaponPluginType = 0;
    this.Enhance = 0;
    this.NeedNum = 0;
    t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetWeaponSuit(t);
    this.Name = t.Name;
    this.Desc = t.Desc;
    this.Args = t.DescArgs;
    this.DescSimple = t.DescSimple;
    this.ArgsSimple = t.DescSimpleArgs;
    this.WeaponPluginType = t.WeaponPluginType;
    this.Enhance = t.EnhanceLevel;
    this.NeedNum = t.NeedNum;
  }
}
exports.HonamiStoryWeaponSuitData = HonamiStoryWeaponSuitData;
//# sourceMappingURL=HonamiStoryWeaponSuitData.js.map