"use strict";
var __decorate = this && this.__decorate || function(e, t, o, i) {
  var r, n = arguments.length,
    l = n < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(e, t, o, i);
  else
    for (var s = e.length - 1; 0 <= s; s--)(r = e[s]) && (l = (n < 3 ? r(l) : 3 < n ? r(t, o, l) : r(t, o)) || l);
  return 3 < n && l && Object.defineProperty(t, o, l), l
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RoleGrowComponent = void 0;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RoleSkillData_1 = require("../../../../Module/RoleUi/RoleData/Module/RoleSkillData");
let RoleGrowComponent = class RoleGrowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.Xte = void 0, this.aCo = void 0, this.ion = 0
  }
  OnStart() {
    this.Xte = this.Entity.CheckGetComponent(205), this.ron();
    var e = this.Entity.CheckGetComponent(0),
      t = e.GetPlayerId(),
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t,
      o = e.GetRoleId();
    return this.ion = e.GetRoleConfig().WeaponType, this.aCo = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o, t), !0
  }
  OnEnd() {
    return !0
  }
  ron() {
    this.Xte.AddTag(1098729489), this.Xte.AddTag(-8769906)
  }
  GetWeaponType() {
    return this.ion || 0
  }
  GetSkillLevelBySkillInfoId(e) {
    return this.aCo ? this.aCo.GetSkillData().GetReferencedSkillLevel(e, RoleSkillData_1.ERoleSkillReferenceType.SkillInfo) : 0
  }
  GetSkillLevelByBuffId(e) {
    return this.aCo ? this.aCo.GetSkillData().GetReferencedSkillLevel(e, RoleSkillData_1.ERoleSkillReferenceType.Buff) : 0
  }
  GetSkillLevelByDamageId(e) {
    return this.aCo ? this.aCo.GetSkillData().GetReferencedSkillLevel(e, RoleSkillData_1.ERoleSkillReferenceType.Damage) : 0
  }
};
RoleGrowComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(95)], RoleGrowComponent), exports.RoleGrowComponent = RoleGrowComponent;
//# sourceMappingURL=RoleGrowComponent.js.map