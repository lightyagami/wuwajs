"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityWheelTowerRewardView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const wheelTowerDiffList = [0, 1];
class ActivityWheelTowerRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = undefined;
    this.V_f = undefined;
    this.T8e = undefined;
    this.H_f = false;
    this.Hwn = () => {
      var e = new RewardTabItem();
      e.SetToggleClickCallback(this.pqe);
      return e;
    };
    this.pqe = e => {
      this.V_f?.SelectGridProxy(e);
      this.H_f = e === 1;
      this.j_f();
    };
    this.rOe = () => {
      var e = new RewardItem();
      e.SetOnClickReceiveCallback(this.$_f);
      return e;
    };
    this.$_f = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.WheelTowerController.RequestTaskReceive(this.H_f).then(() => {
        this.V_f?.GetGenericLayout()?.RefreshWithoutDataSync();
        this.j_f();
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    await this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.V_f = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.Hwn, undefined);
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.rOe, undefined);
  }
  OnStart() {
    this.V_f?.RefreshByData(wheelTowerDiffList, () => {
      this.V_f?.GetScrollItemByIndex(0)?.SetToggleStateForce(true, true);
    }, true);
    this.Qyi?.SetCloseCallBack(() => {
      this.CloseMe();
    });
  }
  j_f() {
    const t = ModelManager_1.ModelManager.WheelTowerModel.ActivityData;
    var e = t.GetLevelRecord(this.H_f);
    var e = ConfigManager_1.ConfigManager.WheelTowerConfig.GetRewardConfigListByLevelId(e.gG_);
    const s = e => {
      switch (t.GetTaskState(e)) {
        case 0:
          return 0;
        case 2:
          return 2;
        default:
          return 1;
      }
    };
    e = [...e].sort((e, t) => {
      var i = s(e.Id);
      var r = s(t.Id);
      if (i !== r) {
        return i - r;
      } else {
        return e.Id - t.Id;
      }
    });
    this.T8e?.RefreshByData(e.map(e => e.Id), undefined, true);
  }
}
exports.ActivityWheelTowerRewardView = ActivityWheelTowerRewardView;
class RewardTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.W_f = -1;
    this.Erf = undefined;
    this.kqe = () => {
      this.Erf?.(this.W_f);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    const e = this.GetExtendToggle(0);
    e.CanExecuteChange.Bind(() => e.ToggleState !== 1);
    ModelManager_1.ModelManager.WheelTowerModel?.ActivityData.RecordReadReward();
  }
  Refresh(e, t, i) {
    var e = (this.W_f = e) === 1;
    var r = e ? "WheelBattleMode_Endless" : "WheelBattleMode_Normal";
    this.GetText(2)?.ShowTextNew(r);
    var r = ModelManager_1.ModelManager.WheelTowerModel.ActivityData;
    var e = e ? 2 : 1;
    var s = r.GetTotalRewardProgress(e);
    var o = r.GetCurrentRewardProgress(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "WheelBattleMode_Progress", o, s);
    var o = r.HasAnyRewardCanReceive(e);
    this.GetItem(1)?.SetUIActive(o);
  }
  SetToggleClickCallback(e) {
    this.Erf = e;
  }
  SetToggleStateForce(e, t) {
    this.GetExtendToggle(0)?.SetToggleStateForce(e ? 1 : 0, t);
  }
  OnDeselected(e) {
    this.SetToggleStateForce(false, false);
  }
}
class RewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.H3e = undefined;
    this.Q_f = undefined;
    this.FVc = () => {
      this.Q_f?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[4, this.FVc]];
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid(), undefined);
  }
  Refresh(e, t, i) {
    var r = ConfigManager_1.ConfigManager.WheelTowerConfig.GetRewardConfigById(e);
    this.GetText(0)?.ShowTextNew(r.Desc);
    var r = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(r.DropId);
    this.H3e?.RefreshByData(r);
    var r = ModelManager_1.ModelManager.WheelTowerModel.ActivityData;
    var s = r.IsRewardCanReceive(e);
    var o = r.IsRewardCompleted(e);
    this.GetButton(4)?.RootUIComp.SetUIActive(s);
    this.GetItem(6)?.SetUIActive(o);
    this.GetItem(5)?.SetUIActive(!s && !o);
    var s = r.GetTask(e);
    this.GetText(1)?.SetText(s.Current + "/" + s.Target);
  }
  SetOnClickReceiveCallback(e) {
    this.Q_f = e;
  }
}
//# sourceMappingURL=WheelTowerRewardView.js.map