"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkIconOption = undefined;
const UE = require("ue");
const GlobalData_1 = require("../../../../GlobalData");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class MarkIconOption extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.Config = undefined;
    this.I2o = undefined;
  }
  Initialize(t, e, i) {
    if (GlobalData_1.GlobalData.World) {
      this.I2o = e;
      e = t.GetOwner();
      t.SetUIActive(true);
      this.CreateThenShowByActor(e);
      this.Config = i;
      this.SetSpriteByPath(this.Config.MarkPic, this.GetSprite(0), false);
      this.RootItem.SetRaycastTarget(true);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle]];
  }
  OnStart() {
    this.GetExtendToggle(1).SetToggleGroup(this.I2o.GetOwner());
    this.GetExtendToggle(1).bLockStateOnSelect = true;
  }
  SetOnclick(t) {
    var e = this.GetExtendToggle(1);
    e.OnStateChange.Clear();
    e.OnStateChange.Add(t);
  }
  SetToggleChecked() {
    this.GetExtendToggle(1).SetToggleState(1, true);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(1).OnStateChange.Clear();
  }
}
exports.MarkIconOption = MarkIconOption;
//# sourceMappingURL=MarkIconOption.js.map