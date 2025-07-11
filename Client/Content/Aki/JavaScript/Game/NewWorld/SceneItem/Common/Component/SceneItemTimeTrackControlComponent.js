"use strict";

var SceneItemTimeTrackControlComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, o) {
  var r;
  var n = arguments.length;
  var s = n < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, i, o);
  } else {
    for (var m = e.length - 1; m >= 0; m--) {
      if (r = e[m]) {
        s = (n < 3 ? r(s) : n > 3 ? r(t, i, s) : r(t, i)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(t, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemTimeTrackControlComponent = undefined;
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGameplayActionsDefine_1 = require("../../../../LevelGamePlay/LevelGameplayActionsDefine");
const performSeqTagId = -1438951185;
let SceneItemTimeTrackControlComponent = SceneItemTimeTrackControlComponent_1 = class SceneItemTimeTrackControlComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Lie = undefined;
    this.mBe = undefined;
    this.m_n = undefined;
    this.d_n = undefined;
    this.C_n = 0;
    this.g_n = () => {
      var e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(performSeqTagId);
      if (this.Hte && this.Lie && e) {
        if (this.mBe.State === 2) {
          if (!this.Lie.HasTag(performSeqTagId)) {
            this.Lie.AddTag(performSeqTagId);
            this.Hte.SetActiveTagSequencePlaybackProgress(e, this.C_n);
            this.Hte.PauseActiveTagSequence(e);
          }
        } else if (this.Lie.HasTag(performSeqTagId)) {
          this.C_n = this.Hte.GetActiveTagSequencePlaybackProgress(e) ?? 0;
          this.Hte.PauseActiveTagSequence(e);
        }
      }
    };
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemTimeTrackControlComponent_1)[0];
    this.m_n = e.ControlGroups;
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(202);
    this.Lie = this.Entity.GetComponent(205);
    this.mBe = this.Entity.GetComponent(133);
    return true;
  }
  OnActivate() {
    var e = this.Entity.GetComponent(197);
    if (e) {
      var t = e.GetInteractController();
      if (t) {
        let e = 0;
        for (const i of this.m_n) {
          this.f_n(t, e, i);
          e++;
        }
        if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
          EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
        }
        if (this.mBe.State !== 0) {
          this.g_n();
        }
      }
    }
    return true;
  }
  OnEnd() {
    if (this.d_n?.Valid()) {
      TimerSystem_1.TimerSystem.Remove(this.d_n);
      this.d_n = undefined;
    }
    if (this.Lie?.HasTag(performSeqTagId)) {
      this.Lie.RemoveTag(performSeqTagId);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    }
    return true;
  }
  GetTimeTrackControlConfig(e) {
    if (!(this.m_n.length < e)) {
      return this.m_n[e];
    }
  }
  f_n(e, t, i) {
    var o = new LevelGameplayActionsDefine_1.ActionTimeTrackControl();
    o.ConfigIndex = t;
    o.EntityId = this.Entity.GetComponent(0).GetCreatureDataId();
    var r = e.GetInteractiveOption();
    e.AddClientInteractOption(o, i.Condition, r ? r.DoIntactType : "Direct", undefined, this.m_n[t].TidContent, undefined, undefined, true);
  }
  GetTargetActions(i) {
    if (i) {
      let t = undefined;
      for (const e of this.m_n[i.ops].ControlPointEvents) {
        if (e.Index === i.nps) {
          t = e;
          break;
        }
      }
      if (t) {
        let e = undefined;
        switch (i.sps) {
          case Protocol_1.Aki.Protocol.lks.Proto_LeftIn:
            e = t.LeftInEventActions;
            break;
          case Protocol_1.Aki.Protocol.lks.Proto_LeftOut:
            e = t.LeftOutEventActions;
            break;
          case Protocol_1.Aki.Protocol.lks.Proto_RightIn:
            e = t.RightInEventActions;
            break;
          case Protocol_1.Aki.Protocol.lks.Proto_RightOut:
            e = t.RightOutEventActions;
        }
        return e;
      }
    }
  }
  PlayActiveSeqForDuration(e, t) {
    const i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(performSeqTagId);
    if (this.Hte && this.Lie && i && (this.Hte.GetActiveTagSequencePlaybackProgress(i) === undefined && (this.Lie.HasTag(performSeqTagId) && this.Lie.RemoveTag(performSeqTagId), this.Lie.AddTag(performSeqTagId), this.Hte.SetActiveTagSequencePlaybackProgress(i, this.C_n), this.Hte.PauseActiveTagSequence(i)), this.d_n?.Valid() && (TimerSystem_1.TimerSystem.Remove(this.d_n), this.d_n = undefined), t !== 0) && (this.Hte.ResumeActiveTagSequence(i, e), t > 0)) {
      this.d_n = TimerSystem_1.TimerSystem.Delay(() => {
        this.Hte?.PauseActiveTagSequence(i);
        this.d_n = undefined;
      }, t * CommonDefine_1.MILLIONSECOND_PER_SECOND);
    }
  }
};
SceneItemTimeTrackControlComponent = SceneItemTimeTrackControlComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(134)], SceneItemTimeTrackControlComponent);
exports.SceneItemTimeTrackControlComponent = SceneItemTimeTrackControlComponent; //# sourceMappingURL=SceneItemTimeTrackControlComponent.js.map