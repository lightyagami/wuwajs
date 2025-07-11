"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerApplyFloorDataView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TowerController_1 = require("../TowerController");
const TowerData_1 = require("../TowerData");
const TowerRoleComplexItem_1 = require("./TowerRoleComplexItem");
class TowerApplyFloorDataView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.eDo = () => {
      this.CloseMe();
    };
    this.sOt = () => {
      TowerController_1.TowerController.TowerApplyFloorDataRequest(true);
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[6, this.eDo], [7, this.sOt]];
  }
  OnStart() {
    this.SHe();
  }
  SHe() {
    var r = ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor;
    if (r) {
      var o = ModelManager_1.ModelManager.TowerModel.GetFloorData(r.TowerId);
      var t = this.GetItem(8);
      var i = this.GetItem(5);
      for (let e = 0; e < r.Star; e++) {
        LguiUtil_1.LguiUtil.DuplicateActor(t.GetOwner(), i);
      }
      var a = this.GetItem(3);
      for (let e = 0; e < o.Star; e++) {
        LguiUtil_1.LguiUtil.DuplicateActor(t.GetOwner(), a);
      }
      t.SetUIActive(false);
      var l = this.GetItem(9);
      var s = this.GetItem(4);
      var _ = [];
      for (const u of r.Formation) {
        _.push(u.Q6n);
      }
      for (const h of _) {
        var n = LguiUtil_1.LguiUtil.CopyItem(l, s);
        const x = new TowerRoleComplexItem_1.TowerRoleComplexItem();
        x.CreateThenShowByActorAsync(n.GetOwner()).finally(() => {
          x.RefreshRoleId(h);
        });
      }
      var g = this.GetItem(2);
      var w = [];
      for (const M of o.Formation) {
        w.push(M.Q6n);
      }
      for (const f of w) {
        var T = LguiUtil_1.LguiUtil.CopyItem(l, g);
        const c = new TowerRoleComplexItem_1.TowerRoleComplexItem();
        c.CreateThenShowByActorAsync(T.GetOwner()).finally(() => {
          c.RefreshRoleId(f);
        });
      }
      l.SetUIActive(false);
      let e = "";
      if (r.Difficulties === TowerData_1.LOW_RISK_DIFFICULTY) {
        e = "Text_LowRiskAreaFloor_Text";
      } else if (r.Difficulties === TowerData_1.HIGH_RISK_DIFFICULTY) {
        e = "Text_HighRiskAreaFloor_Text";
      } else if (r.Difficulties === TowerData_1.VARIATION_RISK_DIFFICULTY) {
        e = "Text_VariationAreaFloor_Text";
      } else if (r.Difficulties === TowerData_1.OVERLOCK_RISK_DIFFICULTY) {
        e = "Text_OverLockAreaFloor_Text";
      }
      var U = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(r.TowerId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, U, r.FloorNumber);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CycleTower", 5, "打开爬塔成绩确认框时失败，未能获取到新挑战数据");
    }
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.TowerModel.ClearNotConfirmedData();
  }
}
exports.TowerApplyFloorDataView = TowerApplyFloorDataView;
//# sourceMappingURL=TowerApplyFloorDataView.js.map