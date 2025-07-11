"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleTeamRoleSelectView = exports.RogueBattleTeamEditData = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown");
const EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RogueBattleFilterDropDownItem_1 = require("../Component/RogueBattleFilterDropDownItem");
const RogueBattleFilterDropDownTitle_1 = require("../Component/RogueBattleFilterDropDownTitle");
const RogueBattleMapFetterItem_1 = require("../Component/RogueBattleMapFetterItem");
const RogueBattleRoleSelectFetterItem_1 = require("../Component/RogueBattleRoleSelectFetterItem");
const RogueBattleTeamRoleGrid_1 = require("../Component/RogueBattleTeamRoleGrid");
const RogueBattleDefine_1 = require("../RogueBattleDefine");
class RogueBattleTeamEditData extends UiPopViewData_1.UiPopViewData {
  constructor(e, t) {
    super();
    this.FormationIndex = e;
    this.OnTeamEditConfirm = t;
  }
}
exports.RogueBattleTeamEditData = RogueBattleTeamEditData;
const BOND_ALLSELECT_INDEX = 0;
class RogueBattleTeamRoleSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.h8e = undefined;
    this.lqe = undefined;
    this.yLu = undefined;
    this.SLu = undefined;
    this.Flo = undefined;
    this.MLu = undefined;
    this.l01 = undefined;
    this.ELu = -1;
    this.ILu = -1;
    this.TLu = [];
    this.Vlo = undefined;
    this.bLu = [];
    this.RLu = undefined;
    this.Mke = undefined;
    this.wu1 = false;
    this.V2i = () => {
      if (!this.wu1) {
        this.wu1 = true;
        this.CloseMe();
      }
    };
    this.p5t = () => {
      var e;
      if (!this.wu1) {
        if ((e = this.wLu()).length === 0) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RogueBattle_TeamEmpty_QuickSelect");
        } else {
          this.wu1 = true;
          if (this.Mke) {
            this.Mke(e).finally(() => {
              this.CloseMe();
            });
          } else {
            this.CloseMe();
          }
        }
      }
    };
    this.LLu = () => {
      if (!this.wu1 && this.RLu) {
        var t = this.RLu.IsTrialRole();
        let e = this.RLu.GetDataId();
        if (!t) {
          if (t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(e)) {
            e = t.TrialRoleId;
          }
        }
        ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainView(1, 0, [e], "RoleSkillTabView");
      }
    };
    this.m8e = e => {
      return new RogueBattleFilterDropDownItem_1.RogueBattleFilterDropDownItem(e);
    };
    this.c8e = e => new RogueBattleFilterDropDownTitle_1.RogueBattleFilterDropDownTitle(e);
    this.C8e = e => {
      this.ILu = e;
      this.ALu();
    };
    this.g8e = e => e;
    this.cHe = () => {
      var e = new RogueBattleTeamRoleGrid_1.RogueBattleTeamRoleGrid();
      e.BindOnExtendToggleStateChanged(this.ToggleFunction);
      e.BindOnCanExecuteChange(this.CanExecuteChangeFunction);
      return e;
    };
    this.ToggleFunction = e => {
      var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      var i = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet;
      var o = e.Data;
      var r = o.RoleData;
      if (e.State === 0) {
        for (const a of t) {
          if (a[1] === r) {
            t.delete(a[0]);
            i.delete(r.GetDataId());
            break;
          }
        }
      } else if (e.State === 1) {
        for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
          if (!t.has(e)) {
            t.set(e, r);
            i.add(r.GetDataId());
            break;
          }
        }
      }
      e = this.bLu.indexOf(o);
      this.Flo.RefreshGridProxy(e);
      this.OnRoleSelect(r);
    };
    this.CanExecuteChangeFunction = (e, t, i) => {
      return !this.wu1 && (i !== 0 || !(ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.size >= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM) || !(ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("EditBattleTeamRoleFull"), 1));
    };
    this.PLu = () => {
      var e = new RogueBattleRoleSelectFetterItem_1.RogueBattleRoleSelectFetterItem();
      e.OnToggleClick = this.xLu;
      return e;
    };
    this.xLu = e => {
      this.MLu.DeselectCurrentGridProxy();
      this.MLu.SelectGridProxyByKey(e.v9n, true);
      this.ULu(e.v9n);
    };
    this.EE1 = () => {
      return new RogueBattleMapFetterItem_1.RogueBattleMapFetterInfoItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIVerticalLayout], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.ELu = e.FormationIndex;
    this.Mke = e.OnTeamEditConfirm;
    var e = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.yLu = new ButtonItem_1.ButtonItem();
    e.push(this.yLu.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
    this.yLu.SetFunction(this.p5t);
    this.SLu = new ButtonItem_1.ButtonItem();
    e.push(this.SLu.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()));
    this.SLu.SetFunction(this.LLu);
    this.Flo = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.cHe);
    this.MLu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.PLu);
    this.h8e = new CommonDropDown_1.CommonDropDown(this.GetItem(3), this.m8e, this.c8e);
    e.push(this.h8e.Init());
    this.l01 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(7), this.EE1);
    await Promise.all(e);
    this.lqe.SetCloseCallBack(this.V2i);
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.RogueBattleModel.GetFormationDataByIndex(this.ELu);
    this.Vlo = ModelManager_1.ModelManager.RogueBattleModel.GetRoleList();
    this.Vlo.sort((e, t) => t.GetRoleConfig().Priority - e.GetRoleConfig().Priority);
    var t = e.Q6n;
    ModelManager_1.ModelManager.RoleSelectModel.ClearData();
    var i = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
    for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM && !(e > t.length); e++) {
      var o = t[e - 1];
      for (const r of this.Vlo) {
        if (r.GetDataId() === o) {
          i.set(e, r);
          break;
        }
      }
    }
    this.aHi();
    ModelManager_1.ModelManager.RogueBattleModel.SetRogueResNewRoleFlag(false);
  }
  aHi() {
    this.TLu.length = 0;
    this.TLu = ModelManager_1.ModelManager.RogueBattleModel.GetAllOwnedRoleBondData();
    this.TLu.sort(RogueBattleDefine_1.sortRogueBattleRoleBondInfo);
    this.TLu.unshift({
      v9n: 0,
      Whc: 0,
      ef1: 0,
      F6n: 0
    });
    this.ILu = BOND_ALLSELECT_INDEX;
    this.h8e.SetOnSelectCall(this.C8e);
    this.h8e.SetShowType(0);
    this.h8e.InitScroll(this.TLu, this.g8e, this.ILu);
    this.h8e.SetSelectedIndex(this.ILu);
  }
  wLu() {
    var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
    var i = new Array();
    for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
      var o = t.get(e);
      if (o) {
        o = o.GetDataId();
        i.push(o);
      }
    }
    return i;
  }
  DLu() {
    var e = [];
    var t = this.BLu();
    for (const s of this.Vlo) {
      var i = s.GetDataId();
      var o = this.TLu[this.ILu];
      var r = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(i);
      if (r === 0 && o.v9n > 0) {
        if (!ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(s.GetRoleId()).BondIds.includes(o.v9n)) {
          continue;
        }
      }
      r = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(i);
      o = {
        RoleData: s,
        RoleStarLv: r.F6n,
        FormationIndex: this.ELu,
        IsLinkOn: t.includes(i)
      };
      e.push(o);
    }
    const a = EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM + 1;
    e.sort((e, t) => {
      let i = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(e.RoleData.GetDataId());
      if (i === 0) {
        i = a;
      }
      let o = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(t.RoleData.GetDataId());
      if (o === 0) {
        o = a;
      }
      if (i === o) {
        return t.RoleStarLv - e.RoleStarLv;
      } else {
        return i - o;
      }
    });
    return e;
  }
  kLu(t, i) {
    for (let e = 0; e < t.length; e++) {
      if (t[e].RoleData === i) {
        return e;
      }
    }
    return -1;
  }
  ALu() {
    const n = this.DLu();
    this.Flo.RefreshByData(n, false, () => {
      var e = n[0].RoleData;
      var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      for (const a of t.values()) {
        var i = this.kLu(this.bLu, a);
        var o = this.kLu(n, a);
        if (this.Flo.Iei >= 0 && i !== o && (ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(a.GetDataId()), i >= 0)) {
          this.Flo.UnsafeGetGridProxy(i)?.OnForceSelected(false);
        }
      }
      for (const s of t.values()) {
        var r = this.kLu(n, s);
        ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(s.GetDataId());
        if (r >= 0) {
          this.Flo.UnsafeGetGridProxy(r)?.OnForceSelected(true);
        }
      }
      if ((this.bLu = n, this.RLu) && this.kLu(n, this.RLu) >= 0) {
        return;
      }
      this.OnRoleSelect(e);
    }, true);
  }
  OnRoleSelect(e) {
    this.RLu = e;
    this.GetText(4).SetText(e.GetName());
    this.OLu(e);
  }
  OLu(e) {
    const t = this.TLu[this.ILu].v9n;
    let i = false;
    this.MLu.DeselectCurrentGridProxy();
    var e = e.GetRoleConfig();
    var o = [];
    for (const a of ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(e.Id).BondIds) {
      var r = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(a);
      if (t === a) {
        i = true;
      }
      o.push(r);
    }
    o.sort(RogueBattleDefine_1.sortRogueBattleRoleBondInfo);
    this.MLu.RefreshByData(o, () => {
      if (i) {
        this.MLu.SelectGridProxyByKey(t, true);
      } else {
        this.MLu.SelectGridProxy(0, true);
      }
    });
  }
  ULu(e) {
    var t = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(e);
    var i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(e);
    var o = new Array();
    var i = Array.from(i.StarMap.entries()).sort((e, t) => e[0] - t[0]);
    if (i.length > 0) {
      for (var [r] of i.values()) {
        r = {
          ConfigId: e,
          Level: r,
          IsReached: r <= t.F6n
        };
        o.push(r);
      }
      this.l01.SetActive(true);
      this.l01.RefreshByData(o);
    } else {
      this.l01.SetActive(false);
    }
  }
  BLu() {
    var o = [];
    var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
    var i = [];
    for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
      var r = t.get(e);
      if (r) {
        i.push(r);
      }
    }
    var e = ModelManager_1.ModelManager.RogueBattleModel.GetLinkIdByRoleList(i);
    if (!(e > 0)) {
      let i = 0;
      e = ModelManager_1.ModelManager.RogueBattleModel.GetAllOwnedRoleBondData();
      e.sort(RogueBattleDefine_1.sortRogueBattleRoleBondInfo);
      for (const h of e) {
        if (ModelManager_1.ModelManager.RogueBattleModel.IsBondLinkCanActivate(h.v9n)) {
          i = h.v9n;
          break;
        }
      }
      if (i !== 0) {
        let t = 0;
        for (let e = 0; e < this.TLu.length; e++) {
          if (i === this.TLu[e].v9n) {
            t = e;
            break;
          }
        }
        if (this.ILu === BOND_ALLSELECT_INDEX || this.ILu === t) {
          var a = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(i);
          var s = [];
          for (const l of this.Vlo) {
            var n = l.GetDataId();
            if (ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(l.GetRoleId())?.BondIds.includes(i)) {
              n = {
                RoleId: n,
                RoleStarLv: ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(n).F6n
              };
              s.push(n);
            }
          }
          s.sort((e, t) => t.RoleStarLv - e.RoleStarLv);
          for (let e = 0; e < a.ActLinkNum && !(e > s.length); e++) {
            o.push(s[e].RoleId);
          }
        }
      }
    }
    return o;
  }
}
exports.RogueBattleTeamRoleSelectView = RogueBattleTeamRoleSelectView;
//# sourceMappingURL=RogueBattleTeamRoleSelectView.js.map