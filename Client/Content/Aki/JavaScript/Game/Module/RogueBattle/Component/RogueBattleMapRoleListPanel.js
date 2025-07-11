"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapRoleListPanel = exports.RogueBattleMapRoleLayoutItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const RoleController_1 = require("../../RoleUi/RoleController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RogueBattleMapRoleListGrid_1 = require("./RogueBattleMapRoleListGrid");
class RogueBattleMapRoleLayoutItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.tFe = undefined;
    this.Vlo = [];
    this.Uy1 = undefined;
    this.uyi = () => {
      var e = new RogueBattleMapRoleListGrid_1.RogueBattleMapRoleLayoutGrid();
      e.BindOnCanExecuteChange(this.CanExecuteChangeFunction);
      return e;
    };
    this.CanExecuteChangeFunction = (e, t, i) => {
      return i !== 1 || this.Uy1 !== e.ConfigId;
    };
    this.Dy1 = e => {
      var t = this.Uy1;
      this.Uy1 = this.Vlo.includes(e) ? e : undefined;
      if (t !== undefined) {
        this.tFe.GetSelectedProxy()?.SetSelected(false);
      }
      if (this.Uy1) {
        this.tFe.SelectGridProxy(this.Vlo.indexOf(e));
        this.tFe.GetSelectedProxy()?.SetSelected(true);
        t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
        RoleController_1.RoleController.OnSelectedRoleChangeByConfig(e, t.SkinId);
      }
    };
    this.GB1 = () => {
      var e;
      if (this.Uy1) {
        e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Uy1);
        RoleController_1.RoleController.OnSelectedRoleChangeByConfig(this.Uy1, e.SkinId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIGridLayout], [3, UE.UIItem]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate, this.Dy1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResMapSummaryTeamShowAgain, this.GB1);
    this.tFe = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.uyi);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate, this.Dy1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResMapSummaryTeamShowAgain, this.GB1);
  }
  Refresh(e, t, i) {
    this.Vlo = e;
    var r = ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(e[0]);
    var s = r ? "RogueRes_Overall_Role_8" : "RogueRes_Overall_Role_9";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s);
    var n = new Array();
    for (const a of e) {
      var o = {
        ConfigId: a,
        IsGain: r,
        NeedLevel: true
      };
      n.push(o);
    }
    this.tFe.RefreshByData(n, () => {
      if (this.Uy1) {
        this.Dy1(this.Uy1);
      }
    });
  }
}
exports.RogueBattleMapRoleLayoutItem = RogueBattleMapRoleLayoutItem;
class RogueBattleMapRoleListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.By1 = 0;
    this.I2i = () => {
      return new RogueBattleMapRoleLayoutItem();
    };
    this.GIl = e => {
      this.By1 = e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.I2i);
    this.GetItem(2)?.SetUIActive(false);
  }
  BindEvent() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate, this.GIl);
  }
  UnbindEvent() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate, this.GIl);
  }
  OnBeforeShow() {
    var e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResBondRole();
    var t = [];
    var i = [];
    var r = [];
    var s = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
    var n = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailRole(s, 0);
    var o = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailRole(s, 1);
    for (const h of e) {
      var a;
      var l = h.RoleId;
      if (ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(l)) {
        i.push(l);
      } else if (ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(h.TrialRoleId)) {
        i.push(h.TrialRoleId);
      } else {
        a = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(h.TrialRoleId);
        if (!ModelManager_1.ModelManager.RoleModel.IsMainRole(a)) {
          if (n.includes(h.TrialRoleId) || o.includes(h.TrialRoleId)) {
            r.push(h.TrialRoleId);
          } else {
            r.push(l);
          }
        }
      }
    }
    if (i.length > 0) {
      this.By1 = this.By1 !== 0 ? this.By1 : i[0];
      t.push(i);
    }
    ModelManager_1.ModelManager.RogueBattleModel.SummaryRoleList = i;
    if (r.length > 0) {
      this.By1 = this.By1 !== 0 ? this.By1 : r[0];
      t.push(r);
    }
    this.xqe.RefreshByData(t, () => {
      if (this.By1) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate, this.By1);
      }
    });
  }
  OnBeforeDestroy() {
    this.xqe = undefined;
  }
}
exports.RogueBattleMapRoleListPanel = RogueBattleMapRoleListPanel;
//# sourceMappingURL=RogueBattleMapRoleListPanel.js.map