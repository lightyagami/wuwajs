"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var r = arguments.length;
  var h = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
        h = (r < 3 ? o(h) : r > 3 ? o(e, i, h) : o(e, i)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemStateComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const Global_1 = require("../../../../Global");
const LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BulletController_1 = require("../../../Bullet/BulletController");
const MIN_DELAY_THRESHOLD = 0.1;
const RESET_LIMIT = 2;
const SERVER_DATA = "bys";
let SceneItemStateComponent = class SceneItemStateComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this._ii = 1;
    this.W1n = undefined;
    this.JUn = undefined;
    this.BehaviorMap = undefined;
    this.Hte = undefined;
    this.r_n = undefined;
    this.StateConfig = undefined;
    this.s_n = false;
    this.Wpo = undefined;
    this.Xte = undefined;
    this.nXr = undefined;
    this.JQr = undefined;
    this.a_n = undefined;
    this.h_n = undefined;
    this.l_n = undefined;
    this.__n = undefined;
    this.I5a = undefined;
    this.Sj1 = undefined;
    this.Rnn = () => {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
      var t = this.r_n?.CreateStageConfig.PerformDuration;
      if (t >= MIN_DELAY_THRESHOLD) {
        this.I5a = TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
          this.T5a(false);
        }, t * TimeUtil_1.TimeUtil.InverseMillisecond);
      } else {
        LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(this.Wpo);
        this.s_n = true;
      }
    };
    this.u_n = t => {
      TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
        ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
      }, RESET_LIMIT * TimeUtil_1.TimeUtil.InverseMillisecond);
    };
  }
  get IsInteractState() {
    return this.s_n && this.l_n;
  }
  get State() {
    return this._ii;
  }
  get StateTagId() {
    return this.W1n || 0;
  }
  OnInitData() {
    var t = this.Entity?.GetComponent(0);
    this.Hte = this.Entity?.GetComponent(1);
    if (t) {
      this.JQr = t.GetSummonerId();
      this.nXr = this.Hte?.CreatureData.GetModelConfig();
      this.s_n = true;
      this.l_n = true;
      var e = t.GetPbEntityInitData();
      if (e) {
        this.Xte = this.Entity?.GetComponent(197);
        this.Wpo = t.GetCreatureDataId();
        this.r_n = (0, IComponent_1.getComponent)(e.ComponentsData, "SceneItemLifeCycleComponent");
        this.StateConfig = (0, IComponent_1.getComponent)(e.ComponentsData, "EntityStateComponent");
        var e = (0, IComponent_1.getComponent)(e.ComponentsData, "EntityStateComponent");
        this.BehaviorMap = new Map();
        var i = e;
        var s = e?.StateChangeBehaviors;
        if (i && s) {
          let t = 0;
          for (const o of e.StateChangeBehaviors) {
            this.BehaviorMap.set(t, o.Action);
            t++;
          }
        }
        i = t.ComponentDataMap.get(SERVER_DATA)?.bys;
        this.W1n = i.X5n;
        s = t.ComponentDataMap.get("Wys");
        if (s) {
          this.JUn = MathUtils_1.MathUtils.LongToBigInt(s.Wys?._Vn);
        }
      }
    }
    return true;
  }
  OnStart() {
    this.c_n(this.W1n);
    return true;
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    if (this.a_n !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.a_n);
    }
    return true;
  }
  IsInState(t) {
    return this._ii === t;
  }
  StartFadeOut() {
    var t;
    if (this.Sj1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 79, "[SceneItemStateComponent] 实体尝试重复渐出", ["Context", context], ["CreatureDataId", this.Wpo]);
      }
    } else {
      this.Xte?.AddTag(-416978627);
      t = ControllerHolder_1.ControllerHolder.CreatureController.LeaveAoiFadeOutDuration;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Level", 79, "[SceneItemStateComponent] 实体渐出", ["CreatureDataId", this.Wpo], ["Duration", t]);
      }
      this.Sj1 = TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
        if (this.Entity?.Valid) {
          this.Xte?.RemoveTag(-416978627);
          ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
          this.Sj1 = undefined;
        }
      }, t * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
  StopFadeOut() {
    if (this.Sj1) {
      TimerSystem_1.FlowTimeTimerSystem.Remove(this.Sj1);
      this.Sj1 = undefined;
    }
  }
  HandleDestroyState() {
    var t;
    var e;
    this.s_n = false;
    if (this.Xte?.HasTag(-991879492)) {
      this.Xte?.RemoveTag(-991879492);
      this.UpdateState(-1278190765, true);
    }
    if (this._ii !== 3 || !this.r_n) {
      if (e = this.Entity.GetComponent(164)) {
        t = (t = this.StateConfig?.State) ? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t) : undefined;
        if (this.W1n !== t) {
          e.ResetToInitState(this.StateConfig.State, this.u_n);
        } else {
          ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
        }
        return;
      } else {
        return undefined;
      }
    }
    if (this.__n === undefined) {
      if ((t = this.r_n.DestroyStageConfig?.BulletId) && this.JQr !== undefined) {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.JQr);
        BulletController_1.BulletController.CreateBulletCustomTarget(e ? e.Entity : Global_1.Global.BaseCharacter, t.toString(), this.Hte.ActorTransform, {}, this.JUn);
      }
      if (e = this.r_n.DestroyStageConfig?.PerformDuration) {
        this.__n = TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
          if (this.Entity?.Valid) {
            ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
            this.__n = undefined;
          }
        }, e * TimeUtil_1.TimeUtil.InverseMillisecond);
      } else {
        ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
      }
    }
  }
  c_n(t) {
    const e = this.r_n?.CreateStageConfig?.BulletConfig?.BulletId;
    if (e && this.JQr !== undefined && ModelManager_1.ModelManager.CreatureModel.GetEntity(this.JQr)) {
      var i = this.r_n?.CreateStageConfig?.BulletConfig?.Delay;
      const s = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.JQr);
      if (i >= MIN_DELAY_THRESHOLD) {
        this.a_n = TimerSystem_1.TimerSystem.Delay(() => {
          BulletController_1.BulletController.CreateBulletCustomTarget(s ? s.Entity : Global_1.Global.BaseCharacter, e.toString(), this.Hte.ActorTransform, {}, this.JUn);
          this.a_n = undefined;
        }, i * TimeUtil_1.TimeUtil.InverseMillisecond);
      } else {
        BulletController_1.BulletController.CreateBulletCustomTarget(s ? s.Entity : Global_1.Global.BaseCharacter, e.toString(), this.Hte.ActorTransform, {}, this.JUn);
      }
    }
    i = 0;
    this.s_n = false;
    if (t !== 2096634051) {
      this.UpdateState(t, true, true);
    } else {
      this.W1n = t;
      this._ii = 0;
      i = this.r_n?.CreateStageConfig.PerformDuration;
      t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-991879492);
      if (this.nXr?.场景交互物状态列表.Get(t) !== undefined && (this.Xte.AddTag(-991879492), !this.Entity.GetComponent(203).GetIsSceneInteractionLoadCompleted())) {
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
      } else if (i >= MIN_DELAY_THRESHOLD) {
        this.I5a = TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
          this.T5a(false);
        }, i * TimeUtil_1.TimeUtil.InverseMillisecond);
      } else {
        LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(this.Wpo);
        this.s_n = true;
      }
    }
  }
  UpdateState(t, e, i = false) {
    if (this._ii === 0) {
      this.T5a(true);
    }
    this.s_n = e;
    this.W1n = t;
    switch (this.W1n) {
      case -1152559349:
        this._ii = 1;
        break;
      case -3775711:
        this._ii = 2;
        break;
      case 1298716444:
        this._ii = 4;
        break;
      case -1278190765:
        this._ii = 3;
        break;
      default:
        this._ii = 5;
    }
    if (!i) {
      if (e) {
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, t, true);
      } else {
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChange, t);
      }
    }
  }
  ChangePerformanceState(t, e = false, i) {
    if (t !== this.h_n || !!e) {
      if (this.h_n) {
        e = this.h_n;
        this.h_n = t;
        this.Xte?.ChangeLocalLevelTag(this.h_n, e);
      } else {
        this.h_n = t;
        this.Xte?.AddTag(t);
      }
      this.l_n = t !== -687845000;
    }
  }
  GetLifeCycleStageActions(t) {
    return (t ? this.r_n?.CreateStageConfig : this.r_n?.DestroyStageConfig).Actions;
  }
  T5a(t) {
    this.Xte?.RemoveTag(-991879492);
    if (t) {
      if (TimerSystem_1.FlowTimeTimerSystem.Has(this.I5a) && this.I5a) {
        TimerSystem_1.FlowTimeTimerSystem.Remove(this.I5a);
      }
    } else {
      this.s_n = true;
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(this.Wpo);
    }
    this.I5a = undefined;
  }
};
SceneItemStateComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(134)], SceneItemStateComponent);
exports.SceneItemStateComponent = SceneItemStateComponent; //# sourceMappingURL=SceneItemStateComponent.js.map