"use strict";

var __decorate = this && this.__decorate || function (e, t, o, i) {
  var n;
  var a = arguments.length;
  var s = a < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, i);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (n = e[r]) {
        s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s;
      }
    }
  }
  if (a > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiRoleSkillComponent = undefined;
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchUiItemBaseComponent_1 = require("./FloroRanchUiItemBaseComponent");
let FloroRanchUiRoleSkillComponent = class FloroRanchUiRoleSkillComponent extends FloroRanchUiItemBaseComponent_1.FloroRanchUiItemBaseComponent {
  constructor() {
    super(...arguments);
    this.qOu = undefined;
  }
  GetUiItem() {
    return this.qOu;
  }
  async PlayShowAnim() {
    this.qOu ||= await this.CreateUiItem();
    await this.qOu.PlayShowAnim();
    return this.qOu;
  }
  async CreateUiItem() {
    var e = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (e) {
      return e.BindRoleSkillItem(this.OwnerEntity);
    }
  }
  async PlayHideAnim() {
    if (this.qOu) {
      await this.qOu.PlayHideAnim();
      this.qOu.UnbindData();
      this.qOu = undefined;
    }
  }
  async PlayNormalAnim() {
    if (this.qOu) {
      await this.qOu.PlayNormalAnim();
    }
  }
  async PlaySkillAnim() {
    if (this.qOu) {
      await this.qOu.PlaySkillAnim();
    }
  }
  Pause() {
    if (this.qOu) {
      this.qOu.Pause();
    }
  }
  Resume() {
    if (this.qOu) {
      this.qOu.Resume();
    }
  }
};
FloroRanchUiRoleSkillComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(10)], FloroRanchUiRoleSkillComponent);
exports.FloroRanchUiRoleSkillComponent = FloroRanchUiRoleSkillComponent; //# sourceMappingURL=FloroRanchUiRoleSkillComponent.js.map