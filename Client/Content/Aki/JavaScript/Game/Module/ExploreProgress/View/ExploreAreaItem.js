"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreAreaItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const MapUtil_1 = require("../../Map/MapUtil");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreAreaItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.q6e = undefined;
    this.LPt = undefined;
    this.OnExtendToggleStateChanged = i => {
      if (this.q6e) {
        this.q6e(this, this.Pe, i === 1);
      }
    };
    this.gke = () => !this.LPt || this.LPt();
  }
  Initialize(i) {
    this.CreateByActorAsync(i.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIExtendToggle]];
    this.BtnBindInfo = [[4, this.OnExtendToggleStateChanged]];
  }
  OnStart() {
    this.GetExtendToggle(4).CanExecuteChange.Bind(this.gke);
  }
  OnBeforeDestroy() {
    this.q6e = undefined;
    this.LPt = undefined;
    this.GetExtendToggle(4).CanExecuteChange.Unbind();
  }
  Refresh(i) {
    var e = (this.Pe = i).AreaId;
    var t = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId() === e;
    var s = ModelManager_1.ModelManager.ExploreProgressModel.SelectedAreaId;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.NameId);
    this.GetText(2).SetText(Math.floor(i.Progress).toString() + "%");
    this.GetItem(3).SetUIActive(false);
    this.GetSprite(0).SetUIActive(t);
    this.SetSelected(s === e, true);
  }
  BindCanExecuteChange(i) {
    this.LPt = i;
  }
  SetSelected(i, e) {
    if (i) {
      this.GetExtendToggle(4).SetToggleState(1, e);
    } else {
      this.GetExtendToggle(4).SetToggleState(0, e);
    }
  }
  BindOnSelected(i) {
    this.q6e = i;
  }
}
exports.ExploreAreaItem = ExploreAreaItem;
//# sourceMappingURL=ExploreAreaItem.js.map