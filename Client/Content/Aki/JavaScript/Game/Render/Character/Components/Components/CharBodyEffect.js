"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharBodyEffect = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharBodyEffect extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments);
    this.Entity = undefined;
    this.vJ = undefined;
    this.CastShadow = true;
    this.Visible = true;
    this.Opacity = 1;
    this.PendingCastShadow = true;
    this.PendingVisible = true;
    this.PendingOpacity = 1;
    this.PendingEffectOpacity = 1;
    this.EffectHandles = [];
    this.NeedUpdate = false;
    this.gfn = t => {
      var e = this.EffectHandles.indexOf(t);
      if (!(e < 0)) {
        this.EffectHandles.splice(e, 1);
        EffectSystem_1.EffectSystem.RemoveFinishCallback(t, this.gfn);
      }
    };
    this.OnSetActorVisible = (t, e) => {
      if (!this.Entity || t === this.Entity.Id) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Render", 25, "BodyEffect OnSetActorVisible", ["Actor", this.GetRenderingComponent()?.GetCachedOwnerName()], ["Entity", this.Entity], ["visible", e]);
        }
        this.ehr(e);
      }
    };
    this.yvi = () => {
      for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
        if (t.IsControl() && t.EntityHandle?.Entity === this.Entity) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Render", 25, "BodyEffect OnChangeTeam", ["Actor", this.GetRenderingComponent()?.GetCachedOwnerName()], ["Entity", this.Entity], ["visible", true]);
          }
          this.ehr(true);
          return;
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Render", 25, "BodyEffect OnChangeTeam", ["Actor", this.GetRenderingComponent()?.GetCachedOwnerName()], ["Entity", this.Entity], ["visible", false]);
      }
      this.ehr(false);
    };
    this.xie = (t, e) => {
      if (t.Entity === this.Entity) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Render", 25, "BodyEffect OnChangeRole", ["Actor", this.GetRenderingComponent()?.GetCachedOwnerName()], ["Entity", this.Entity], ["visible", true]);
        }
        this.ehr(true);
      }
    };
    this.M9s = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Render", 25, "BodyEffect OnGoDownFinish", ["Actor", this.GetRenderingComponent()?.GetCachedOwnerName()], ["Entity", this.Entity], ["visible", false]);
      }
      this.ehr(false);
    };
  }
  GetStatName() {
    return "CharBodyEffect";
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdBodyEffect;
  }
  Awake(t) {
    super.Awake(t);
  }
  RegisterEffect(t) {
    if (this.EffectHandles.indexOf(t) >= 0) {
      EffectSystem_1.EffectSystem.UpdateBodyEffect(t, this.Opacity, this.Visible, this.CastShadow);
    } else {
      this.EffectHandles.push(t);
      if (this.Opacity !== 1 || !this.Visible || !this.CastShadow) {
        EffectSystem_1.EffectSystem.UpdateBodyEffect(t, this.Opacity, this.Visible, this.CastShadow);
      }
      EffectSystem_1.EffectSystem.AddFinishCallback(t, this.gfn);
    }
  }
  UnregisterEffect(t) {
    var e = this.EffectHandles.indexOf(t);
    if (!(e < 0)) {
      EffectSystem_1.EffectSystem.UpdateBodyEffect(t, 1, true, true);
      this.EffectHandles.splice(e, 1);
      EffectSystem_1.EffectSystem.RemoveFinishCallback(t, this.gfn);
    }
  }
  Start() {
    this.Opacity = 1;
    var t = this.GetRenderingComponent().GetOwner();
    if (t instanceof TsBaseCharacter_1.default && t.CharacterActorComponent?.Entity) {
      this.Entity = t.CharacterActorComponent.Entity;
      this.vJ = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(this.Entity.Id);
      EventSystem_1.EventSystem.AddWithTarget(this.vJ, EventDefine_1.EEventName.OnSetActorHidden, this.OnSetActorVisible);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.yvi);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoDownFinish, this.M9s);
    }
    this.OnInitSuccess();
  }
  Update() {
    if (this.NeedUpdate) {
      this.Visible = this.PendingVisible;
      this.Opacity = Math.min(this.PendingOpacity, this.PendingEffectOpacity);
      this.CastShadow = this.PendingCastShadow;
      for (const t of this.EffectHandles) {
        EffectSystem_1.EffectSystem.UpdateBodyEffect(t, this.Opacity, this.Visible, this.CastShadow);
      }
      this.NeedUpdate = false;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Render", 25, "BodyEffectUpdate", ["Actor", this.GetRenderingComponent()?.GetCachedOwnerName()], ["Opacity", this.Opacity], ["Visible", this.Visible], ["CastShadow", this.CastShadow]);
      }
    }
  }
  LateUpdate() {}
  Destroy() {
    if (this.Entity) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.vJ, EventDefine_1.EEventName.OnSetActorHidden, this.OnSetActorVisible);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.yvi);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoDownFinish, this.M9s);
    }
  }
  SetOpacity(t, e = false) {
    if (!this.NeedUpdate) {
      if (e && MathUtils_1.MathUtils.IsNearlyEqual(this.PendingEffectOpacity, t)) {
        return;
      }
      if (!e && MathUtils_1.MathUtils.IsNearlyEqual(this.PendingOpacity, t)) {
        return;
      }
    }
    if (e) {
      this.PendingEffectOpacity = t;
    } else {
      this.PendingOpacity = t;
    }
    this.NeedUpdate = true;
    TimerSystem_1.TimerSystem.Next(() => {
      this.Update();
    });
  }
  ehr(t) {
    if (!!this.NeedUpdate || this.Visible !== t) {
      this.PendingVisible = t;
      this.NeedUpdate = true;
      TimerSystem_1.TimerSystem.Next(() => {
        this.Update();
      });
    }
  }
  SetCastShadow(t) {
    if (!!this.NeedUpdate || this.CastShadow !== t) {
      this.PendingCastShadow = t;
      this.NeedUpdate = true;
      TimerSystem_1.TimerSystem.Next(() => {
        this.Update();
      });
    }
  }
}
exports.CharBodyEffect = CharBodyEffect;
//# sourceMappingURL=CharBodyEffect.js.map