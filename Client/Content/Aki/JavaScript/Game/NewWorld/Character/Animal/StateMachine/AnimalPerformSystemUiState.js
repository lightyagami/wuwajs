"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalPerformSystemUiState = undefined;
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiManager_1 = require("../../../../Ui/UiManager");
const AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformSystemUiState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
  constructor() {
    super(...arguments);
    this.lKo = new Map();
    this._Ko = false;
    this.uKo = undefined;
    this.FQe = t => {
      if (this.uKo && this.uKo === t) {
        if (!this._Ko) {
          EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
        }
        this._Ko = true;
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDeliveryProps, this.cKo);
      }
    };
    this.$Ge = t => {
      if (this.uKo && this.uKo === t) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDeliveryProps, this.cKo);
        this.StateMachine.Switch(1);
      }
    };
    this.cKo = t => {
      if (t &&= this.lKo.get(t)) {
        t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(t);
        this.EcologicalInterface.FeedStart(t);
      }
    };
  }
  get SystemUiViewName() {
    return this.uKo;
  }
  set SystemUiViewName(t) {
    this.uKo = t;
  }
  OnEnter(t) {
    if (this.EcologicalInterface?.IsValid() && this.uKo) {
      if (UiManager_1.UiManager.IsViewShow(this.uKo)) {
        this.FQe(this.uKo);
      } else {
        this._Ko = false;
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
      }
      if (t === 0) {
        this.AnimalEcologicalInterface.StateMachineInitializationComplete();
      }
      if (t = this.Owner.GetComponent(217)) {
        this.mKo(t);
      }
      this.EcologicalInterface.SystemUiStart();
    }
  }
  OnExit(t) {
    if (this.EcologicalInterface?.IsValid()) {
      this.Owner.GetComponent(209)?.SetInteractionState(true, "AnimalPerformSystemUiState OnExit");
      this.EcologicalInterface.SystemUiEnd();
      this.Owner.GetComponent(217)?.RemoveTag(1819982634);
      this._Ko = false;
      this.uKo = undefined;
    }
  }
  InitFeedingAnimalConfig(e, i) {
    if (e && i) {
      var s = e.length;
      for (let t = 0; t < s; ++t) {
        var n = e[t];
        var a = i[t];
        if (a) {
          this.lKo.set(n, a);
        }
      }
    }
  }
  mKo(t) {
    if (t?.Valid) {
      if (t.HasTag(502364103)) {
        t.RemoveTag(502364103);
        t.AddTag(1900394806);
      }
      if (t.HasTag(393622611)) {
        t.RemoveTag(393622611);
        t.AddTag(1900394806);
      }
      if (t.HasTag(276015887)) {
        t.RemoveTag(276015887);
        t.AddTag(379545977);
      }
      t.AddTag(1819982634);
    }
  }
}
exports.AnimalPerformSystemUiState = AnimalPerformSystemUiState;
//# sourceMappingURL=AnimalPerformSystemUiState.js.map