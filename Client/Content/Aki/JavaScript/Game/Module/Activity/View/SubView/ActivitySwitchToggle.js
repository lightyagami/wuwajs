"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySwitchToggle = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivitySwitchToggle extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.H5e = undefined;
    this.Nel = new Map();
    this.Fel = 0;
    this.j5e = undefined;
    this.W5e = undefined;
    this.K5e = 0;
    this.Bke = t => {
      if (this.j5e) {
        this.j5e(this.K5e, t);
      }
    };
    this.A5e = () => !this.W5e || this.W5e(this.K5e, this.H5e.GetToggleState());
    this.BNe = t => {
      var e;
      var i = this.Nel.get(t);
      if (i !== undefined) {
        e = this.Vel(t);
        this.Nel.set(t, e);
        if (i && !e) {
          this.Hel(false);
        } else if (!i && e) {
          this.Hel(true);
        }
      }
    };
    this.K5e = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  OnStart() {
    this.H5e = this.GetExtendToggle(0);
    this.H5e.CanExecuteChange.Bind(this.A5e);
    this.GetItem(2).SetUIActive(false);
  }
  OnBeforeShow() {
    this.KBl();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.BNe);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.BNe);
  }
  OnBeforeDestroy() {
    this.Nel.clear();
  }
  BindOnCanToggleExecuteChange(t) {
    this.W5e = t;
  }
  BindOnToggleFunction(t) {
    this.j5e = t;
  }
  SetToggleState(t, e = true) {
    this.H5e.SetToggleStateForce(t ? 1 : 0, e);
  }
  SetToggleTextId(t) {
    this.GetText(1).ShowTextNew(t);
  }
  Hel(t) {
    var e = this.Fel;
    if (t) {
      this.Fel++;
    } else {
      this.Fel--;
    }
    if (e && !this.Fel || !e && this.Fel) {
      this.SetRedDotState(this.Fel > 0);
    }
  }
  SetRedDotState(t) {
    this.GetItem(2).SetUIActive(t);
  }
  GetToggleRedDot() {
    return this.GetItem(2);
  }
  Vel(t) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityRedDotState(t);
  }
  BindRedDotIds(t) {
    this.Nel = new Map();
    this.Fel = 0;
    for (const i of t) {
      var e = this.Vel(i);
      this.Nel.set(i, e);
      if (e) {
        this.Fel++;
      }
    }
    this.SetRedDotState(this.Fel > 0);
  }
  KBl() {
    for (const t of this.Nel.keys()) {
      this.BNe(t);
    }
  }
}
exports.ActivitySwitchToggle = ActivitySwitchToggle;
//# sourceMappingURL=ActivitySwitchToggle.js.map