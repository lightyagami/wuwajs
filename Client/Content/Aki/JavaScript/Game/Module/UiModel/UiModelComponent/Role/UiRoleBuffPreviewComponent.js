"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var i;
  var r = arguments.length;
  var f = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    f = Reflect.decorate(e, t, n, o);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (i = e[s]) {
        f = (r < 3 ? i(f) : r > 3 ? i(t, n, f) : i(t, n)) || f;
      }
    }
  }
  if (r > 3 && f) {
    Object.defineProperty(t, n, f);
  }
  return f;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiRoleBuffPreviewComponent = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelBuffComponent_1 = require("../Common/UiModelBuffComponent");
let UiRoleBuffPreviewComponent = class UiRoleBuffPreviewComponent extends UiModelBuffComponent_1.UiModelBuffComponent {
  constructor() {
    super(...arguments);
    this.X8c = () => {
      this.RemoveAllBuffId();
    };
    this.r6l = () => {
      var e = ModelManager_1.ModelManager.BuffItemModel.GetCurrentPreviewItemBuffList();
      if (e && e.length !== 0) {
        for (const t of e) {
          this.AddBuffByBuffId(t);
        }
      }
    };
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
UiRoleBuffPreviewComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(35)], UiRoleBuffPreviewComponent);
exports.UiRoleBuffPreviewComponent = UiRoleBuffPreviewComponent; //# sourceMappingURL=UiRoleBuffPreviewComponent.js.map