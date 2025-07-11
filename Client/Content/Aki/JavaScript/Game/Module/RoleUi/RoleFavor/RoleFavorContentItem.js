"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorContentItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RoleFavorContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super();
    this.H5e = undefined;
    this.e0t = undefined;
    this.j5e = undefined;
    this.Gke = undefined;
    this.f_o = 1;
    this.p_o = undefined;
    this.CloseAudioDelegate = undefined;
    this.OnMontageCompleted = undefined;
    this.ToggleClick = t => {
      if (this.j5e) {
        this.e0t.RootUIComp.SetUIActive(t = t === 1);
        this.j5e(t, this.ContentItemData, this);
      }
    };
    this.ButtonClick = () => {
      if (this.Gke) {
        this.Gke(this.ContentItemData, this);
      }
    };
    this.v_o = t => MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Title);
    this.EndPlay = () => {
      this.M_o(1);
    };
    this.StartPlay = () => {
      this.M_o(0);
    };
    this.BNe = () => {
      let t = 0;
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.ContentItemData.RoleId);
      var s = i.GetFavorData();
      t = this.ContentItemData.FavorTabType === 2 ? (i = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(i.GetRoleId(), this.ContentItemData.Config.Id), Number(i)) : s.GetFavorItemState(this.ContentItemData.Config.Id, this.ContentItemData.FavorTabType);
      this.GetItem(5).SetUIActive(t === 1);
    };
    this.ContentItemData = t;
    this.CreateThenShowByActor(i.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIExtendToggle], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.ToggleClick], [6, this.ButtonClick]];
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetButtonFunction(t) {
    this.Gke = t;
  }
  OnStart() {
    this.H5e = this.GetExtendToggle(4);
    this.e0t = this.GetButton(6);
    this.e0t.RootUIComp.SetUIActive(false);
    this.Refresh();
  }
  Refresh() {
    switch (this.ContentItemData.FavorTabType) {
      case 2:
        this.E_o();
        this.H5e.bToggleOnSelect = false;
        break;
      case 1:
        this.S_o();
        break;
      case 0:
        this.y_o();
        this.H5e.bToggleOnSelect = false;
        break;
      case 3:
        this.I_o();
    }
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
  D_o() {
    this.R_o();
    var t = this.GetText(3);
    var i = this.ContentItemData.Config;
    var i = this.v_o(i);
    t.SetText(i);
    this.BNe();
  }
  S_o() {
    if (this.ContentItemData.TypeParam === 1) {
      this.T_o();
    } else if (this.ContentItemData.TypeParam === 2) {
      this.L_o();
    } else {
      this.D_o();
    }
  }
  E_o() {
    this.R_o();
    var t = this.GetText(3);
    var i = this.ContentItemData.Config;
    var i = this.v_o(i);
    if (this.p_o === 2) {
      this.M_o(1);
    }
    this.U_o();
    t.SetText(i);
    this.BNe();
  }
  y_o() {
    this.R_o();
    var t = this.ContentItemData.Config;
    var i = this.GetText(3);
    var t = this.v_o(t);
    if (this.p_o !== 0) {
      this.M_o(1);
    }
    this.A_o();
    i.SetText(t);
    this.BNe();
  }
  I_o() {
    this.R_o();
    var t = this.GetText(3);
    var i = this.ContentItemData.Config;
    if (this.p_o === 2) {
      i = this.v_o(i);
      t.SetText(i);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(t, "Unknown");
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
    this.ContentItemData = undefined;
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
    var i = this.ContentItemData.FavorTabType;
    var s = this.ContentItemData.Config.Id;
    if (i === 2) {
      t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.ContentItemData.RoleId);
      t = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(t.GetRoleId(), s);
      this.p_o = Number(t);
      this.SetLockItemActive(this.p_o !== 2);
    } else {
      t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.ContentItemData.RoleId).GetFavorData().GetFavorItemState(s, i);
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
    if (!!this.ContentItemData && ((i = this.ContentItemData.FavorTabType) === 2 || i === 0)) {
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
  GetTog() {
    return this.GetExtendToggle(4);
  }
}
exports.RoleFavorContentItem = RoleFavorContentItem;
//# sourceMappingURL=RoleFavorContentItem.js.map