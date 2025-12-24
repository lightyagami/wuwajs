"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryEquipItemData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const HonamiStoryItemDataBase_1 = require("./HonamiStoryItemDataBase");
class HonamiStoryEquipItemData extends HonamiStoryItemDataBase_1.HonamiStoryItemDataBase {
  constructor() {
    super(...arguments);
    this.MainPropLibraryId = -1;
    this.OriBuffTempId = [];
    this.ChildBuffTempId = [];
    this.GroupId = -1;
    this.RoleId = -1;
    this.RoleEnhance = -1;
    this.BaseEnhance = -1;
    this.WeaponTag = -1;
    this.WeaponEnhance = -1;
  }
  Init(t) {
    super.Init(t);
    var t = t.U$d;
    if (t) {
      this.MainPropLibraryId = t.kmd;
      this.OriBuffTempId = t.Omd;
      this.ChildBuffTempId = t.qmd;
      t = this.GetConfig();
      this.RoleId = t.RoleId;
      this.GroupId = t.GroupId;
      this.BaseEnhance = t.EnhanceLevel;
      this.WeaponTag = t.Tag;
      this.WeaponEnhance = t.TagEnhanceLevel;
      this.RoleEnhance = t.RoleEnhanceLevel;
    }
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryEquip(this.GetItemId());
  }
  GetRoleId() {
    return this.RoleId;
  }
  GetGroupId() {
    return this.GroupId;
  }
  GetBaseEnhance() {
    return this.BaseEnhance;
  }
  GetWeaponTag() {
    return this.WeaponTag;
  }
  GetWeaponEnhance() {
    return this.WeaponEnhance;
  }
  GetRoleEnhance() {
    return this.RoleEnhance;
  }
  GetMainPropList() {
    return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryPropLibrary(this.MainPropLibraryId);
  }
  GetOriBuffDescList() {
    var t = [];
    for (const i of this.OriBuffTempId) {
      var e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryBuffTempDescFromLibrary(i);
      if (e) {
        t.push(e);
      }
    }
    return t;
  }
  GetBuffTempIdList(t = false) {
    var e = [];
    var i = this.GetConfig();
    var r = i.RoleId === 0 ? undefined : i.RoleId;
    var s = i.Tag === 0 ? undefined : i.Tag;
    for (const n of this.OriBuffTempId) {
      var a = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryBuffTempLibrary(n);
      if (a) {
        e.push({
          BuffId: a,
          TagId: s,
          RoleId: r,
          FromTeamView: t
        });
      }
    }
    return e;
  }
  GetChildBuffDescList() {
    var t = [];
    for (const i of this.ChildBuffTempId) {
      var e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryBuffTempDescFromLibrary(i);
      if (e) {
        t.push(e);
      }
    }
    return t;
  }
}
exports.HonamiStoryEquipItemData = HonamiStoryEquipItemData;
//# sourceMappingURL=HonamiStoryEquipItemData.js.map