"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonItemSimpleGrid = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class CommonItemSimpleGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = undefined) {
    super();
    this.qTt = 0;
    this.tPt = "ShowCount";
    this.GTt = undefined;
    this.NTt = t => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t);
    };
    this.OTt = t => {
      if (t === this.qTt) {
        this.GetExtendToggle(4).SetToggleState(0, false);
      }
    };
    this.Bke = t => {
      if (this.NTt && t === 1) {
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
    this.ComponentRegisterInfos = [[4, UE.UIExtendToggle], [1, UE.UITexture], [0, UE.UISprite], [2, UE.UIText], [3, UE.UIItem], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UIItem]];
    this.BtnBindInfo = [[4, this.Bke]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseItemTips, this.OTt);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseItemTips, this.OTt);
  }
  ResetToggleClick() {
    this.GetExtendToggle(4).OnStateChange.Clear();
    this.GetExtendToggle(4).OnStateChange.Add(this.Bke);
  }
  FTt() {
    var t = this.GetTexture(1);
    this.SetItemIcon(t, this.qTt, this.GTt);
    var t = this.GetSprite(0);
    this.SetItemQualityIcon(t, this.qTt, this.GTt, "BackgroundSprite");
  }
  Refresh(t, e, i) {
    var s = t[0];
    var t = t[1];
    this.RefreshItem(s.ItemId, t);
  }
  SetQualityActive(t) {
    this.GetSprite(0).SetUIActive(t);
  }
  SetCanReceiveActive(t) {
    this.GetSprite(5).SetUIActive(false);
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
  RefreshItem(t, e = 0) {
    this.qTt = t;
    this.FTt();
    this.SetCount(e);
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
  async RefreshItemAsync(t, e = 0) {
    this.qTt = t;
    await this.HTt();
    this.SetCount(e);
  }
  async HTt() {
    const t = new CustomPromise_1.CustomPromise();
    this.SetItemIcon(this.GetTexture(1), this.qTt, undefined, () => {
      t.SetResult(undefined);
    });
    await t.Promise;
    const e = new CustomPromise_1.CustomPromise();
    this.SetItemQualityIcon(this.GetSprite(0), this.qTt, undefined, "BackgroundSprite", () => {
      e.SetResult(undefined);
    });
    await e.Promise;
  }
}
exports.CommonItemSimpleGrid = CommonItemSimpleGrid;
//# sourceMappingURL=CommonItemSimpleGrid.js.map