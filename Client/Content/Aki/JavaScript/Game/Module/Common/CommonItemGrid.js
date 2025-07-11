"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonItemGrid = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../Util/LguiUtil");
class CommonItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = undefined) {
    super();
    this.qTt = 0;
    this.GTt = undefined;
    this.NTt = t => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t);
    };
    this.OTt = t => {
      if (t === this.qTt) {
        this.GetExtendToggle(0).SetToggleState(0, false);
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
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UISprite], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UITexture], [12, UE.UIItem], [13, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  OnStart() {
    this.SHe();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseItemTips, this.OTt);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseItemTips, this.OTt);
  }
  SHe() {
    this.SetEmpty(false);
    this.SetLock(false);
    this.SetRoleHead();
    this.kTt();
  }
  FTt() {
    this.SetItemIcon(this.GetTexture(3), this.qTt, this.GTt);
    this.SetItemQualityIcon(this.GetSprite(4), this.qTt, this.GTt);
  }
  Refresh(t, i, e) {
    var s = t[0];
    var t = t[1];
    this.RefreshItem(s.ItemId, t);
  }
  SetQualityActive(t) {
    this.GetSprite(4).SetUIActive(t);
  }
  SetBelongViewName(t) {
    this.GTt = t;
  }
  RefreshItem(t, i = 0) {
    this.qTt = t;
    this.FTt();
    this.VTt(i);
  }
  BindClickCallback(t) {
    this.NTt = t;
  }
  VTt(t = 0) {
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "ShowCount", t);
      this.GetItem(12).SetUIActive(true);
    } else {
      this.GetItem(12).SetUIActive(false);
    }
  }
  SetRoleHead(t) {
    var i = this.GetTexture(6);
    var e = this.GetSprite(7);
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      i.SetUIActive(false);
      e.SetUIActive(false);
    } else {
      i.SetUIActive(true);
      e.SetUIActive(true);
      this.SetTextureByPath(t, i);
    }
  }
  kTt(t = 0) {
    if (t) {
      this.GetText(8).SetText(t.toFixed(0));
      this.GetItem(9).SetUIActive(true);
    } else {
      this.GetItem(9).SetUIActive(false);
    }
  }
  SetMask(t) {
    this.GetTexture(11).SetUIActive(t);
  }
  SetEmpty(t) {
    this.GetItem(2).SetUIActive(t);
    this.GetItem(1).SetUIActive(!t);
  }
  SetLock(t) {
    this.GetItem(5).SetUIActive(t);
  }
  SetReceived(t) {
    this.GetItem(13).SetUIActive(t);
  }
  SetCountTextVisible(t) {
    this.GetItem(12).SetUIActive(t);
  }
  async RefreshItemAsync(t, i = 0) {
    this.qTt = t;
    await this.HTt();
    this.VTt(i);
  }
  async HTt() {
    const t = new CustomPromise_1.CustomPromise();
    this.GetTexture(3).SetUIActive(false);
    this.SetItemIcon(this.GetTexture(3), this.qTt, this.GTt, () => {
      t.SetResult(undefined);
      this.GetTexture(3)?.SetUIActive(true);
    });
    await t.Promise;
    const i = new CustomPromise_1.CustomPromise();
    this.SetItemQualityIcon(this.GetSprite(4), this.qTt, this.GTt, "BackgroundSprite", () => {
      i.SetResult(undefined);
    });
    await i.Promise;
  }
}
exports.CommonItemGrid = CommonItemGrid;
//# sourceMappingURL=CommonItemGrid.js.map