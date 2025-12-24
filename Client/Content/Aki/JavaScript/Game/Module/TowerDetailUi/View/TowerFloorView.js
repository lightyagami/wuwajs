"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerFloorView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const TowerController_1 = require("../TowerController");
const TowerData_1 = require("../TowerData");
const TowerModel_1 = require("../TowerModel");
const TowerBuffShowItem_1 = require("./TowerBuffShowItem");
const TowerElementItem_1 = require("./TowerElementItem");
const TowerFloorItem_1 = require("./TowerFloorItem");
const TowerMonsterItem_1 = require("./TowerMonsterItem");
const TowerStarsComplexItem_1 = require("./TowerStarsComplexItem");
const TowerTitleItem_1 = require("./TowerTitleItem");
class TowerFloorView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TDo = -1;
    this.bDo = undefined;
    this.UDo = undefined;
    this.ADo = undefined;
    this.H1i = undefined;
    this.Mli = undefined;
    this.gLt = undefined;
    this.SPe = undefined;
    this.qDo = [];
    this.GDo = () => {
      this.Og(this.TDo, !ModelManager_1.ModelManager.TowerModel.GetFloorIsUnlock(this.TDo));
      var e = ModelManager_1.ModelManager.TowerModel.GetDifficultyAreaAllFloor(ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties, this.OpenParam);
      ModelManager_1.ModelManager.TowerModel.DefaultFloor = this.TDo;
      this.bDo.RefreshByData(e);
    };
    this.PDo = () => {
      var e = new TowerFloorItem_1.TowerFloorItem();
      e.BindOnClickToggle((e, t) => {
        this.Og(e, t);
      });
      return e;
    };
    this.xDo = () => {
      return new TowerBuffShowItem_1.TowerBuffShowItem();
    };
    this.wDo = () => {
      return new TowerStarsComplexItem_1.TowerStarsComplexItem();
    };
    this.n8i = () => {
      return new TowerMonsterItem_1.TowerMonsterItem();
    };
    this.NDo = () => {
      return new TowerElementItem_1.TowerElementItem();
    };
    this.ODo = () => {
      UiManager_1.UiManager.OpenView("TowerResetView", this.TDo);
    };
    this.kDo = () => {
      ModelManager_1.ModelManager.TowerModel.OpenTowerFormationView(this.TDo);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIVerticalLayout], [3, UE.UIVerticalLayout], [4, UE.UIGridLayout], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UITexture], [9, UE.UIItem], [10, UE.UIItem], [12, UE.UIItem], [13, UE.UIHorizontalLayout], [14, UE.UIItem], [15, UE.UIItem]];
    this.BtnBindInfo = [[6, this.ODo], [7, this.kDo]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTowerRefresh, this.GDo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTowerRefresh, this.GDo);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties;
    this.bDo = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.PDo);
    ModelManager_1.ModelManager.TowerModel.DefaultFloor = -1;
    var t = ModelManager_1.ModelManager.TowerModel.GetDifficultyAreaAllFloor(e, this.OpenParam);
    if (ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmView) {
      ModelManager_1.ModelManager.TowerModel.DefaultFloor = ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmViewTowerId;
    } else {
      for (const i of t) {
        if (!ModelManager_1.ModelManager.TowerModel.GetHaveChallengeFloorAndFormation(i)) {
          ModelManager_1.ModelManager.TowerModel.DefaultFloor = i;
          break;
        }
      }
      if (ModelManager_1.ModelManager.TowerModel.DefaultFloor === -1) {
        ModelManager_1.ModelManager.TowerModel.DefaultFloor = t[0];
      }
    }
    this.bDo.RefreshByData(t);
    this.UDo = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.xDo);
    this.ADo = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.wDo);
    this.H1i = new GenericLayout_1.GenericLayout(this.GetGridLayout(4), this.n8i);
    this.gLt = new TowerTitleItem_1.TowerTitleItem(this.GetItem(0), () => {
      var e = UiManager_1.UiManager.GetViewByName("TowerNormalView");
      var t = UiManager_1.UiManager.GetViewByName("TowerVariationView");
      if (!ModelManager_1.ModelManager.TowerModel.CheckInTower() || e || t) {
        this.CloseMe();
      } else {
        TowerController_1.TowerController.BackToTowerView(() => {
          this.CloseMe();
        });
      }
    });
    this.Mli = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(13), this.NDo);
    let r = undefined;
    if (e === TowerData_1.LOW_RISK_DIFFICULTY) {
      r = "Text_LowRisk_Text";
    } else if (e === TowerData_1.HIGH_RISK_DIFFICULTY) {
      r = "Text_HighRisk_Text";
    } else if (e === TowerData_1.VARIATION_RISK_DIFFICULTY) {
      r = "Text_Variation_Text";
    } else if (e === TowerData_1.OVERLOCK_RISK_DIFFICULTY) {
      r = "Text_OverLock_Text";
    }
    e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(t[0]);
    this.gLt.RefreshText(r ?? "", e);
    this.Og(ModelManager_1.ModelManager.TowerModel.DefaultFloor, false);
    if (ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmView) {
      UiManager_1.UiManager.OpenView("TowerApplyFloorDataView");
    }
    this._rm();
  }
  _rm() {
    this.UiBehaviourHomeBtn?.AddExtraAsyncCallback(async () => {
      if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
        await TowerController_1.TowerController.LeaveTower();
      }
    });
  }
  OnBeforeDestroy() {
    this.bDo = undefined;
    this.UDo = undefined;
    this.ADo = undefined;
    this.H1i = undefined;
    this.gLt?.Destroy();
    this.SPe?.Clear();
    this.SPe = undefined;
    ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor = -1;
  }
  Og(e, t) {
    this.TDo = e;
    ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor = e;
    var r = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e);
    this.UDo.RefreshByData(r.ShowBuffs);
    this.H1i.RefreshByData(r.ShowMonsters, () => {
      this.GetItem(14).SetAnchorOffsetY(0);
    });
    if (r.RecommendElement?.length > 0) {
      this.GetItem(12)?.SetUIActive(true);
      this.Mli.RefreshByData(r.RecommendElement);
    } else {
      this.GetItem(12)?.SetUIActive(false);
    }
    var i = [];
    var o = ModelManager_1.ModelManager.TowerModel.GetFloorStarsIndex(e);
    for (let e = 0; e < TowerModel_1.FLOOR_STAR; e++) {
      var a = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTargetConfig(r.TargetConfig[e]);
      var a = [!!o && !!o.includes(e), a];
      i.push(a);
    }
    this.ADo.RefreshByData(i);
    this.GetText(5).SetText("" + r.Cost);
    this.GetItem(9).SetUIActive(!t);
    this.GetItem(10).SetUIActive(t);
    this.SetTextureByPath(r.BgPath, this.GetTexture(8));
    e = ModelManager_1.ModelManager.TowerModel.GetFloorData(this.TDo);
    if (e && e.Formation.length !== 0) {
      this.GetButton(6).RootUIComp.SetUIActive(true);
    } else {
      this.GetButton(6).RootUIComp.SetUIActive(false);
    }
    t = ModelManager_1.ModelManager.TowerModel.GetHaveChallengeFloor(this.TDo);
    this.SPe?.StopCurrentSequence(false, true);
    if (!this.qDo.includes(this.TDo) && !t) {
      this.SPe?.PlayLevelSequenceByName("BuffShow");
      this.qDo.push(this.TDo);
    }
    this.SPe?.PlayLevelSequenceByName("Switch");
    this.GetItem(15).SetUIActive(e?.IsQuickPass ?? false);
  }
}
exports.TowerFloorView = TowerFloorView;
//# sourceMappingURL=TowerFloorView.js.map