"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySceneInteract = undefined;
const UE = require("ue");
const Stats_1 = require("../../../Core/Common/Stats");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneBattleInteractDefine_1 = require("./SceneBattleInteractDefine");
class FlySceneInteract {
  constructor() {
    this.cRl = false;
    this.hJ = 0;
    this.Lz = Vector_1.Vector.Create();
    this.X9e = undefined;
    this.Hte = undefined;
    this.ldt = [];
    this.xie = () => {
      this.m$e();
      this.c$e();
    };
    this.CRl = (e, t) => {
      this.bl(t);
    };
    this.zpe = (e, t) => {
      if (this.X9e === t) {
        this.m$e();
      }
    };
    this.Swr = (e, t) => {
      if (this.Hte) {
        if (t) {
          this.Lz.FromUeVector(t);
          this.Hte.ActorQuatProxy.RotateVector(this.Lz, e);
          e.AdditionEqual(this.Hte.ActorLocationProxy);
        } else {
          e.FromUeVector(this.Hte.ActorLocationProxy);
        }
      }
    };
  }
  Init() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie);
    var e = ResourceSystem_1.ResourceSystem.Load(SceneBattleInteractDefine_1.FLY_INTERACT_CONFIG_PATH, UE.BP_SceneBattleInteract_C);
    if (e &&= ModelManager_1.ModelManager.SceneBattleInteractModel.CreateSceneBattleInteract(e)) {
      this.hJ = e.Id;
      e.SetUpdateLocationFunc(this.Swr);
    }
    this.c$e();
  }
  Destroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie);
    this.m$e();
    ModelManager_1.ModelManager.SceneBattleInteractModel.DestroySceneBattleInteract(this.hJ);
    this.hJ = 0;
  }
  c$e() {
    var e = ModelManager_1.ModelManager.BattleUiModel?.GetCurRoleData();
    if (e && (this.X9e = e.EntityHandle, this.Hte = this.X9e?.Entity?.GetComponent(1), EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.X9e, EventDefine_1.EEventName.RemoveEntity, this.zpe), e = e.GameplayTagComponent)) {
      this.mdt(e, -2027866845, this.CRl, true);
    }
  }
  m$e() {
    if (this.X9e) {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, this.X9e, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      for (const e of this.ldt) {
        e.EndTask();
      }
      this.ldt.length = 0;
      this.X9e = undefined;
      this.Hte = undefined;
    }
  }
  mdt(e, t, i, s = false) {
    if (s && e.HasTag(t)) {
      i(t, true);
    }
    s = e.ListenForTagAddOrRemove(t, i, FlySceneInteract.SYe);
    if (s) {
      this.ldt.push(s);
    }
  }
  bl(e) {
    var t;
    if (this.cRl !== e && (this.cRl = e, this.hJ > 0) && (t = ModelManager_1.ModelManager.SceneBattleInteractModel.GetSceneBattleInteract(this.hJ)) && (t.SetEnable(e), this.Hte)) {
      t.SetDownVector(this.Hte.ActorGravityDirectProxy);
    }
  }
}
(exports.FlySceneInteract = FlySceneInteract).SYe = Stats_1.Stat.Create("[StrengthHandle]ListenTag");
//# sourceMappingURL=FlySceneInteract.js.map