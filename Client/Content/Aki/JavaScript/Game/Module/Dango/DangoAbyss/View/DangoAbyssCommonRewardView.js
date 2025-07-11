"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssCommonRewardView = exports.DangoAbyssRewardViewData = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const DangoAbyssRewardItem_1 = require("./DangoAbyssRewardItem");
class DangoAbyssRewardViewData {
  constructor() {
    this.Data = undefined;
  }
}
exports.DangoAbyssRewardViewData = DangoAbyssRewardViewData;
class DangoAbyssCommonRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.hT = 1;
    this.$8i = undefined;
    this.LoopScrollView = undefined;
    this.Xc1 = undefined;
    this.Yc1 = undefined;
    this.zc1 = [];
    this.AMo = () => {
      this.CloseMe();
    };
    this.Z3e = () => {
      this.zc1.forEach(t => {
        t.RefreshRedDot();
      });
      var t = this.$8i.Data.GetTaskActivityRewardDataList(2, this.hT);
      this.LoopScrollView.RefreshByData(t, false, undefined, true);
    };
    this.l6c = t => {
      this.hT = t;
      this.Z3e();
      this.AB_();
    };
    this.I2i = () => {
      return new DangoAbyssRewardItem_1.DangoAbyssRewardItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UILoopScrollViewComponent], [4, UE.UIVerticalLayout], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.AMo]];
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssRewardStateUpdate, this.Z3e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssRewardStateUpdate, this.Z3e);
  }
  async OnBeforeStartAsync() {
    this.Xc1 = new TabItem();
    this.Yc1 = new TabItem();
    await this.Xc1.CreateByActorAsync(this.GetItem(1).GetOwner());
    await this.Yc1.CreateByActorAsync(this.GetItem(2).GetOwner());
    this.zc1.push(this.Xc1);
    this.zc1.push(this.Yc1);
  }
  OnStart() {
    this.$8i = this.OpenParam;
    var i = this.$8i.Data.GetRewardTypeTabList(2);
    if (i.length > 0) {
      this.hT = i[0];
    }
    for (let t = 0; t < i.length; t++) {
      this.zc1[t].SetActive(true);
    }
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(5).GetOwner(), this.I2i);
  }
  AB_() {
    var t = this.$8i.Data.GetRewardTypeTabList(2);
    const e = [];
    var i = t.length;
    t.forEach(t => {
      var i = new TabData();
      i.TabId = t;
      i.CurrentSelectTabId = this.hT;
      i.ClickCallBack = this.l6c;
      i.ActivityData = this.$8i.Data;
      e.push(i);
    });
    for (let t = 0; t < i; t++) {
      this.zc1[t].Refresh(e[t], false, t);
    }
  }
  OnBeforeShow() {
    this.hT = this.$8i.Data.GetRewardTypeTabList(2).length > 0 ? this.$8i.Data.GetRewardTypeTabList(2)[0] : 1;
    this.Z3e();
    this.AB_();
  }
}
exports.DangoAbyssCommonRewardView = DangoAbyssCommonRewardView;
class TabData {
  constructor() {
    this.ActivityData = undefined;
    this.CurrentSelectTabId = 0;
    this.TabId = 0;
    this.ClickCallBack = undefined;
  }
}
class TabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.kqe = () => {
      if (this.$8i.ClickCallBack) {
        this.$8i.ClickCallBack(this.$8i.TabId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIExtendToggle], [3, UE.UIItem]];
    this.BtnBindInfo = [[2, this.kqe]];
  }
  Refresh(t, i, e) {
    this.$8i = t;
    var s = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssRewardTabById(t.TabId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.Name);
    var s = t.TabId === t.CurrentSelectTabId;
    var t = s ? 1 : 0;
    this.GetExtendToggle(2).SetToggleState(t);
    this.RefreshRedDot();
  }
  RefreshRedDot() {
    var t;
    if (this.$8i) {
      t = this.$8i.ActivityData.GetTaskActivityRewardDataList(2, this.$8i.TabId).some(t => t.RewardState === 1);
      this.GetItem(3).SetUIActive(t);
    }
  }
}
//# sourceMappingURL=DangoAbyssCommonRewardView.js.map