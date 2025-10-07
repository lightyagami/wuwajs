"use strict";

var __decorate = this && this.__decorate || function (e, i, l, a) {
  var t;
  var S = arguments.length;
  var n = S < 3 ? i : a === null ? a = Object.getOwnPropertyDescriptor(i, l) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, i, l, a);
  } else {
    for (var o = e.length - 1; o >= 0; o--) {
      if (t = e[o]) {
        n = (S < 3 ? t(n) : S > 3 ? t(i, l, n) : t(i, l)) || n;
      }
    }
  }
  if (S > 3 && n) {
    Object.defineProperty(i, l, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSpecialSkillComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RoleDefine_1 = require("../../../../../Module/RoleUi/RoleDefine");
const SpecialSkillAogusita_1 = require("./SpecialSkill/SpecialSkillAogusita");
const SpecialSkillFuLuoLuo_1 = require("./SpecialSkill/SpecialSkillFuLuoLuo");
const SpecialSkillJiabeilina_1 = require("./SpecialSkill/SpecialSkillJiabeilina");
const SpecialSkillKanteleila_1 = require("./SpecialSkill/SpecialSkillKanteleila");
const SpecialSkillKatixiya_1 = require("./SpecialSkill/SpecialSkillKatixiya");
const SpecialSkillLuPa_1 = require("./SpecialSkill/SpecialSkillLuPa");
const SpecialSkillXiaKong_1 = require("./SpecialSkill/SpecialSkillXiaKong");
const SpecialSkillZheZhi_1 = require("./SpecialSkill/SpecialSkillZheZhi");
const specialSkillTypes = new Map([[1105, SpecialSkillZheZhi_1.SpecialSkillZheZhi], [1607, SpecialSkillKanteleila_1.SpecialSkillKanteleila], [1407, SpecialSkillXiaKong_1.SpecialSkillXiaKong], [1207, SpecialSkillLuPa_1.SpecialSkillLuPa], [1409, SpecialSkillKatixiya_1.SpecialSkillKatixiya], [1608, SpecialSkillFuLuoLuo_1.SpecialSkillFuLuoLuo], [1306, SpecialSkillAogusita_1.SpecialSkillAogusita], [1208, SpecialSkillJiabeilina_1.SpecialSkillJiabeilina]]);
let CharacterSpecialSkillComponent = class CharacterSpecialSkillComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.SpecialSkill = undefined;
  }
  OnStart() {
    var e = this.Entity.GetComponent(0);
    let i = e.GetPbDataId();
    if (e?.IsRole() && i && i > RoleDefine_1.ROBOT_DATA_MIN_ID && ConfigManager_1.ConfigManager.RoleConfig) {
      if (e = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(i)) {
        i = e.ParentId;
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 4, "无法找到试用角色数据", ["pbDataId", i]);
      }
    }
    e = specialSkillTypes.get(i);
    if (e) {
      this.SpecialSkill = e.Spawn(this);
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
  OnTick(e) {
    this.SpecialSkill?.OnTick(e);
  }
  OnEnable() {
    this.SpecialSkill?.OnEnable();
  }
  OnDisable() {
    this.SpecialSkill?.OnDisable();
  }
  static SetOptimizeEnable(e, i) {
    specialSkillTypes.get(e)?.SetOptimizeEnable(i);
  }
};
CharacterSpecialSkillComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(256)], CharacterSpecialSkillComponent);
exports.CharacterSpecialSkillComponent = CharacterSpecialSkillComponent; //# sourceMappingURL=CharacterSpecialSkillComponent.js.map