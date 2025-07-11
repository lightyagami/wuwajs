"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySkinTabView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const EffectUtil_1 = require("../../../../Utils/EffectUtil");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FlySkinChildTabItem_1 = require("./FlySkinChildTabItem");
const FlySkinDefine_1 = require("./FlySkinDefine");
const FlySkinGridItem_1 = require("./FlySkinGridItem");
const FlySkinObtainItem_1 = require("./FlySkinObtainItem");
class FlySkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.yil = undefined;
    this.Nkc = undefined;
    this.GridLayout = undefined;
    this.ObtainLayout = undefined;
    this.ucc = undefined;
    this.c3c = undefined;
    this.u3c = undefined;
    this.d3c = undefined;
    this.A11 = 0;
    this.P11 = false;
    this.m3c = false;
    this.x01 = undefined;
    this.U01 = false;
    this.D01 = () => {
      this.Tt1();
    };
    this.CanTabToggleChange = () => {
      var i;
      return !!Info_1.Info.IsInGamepad() || (i = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), this.A11 === 0) || Time_1.Time.Now - this.A11 >= i;
    };
    this.Hkc = i => {
      if (i === 1) {
        this.ChangeSelectedTab(0);
        this.A11 = Time_1.Time.Now;
      }
    };
    this.$kc = i => {
      if (i === 1) {
        this.ChangeSelectedTab(1);
        this.A11 = Time_1.Time.Now;
      }
    };
    this.Wkc = i => {
      this.UpdateUiShowState(i === 1, true);
    };
    this.Qkc = i => {
      this.UpdateIsApplyToAll(i === 1);
      this.RefreshConfirmBtnState();
    };
    this.W2e = () => {
      var i = new FlySkinGridItem_1.FlySkinGridItem();
      i.BindOnExtendToggleStateChanged(this.gGc);
      i.BindOnCanExecuteChange(this.CGc);
      return i;
    };
    this.gGc = i => {
      i = i.Data.SkinId;
      i = this.Nkc.GetGridIndexBySkinId(i);
      if (i !== undefined) {
        this.SelectGridByIndex(i);
      }
    };
    this.CGc = i => {
      i = i.SkinId;
      return this.Nkc.SelectedFlySkinId !== i;
    };
    this.qil = () => new FlySkinObtainItem_1.FlySkinObtainItem();
    this.pGc = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(294);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.tWt = () => {
      var i = this.Nkc;
      const t = i.SelectedFlySkinId;
      const e = i.SelectedFlySkinType;
      var s = i.RoleDataId;
      if (i.IsApplyToAll) {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(293)).FunctionMap.set(2, () => {
          if (t === 0) {
            ControllerHolder_1.ControllerHolder.FlySkinController.FlySkinAllUnLoadRequest(e);
          } else {
            ControllerHolder_1.ControllerHolder.FlySkinController.FlySkinWearAllRoleRequest(t);
          }
          this.UpdateIsApplyToAll(false);
          this.RefreshConfirmBtnState();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      } else if (t === 0) {
        i = ModelManager_1.ModelManager.FlySkinModel.GetRoleEquipFlySkinId(s, e);
        ControllerHolder_1.ControllerHolder.FlySkinController.FlySkinUnLoadRequest(s, i);
      } else {
        ControllerHolder_1.ControllerHolder.FlySkinController.FlySkinWearRequest(s, t);
      }
    };
    this.Ykc = (i, t, e, s) => {
      var n = this.Nkc;
      if (t === n.SelectedFlySkinType && i === n.RoleDataId && ((t = n.GetGridIndexBySkinId(e)) !== undefined && this.GridLayout.GetLayoutItemByIndex(t)?.RefreshEquipState(), (i = n.GetGridIndexBySkinId(s)) !== undefined)) {
        this.GridLayout.GetLayoutItemByIndex(i)?.RefreshEquipState();
      }
    };
    this.vGc = (i, t) => {
      this.k01();
    };
    this.yGc = (i, t) => {
      this.k01();
    };
    this.SGc = i => {
      this.k01();
    };
    this.f3c = i => {
      this.k01();
    };
    this.mmo = i => {
      if (i.HandleName === this.x01) {
        this.x01 = undefined;
        if (!this.U01) {
          this.U01 = true;
          this.TryLoadModel();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILayoutBase], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UIItem], [5, UE.UILayoutBase], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText], [10, UE.UIExtendToggle], [11, UE.UIButtonComponent], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem]];
    this.BtnBindInfo = [[11, this.pGc]];
  }
  async OnBeforeStartAsync() {
    this.ucc = new ButtonItem_1.ButtonItem();
    this.c3c = new FlySkinChildTabItem_1.FlySkinChildTabItem();
    this.u3c = new FlySkinChildTabItem_1.FlySkinChildTabItem();
    await Promise.all([this.ucc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.c3c.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()), this.u3c.CreateThenShowByActorAsync(this.GetItem(13).GetOwner())]);
    this.ucc.SetFunction(this.tWt);
    this.c3c.Update(1);
    this.u3c.Update(0);
  }
  OnStart() {
    this.yil = this.ExtraParams;
    this.Nkc = this.yil.FlySkinTabViewModel;
    this.c3c.SetItemToggleState(0, false);
    this.u3c.SetItemToggleState(0, false);
    this.d3c = undefined;
    this.Nkc.ResetSelectedTab();
    this.c3c.AddItemToggleStateChange(this.Hkc);
    this.u3c.AddItemToggleStateChange(this.$kc);
    this.c3c.SetCanItemToggleStateChange(this.CanTabToggleChange);
    this.u3c.SetCanItemToggleStateChange(this.CanTabToggleChange);
    this.GetExtendToggle(3).OnStateChange.Add(this.Wkc);
    this.GetExtendToggle(10).OnStateChange.Add(this.Qkc);
    this.GridLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(1), this.W2e, this.GetItem(2).GetOwner());
    this.ObtainLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(5), this.qil, this.GetItem(6).GetOwner());
  }
  OnBeforeDestroy() {
    this.Xkc();
  }
  OnBeforeShow() {
    this.Kkc();
    this.A11 = 0;
    this.U01 = false;
    this.yil.ChangeModelState(2);
    var i = this.Nkc.SelectedFlySkinId;
    var i = i === -1 ? ModelManager_1.ModelManager.FlySkinModel.GetRoleEquipParaglidingSkinId(this.Nkc.RoleDataId) : i;
    var t = this.Nkc.SelectedTab ?? 0;
    this.UpdateView({
      Tab: t,
      SelectedSkinId: i ?? 0,
      UiShowState: true,
      IsApplyToAll: false
    });
  }
  OnAfterShow() {
    this.P11 = true;
    this.x11();
    this.U11();
  }
  B01() {
    var i;
    var t = this.yil.GliderObserver?.Model;
    if (t && (UiModelUtil_1.UiModelUtil.SetVisible(t, false), t?.CheckGetComponent(0)?.GetModelLoadState() === 2)) {
      i = this.Nkc.SelectedFlySkinType;
      i = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinSpawnEffectId(i);
      UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(t, i);
    }
  }
  OnBeforeHide() {
    this.Tt1();
  }
  Tt1() {
    this.x01 = undefined;
    this.U01 = false;
    this.P11 = false;
    this.B01();
    this.D11();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleFlySkinChange, this.Ykc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFlySkinEquipResponse, this.vGc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFlySkinUnLoadResponse, this.yGc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFlySkinEquipToAllRoleResponse, this.SGc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFlySkinAllUnLoadResponse, this.f3c);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkinRootViewDestroy, this.D01);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleFlySkinChange, this.Ykc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFlySkinEquipResponse, this.vGc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFlySkinUnLoadResponse, this.yGc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFlySkinEquipToAllRoleResponse, this.SGc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFlySkinAllUnLoadResponse, this.f3c);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkinRootViewDestroy, this.D01);
  }
  Kkc() {
    UiSceneManager_1.UiSceneManager.InitGliderSkeletalHandle();
    var i = UiSceneManager_1.UiSceneManager.GetGliderSkeletalHandle();
    i.Model.CheckGetComponent(1).SetTransformByTag(FlySkinDefine_1.DEFAULT_FLY_SKIN_CASE);
    this.yil.GliderObserver = i;
  }
  Xkc() {
    UiSceneManager_1.UiSceneManager.DestroyGliderSkeletalHandle();
    this.yil.GliderObserver = undefined;
  }
  UpdateView(i) {
    this.UpdateIsApplyToAll(i.IsApplyToAll);
    this.UpdateUiShowState(i.UiShowState, false);
    this.SelectTab(i.Tab, i.SelectedSkinId);
  }
  SelectTab(i, t) {
    var e = this.Nkc;
    e.SelectTab(i);
    const s = this.Nkc.GetGridIndexBySkinId(t);
    e.SelectGridByIndex(s);
    i = this.GetTabItem(e.SelectedTab);
    this.d3c?.SetItemToggleState(0, false);
    (this.d3c = i).SetItemToggleState(1, false);
    this.x11();
    this.GridLayout.RefreshByData(e.GridDataList, () => {
      this.GridLayout.SelectGridProxy(s, false);
    });
    this.OnGridSelected();
  }
  SelectGridByIndex(i) {
    this.Nkc.SelectGridByIndex(i);
    this.GridLayout.SelectGridProxy(i);
    this.OnGridSelected();
  }
  OnGridSelected() {
    var i = this.Nkc;
    var t = i.SelectedGridData;
    var e = t?.GetIsLock() ?? true;
    this.ObtainLayout.SetActive(e);
    if (e) {
      this.ObtainLayout.RefreshByData(i.GetWayDataList);
    }
    this.RefreshConfirmBtnState();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.GetName());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t.GetTypeDescription());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.GetDescription());
    this.TryLoadModel();
  }
  TryLoadModel() {
    var i = this.Nkc;
    var t = this.yil.GliderObserver?.Model;
    if (t) {
      if (this.U01) {
        var e = ConfigManager_1.ConfigManager.SkinConfig;
        var s = i.SelectedFlySkinType;
        var n = i.SelectedGridData;
        const r = n.GetStandAnimPath();
        var h = e.GetFlySkinSpawnEffectId(s);
        var e = e.GetFlySkinSpawnMaterialController(s);
        var s = EffectUtil_1.EffectUtil.GetEffectPath(h);
        const o = EffectUtil_1.EffectUtil.GetEffectPath(e);
        h = [r, s, o];
        const a = t.CheckGetComponent(2);
        const _ = t.CheckGetComponent(1);
        _.SetTransformByTag(i.ModelCase);
        a.LoadModelByModelId(n.GetModelId(), true, () => {
          var i;
          var t;
          var e = this.yil.GliderObserver?.Model;
          if (e) {
            UiModelUtil_1.UiModelUtil.SetVisible(e, true);
            if (!(i = a?.GetLoadedResource(r))) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("UiCommon", 43, "[FlySkin] 飞行皮肤待机动画预加载失败");
              }
            }
            e.CheckGetComponent(10).PlayAnimation(i, true);
            i = e.CheckGetComponent(5);
            if (t = a.GetLoadedResource(o)) {
              i?.AddRenderingMaterialByData(t);
            }
            UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, "GliderEffect");
          }
        }, h);
      } else {
        UiModelUtil_1.UiModelUtil.SetVisible(t, false);
        const _ = t.CheckGetComponent(1);
        _.SetTransformByTag(i.ModelCase);
      }
    }
  }
  UpdateUiShowState(i, t) {
    this.Nkc.SetUiShowState(i);
    var e = i ? 1 : 0;
    this.GetExtendToggle(3).SetToggleState(e, false);
    this.GetItem(0)?.SetUIActive(i);
    this.yil.SetCaptionItemActive(i);
    this.yil.RefreshGamePadKeyTip();
    this.yil.CameraInputComponent.CanCameraInput = !i;
    if (i && t) {
      this.x11();
    }
  }
  UpdateIsApplyToAll(i) {
    this.Nkc.SetIsApplyToAll(i);
    i = i ? 1 : 0;
    this.GetExtendToggle(10)?.SetToggleState(i, false);
  }
  RefreshConfirmBtnState() {
    var i;
    var t;
    var e = this.Nkc;
    var s = e.SelectedGridData?.GetIsLock() ?? true;
    this.GetItem(14)?.SetUIActive(!s);
    if (!s) {
      s = e.SelectedFlySkinId;
      i = e.SelectedFlySkinType;
      t = e.RoleDataId;
      e = !!e.IsApplyToAll || !ModelManager_1.ModelManager.FlySkinModel.CheckRoleEquipFlySkin(t, s, i);
      this.ucc.SetEnableClick(e);
      t = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinEquipBtnTextId(i, e);
      this.ucc.SetLocalTextNew(t);
    }
  }
  x11() {
    var i;
    if (this.P11) {
      i = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinModelCameraId(this.Nkc.SelectedFlySkinType);
      this.x01 = i;
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(i, true, true, "10010");
    }
  }
  U11() {
    if (!this.m3c) {
      this.yil.InitFlySkinTabCameraInputData();
      this.yil.CameraInputComponent.Start();
      this.yil.CameraInputComponent.TryActivate();
      this.m3c = true;
    }
  }
  D11() {
    if (this.m3c) {
      this.yil.CameraInputComponent.End();
      this.m3c = false;
    }
  }
  ChangeSelectedTab(i) {
    var t = ModelManager_1.ModelManager.FlySkinModel.GetRoleEquipFlySkinId(this.Nkc.RoleDataId, FlySkinDefine_1.flySkinTabToType[i]);
    this.SelectTab(i, t ?? 0);
  }
  GetTabItem(i) {
    switch (i) {
      case 0:
        return this.c3c;
      case 1:
        return this.u3c;
    }
  }
  k01() {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("FlySkinReplaceTip");
    this.UpdateIsApplyToAll(false);
    this.RefreshConfirmBtnState();
  }
}
exports.FlySkinTabView = FlySkinTabView;
//# sourceMappingURL=FlySkinTabView.js.map