"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScenePlayerData = undefined;
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const TIME_INTERVAL = 1000;
class ScenePlayerData {
  constructor(e) {
    this.j8 = 0;
    this.UAe = undefined;
    this.bvr = false;
    this.qvr = undefined;
    this.j8 = e;
    this.UAe = Vector_1.Vector.Create();
  }
  Clear() {
    this.j8 = 0;
    this.UAe = undefined;
    if (this.qvr) {
      TimerSystem_1.TimerSystem.Remove(this.qvr);
    }
  }
  SetTimerStart() {
    this.qvr ||= TimerSystem_1.TimerSystem.Forever(() => {
      this.SetLocation();
    }, TIME_INTERVAL);
  }
  GetPlayerId() {
    return this.j8;
  }
  SetRemoteSceneLoading(e) {
    this.bvr = e;
  }
  IsRemoteSceneLoading() {
    return this.bvr;
  }
  SetLocation() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(this.j8)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId;
    if (e) {
      if (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity?.GetComponent(3)?.ActorLocationProxy) {
        this.UAe.X = e.X;
        this.UAe.Y = e.Y;
        this.UAe.Z = e.Z;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ScenePlayerLocationChanged, this.j8, this.UAe);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ScenePlayerMarkItemStateChange, this.j8, false);
      }
    }
  }
  GetLocation() {
    if (ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === this.j8) {
      if (Global_1.Global.BaseCharacter) {
        return Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
      } else {
        return undefined;
      }
    } else {
      return this.UAe;
    }
  }
}
exports.ScenePlayerData = ScenePlayerData;
//# sourceMappingURL=ScenePlayerData.js.map