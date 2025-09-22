"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSplineModel = exports.SplineAnalyzeData = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
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
class SplineAnalyzeData {
  constructor(t, s = 5) {
    this.Qdl = s;
    this.xdt = 0;
    this.Kdl = new Array();
    this.xdt = t.GetNumberOfSplinePoints();
    let i = t.D_GetLocationAtSplineInputKey(0, 1);
    this.Kdl.push(0);
    for (let e = 1; e <= (this.xdt - 1) * this.Qdl; ++e) {
      var r = t.D_GetLocationAtSplineInputKey(e / s, 1);
      this.Kdl.push(this.Kdl[e - 1] + UE.VectorDouble.Dist(i, r));
      i = r;
    }
  }
  GetKeyTimeByLengthOffset(e, t) {
    if (this.xdt === 0) {
      return 0;
    }
    let s = e * this.Qdl;
    let i = Math.floor(s);
    let r = 0;
    if (i + 1 >= this.Kdl.length) {
      r = this.Kdl[this.Kdl.length - 1];
      i = this.Kdl.length - 1;
    } else {
      r = MathUtils_1.MathUtils.Lerp(this.Kdl[i], this.Kdl[i + 1], s - i);
    }
    var o = r + t;
    if (t > 0) {
      while (i < this.Kdl.length && this.Kdl[i] < o) {
        ++i;
      }
      if (i === this.Kdl.length) {
        return this.xdt - 1;
      }
      s = i - (this.Kdl[i] - o) / (this.Kdl[i] - this.Kdl[i - 1]);
    } else {
      while (i >= 0 && this.Kdl[i] > o) {
        --i;
      }
      if (i < 0) {
        return 0;
      }
      s = i + (o - this.Kdl[i]) / (this.Kdl[i + 1] - this.Kdl[i]);
    }
    return s / this.Qdl;
  }
}
exports.SplineAnalyzeData = SplineAnalyzeData;
class GameSplineModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Jye = new Map();
    this.j3 = undefined;
    this.$dl = new Map();
    this.CurWindPipelineResistance = 0;
    this.CurWindPipelineSpeedLimit = 0;
    this.zye = () => {
      for (var [e, t] of this.Jye) {
        for (const s of t[2]) {
          switch (s.Type) {
            case 0:
              if (!ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s.Id)) {
                t[2].delete(s);
              }
              break;
            case 1:
              if (!EntitySystem_1.EntitySystem.Get(s.Id)) {
                t[2].delete(s);
              }
              break;
            case 2:
              if (!ModelManager_1.ModelManager.TowerDefenseEventModel.GetEntity(s.Id)) {
                t[2].delete(s);
              }
              break;
            case 3:
              if (!TowerDefenseEventController_1.TowerDefenseEventController.IsInPreview()) {
                t[2].delete(s);
              }
          }
        }
        if (!t[2].size) {
          ActorSystem_1.ActorSystem.Put("GameSplineModel.CheckAndReleaseActor", t[0]);
          this.Jye.delete(e);
          this.$dl.delete(e);
        }
      }
      if (!this.Jye.size && this.j3) {
        TimerSystem_1.TimerSystem.Remove(this.j3);
        this.j3 = undefined;
      }
    };
  }
  LoadAndGetSplineComponent(e, t, s = 0) {
    let i = this.Jye.get(e);
    var r;
    if (!i && !(r = ActorSystem_1.ActorSystem.Get(TsGameSplineActor_1.default.StaticClass(), new UE.TransformDouble()), i = [r, GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(e, r), new Set()], this.Jye.set(e, i), this.j3)) {
      this.j3 = TimerSystem_1.TimerSystem.Forever(this.zye, TIMER_PERIOD);
    }
    i[2].add(new ActorId(t, s));
    return i[1];
  }
  GetSplineActorBySplineId(e) {
    e = this.Jye.get(e);
    if (e) {
      return e[0];
    }
  }
  ReleaseSpline(e, t, s = 0) {
    var i = this.Jye.get(e);
    if (i) {
      for (const r of i[2]) {
        if (r.Id === t && r.Type === s) {
          i[2].delete(r);
        }
      }
    }
  }
  GetSplineAnalyzeData(e) {
    var t;
    var s = this.$dl.get(e);
    return s || ((t = this.Jye.get(e)) ? (s = new SplineAnalyzeData(t[1]), this.$dl.set(e, s), s) : undefined);
  }
}
exports.GameSplineModel = GameSplineModel;
//# sourceMappingURL=GameSplineModel.js.map