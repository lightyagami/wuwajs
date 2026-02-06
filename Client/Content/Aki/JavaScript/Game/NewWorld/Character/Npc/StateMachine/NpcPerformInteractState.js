"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformInteractState = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const NpcPerformBaseState_1 = require("./NpcPerformBaseState");
class NpcPerformInteractState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments);
    this.Atr = "";
    this.Qer = undefined;
    this.Ptr = false;
    this.xtr = () => {
      this.StateMachine.Switch(1);
    };
  }
  CanChangeFrom(e) {
    var t = this.Owner.Entity.GetComponent(199);
    return this.Ptr && e === 1 && !t.IsInPlot;
  }
  OnCreate(e) {
    super.OnCreate(e);
    if (e?.ShowOnInteract?.Montage) {
      this.Ptr = true;
      this.Atr = e.ShowOnInteract.Montage;
    } else {
      this.Ptr = false;
    }
  }
  OnEnter(e) {
    ResourceSystem_1.ResourceSystem.LoadAsync(this.Atr, UE.AnimMontage, e => {
      if (e?.IsValid() && this?.Owner?.Valid) {
        this.PlayMontage({
          MontageAsset: e
        });
        this.Qer = e;
      }
    });
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnInteractPlotEnd, this.xtr);
  }
  OnUpdate(e) {}
  OnExit(e) {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnInteractPlotEnd, this.xtr);
    this.Owner.Entity.GetComponent(3).ClearInput();
    this.StopMontage({
      Method: 0,
      BlendOutTime: 0.5,
      Montage: this.Qer
    });
    this.Qer = undefined;
  }
  OnDestroy() {}
}
exports.NpcPerformInteractState = NpcPerformInteractState;
//# sourceMappingURL=NpcPerformInteractState.js.map