"use strict";

var __decorate = this && this.__decorate || function (i, l, e, a) {
  var S;
  var t = arguments.length;
  var n = t < 3 ? l : a === null ? a = Object.getOwnPropertyDescriptor(l, e) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(i, l, e, a);
  } else {
    for (var c = i.length - 1; c >= 0; c--) {
      if (S = i[c]) {
        n = (t < 3 ? S(n) : t > 3 ? S(l, e, n) : S(l, e)) || n;
      }
    }
  }
  if (t > 3 && n) {
    Object.defineProperty(l, e, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSpecialSkillComponent = undefined;
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RoleDefine_1 = require("../../../../../Module/RoleUi/RoleDefine");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const SpecialSkillAogusita_1 = require("./SpecialSkill/SpecialSkillAogusita");
const SpecialSkillBuling_1 = require("./SpecialSkill/SpecialSkillBuling");
const SpecialSkillFuLuoLuo_1 = require("./SpecialSkill/SpecialSkillFuLuoLuo");
const SpecialSkillJiabeilina_1 = require("./SpecialSkill/SpecialSkillJiabeilina");
const SpecialSkillKanteleila_1 = require("./SpecialSkill/SpecialSkillKanteleila");
const SpecialSkillKatixiya_1 = require("./SpecialSkill/SpecialSkillKatixiya");
const SpecialSkillLinnai_1 = require("./SpecialSkill/SpecialSkillLinnai");
const SpecialSkillLuPa_1 = require("./SpecialSkill/SpecialSkillLuPa");
const SpecialSkillXiaKong_1 = require("./SpecialSkill/SpecialSkillXiaKong");
const SpecialSkillZheZhi_1 = require("./SpecialSkill/SpecialSkillZheZhi");
const specialSkillTypes = new Map([[1105, SpecialSkillZheZhi_1.SpecialSkillZheZhi], [1607, SpecialSkillKanteleila_1.SpecialSkillKanteleila], [1407, SpecialSkillXiaKong_1.SpecialSkillXiaKong], [1207, SpecialSkillLuPa_1.SpecialSkillLuPa], [1409, SpecialSkillKatixiya_1.SpecialSkillKatixiya], [1608, SpecialSkillFuLuoLuo_1.SpecialSkillFuLuoLuo], [1306, SpecialSkillAogusita_1.SpecialSkillAogusita], [1208, SpecialSkillJiabeilina_1.SpecialSkillJiabeilina], [1509, SpecialSkillLinnai_1.SpecialSkillLinnai], [1307, SpecialSkillBuling_1.SpecialSkillBuling]]);
let CharacterSpecialSkillComponent = class CharacterSpecialSkillComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.SpecialSkill = undefined;
  }
  OnStart() {
    var i = this.Entity.GetComponent(0);
    let l = i.GetPbDataId();
    if (i?.IsRole() && l && l > RoleDefine_1.ROBOT_DATA_MIN_ID && ConfigManager_1.ConfigManager.RoleConfig) {
      if (i = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(l)) {
        l = i.ParentId;
      } else {
        CombatLog_1.CombatLog.Error("Skill", this.Entity, "无法找到试用角色数据", ["pbDataId", l]);
      }
    }
    i = specialSkillTypes.get(l);
    if (i) {
      this.SpecialSkill = i.Spawn(this);
      this.SpecialSkill.OnStart();
    }
    return true;
  }
  OnActivate() {
    this.SpecialSkill?.OnActivate();
  }
  OnEnd() {
    this.SpecialSkill?.OnEnd();
    return true;
  }
  OnTick(i) {
    this.SpecialSkill?.OnTick(i);
  }
  OnEnable() {
    this.SpecialSkill?.OnEnable();
  }
  OnDisable() {
    this.SpecialSkill?.OnDisable();
  }
  static SetOptimizeEnable(i, l) {
    specialSkillTypes.get(i)?.SetOptimizeEnable(l);
  }
};
CharacterSpecialSkillComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(278)], CharacterSpecialSkillComponent);
exports.CharacterSpecialSkillComponent = CharacterSpecialSkillComponent; //# sourceMappingURL=CharacterSpecialSkillComponent.js.map