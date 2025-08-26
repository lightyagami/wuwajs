"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchRaceSelectView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FloroRanchRaceCardItem_1 = require("./Item/FloroRanchRaceCardItem");
class FloroRanchRaceSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.YEu = [];
    this.zEu = [];
    this.XAu = 0;
    this.JEu = 0;
    this.ZEu = undefined;
    this.eIu = e => {
      for (const t of this.YEu) {
        if (t === e) {
          return true;
        }
      }
      return false;
    };
    this.GZt = e => {
      var t;
      if (this.YEu.length === this.JEu) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_RaceLock");
        this.ZEu.GetLayoutItemByKey(e)?.SetToggleState(false);
      } else {
        if ((t = this.zEu.indexOf(e)) !== -1) {
          this.zEu.splice(t, 1);
        } else {
          if (this.YEu.length + this.zEu.length === this.JEu) {
            t = this.zEu.shift();
            this.ZEu.GetLayoutItemByKey(t)?.SetToggleState(false);
          }
          this.zEu.push(e);
        }
        this.RefreshSelectedNum();
      }
    };
    this.tIu = () => {
      var e = new FloroRanchRaceCardItem_1.FloroRanchRaceCardItem();
      e.IsFixedRace = this.eIu;
      e.OnToggleCallBack = this.GZt;
      return e;
    };
    this.tWt = () => {
      var e = [...this.YEu, ...this.zEu];
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FloroRanchRaceRedDot, e);
      var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSelectedRaceIds) ?? new Map();
      t.set(this.XAu, e);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSelectedRaceIds, t);
      this.CloseMe();
    };
    this.AMo = () => {
      var e = this.OpenParam;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FloroRanchRaceRedDot, e.SelectedRaceIds);
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.tWt], [5, this.AMo]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.XAu = e.Id;
    var t = e.RaceList;
    this.JEu = t.length;
    this.YEu = t.filter(e => e !== 0);
    var t = e.SelectedRaceIds.filter(e => e !== 0);
    this.zEu = t?.filter(e => !this.YEu.includes(e)) ?? [];
    this.RefreshSelectedNum();
    this.ZEu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.tIu);
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchRaceDataList();
    await this.ZEu.RefreshByDataAsync(e, true);
    for (const r of t) {
      var i = this.ZEu.GetLayoutItemByKey(r);
      i?.SetToggleState(true);
      i?.SetEquippedPanelVisible(true);
    }
  }
  RefreshSelectedNum() {
    var e = this.YEu.length + this.zEu.length;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "FloroRanchRaceSelectedNum", e, this.JEu);
    this.GetButton(3).SetSelfInteractive(e === this.JEu);
  }
}
exports.FloroRanchRaceSelectView = FloroRanchRaceSelectView;
//# sourceMappingURL=FloroRanchRaceSelectView.js.map