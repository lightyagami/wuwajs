"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorContentItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RoleFavorContentItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ContentData = undefined;
    this.H5e = undefined;
    this.e0t = undefined;
    this.j5e = undefined;
    this.Gke = undefined;
    this.f_o = 1;
    this.p_o = undefined;
    this.CloseAudioDelegate = undefined;
    this.OnMontageCompleted = undefined;
    this.OnToggleClick = t => {
      if (this.j5e) {
        this.e0t.RootUIComp.SetUIActive(t = t === 1);
        this.j5e(t, this.ContentData, this);
      }
    };
    this.OnButtonClick = () => {
      if (this.Gke) {
        this.Gke(this.ContentData, this);
      }
    };
    this.EndPlay = () => {
      this.M_o(1);
    };
    this.StartPlay = () => {
      this.M_o(0);
    };
    this.BNe = () => {
      let t = 0;
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.ContentData.RoleId);
      var s = i.GetFavorData();
      t = this.ContentData.FavorContentType === 3 ? (i = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(i.GetRoleId(), this.ContentData.ConfigId), Number(i)) : s.GetFavorItemState(this.ContentData.ConfigId, this.ContentData.FavorContentType);
      this.GetItem(5).SetUIActive(t === 1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIExtendToggle], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.OnToggleClick], [6, this.OnButtonClick]];
  }
  OnStart() {
    this.H5e = this.GetExtendToggle(4);
    this.e0t = this.GetButton(6);
    this.e0t.RootUIComp.SetUIActive(false);
  }
  Refresh(t, i, s) {
    this.ContentData = t;
    this.GridIndex = s;
    this.DisplayIndex = s;
    this.RefreshContentItem();
  }
  RefreshContentItem() {
    switch (this.ContentData.FavorContentType) {
      case 3:
        this.E_o();
        this.H5e.bToggleOnSelect = false;
        break;
      case 1:
      case 2:
        this.S_o();
        break;
      case 0:
        this.y_o();
        this.H5e.bToggleOnSelect = false;
        break;
      case 4:
        this.I_o();
    }
  }
  BindToggleFunction(t) {
    this.j5e = t;
  }
  BindButtonFunction(t) {
    this.Gke = t;
  }
  T_o() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FavorBaseInfo");
    this.SetLockItemActive(false);
    this.GetItem(5).SetUIActive(false);
    this.p_o = 2;
  }
  L_o() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FavorPowerFile");
    this.SetLockItemActive(false);
    this.GetItem(5).SetUIActive(false);
    this.p_o = 2;
  }
  S_o() {
    var t = this.ContentData.FavorExperienceSubType;
    if (t === 1) {
      this.T_o();
    } else if (t === 2) {
      this.L_o();
    } else {
      this.D_o();
    }
  }
  D_o() {
    var t = this.ContentData;
    this.R_o();
    this.GetText(3).SetText(t.Title);
    this.BNe();
  }
  E_o() {
    var t = this.ContentData;
    this.R_o();
    this.GetText(3).SetText(t.Title);
    if (this.p_o === 2) {
      this.M_o(1);
    }
    this.U_o();
    this.BNe();
  }
  y_o() {
    var t = this.ContentData;
    this.R_o();
    this.GetText(3).SetText(t.Title);
    if (this.p_o !== 0) {
      this.M_o(1);
    }
    this.A_o();
    this.BNe();
  }
  I_o() {
    var t = this.ContentData;
    this.R_o();
    var i = this.GetText(3);
    i.SetText(t.Title);
    if (this.p_o !== 2) {
      LguiUtil_1.LguiUtil.SetLocalText(i, "Unknown");
    }
    this.BNe();
  }
  U_o() {
    this.OnMontageCompleted ||= (t, i) => {
      if (!i) {
        this.EndPlay();
      }
    };
  }
  A_o() {
    this.CloseAudioDelegate ||= (0, puerts_1.toManualReleaseDelegate)(() => {
      this.EndPlay();
    });
  }
  OnBeforeDestroy() {
    this.ContentData = undefined;
    this.H5e = undefined;
    this.e0t = undefined;
    this.j5e = undefined;
    this.Gke = undefined;
    this.f_o = 1;
    this.p_o = 0;
    if (this.CloseAudioDelegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.EndPlay);
      this.CloseAudioDelegate = undefined;
    }
    this.OnMontageCompleted &&= undefined;
  }
  R_o() {
    var t;
    var i = this.ContentData.FavorContentType;
    var s = this.ContentData.ConfigId;
    if (i === 3) {
      t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.ContentData.RoleId);
      t = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(t.GetRoleId(), s);
      this.p_o = Number(t);
      this.SetLockItemActive(this.p_o !== 2);
    } else {
      t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.ContentData.RoleId).GetFavorData().GetFavorItemState(s, i);
      this.SetLockItemActive(t === 0);
      this.p_o = t;
    }
  }
  SetLockItemActive(t) {
    this.GetItem(0).SetUIActive(t);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
  }
  M_o(t) {
    var i;
    if (!!this.ContentData && ((i = this.ContentData.FavorContentType) === 3 || i === 0)) {
      if (this.p_o !== 0) {
        this.f_o = t;
        this.GetItem(0).SetUIActive(false);
        this.GetItem(1).SetUIActive(t === 0);
        this.GetItem(2).SetUIActive(t === 1);
      }
    }
  }
  GetCurVoiceState() {
    return this.f_o;
  }
  SetToggleState(t) {
    if (this.H5e) {
      this.H5e.SetToggleState(t);
    }
  }
  SetButtonActive(t) {
    if (this.e0t) {
      this.e0t.RootUIComp.SetUIActive(t);
    }
  }
}
exports.RoleFavorContentItem = RoleFavorContentItem;
//# sourceMappingURL=RoleFavorContentItem.js.map