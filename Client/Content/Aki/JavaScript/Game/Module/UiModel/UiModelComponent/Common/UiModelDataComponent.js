"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var n;
  var s = arguments.length;
  var r = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, o);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (n = e[l]) {
        r = (s < 3 ? n(r) : s > 3 ? n(t, i, r) : n(t, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelDataComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelDataComponent = class UiModelDataComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.ModelConfigId = 0;
    this.ModelActorType = undefined;
    this.ModelUseWay = undefined;
    this.ModelType = undefined;
    this.Xwr = 0;
    this.yne = false;
    this.tSa = undefined;
    this.$wr = 1;
    this.kjs = false;
  }
  GetModelLoadState() {
    return this.Xwr;
  }
  SetModelLoadState(e) {
    if ((this.Xwr = e) === 1) {
      EventSystem_1.EventSystem.EmitWithTarget(this.Owner, EventDefine_1.EEventName.BeforeUiModelLoadStart);
    } else if (e === 2) {
      EventSystem_1.EventSystem.EmitWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete);
    }
  }
  GetVisible() {
    return this.yne;
  }
  GetLoadingVisible() {
    return this.tSa;
  }
  ClearLoadingVisible() {
    this.tSa = undefined;
  }
  SetVisible(e) {
    if (this.Xwr === 1) {
      this.tSa = e;
    } else {
      if (this.yne === e) {
        return false;
      }
      this.yne = e;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiComponent", 58, "设置Ui模型显隐", ["ModelUseWay", this.Owner.UseWay], ["Visible", e]);
      }
      EventSystem_1.EventSystem.EmitWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelVisibleChange, e);
    }
    return true;
  }
  GetDitherEffectValue() {
    return this.$wr;
  }
  SetDitherEffect(e) {
    this.$wr = e;
    EventSystem_1.EventSystem.EmitWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelSetDitherEffect, e);
  }
  GetLoadingIconFollowState() {
    return this.kjs;
  }
  SetLoadingIconFollowState(e) {
    this.kjs = e;
  }
};
UiModelDataComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(0)], UiModelDataComponent);
exports.UiModelDataComponent = UiModelDataComponent; //# sourceMappingURL=UiModelDataComponent.js.map