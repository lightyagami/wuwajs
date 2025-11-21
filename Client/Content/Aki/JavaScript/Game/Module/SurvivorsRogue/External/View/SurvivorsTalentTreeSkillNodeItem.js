"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsTalentTreeSkillNodeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class SurvivorsTalentTreeSkillNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.cVd = undefined;
    this.OnClickToggleBack = undefined;
    this.kqe = () => {
      this.OnClickToggleBack?.(this.cVd, this.GetExtendToggle(6));
    };
  }
  get Node() {
    return this.cVd;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIExtendToggle]];
    this.BtnBindInfo = [[6, this.kqe]];
  }
  async RefreshNodeAsyncByData(e) {
    var s;
    var i;
    var t;
    var a;
    var r;
    if (e) {
      this.cVd = e;
      s = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetTalentTreeNode(e.NodeId);
      i = (t = e.Status) === 1;
      t = t === 0;
      a = (r = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData).IsEnoughUpgradeNode(e);
      r = r.IsPreNodeUpgraded(e);
      e = [this.SetSpriteAsync(s.Icon, this.GetSprite(1), false), this.SetSpriteAsync(s.Icon, this.GetSprite(3), false)];
      await Promise.all(e);
      this.GetItem(0).SetUIActive(i);
      this.GetItem(2).SetUIActive(!i);
      this.GetItem(5).SetUIActive(t && a && r);
    }
  }
  async RefreshNodeAsync() {
    await this.RefreshNodeAsyncByData(this.cVd);
  }
  SelectNode() {
    this.kqe();
  }
}
exports.SurvivorsTalentTreeSkillNodeItem = SurvivorsTalentTreeSkillNodeItem;
//# sourceMappingURL=SurvivorsTalentTreeSkillNodeItem.js.map