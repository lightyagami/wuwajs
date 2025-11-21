"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleVisionTabView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const PhantomUtil_1 = require("../../Phantom/PhantomUtil");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const RoleController_1 = require("../RoleController");
const RoleVisionDragHeadItem_1 = require("./VisionSubView/RoleVisionDragHeadItem");
const RoleVisionInfoPanel_1 = require("./VisionSubView/RoleVisionInfoPanel");
const VisionCommonDragItem_1 = require("./VisionSubView/VisionCommonDragItem");
const INVALIDINDEX = 999;
class RoleVisionTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.T9i = undefined;
    this.hCo = false;
    this.lCo = false;
    this._Co = false;
    this.A9i = -1;
    this.P9i = -1;
    this.uCo = 0;
    this.Uqe = 0;
    this.k9i = INVALIDINDEX;
    this.cCo = undefined;
    this.d1o = undefined;
    this.x9i = new Array();
    this.X9i = new Array();
    this.b9i = 0;
    this.mCo = false;
    this.Wl_ = () => {
      this.pCo(true);
    };
    this.dCo = () => {
      this.CCo = false;
    };
    this.gCo = () => {
      this.$9t();
    };
    this.Ql_ = () => {
      this.Kl_();
    };
    this.Kl_ = () => {
      var i = this.d1o.GetCurSelectRoleId();
      this.pCo(true);
      UiManager_1.UiManager.OpenView("VisionAssembleView", i);
    };
    this.CCo = false;
    this.OnChangeRole = i => {
      this.Og();
      this.CCo = true;
      this.PlayMontageStart(true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshVisionEquipRedPoint, i);
    };
    this.RefreshPhantom = () => {
      var t = this.d1o?.GetCurSelectRoleData();
      var e = ModelManager_1.ModelManager.PhantomBattleModel.GetCurrentViewShowPhantomList(t);
      var s = this.x9i.length;
      for (let i = 0; i < s; i++) {
        var h = e.length > i ? e[i] : undefined;
        this.x9i[i].UpdateItem(h, t);
        this.X9i[i].Refresh(h, t.IsTrialRole());
      }
      this.RGt();
    };
    this.OnEquipError = () => {
      this.I7i();
    };
    this.OnClickFailVision = i => {
      if (this.fCo()) {
        this.I7i();
      }
    };
    this.OnClickVision = i => {
      var t;
      if (this.fCo()) {
        this.I7i();
        if ((t = this.d1o.GetCurSelectRoleData()).IsTrialRole()) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RolePhantomTrialTips");
        } else {
          this.b9i = i;
          ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex = i;
          i = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(t.GetRoleId(), i);
          ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId = i;
          this.pCo(true);
          this.uHi();
          this.I7i();
          AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_click");
          PhantomUtil_1.PhantomUtil.OpenVisionEquipmentView(t.GetRoleId());
          this.UiViewSequence.PlaySequencePurely("HideView");
        }
      }
    };
    this.OnPointerDownCallBack = i => {
      if (this.fCo()) {
        this.GetItem(7).SetRaycastTarget(true);
        var t = this.X9i.length;
        for (let i = 0; i < t; i++) {
          this.X9i[i].StartClickCheckTimer();
        }
        this.k9i = INVALIDINDEX;
      }
    };
    this.OnBeginDrag = i => {
      this.k9i = i;
      var t = this.d1o.GetCurSelectRoleData().IsTrialRole();
      if (!t) {
        this.X9i.forEach(i => {
          i.StartDragState();
        });
        var e = this.X9i.length;
        for (let i = 0; i < e; i++) {
          if (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(this.X9i[i].GetCurrentIndex())) {
            this.X9i[i].SetDragItemHierarchyMax();
          }
        }
        this.X9i[i].SetItemToPointerPosition();
        AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drag");
      }
    };
    this.OnDragEndCallBack = (i, t) => {
      var e;
      var s;
      if (t.length >= 1) {
        e = i.GetCurrentIndex();
        i = VisionCommonDragItem_1.VisionCommonDragItem.GetOverlapIndex(i, t);
        t = this.d1o.GetCurSelectRoleData();
        s = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t.GetRoleId()).GetIncrIdList();
        this.X7i(e, true);
        this.X7i(i, true);
        this.$7i(e, true);
        this.$7i(i, true);
        ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(s[e], t.GetRoleId(), i, e, true);
      } else {
        this.I7i();
        AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drop");
      }
    };
    this.Y7i = (i, t, e) => {
      if (e) {
        UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", true);
        this.hCo = false;
        this.Uqe = 0;
        e = this.X9i[t].GetAnimationTargetPos();
        this.X9i[i].SetDragComponentToTargetPositionParam(e);
        e = this.X9i[i].GetAnimationTargetPos();
        this.X9i[t].SetDragComponentToTargetPositionParam(e);
        this.A9i = i;
        this.P9i = t;
        this.X7i(this.A9i, true);
        this.X7i(this.P9i, true);
        this.$7i(this.A9i, true);
        this.$7i(this.P9i, true);
        this.hCo = true;
        AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_on");
      } else {
        this.RefreshPhantom();
      }
    };
    this.pCo = i => {
      if (i) {
        UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
        this.mCo = true;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIItem]];
    this.BtnBindInfo = [[6, this.gCo], [9, this.Ql_]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.OnChangeRole);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos, this.Y7i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomPersonalSkillActive, this.RefreshPhantom);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomEquipError, this.OnEquipError);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetRoleFlag, this.dCo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HideVisionTabRole, this.Wl_);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.OnChangeRole);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos, this.Y7i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomPersonalSkillActive, this.RefreshPhantom);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomEquipError, this.OnEquipError);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResetRoleFlag, this.dCo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HideVisionTabRole, this.Wl_);
  }
  async $9t() {
    var i = this.d1o.GetCurSelectRoleId();
    await ControllerHolder_1.ControllerHolder.PhantomBattleController.OpenPhantomBattleFetterView(0, i);
    this.pCo(true);
  }
  async OnBeforeStartAsync() {
    this.d1o = this.ExtraParams;
    if (this.d1o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleViewAgent为空", ["界面名称", "RoleVisionTabView"]);
      }
    } else {
      this.cCo = new RoleVisionInfoPanel_1.RoleVisionInfoPanel(this.GetItem(5));
      await this.cCo.Init();
      await this.vCo();
    }
  }
  OnStart() {
    this.GetItem(7).SetUIActive(true);
    this.GetItem(7).SetRaycastTarget(false);
    this.cCo.SetActive(true);
    this.cCo.SetConfirmButtonCall(() => {
      this.OnClickVision(this.b9i);
    });
    this.GetButton(6).RootUIComp.SetUIActive(true);
    this.uCo = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDragCurveTime();
  }
  async vCo() {
    var t = this.d1o?.GetCurSelectRoleData();
    for (let i = 0; i <= 4; i++) {
      this.x9i.push(new RoleVisionDragHeadItem_1.RoleVisionDragHeadItem(this.GetItem(i), 0 + i, t, true));
    }
    await Promise.all([...this.x9i.map(async i => i.Init())]);
    this.x9i.forEach(i => {
      var t = new VisionCommonDragItem_1.VisionCommonDragItem(i.GetRootItem(), i.GetDragComponent(), this.GetItem(7), i.GetCurrentIndex());
      this.X9i.push(t);
      t.SetOnDragAnimationStartFunction(i.OnDragItemDragBegin);
      t.SetOnDragAnimationEndFunction(i.OnDragItemDragEnd);
      t.SetOnOverlayCallBack(i.OnOverlay);
      t.SetOnUnOverlayCallBack(i.OnUnOverlay);
    });
    this.X9i.forEach(i => {
      i.SetOnClickCallBack(this.OnClickVision);
      i.SetOnClickFailCallBack(this.OnClickFailVision);
      i.SetDragCheckItem(this.X9i);
      i.SetDragSuccessCallBack(this.OnDragEndCallBack);
      i.SetPointerDownCallBack(this.OnPointerDownCallBack);
      i.SetOnBeginDragCall(this.OnBeginDrag);
    });
  }
  PlayMontageStart(i = false) {
    RoleController_1.RoleController.PlayRoleMontage(8, i);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex();
    if (this.CCo) {
      UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
      this.PlayMontageStart(true);
      this.CCo = false;
    } else if (this.mCo) {
      UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
      this.PlayMontageStart(true);
      this.mCo = false;
    } else {
      this.PlayMontageStart();
    }
    this.b9i = 0;
    this.Og();
    this.MCo();
    this.uHi();
    this.k9i = INVALIDINDEX;
    this.I7i();
    var i = this.d1o.GetCurSelectRoleId();
    this.$l_();
    this.Xl_();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshVisionEquipRedPoint, i);
  }
  $l_() {
    var i = ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionGroupFirstOpenState();
    this.GetItem(10).SetUIActive(i);
  }
  Og() {
    this.RefreshPhantom();
    var i = this.d1o.GetCurSelectRoleData();
    var t = i.IsTrialRole();
    ControllerHolder_1.ControllerHolder.PhantomBattleController.ChangeRoleEvent(i.GetDataId());
    this.cCo.RefreshView(this.d1o);
    this.GetButton(6).RootUIComp.SetUIActive(!t);
    this.RGt();
  }
  RGt() {
    var i = this.d1o.GetCurSelectRoleData();
    let t = 0;
    let e = 0;
    e = i?.IsTrialRole() ? (t = ModelManager_1.ModelManager.PhantomBattleModel.GetRoleCurrentPhantomCost(i.GetDataId()), ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionReachableCostMax()) : (t = ModelManager_1.ModelManager.PhantomBattleModel.GetRoleCurrentPhantomCost(i.GetRoleId()), this.mHi());
    this.GetText(8).SetText(StringUtils_1.StringUtils.Format("{0}/{1}", t.toString(), e.toString()));
    i = i.GetRoleId();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshVisionEquipRedPoint, i);
  }
  mHi() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
  }
  OnBeforeHide() {
    UiLayer_1.UiLayer.SetShowMaskLayer("playBackToStartPositionAnimation", false);
    UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", false);
  }
  Xl_() {
    var i = this.d1o.GetCurSelectRoleData().IsTrialRole();
    var t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10075);
    this.GetButton(9).RootUIComp.SetUIActive(t && !i);
  }
  MCo() {
    var t = this.x9i.length;
    for (let i = 0; i < t; i++) {
      this.x9i[i].SetToggleState(2);
    }
  }
  uHi() {
    var t = this.x9i.length;
    for (let i = 0; i < t; i++) {
      this.x9i[i].SetToggleState(0);
    }
  }
  X7i(i, t) {
    if (i >= 0) {
      this.X9i[i].SetMovingState(t);
    }
  }
  $7i(i, t) {
    if (i >= 0) {
      this.x9i[i].SetAnimationState(t);
    }
  }
  OnTickUiTabViewBase(i) {
    this.ECo(i);
    this.SCo(i);
  }
  SCo(t) {
    if (this.hCo) {
      this.Uqe += t;
      let i = this.Uqe / this.uCo;
      if (i >= 1) {
        i = 1;
      }
      this.X9i[this.A9i].TickDoCeaseAnimation(i);
      this.X9i[this.P9i].TickDoCeaseAnimation(i);
      if (i >= 1) {
        this.eHi();
        this.hCo = false;
      }
    }
  }
  ECo(t) {
    if (this.lCo) {
      this.Uqe += t;
      let i = this.Uqe / this.uCo;
      if (i >= 1) {
        i = 1;
      }
      this.X9i[this.k9i].TickDoCeaseAnimation(i);
      if (i >= 1) {
        this.j7i(this.k9i);
        this.lCo = false;
      }
    }
  }
  fCo() {
    return !this.hCo && !this.lCo && !this._Co;
  }
  async eHi() {
    this._Co = true;
    this.X7i(this.A9i, false);
    this.X7i(this.P9i, false);
    await this.yHi(this.A9i);
    this.$7i(this.A9i, false);
    this.$7i(this.P9i, false);
    await this.I7i(false);
    this.RefreshPhantom();
    this._Co = false;
    UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", false);
    this.k9i = INVALIDINDEX;
  }
  async j7i(i) {
    this.P9i = i;
    this._Co = true;
    this.X7i(this.A9i, false);
    this.X7i(this.P9i, false);
    await this.yHi(i);
    this.$7i(this.A9i, false);
    this.$7i(this.P9i, false);
    this.I7i(false);
    this._Co = false;
    this.T9i.SetResult(true);
    this.k9i = INVALIDINDEX;
  }
  async yHi(i) {
    this.X9i[i].SetToTargetParentAndSetStretch(this.x9i[this.P9i].GetRootItem());
    this.X9i[this.P9i].SetToTargetParentAndSetStretch(this.x9i[i].GetRootItem());
    this.X9i[i].DoCeaseSequence();
    if (this.P9i !== i && this.X9i[this.P9i].GetCurrentData()) {
      this.X9i[this.P9i].DoCeaseSequence();
    }
    await this.X9i[i].GetCeaseAnimationPromise()?.Promise;
  }
  async I7i(i = true) {
    var t = this.d1o.GetCurSelectRoleData().IsTrialRole();
    if (i && !t && this.k9i !== INVALIDINDEX) {
      UiLayer_1.UiLayer.SetShowMaskLayer("playBackToStartPositionAnimation", true);
      this.lCo = true;
      this.Uqe = 0;
      this.T9i = new CustomPromise_1.CustomPromise();
      i = this.X9i[this.k9i].GetAnimationTargetPos();
      this.X9i[this.k9i].SetDragComponentToTargetPositionParam(i);
      this.X7i(this.k9i, true);
      await this.T9i.Promise;
      UiLayer_1.UiLayer.SetShowMaskLayer("playBackToStartPositionAnimation", false);
    }
    this.GetItem(7).SetRaycastTarget(false);
    this.X9i.forEach(i => {
      i.ResetPosition();
    });
    this.x9i.forEach(i => {
      i.ResetPosition();
    });
    this.A9i = -1;
    this.P9i = -1;
  }
  yCo(i) {
    if (this.fCo() && i >= 0) {
      i = this.x9i[i]?.GetDragComponent()?.RootUIComp;
      if (i) {
        return [i, i];
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i.length === 1) {
      if (i[0] === "Equipped") {
        t = this.d1o.GetCurSelectRoleData();
        t = ModelManager_1.ModelManager.PhantomBattleModel.GetCurrentViewShowPhantomList(t).findIndex(i => i);
        return this.yCo(t);
      }
      if (i[0] === "First") {
        return this.yCo(0);
      }
      var t = this.cCo?.GetTxtItemByIndex(Number(i[0]));
      if (t) {
        return [t, t];
      }
    }
  }
  OnBeforeDestroy() {
    this.hCo = false;
  }
}
exports.RoleVisionTabView = RoleVisionTabView;
//# sourceMappingURL=RoleVisionTabView.js.map