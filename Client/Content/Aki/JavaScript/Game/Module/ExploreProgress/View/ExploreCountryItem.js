"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreCountryItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreCountryItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.q6e = undefined;
    this.LPt = undefined;
    this.OnExtendToggleStateChanged = e => {
      if (this.q6e) {
        this.q6e(this, this.Pe, e);
      }
    };
    this.gke = () => !this.LPt || this.LPt();
  }
  Initialize(e) {
    this.CreateByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UISprite]];
    this.BtnBindInfo = [[3, this.OnExtendToggleStateChanged]];
  }
  OnStart() {
    this.GetExtendToggle(3).CanExecuteChange.Bind(this.gke);
  }
  OnBeforeDestroy() {
    this.q6e = undefined;
    this.LPt = undefined;
    this.GetExtendToggle(3).CanExecuteChange.Unbind();
  }
  Refresh(e) {
    this.Pe = e;
    var i = ModelManager_1.ModelManager.AreaModel.GetAreaCountryId() === e.CountryId;
    var t = ModelManager_1.ModelManager.ExploreProgressModel.SelectedCountryId;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.NameId);
    this.GetSprite(1).SetUIActive(e.IsLock);
    this.GetItem(2).SetUIActive(false);
    this.GetSprite(4).SetUIActive(i);
    this.SetSelected(t === e.CountryId);
  }
  SetSelected(e) {
    if (e) {
      this.GetExtendToggle(3).SetToggleState(1, false);
    } else {
      this.GetExtendToggle(3).SetToggleState(0, false);
    }
  }
  BindCanExecuteChange(e) {
    this.GetExtendToggle(3).CanExecuteChange.Bind(e);
  }
  BindOnSelected(e) {
    this.q6e = e;
  }
}
exports.ExploreCountryItem = ExploreCountryItem;
//# sourceMappingURL=ExploreCountryItem.js.map