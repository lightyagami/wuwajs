"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BindBuffToTeam = exports.AddBuffOnChangeTeam = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CharacterBuffController_1 = require("../CharacterBuffController");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class AddBuffOnChangeTeam extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.jQo = [];
    this.WQo = undefined;
    this.yvi = () => {
      const i = this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
      var t;
      if (i?.IsValid()) {
        (t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()).forEach(t => {
          if (!this.WQo.includes(t.Id)) {
            var e = t.Entity.GetComponent(174);
            for (const s of this.jQo) {
              e?.AddIterativeBuff(s, i, undefined, false, `新入队角色加Buff（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`);
            }
          }
        });
        this.WQo = t.map(t => t.Id);
      }
    };
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    this.jQo = t[0].split("#").map(t => Number(t));
    this.WQo = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities().map(t => t.Id);
  }
  OnCreated() {
    if (this.OwnerBuffComponent.HasBuffAuthority()) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.yvi);
    }
  }
  OnRemoved() {
    if (this.OwnerBuffComponent?.HasBuffAuthority()) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.yvi);
    }
  }
  OnExecute() {}
}
exports.AddBuffOnChangeTeam = AddBuffOnChangeTeam;
class BindBuffToTeam extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.jQo = [];
    this.WQo = [];
    this.aFl = "BindBuffToTeam";
    this.qie = "BindBuffToTeam";
    this.BHc = false;
    this.yvi = () => {
      if (this.PendingBuff) {
        var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(this.BHc);
        for (const r of t) {
          var e = r.Entity?.GetComponent(209);
          if (e && !this.WQo.includes(r.Id)) {
            for (const f of this.jQo) {
              e.AddIterativeBuff(f, this.PendingBuff, undefined, false, this.aFl);
            }
          }
        }
        for (const n of this.WQo) {
          var s = ModelManager_1.ModelManager.CharacterModel?.GetHandle(n)?.Entity?.GetComponent(209);
          if (s && !t.some(t => t.Id === n)) {
            for (const h of this.jQo) {
              var i = CharacterBuffController_1.default.GetBuffDefinition(h)?.DefaultStackCount ?? -1;
              s.RemoveBuff(h, i, this.qie, this.PendingBuff.MessageId);
            }
          }
        }
        this.WQo = t.map(t => t.Id);
      }
    };
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    this.jQo = t[0].split("#").map(t => Number(t));
    this.BHc = Number(t[1] ?? 0) === 1;
  }
  OnCreated() {
    if (this.OwnerBuffComponent?.HasBuffAuthority()) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.yvi);
      this.aFl = `额外效果为进入小队角色附加buff（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`;
      this.qie = `额外效果为退出小队角色移除buff（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`;
      this.WQo = [];
      this.yvi();
    }
  }
  OnRemoved() {
    if (this.OwnerBuffComponent?.HasBuffAuthority()) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.yvi);
      for (const s of this.WQo) {
        var t = ModelManager_1.ModelManager.CharacterModel?.GetHandle(s)?.Entity?.GetComponent(209);
        if (t) {
          for (const i of this.jQo) {
            var e = CharacterBuffController_1.default.GetBuffDefinition(i)?.DefaultStackCount ?? -1;
            t.RemoveBuff(i, e, this.qie, this.PendingBuff?.MessageId);
          }
        }
      }
      this.WQo = [];
    }
  }
  OnExecute() {}
  GetDebugEffectString() {
    return `为${this.BHc ? "小队" : "全队"}绑定buff${this.jQo.join("、")}`;
  }
}
exports.BindBuffToTeam = BindBuffToTeam;
//# sourceMappingURL=ExtraEffectAddBuffOnChangeTeam.js.map