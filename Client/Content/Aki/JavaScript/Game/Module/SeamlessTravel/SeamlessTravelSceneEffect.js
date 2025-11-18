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
    this.vpu = undefined;
    this.ypu = undefined;
    this.rvi = undefined;
    this.ege = undefined;
    this.cl1 = false;
    this.Spu = 0;
    this.Mpu = 0;
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
        UE.KuroRenderingRuntimeBPPluginBPLibrary.StartSceneColorShotBeforeTonemap(0);
        this.vpu = this.nx.SceneEffectDaPath;
        this.Epu(e => {
          this.cl1 = true;
          t(e);
        });
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SeamlessTravel", 39, "[SeamlessTravelSceneEffect]初始化失败，无效的ActorComp", ["ActorName", Global_1.Global.BaseCharacter?.GetName()]);
    }
  }
  Epu(i) {
    if (this.vpu?.length) {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.vpu, UE.EffectModelBase, (e, t) => {
        var s;
        if (e) {
          this.ypu = e;
          e = Math.max(this.nx.EffectExpandTime, this.ypu.StartTime);
          s = Math.max(this.nx.EffectCollapseTime, this.ypu.EndTime);
          this.Spu = e * MathUtils_1.MathUtils.SecondToMillisecond;
          this.Mpu = s * MathUtils_1.MathUtils.SecondToMillisecond;
          i(true);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SeamlessTravel", 39, "[SeamlessTravelSceneEffect] 加载DA失败", ["path", t], ["ActorName", Global_1.Global.BaseCharacter?.GetName()]);
          }
          i(false);
        }
      }, 100, "SeamlessTravel.SceneEffect");
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
    this.ypu = undefined;
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.KuroCaptureSceneColor.Release");
  }
  AppearEffect(t) {
    if (this.IsInit && this.Hte?.Actor?.IsValid() && this.ypu?.IsValid()) {
      this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.Hte.ActorTransform, this.vpu, "[SeamlessTravelSceneEffect] AppearEffect", new EffectContext_1.EffectContext(undefined, this.Hte.Actor), 0, undefined, undefined, e => {
        e = EffectSystem_1.EffectSystem.GetSureEffectActor(e);
        if (e?.IsValid()) {
          UE.KuroRenderingRuntimeBPPluginBPLibrary.StopSceneColorShotBeforeTonemap(0, 0);
          if (this.Hte?.Actor.IsValid()) {
            e.K2_AttachToActor(this.Hte.Actor, undefined, 2, 2, 2, false);
          }
          this.ege = e;
          if (this.Spu < TimerSystem_1.MIN_TIME) {
            t?.(true);
          } else {
            TimerSystem_1.TimerSystem.Delay(() => {
              t?.(true);
            }, this.Spu);
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
        if (this.Mpu < TimerSystem_1.MIN_TIME) {
          e?.(true);
        } else {
          TimerSystem_1.TimerSystem.Delay(() => {
            e?.(true);
          }, this.Mpu);
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