"use strict";

var __decorate = this && this.__decorate || function (e, t, o, i) {
  var r;
  var n = arguments.length;
  var l = n < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(e, t, o, i);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (r = e[s]) {
        l = (n < 3 ? r(l) : n > 3 ? r(t, o, l) : r(t, o)) || l;
      }
    }
  }
  if (n > 3 && l) {
    Object.defineProperty(t, o, l);
  }
  return l;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleGrowComponent = undefined;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleSkillData_1 = require("../../../../Module/RoleUi/RoleData/Module/RoleSkillData");
let RoleGrowComponent = class RoleGrowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Xte = undefined;
    this.aCo = undefined;
    this.ion = 0;
  }
  OnStart() {
    this.Xte = this.Entity.CheckGetComponent(217);
    this.ron();
    var e = this.Entity.CheckGetComponent(0);
    var t = e.GetPlayerId();
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t;
    var o = e.GetRoleId();
    this.ion = e.GetRoleConfig().WeaponType;
    this.aCo = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o, t);
    return true;
  }
  OnEnd() {
    return true;
  }
  ron() {
    this.Xte.AddTag(1098729489);
    this.Xte.AddTag(-8769906);
  }
  GetWeaponType() {
    return this.ion || 0;
  }
  GetSkillLevelBySkillInfoId(e) {
    if (this.aCo) {
      return this.aCo.GetSkillData().GetReferencedSkillLevel(e, RoleSkillData_1.ERoleSkillReferenceType.SkillInfo);
    } else {
      return 0;
    }
  }
  GetSkillLevelByBuffId(e) {
    if (this.aCo) {
      return this.aCo.GetSkillData().GetReferencedSkillLevel(e, RoleSkillData_1.ERoleSkillReferenceType.Buff);
    } else {
      return 0;
    }
  }
  GetSkillLevelByDamageId(e) {
    if (this.aCo) {
      return this.aCo.GetSkillData().GetReferencedSkillLevel(e, RoleSkillData_1.ERoleSkillReferenceType.Damage);
    } else {
      return 0;
    }
  }
};
RoleGrowComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(103)], RoleGrowComponent);
exports.RoleGrowComponent = RoleGrowComponent; //# sourceMappingURL=RoleGrowComponent.js.map