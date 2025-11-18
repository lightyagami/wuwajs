"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneTeamGroup = exports.SceneTeamPlayer = exports.SceneTeamRole = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
class SceneTeamRole {
  constructor() {
    this.CreatureDataId = 0;
    this.RoleId = 0;
    this.OnStageWithoutControl = false;
  }
}
exports.SceneTeamRole = SceneTeamRole;
class SceneTeamPlayer {
  constructor() {
    this.j8 = 0;
    this.hTn = undefined;
    this.Npo = new Map();
    this.Vpo = undefined;
  }
  static Create(t) {
    var e = new SceneTeamPlayer();
    e.j8 = t;
    return e;
  }
  Clear() {
    this.hTn = undefined;
    for (const t of this.Npo.values()) {
      t.Clear();
    }
    this.Npo.clear();
    this.Vpo?.Cancel();
    this.Vpo = undefined;
  }
  GetCurrentGroupType() {
    return this.hTn;
  }
  GetCurrentGroup() {
    if (this.hTn) {
      return this.Npo.get(this.hTn);
    }
  }
  GetGroup(t) {
    return this.Npo.get(t);
  }
  GetGroupList() {
    var t = [];
    for (const e of this.Npo.values()) {
      t.push(e);
    }
    return t;
  }
  SwitchGroup(t) {
    this.hTn = t;
  }
  UpdateGroup(t, e, r, s, i) {
    let o = this.Npo.get(t);
    if (!o) {
      o = SceneTeamGroup.Create(this.j8, t);
      this.Npo.set(t, o);
    }
    o.Update(e, r, s, i);
  }
  RefreshEntityEnable() {
    this.Vpo?.Cancel();
    this.Vpo = undefined;
    const c = new Set();
    const f = new Set();
    for (const s of this.Npo.values()) {
      for (const i of s.GetRoleList()) {
        var t = i.CreatureDataId;
        if (t > 0) {
          f.add(t);
        }
      }
      var e = s.GetCurrentRole();
      if (s.GetGroupType() !== this.hTn && e && e.OnStageWithoutControl) {
        c.add(e.CreatureDataId);
      }
    }
    if (!(f.size <= 0)) {
      var r = [];
      for (const o of f) {
        r.push(o);
      }
      this.Vpo = WaitEntityTask_1.WaitEntityTask.Create("SceneTeamPlayer.RefreshEntityEnable", r, () => {
        this.Vpo = undefined;
        let t = false;
        if (ModelManager_1.ModelManager.PlotModel.InSeamlessFormation) {
          t = true;
        }
        var e = this.j8 === ModelManager_1.ModelManager.PlayerInfoModel.GetId();
        var r = ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(this.j8)?.IsRemoteSceneLoading() ?? true;
        var s = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentTeamItem?.GetCreatureDataId() ?? 0;
        var i = this.GetCurrentGroup();
        var o = i?.GetCurrentRole()?.CreatureDataId ?? 0;
        for (const u of f) {
          var n;
          var a;
          var h = ModelManager_1.ModelManager.CreatureModel.GetEntity(u)?.Entity;
          if (h) {
            if (t || !(n = h.GetComponent(15)) || n.IsDead()) {
              this.wvl(h, false);
            } else if (e) {
              if ((n = h.GetComponent(0)) && n.IsAutoRole()) {
                n = i?.HasRole(u) ?? false;
                this.wvl(h, n);
              } else {
                n = c.has(u);
                a = u === s || u === o || n;
                this.wvl(h, a);
                if (n) {
                  h.GetComponent(96)?.OutOfControl();
                }
              }
            } else {
              a = u === o && !r;
              this.wvl(h, a);
            }
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Formation", 48, "更新编队实体显隐时无法获取", ["CreatureDataId", u]);
          }
        }
      });
    }
  }
  IsRoleOnStageWithoutControl(t) {
    for (const r of this.Npo.values()) {
      var e = r.GetCurrentRole();
      if (e && e.CreatureDataId === t && e.OnStageWithoutControl) {
        return true;
      }
    }
    return false;
  }
  wvl(t, e) {
    if (e) {
      t.EnableByKey(1, true);
    } else {
      t.DisableByKey(1, true);
      t.GetComponent(96)?.SetTeamTag(2);
    }
  }
}
exports.SceneTeamPlayer = SceneTeamPlayer;
class SceneTeamGroup {
  constructor() {
    this.j8 = 0;
    this.Opo = 0;
    this.Vlo = new Array();
    this.kpo = undefined;
    this.IsFixedLocation = false;
    this.o$s = 0;
  }
  static Create(t, e) {
    var r = new SceneTeamGroup();
    r.j8 = t;
    r.Opo = e;
    return r;
  }
  Clear() {
    this.Opo = 0;
    this.Vlo.splice(0, this.Vlo.length);
    this.o$s = 0;
    this.kpo = undefined;
  }
  GetGroupType() {
    return this.Opo;
  }
  GetRoleList() {
    var t = [];
    for (const e of this.Vlo) {
      t.push(e);
    }
    return t;
  }
  GetCurrentRole() {
    return this.kpo;
  }
  HasRole(t) {
    for (const e of this.Vlo) {
      if (e.CreatureDataId === t) {
        return true;
      }
    }
    return false;
  }
  SetCurrentRole(t) {
    for (const e of this.Vlo) {
      if (e.CreatureDataId === t) {
        this.kpo = e;
      }
    }
  }
  GetLivingState() {
    return this.o$s;
  }
  UpdateLivingState(t) {
    var e;
    var r = this.o$s;
    if (r !== (this.o$s = t)) {
      e = this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTeamLivingStateChange, e, this.Opo, t, r);
    }
  }
  Update(t, e, r, s) {
    this.Vlo.splice(0, this.Vlo.length);
    this.kpo = undefined;
    this.UpdateLivingState(r);
    if (!(t.length <= 0)) {
      this.IsFixedLocation = s;
      for (const i of t) {
        this.Vlo.push(i);
        if (i.RoleId === e) {
          this.kpo = i;
        }
      }
    }
  }
  AddRoleList(t) {
    for (const e of t) {
      this.Vlo.push(e);
    }
  }
}
exports.SceneTeamGroup = SceneTeamGroup;
//# sourceMappingURL=SceneTeamData.js.map