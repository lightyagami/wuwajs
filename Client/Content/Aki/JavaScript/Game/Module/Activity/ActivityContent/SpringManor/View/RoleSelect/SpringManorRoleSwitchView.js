"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorRoleSwitchView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const UiLayer_1 = require("../../../../../../Ui/UiLayer");
const ButtonItem_1 = require("../../../../../Common/Button/ButtonItem");
const FilterSortEntrance_1 = require("../../../../../Common/FilterSort/FilterSortEntrance");
const EditFormationDefine_1 = require("../../../../../EditFormation/EditFormationDefine");
const RoleUtils_1 = require("../../../../../RoleUi/RoleUtils");
const LoopScrollView_1 = require("../../../../../Util/ScrollView/LoopScrollView");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
const SpringManorRoleGridItem_1 = require("./SpringManorRoleGridItem");
const ROLE_LOADING_MASK_TAG = "SpringManorRoleSwitchViewLoading";
class SpringManorRoleSwitchView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.HI1 = 0;
    this.RoleScrollView = undefined;
    this.FilterSortEntrance = undefined;
    this.DelayLoadingTimer = undefined;
    this.AutoCloseTimer = undefined;
    this.LoadingSequencePlayer = undefined;
    this.ZAt = undefined;
    this.Tp = false;
    this.qAt = () => {
      var i;
      var e;
      if (this.HI1 !== 0) {
        if (ModelManager_1.ModelManager.SpringManorModel.IsRoleDead(this.HI1)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ErrorCode_300038_Text");
        } else if ((e = ModelManager_1.ModelManager.EditFormationModel?.GetCurrentFormationData) === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SpringManor", 90, "检查试用角色时无当前编队数据！");
          }
        } else {
          i = e.GetRoleIdList;
          e = e.GetCurrentRolePosition - 1;
          if (RoleUtils_1.RoleUtils.HasMultiTrialRole(this.HI1, i, e)) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("EditBattleTeamMultiTrialRole");
          } else {
            this.E5t();
            ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController?.ChangeRoleRequest(this.HI1).then(() => {
              this.svi();
            });
          }
        }
      }
    };
    this.W7t = () => {
      this.svi();
    };
    this.Hlo = (i, e) => {
      var t = new Array();
      var r = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(this.HI1);
      if (r) {
        t.push(r);
      }
      for (const o of i) {
        if (!t.includes(o)) {
          t.push(o);
        }
      }
      r = t.length > 0;
      this.GetItem(11).SetUIActive(!r);
      this.ZAt?.SetUiActive(r);
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(r);
      if (r) {
        this.RoleScrollView.RefreshByData(t, false, () => {
          this.RoleScrollView?.UnsafeGetGridProxy(0)?.SetToggleState(true, true);
        });
      }
    };
    this.cHe = () => {
      var i = new SpringManorRoleGridItem_1.SpringManorRoleGridItem();
      i.BindOnExtendToggleStateChanged(this.ToggleFunction);
      i.BindOnCanExecuteChange(this.CanExecuteChange);
      return i;
    };
    this.ToggleFunction = i => {
      var e = i.Data;
      this.HI1 = e.GetDataId();
      var e = i.MediumItemGrid;
      this.RoleScrollView?.SelectGridProxy(e.GridIndex);
      this.Og();
    };
    this.CanExecuteChange = (i, e, t) => t !== 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[3, UE.UIItem], [4, UE.UIButtonComponent], [1, UE.UILoopScrollViewComponent], [2, UE.UIText], [5, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIText], [18, UE.UIText]];
    this.BtnBindInfo = [[4, this.W7t]];
  }
  async OnBeforeStartAsync() {
    this.ZAt = new ButtonItem_1.ButtonItem();
    this.ZAt.SetFunction(this.qAt);
    await this.ZAt.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    this.GetItem(5)?.SetUIActive(false);
    this.GetText(9)?.SetUIActive(false);
    this.GetText(18)?.ShowTextNew("Spring26_RoleSwitch_Loading");
    this.ZAt?.SetShowText("Spring26_ChangeRoleBtn_Text");
    this.RoleScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(10).GetOwner(), this.cHe);
    var i = this.GetItem(8);
    this.FilterSortEntrance = new FilterSortEntrance_1.FilterSortEntrance(i, this.Hlo);
    this.FilterSortEntrance.UpdateData(5, ModelManager_1.ModelManager.RoleModel.GetRoleDataList(true));
    this.LoadingSequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(13));
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    var i = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetCurrentRoleConfigId === this.HI1;
    this.ZAt?.GetBtn()?.SetSelfInteractive(this.HI1 !== 0 && !i);
  }
  E5t() {
    if (!this.DelayLoadingTimer) {
      UiLayer_1.UiLayer.SetShowMaskLayer(ROLE_LOADING_MASK_TAG, true);
      this.DelayLoadingTimer = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.GetButton(4)?.RootUIComp.SetUIActive(false);
        this.GetItem(13)?.SetUIActive(true);
        this.LoadingSequencePlayer?.PlaySequence("Progressing");
      }, EditFormationDefine_1.DELAY_SHOW_LOADING);
    }
    this.AutoCloseTimer ||= TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.svi();
    }, EditFormationDefine_1.AUTO_CLOSE_EDIT_FORMATION);
  }
  OnBeforeDestroy() {
    if (this.DelayLoadingTimer) {
      if (TimerSystem_1.GameplayTimerSystem.Has(this.DelayLoadingTimer)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.DelayLoadingTimer);
      }
      this.DelayLoadingTimer = undefined;
    }
    if (this.AutoCloseTimer) {
      if (TimerSystem_1.GameplayTimerSystem.Has(this.AutoCloseTimer)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.AutoCloseTimer);
      }
      this.AutoCloseTimer = undefined;
    }
    UiLayer_1.UiLayer.SetShowMaskLayer(ROLE_LOADING_MASK_TAG, false);
  }
  svi() {
    if (!this.Tp) {
      this.Tp = true;
      this.CloseMe();
    }
  }
}
exports.SpringManorRoleSwitchView = SpringManorRoleSwitchView;
//# sourceMappingURL=SpringManorRoleSwitchView.js.map