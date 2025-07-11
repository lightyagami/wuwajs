"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalRoleShowView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const PersonalController_1 = require("../Controller/PersonalController");
const PersonalRoleMediumItemGrid_1 = require("./PersonalRoleMediumItemGrid");
class PersonalRoleShowView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.Wke = undefined;
    this.nVi = 0;
    this.DVi = 0;
    this.RVi = 0;
    this.UVi = undefined;
    this.sOt = () => {
      var i = ModelManager_1.ModelManager.PersonalModel.GetRoleShowList();
      var t = i.length;
      var s = [];
      if (this.RVi === 0) {
        for (let e = 0; e < t; e++) {
          var r = i[e];
          s.push(r.Q6n);
        }
        s.push(this.nVi);
      } else if (this.RVi === 2) {
        for (let e = 0; e < t; e++) {
          var h = i[e];
          if (h.Q6n !== this.nVi) {
            s.push(h.Q6n);
          }
        }
      } else if (this.RVi === 1) {
        for (let e = 0; e < t; e++) {
          var o = i[e];
          if (o.Q6n === this.nVi) {
            s.push(this.DVi);
          } else if (o.Q6n === this.DVi) {
            s.push(this.nVi);
          } else {
            s.push(o.Q6n);
          }
        }
      }
      PersonalController_1.PersonalController.SendRoleShowListUpdateRequest(s);
      this.CloseMe();
    };
    this.nFe = (e, i, t) => {
      var s = new PersonalRoleMediumItemGrid_1.PersonalRoleMediumItemGrid();
      s.Initialize(i.GetOwner());
      s.Refresh(e, false, t);
      s.BindOnExtendToggleStateChanged(this.sVi);
      return {
        Key: t,
        Value: s
      };
    };
    this.sVi = e => {
      this.UVi?.SetSelected(false);
      this.UVi = e.MediumItemGrid;
      this.UVi?.SetSelected(true);
      e = e.Data;
      this.Refresh(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIButtonComponent], [2, UE.UIText]];
    this.BtnBindInfo = [[1, this.sOt]];
  }
  OnStart() {
    this.DVi = this.OpenParam;
    this.xqe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.nFe);
  }
  Refresh(e) {
    this.nVi = e;
    var e = this.DVi === this.nVi;
    var i = ModelManager_1.ModelManager.PersonalModel.GetRoleShowList();
    this.GetButton(1).RootUIComp.SetUIActive(true);
    var t = this.IsRoleInShow(this.nVi);
    if (i.length === 1 && t) {
      this.GetButton(1).RootUIComp.SetUIActive(false);
    } else if (this.DVi === undefined) {
      if (t) {
        this.odi(2);
      } else {
        this.odi(0);
      }
    } else if (e) {
      this.odi(2);
    } else {
      this.odi(1);
    }
  }
  odi(e) {
    this.RVi = e;
    var i = this.GetText(2);
    switch (e) {
      case 0:
        LguiUtil_1.LguiUtil.SetLocalText(i, "JoinText");
        break;
      case 2:
        LguiUtil_1.LguiUtil.SetLocalText(i, "GoDownText");
        break;
      case 1:
        LguiUtil_1.LguiUtil.SetLocalText(i, "ChangeText");
    }
  }
  IsRoleInShow(e) {
    var i = ModelManager_1.ModelManager.PersonalModel.GetRoleShowList();
    var t = i.length;
    let s = false;
    for (let e = 0; e < t; e++) {
      if (i[e].Q6n === this.nVi) {
        s = true;
        break;
      }
    }
    return s;
  }
  OnAfterShow() {
    this.Wke = ModelManager_1.ModelManager.RoleModel.GetRoleIdList();
    if (this.Wke.length > 0) {
      this.xqe.RefreshByData(this.Wke);
      this.nVi = this.Wke[0];
      this.UVi = this.xqe.GetScrollItemList()[0];
      this.UVi.SetSelected(true);
      this.Refresh(this.nVi);
    }
  }
  OnBeforeDestroy() {
    if (this.xqe) {
      this.xqe.ClearChildren();
      this.xqe = undefined;
    }
  }
}
exports.PersonalRoleShowView = PersonalRoleShowView;
//# sourceMappingURL=PersonalRoleShowView.js.map