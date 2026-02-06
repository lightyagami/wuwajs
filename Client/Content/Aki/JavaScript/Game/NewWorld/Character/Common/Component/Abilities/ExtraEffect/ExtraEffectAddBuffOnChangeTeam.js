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
      var e;
      if (i?.IsValid()) {
        (e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()).forEach(e => {
          if (!this.WQo.includes(e.Id)) {
            var t = e.Entity.GetComponent(185);
            for (const s of this.jQo) {
              t?.AddIterativeBuff(s, i, undefined, false, `新入队角色加Buff（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`);
            }
          }
        });
        this.WQo = e.map(e => e.Id);
      }
    };
  }
  InitParameters(e) {
    e = e.ExtraEffectParameters;
    this.jQo = e[0].split("#").map(e => Number(e));
    this.WQo = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities().map(e => e.Id);
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
    this.mXu = false;
    this.yvi = () => {
      if (this.PendingBuff) {
        var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(this.mXu);
        for (const r of e) {
          var t = r.Entity?.GetComponent(222);
          if (t && !this.WQo.includes(r.Id)) {
            for (const f of this.jQo) {
              t.AddIterativeBuff(f, this.PendingBuff, undefined, false, this.aFl);
            }
          }
        }
        for (const n of this.WQo) {
          var s = ModelManager_1.ModelManager.CharacterModel?.GetHandle(n)?.Entity?.GetComponent(222);
          if (s && !e.some(e => e.Id === n)) {
            for (const h of this.jQo) {
              var i = CharacterBuffController_1.default.GetBuffDefinition(h)?.DefaultStackCount ?? -1;
              s.RemoveBuff(h, i, this.qie, this.PendingBuff.MessageId);
            }
          }
        }
        this.WQo = e.map(e => e.Id);
      }
    };
  }
  InitParameters(e) {
    e = e.ExtraEffectParameters;
    this.jQo = e[0].split("#").map(e => Number(e));
    this.mXu = Number(e[1] ?? 0) === 1;
  }
  OnCreated() {
    if (this.OwnerBuffComponent?.HasBuffAuthority() && (EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.yvi), this.aFl = `额外效果为进入小队角色附加buff（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`, this.qie = `额外效果为退出小队角色移除buff（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`, this.WQo = [], ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady)) {
      this.yvi();
    }
  }
  OnRemoved() {
    if (this.OwnerBuffComponent?.HasBuffAuthority()) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.yvi);
      for (const s of this.WQo) {
        var e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(s)?.Entity?.GetComponent(222);
        if (e) {
          for (const i of this.jQo) {
            var t = CharacterBuffController_1.default.GetBuffDefinition(i)?.DefaultStackCount ?? -1;
            e.RemoveBuff(i, t, this.qie, this.PendingBuff?.MessageId);
          }
        }
      }
      this.WQo = [];
    }
  }
  OnExecute() {}
  GetDebugEffectString() {
    return `为${this.mXu ? "小队" : "全队"}绑定buff${this.jQo.join("、")}`;
  }
}
exports.BindBuffToTeam = BindBuffToTeam;
//# sourceMappingURL=ExtraEffectAddBuffOnChangeTeam.js.map