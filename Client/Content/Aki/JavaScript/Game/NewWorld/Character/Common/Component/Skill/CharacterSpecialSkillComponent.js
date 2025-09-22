"use strict";

var __decorate = this && this.__decorate || function (e, i, l, a) {
  var t;
  var o = arguments.length;
  var S = o < 3 ? i : a === null ? a = Object.getOwnPropertyDescriptor(i, l) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    S = Reflect.decorate(e, i, l, a);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (t = e[n]) {
        S = (o < 3 ? t(S) : o > 3 ? t(i, l, S) : t(i, l)) || S;
      }
    }
  }
  if (o > 3 && S) {
    Object.defineProperty(i, l, S);
  }
  return S;
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
const SpecialSkillKanteleila_1 = require("./SpecialSkill/SpecialSkillKanteleila");
const SpecialSkillKatixiya_1 = require("./SpecialSkill/SpecialSkillKatixiya");
const SpecialSkillLuPa_1 = require("./SpecialSkill/SpecialSkillLuPa");
const SpecialSkillXiaKong_1 = require("./SpecialSkill/SpecialSkillXiaKong");
const SpecialSkillZheZhi_1 = require("./SpecialSkill/SpecialSkillZheZhi");
const specialSkillTypes = new Map([[1105, SpecialSkillZheZhi_1.SpecialSkillZheZhi], [1607, SpecialSkillKanteleila_1.SpecialSkillKanteleila], [1407, SpecialSkillXiaKong_1.SpecialSkillXiaKong], [1207, SpecialSkillLuPa_1.SpecialSkillLuPa], [1409, SpecialSkillKatixiya_1.SpecialSkillKatixiya], [1608, SpecialSkillFuLuoLuo_1.SpecialSkillFuLuoLuo], [1306, SpecialSkillAogusita_1.SpecialSkillAogusita]]);
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
};
CharacterSpecialSkillComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(256)], CharacterSpecialSkillComponent);
exports.CharacterSpecialSkillComponent = CharacterSpecialSkillComponent; //# sourceMappingURL=CharacterSpecialSkillComponent.js.map