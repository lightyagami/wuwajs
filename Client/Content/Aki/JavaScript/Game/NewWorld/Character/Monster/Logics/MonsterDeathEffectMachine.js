"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterDeathEffectMachine = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const IEntity_1 = require("../../../../../UniverseEditor/Interface/IEntity");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
const RenderConfig_1 = require("../../../../Render/Config/RenderConfig");
const DEATH_EFFECT_MAX_TIME = 10000;
const DEATH_MATERIAL_TOLERANCE_TIME = 500;
class MonsterDeathEffectMachine {
  constructor() {
    this.Jh = undefined;
    this.eat = undefined;
    this.Mim = undefined;
    this.Nql = 0;
    this.Fql = -1;
    this.Vql = 0;
    this.Hql = undefined;
    this.jql = undefined;
    this.LSd = undefined;
    this.z4l = undefined;
    this.Wql = (t, e) => {
      if (t === this.Nql) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效播放结束, 继续执行死亡流程", ["handleId", t]);
        }
        if (e) {
          EffectSystem_1.EffectSystem.RemoveFinishCallback(t, this.Wql);
        }
        this.Mim?.();
        this.Qql();
        this.Nql = 0;
      }
    };
    this.Kql = (t, e) => {
      if (t === this.Fql) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡材质播放结束, 继续执行死亡流程", ["materialId", t]);
        }
        this.Mim?.();
        this.$ql();
        this.Qql();
        this.Fql = -1;
        this.Hql = undefined;
      }
    };
  }
  Init(t, e, i) {
    this.Jh = t;
    this.eat = e;
    this.Mim = i;
  }
  Clear() {
    this.Xql();
    this.Jh = undefined;
    this.eat = undefined;
    this.Mim = undefined;
  }
  Play() {
    var t;
    var e;
    if (this.eat) {
      e = [];
      if ((t = this.eat).ParticleEffect) {
        e.push({
          Path: t.ParticleEffect,
          EndRule: t.EndRule ?? 0
        });
      }
      if (t.MaterialEffect) {
        e.push({
          Path: t.MaterialEffect,
          EndRule: t.EndRule ?? 0
        });
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效流程开始");
      }
      this.J4l(e);
    } else {
      this.Mim?.();
    }
  }
  async J4l(t) {
    var e = [];
    for (const o of t) {
      e.push(this.Yql(o));
    }
    await Promise.all(e);
    let i = false;
    let s = false;
    if (this.z4l) {
      this.z4l.sort((t, e) => e.CallbackPriority - t.CallbackPriority);
      for (const h of this.z4l) {
        if (h.DataAsset instanceof UE.EffectModelGroup_C) {
          i = this.Jql(h.Path, h.DataAsset, h.NeedCallback && !s) || i;
        } else if (h.DataAsset instanceof UE.PD_CharacterControllerData_C || h.DataAsset instanceof UE.PD_CharacterControllerDataGroup_C) {
          i = this.Zql(h.Path, h.DataAsset, h.NeedCallback && !s) || i;
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效播放失败, 请检查资源类型", ["path", h.Path], ["type", typeof h.DataAsset]);
        }
        if (i && h.NeedCallback) {
          s = true;
        }
      }
    }
    if (i) {
      this.eGl();
      this.tGl();
    } else {
      this.Mim?.();
    }
  }
  async Yql(e) {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e.Path, UE.Object, t => {
      if (t) {
        this.PSd(e, t);
        this.z4l ||= [];
        this.z4l.push(e);
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效加载失败, 请检查资源路径", ["path", e.Path]);
      }
      i.SetResult();
    });
    return i.Promise;
  }
  PSd(t, e) {
    t.DataAsset = e;
    t.CallbackPriority = 0;
    t.NeedCallback = false;
    if (t.EndRule === IEntity_1.EMonsterDeathEffectEndRule.Any) {
      if (e instanceof UE.EffectModelGroup_C) {
        t.CallbackPriority = 2;
        if (e.StartTime > 0 && e.LoopTime === 0) {
          t.NeedCallback = true;
        }
      } else if (e instanceof UE.PD_CharacterControllerData_C) {
        t.CallbackPriority = 1;
        if (e.LoopTime.Loop === 0) {
          t.NeedCallback = true;
        }
      } else if (e instanceof UE.PD_CharacterControllerDataGroup_C) {
        t.CallbackPriority = 1;
        t.NeedCallback = true;
      }
    } else if (t.EndRule === IEntity_1.EMonsterDeathEffectEndRule.Particle && e instanceof UE.EffectModelGroup_C || t.EndRule === IEntity_1.EMonsterDeathEffectEndRule.Material && (e instanceof UE.PD_CharacterControllerData_C || e instanceof UE.PD_CharacterControllerDataGroup_C)) {
      t.CallbackPriority = 10;
      t.NeedCallback = true;
    }
  }
  Jql(t, e, i) {
    var s = this.Jh?.GetComponent(3);
    var o = s?.Owner;
    var h = new EffectContext_1.EffectContext();
    h.SourceObject = o;
    h.EntityId = this.Jh?.Id;
    var o = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, o?.D_GetTransform(), t, "[MonsterDeathComponent.PlayDeathEffect]", h, 0);
    if (o !== 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效开始播放", ["handleId", o]);
      }
      EffectSystem_1.EffectSystem.GetEffectActor(o).K2_AttachToComponent(s?.SkeletalMesh, RenderConfig_1.RenderConfig.RootName, 2, 1, 1, false);
      this.Nql = o;
      if (i) {
        EffectSystem_1.EffectSystem.AddFinishCallback(o, this.Wql);
      }
      return true;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效播放失败, 请检查特效参数", ["path", t]);
      }
      return false;
    }
  }
  Zql(i, s, o) {
    var h = this.Jh?.GetComponent(3)?.Actor.CharRenderingComponent;
    if (h) {
      this.Hql = h;
      let t = -1;
      if (s instanceof UE.PD_CharacterControllerData_C) {
        t = h.AddMaterialControllerData(s);
      } else if (s instanceof UE.PD_CharacterControllerDataGroup_C) {
        t = h.AddMaterialControllerDataGroup(s);
      }
      let e = false;
      if (o && t !== -1) {
        e = this.iGl(s, t);
      }
      if (o && !e && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡材质设置回调失败", ["path", i]);
      }
      if (t !== -1) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡材质开始播放", ["materialId", t]);
        }
        this.Fql = t;
        return true;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡材质播放失败, 请检查资源类型", ["path", i], ["type", typeof s]);
      }
    } else {
      this.Mim?.();
    }
    return false;
  }
  iGl(s, t) {
    if (this.Hql) {
      if (s instanceof UE.PD_CharacterControllerData_C) {
        var e = this.Hql.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
        if (e) {
          if (s.DataType === 0) {
            e.AddEffectFinishCallback(this.Kql);
            this.Vql = 1;
            return true;
          }
          e = s.LoopTime.Start + s.LoopTime.End;
          if (e > 0) {
            this.LSd = TimerSystem_1.TimerSystem.Delay(() => {
              this.Kql(t);
            }, e * TimeUtil_1.TimeUtil.InverseMillisecond + DEATH_MATERIAL_TOLERANCE_TIME);
            this.Vql = 3;
            return true;
          }
        }
      } else if (s instanceof UE.PD_CharacterControllerDataGroup_C) {
        let e = 0;
        let i = false;
        for (let t = 0; t < s.DataMap.Num(); t++) {
          var o = s.DataMap.GetKey(t);
          if (o.DataType !== 0 || o.LoopTime.Loop > 0) {
            i = true;
          }
          if (o.LoopTime.Loop === 0) {
            e = Math.max(e, o.LoopTime.Start + o.LoopTime.End);
          }
        }
        if (!i) {
          EventSystem_1.EventSystem.AddWithTarget(this.Hql, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.Kql);
          this.Vql = 2;
          return true;
        }
        if (e > 0) {
          this.LSd = TimerSystem_1.TimerSystem.Delay(() => {
            this.Kql(t);
          }, e * TimeUtil_1.TimeUtil.InverseMillisecond + DEATH_MATERIAL_TOLERANCE_TIME);
          this.Vql = 3;
          return true;
        }
      }
    }
    this.Vql = 0;
    return false;
  }
  $ql() {
    var t;
    if (this.Hql) {
      if (this.Vql === 1) {
        if (t = this.Hql.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2)) {
          t.RemoveEffectFinishCallback(this.Kql);
        }
      } else if (this.Vql === 2) {
        if (EventSystem_1.EventSystem.HasWithTarget(this.Hql, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.Kql)) {
          EventSystem_1.EventSystem.RemoveWithTarget(this.Hql, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.Kql);
        }
      } else if (this.Vql === 3 && this.LSd) {
        TimerSystem_1.TimerSystem.Remove(this.LSd);
        this.LSd = undefined;
      }
    }
    this.Vql = 0;
  }
  eGl() {
    this.Jh?.GetComponent(133)?.SetTimeScale(100, 0, undefined, DEATH_EFFECT_MAX_TIME, 12);
  }
  tGl() {
    this.Qql();
    this.jql = TimerSystem_1.TimerSystem.Delay(() => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效播放超时, 执行保底逻辑, 请检查特效参数", ["handleId", this.Nql], ["materialId", this.Fql]);
      }
      this.jql = undefined;
      if (this.Nql !== 0) {
        this.Wql(this.Nql, true);
      } else if (this.Fql !== -1) {
        this.Kql(this.Fql, true);
      } else {
        this.Mim?.();
      }
    }, DEATH_EFFECT_MAX_TIME);
  }
  Qql() {
    if (this.jql) {
      TimerSystem_1.TimerSystem.Remove(this.jql);
      this.jql = undefined;
    }
  }
  Xql() {
    this.Qql();
    if (this.Vql !== 0) {
      this.$ql();
    }
    if (this.Nql !== 0) {
      EffectSystem_1.EffectSystem.RemoveFinishCallback(this.Nql, this.Wql);
    }
    this.z4l = undefined;
    this.Hql = undefined;
    this.Nql = 0;
    this.Fql = -1;
  }
}
exports.MonsterDeathEffectMachine = MonsterDeathEffectMachine;
//# sourceMappingURL=MonsterDeathEffectMachine.js.map