"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchRaceSelectView = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FloroRanchRaceCardItem_1 = require("./Item/FloroRanchRaceCardItem");
class FloroRanchRaceSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OEu = [];
    this.qEu = [];
    this.MAu = 0;
    this.GEu = 0;
    this.FEu = undefined;
    this.NEu = e => {
      for (const i of this.OEu) {
        if (i === e) {
          return true;
        }
      }
      return false;
    };
    this.GZt = e => {
      var i;
      if (this.OEu.length === this.GEu) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_RaceLock");
        this.FEu.GetLayoutItemByKey(e)?.SetToggleState(false);
      } else {
        if ((i = this.qEu.indexOf(e)) !== -1) {
          this.qEu.splice(i, 1);
        } else {
          if (this.OEu.length + this.qEu.length === this.GEu) {
            i = this.qEu.shift();
            this.FEu.GetLayoutItemByKey(i)?.SetToggleState(false);
          }
          this.qEu.push(e);
        }
        this.RefreshSelectedNum();
      }
    };
    this.VEu = () => {
      var e = new FloroRanchRaceCardItem_1.FloroRanchRaceCardItem();
      e.IsFixedRace = this.NEu;
      e.OnToggleCallBack = this.GZt;
      return e;
    };
    this.tWt = () => {
      var e = [...this.OEu, ...this.qEu];
      var i = UiManager_1.UiManager.GetViewByName("FloroRanchDungeonSelectView");
      if (i?.IsShowOrShowing) {
        i.RefreshRaceList(e);
      }
      var i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSelectedRaceIds) ?? new Map();
      i.set(this.MAu, e);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSelectedRaceIds, i);
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.tWt]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.MAu = e.Id;
    var i = e.RaceList;
    this.GEu = i.length;
    this.OEu = i.filter(e => e !== 0);
    var i = e.SelectedRaceIds.filter(e => e !== 0);
    this.qEu = i?.filter(e => !this.OEu.includes(e)) ?? [];
    this.RefreshSelectedNum();
    this.FEu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.VEu);
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchRaceDataList();
    await this.FEu.RefreshByDataAsync(e, true);
    for (const r of i) {
      var t = this.FEu.GetLayoutItemByKey(r);
      t?.SetToggleState(true);
      t?.SetEquippedPanelVisible(true);
    }
  }
  RefreshSelectedNum() {
    var e = this.OEu.length + this.qEu.length;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "FloroRanchRaceSelectedNum", e, this.GEu);
    this.GetButton(3).SetSelfInteractive(e === this.GEu);
  }
}
exports.FloroRanchRaceSelectView = FloroRanchRaceSelectView;
//# sourceMappingURL=FloroRanchRaceSelectView.js.map