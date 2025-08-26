"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseCampsiteHpPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
class TrapDefenseCampsiteHpPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.xXu = false;
    this.Sequence = undefined;
    this.vK1 = e => {
      if (e === "WarnOut") {
        this.GetItem(8)?.SetUIActive(false);
      } else if (e === "Hit" || e === "Treatment") {
        this.BXu(0);
      }
    };
    this.UXu = (e, t) => {
      var i;
      var s = this.GetArtText(6);
      if (!e && t) {
        s.SetText(MathUtils_1.MathUtils.LongToNumber(t.oTs).toString());
        this.BXu(0);
      } else if (e && t) {
        e = MathUtils_1.MathUtils.LongToNumber(e.oTs);
        t = MathUtils_1.MathUtils.LongToNumber(t.oTs);
        (i = this.GetArtText(7)).SetUIActive(true);
        s.SetText(MathUtils_1.MathUtils.LongToNumber(t).toString());
        if (e < t) {
          i.SetText("+" + (t - e).toString());
          this.BXu(1);
        } else if (t < e) {
          i.SetText((t - e).toString());
          this.BXu(2);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIArtText], [7, UE.UIArtText], [8, UE.UIItem], [9, UE.UITexture]];
  }
  InitializeTemp() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.vK1);
    this.BXu(0);
    this.kXu(this.xXu);
  }
  OnShowBattleChildViewPanel(e) {
    var t = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetHealth();
    this.GetArtText(6).SetText(t.toString());
    this.GetArtText(7).SetUIActive(false);
    ModelManager_1.ModelManager.TrapDefenseModel.BattleData.AddTreeVarUpdateDelegate(IQuest_1.ETrapDefenseSystemVarType.Health, this.UXu);
  }
  OnBeforeShow() {
    this.Sequence.PlaySequencePurely("Start");
  }
  async OnBeforeHideAsync() {
    var e = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("Close", e);
  }
  OnHideBattleChildViewPanel() {
    ModelManager_1.ModelManager.TrapDefenseModel.BattleData.RemoveTreeVarUpdateDelegate(IQuest_1.ETrapDefenseSystemVarType.Health, this.UXu);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  BXu(e) {
    if (e === 2) {
      this.Sequence.StopSequenceByKey("Treatment", false, true);
      this.Sequence.PlaySequencePurely("Hit");
    } else if (e === 1) {
      this.Sequence.StopSequenceByKey("Hit", false, true);
      this.Sequence.PlaySequencePurely("Treatment");
    } else {
      this.GetArtText(7)?.SetUIActive(false);
    }
  }
  SetWarningItemActive(e) {
    if (this.xXu !== e) {
      this.xXu = e;
      this.kXu(e);
    }
  }
  kXu(e) {
    if (e) {
      this.GetItem(8)?.SetUIActive(true);
      this.Sequence.StopSequenceByKey("WarnOut", false, true);
      this.Sequence.PlaySequencePurely("Warn");
    } else {
      this.Sequence.StopSequenceByKey("Warn", false, true);
      this.Sequence.PlaySequencePurely("WarnOut");
    }
  }
  SetLightItemActive(e) {
    this.GetTexture(9).SetUIActive(e);
  }
}
exports.TrapDefenseCampsiteHpPanel = TrapDefenseCampsiteHpPanel;
//# sourceMappingURL=TrapDefenseCampsiteHpPanel.js.map