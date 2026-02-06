"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewPlayerSupportTrialRoleListComponent = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ActivityNewPlayerSupportDefine_1 = require("../ActivityNewPlayerSupportDefine");
const NewPlayerSupportTrialRoleListItem_1 = require("./NewPlayerSupportTrialRoleListItem");
class NewPlayerSupportTrialRoleListComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.qKs = [];
    this.ROf = undefined;
    this.dNf = undefined;
    this.rCg = undefined;
    this.yil = undefined;
    this.LOf = (e, t) => {
      if (this.ROf) {
        this.ROf.SetSelected(false);
      }
      e.SetSelected(true);
      this.ROf = e;
      if (this.dNf) {
        this.dNf(t);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGroupTrialRoleRedDotUpdate);
    };
    this.oCg = () => !this.rCg || this.rCg();
    this.yil = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.yil.GetTrialRoleList() ?? [];
    let t = 0;
    var i = [];
    for (const o of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
      var s = this.GetItem(o);
      if (s) {
        var r = e[t];
        if (!r) {
          break;
        }
        i.push(this.uyi(s, r));
        t++;
      }
    }
    await Promise.all(i);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGroupTrialRoleRedDotUpdate);
  }
  async uyi(e, t) {
    t = new NewPlayerSupportTrialRoleListItem_1.NewPlayerSupportTrialRoleListItem(t);
    t.SetSelectCallback(this.LOf);
    t.SetCanSelectCallback(this.oCg);
    this.qKs.push(t);
    await t.CreateThenShowByResourceIdAsync(ActivityNewPlayerSupportDefine_1.TRIAL_ROLE_LIST_ITEM_RESOURCE_ID, e);
  }
  RefreshDefaultSelected(e = undefined) {
    var t = this.yil.CurUseTrialRoleGroupData();
    const i = e ?? t?.TrialRoleGroupId;
    e = this.yil.GetTrialRoleList() ?? [];
    let s = -1;
    if ((s = (s = i ? e.findIndex(e => e.TrialRoleGroupId === i) : s) < 0 ? e.findIndex(e => e.IsUnlocked()) : s) < 0) {
      s = 0;
    }
    (this.qKs?.[s]).SelectItem();
  }
  SetSelectRoleItemCallback(e) {
    this.dNf = e;
  }
  SetCanSelectRoleItemCallback(e) {
    this.rCg = e;
  }
}
exports.NewPlayerSupportTrialRoleListComponent = NewPlayerSupportTrialRoleListComponent;
//# sourceMappingURL=NewPlayerSupportTrialRoleListComponent.js.map