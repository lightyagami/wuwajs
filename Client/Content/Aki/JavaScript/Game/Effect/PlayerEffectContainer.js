"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerEffectContainer = undefined;
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ModelManager_1 = require("../Manager/ModelManager");
const SceneTeamDefine_1 = require("../Module/SceneTeam/SceneTeamDefine");
const EffectSystem_1 = require("./EffectSystem");
const PLAYER_EFFECT_LRU_CAPACITY = 200;
class PlayerEffectContainer {
  constructor() {
    this.Bpe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM);
    this.bpe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM);
    this.qpe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM);
    this.Gpe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM);
    this.Npe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM);
    this.Ope = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM);
    this.Mqn = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM);
    this.kpe = () => {
      for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        this.Ope[e] = this.Npe[e];
      }
      var t;
      var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
      for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var n = i[e];
        var r = n?.EntityHandle;
        if (n?.IsMyRole() && r) {
          this.Npe[e] = r.Id;
        } else {
          this.Npe[e] = 0;
        }
      }
      for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        this.Gpe[e] = -1;
        this.Mqn[e] = false;
      }
      for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        this.qpe[e] = e;
        if (this.Ope[e] > 0 && (t = this.Fpe(this.Ope[e])) > -1) {
          this.Gpe[t] = e;
          this.Mqn[e] = true;
        }
      }
      for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        if (!this.Mqn[e]) {
          this.Bpe[e].Clear();
        }
      }
      for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var s;
        var a = this.Gpe[e];
        if (a > -1) {
          let t = -1;
          for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
            if (this.qpe[e] === a) {
              t = e;
              break;
            }
          }
          if (e !== t && t > -1) {
            s = this.Bpe[t];
            this.Bpe[t] = this.Bpe[e];
            this.Bpe[e] = s;
            s = this.qpe[t];
            this.qpe[t] = this.qpe[e];
            this.qpe[e] = s;
            s = this.bpe[t];
            this.bpe[t] = this.bpe[e];
            this.bpe[e] = s;
          }
        }
      }
    };
  }
  Initialize() {
    for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
      this.Bpe[e] = EffectSystem_1.EffectSystem.CreateEffectLru(PLAYER_EFFECT_LRU_CAPACITY);
      this.bpe[e] = e;
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.kpe);
  }
  Clear() {
    for (let e = SceneTeamDefine_1.SCENE_TEAM_MAX_NUM - 1; e > -1; e--) {
      this.Bpe[e].Clear();
    }
    this.Bpe.length = 0;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.kpe);
  }
  ClearPool() {
    for (let e = SceneTeamDefine_1.SCENE_TEAM_MAX_NUM - 1; e > -1; e--) {
      this.Bpe[e].Clear();
    }
  }
  CheckGetCondition(e) {
    return this.Vpe(e) > -1;
  }
  GetLruHitRate(e) {
    e = this.Vpe(e);
    if (e < 0) {
      return 0;
    } else {
      return this.Bpe[e].HitRate;
    }
  }
  GetPlayerEffectPoolSize(e) {
    return this.Bpe[e].Size;
  }
  Fpe(t) {
    if (ModelManager_1.ModelManager.CharacterModel?.IsValid(t)) {
      for (let e = 0; e < this.Npe.length; e++) {
        if (t === this.Npe[e]) {
          return e;
        }
      }
    }
    return -1;
  }
  Vpe(e) {
    if (!e?.EntityId || (e = this.Fpe(e.EntityId)) < 0 || e >= this.Bpe.length) {
      return -1;
    } else {
      return e;
    }
  }
  CreateEffectHandleFromPool(e, t) {
    var i = this.Vpe(t);
    if (!(i < 0)) {
      e = this.Bpe[i].Create(e);
      i = this.bpe[i];
      if (e) {
        e.CreateSource = 2 + i;
        e.SourceEntityId = t.EntityId;
      }
      return e;
    }
  }
  GetEffectHandleFromPool(e, t) {
    var i = this.Vpe(t);
    if (!(i < 0)) {
      if (i = this.Bpe[i].Get(e)) {
        i.SourceEntityId = t.EntityId;
      }
      return i;
    }
  }
  PutEffectHandleToPool(e) {
    var t = e.SourceEntityId;
    var t = this.Fpe(t);
    if (t < 0) {
      if (SceneTeamDefine_1.SCENE_TEAM_MAX_NUM > 0) {
        var i = e.CreateSource - 2;
        let t = 0;
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          if (this.bpe[e] === i) {
            t = e;
            break;
          }
        }
        this.Bpe[t].RemoveExternal(e);
      }
      return false;
    }
    e.SourceEntityId = -1;
    return this.Bpe[t].Put(e.GetEffectSpec().GetProxyHandle());
  }
  LruRemoveExternal(e) {
    var t = e.SourceEntityId;
    var t = this.Fpe(t);
    if (t < 0) {
      if (SceneTeamDefine_1.SCENE_TEAM_MAX_NUM > 0) {
        var i = e.CreateSource - 2;
        let t = 0;
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          if (this.bpe[e] === i) {
            t = e;
            break;
          }
        }
        return this.Bpe[t].RemoveExternal(e);
      }
      return false;
    }
    e.SourceEntityId = -1;
    return this.Bpe[t].RemoveExternal(e);
  }
}
exports.PlayerEffectContainer = PlayerEffectContainer;
//# sourceMappingURL=PlayerEffectContainer.js.map