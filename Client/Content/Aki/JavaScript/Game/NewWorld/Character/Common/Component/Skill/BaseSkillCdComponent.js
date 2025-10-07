"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var o = arguments.length;
  var r = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var l = t.length - 1; l >= 0; l--) {
      if (n = t[l]) {
        r = (o < 3 ? n(r) : o > 3 ? n(e, i, r) : n(e, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseSkillCdComponent = undefined;
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
let BaseSkillCdComponent = class BaseSkillCdComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.BuffComp = undefined;
    this.HasModifyCdEffect = false;
    this.Gzr = undefined;
    this.bzr = undefined;
  }
  OnInit() {
    this.BuffComp = this.Entity.CheckGetComponent(210);
    this.Gzr = new Map();
    this.bzr = ModelManager_1.ModelManager.SkillCdModel.GetCurWorldPassiveSkillCdData();
    return true;
  }
  OnEnd() {
    super.OnEnd();
    if (this.bzr) {
      this.bzr.RemoveEntity(this.Entity);
      this.bzr = undefined;
    }
    return true;
  }
  UpdateModifyCdEffect(t, e) {
    if (this.BuffComp) {
      if (t) {
        this.HasModifyCdEffect = true;
      } else {
        for (const i of this.BuffComp.BuffEffectManager.FilterById(49)) {
          if (e !== i && i.SkillIdOrGenres.size > 0) {
            this.HasModifyCdEffect = true;
            return;
          }
        }
        this.HasModifyCdEffect = false;
      }
    } else {
      this.HasModifyCdEffect = false;
    }
  }
  InitPassiveSkill(t) {
    var e = t.Id;
    var i = this.Gzr.get(e);
    if (!i) {
      i = this.bzr.InitPassiveSkillCd(this.Entity, t);
      this.Gzr.set(e, i);
    }
    return i;
  }
  IsPassiveSkillInCd(t, e) {
    t = this.Gzr.get(t);
    return !!t && t.IsInCd(e);
  }
  StartPassiveCd(t, e, i = -1) {
    var s = this.Gzr.get(t);
    return !!s && (s.StartCd(t, e, i), true);
  }
  GetPassiveSkillCdInfo(t) {
    return this.Gzr.get(t);
  }
};
BaseSkillCdComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(207)], BaseSkillCdComponent);
exports.BaseSkillCdComponent = BaseSkillCdComponent; //# sourceMappingURL=BaseSkillCdComponent.js.map