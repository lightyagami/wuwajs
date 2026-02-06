"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightSuccessView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class MotorFightSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.H3e = undefined;
    this.W2e = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.nbf = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.ReChallengeMotorFightDungeon();
    };
    this.sbf = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.LeaveInstanceDungeon();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIArtText], [7, UE.UIItem], [8, UE.UIHorizontalLayout], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIButtonComponent]];
    this.BtnBindInfo = [[10, this.sbf], [11, this.nbf]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    if (e && e.Ffg) {
      this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.W2e);
      var i;
      var o;
      var r = [];
      for ([i, o] of Object.entries(e.Vfg)) {
        r.push([{
          ItemId: Number(i),
          IncId: 0
        }, o]);
      }
      await this.H3e.RefreshByDataAsync(r);
      let t = 0;
      for (const n of e.Ffg.bMs) {
        t += n.m9n;
      }
      this.GetItem(9)?.SetUIActive(e.Hfg);
      this.GetText(0)?.SetText("" + e.Ffg.jfg);
      this.GetText(2)?.SetText("" + (e.Ffg.vDd + t));
      this.GetText(4)?.SetText("" + e.Ffg.s3g);
      this.GetArtText(6)?.SetText(e.Ffg.Yma.toString());
      var s = e.Ffg.$fg;
      if (s) {
        this.GetText(1)?.SetText("+" + s.Qfg);
        this.GetText(3)?.SetText("+" + s.aE_);
        this.GetText(5)?.SetText("+" + s.a3g);
      }
      this.GetItem(7)?.SetUIActive(e.Nfg);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "摩托战斗结算数据异常");
    }
  }
}
exports.MotorFightSuccessView = MotorFightSuccessView;
//# sourceMappingURL=MotorFightSuccessView.js.map