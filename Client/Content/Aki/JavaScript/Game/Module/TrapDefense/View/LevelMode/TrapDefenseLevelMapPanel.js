"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelMapPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseLevelMapPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelData = undefined;
    this.IsInstance = false;
    this.OnClickBtnMonsterDesc = () => {
      ModelManager_1.ModelManager.TrapDefenseModel?.OpenViewMonster(this.LevelData.Config.InstId, undefined, this.IsInstance);
    };
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIText]];
    this.BtnBindInfo = [[1, this.OnClickBtnMonsterDesc]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {}
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  UpdateData(e) {
    this.LevelData = e;
    const t = this.GetTexture(0);
    this.SetTextureByPath(e.GetPreviewMapResource(), t, undefined, e => {
      if (e) {
        t.SetSizeFromTexture();
      }
    });
    this.GetText(2)?.ShowTextNew("TrapDefenseLevelDescTitle");
    var s = this.GetText(3);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, e.Config.DifficultyDesc, ...e.Config.DifficultyDescArgs);
  }
}
exports.TrapDefenseLevelMapPanel = TrapDefenseLevelMapPanel;
//# sourceMappingURL=TrapDefenseLevelMapPanel.js.map