"use strict";

var __decorate = this && this.__decorate || function (e, o, t, i) {
  var n;
  var a = arguments.length;
  var r = a < 3 ? o : i === null ? i = Object.getOwnPropertyDescriptor(o, t) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, o, t, i);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (n = e[l]) {
        r = (a < 3 ? n(r) : a > 3 ? n(o, t, r) : n(o, t)) || r;
      }
    }
  }
  if (a > 3 && r) {
    Object.defineProperty(o, t, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiRoleSkillComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchUiItemBaseComponent_1 = require("./FloroRanchUiItemBaseComponent");
let FloroRanchUiRoleSkillComponent = class FloroRanchUiRoleSkillComponent extends FloroRanchUiItemBaseComponent_1.FloroRanchUiItemBaseComponent {
  constructor() {
    super(...arguments);
    this.hOu = undefined;
  }
  GetUiItem() {
    if (!this.hOu) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanchUiRoleSkillComponent GetUiItem 实体不存在", ["entityId", this.OwnerEntity.EntityId]);
      }
    }
    return this.hOu;
  }
  async PlayShowAnim() {
    this.hOu ||= await this.CreateUiItem();
    await this.hOu.PlayShowAnim();
    return this.hOu;
  }
  async CreateUiItem() {
    var e = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (e) {
      return e.BindRoleSkillItem(this.OwnerEntity);
    }
  }
  async PlayHideAnim() {
    if (this.hOu) {
      await this.hOu.PlayHideAnim();
      this.hOu.UnbindData();
      this.hOu = undefined;
    }
  }
  async PlayNormalAnim() {
    if (this.hOu) {
      await this.hOu.PlayNormalAnim();
    }
  }
  async PlaySkillAnim() {
    if (this.hOu) {
      await this.hOu.PlaySkillAnim();
    }
  }
  Pause() {
    if (this.hOu) {
      this.hOu.Pause();
    }
  }
  Resume() {
    if (this.hOu) {
      this.hOu.Resume();
    }
  }
};
FloroRanchUiRoleSkillComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(10)], FloroRanchUiRoleSkillComponent);
exports.FloroRanchUiRoleSkillComponent = FloroRanchUiRoleSkillComponent; //# sourceMappingURL=FloroRanchUiRoleSkillComponent.js.map