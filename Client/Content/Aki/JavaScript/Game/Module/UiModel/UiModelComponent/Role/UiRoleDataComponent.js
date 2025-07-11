"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var i;
  var r = arguments.length;
  var s = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, n, o);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (i = e[a]) {
        s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiRoleDataComponent = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleDataComponent = class UiRoleDataComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.ywr = undefined;
    this._Br = 0;
    this.uBr = 0;
    this.aTl = 0;
  }
  get RoleDataId() {
    return this._Br;
  }
  get RoleConfigId() {
    return this.uBr;
  }
  get RoleSkinId() {
    return this.aTl;
  }
  OnInit() {
    this.ywr = this.Owner.CheckGetComponent(0);
  }
  SetRoleConfigId(e, t = -1) {
    this.uBr = e;
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    this.aTl = t === -1 ? e.SkinId : t;
    if (this.aTl <= 0) {
      this.ywr.ModelConfigId = e.UiMeshId;
    } else {
      t = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(this.aTl);
      this.ywr.ModelConfigId = t.GetUiMeshId();
    }
    EventSystem_1.EventSystem.EmitWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelRoleConfigIdChange);
  }
  SetRoleDataId(e, t = -1) {
    this._Br = e;
    e = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e);
    if (e) {
      this.SetRoleConfigId(e.GetRoleId(), t);
      EventSystem_1.EventSystem.EmitWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelRoleDataIdChange);
    }
  }
};
UiRoleDataComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(13)], UiRoleDataComponent);
exports.UiRoleDataComponent = UiRoleDataComponent; //# sourceMappingURL=UiRoleDataComponent.js.map