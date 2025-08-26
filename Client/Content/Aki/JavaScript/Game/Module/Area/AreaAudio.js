"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaAudio = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
class AreaAudio {
  constructor() {
    this.Jje = false;
    this.iWe = new Set();
    this.mWe = () => {
      this.dWe();
    };
    this.OnRemoveEntity = (e, t) => {
      if (this.iWe.has(t.Id)) {
        this.iWe.delete(t.Id);
        EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
        EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.CharDamage, this.CWe);
      }
    };
    this.CWe = (e, t, i, n, r) => {
      if (n.DamageData.CalculateType === 0 && this.gWe(t.Id) && ControllerHolder_1.ControllerHolder.GameAudioController.IsPlayingBattleMusic) {
        if (!this.Jje && !(this.Jje = true, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 55, "[BGM] 触发:战斗中首次造成伤害"), ControllerHolder_1.ControllerHolder.GameAudioController.CheckIgnoreByPlotKeep())) {
          ControllerHolder_1.ControllerHolder.GameAudioController.SetPlayerWwiseState(true, true);
        }
      }
    };
  }
  Init() {
    this.dde();
  }
  Destroy() {
    ControllerHolder_1.ControllerHolder.GameAudioController.OnExitBattleState();
    this.Cde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.mWe);
  }
  Cde() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.mWe);
  }
  dWe() {
    this.SWe();
    this.iWe.clear();
    this.yWe();
  }
  yWe() {
    for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true)) {
      this.iWe.add(e.Id);
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
      EventSystem_1.EventSystem.AddWithTarget(e.Entity, EventDefine_1.EEventName.CharDamage, this.CWe);
    }
  }
  SWe() {
    if (this.iWe.size > 0) {
      for (const t of this.iWe) {
        var e = ModelManager_1.ModelManager.CharacterModel.GetHandle(t);
        if (e?.Valid) {
          EventSystem_1.EventSystem.RemoveWithTarget(e.Entity, EventDefine_1.EEventName.CharDamage, this.CWe);
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
        }
      }
      this.iWe.clear();
    }
  }
  gWe(e) {
    var t;
    var e = EntitySystem_1.EntitySystem.Get(e);
    return !!e && !!Global_1.Global.BaseCharacter && !(t = e.GetComponent(3)?.CreatureData, !(e = e.GetComponent(3)?.Actor)) && CampUtils_1.CampUtils.GetCampRelationship(e.Camp, Global_1.Global.BaseCharacter.Camp) === 2 && t?.GetBaseInfo()?.Category.MainType === "Monster";
  }
}
exports.AreaAudio = AreaAudio;
//# sourceMappingURL=AreaAudio.js.map