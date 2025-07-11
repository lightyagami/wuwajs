"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var i;
  var s = arguments.length;
  var f = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    f = Reflect.decorate(e, t, n, o);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (i = e[r]) {
        f = (s < 3 ? i(f) : s > 3 ? i(t, n, f) : i(t, n)) || f;
      }
    }
  }
  if (s > 3 && f) {
    Object.defineProperty(t, n, f);
  }
  return f;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiRoleBuffComponent = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelBuffComponent_1 = require("../Common/UiModelBuffComponent");
let UiRoleBuffComponent = class UiRoleBuffComponent extends UiModelBuffComponent_1.UiModelBuffComponent {
  constructor() {
    super(...arguments);
    this.mBr = undefined;
    this.X8c = () => {
      this.RemoveAllBuffId();
    };
    this.r6l = () => {
      var e = this.mBr.RoleDataId;
      var e = ModelManager_1.ModelManager.BuffItemModel.GetEquippedBuffsByRoleId(e);
      if (e && e.length !== 0) {
        for (const t of e) {
          this.AddBuffByBuffId(t);
        }
      }
    };
  }
  OnInit() {
    super.OnInit();
    this.mBr = this.Owner.CheckGetComponent(13);
  }
  OnStart() {
    super.OnStart();
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.r6l);
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.BeforeUiModelLoadStart, this.X8c);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.r6l);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.BeforeUiModelLoadStart, this.X8c);
    super.OnEnd();
  }
};
UiRoleBuffComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(21)], UiRoleBuffComponent);
exports.UiRoleBuffComponent = UiRoleBuffComponent; //# sourceMappingURL=UiRoleBuffComponent.js.map