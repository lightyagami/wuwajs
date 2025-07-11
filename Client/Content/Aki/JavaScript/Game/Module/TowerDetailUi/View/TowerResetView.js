"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerResetView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const TowerController_1 = require("../TowerController");
const TowerResetItem_1 = require("./TowerResetItem");
class TowerResetView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TDo = -1;
    this.tFe = undefined;
    this.sbi = () => {
      return new TowerResetItem_1.TowerResetItem();
    };
    this.eDo = () => {
      this.CloseMe();
    };
    this.sOt = () => {
      TowerController_1.TowerController.TowerResetRequest(this.TDo);
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.eDo], [4, this.sOt]];
  }
  OnStart() {
    this.SHe();
  }
  OnBeforeDestroy() {
    this.tFe = undefined;
  }
  SHe() {
    this.TDo = this.OpenParam;
    var e = ModelManager_1.ModelManager.TowerModel.GetFloorData(this.TDo);
    if (e) {
      this.tFe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.sbi);
      var t = [];
      for (const i of e.Formation) {
        t.push(i.Q6n);
      }
      this.tFe.RefreshByData(t);
      var r = ModelManager_1.ModelManager.TowerModel.GetDifficultyStars(e.Difficulties);
      this.GetText(1).SetText("" + r);
      this.GetText(2).SetText("" + (r - e.Star));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CycleTower", 5, "重置爬塔成绩时，无法获取到爬塔数据", ["TowerId: ", this.TDo]);
    }
  }
}
exports.TowerResetView = TowerResetView;
//# sourceMappingURL=TowerResetView.js.map