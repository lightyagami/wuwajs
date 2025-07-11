"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyTaskItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../../Ui/UiManager");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const DangoMonopolyDefine_1 = require("./DangoMonopolyDefine");
class DangoMonopolyTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.ClickCallBack = undefined;
    this.qsi = undefined;
    this.hoc = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.fGt.RewardItemId);
    };
    this.FVc = () => {
      this.ClickCallBack?.(this.fGt);
    };
    this.IOe = () => {
      UiManager_1.UiManager.CloseView("DangoMonopolyTaskView");
      this.fGt.JumpSource();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UIText], [0, UE.UIItem], [4, UE.UIButtonComponent], [3, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem]];
    this.BtnBindInfo = [[4, this.FVc], [3, this.IOe]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.qsi = new SmallItemGrid_1.SmallItemGrid();
    this.qsi.Initialize(this.GetItem(0).GetOwner());
    this.qsi.BindOnExtendToggleClicked(this.hoc);
    this.qsi.BindOnCanExecuteChange(() => false);
    this.GetText(7).ShowTextNew(DangoMonopolyDefine_1.dangoMonopolyTextKey.GoTo);
    this.GetText(8).ShowTextNew(DangoMonopolyDefine_1.dangoMonopolyTextKey.CanReceive);
    this.GetText(5).ShowTextNew(DangoMonopolyDefine_1.dangoMonopolyTextKey.InProgress);
  }
  OnStart() {
    this.GetText(5).ShowTextNew(DangoMonopolyDefine_1.dangoMonopolyTextKey.InProgress);
  }
  Refresh(t) {
    this.fGt = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, ["", this.fGt]);
    }
    this.GetText(1).ShowTextNew(this.fGt.TaskDesc);
    this.NVc();
    this.K2o();
    this.Usi();
  }
  NVc() {
    var t = this.GetText(2);
    var o = this.fGt.TotalProgress > 0;
    t.SetUIActive(o);
    if (o) {
      o = `(${this.fGt.Progress}/${this.fGt.TotalProgress})`;
      t.SetText(o);
    }
  }
  K2o() {
    var t = this.fGt.RewardItemCount;
    var t = {
      Data: this.fGt,
      Type: 4,
      ItemConfigId: this.fGt.RewardItemId,
      BottomText: t > 0 ? "" + t : "",
      IsReceivedVisible: this.fGt.TaskState === Protocol_1.Aki.Protocol.IPc.Proto_HasGet
    };
    this.qsi.Apply(t);
  }
  Usi() {
    var t = this.GetText(5);
    var o = this.GetSprite(6);
    var e = this.GetButton(4);
    var i = this.GetButton(3);
    var s = this.GetItem(9);
    var r = !!this.fGt.Source;
    o.SetUIActive(false);
    t.SetUIActive(false);
    i.RootUIComp.SetUIActive(false);
    e.RootUIComp.SetUIActive(false);
    s.SetUIActive(false);
    switch (this.fGt.TaskState) {
      case Protocol_1.Aki.Protocol.IPc.Proto_NotCompleted:
        t.SetUIActive(!r);
        i.RootUIComp.SetUIActive(r);
        break;
      case Protocol_1.Aki.Protocol.IPc.Proto_Completed:
        e.RootUIComp.SetUIActive(true);
        s.SetUIActive(true);
        break;
      case Protocol_1.Aki.Protocol.IPc.Proto_HasGet:
        o.SetUIActive(true);
    }
  }
}
exports.DangoMonopolyTaskItem = DangoMonopolyTaskItem;
//# sourceMappingURL=DangoMonopolyTaskItem.js.map