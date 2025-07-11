"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeamlessTravelSceneEffect = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
class SeamlessTravelSceneEffect {
  constructor() {
    this.Hte = undefined;
    this.nx = undefined;
    this.y0u = undefined;
    this.S0u = undefined;
    this.rvi = undefined;
    this.ege = undefined;
    this.cl1 = false;
    this.M0u = 0;
    this.E0u = 0;
  }
  get IsInit() {
    return this.cl1;
  }
  Init(e, t) {
    this.Hte = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (this.Hte) {
      this.nx = e;
      if (this.IsInit) {
        t(true);
      } else {
        this.y0u = this.nx.SceneEffectDaPath;
        this.I0u(e => {
          this.cl1 = true;
          t(e);
        });
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SeamlessTravel", 39, "[SeamlessTravelSceneEffect]初始化失败，无效的ActorComp", ["ActorName", Global_1.Global.BaseCharacter?.GetName()]);
    }
  }
  I0u(i) {
    if (this.y0u?.length) {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.y0u, UE.EffectModelBase, (e, t) => {
        var s;
        if (e) {
          this.S0u = e;
          e = Math.max(this.nx.EffectExpandTime, this.S0u.StartTime);
          s = Math.max(this.nx.EffectCollapseTime, this.S0u.EndTime);
          this.M0u = e * MathUtils_1.MathUtils.SecondToMillisecond;
          this.E0u = s * MathUtils_1.MathUtils.SecondToMillisecond;
          i(true);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SeamlessTravel", 39, "[SeamlessTravelSceneEffect] 加载DA失败", ["path", t], ["ActorName", Global_1.Global.BaseCharacter?.GetName()]);
          }
          i(false);
        }
      });
    } else {
      i(true);
    }
  }
  Tick(e) {}
  Destroy() {
    if (this.rvi && EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[SeamlessTravelSceneEffect] DisappearEffect", true);
    }
    this.ege = undefined;
    this.rvi = undefined;
    this.S0u = undefined;
  }
  AppearEffect(t) {
    if (this.IsInit && this.Hte?.Actor?.IsValid() && this.S0u?.IsValid()) {
      this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.Hte.ActorTransform, this.y0u, "[SeamlessTravelSceneEffect] AppearEffect", new EffectContext_1.EffectContext(undefined, this.Hte.Actor), 0, undefined, undefined, e => {
        e = EffectSystem_1.EffectSystem.GetSureEffectActor(e);
        if (e?.IsValid()) {
          if (this.Hte?.Actor.IsValid()) {
            e.K2_AttachToActor(this.Hte.Actor, undefined, 2, 2, 2, false);
          }
          this.ege = e;
          if (this.M0u < TimerSystem_1.MIN_TIME) {
            t?.(true);
          } else {
            TimerSystem_1.TimerSystem.Delay(() => {
              t?.(true);
            }, this.M0u);
          }
        } else {
          t?.(false);
        }
      });
    } else {
      t(false);
    }
  }
  DisappearEffect(e) {
    if (this.IsInit) {
      if (this.rvi && EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
        EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[SeamlessTravelSceneEffect] DisappearEffect", false);
        this.ege = undefined;
        this.rvi = undefined;
        if (this.E0u < TimerSystem_1.MIN_TIME) {
          e?.(true);
        } else {
          TimerSystem_1.TimerSystem.Delay(() => {
            e?.(true);
          }, this.E0u);
        }
      } else {
        this.ege = undefined;
        this.rvi = undefined;
        e?.(true);
      }
    } else {
      e(false);
    }
  }
  GetSeamlessTravelActors(e) {
    if (this.ege) {
      e.push(this.ege);
    }
    return e;
  }
}
exports.SeamlessTravelSceneEffect = SeamlessTravelSceneEffect;
//# sourceMappingURL=SeamlessTravelSceneEffect.js.map