"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerReviewView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TowerQuickPassById_1 = require("../../../../Core/Define/ConfigQuery/TowerQuickPassById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TowerData_1 = require("../TowerData");
const TowerReviewItem_1 = require("./TowerReviewItem");
class TowerReviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ucc = undefined;
    this.HDo = undefined;
    this.izc = false;
    this.sbi = () => {
      return new TowerReviewItem_1.TowerReviewItem();
    };
    this.L3e = () => {
      ModelManager_1.ModelManager.TowerModel.ClearHandleData();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIText], [3, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.ucc = new ButtonItem_1.ButtonItem();
    await this.ucc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.ucc.SetFunction(this.L3e);
  }
  OnStart() {
    this.HDo = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.sbi);
    this.Og();
  }
  OnBeforeDestroy() {
    this.HDo = undefined;
    if (this.izc) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerReviewGoToReward);
    }
  }
  Og() {
    var e = TowerData_1.VARIATION_RISK_DIFFICULTY;
    var i = ModelManager_1.ModelManager.TowerModel.GetDifficultyAllAreaFirstFloor(e, true);
    if (i) {
      this.HDo.RefreshByData(i);
      this.GetText(2).SetText(ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(e, true) + "/" + ModelManager_1.ModelManager.TowerModel.GetDifficultyAllStars(e, true));
      this.izc = false;
      for (const r of ModelManager_1.ModelManager.TowerModel.GetDifficultyAllFloor(e)) {
        var t = ModelManager_1.ModelManager.TowerModel.GetFloorData(r);
        if (t && t.IsQuickPass) {
          this.izc = true;
          break;
        }
      }
      this.GetText(3).SetUIActive(this.izc);
      if (this.izc) {
        i = ModelManager_1.ModelManager.TowerModel.QuickPassId;
        if (e = TowerQuickPassById_1.configTowerQuickPassById.GetConfig(i)) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.TipText);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CycleTower", 43, "TowerReviewView: QuickPass config not found", ["QuickPassId", i]);
        }
      }
      e = this.izc ? "CycleTowerReward" : "CycleTowerConfirm";
      this.ucc.SetLocalTextNew(e);
    }
  }
}
exports.TowerReviewView = TowerReviewView;
//# sourceMappingURL=TowerReviewView.js.map