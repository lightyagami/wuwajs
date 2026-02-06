"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractRouletteTipsPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GRID_COUNT = 8;
class PhantomInteractRouletteTipsPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Iwf = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(1);
    var s = this.GetItem(0);
    t.SetUIActive(false);
    var a = [];
    for (let e = 0; e < GRID_COUNT; e++) {
      var i = new PhantomGridItem();
      var r = LguiUtil_1.LguiUtil.CopyItem(t, s);
      var r = i.CreateByActorAsync(r.GetOwner());
      a.push(r);
      this.Iwf.push(i);
    }
    await Promise.all(a);
    for (const e of this.Iwf) {
      e.SetUiActive(true);
    }
  }
  Refresh() {
    var t = ModelManager_1.ModelManager.PhantomInteractModel;
    for (let e = 0; e < this.Iwf.length; e++) {
      var s = this.Iwf[e];
      var a = t.InteractInfoData.EquippedVisionData[e];
      var a = t.InteractInfoData.GridItemDataMap.get(a.MonsterId);
      s.SetIcon(a?.IconPath);
    }
  }
}
exports.PhantomInteractRouletteTipsPanel = PhantomInteractRouletteTipsPanel;
class PhantomGridItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture]];
  }
  SetIcon(e) {
    var t = this.GetTexture(1);
    if (e) {
      t?.SetUIActive(true);
      this.SetTextureByPath(e, t);
    } else {
      t?.SetUIActive(false);
    }
  }
}
//# sourceMappingURL=PhantomInteractRouletteTipsPanel.js.map