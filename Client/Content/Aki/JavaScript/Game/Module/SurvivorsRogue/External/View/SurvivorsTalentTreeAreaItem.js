"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsTalentTreeAreaItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const SurvivorsTalentTreeSkillNodeItem_1 = require("./SurvivorsTalentTreeSkillNodeItem");
class SurvivorsTalentTreeAreaItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.NodeItemMap = undefined;
    this.OnAfterRefreshOneNode = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  OnStart() {
    this.NodeItemMap = new Map();
  }
  Refresh(e, r, s) {
    var e = e.NodeIds;
    var s = "SurvivorTreeNum_" + (s + 1);
    var s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s);
    this.SetSpriteByPath(s, this.GetSprite(0), true);
    var t = new Array();
    var i = new Array();
    for (const o of e) {
      var a = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.GetTalentNodeById(o);
      if (a) {
        t.push(a.IndexId);
        i.push(a);
      }
    }
    for (let e = 1; e <= 7; e++) {
      this.GetItem(e).SetUIActive(t.includes(e));
    }
    this.RefreshArea(i);
  }
  RefreshArea(e) {
    new UiAsyncTask_1.UiAsyncTask("RefreshArea", async () => {
      await this.RefreshAreaItemAsync(e);
    }).Run();
  }
  async RefreshAreaItemAsync(e) {
    var r;
    var s;
    var t = [];
    var i = [];
    for (const o of e) {
      var a = this.NodeItemMap.get(o);
      if (!a) {
        a = new SurvivorsTalentTreeSkillNodeItem_1.SurvivorsTalentTreeSkillNodeItem();
        this.NodeItemMap.set(o, a);
        t.push(a.CreateThenShowByActorAsync(this.GetItem(o.IndexId).GetOwner()));
      }
    }
    await Promise.all(t);
    for ([r, s] of this.NodeItemMap.entries()) {
      i.push(s.RefreshNodeAsyncByData(r));
    }
    await Promise.all(i);
    for (const n of this.NodeItemMap.values()) {
      this.OnAfterRefreshOneNode?.(n);
    }
  }
}
exports.SurvivorsTalentTreeAreaItem = SurvivorsTalentTreeAreaItem;
//# sourceMappingURL=SurvivorsTalentTreeAreaItem.js.map