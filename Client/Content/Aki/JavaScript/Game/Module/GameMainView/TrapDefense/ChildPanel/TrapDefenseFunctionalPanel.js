"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseFunctionalPanel = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseFunctionalPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.TipsItem = undefined;
    this.qXu = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.OpenViewBdSum();
    };
    this.GXu = () => {
      ModelManager_1.ModelManager.TrapDefenseModel?.OpenViewMonster(undefined, 1);
    };
    this.FXu = () => {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.OpenPauseView();
    };
    this.vK1 = e => {
      if (e === "Close") {
        this.TipsItem.SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.qXu], [1, this.GXu], [2, this.FXu]];
  }
  InitializeTemp() {
    this.TipsItem = this.GetItem(3);
    this.TipsItem.SetUIActive(false);
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.TipsItem);
    this.Sequence.BindOnEndSequenceEvent(this.vK1);
    this.UpdateBdSumState();
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  SetTips(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e);
    this.TipsItem.SetUIActive(true);
    this.Sequence.PlaySequencePurely("Start");
  }
  HideTips() {
    this.Sequence.StopSequenceByKey("Start", false, true);
    this.Sequence.PlaySequencePurely("Close");
  }
  UpdateBdSumState() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstIsRogue();
    this.GetButton(0)?.RootUIComp.SetUIActive(e);
  }
}
exports.TrapDefenseFunctionalPanel = TrapDefenseFunctionalPanel;
//# sourceMappingURL=TrapDefenseFunctionalPanel.js.map