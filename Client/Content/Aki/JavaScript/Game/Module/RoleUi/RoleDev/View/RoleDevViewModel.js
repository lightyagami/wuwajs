"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevViewModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const RoleDevPhantomViewItemDataFactory_1 = require("../PhantomPage/Data/RoleDevPhantomViewItemDataFactory");
const RoleDevUtils_1 = require("../RoleDevUtils");
const RoleDisplayModelFactory_1 = require("../RoleDisplayModelFactory");
const RoleDevRoleViewItemDataFactory_1 = require("../RolePage/Data/RoleDevRoleViewItemDataFactory");
const RoleDevSkillViewItemDataFactory_1 = require("../SkillPage/Data/RoleDevSkillViewItemDataFactory");
const RoleDevWeaponViewItemDataFactory_1 = require("../WeaponPage/Data/RoleDevWeaponViewItemDataFactory");
class RoleDevViewModel {
  constructor() {
    this.nud = [];
    this.byd = [];
    this.lud = undefined;
    this._ud = undefined;
    this.uud = undefined;
    this.cud = undefined;
    this.HEd = {
      DevPropsList: []
    };
    this.sMm = new Set();
    this.yMm = new Map();
    this.SMm = new Map();
    this.Qbm = new Map();
  }
  InitHotRoleDataList() {
    this.byd.length = 0;
    var e;
    var t;
    var o = ConfigManager_1.ConfigManager.RoleDevConfig.GetAllRoleDevProsListConfig();
    for (const a of o) {
      if (a.TypeId !== 6 && a.TypeId !== 0 && (e = RoleDevUtils_1.RoleDevUtils.IsProspectTimeValid(a.Id), t = RoleDevUtils_1.RoleDevUtils.IsGachaValid(a.GachaId), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("RoleDev", 88, "角色配置信息", ["roleId", a.Id], ["typeId", a.TypeId], ["gachaId", a.GachaId], ["isForecastValid", e], ["isGachaValid", t]);
      }
    }
    o = o.filter(e => {
      var t;
      return e.TypeId !== 6 && e.TypeId !== 0 && (t = RoleDevUtils_1.RoleDevUtils.IsProspectTimeValid(e.Id), e = RoleDevUtils_1.RoleDevUtils.IsGachaValid(e.GachaId), t || e);
    }).map(e => e.Id).map(e => RoleDisplayModelFactory_1.RoleDisplayModelFactory.Instance.BuildRoleDisplayModel(e));
    this.byd.push(...o);
    this.wyd();
  }
  wyd() {
    const o = e => {
      e = ConfigManager_1.ConfigManager.RoleDevConfig?.GetRoleDevProsListConfig(e.Id);
      if (e) {
        return e.SortId;
      } else {
        return Number.MAX_SAFE_INTEGER;
      }
    };
    this.byd.sort((e, t) => o(e) - o(t));
  }
  SetRoleDataList(e) {
    this.nud = e;
  }
  InitAllDevItemDataByRoleId(e) {
    this.lud = RoleDevRoleViewItemDataFactory_1.RoleDevRoleViewItemDataFactory.Create(e);
    this._ud = RoleDevWeaponViewItemDataFactory_1.RoleDevWeaponViewItemDataFactory.Create(e, this);
    this.cud = RoleDevSkillViewItemDataFactory_1.RoleDevSkillViewItemDataFactory.Create(e, this);
    this.uud = RoleDevPhantomViewItemDataFactory_1.RoleDevPhantomViewItemDataFactory.Create(e, this);
    this.sMm.add(e);
  }
  GetRoleSkillPlanState(e) {
    var t = this.yMm.get(e);
    if (t === undefined) {
      return RoleDevUtils_1.RoleDevUtils.GetDefaultSkillPlanByRoleId(e);
    } else {
      return t;
    }
  }
  SetRoleSkillPlanState(e, t) {
    this.yMm.set(e, t);
  }
  GetRoleWeaponTabType(e) {
    e = this.SMm.get(e);
    if (e === undefined) {
      return 0;
    } else {
      return e;
    }
  }
  SetRoleWeaponTabType(e, t) {
    this.SMm.set(e, t);
  }
  GetRoleRecommendFetterGroupId(e) {
    e = this.Qbm.get(e);
    if (e === undefined) {
      return 0;
    } else {
      return e;
    }
  }
  SetRoleRecommendFetterGroupId(e, t) {
    this.Qbm.set(e, t);
  }
  InitRoleDevelopConfigData(e) {
    this.HEd = e;
  }
  get DevPropsList() {
    return this.HEd.DevPropsList;
  }
  get RoleDataList() {
    return this.nud;
  }
  get RoleDevRoleViewItemData() {
    return this.lud;
  }
  get RoleDevWeaponViewItemData() {
    return this._ud;
  }
  get RoleDevPhantomViewItemData() {
    return this.uud;
  }
  get RoleDevSkillViewItemData() {
    return this.cud;
  }
  get HotRoleDataList() {
    return this.byd;
  }
  CheckRoleIdIsCreated(e) {
    return this.sMm.has(e);
  }
}
exports.RoleDevViewModel = RoleDevViewModel;
//# sourceMappingURL=RoleDevViewModel.js.map