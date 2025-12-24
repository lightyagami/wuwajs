"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSplineModel = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Info_1 = require("../../../Core/Common/Info");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const TowerDefenseEventController_1 = require("../../Module/TowerDefenseEvent/TowerDefenseEventController");
const GameSplineUtils_1 = require("./GameSplineUtils");
const TsGameSplineActor_1 = require("./TsGameSplineActor");
const TIMER_PERIOD = 5000;
class ActorId {
  constructor(e, t) {
    this.Id = e;
    this.Type = t;
  }
}
class GameSplineModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Jye = new Map();
    this.j3 = undefined;
    this.CurWindPipelineResistance = 0;
    this.CurWindPipelineSpeedLimit = 0;
    this.zye = () => {
      for (var [e, t] of this.Jye) {
        for (const r of t[2]) {
          switch (r.Type) {
            case 0:
              if (!ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r.Id)) {
                t[2].delete(r);
              }
              break;
            case 1:
              if (!EntitySystem_1.EntitySystem.Get(r.Id)) {
                t[2].delete(r);
              }
              break;
            case 2:
              if (!ModelManager_1.ModelManager.TowerDefenseEventModel.GetEntity(r.Id)) {
                t[2].delete(r);
              }
              break;
            case 3:
              if (!TowerDefenseEventController_1.TowerDefenseEventController.IsInPreview()) {
                t[2].delete(r);
              }
          }
        }
        if (!t[2].size) {
          ActorSystem_1.ActorSystem.Put("GameSplineModel.CheckAndReleaseActor", t[0]);
          this.Jye.delete(e);
        }
      }
      if (!this.Jye.size && this.j3) {
        TimerSystem_1.TimerSystem.Remove(this.j3);
        this.j3 = undefined;
      }
    };
  }
  LoadAndGetSplineComponent(e, t, r = 0) {
    let s = this.Jye.get(e);
    var o;
    if (!s && !(o = ActorSystem_1.ActorSystem.Get(TsGameSplineActor_1.default.StaticClass(), new UE.TransformDouble()), s = [o, GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(e, o), new Set()], this.Jye.set(e, s), Info_1.Info.IsPlayInEditor && o.SetActorLabel("TsGameSplineActor_" + e), this.j3)) {
      this.j3 = TimerSystem_1.TimerSystem.Forever(this.zye, TIMER_PERIOD);
    }
    s[2].add(new ActorId(t, r));
    return s[1];
  }
  GetSplineActorBySplineId(e) {
    e = this.Jye.get(e);
    if (e) {
      return e[0];
    }
  }
  ReleaseSpline(e, t, r = 0) {
    var s = this.Jye.get(e);
    if (s) {
      for (const o of s[2]) {
        if (o.Id === t && o.Type === r) {
          s[2].delete(o);
        }
      }
    }
  }
}
exports.GameSplineModel = GameSplineModel;
//# sourceMappingURL=GameSplineModel.js.map