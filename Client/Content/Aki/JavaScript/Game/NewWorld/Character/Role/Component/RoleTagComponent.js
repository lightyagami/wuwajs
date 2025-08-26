"use strict";

var __decorate = this && this.__decorate || function (e, o, t, n) {
  var r;
  var a = arguments.length;
  var s = a < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, o, t, n);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (r = e[i]) {
        s = (a < 3 ? r(s) : a > 3 ? r(o, t, s) : r(o, t)) || s;
      }
    }
  }
  if (a > 3 && s) {
    Object.defineProperty(o, t, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTagComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const BaseTagComponent_1 = require("../../../Common/Component/BaseTagComponent");
let RoleTagComponent = class RoleTagComponent extends BaseTagComponent_1.BaseTagComponent {
  constructor() {
    super(...arguments);
    this.OnFormationLoaded = () => {
      var e = this.Entity.GetComponent(0);
      var o = e.GetPlayerId();
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(o);
      var o = FormationDataController_1.FormationDataController.GetPlayerEntity(o)?.GetComponent(206);
      if (o) {
        var n;
        var r;
        var t = t.some(e => e.EntityHandle?.Entity === this.Entity) && o;
        var a = new Map();
        if (t) {
          var s = this.TagContainer;
          var i = o.TagContainer;
          for (const l of this.TagContainer.GetAllExactTags()) {
            a.set(l, i.GetExactTagCount(l) - s.GetRawTagCount(5, l));
          }
          for (const m of o.TagContainer.GetAllExactTags()) {
            if (!a.has(m)) {
              a.set(m, i.GetExactTagCount(m) - s.GetRawTagCount(5, m));
            }
          }
        } else {
          for (const C of this.TagContainer.GetAllExactTags()) {
            a.set(C, -this.TagContainer.GetRawTagCount(5, C));
          }
        }
        for ([n, r] of a.entries()) {
          this.TagContainer.UpdateExactTag(5, n, r);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 19, "RoleTagComponent初始化时找不到对应的PlayerTag组件", ["PlayerId", e?.GetPlayerId()], ["Entity", this.Entity.Id]);
      }
    };
  }
  OnCreate() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.OnFormationLoaded);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.OnFormationLoaded);
    return true;
  }
  OnAnyTagChanged(e, o, t, n) {
    if (e !== undefined && t !== o) {
      switch (e) {
        case -1384309247:
        case -1207177910:
        case -1388400236:
          var r;
          if (o > 0 && t <= 0 || o <= 0 && t > 0) {
            (r = Protocol_1.Aki.Protocol.Ke_.create()).m5n = e;
            r.iSs = o;
            CombatMessage_1.CombatNet.Send(26831, this.Entity, r, undefined);
          }
      }
      super.OnAnyTagChanged(e, o, t, n);
      n = this.Entity.GetComponent(0)?.GetPlayerId();
      if (n) {
        FormationDataController_1.FormationDataController.GetPlayerEntity(n)?.GetComponent(200)?.OnTagChanged(e);
      }
    }
  }
};
RoleTagComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(194)], RoleTagComponent);
exports.RoleTagComponent = RoleTagComponent; //# sourceMappingURL=RoleTagComponent.js.map