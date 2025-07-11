"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkWorldRunTaskItem = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ActivitySmallItemGrid_1 = require("../../Activity/ActivityContent/UniversalComponents/ActivitySmallItemGrid");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const DreamLinkController_1 = require("../DreamLinkController");
class DreamLinkWorldRunTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.bOe = undefined;
    this.j0l = undefined;
    this._fe = false;
    this.W2e = () => {
      return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    };
    this.IOe = () => {
      DreamLinkController_1.DreamLinkController.GetCurrentActivityData()?.SaveFirstCheckRedDotState(1, this.Data.Id);
      this.BNe();
      this.Data.JumpDelegate();
    };
    this.qOe = () => {
      this.Data.ReceiveDelegate();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem]];
    this.BtnBindInfo = [[1, this.qOe]];
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.W2e);
    this.GetItem(2).SetUIActive(false);
    this.j0l = new ButtonItem_1.ButtonItem(this.GetItem(0));
    this.j0l.SetFunction(this.IOe);
  }
  Refresh(t, i, e) {
    this.Data = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.TitleTextId);
    this.bOe.RefreshByData(t.GetRewardData());
    var r = t.Status === 0;
    var s = t.Status === 1;
    var h = t.Status === 3;
    var o = t.Status === 2;
    this.GetItem(4).SetUIActive(r);
    if (r) {
      this.GetText(5).SetText(t.GetLockTxt());
    }
    this.GetItem(8).SetUIActive(h || o);
    if (h || o) {
      this.GetText(9).SetText(TimeUtil_1.TimeUtil.GetTimeString(Math.max(t.PlayTime, 0)));
    }
    if (s) {
      this.j0l.SetLocalTextNew("WorldRun_Button_State1");
    } else if (h) {
      this.j0l.SetLocalTextNew("WorldRun_Button_State2");
    }
    this._fe = t.IsTimeLock();
    this.j0l.SetActive(s || h);
    this.GetButton(1).RootUIComp.SetUIActive(o);
    this.BNe();
  }
  RefreshLockText() {
    if (this.Data && this.Data.Status === 0 && this._fe) {
      this.GetText(5).SetText(this.Data.GetLockTxt());
    }
  }
  BNe() {
    var t = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    var i = this.Data.Status === 1;
    var t = t.GetRunRedDotState(this.Data.Id);
    if (i) {
      this.j0l.SetRedDotVisible(t);
    }
  }
}
exports.DreamLinkWorldRunTaskItem = DreamLinkWorldRunTaskItem;
//# sourceMappingURL=DreamLinkWorldRunTaskItem.js.map