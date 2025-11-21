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
    this.nud = [];
    this.byd = [];
    this.lud = undefined;
    this._ud = undefined;
    this.uud = undefined;
    this.cud = undefined;
    this.HEd = {
      DevPropsList: []
    };
    this.Rgm = new Set();
    this.Ngm = new Map();
    this.Vgm = new Map();
    this.evm = new Map();
  }
  InitHotRoleDataList() {
    this.byd.length = 0;
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
    this.byd.push(...a);
    this.wyd();
  }
  wyd() {
    this.byd.sort((e, t) => {
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
          return [t, ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id) !== undefined ? 1 : 0, -e.Level, e.Id];
        } else {
          return [t];
        }
      };
      var i = o(e);
      var r = o(t);
      for (let e = 0; e < Math.max(i.length, r.length); e++) {
        var l = (i[e] ?? 0) - (r[e] ?? 0);
        if (l != 0) {
          return l;
        }
      }
      return 0;
    });
  }
  SetRoleDataList(e) {
    this.nud = e;
  }
  InitAllDevItemDataByRoleId(e) {
    this.lud = RoleDevRoleViewItemDataFactory_1.RoleDevRoleViewItemDataFactory.Create(e);
    this._ud = RoleDevWeaponViewItemDataFactory_1.RoleDevWeaponViewItemDataFactory.Create(e, this);
    this.cud = RoleDevSkillViewItemDataFactory_1.RoleDevSkillViewItemDataFactory.Create(e, this);
    this.uud = RoleDevPhantomViewItemDataFactory_1.RoleDevPhantomViewItemDataFactory.Create(e, this);
    this.Rgm.add(e);
  }
  GetRoleSkillPlanState(e) {
    var t = this.Ngm.get(e);
    if (t === undefined) {
      return RoleDevUtils_1.RoleDevUtils.GetDefaultSkillPlanByRoleId(e);
    } else {
      return t;
    }
  }
  SetRoleSkillPlanState(e, t) {
    this.Ngm.set(e, t);
  }
  GetRoleWeaponTabType(e) {
    e = this.Vgm.get(e);
    if (e === undefined) {
      return 0;
    } else {
      return e;
    }
  }
  SetRoleWeaponTabType(e, t) {
    this.Vgm.set(e, t);
  }
  GetRoleRecommendFetterGroupId(e) {
    e = this.evm.get(e);
    if (e === undefined) {
      return 0;
    } else {
      return e;
    }
  }
  SetRoleRecommendFetterGroupId(e, t) {
    this.evm.set(e, t);
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
    return this.Rgm.has(e);
  }
}
exports.RoleDevViewModel = RoleDevViewModel;
//# sourceMappingURL=RoleDevViewModel.js.map