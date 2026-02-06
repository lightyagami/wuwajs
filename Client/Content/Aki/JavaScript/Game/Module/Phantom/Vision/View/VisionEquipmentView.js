"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionEquipmentView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const CalabashController_1 = require("../../../Calabash/CalabashController");
const CommonDropDown_1 = require("../../../Common/DropDown/CommonDropDown");
const FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const StaticTabComponent_1 = require("../../../Common/TabComponent/StaticTabComponent");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const RoleVisionDragHeadItem_1 = require("../../../RoleUi/TabView/VisionSubView/RoleVisionDragHeadItem");
const VisionCommonDragItem_1 = require("../../../RoleUi/TabView/VisionSubView/VisionCommonDragItem");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const PhantomBattleController_1 = require("../../PhantomBattle/PhantomBattleController");
const CostTabItem_1 = require("./CostTabItem");
const VisionDetailComponent_1 = require("./VisionDetailComponent");
const VisionEquipmentDragItem_1 = require("./VisionEquipmentDragItem");
const VisionEquipmentDropDownItem_1 = require("./VisionEquipmentDropDownItem");
const VisionEquipmentDropDownTitleItem_1 = require("./VisionEquipmentDropDownTitleItem");
const VisionEquipmentRecommendItem_1 = require("./VisionEquipmentRecommendItem");
const VisionIntensifyView_1 = require("./VisionIntensifyView");
const VisionMediumItemGrid_1 = require("./VisionMediumItemGrid");
const ANIMATIONTIME = 300;
const INVALIDINDEX = 999;
class VisionEquipmentView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Z6i = 10;
    this.T9i = undefined;
    this.L9i = TickSystem_1.TickSystem.InvalidId;
    this.D9i = TickSystem_1.TickSystem.InvalidId;
    this.R9i = TickSystem_1.TickSystem.InvalidId;
    this.U9i = TickSystem_1.TickSystem.InvalidId;
    this.dFe = 0;
    this.A9i = 0;
    this.P9i = 0;
    this.Uqe = 0;
    this.x9i = new Array();
    this.lqe = undefined;
    this.LoopScrollView = undefined;
    this.w9i = new Array();
    this.B9i = undefined;
    this.b9i = 0;
    this.q9i = undefined;
    this.G9i = undefined;
    this.N9i = 0;
    this.vpt = undefined;
    this.Mpt = undefined;
    this.O9i = undefined;
    this.k9i = INVALIDINDEX;
    this.rut = 0;
    this.F9i = 0;
    this.V9i = false;
    this.H9i = false;
    this.j9i = 0;
    this.W9i = 0;
    this.K9i = TickSystem_1.TickSystem.InvalidId;
    this.Q9i = undefined;
    this.VisionEquipmentDragItem = undefined;
    this.X9i = new Array();
    this.$9i = undefined;
    this.xut = 0;
    this.Y9i = 0;
    this.J9i = 0;
    this.z9i = 0;
    this.Z9i = 0;
    this.e7i = undefined;
    this.O5t = 0;
    this.t7i = new Array();
    this.h8e = undefined;
    this.i7i = new Array();
    this._Zf = new Map();
    this.Ife = false;
    this.H8i = false;
    this.o7i = false;
    this.r7i = 0;
    this.n7i = true;
    this.s7i = false;
    this.Gsa = 0;
    this.Ko_ = undefined;
    this.cGd = 0;
    this.JTt = i => {
      if (i === "ContrastSwitch") {
        this.GetItem(11).SetUIActive(this.o7i);
      }
    };
    this.Vcm = () => {
      this.Z9i = 0;
      this.vpt?.TryClearData();
      if (this.h8e.GetSelectedIndex() !== this.Z9i) {
        this.h8e.SetSelectedIndex(this.Z9i);
      }
    };
    this.$o_ = () => {
      var i;
      if (this.Ife) {
        if ((i = ModelManager_1.ModelManager.VisionRecommendModel.CurrentMainPhantom) && (this.Z9i = this.i7i.indexOf(i.FetterGroupId), this.Z9i === -1 && (this.Z9i = 0), this.OnClickVisionAndRefreshVisionView(0), this.vpt.SelectSingleById(i.MonsterId), this.h8e.GetSelectedIndex() !== this.Z9i)) {
          this.h8e.SetSelectedIndex(this.Z9i);
        } else {
          this.a7i();
        }
      }
    };
    this.C8e = i => {
      var t;
      this.Z9i = i;
      if (this.Ife && (this.a7i(), i = ModelManager_1.ModelManager.VisionRecommendModel.CurrentMainPhantom) && (t = this.i7i[this.Z9i], i.FetterGroupId !== t)) {
        this.Ko_.ClearSelectMainPhantom(false);
      }
    };
    this.g8e = i => {
      return Number(i);
    };
    this.m8e = i => {
      i = new VisionEquipmentDropDownItem_1.VisionEquipmentDropDownItem(i);
      i.SetRoleId(this.dFe);
      return i;
    };
    this.c8e = i => new VisionEquipmentDropDownTitleItem_1.VisionEquipmentDropDownTitleItem(i);
    this.fqe = (i, t) => {
      i = new CostTabItem_1.CostTabItem(i);
      i.Init();
      return i;
    };
    this.pqe = i => {
      this.O5t = this.t7i[i];
      this.Ko_.ChangeCost(this.O5t, this.dFe);
    };
    this.h7i = i => {
      ModelManager_1.ModelManager.PhantomBattleModel.SaveIfSimpleState(1, !i);
    };
    this.Cpt = () => {
      var i = {
        UniqueId: this.B9i?.GetUniqueId()
      };
      UiManager_1.UiManager.OpenView("VisionSkinView", i);
    };
    this.l7i = i => {
      if (i.ToHandleData.ViewName === "VisionEquipmentView" && this.IsShowOrShowing && !this.n7i) {
        this.n7i = true;
        this._7i(this.B9i?.GetUniqueId() ?? 0);
      }
    };
    this.zqn = i => {
      if (i) {
        i = this.N9i;
        this.N9i = 0;
        this._7i(i, false);
      }
    };
    this.u7i = () => {
      const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
      this.c7i(this.B9i, this.b9i, () => {
        ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(this.B9i.GetUniqueId(), i.GetRoleId(), this.b9i);
      });
    };
    this.m7i = () => {
      var i = new VisionIntensifyView_1.VisionIntensifyViewPassData();
      i.UniqueId = this.B9i.GetUniqueId();
      i.RoleId = this.dFe;
      UiManager_1.UiManager.OpenView("VisionIntensifyView", i);
    };
    this.Osa = () => {
      this.Gsa = this.N9i;
      this.CHi();
      CalabashController_1.CalabashController.JumpToCalabashRootView("VisionRecoveryTabView");
    };
    this.Hl_ = () => {
      if (this.H8i) {
        this.ctc();
      }
      if (this.GetExtendToggle(34).GetToggleState() === 1) {
        this.Ko_.Show();
      } else {
        this.Ko_.Hide();
      }
    };
    this.d7i = () => {
      if (this.GetExtendToggle(34).GetToggleState() === 1) {
        this.GetExtendToggle(34).SetToggleState(0);
        this.Ko_.Hide();
      }
      this.ctc();
    };
    this.sGe = () => {
      var i = new VisionMediumItemGrid_1.VisionMediumItemGrid();
      i.SetUseFixedAsync(true);
      i.SetClickToggleEvent(this.g7i);
      i.SetOnRefreshEvent(this.f7i);
      i.SetOnPointDownCallBack(this.p7i);
      i.SetOnPointUpCallBack(this.v7i);
      return i;
    };
    this.f7i = i => {
      if (i.CheckSelectedState(this.B9i)) {
        this.LoopScrollView.DeselectCurrentGridProxy();
        this.LoopScrollView.SelectGridProxy(i.GridIndex, false);
      }
    };
    this.p7i = (i, t) => {
      this.M7i();
      this.rut = 0;
      this.F9i = 0;
      this.V9i = true;
      this.Q9i = i;
      i = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0).GetWorldPointInPlane();
      this.j9i = i.X;
      this.W9i = i.Z;
      this.H9i = false;
      this.VisionEquipmentDragItem.UpdateItem(t);
      this.$9i.Refresh(t, false);
      this.E7i(true);
      this.S7i(0);
      this.k9i = -1;
      this.GetSprite(19).SetFillAmount(0);
      this.D9i = TickSystem_1.TickSystem.Add(this.y7i, "RoleVisionAnimation", 0, true, undefined, true).Id;
    };
    this.v7i = (i, t) => {
      this.M7i();
      this.GetLoopScrollViewComponent(6).SetEnable(true);
      this.$9i?.ClearStayingItem();
      this.VisionEquipmentDragItem.SetActive(false);
      this.E7i(false);
      this.k9i = INVALIDINDEX;
      if (!i && !t) {
        this.I7i();
      }
    };
    this.y7i = () => {
      var i;
      var t;
      this.rut += Time_1.Time.DeltaTime;
      if (this.H9i) {
        this.$9i.TickCheckDrag();
      }
      if (this.V9i) {
        if (this.rut > this.Y9i && this.J9i === 0) {
          this.T7i();
          this.S7i(1);
          this.F9i = 0;
        }
        if (this.J9i > 0) {
          this.F9i += Time_1.Time.DeltaTime;
        }
        if (this.Q9i && (t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0).GetWorldPointInPlane(), i = this.j9i - t.X, t = this.W9i - t.Z, Math.abs(i) + Math.abs(t) > this.z9i)) {
          this.E7i(false);
          this.V9i = false;
        }
        if (this.F9i > this.xut) {
          this.GetLoopScrollViewComponent(6).SetEnable(false);
          this.E7i(false);
          this.V9i = false;
          this.H9i = true;
          this.VisionEquipmentDragItem.SetActive(true);
          this.$9i.StartDragState();
          this.$9i.SetItemToPointerPosition();
          this.OnPointerDownCallBack(this.$9i.GetCurrentIndex());
          this.$9i.SetDragItemHierarchyMax();
          AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drag");
          this.U9i = TickSystem_1.TickSystem.Add(this.L7i, "RoleVisionAnimation", 0, true, undefined, true).Id;
        } else {
          this.GetSprite(19).SetFillAmount(this.F9i / this.xut);
        }
      }
    };
    this.L7i = () => {
      var i = LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(0);
      var t = LguiEventSystemManager_1.LguiEventSystemManager.IsNowTriggerPressed(0);
      var s = this.$9i.GetStayingItem();
      if (!i && !t) {
        if (s?.length === 0) {
          this.v7i(undefined, undefined);
          AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drop");
        } else {
          this.OnDragEndCallBack(this.$9i, this.$9i.GetStayingItem());
          this.v7i(undefined, undefined);
        }
        this.D7i();
      }
    };
    this.g7i = (i, t) => {
      this.R7i(i);
      this.LoopScrollView.DeselectCurrentGridProxy();
      this.LoopScrollView.SelectGridProxy(t);
      this.U7i(i);
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectData = this.A7i(t);
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId = i.GetUniqueId();
      this._7i(this.B9i.GetUniqueId());
      this.P7i();
    };
    this.TryEquip = (i, t, s) => {
      var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
      switch (i ? ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipState(e.GetRoleId(), t, i.GetUniqueId()) : 1) {
        case 0:
          if (t === -1) {
            return;
          }
          this.x7i(t);
          break;
        case 1:
        case 2:
          this.w7i(i, t, s);
      }
    };
    this.OnClickFailVision = i => {
      this.I7i();
    };
    this.OnClickVisionAndRefreshVisionView = i => {
      this.GetItem(15).SetRaycastTarget(false);
      this.B7i(i);
      this.b7i(false, false);
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
      if (ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(t.GetRoleId(), i) === 0) {
        this.LoopScrollView.ResetGridController();
      }
      this.q7i();
      if (this.B9i) {
        this.R7i(this.B9i);
      }
      AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_click");
    };
    this.Og = i => {
      this.G7i();
      this.q7i();
      this.P7i();
      this.N7i(i?.GetUniqueId() ?? 0);
    };
    this.O7i = () => {
      this.LoopScrollView.DeselectCurrentGridProxy();
      if (this.w9i.length > 0) {
        this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(true);
        this.LoopScrollView.RefreshAllGridProxies();
      } else {
        this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(false);
      }
    };
    this.I3a = () => {
      this.LoopScrollView.RefreshAllGridProxies();
    };
    this.F7i = () => {
      this.LoopScrollView.DeselectCurrentGridProxy();
      if (this.w9i.length > 0) {
        this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(true);
        this.LoopScrollView.ReloadData(this.w9i);
      } else {
        this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(false);
      }
      this.WTt();
    };
    this.G7i = () => {
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
      var t = ModelManager_1.ModelManager.PhantomBattleModel.GetCurrentViewShowPhantomList(i);
      var s = this.x9i.length;
      for (let i = 0; i < s; i++) {
        var e = t.length > i ? t[i] : undefined;
        this.x9i[i].UpdateItem(e, undefined);
        this.X9i[i].Refresh(e, false);
      }
      this.V7i();
    };
    this.OnBeginDrag = i => {
      var t = this.X9i.length;
      for (let i = 0; i < t; i++) {
        this.X9i[i].StartDragState();
      }
      for (let i = 0; i < t; i++) {
        if (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(this.X9i[i].GetCurrentIndex())) {
          this.X9i[i].SetDragItemHierarchyMax();
        }
      }
      this.X9i[i].SetItemToPointerPosition();
      this.k9i = i;
      AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drag");
    };
    this.OnPointerDownCallBack = i => {
      this.GetItem(15).SetRaycastTarget(true);
      var t = this.X9i.length;
      for (let i = 0; i < t; i++) {
        this.X9i[i].StartClickCheckTimer();
      }
    };
    this.H7i = () => {
      this.Uqe += Time_1.Time.DeltaTime;
      let i = this.Uqe / ANIMATIONTIME;
      if (i >= 1) {
        i = 1;
      }
      this.X9i[this.k9i].TickDoCeaseAnimation(i);
      if (i >= 1) {
        this.j7i(this.k9i);
        this.W7i();
      }
    };
    this.OnEquipError = () => {
      this.I7i();
    };
    this.OnPhantomEquip = () => {
      this.C7i();
    };
    this.OnVisionFilterMonster = () => {
      this.K7i();
    };
    this.Q7i = (i, t) => {
      this.W7i();
      this.Uqe = 0;
      this.k9i = INVALIDINDEX;
      this.X9i[i].SetActive(false);
      this.X9i[i].ResetPosition();
      this.x9i[i].ResetPosition();
      this.GetItem(15).SetRaycastTarget(false);
      const s = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
      this.c7i(t, i, () => {
        ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(t.GetUniqueId(), s.GetRoleId(), i);
      });
    };
    this.OnDragEndCallBack = (i, t) => {
      if (t.length < 1) {
        this.I7i();
        AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drop");
      } else {
        const s = VisionCommonDragItem_1.VisionCommonDragItem.GetOverlapIndex(i, t);
        if (s === -1) {
          this.I7i();
        } else {
          if (i.GetCurrentIndex() === -1) {
            this.I7i();
          }
          const e = i.GetCurrentIndex();
          const h = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
          const r = e !== -1;
          this.c7i(i.GetCurrentData(), s, () => {
            this.X7i(e, true);
            this.X7i(s, true);
            this.$7i(e, true);
            this.$7i(s, true);
            ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(i.GetCurrentData().GetUniqueId(), h.GetRoleId(), s, e, r);
          });
        }
      }
    };
    this.Y7i = (i, t, s) => {
      this.k9i = INVALIDINDEX;
      if (i >= 0) {
        this.X9i[i].SetActive(true);
        this.x9i[i].SetAniLightState(false);
      }
      if (s && i !== -1) {
        UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", true);
        this.J7i();
        this.Uqe = 0;
        s = this.X9i[t].GetAnimationTargetPos();
        this.X9i[i].SetDragComponentToTargetPositionParam(s);
        s = this.X9i[i].GetAnimationTargetPos();
        this.X9i[t].SetDragComponentToTargetPositionParam(s);
        this.A9i = i;
        this.P9i = t;
        this.X7i(this.A9i, true);
        this.X7i(this.P9i, true);
        this.$7i(this.A9i, true);
        this.$7i(this.P9i, true);
        this.L9i = TickSystem_1.TickSystem.Add(this.J_, "RoleVisionAnimation", 0, true, undefined, true).Id;
      } else {
        this.X7i(i, false);
        this.X7i(t, false);
        this.$7i(i, false);
        this.$7i(t, false);
        this.z7i();
        this.B7i(t);
        this.b7i(true, false, false);
        if (this.x9i[t].GetCurrentData()) {
          this.Z7i(t);
        }
        if (i >= 0) {
          AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_off");
        } else {
          AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_on");
        }
      }
    };
    this.J_ = () => {
      this.Uqe += Time_1.Time.DeltaTime;
      let i = this.Uqe / ANIMATIONTIME;
      if (i >= 1) {
        i = 1;
      }
      this.X9i[this.A9i].TickDoCeaseAnimation(i);
      this.X9i[this.P9i].TickDoCeaseAnimation(i);
      if (i >= 1) {
        this.eHi();
        this.J7i();
        AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_on");
      }
    };
    this.Awe = () => {
      this.CloseMe();
    };
    this.tHi = undefined;
    this.Qvt = (i, t, s) => {
      if (s === 0 && !t && this.C_m()) {
        this.Ko_.ClearSelectMainPhantom(false);
      } else {
        var e = i;
        const h = new Array();
        e.forEach(i => {
          h.push(ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i.Id));
        });
        this.w9i = h;
        this.F7i();
        i = i?.length > 0;
        this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(i);
        this.iHi(e, t, s);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UILoopScrollViewComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [16, UE.UIItem], [15, UE.UIItem], [17, UE.UIVerticalLayout], [18, UE.UIItem], [19, UE.UISprite], [20, UE.UIItem], [21, UE.UIExtendToggle], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIButtonComponent], [28, UE.UIItem], [29, UE.UIButtonComponent], [30, UE.UIText], [31, UE.UIItem], [32, UE.UIButtonComponent], [33, UE.UIItem], [34, UE.UIExtendToggle], [35, UE.UIItem]];
    this.BtnBindInfo = [[21, this.h7i], [27, this.Cpt], [29, this.d7i], [32, this.Osa], [34, this.Hl_]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomPersonalSkillActive, this.F7i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomEquipError, this.OnEquipError);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomEquip, this.OnPhantomEquip);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos, this.Y7i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.VisionFilterMonster, this.OnVisionFilterMonster);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayCameraAnimationFinish, this.l7i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.VisionSkinViewClose, this.zqn);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomPersonalSkillActive, this.F7i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomEquipError, this.OnEquipError);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomEquip, this.OnPhantomEquip);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos, this.Y7i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.VisionFilterMonster, this.OnVisionFilterMonster);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayCameraAnimationFinish, this.l7i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.VisionSkinViewClose, this.zqn);
  }
  OnStart() {
    this.n7i = false;
    this.GetItem(15).SetUIActive(true);
    this.GetItem(15).SetRaycastTarget(false);
    this.GetItem(9).SetUIActive(true);
    this.vpt = new FilterEntrance_1.FilterEntrance(this.GetItem(12), this.Qvt);
    this.vpt.OnBtnClearClickCallback = () => {
      this.Ko_.ClearSelectMainPhantom();
    };
    this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(13), this.Qvt);
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(6), this.GetItem(8).GetOwner(), this.sGe);
    this.oHi();
    this.O9i = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.O9i.BindSequenceCloseEvent(this.JTt);
    this.GetItem(14).SetUIActive(false);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7));
    this.lqe.SetCloseCallBack(this.Awe);
    this.xut = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerPressTime();
    this.z9i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerMoveDistance();
    this.Y9i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionBeforeScrollerLongPressTime();
    this.rHi();
    this.nHi();
    this.E7i(false);
    this.GetVerticalLayout(17).SetEnable(false);
    this.G9i.RefreshViewByCompareState(true);
    this.sHi();
    this.aHi();
    this.Ife = true;
    var i = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(1) ? 0 : 1;
    this.GetExtendToggle(21)?.SetToggleState(i);
    this.O9i.PlaySequencePurely("ContrastSwitch", false, true);
    this.o7i = false;
    this.GetButton(32).RootUIComp.SetUIActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10024001));
  }
  OnHandleLoadScene() {
    let i = 0;
    if ((i = this.Gsa > 0 && ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.Gsa) ? this.Gsa : i) === 0) {
      this.B9i = undefined;
    }
    if (i > 0 && ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i)) {
      this._7i(i);
      PhantomBattleController_1.PhantomBattleController.SetMeshTransform(this.tHi);
    }
  }
  async OnBeforeStartAsync() {
    var i = this.OpenParam;
    this.dFe = i.RoleId;
    this.cGd = i.SelectIndex;
    this.q9i = new VisionDetailComponent_1.VisionDetailComponent(this.GetItem(10));
    await this.q9i.Init();
    this.G9i = new VisionDetailComponent_1.VisionDetailComponent(this.GetItem(11));
    await this.G9i.Init();
    await this.hHi();
    this.Ko_ = new VisionEquipmentRecommendItem_1.VisionEquipmentRecommendItem();
    var i = this.GetItem(33);
    await this.Ko_.CreateByActorAsync(i.GetOwner());
    this.Ko_.BindOnChangeAttrCallBack(this.$o_);
    this.Ko_.OnDeselectMainPhantomCallback = this.Vcm;
    this.h8e = new CommonDropDown_1.CommonDropDown(this.GetItem(22), this.m8e, this.c8e);
    await this.h8e.Init();
  }
  oHi() {
    this.q9i.GetDetailUnderComponent().SetRightButtonClick(this.m7i);
    this.q9i.GetDetailUnderComponent().SetLeftButtonClick(this.u7i);
    this.q9i.SetActive(false);
    this.G9i.SetButtonPanelShowState(true);
    this.G9i.SetActive(true);
  }
  async hHi() {
    for (let i = 0; i <= 4; i++) {
      var t = new RoleVisionDragHeadItem_1.RoleVisionDragHeadItem(this.GetItem(i), 0 + i, undefined);
      this.x9i.push(t);
    }
    this.VisionEquipmentDragItem = new VisionEquipmentDragItem_1.VisionEquipmentDragItem(this.GetItem(16));
    await this.VisionEquipmentDragItem.Init();
    this.VisionEquipmentDragItem.SetActive(false);
    this.$9i = new VisionCommonDragItem_1.VisionCommonDragItem(this.VisionEquipmentDragItem.GetRootItem(), this.VisionEquipmentDragItem.GetDragComponent(), this.GetItem(15), -1);
    this.GetItem(16).SetUIActive(false);
    await Promise.all([...this.x9i.map(async i => i.Init())]);
    this.x9i.forEach(i => {
      var t = new VisionCommonDragItem_1.VisionCommonDragItem(i.GetRootItem(), i.GetDragComponent(), this.GetItem(15), i.GetCurrentIndex());
      this.X9i.push(t);
      t.SetOnDragAnimationStartFunction(i.OnDragItemDragBegin);
      t.SetOnDragAnimationEndFunction(i.OnDragItemDragEnd);
      t.SetOnOverlayCallBack(i.OnOverlay);
      t.SetOnUnOverlayCallBack(i.OnUnOverlay);
      t.SetMoveToScrollViewCallBack(i.OnScrollToScrollView);
      t.SetRemoveFromScrollViewCallBack(i.OnRemoveFromScrollView);
      i.SetShowType(1);
    });
    this.X9i.forEach(i => {
      i.SetOnClickCallBack(this.OnClickVisionAndRefreshVisionView);
      i.SetOnClickFailCallBack(this.OnClickFailVision);
      i.SetDragCheckItem(this.X9i);
      i.SetDragSuccessCallBack(this.OnDragEndCallBack);
      i.SetPointerDownCallBack(this.OnPointerDownCallBack);
      i.SetOnBeginDragCall(this.OnBeginDrag);
      i.SetEndDragWhenOnScrollViewCallBack(this.Q7i);
    });
    this.$9i.SetDragCheckItem(this.X9i);
  }
  aHi() {
    const h = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(this.dFe);
    var i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupArray();
    this._Zf.clear();
    i.forEach(i => {
      this.i7i.push(i.Id);
      this._Zf.set(i.Id, i.SortId);
    });
    this.i7i.sort((t, s) => {
      var i = h.find(i => i.GetRecommendFetterGroupId() === t);
      var e = h.find(i => i.GetRecommendFetterGroupId() === s);
      if (i && !e) {
        return -1;
      } else if (!i && e) {
        return 1;
      } else if (i && e) {
        i = i.GetUsage();
        return e.GetUsage() - i;
      } else {
        return this._Zf.get(s) - this._Zf.get(t);
      }
    });
    this.i7i.unshift(0);
    this.h8e.SetOnSelectCall(this.C8e);
    this.h8e.SetShowType(0);
    this.h8e.InitScroll(this.i7i, this.g8e, this.Z9i);
  }
  sHi() {
    var t = new Array();
    for (let i = 23; i <= 26; i++) {
      var s = this.GetItem(i);
      t.push(s);
    }
    var i = this.GetItem(20);
    this.e7i = new StaticTabComponent_1.StaticTabComponent(this.fqe, this.pqe);
    this.e7i.Init(t);
    var e = i.GetAttachUIChildren().Num();
    for (let t = 0; t < e; t++) {
      let i = t;
      if (t > 1) {
        i += 1;
      }
      this.t7i.push(i);
    }
    this.e7i.SelectToggleByIndex(0, true);
  }
  rHi() {
    if (this.cGd >= 0) {
      this.b9i = this.cGd;
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex = this.cGd;
    } else {
      this.b9i = ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex;
    }
    var i = ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId;
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i);
    if (i > 0 && t) {
      this.R7i(t);
    } else {
      this.R7i(this.A7i(this.b9i));
    }
  }
  lHi() {
    if (this.r7i > 0) {
      RedDotController_1.RedDotController.UnBindGivenUi("IdentifyTab", this.GetItem(28), this.r7i);
      this.r7i = 0;
    }
  }
  _Hi() {
    this.lHi();
    if (this.B9i) {
      this.r7i = this.B9i.GetUniqueId();
      RedDotController_1.RedDotController.BindRedDot("IdentifyTab", this.GetItem(28), undefined, this.r7i);
    }
  }
  nHi() {
    this.Og(this.B9i);
    this._7i(this.B9i?.GetUniqueId() ?? 0);
    this.uHi();
  }
  S7i(i) {
    this.GetItem(18).SetAlpha(i);
    this.J9i = i;
  }
  E7i(i) {
    this.GetItem(18).SetUIActive(i);
  }
  c7i(i, t, s) {
    if (this.cHi(i, t)) {
      this.TryEquip(i, t, s);
    } else {
      this.I7i();
    }
  }
  cHi(i, t) {
    var s = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(i.GetUniqueId());
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    var h = ModelManager_1.ModelManager.PhantomBattleModel;
    var t = h.GetRoleIndexPhantomId(e.GetRoleId(), t);
    var t = h.GetPhantomBattleData(t) ? h.GetPhantomBattleData(t).GetCost() : 0;
    var r = h.GetRoleCurrentPhantomCost(e.GetRoleId());
    if (s && s !== e.GetRoleId()) {
      var h = h.GetRoleCurrentPhantomCost(s) - i.GetCost() + t;
      var n = r - t + i.GetCost();
      if (h > this.mHi() || n > this.mHi()) {
        this.dHi();
        return false;
      }
    } else {
      if (s && s === e.GetRoleId()) {
        return true;
      }
      if (r - t + i.GetCost() > this.mHi()) {
        this.dHi();
        return false;
      }
    }
    return true;
  }
  dHi() {
    var i;
    if (this.mHi() < ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionReachableCostMax()) {
      (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(157)).FunctionMap.set(1, () => {
        this.CHi();
        UiManager_1.UiManager.OpenView("CalabashRootView", undefined, i => {
          if (i) {
            UiManager_1.UiManager.CloseView("VisionEquipmentView");
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomCostInsufficient);
          }
        });
      });
      i.IsEscViewTriggerCallBack = false;
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    } else {
      i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(158);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    }
  }
  q7i() {
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    let t = ModelManager_1.ModelManager.PhantomBattleModel.GetRoleCurrentPhantomCost(i.GetRoleId());
    var s = ModelManager_1.ModelManager.PhantomBattleModel?.GetRoleIndexPhantomId(i.GetRoleId(), this.b9i);
    var i = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(i.GetRoleId()).GetIncrIdList();
    var e = this.B9i ? this.B9i.GetUniqueId() : 0;
    var i = i.includes(e);
    if (s && s > 0 && !i) {
      e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(s);
      t -= e.GetCost();
    }
    if (!i) {
      t += this.B9i ? this.B9i.GetCost() : 0;
    }
    let h = "";
    let r = "";
    if (t > this.mHi()) {
      h = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorAlert();
      r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorFull();
      if (!this.s7i) {
        this.O9i.PlaySequencePurely("CostBlink");
        this.s7i = true;
      }
    } else {
      r = t === this.mHi() ? (h = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorFull(), ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorFull()) : (h = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorBase(), ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorBase());
      this.O9i.StopSequenceByKey("CostBlink", false, true);
      this.s7i = false;
    }
    this.GetText(5).SetText(StringUtils_1.StringUtils.Format("/{0}", this.mHi().toString()));
    this.GetText(30).SetText(StringUtils_1.StringUtils.Format("{0}", t.toString()));
    this.GetText(30).SetColor(UE.Color.FromHex(h));
    this.GetText(5).SetColor(UE.Color.FromHex(r));
  }
  ctc() {
    this.H8i = !this.H8i;
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    var i = ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIndexPhantomId(i.GetRoleId(), this.b9i);
    if (i > 0) {
      if (this.H8i) {
        this.GetItem(11).SetUIActive(true);
        this.O9i.StopSequenceByKey("ContrastSwitch", false, false);
        this.O9i.PlaySequencePurely("ContrastSwitch", false, false);
        this.o7i = true;
      } else {
        if (this.o7i) {
          this.O9i.StopSequenceByKey("ContrastSwitch", false, false);
          this.O9i.PlaySequencePurely("ContrastSwitch", false, true);
        }
        this.o7i = false;
      }
    } else {
      this.H8i = false;
    }
    this.GetItem(14).SetUIActive(this.H8i && i > 0);
    this.C7i();
  }
  C7i() {
    const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(i.GetRoleId(), this.b9i);
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
    if (t) {
      this.G9i.Update(t, this.dFe, this.O5t, true);
    } else {
      const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
      if (ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIndexPhantomId(i.GetRoleId(), this.b9i) === 0 && this.o7i) {
        this.O9i.PlaySequencePurely("ContrastSwitch", false, true);
        this.o7i = false;
        this.H8i = false;
      }
    }
  }
  R7i(i) {
    this.B9i = i;
    this.gHi();
    this.q7i();
    this._Hi();
  }
  M7i() {
    if (this.D9i !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.D9i);
      this.D9i = TickSystem_1.TickSystem.InvalidId;
    }
  }
  T7i() {
    var i = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0);
    var i = Vector2D_1.Vector2D.Create(i.X, i.Y);
    i.FromUeVector2D(UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(i.ToUeVector2D(true)));
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetX() * ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetXDir();
    var s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetY() * ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetYDir();
    var t = i.X + t;
    var i = i.Y + s;
    this.GetItem(18).SetLGUISpaceAbsolutePosition(new UE.Vector(t, i, 0));
  }
  fHi() {
    if (this.K9i !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.K9i);
      this.K9i = TickSystem_1.TickSystem.InvalidId;
    }
  }
  D7i() {
    if (this.U9i !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.U9i);
      this.U9i = TickSystem_1.TickSystem.InvalidId;
    }
  }
  x7i(i) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(0, t.GetRoleId(), i, i);
  }
  w7i(i, t, s) {
    var i = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(i.GetUniqueId());
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    if (i && i !== e.GetRoleId()) {
      e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(31);
      i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i);
      e.SetTextArgs(i.GetName());
      e.FunctionMap.set(1, () => {
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
      });
      e.FunctionMap.set(2, () => {
        s();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    } else {
      s();
    }
  }
  B7i(i) {
    if (this.b9i !== i) {
      this.b9i = i;
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex = i;
    }
  }
  b7i(i = false, t = true, s = true) {
    this.pHi(t, s);
    this.vHi(i);
  }
  pHi(i = true, t = true) {
    var s = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    var s = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(s.GetRoleId(), this.b9i);
    if (s !== 0) {
      this.N7i(s, t);
      s = this.A7i(this.b9i);
      this.R7i(s);
    } else if (i) {
      this.R7i(this.A7i(this.b9i));
      this.LoopScrollView.ResetGridController();
      this.N7i(this.B9i?.GetUniqueId() ?? 0, t);
    }
  }
  vHi(i = false) {
    this.U7i(this.B9i);
    this.V7i();
    this.C7i();
    this._7i(this.B9i?.GetUniqueId() ?? 0, i);
    this.P7i();
    this.uHi();
    this.I7i();
  }
  MHi() {
    var t = this.x9i.length;
    for (let i = 0; i < t; i++) {
      this.x9i[i].SetToggleState(0, false, true);
    }
  }
  uHi() {
    var t = this.x9i.length;
    for (let i = 0; i < t; i++) {
      this.x9i[i].SetToggleState(this.b9i === i ? 1 : 0);
    }
  }
  A7i(i) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(t.GetRoleId(), i);
    let s = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
    return s = s || (this.w9i.length > 0 ? this.w9i[0] : undefined);
  }
  U7i(i, t = 0) {
    if (i) {
      this.q9i.SetActive(true);
      this.q9i.Update(i, this.dFe, this.O5t, false);
    } else {
      this.q9i.SetActive(false);
    }
  }
  N7i(i, t = true) {
    this.LoopScrollView.DeselectCurrentGridProxy();
    let s = false;
    let e = 0;
    for (const h of this.w9i) {
      if (h.GetUniqueId() === i) {
        s = true;
        break;
      }
      e++;
    }
    if (!s) {
      e = 0;
    }
    if (this.w9i.length > 0 && s) {
      if (t) {
        this.LoopScrollView.ScrollToGridIndex(e, false);
      }
      this.LoopScrollView.SelectGridProxy(e);
    }
  }
  OnBeforeShow() {
    var i;
    ModelManager_1.ModelManager.PhantomBattleModel?.AddNeedCameraFocusMethodDisableViewCount();
    UiSceneManager_1.UiSceneManager.SetSceneFloorReflection(true, true);
    if (this.N9i > 0 && !UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle()) {
      i = this.N9i;
      this.N9i = 0;
      this._7i(i, false);
    }
    ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex();
    this.U7i(this.B9i);
    this.C7i();
    if (ModelManager_1.ModelManager.PhantomBattleModel.GetVisionLevelUpTag()) {
      this.a7i();
      ModelManager_1.ModelManager.PhantomBattleModel.ClearVisionLevelUp();
    } else if (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectFetterGroupId > 0) {
      this.Z9i = this.i7i.indexOf(ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectFetterGroupId);
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectFetterGroupId = 0;
      this.h8e.SetSelectedIndex(this.Z9i);
    } else {
      this.a7i();
    }
    this.K7i();
    this.MHi();
    this.uHi();
    this.P7i();
    this.G7i();
  }
  K7i() {
    ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectedFetter &&= undefined;
  }
  a7i() {
    var i = this.i7i[this.Z9i];
    var i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionSortUseDataList(i, this.O5t);
    this.vpt.UpdateDataWithConfig(this.Z6i, 3, i, this.dFe.toString(), this.dFe);
    var t = this.vpt.GetUniqueIdByGroupId(this.Z6i);
    this.Mpt.SetFilterUniqueId(t);
    this.Mpt.UpdateDataWithConfig(this.Z6i, 3, i, this.dFe.toString(), this.dFe);
    var t = this.Mpt.GetUniqueIdByGroupId(this.Z6i);
    this.vpt.SetSortUniqueId(t);
  }
  OnAfterShow() {
    this.X9i.forEach(i => {
      i.SetScrollViewItem(this.GetLoopScrollViewComponent(6).RootUIComp);
    });
  }
  OnAfterHide() {
    this.I7i();
    UiLayer_1.UiLayer.SetShowMaskLayer("playBackToStartPositionAnimation", false);
    UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", false);
  }
  _7i(i, t = false) {
    var s;
    if (this.n7i && (s = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(i)) && this.N9i !== s.GetUniqueId()) {
      this.SHi();
      ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(s.GetConfigId(true), () => {
        this.EHi(t);
      }, this.tHi);
      this.N9i = i;
    }
  }
  EHi(s = false) {
    if (this.tHi) {
      var e = this.tHi.Model;
      let i = undefined;
      let t = undefined;
      t = s ? (i = "VisionChangeEffect", "VisionChangeController") : (i = "VisionLevelUpEffect", "VisionStepupController");
      UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, i);
      UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e, t);
    }
  }
  gHi() {
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    let t = "";
    switch (this.B9i ? ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipState(i.GetRoleId(), this.b9i, this.B9i.GetUniqueId()) : 1) {
      case 0:
        t = "PhantomTakeOff";
        break;
      case 1:
        t = "PhantomPutOn";
        break;
      case 2:
        t = "PhantomReplace";
    }
    this.q9i.SetUnderLeftButtonText(t);
  }
  V7i() {
    var t = this.x9i.length;
    for (let i = 0; i < t; i++) {
      if (i === this.b9i) {
        this.x9i[i].SetSelected();
      } else {
        this.x9i[i].SetUnSelected();
      }
    }
  }
  async j7i(i) {
    this.P9i = i;
    this.X7i(this.A9i, false);
    this.X7i(this.P9i, false);
    await this.yHi(i);
    this.$7i(this.A9i, false);
    this.$7i(this.P9i, false);
    this.I7i(false);
    this.T9i.SetResult(true);
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
  W7i() {
    if (this.R9i !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.R9i);
      this.R9i = TickSystem_1.TickSystem.InvalidId;
    }
  }
  async I7i(i = true) {
    if (i && this.k9i !== INVALIDINDEX && this.k9i !== -1) {
      this.W7i();
      UiLayer_1.UiLayer.SetShowMaskLayer("playBackToStartPositionAnimation", true);
      this.Uqe = 0;
      this.T9i = new CustomPromise_1.CustomPromise();
      i = this.X9i[this.k9i].GetAnimationTargetPos();
      this.X9i[this.k9i].SetDragComponentToTargetPositionParam(i);
      this.R9i = TickSystem_1.TickSystem.Add(this.H7i, "OnFailAnimationTick", 0, true, undefined, true).Id;
      this.X7i(this.k9i, true);
      await this.T9i.Promise;
      UiLayer_1.UiLayer.SetShowMaskLayer("playBackToStartPositionAnimation", false);
      this.k9i = INVALIDINDEX;
    }
    this.X9i.forEach(i => {
      i.ResetPosition();
      i.SetActive(true);
    });
    this.x9i.forEach(i => {
      i.ResetPosition();
    });
    this.GetItem(15).SetRaycastTarget(false);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCommon", 27, "this.GetItem(EComponent.DragPanel)!.SetRaycastTar");
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
  WTt() {
    var i = this.w9i.length;
    this.GetItem(35).SetUIActive(i === 0);
  }
  async Z7i(i) {
    UiLayer_1.UiLayer.SetShowMaskLayer("playBackToStartPositionAnimation", true);
    this.X9i[i].DoCeaseSequence();
    await this.X9i[i].GetCeaseAnimationPromise()?.Promise;
    UiLayer_1.UiLayer.SetShowMaskLayer("playBackToStartPositionAnimation", false);
    return Promise.resolve();
  }
  async eHi() {
    this.x9i[this.P9i].GetRootItem().SetAsFirstHierarchy();
    this.X9i[this.A9i].SetToNormalParent();
    this.X7i(this.A9i, false);
    this.X7i(this.P9i, false);
    await this.yHi(this.A9i);
    this.$7i(this.A9i, false);
    this.$7i(this.P9i, false);
    await this.I7i(false);
    this.z7i();
    this.B7i(this.P9i);
    this.b7i(true, true, false);
    UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", false);
  }
  z7i() {
    this.O7i();
    this.G7i();
    this.C7i();
    this.q7i();
    this.gHi();
    this.I7i();
  }
  J7i() {
    if (this.L9i !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.L9i);
      this.L9i = TickSystem_1.TickSystem.InvalidId;
    }
  }
  mHi() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
  }
  SHi() {
    if (!UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle()) {
      UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle();
    }
    this.tHi = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle();
  }
  CHi() {
    UiSceneManager_1.UiSceneManager.DestroyVisionSkeletalHandle();
    this.tHi = undefined;
    this.N9i = 0;
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.PhantomBattleModel?.ReduceNeedCameraFocusMethodDisableViewCount();
    this.Ko_.Hide();
    this.GetExtendToggle(34)?.SetToggleState(0);
  }
  OnBeforePlayCloseSequence() {
    this.CHi();
    this.GetExtendToggle(34)?.SetToggleState(0);
  }
  OnBeforeDestroy() {
    this.CHi();
    this.tHi = undefined;
    this.fHi();
    this.lHi();
    this.LoopScrollView.ClearGridProxies();
    this.M7i();
    this.J7i();
    this.W7i();
    this.e7i.Destroy();
    this.h8e?.Destroy();
  }
  C_m() {
    var i = this.vpt.GetSelectRuleDataMap();
    var t = ModelManager_1.ModelManager.VisionRecommendModel?.CurrentMainPhantom?.MonsterId;
    let s = false;
    return s = t && (i === undefined || i.size !== 1 || !(i = Array.from(i.values()).shift()) || i.size > 1 || !i.has(t)) ? true : s;
  }
  iHi(s, i, e) {
    if (s?.length > 0) {
      let t = 0;
      if (e !== 1 || i) {
        var h = s.length;
        for (let i = 0; i < h; i++) {
          if (s[i].Id === this.B9i?.GetUniqueId()) {
            t = this.B9i?.GetUniqueId();
            break;
          }
        }
        if (t === 0) {
          t = s[0].Id;
        }
      } else {
        t = s[0].Id;
      }
      e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
      this.R7i(e);
      this.N7i(t);
      this.U7i(this.B9i);
      this.C7i();
      this._7i(t);
      this.P7i();
      this.uHi();
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var t = this.w9i;
    if (t.length !== 0) {
      if (i.length !== 2) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 16, "声骸聚焦引导extraParam配置错误");
        }
      } else {
        if (i[0] === "txt") {
          var s = this.q9i?.GetTxtItemByIndex(Number(i[1]));
          if (s) {
            return [s, s];
          }
        }
        if (i[0] === "item") {
          const e = Number(i[1]);
          if (e) {
            s = t.findIndex(i => i.GetMonsterId(true) === e);
            this.LoopScrollView.ScrollToGridIndex(s);
            return [t = this.LoopScrollView.GetGrid(s), t];
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Guide", 16, "声骸聚焦引导extraParam字段配置错误", ["configParams", i]);
            }
            return;
          }
        }
      }
    }
  }
  P7i() {
    var i = this.B9i?.GetMonsterId();
    if (i = i && ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(i)) {
      i = i.length > 1;
      this.GetButton(27).RootUIComp.SetUIActive(i);
      i = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListHasNew(this.B9i.GetConfigId());
      this.GetItem(31).SetUIActive(i);
    } else {
      this.GetButton(27).RootUIComp.SetUIActive(false);
    }
  }
}
exports.VisionEquipmentView = VisionEquipmentView;
//# sourceMappingURL=VisionEquipmentView.js.map