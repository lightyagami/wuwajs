"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueMotorcyclePullCollection = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GrapplingHookPointComponent_1 = require("../../../../Custom/Components/GrapplingHookPointComponent");
const GameplayCueHookCommonItem_1 = require("./CommonItem/GameplayCueHookCommonItem");
const GameplayCueBase_1 = require("./GameplayCueBase");
const NORMALIZE = 0.01;
const PULL_COLLECTION_EFFECT_BUFF_ID = 640003034;
class GameplayCueMotorcyclePullCollection extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.$$o = undefined;
    this.uDg = undefined;
    this.g4g = undefined;
    this.Wnr = undefined;
    this.C4g = Vector_1.Vector.Create(0, 0, 0);
    this.Lz = Vector_1.Vector.Create(0, 0, 0);
    this.p4g = false;
    this.v4g = false;
    this.y4g = 0;
  }
  OnInit() {}
  OnTick(t) {
    if (this.$$o) {
      if (this.p4g) {
        this.S4g(t);
      } else {
        this.M4g(t);
      }
    }
  }
  S4g(t) {
    var e;
    if (this.v4g) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 79, "模拟摩托车采集物采集过程已经结束");
      }
    } else if ((e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity.GetComponent(3))?.Valid) {
      this.y4g = Math.min(this.y4g + GrapplingHookPointComponent_1.PULL_COLLECTION_ACCELERATION, GrapplingHookPointComponent_1.PULL_COLLECTION_MOVE_MAX_SPEED);
      this.Lz.DeepCopy(e.ActorLocationProxy);
      if (this.Lz.SubtractionEqual(this.C4g).SizeSquared() < GrapplingHookPointComponent_1.CAPTURE_LENGTH_SQUARE) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 79, "模拟摩托车采集物采集过程结束");
        }
        this.g4g?.RemoveBuff(PULL_COLLECTION_EFFECT_BUFF_ID, 1, "模拟摩托车采集物采集过程结束");
        this.v4g = true;
      } else {
        this.Lz.Normalize(NORMALIZE);
        this.Lz.MultiplyEqual(this.y4g * t).AdditionEqual(this.C4g);
        this.$$o?.Tick(this.Lz.ToUeVector());
        this.C4g.DeepCopy(this.Lz);
      }
    }
  }
  M4g(t) {
    var e;
    if (this.uDg?.Valid && this.uDg.Active) {
      if (e = this.uDg.TriggerLocation.ToUeVector()) {
        this.$$o?.Tick(e);
        this.Wnr = e;
      } else if (this.Wnr) {
        this.$$o?.Tick(this.Wnr);
      }
    }
  }
  OnCreate() {
    var t = this.EntityHandle.Entity?.GetComponent(59);
    if (t?.Valid) {
      this.g4g = this.EntityHandle.Entity?.GetComponent(257);
      if (this.g4g?.Valid) {
        if ((t = t.PullingTarget)?.Valid && t.Active) {
          this.uDg = t;
          this.p4g = !t.PullCollectionWithProgress;
          if (this.p4g) {
            this.C4g.DeepCopy(this.uDg.TriggerLocation);
          }
          this.$$o = GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(this.ActorInternal, FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket), this.C4g.ToUeVector(), this.Qjg());
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 79, "GameplayCueMotorcyclePullCollection播放失败, 当前探索组件正在交互实体已失效");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 79, "GameplayCueMotorcyclePullCollection播放失败, 摩托车Buff组件已失效");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 79, "GameplayCueMotorcyclePullCollection播放失败, 摩托车探索组件已失效");
    }
  }
  Qjg() {
    var e = this.EntityHandle.Entity?.GetComponent(1);
    var o = this.CueConfig.Resources;
    if (!e?.Valid) {
      return o;
    }
    var i = [];
    for (let t = 0; t < o.length; t++) {
      i[t] = e.GetReplaceEffect(o[t]) ?? o[t];
    }
    return i;
  }
  OnDestroy() {
    if (this.$$o) {
      this.$$o.Destroy();
      this.$$o = undefined;
    }
  }
}
exports.GameplayCueMotorcyclePullCollection = GameplayCueMotorcyclePullCollection;
//# sourceMappingURL=GameplayCueMotorcyclePullCollection.js.map