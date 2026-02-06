"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightAttrDetailView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const MotorFightDefine_1 = require("../MotorFightDefine");
const MotorFightDetailAttrItem_1 = require("./Item/MotorFightDetailAttrItem");
class MotorFightAttrDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.kLg = new Map();
    this.qLg = [];
    this.lqe = undefined;
    this.B7t = undefined;
    this.R0m = undefined;
    this.HEu = t => {
      this.B7t.SelectGridProxyByKey(t);
      t = this.OLg(t);
      this.R0m?.RefreshByData(t);
    };
    this.Hwn = () => {
      var t = new MotorFightAttrTabItem();
      t.OnToggleClickCallBack = this.HEu;
      return t;
    };
    this.GLg = () => new MotorFightDetailAttrItem_1.MotorFightDetailAttrItem();
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UIHorizontalLayout], [1, UE.UIVerticalLayout]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.AMo);
    this.B7t = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.Hwn);
    this.R0m = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.GLg);
    var t = [];
    t.push(this.B7t.RefreshByDataAsync([0, 1, 2]));
    var i = this.OLg(0);
    t.push(this.R0m.RefreshByDataAsync(i));
    await Promise.all(t);
    this.B7t.SelectGridProxy(0);
  }
  OLg(t) {
    const i = this.kLg.get(t);
    if (i) {
      return i;
    }
    if (this.qLg.length === 0) {
      this.qLg = [...ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightAttrShow()];
    }
    var e = [];
    for (const r of this.qLg) {
      if (t === 0 && r.ShowInMainGun || t === 1 && r.ShowInWingman || t === 2 && r.ShowInCommon) {
        const i = {
          Type: t,
          Config: r
        };
        e.push(i);
      }
    }
    this.kLg.set(t, e);
    return e;
  }
}
exports.MotorFightAttrDetailView = MotorFightAttrDetailView;
class MotorFightAttrTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.E9 = 0;
    this.OnToggleClickCallBack = t => {};
    this.N8e = () => {
      this.OnToggleClickCallBack(this.E9);
    };
  }
  OnStart() {
    this.GetExtendToggle(1).bLockStateOnSelect = true;
    this.SetToggleState(false);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.N8e]];
  }
  Refresh(t, i, e) {
    this.E9 = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), MotorFightDefine_1.motorFightAttrShowTypeToName[t]);
    this.GetItem(2)?.SetUIActive(false);
  }
  GetKey(t, i) {
    return t;
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(1).SetToggleState(t);
  }
  OnSelected(t) {
    this.SetToggleState(true);
  }
  OnDeselected(t) {
    this.SetToggleState(false);
  }
}
//# sourceMappingURL=MotorFightAttrDetailView.js.map