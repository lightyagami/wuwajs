"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordTrialLevelItem = undefined;
const UE = require("ue");
const BlackSwordUIAssetById_1 = require("../../../../../Core/Define/ConfigQuery/BlackSwordUIAssetById");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class GreatSwordTrialLevelItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.LevelIndex = 0;
    this.DisplayIndex = 0;
    this.ScrollViewDelegate = undefined;
    this.OnClickToggleCallBack = undefined;
    this.CanClickCallBack = undefined;
    this.OnClickToggle = t => {
      if (t === 1) {
        this.OnClickToggleCallBack?.(this.LevelIndex);
      }
    };
    this.gke = () => !!this.CanClickCallBack && this.CanClickCallBack(this.LevelIndex);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickToggle]];
  }
  Refresh(t, e, i) {
    this.LevelIndex = i;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Config.TitleText);
    this.GetItem(5)?.SetUIActive(!t.Unlocked);
    this.GetItem(6)?.SetUIActive(t.Completed);
    this.QXc(t, i);
  }
  Clear() {}
  OnSelected(t) {}
  OnDeselected(t) {}
  GetKey(t, e) {
    return e;
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.GetExtendToggle(0).bLockStateOnSelect = true;
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.gke);
  }
  QXc(t, e) {
    var i = BlackSwordUIAssetById_1.configBlackSwordUIAssetById.GetConfig(t.Config.UIConfigId ?? 0);
    var s = i?.LevelColors ?? [];
    var r = i?.PatternPaths ?? [];
    var i = i?.StarPaths ?? [];
    var s = s[e] ?? "#ffffff";
    var r = r[e] ?? "";
    var i = i[e] ?? "";
    var e = UE.Color.FromHex(s);
    this.GetTexture(2)?.SetColor(e);
    var s = this.GetTexture(3);
    this.SetTextureByPath(r, s);
    var e = this.GetTexture(4);
    this.SetTextureByPath(i, e);
    var r = !t.Unlocked || t.Completed;
    e?.SetUIActive(!r);
  }
  SetToggleState(t) {
    this.GetExtendToggle(0)?.SetToggleState(t, false);
  }
  GetToggleState() {
    return this.GetExtendToggle(0)?.GetToggleState() ?? 0;
  }
}
exports.GreatSwordTrialLevelItem = GreatSwordTrialLevelItem;
//# sourceMappingURL=GreatSwordTrialLevelItem.js.map