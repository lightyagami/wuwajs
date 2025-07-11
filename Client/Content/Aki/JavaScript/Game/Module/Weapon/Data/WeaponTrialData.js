"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponTrialData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const WeaponSkinDefine_1 = require("../../Skin/Tab/Weapon/WeaponSkinDefine");
const WeaponDataBase_1 = require("./WeaponDataBase");
class WeaponTrialData extends WeaponDataBase_1.WeaponDataBase {
  constructor() {
    super(...arguments);
    this.TrialId = 0;
    this.TrialConfig = undefined;
    this.FullLevelWeaponData = undefined;
    this.RoleId = 0;
    this.BreachLevel = 0;
  }
  SetTrialId(e, t = true) {
    this.TrialId = e;
    this.TrialConfig = ConfigManager_1.ConfigManager.WeaponConfig.GetTrialWeaponConfig(this.TrialId);
    this.InitWeaponBreachLevel();
    if (t) {
      this.InitFullLevelWeaponData();
    } else {
      this.FullLevelWeaponData = undefined;
    }
  }
  InitWeaponBreachLevel() {
    var e = this.GetBreachConfigList();
    var t = this.GetLevel();
    for (const a of e) {
      if (t <= a.LevelLimit) {
        this.BreachLevel = a.Level;
        break;
      }
    }
  }
  InitFullLevelWeaponData() {
    var e = this.TrialConfig.FullLevelTrialId;
    if (!(e <= 0)) {
      if (e = ConfigManager_1.ConfigManager.WeaponConfig.GetTrialWeaponConfig(e)) {
        this.FullLevelWeaponData = new WeaponTrialData();
        this.FullLevelWeaponData.SetTrialId(e.Id, false);
      } else {
        this.FullLevelWeaponData = undefined;
      }
    }
  }
  GetItemId() {
    return this.TrialConfig.WeaponId;
  }
  GetSkinId() {
    if (this.TrialConfig.WeaponSkinId > 0) {
      return this.TrialConfig.WeaponSkinId;
    } else {
      return WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID;
    }
  }
  GetLevel() {
    return this.TrialConfig.WeaponLevel;
  }
  GetResonanceLevel() {
    return this.TrialConfig.WeaponResonanceLevel;
  }
  GetBreachLevel() {
    return this.BreachLevel;
  }
  HasRole() {
    return this.RoleId !== 0;
  }
  SetRoleId(e) {
    this.RoleId = e;
  }
  GetRoleId() {
    return this.RoleId;
  }
  IsTrial() {
    return true;
  }
  CanGoBreach() {
    return false;
  }
  GetTrialConfig() {
    return this.TrialConfig;
  }
  GetFullLevelWeaponData() {
    return this.FullLevelWeaponData;
  }
}
exports.WeaponTrialData = WeaponTrialData;
//# sourceMappingURL=WeaponTrialData.js.map