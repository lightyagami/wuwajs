"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoadBookTabDynamicScrollItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class RoadBookTabDynamicScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.ActivityBaseData = t;
    this.JZ = undefined;
    this.fuo = undefined;
    this.Data = undefined;
    this.SelectedCallBack = undefined;
    this.IsSelectedOn = undefined;
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.JZ = new RoadBookTabItem(this.ActivityBaseData);
    await this.JZ.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.JZ.SelectedCallBack = this.SelectedCallBack;
    this.fuo = new RoadBookTabItemLock(this.ActivityBaseData);
    await this.fuo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.fuo.SelectedCallBack = this.SelectedCallBack;
  }
  GetUsingItem(t) {
    if (t.IsUnlock) {
      return this.cma(1);
    } else {
      return this.cma(0);
    }
  }
  cma(t) {
    return this.GetItem(t).GetOwner();
  }
  Update(t, i) {
    this.Data = t;
    this.fuo.SetUiActive(!t.IsUnlock);
    this.JZ.SetUiActive(t.IsUnlock);
    (t.IsUnlock ? this.JZ : this.fuo).RefreshByData(t, i);
    if (this.IsSelectedOn?.(t, i)) {
      this.SetSelected(true, false);
    } else {
      this.SetSelected(false, false);
    }
  }
  SetSelected(t, i) {
    this.fuo.SetToggleState(t, !!i && !this.Data.IsUnlock);
    this.JZ.SetToggleState(t, !!i && this.Data.IsUnlock);
  }
  BindSelectedCallBack(t) {
    this.SelectedCallBack = t;
  }
  BindIsSelectedOn(t) {
    this.IsSelectedOn = t;
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.RoadBookTabDynamicScrollItem = RoadBookTabDynamicScrollItem;
class RoadBookTabItemBase extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.ActivityBaseData = t;
    this.Data = undefined;
    this.Index = 0;
    this.SelectedCallBack = undefined;
    this.AVl = () => {
      if (this.Data) {
        this.SelectedCallBack?.(this.Data, this.Index);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.AVl]];
  }
  SetToggleState(t, i) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, i);
  }
  RefreshByData(t, i) {
    this.Data = t;
    this.Index = i;
  }
}
class RoadBookTabItem extends RoadBookTabItemBase {
  RefreshByData(t, i) {
    super.RefreshByData(t, i);
    var i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t.AreaId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Title);
    var i = this.ActivityBaseData.IsAreaTaskFinish(t.AreaId);
    var s = this.ActivityBaseData.GetAreaRewardState(t.AreaId);
    this.GetItem(2).SetUIActive(i);
    this.GetItem(3).SetUIActive(!t.IsUnlock);
    this.GetItem(4).SetUIActive(s);
  }
}
class RoadBookTabItemLock extends RoadBookTabItemBase {
  OnStart() {
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(true);
    this.GetItem(4).SetUIActive(false);
  }
  RefreshByData(t, i) {
    super.RefreshByData(t, i);
    i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t.AreaId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Title);
  }
}
//# sourceMappingURL=RoadBookTabDynamicScrollItem.js.map