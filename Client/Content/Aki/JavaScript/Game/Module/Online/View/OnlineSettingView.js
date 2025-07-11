"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineSettingView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const OnlineController_1 = require("../OnlineController");
const OnlineHallSettingButton_1 = require("./OnlineHallSettingButton");
const SETTING_COUNT_ID = 4;
class OnlineSettingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.hOi = Protocol_1.Aki.Protocol.Y8s.Proto_ConfirmJoin;
    this.lOi = undefined;
    this.Bpt = e => this.hOi !== e;
    this._Oi = () => {
      OnlineController_1.OnlineController.WorldEnterPermissionsRequest(this.hOi);
      this.CloseMe();
    };
    this.uOi = e => {
      this.hOi = e;
      for (var [t, i] of this.lOi) {
        if (t === this.hOi) {
          i.SetSelected(true);
        } else {
          i.SetSelected(false);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this._Oi]];
  }
  OnBeforeShow() {
    this.hOi = ModelManager_1.ModelManager.OnlineModel.CurrentPermissionsSetting;
    this.cOi();
  }
  OnBeforeDestroy() {
    if (this.lOi) {
      this.lOi.clear();
    }
    this.lOi = undefined;
  }
  cOi() {
    this.lOi = new Map();
    var e;
    var t;
    var i = this.GetItem(1);
    var r = this.GetItem(0);
    this.mOi(i.GetOwner(), 0);
    for (let e = 1; e < SETTING_COUNT_ID; e++) {
      var s = LguiUtil_1.LguiUtil.CopyItem(i, r);
      this.mOi(s.GetOwner(), e);
    }
    this.hOi = ModelManager_1.ModelManager.OnlineModel.CurrentPermissionsSetting;
    for ([e, t] of this.lOi) {
      if (e === this.hOi) {
        t.SetSelected(true);
      } else {
        t.SetSelected(false);
      }
    }
  }
  mOi(e, t) {
    e = new OnlineHallSettingButton_1.OnlineHallSettingButton(e, t);
    e.BindOnSettingButtonClickedCallback(this.uOi);
    e.BindCanToggleExecuteChange(this.Bpt);
    this.lOi.set(t, e);
  }
}
exports.OnlineSettingView = OnlineSettingView;
//# sourceMappingURL=OnlineSettingView.js.map