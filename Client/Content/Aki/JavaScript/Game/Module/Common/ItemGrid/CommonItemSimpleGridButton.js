"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonItemSimpleGridButton = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class CommonItemSimpleGridButton extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = undefined) {
    super();
    this.qTt = 0;
    this.tPt = "ShowCount";
    this.GTt = undefined;
    this.NTt = t => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t);
    };
    this.ije = () => {
      if (this.NTt) {
        this.NTt(this.qTt);
      }
    };
    if (t) {
      this.CreateThenShowByActor(t);
    }
  }
  get ItemId() {
    return this.qTt;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[4, UE.UIButtonComponent], [1, UE.UITexture], [0, UE.UISprite], [2, UE.UIText], [3, UE.UIItem], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UISprite]];
    this.BtnBindInfo = [[4, this.ije]];
  }
  OnStart() {}
  OnBeforeDestroy() {}
  FTt() {
    var t = this.GetTexture(1);
    this.SetItemIcon(t, this.qTt, this.GTt);
    var t = this.GetSprite(0);
    this.SetItemQualityIcon(t, this.qTt, this.GTt, "BackgroundSprite");
  }
  Refresh(t, i, e) {
    var s = t[0];
    var t = t[1];
    this.RefreshItem(s.ItemId, t);
  }
  SetQualityActive(t) {
    this.GetSprite(0).SetUIActive(t);
  }
  SetCanReceiveActive(t) {
    this.GetSprite(5).SetUIActive(t);
  }
  SetLockReceiveActive(t) {
    this.GetSprite(6).SetUIActive(t);
  }
  SetReceivedActive(t) {
    this.GetItem(7).SetUIActive(t);
  }
  SetBelongViewName(t) {
    this.GTt = t;
  }
  RefreshItem(t, i = 0) {
    this.qTt = t;
    this.FTt();
    this.SetCount(i);
  }
  BindClickCallback(t) {
    this.NTt = t;
  }
  SetCount(t = 0) {
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetCountText(), this.tPt, t);
      this.GetCountItem().SetUIActive(true);
    } else {
      this.GetCountItem().SetUIActive(false);
    }
  }
  GetCountText() {
    return this.GetText(2);
  }
  GetCountItem() {
    return this.GetItem(3);
  }
  SetCountTextId(t) {
    this.tPt = t;
  }
  async RefreshItemAsync(t, i = 0) {
    this.qTt = t;
    await this.HTt();
    this.SetCount(i);
  }
  async HTt() {
    const t = new CustomPromise_1.CustomPromise();
    this.SetItemIcon(this.GetTexture(1), this.qTt, undefined, () => {
      t.SetResult(undefined);
    });
    await t.Promise;
    const i = new CustomPromise_1.CustomPromise();
    this.SetItemQualityIcon(this.GetSprite(0), this.qTt, undefined, "BackgroundSprite", () => {
      i.SetResult(undefined);
    });
    await i.Promise;
  }
}
exports.CommonItemSimpleGridButton = CommonItemSimpleGridButton;
//# sourceMappingURL=CommonItemSimpleGridButton.js.map