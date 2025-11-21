"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryDiscardBackpackPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
const HonamiStoryBackpackPanelBase_1 = require("./HonamiStoryBackpackPanelBase");
class HonamiStoryDiscardBackpackPanel extends HonamiStoryBackpackPanelBase_1.HonamiStoryBackpackPanelBase {
  constructor() {
    super(...arguments);
    this._Cd = [];
    this.uCd = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this._Cd.length = 0;
    this.GetItem(0)?.SetUIActive(false);
    this.GetItem(3)?.SetUIActive(false);
    if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon()) {
      this._Cd.push({
        NotActive: this.GetItem(4),
        Active: this.GetItem(5)
      });
      if (HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
        this._Cd.push({
          NotActive: this.GetItem(1),
          Active: this.GetItem(2)
        });
      }
      for (const t of this._Cd) {
        t.Active.SetUIActive(false);
        t.NotActive.SetUIActive(true);
      }
    }
  }
  OnDragBegin(t, e) {
    var i;
    if (!!HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() && (!(i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(3)) || i.GetItemDataByInstanceId(e.GetIncId(), false) === undefined)) {
      this.GetItem(3)?.SetUIActive(true);
      this.GetItem(0)?.SetUIActive(HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView());
    }
    return true;
  }
  OnDragEnd(t, e) {
    if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon()) {
      var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(3);
      if (!i || i.GetItemDataByInstanceId(e.GetIncId(), false) === undefined) {
        for (const a of this._Cd) {
          a.Active.SetUIActive(false);
          a.NotActive.SetUIActive(true);
        }
        this.GetItem(3)?.SetUIActive(false);
        this.GetItem(0)?.SetUIActive(false);
      }
    }
  }
  OnHover(t, e) {
    t = this.cCd(t);
    if (e.StartOperateBackpack.GetBackpackType() !== 0 && e.StartOperateBackpack.GetBackpackType() !== 2 && t && this.uCd !== t) {
      this.uCd = t;
      this.uCd.Active.SetUIActive(true);
      this.uCd.NotActive.SetUIActive(false);
    }
  }
  OnHoverEnd() {
    if (this.uCd) {
      this.uCd.Active.SetUIActive(false);
      this.uCd.NotActive.SetUIActive(true);
      this.uCd = undefined;
    }
  }
  CheckDragItemInViewport(t) {
    for (const e of this._Cd) {
      if (HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, e.Active, true)) {
        return true;
      }
    }
    return false;
  }
  GetBackpackType() {
    return 4;
  }
  GetUpdateInfoInSameBackpack(t, e) {}
  GetUpdateInfoInSendBackpack(t, e, i) {}
  GetUpdateInfoInReceiveBackpack(t, e, i) {}
  GetExchangeItemSet(t, e) {
    return new Set();
  }
  OnBackpackLogicStateChange(t) {}
  GetUpdateContextEffectGridItems(t) {
    return [];
  }
  cCd(t) {
    for (const e of this._Cd) {
      if (HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, e.Active, true)) {
        return e;
      }
    }
  }
}
exports.HonamiStoryDiscardBackpackPanel = HonamiStoryDiscardBackpackPanel;
//# sourceMappingURL=HonamiStoryDiscardBackpackPanel.js.map