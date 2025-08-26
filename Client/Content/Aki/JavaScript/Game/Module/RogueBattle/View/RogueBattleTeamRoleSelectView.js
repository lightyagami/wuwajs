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
    this.DLu = undefined;
    this.BLu = undefined;
    this.Flo = undefined;
    this.kLu = undefined;
    this.l01 = undefined;
    this.OLu = -1;
    this.qLu = -1;
    this.GLu = [];
    this.Vlo = undefined;
    this.FLu = [];
    this.NLu = undefined;
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
        if ((e = this.VLu()).length === 0) {
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
    this.jLu = () => {
      if (!this.wu1 && this.NLu) {
        var t = this.NLu.IsTrialRole();
        let e = this.NLu.GetDataId();
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
      this.qLu = e;
      this.HLu();
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
      e = this.FLu.indexOf(o);
      this.Flo.RefreshGridProxy(e);
      this.OnRoleSelect(r);
    };
    this.CanExecuteChangeFunction = (e, t, i) => {
      return !this.wu1 && (i !== 0 || !(ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.size >= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM) || !(ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("EditBattleTeamRoleFull"), 1));
    };
    this.$Lu = () => {
      var e = new RogueBattleRoleSelectFetterItem_1.RogueBattleRoleSelectFetterItem();
      e.OnToggleClick = this.WLu;
      return e;
    };
    this.WLu = e => {
      this.kLu.DeselectCurrentGridProxy();
      this.kLu.SelectGridProxyByKey(e.v9n, true);
      this.QLu(e.v9n);
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
    this.OLu = e.FormationIndex;
    this.Mke = e.OnTeamEditConfirm;
    var e = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.DLu = new ButtonItem_1.ButtonItem();
    e.push(this.DLu.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
    this.DLu.SetFunction(this.p5t);
    this.BLu = new ButtonItem_1.ButtonItem();
    e.push(this.BLu.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()));
    this.BLu.SetFunction(this.jLu);
    this.Flo = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.cHe);
    this.kLu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.$Lu);
    this.h8e = new CommonDropDown_1.CommonDropDown(this.GetItem(3), this.m8e, this.c8e);
    e.push(this.h8e.Init());
    this.l01 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(7), this.EE1);
    await Promise.all(e);
    this.lqe.SetCloseCallBack(this.V2i);
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.RogueBattleModel.GetFormationDataByIndex(this.OLu);
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
    this.GLu.length = 0;
    this.GLu = ModelManager_1.ModelManager.RogueBattleModel.GetAllOwnedRoleBondData();
    this.GLu.sort(RogueBattleDefine_1.sortRogueBattleRoleBondInfo);
    this.GLu.unshift({
      v9n: 0,
      Whc: 0,
      ef1: 0,
      F6n: 0
    });
    this.qLu = BOND_ALLSELECT_INDEX;
    this.h8e.SetOnSelectCall(this.C8e);
    this.h8e.SetShowType(0);
    this.h8e.InitScroll(this.GLu, this.g8e, this.qLu);
    this.h8e.SetSelectedIndex(this.qLu);
  }
  VLu() {
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
  KLu() {
    var e = [];
    var t = this.XLu();
    for (const s of this.Vlo) {
      var i = s.GetDataId();
      var o = this.GLu[this.qLu];
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
        FormationIndex: this.OLu,
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
  YLu(t, i) {
    for (let e = 0; e < t.length; e++) {
      if (t[e].RoleData === i) {
        return e;
      }
    }
    return -1;
  }
  HLu() {
    const n = this.KLu();
    this.Flo.RefreshByData(n, false, () => {
      var e = n[0].RoleData;
      var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      for (const a of t.values()) {
        var i = this.YLu(this.FLu, a);
        var o = this.YLu(n, a);
        if (this.Flo.Iei >= 0 && i !== o && (ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(a.GetDataId()), this.Flo.IsGridDisplaying(i))) {
          this.Flo.UnsafeGetGridProxy(i)?.OnForceSelected(false);
        }
      }
      for (const s of t.values()) {
        var r = this.YLu(n, s);
        ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(s.GetDataId());
        if (this.Flo.IsGridDisplaying(r)) {
          this.Flo.UnsafeGetGridProxy(r)?.OnForceSelected(true);
        }
      }
      if ((this.FLu = n, this.NLu) && this.YLu(n, this.NLu) >= 0) {
        return;
      }
      this.OnRoleSelect(e);
    }, true);
  }
  OnRoleSelect(e) {
    this.NLu = e;
    this.GetText(4).SetText(e.GetName());
    this.zLu(e);
  }
  zLu(e) {
    const t = this.GLu[this.qLu].v9n;
    let i = false;
    this.kLu.DeselectCurrentGridProxy();
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
    this.kLu.RefreshByData(o, () => {
      if (i) {
        this.kLu.SelectGridProxyByKey(t, true);
      } else {
        this.kLu.SelectGridProxy(0, true);
      }
    });
  }
  QLu(e) {
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
  XLu() {
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
        for (let e = 0; e < this.GLu.length; e++) {
          if (i === this.GLu[e].v9n) {
            t = e;
            break;
          }
        }
        if (this.qLu === BOND_ALLSELECT_INDEX || this.qLu === t) {
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