"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelUpIdentifyComponent = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const PhantomDataBase_1 = require("../../PhantomBattle/Data/PhantomDataBase");
const VisionIdentifyItem_1 = require("./VisionIdentifyItem");
class LevelUpIdentifyComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Layout = undefined;
    this.IHi = undefined;
    this.THi = undefined;
    this.LHi = undefined;
    this.sGe = () => new VisionIdentifyItem_1.VisionIdentifyItem();
    this.IHi = e;
  }
  async Init(e) {
    this.THi = e;
    await this.CreateByActorAsync(this.IHi.GetOwner(), undefined);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.Layout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.sGe);
    this.GetItem(1).SetUIActive(false);
  }
  async PlayUpdateAnimation(e) {
    await this.LHi?.Promise;
    let t = 0;
    const i = [];
    const s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionIdentifyAnimationTime();
    e.forEach(e => {
      e = this.Layout.GetLayoutItemByKey(e).PlaySequenceAndUpdate(t, s);
      i.push(e);
      t += s;
    });
    await Promise.all(i);
  }
  Update(e, i) {
    this.LHi = new CustomPromise_1.CustomPromise();
    if (e.length > 0) {
      const s = new Array();
      e.forEach(e => {
        var t = new PhantomDataBase_1.VisionSubPropViewData();
        t.Data = e;
        t.SourceView = this.THi;
        t.IfPreCache = i;
        s.push(t);
      });
      this.Layout.RefreshByData(s, () => {
        if (!this.LHi?.IsFulfilled()) {
          this.LHi.SetResult(true);
        }
      });
    }
  }
}
exports.LevelUpIdentifyComponent = LevelUpIdentifyComponent;
//# sourceMappingURL=VisionIdentifyComponent.js.map