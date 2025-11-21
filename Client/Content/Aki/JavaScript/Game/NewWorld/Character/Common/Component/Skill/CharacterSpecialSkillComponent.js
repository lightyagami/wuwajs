"use strict";

var __decorate = this && this.__decorate || function (i, e, l, a) {
  var t;
  var S = arguments.length;
  var n = S < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, l) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(i, e, l, a);
  } else {
    for (var r = i.length - 1; r >= 0; r--) {
      if (t = i[r]) {
        n = (S < 3 ? t(n) : S > 3 ? t(e, l, n) : t(e, l)) || n;
      }
    }
  }
  if (S > 3 && n) {
    Object.defineProperty(e, l, n);
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
const SpecialSkillBuling_1 = require("./SpecialSkill/SpecialSkillBuling");
const SpecialSkillFuLuoLuo_1 = require("./SpecialSkill/SpecialSkillFuLuoLuo");
const SpecialSkillJiabeilina_1 = require("./SpecialSkill/SpecialSkillJiabeilina");
const SpecialSkillKanteleila_1 = require("./SpecialSkill/SpecialSkillKanteleila");
const SpecialSkillKatixiya_1 = require("./SpecialSkill/SpecialSkillKatixiya");
const SpecialSkillLuPa_1 = require("./SpecialSkill/SpecialSkillLuPa");
const SpecialSkillXiaKong_1 = require("./SpecialSkill/SpecialSkillXiaKong");
const SpecialSkillZheZhi_1 = require("./SpecialSkill/SpecialSkillZheZhi");
const specialSkillTypes = new Map([[1105, SpecialSkillZheZhi_1.SpecialSkillZheZhi], [1607, SpecialSkillKanteleila_1.SpecialSkillKanteleila], [1407, SpecialSkillXiaKong_1.SpecialSkillXiaKong], [1207, SpecialSkillLuPa_1.SpecialSkillLuPa], [1409, SpecialSkillKatixiya_1.SpecialSkillKatixiya], [1608, SpecialSkillFuLuoLuo_1.SpecialSkillFuLuoLuo], [1306, SpecialSkillAogusita_1.SpecialSkillAogusita], [1208, SpecialSkillJiabeilina_1.SpecialSkillJiabeilina], [1307, SpecialSkillBuling_1.SpecialSkillBuling]]);
let CharacterSpecialSkillComponent = class CharacterSpecialSkillComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.SpecialSkill = undefined;
  }
  OnStart() {
    var i = this.Entity.GetComponent(0);
    let e = i.GetPbDataId();
    if (i?.IsRole() && e && e > RoleDefine_1.ROBOT_DATA_MIN_ID && ConfigManager_1.ConfigManager.RoleConfig) {
      if (i = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(e)) {
        e = i.ParentId;
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 4, "无法找到试用角色数据", ["pbDataId", e]);
      }
    }
    i = specialSkillTypes.get(e);
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
  static SetOptimizeEnable(i, e) {
    specialSkillTypes.get(i)?.SetOptimizeEnable(e);
  }
};
CharacterSpecialSkillComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(260)], CharacterSpecialSkillComponent);
exports.CharacterSpecialSkillComponent = CharacterSpecialSkillComponent; //# sourceMappingURL=CharacterSpecialSkillComponent.js.map