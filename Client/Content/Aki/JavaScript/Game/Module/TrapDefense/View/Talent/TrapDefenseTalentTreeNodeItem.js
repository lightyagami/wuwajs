"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseTalentTreeNodeItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class TrapDefenseTalentTreeNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Hea = undefined;
    this.umd = true;
    this.eTt = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelTalentTree.SelectNode(this.Pe, false);
    };
    this.ald = e => {
      if (e === this.Pe) {
        this.GetExtendToggle(4).SetToggleState(1);
      } else {
        this.GetExtendToggle(4).SetToggleState(0);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIExtendToggle], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[4, this.eTt]];
  }
  OnStart() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelTalentTree.AddDelegateOnNodeSelect(this.ald);
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelTalentTree.RemoveDelegateOnNodeSelect(this.ald);
  }
  Refresh(e) {
    this.Pe = e;
    this.GetItem(5).SetUIActive(!e.IsUnlock);
    this.GetItem(6).SetUIActive(this.Pe.IsUnlock);
    var t = ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.CanNodeUnlock(this.Pe);
    var s = ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.CanNodeAfford(this.Pe);
    this.GetItem(11).SetUIActive(t && s && !e.IsUnlock);
    this.GetItem(12).SetUIActive(t && s && !e.IsUnlock);
    var t = this.GetSprite(7);
    t.SetChangeColor(!e.IsUnlock, t.changeColor);
    this.SetSpriteByPath(e.Icon, t, false);
    var s = e.IsUnlock ? "Loop" : "Start1";
    this.Hea.PlayLevelSequenceByName(s);
    if (e.IsUnlock && !this.umd) {
      this.Hea.PlayLevelSequenceByName("Start2");
    }
    this.umd = e.IsUnlock;
  }
  GetUpLines() {
    return [this.GetItem(2), this.GetItem(0)];
  }
  GetDownLines() {
    return [this.GetItem(3), this.GetItem(1)];
  }
  GetMidLines() {
    return [this.GetItem(10), this.GetItem(9)];
  }
  GetAllLines() {
    return [this.GetItem(2), this.GetItem(0), this.GetItem(3), this.GetItem(1), this.GetItem(9), this.GetItem(10)];
  }
  SetNodeActive(e) {
    this.GetItem(8).SetUIActive(e);
  }
}
exports.TrapDefenseTalentTreeNodeItem = TrapDefenseTalentTreeNodeItem;
//# sourceMappingURL=TrapDefenseTalentTreeNodeItem.js.map