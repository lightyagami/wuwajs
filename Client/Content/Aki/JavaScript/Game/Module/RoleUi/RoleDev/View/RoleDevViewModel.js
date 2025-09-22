"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevViewModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleDevPhantomViewItemDataFactory_1 = require("../PhantomPage/Data/RoleDevPhantomViewItemDataFactory");
const RoleDevUtils_1 = require("../RoleDevUtils");
const RoleDisplayModelFactory_1 = require("../RoleDisplayModelFactory");
const RoleDevRoleViewItemDataFactory_1 = require("../RolePage/Data/RoleDevRoleViewItemDataFactory");
const RoleDevSkillViewItemDataFactory_1 = require("../SkillPage/Data/RoleDevSkillViewItemDataFactory");
const RoleDevWeaponViewItemDataFactory_1 = require("../WeaponPage/Data/RoleDevWeaponViewItemDataFactory");
class RoleDevViewModel {
  constructor() {
    this.Z1d = [];
    this.npd = [];
    this.rud = undefined;
    this.oud = undefined;
    this.nud = undefined;
    this.sud = undefined;
    this.ESd = {
      DevPropsList: []
    };
    this.k9d = false;
    this.O9d = 0;
  }
  InitHotRoleDataList() {
    this.npd.length = 0;
    var e;
    var t;
    var a = ConfigManager_1.ConfigManager.RoleDevConfig.GetAllRoleDevProsListConfig();
    for (const o of a) {
      if (o.TypeId !== 6 && o.TypeId !== 0 && (e = RoleDevUtils_1.RoleDevUtils.IsProspectTimeValid(o.Id), t = RoleDevUtils_1.RoleDevUtils.IsGachaValid(o.GachaId), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("RoleDev", 88, "角色配置信息", ["roleId", o.Id], ["typeId", o.TypeId], ["gachaId", o.GachaId], ["isForecastValid", e], ["isGachaValid", t]);
      }
    }
    a = a.filter(e => {
      var t;
      return e.TypeId !== 6 && e.TypeId !== 0 && (t = RoleDevUtils_1.RoleDevUtils.IsProspectTimeValid(e.Id), e = RoleDevUtils_1.RoleDevUtils.IsGachaValid(e.GachaId), t || e);
    }).map(e => e.Id).map(e => RoleDisplayModelFactory_1.RoleDisplayModelFactory.Instance.BuildRoleDisplayModel(e));
    this.npd.push(...a);
    this.apd();
  }
  apd() {
    this.npd.sort((e, t) => {
      const a = {
        [2]: 0,
        0: 1,
        1: 2,
        3: 3
      };
      var o = e => {
        var t = a[e.TypeTag] ?? 3;
        if (e.TypeTag === 0) {
          return [t, e.Id];
        } else if (e.TypeTag === 2 || e.TypeTag === 1) {
          return [t, -(ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id) !== undefined ? 1 : 0), -e.Level, e.Id];
        } else {
          return [t];
        }
      };
      var i = o(e);
      var l = o(t);
      for (let e = 0; e < Math.max(i.length, l.length); e++) {
        var r = (i[e] ?? 0) - (l[e] ?? 0);
        if (r != 0) {
          return r;
        }
      }
      return 0;
    });
  }
  SetRoleDataList(e) {
    this.Z1d = e;
  }
  InitAllDevItemDataByRoleId(e) {
    this.rud = RoleDevRoleViewItemDataFactory_1.RoleDevRoleViewItemDataFactory.Create(e);
    this.oud = RoleDevWeaponViewItemDataFactory_1.RoleDevWeaponViewItemDataFactory.Create(e);
    this.sud = RoleDevSkillViewItemDataFactory_1.RoleDevSkillViewItemDataFactory.Create(e, this);
    this.nud = RoleDevPhantomViewItemDataFactory_1.RoleDevPhantomViewItemDataFactory.Create(e);
  }
  GetCurrentRoleSkillPlanState(e) {
    if (this.O9d !== e) {
      return RoleDevUtils_1.RoleDevUtils.GetDefaultSkillPlanByRoleId(e);
    } else {
      return this.k9d;
    }
  }
  SetCurrentRoleSkillPlanState(e, t) {
    this.O9d = e;
    this.k9d = t;
  }
  InitRoleDevelopConfigData(e) {
    this.ESd = e;
  }
  get DevPropsList() {
    return this.ESd.DevPropsList;
  }
  get RoleDataList() {
    return this.Z1d;
  }
  get RoleDevRoleViewItemData() {
    return this.rud;
  }
  get RoleDevWeaponViewItemData() {
    return this.oud;
  }
  get RoleDevPhantomViewItemData() {
    return this.nud;
  }
  get RoleDevSkillViewItemData() {
    return this.sud;
  }
  get HotRoleDataList() {
    return this.npd;
  }
}
exports.RoleDevViewModel = RoleDevViewModel;
//# sourceMappingURL=RoleDevViewModel.js.map