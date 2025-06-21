"use strict";
var __decorate = this && this.__decorate || function(e, i, l, t) {
  var a, n = arguments.length,
    r = n < 3 ? i : null === t ? t = Object.getOwnPropertyDescriptor(i, l) : t;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, i, l, t);
  else
    for (var o = e.length - 1; 0 <= o; o--)(a = e[o]) && (r = (n < 3 ? a(r) : 3 < n ? a(i, l, r) : a(i, l)) || r);
  return 3 < n && r && Object.defineProperty(i, l, r), r
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterSpecialSkillComponent = void 0;
const Log_1 = require("../../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  RoleDefine_1 = require("../../../../../Module/RoleUi/RoleDefine"),
  SpecialSkillKanteleila_1 = require("./SpecialSkill/SpecialSkillKanteleila"),
  SpecialSkillKatixiya_1 = require("./SpecialSkill/SpecialSkillKatixiya"),
  SpecialSkillLuPa_1 = require("./SpecialSkill/SpecialSkillLuPa"),
  SpecialSkillXiaKong_1 = require("./SpecialSkill/SpecialSkillXiaKong"),
  SpecialSkillZheZhi_1 = require("./SpecialSkill/SpecialSkillZheZhi"),
  specialSkillTypes = new Map([
    [1105, SpecialSkillZheZhi_1.SpecialSkillZheZhi],
    [1607, SpecialSkillKanteleila_1.SpecialSkillKanteleila],
    [1407, SpecialSkillXiaKong_1.SpecialSkillXiaKong],
    [1207, SpecialSkillLuPa_1.SpecialSkillLuPa],
    [1409, SpecialSkillKatixiya_1.SpecialSkillKatixiya]
  ]);
let CharacterSpecialSkillComponent = class CharacterSpecialSkillComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.SpecialSkill = void 0
  }
  OnStart() {
    var e = this.Entity.GetComponent(0);
    let i = e.GetPbDataId();
    e?.IsRole() && i && i > RoleDefine_1.ROBOT_DATA_MIN_ID && ConfigManager_1.ConfigManager.RoleConfig && ((e = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(i)) ? i = e.ParentId : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 4, "无法找到试用角色数据", ["pbDataId", i]));
    e = specialSkillTypes.get(i);
    return e && (this.SpecialSkill = e.Spawn(this), this.SpecialSkill.OnStart()), !0
  }
  OnActivate() {
    this.SpecialSkill?.OnActivate()
  }
  OnEnd() {
    return this.SpecialSkill?.OnEnd(), !0
  }
  OnTick(e) {
    this.SpecialSkill?.OnTick(e)
  }
  OnEnable() {
    this.SpecialSkill?.OnEnable()
  }
  OnDisable() {
    this.SpecialSkill?.OnDisable()
  }
};
CharacterSpecialSkillComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(252)], CharacterSpecialSkillComponent), exports.CharacterSpecialSkillComponent = CharacterSpecialSkillComponent;
//# sourceMappingURL=CharacterSpecialSkillComponent.js.map