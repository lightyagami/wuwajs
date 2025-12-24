"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryTechnologyAreaItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const HonamiStoryTechnologyNodeItem_1 = require("./HonamiStoryTechnologyNodeItem");
const ROME_ICON_PATH = "/Game/Aki/UI/UIResources/Common/Atlas/SP_ComRomeText_0{0}.SP_ComRomeText_0{1}";
class HonamiStoryTechnologyAreaItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Kim = undefined;
    this.OnAfterRefreshOneNode = undefined;
  }
  get GetNodeItemMap() {
    return this.Kim;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [14, UE.UISprite], [10, UE.UIItem]];
  }
  OnStart() {
    this.Kim = new Map();
  }
  OnBeforeDestroy() {
    this.Kim = undefined;
  }
  Refresh(e, r, t) {
    var e = e.NodeIds;
    var t = (t + 1).toString();
    this.SetSpriteByPath(StringUtils_1.StringUtils.Format(ROME_ICON_PATH, t, t), this.GetSprite(14), true);
    var o = new Array();
    var s = new Array();
    for (const a of e) {
      var i = ModelManager_1.ModelManager.HonamiStoryModel.GetTechNodeData(a);
      if (i) {
        o.push(i.GetConfig.IndexId);
        s.push(i);
      }
    }
    for (let e = 0; e <= 6; e++) {
      this.GetItem(e).SetUIActive(o.includes(e + 1));
    }
    this.RefreshArea(s);
  }
  RefreshArea(e) {
    new UiAsyncTask_1.UiAsyncTask("RefreshArea", async () => {
      await this.RefreshAreaItemAsync(e);
    }).Run();
  }
  async RefreshAreaItemAsync(e) {
    var r = [];
    var t = new Map();
    for (const h of e) {
      var o = h.GetConfig.Id;
      var s = this.Kim.get(o);
      if (!s) {
        s = new HonamiStoryTechnologyNodeItem_1.HonamiStoryTechnologyNodeItem();
        this.Kim.set(o, s);
        r.push(s.CreateThenShowByActorAsync(this.GetItem(h.GetConfig.IndexId - 1).GetOwner()));
      }
      t.set(o, h);
    }
    await Promise.all(r);
    var i = [];
    for (const c of t.keys()) {
      var a = this.Kim.get(c);
      var n = t.get(c);
      i.push(a.RefreshNodeAsyncByData(n));
    }
    await Promise.all(i);
    for (const m of this.Kim.values()) {
      this.OnAfterRefreshOneNode?.(m);
    }
  }
  CloseLineRight() {
    this.GetItem(10).SetUIActive(false);
  }
}
exports.HonamiStoryTechnologyAreaItem = HonamiStoryTechnologyAreaItem;
//# sourceMappingURL=HonamiStoryTechnologyAreaItem.js.map