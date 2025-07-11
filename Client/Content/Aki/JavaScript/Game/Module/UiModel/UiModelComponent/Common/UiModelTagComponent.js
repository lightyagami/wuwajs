"use strict";

var __decorate = this && this.__decorate || function (e, t, n, i) {
  var o;
  var s = arguments.length;
  var r = s < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, n, i);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (o = e[h]) {
        r = (s < 3 ? o(r) : s > 3 ? o(t, n, r) : o(t, n)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelTagComponent = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiTagComponent_1 = require("../../../UiComponent/UiTagComponent");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelTagComponent = class UiModelTagComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.Xte = new UiTagComponent_1.UiTagComponent();
    this.Jwr = undefined;
    this.OnAnsBegin = e => {
      this.AddTagById(e.TagId);
    };
    this.OnAnsEnd = e => {
      this.ReduceTagById(e.TagId);
    };
    this.hBr = (e, t) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShowRoleElementChangePreviewEffect, t);
    };
    this.lBr = (e, t) => {
      var n = this.Owner.CheckGetComponent(20);
      if (t) {
        n?.PlayLightSequence();
      } else {
        n?.StopLightSequence();
      }
    };
  }
  OnInit() {
    this.Jwr = this.Owner.CheckGetComponent(6);
  }
  OnStart() {
    this.Jwr?.RegisterAnsTrigger("UiTagAnsContext", this.OnAnsBegin, this.OnAnsEnd);
    this.Xte.AddListener(348713373, this.hBr);
    this.Xte.AddListener(-1371920538, this.lBr);
  }
  OnEnd() {
    this.Xte.RemoveListener(348713373, this.hBr);
    this.Xte.RemoveListener(-1371920538, this.lBr);
  }
  OnClear() {
    this.Xte.RemoveAllTag();
  }
  AddTagById(e, ...t) {
    this.Xte.AddTagById(e, ...t);
  }
  ReduceTagById(e, ...t) {
    this.Xte.ReduceTagById(e, ...t);
  }
  ContainsTagById(e) {
    return this.Xte.ContainsTagById(e);
  }
};
UiModelTagComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(7)], UiModelTagComponent);
exports.UiModelTagComponent = UiModelTagComponent; //# sourceMappingURL=UiModelTagComponent.js.map