"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMapView = undefined;
const UE = require("ue");
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const TrapDefenseCampsiteHpPanel_1 = require("../../GameMainView/TrapDefense/ChildPanel/TrapDefenseCampsiteHpPanel");
const TrapDefenseMiniMapPanel_1 = require("../../GameMainView/TrapDefense/ChildPanel/TrapDefenseMiniMapPanel");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TrapDefenseMapView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.MiniMap = new TrapDefenseMiniMapPanel_1.TrapDefenseMiniMapPanel();
    this.CampsiteHpPanel = new TrapDefenseCampsiteHpPanel_1.TrapDefenseCampsiteHpPanel();
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.AMo]];
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.MiniMap.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.CampsiteHpPanel.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())]);
  }
  OnStart() {
    this.RJc();
    this.Rfd();
  }
  OnBeforeShow() {
    this.CampsiteHpPanel.ShowBattleChildViewPanel();
  }
  OnAfterHide() {
    this.CampsiteHpPanel.HideBattleChildViewPanel();
  }
  OnBeforeDestroy() {
    this.MiniMap.Reset();
    this.CampsiteHpPanel.Reset();
  }
  RJc() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel;
    var i = e.GetCurInstToLevelData();
    var i = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseWavesByLevelId(i.Id);
    var e = e.BattleData.GetBehaviorTreeVarToNumber(IQuest_1.ETrapDefenseSystemVarType.Batch);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "TowerDefense_Map_Progress_Text", e, i.length);
  }
  Rfd() {
    var e = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.GetEntityPositions();
    var i = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseWarningDistance();
    let r = false;
    if (e && e.length > 0) {
      for (const a of e) {
        if (a.Distance <= i) {
          r = true;
          break;
        }
      }
    }
    this.CampsiteHpPanel.SetWarningItemActive(r);
    this.CampsiteHpPanel.SetLightItemActive(false);
  }
}
exports.TrapDefenseMapView = TrapDefenseMapView;
//# sourceMappingURL=TrapDefenseMapView.js.map