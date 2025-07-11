"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExitSkillView = exports.ExitSkillViewData = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ExitSkillItem_1 = require("./ExitSkillItem");
class ExitSkillViewData {
  constructor() {
    this.e4 = undefined;
    this.e4 = new Array();
  }
  AddData(i, t, e) {
    var s = new ExitSkillItem_1.ExitSkillItemData();
    s.RoleId = i;
    s.OnlineIndex = t;
    s.PlayerId = e;
    this.e4.push(s);
  }
  GetItems() {
    return this.e4;
  }
}
exports.ExitSkillViewData = ExitSkillViewData;
class ExitSkillView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.P5t = undefined;
    this.x5t = false;
    this.I5t = () => {
      UiManager_1.UiManager.CloseView("ExitSkillView");
    };
    this.w5t = i => {
      ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc = i;
      this.x5t = i;
      this.B5t(this.x5t);
      const e = this.Pe?.GetItems();
      if (e !== undefined) {
        this.P5t.forEach((i, t) => {
          i.Refresh(e[t], this.x5t);
        });
      }
    };
    this.C4t = i => {
      var t = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
      for (let i = 0; i < this.P5t.length; i++) {
        var e = this.P5t[i];
        var s = t[i];
        var r = s?.GetRoleData;
        if (s && r) {
          (s = new ExitSkillItem_1.ExitSkillItemData()).RoleId = r.ConfigId;
          s.OnlineIndex = r.OnlineIndex;
          s.PlayerId = r.PlayerId;
          e.Refresh(s, this.x5t);
        } else {
          e.Refresh(undefined, false);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIText], [8, UE.UIExtendToggle], [9, UE.UIItem]];
    this.BtnBindInfo = [[5, this.I5t], [6, this.I5t], [8, this.w5t]];
  }
  OnBeforeDestroy() {
    this.Pe = undefined;
    this.P5t?.splice(0, this.P5t.length);
    this.P5t = undefined;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, this.C4t);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, this.C4t);
  }
  OnStart() {
    this.Pe = this.OpenParam;
    this.P5t = new Array();
    var t = [this.GetItem(2), this.GetItem(3), this.GetItem(4)];
    var i = ModelManager_1.ModelManager.GameModeModel.IsMulti;
    this.GetItem(9).SetUIActive(i);
    this.x5t = ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc && i;
    var i = this.x5t ? 1 : 0;
    this.GetExtendToggle(8).SetToggleState(i);
    this.B5t(this.x5t);
    var e = this.Pe?.GetItems();
    for (let i = 0; i < t.length; i++) {
      var s = new ExitSkillItem_1.ExitSkillItem(t[i]);
      this.P5t.push(s);
      if (e && i < e.length) {
        s.Refresh(e[i], this.x5t);
      } else {
        s.Refresh(undefined, false);
      }
    }
  }
  B5t(i) {
    let t = "Text_EditFormationSkill_Text";
    if (i) {
      t = "Text_EditFormationSkill_online_Text";
    }
    i = this.GetText(7);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
  }
}
exports.ExitSkillView = ExitSkillView;
//# sourceMappingURL=ExitSkillView.js.map