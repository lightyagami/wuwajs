"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var r;
  var i = arguments.length;
  var a = i < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, o, n);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (r = e[s]) {
        a = (i < 3 ? r(a) : i > 3 ? r(t, o, a) : r(t, o)) || a;
      }
    }
  }
  if (i > 3 && a) {
    Object.defineProperty(t, o, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RolePartyComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
let RolePartyComponent = class RolePartyComponent extends EntityComponent_1.EntityComponent {
  OnStart() {
    var e = this.Entity.GetComponent(0);
    var t = this.Entity.CheckGetComponent(215);
    var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.GetRoleId());
    var o = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(o.PartyId);
    if (o) {
      for (const n of o.PartyTags) {
        t.AddTag(n);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 28, "势力.xlsx配置不存在", ["RoleId", e.GetRoleId()]);
    }
    return true;
  }
};
RolePartyComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(295)], RolePartyComponent);
exports.RolePartyComponent = RolePartyComponent; //# sourceMappingURL=RolePartyComponent.js.map