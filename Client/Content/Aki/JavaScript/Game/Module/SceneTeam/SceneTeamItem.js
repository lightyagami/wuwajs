"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneTeamItem = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
class SceneTeamItem {
  constructor() {
    this.jpo = false;
    this.zZa = false;
    this.Opo = 0;
    this.j8 = 0;
    this.Mne = 0;
    this.Wpo = 0;
    this.Kpo = undefined;
    this.Qpo = false;
  }
  static Create(t, e, r, s) {
    var i = new SceneTeamItem();
    i.Opo = t;
    i.jpo = e === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    i.j8 = e;
    i.Mne = r;
    i.Wpo = s;
    i.UpdateEntityHandle();
    if (i.Kpo?.Entity?.GetComponent(0)?.IsAutoRole()) {
      i.zZa = true;
    }
    return i;
  }
  Reset() {
    this.Wpo = 0;
    this.Kpo = undefined;
  }
  GetGroupType() {
    return this.Opo;
  }
  GetPlayerId() {
    return this.j8;
  }
  IsMyRole() {
    return this.jpo;
  }
  IsAutoRole() {
    return this.zZa;
  }
  IsControl() {
    var t;
    if (this.jpo) {
      return !!(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) && !!this.EntityHandle && t.Id === this.EntityHandle.Id;
    } else {
      return this.Qpo;
    }
  }
  get GetConfigId() {
    return this.Mne;
  }
  GetCreatureDataId() {
    return this.Wpo;
  }
  UpdateEntityHandle() {
    this.Kpo = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Wpo);
  }
  get EntityHandle() {
    if (!this.Kpo || !this.Kpo.Valid) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Wpo);
      if (!t || !t.Valid) {
        return;
      }
      this.Kpo = t;
    }
    if (this.Kpo.IsInit) {
      return this.Kpo;
    }
  }
  IsDead() {
    var t = this.EntityHandle?.Entity;
    return !t || !(t = t.GetComponent(15)) || t.IsDead();
  }
  CanGoBattle() {
    var t;
    if (this.EntityHandle) {
      if (this.IsDead()) {
        return 4;
      } else if ((t = this.EntityHandle.Entity.CheckGetComponent(206)).HasTag(-2100129479) && !t.HasTag(781722537)) {
        return 2;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  }
  CanControl() {
    return !this.IsDead() && !this.IsAutoRole();
  }
  SetRemoteIsControl(t) {
    this.Qpo = t;
  }
}
exports.SceneTeamItem = SceneTeamItem;
//# sourceMappingURL=SceneTeamItem.js.map