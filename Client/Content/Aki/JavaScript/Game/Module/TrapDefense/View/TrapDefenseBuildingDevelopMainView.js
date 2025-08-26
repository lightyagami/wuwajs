"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingDevelopMainView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonDragLogic_1 = require("../../../Ui/Common/CommonDragLogic");
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const TrapDefenseBuildingDevelopData_1 = require("../Data/TrapDefenseBuildingDevelopData");
const TrapDefenseBuildingDevelopBottomDragItem_1 = require("./Item/TrapDefenseBuildingDevelopBottomDragItem");
const TrapDefenseBuildingDevelopBottomItem_1 = require("./Item/TrapDefenseBuildingDevelopBottomItem");
const TrapDefenseBuildingDevelopDetailItem_1 = require("./Item/TrapDefenseBuildingDevelopDetailItem");
const TrapDefenseBuildingDevelopDragDataItem_1 = require("./Item/TrapDefenseBuildingDevelopDragDataItem");
const TrapDefenseBuildingDevelopMainViewItem_1 = require("./Item/TrapDefenseBuildingDevelopMainViewItem");
const INVALID_INDEX = 999;
const HELP_ID = 403;
class TrapDefenseBuildingDevelopMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TabComponent = undefined;
    this.ynd = undefined;
    this.ScrollView = undefined;
    this.BottomItem = undefined;
    this.L6e = undefined;
    this.IsInDungeon = false;
    this.zRu = 0;
    this.zHc = undefined;
    this.TabDataList = [];
    this.DataListMap = new Map();
    this.DetailInfo = undefined;
    this.rut = 0;
    this.F9i = 0;
    this.V9i = false;
    this.H9i = false;
    this.j9i = 0;
    this.W9i = 0;
    this.J9i = 0;
    this.wZc = TickSystem_1.TickSystem.InvalidId;
    this.LZc = TickSystem_1.TickSystem.InvalidId;
    this.xut = 0;
    this.Y9i = 0;
    this.z9i = 0;
    this.DragItem = undefined;
    this.BottomItemList = [];
    this.AZc = undefined;
    this.PZc = [];
    this.Q9i = undefined;
    this.CurrentDragIndex = -1;
    this.CurrentSelectedBottomIndex = 0;
    this.DZc = (t, i) => {
      if (this.IsInDungeon) {
        this.xZc();
        this.rut = 0;
        this.F9i = 0;
        this.V9i = true;
        this.Q9i = t;
        t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0).GetWorldPointInPlane();
        this.j9i = t.X;
        this.W9i = t.Z;
        this.H9i = false;
        this.DragItem.UpdateItem(i);
        this.AZc.Refresh(i);
        this.E7i(true);
        this.S7i(0);
        this.UZc(0);
        this.wZc = TickSystem_1.TickSystem.Add(this.BZc, "TrapDefenseDevelopDragTick", 0, true, undefined, true).Id;
      }
    };
    this.kZc = (t, i) => {
      if (this.IsInDungeon) {
        this.xZc();
        this.GetScrollViewWithScrollbar(1).SetEnable(true);
        this.AZc?.ClearStayingItem();
        this.DragItem.SetUiActive(false);
        this.E7i(false);
        this.CurrentDragIndex = INVALID_INDEX;
        if (!t && !i) {
          this.xKe();
        }
      }
    };
    this.BZc = () => {
      var t;
      var i;
      if (this.IsInDungeon) {
        this.rut += Time_1.Time.DeltaTime;
        if (this.H9i) {
          this.AZc.TickCheckDrag();
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
          if (this.Q9i && (i = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0).GetWorldPointInPlane(), t = this.j9i - i.X, i = this.W9i - i.Z, Math.abs(t) + Math.abs(i) > this.z9i)) {
            this.E7i(false);
            this.V9i = false;
          }
          if (this.F9i > this.xut) {
            this.GetScrollViewWithScrollbar(1).SetEnable(false);
            this.E7i(false);
            AudioSystem_1.AudioSystem.PostEvent("play_ui_tafang_switch_mecha_drag");
            this.V9i = false;
            this.H9i = true;
            this.DragItem.SetUiActive(true);
            this.AZc.StartDragState();
            this.AZc.SetItemToPointerPosition();
            this.OnStartDragCallBack();
            this.AZc.SetDragItemHierarchyMax();
            this.LZc = TickSystem_1.TickSystem.Add(this.OZc, "TrapDefenseDevelopDragTick", 0, true, undefined, true).Id;
          } else {
            this.UZc(this.F9i / this.xut);
          }
        }
      } else {
        this.xZc();
      }
    };
    this.OZc = () => {
      var t = LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(0);
      var i = LguiEventSystemManager_1.LguiEventSystemManager.IsNowTriggerPressed(0);
      var e = this.AZc.GetStayingItem();
      if (!t && !i) {
        if (e !== undefined) {
          this.OnDragEndCallBack(this.AZc.GetItem(), this.AZc.GetStayingItem());
        }
        this.kZc(undefined, undefined);
        this.qZc();
      }
    };
    this.OnBeginDrag = t => {
      for (const i of this.PZc) {
        i.StartDragState();
      }
      for (const e of this.PZc) {
        if (ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CheckIfCurrentDragIndex(e.GetCurrentIndex())) {
          e.SetDragItemHierarchyMax();
        }
      }
      this.PZc[t].SetItemToPointerPosition();
      this.CurrentDragIndex = t;
    };
    this.OnDragEndCallBack = (t, i) => {
      if (i) {
        i = i.GetCurrentIndex();
        AudioSystem_1.AudioSystem.PostEvent("play_ui_tafang_switch_mecha_equip");
        if (t.GetCurrentIndex() === -1) {
          this.GetItem(6)?.SetUIActive(false);
          this.xKe();
          var e = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetSlotData();
          if (t.GetCurrentData() === e[i].GetSlotData()) {
            return;
          }
        }
        ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.EquipOrgan(i, t.GetCurrentData()).then(() => {
          this.xKe();
          this.GetItem(6)?.SetUIActive(false);
        });
      } else {
        this.xKe();
      }
    };
    this.Q7i = (t, i) => {
      this.rut = 0;
      this.CurrentDragIndex = INVALID_INDEX;
      this.GetItem(6)?.SetUIActive(false);
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.EquipOrgan(t, i).then(() => {
        this.xKe();
        this.BottomItemList[t].ResetPosition();
      });
    };
    this.OnStartDragCallBack = () => {
      this.GetItem(6).SetUIActive(true);
      for (const t of this.PZc) {
        t.StartClickCheckTimer();
      }
    };
    this.OnClickAndRefreshView = t => {
      this.GetItem(6).SetUIActive(false);
      if (this.CurrentSelectedBottomIndex !== t) {
        AudioSystem_1.AudioSystem.PostEvent("play_ui_tafang_switch_mecha_click");
      }
      this.GZc(t);
    };
    this.OnClickFail = t => {
      this.xKe();
    };
    this.ITt = () => {
      var t;
      var i = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetActivityConfig();
      if (i && !this.IsInDungeon) {
        i = i.TechPointItem;
        t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.RemainPoints;
        this.ynd?.RefreshTemp(i, t.toString());
      }
    };
    this.c_d = () => {
      this.UpdateDetail(this.zHc);
    };
    this.TIc = () => {
      if (this.IsInDungeon) {
        ControllerHolder_1.ControllerHolder.TrapDefenseController.RefreshTrapDefenseMainView();
      }
      this.CloseMe();
    };
    this.CanToggleChange = t => {
      var i;
      return !!Info_1.Info.IsInGamepad() || (i = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), !this.L6e) || Time_1.Time.Now - this.L6e >= i;
    };
    this.R6e = (t, i) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.pqe = t => {
      this.L6e = Time_1.Time.Now;
      this.zRu = t;
      const n = this.DataListMap.get(t);
      for (const e of this.DataListMap.get(0)) {
        if ((e.CurSelectedData = undefined) !== e.TempSelectedData) {
          this.zHc = e.TempSelectedData;
          e.TempSelectedData = undefined;
        }
      }
      if (this.zHc) {
        let t = false;
        for (const s of n) {
          if (s.GetDataList().includes(this.zHc)) {
            s.CurSelectedData = this.zHc;
            t = true;
            break;
          }
        }
        if (!t) {
          this.zHc = undefined;
        }
      }
      if (!this.zHc && this.IsInDungeon) {
        var i = this.BottomItem.CheckCurSlotEmpty();
        if (i) {
          for (const h of n) {
            if (h.GetDataList().includes(i)) {
              h.CurSelectedData = i;
              this.JHc(i);
            }
          }
        }
      }
      if (!this.zHc) {
        t = n[0].GetDataList()[0];
        this.JHc(t);
      }
      this.ScrollView?.RefreshByData(n, () => {
        let i = undefined;
        var e = this.ScrollView.GetScrollItemList();
        for (let t = 0; t < e.length; t++) {
          var s = e[t];
          var h = n[t];
          s.SetInitSelect();
          s.SetScrollParent(undefined);
          if (h.CurSelectedData !== undefined) {
            i = s;
          }
        }
        if (i) {
          if (i.GetChildRefreshed()) {
            TimerSystem_1.TimerSystem.Next(() => {
              TimerSystem_1.TimerSystem.Next(() => {
                this.GetScrollViewWithScrollbar(1).ScrollToTop(undefined, i.GetRootItem());
              });
            });
          } else {
            i.SetScrollParent(this.GetScrollViewWithScrollbar(1));
          }
        }
      }, true);
      this.UpdateDetail(this.zHc);
    };
    this.yqe = t => {
      t = this.TabDataList[t];
      return new CommonTabData_1.CommonTabData(t.Icon, new CommonTabTitleData_1.CommonTabTitleData(t.TabName));
    };
    this.jbe = t => {
      var i = this.ScrollView.GetScrollItemList();
      this.JHc(t);
      for (const e of i) {
        e.CheckSelectedIsInTypeItem(t);
      }
      this.UpdateDetail(t);
      if (this.IsInDungeon) {
        this.BottomItem.SetMenuSelectedData(t);
      }
    };
    this.ZHc = t => {
      var i = this.ScrollView.GetScrollItemList();
      this.JHc(undefined);
      let e = false;
      for (const s of i) {
        if (s.CheckBottomItemIsInTypeItem(t)) {
          e = true;
          this.GetScrollViewWithScrollbar(1).ScrollToTop(undefined, s.GetRootItem());
          this.JHc(t);
        }
      }
      this.BottomItem.SetMenuSelectedData(t);
      if (e) {
        this.UpdateDetail(t);
      } else {
        this.JHc(t);
        this.TabComponent?.SelectToggleByIndex(0, true);
      }
    };
    this.rmd = t => {
      var i = this.ScrollView.GetScrollItemList();
      this.JHc(undefined);
      for (const e of i) {
        if (e.CheckBottomItemIsInTypeItem(t)) {
          this.GetScrollViewWithScrollbar(1).ScrollToTop(undefined, e.GetRootItem());
          this.JHc(t);
          break;
        }
      }
      this.UpdateDetail(t, false);
    };
    this.AOe = t => {
      var i = this.DataListMap.get(this.zRu);
      this.JHc(t);
      this.ScrollView?.RefreshByData(i, () => {
        for (const t of this.ScrollView.GetScrollItemList()) {
          t.SetInitSelect();
        }
      }, true);
      var i = !this.IsInDungeon && ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetCanAllReset();
      this.GetButton(3)?.RootUIComp.SetUIActive(i);
      this.UpdateDetail(t);
    };
    this.e$c = () => {
      var t = this.DataListMap.get(this.zRu);
      this.ScrollView?.RefreshByData(t, () => {
        for (const t of this.ScrollView.GetScrollItemList()) {
          t.SetInitSelect();
        }
      }, true);
      this.UpdateDetail(this.zHc);
      var t = !this.IsInDungeon && ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetCanAllReset();
      this.GetButton(3)?.RootUIComp.SetUIActive(t);
    };
    this.t$c = () => {
      this.BottomItem.UpdateSlot();
      for (const i of this.ScrollView.GetScrollItemList()) {
        i.UpdateEquipped();
      }
      var t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetFirstEmptySlot();
      if (t) {
        this.GZc(t.GetIndex());
      }
      this.BottomItem.UpdateEquipTxt();
    };
    this.jmi = () => {
      var t = new TrapDefenseBuildingDevelopMainViewItem_1.TrapDefenseBuildingDevelopTypeItem();
      t.OnPointerDownCb = this.DZc;
      t.OnPointerUpCb = this.kZc;
      return t;
    };
    this.Fc_ = () => {
      var t;
      if (!this.IsInDungeon) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(365)).FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseDevelopReset();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    };
    this.RZc = () => new TrapDefenseBuildingDevelopDragDataItem_1.TrapDefenseBuildingDevelopDragDataItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UISprite]];
    this.BtnBindInfo = [[3, this.Fc_]];
  }
  async OnBeforeStartAsync() {
    var t = this.OpenParam;
    this.IsInDungeon = t.IsInDungeon;
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.SetCurRecommendLevel(t.LevelData);
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.SetIsInDungeon(this.IsInDungeon);
    this.DetailInfo = new TrapDefenseBuildingDevelopDetailItem_1.TrapDefenseBuildingDevelopDetailItem(this.IsInDungeon, this);
    await this.DetailInfo.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.BottomItem = new TrapDefenseBuildingDevelopBottomItem_1.TrapDefenseBuildingDevelopBottomItem(this.IsInDungeon);
    await this.BottomItem.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.InitTabComponent();
    if (!this.IsInDungeon) {
      this.ynd = new CommonCurrencyItem_1.CommonCurrencyItem();
      await this.ynd.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem", this.TabComponent.GetCostContent());
      this.ynd.RefreshAddButtonActive();
    }
    await this.InitDragItem();
  }
  OnStart() {
    this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.jmi);
    this.i$c();
    this.xut = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetScrollerPressTime();
    this.z9i = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetScrollerMoveDistance();
    this.Y9i = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBeforeScrollerLongPressTime();
    var t = !this.IsInDungeon && ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetCanAllReset();
    this.GetButton(3)?.RootUIComp.SetUIActive(t);
    if (this.IsInDungeon) {
      this.PZc = this.BottomItem.InitBottomDragLogic();
      this.BottomItemList = this.BottomItem.InitBottomDragItem();
      for (let t = 0; t < this.PZc.length; t++) {
        var i = this.PZc[t];
        var e = this.BottomItemList[t];
        i.SetOnDragAnimationStartFunction(e.OnDragBegin);
        i.SetOnDragAnimationEndFunction(e.OnDragEnd);
        i.SetOnOverlayCallBack(e.OnItemOverlay);
        i.SetOnUnOverlayCallBack(e.OnItemUnOverlay);
        i.SetMoveToScrollViewCallBack(e.OnScrollToScrollViewEvent);
        i.SetRemoveFromScrollViewCallBack(e.OnRemoveFromScrollViewEvent);
      }
      this.PZc.forEach(t => {
        t.SetOnClickCallBack(this.OnClickAndRefreshView);
        t.SetOnClickFailCallBack(this.OnClickFail);
        t.SetDragCheckItem(this.PZc);
        t.SetDragSuccessCallBack(this.OnDragEndCallBack);
        t.SetPointerDownCallBack(this.OnStartDragCallBack);
        t.SetOnBeginDragCall(this.OnBeginDrag);
        t.SetEndDragWhenOnScrollViewCallBack(this.Q7i);
      });
      this.AZc?.SetDragCheckItem(this.PZc);
      var s;
      var t = this.OpenParam;
      if (ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetSlotData()[t.SelectedIndex].GetSlotData() === undefined) {
        this.GZc(t.SelectedIndex);
      } else {
        s = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetFirstEmptySlot();
        this.GZc(s === undefined ? t.SelectedIndex : s.GetIndex());
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseBuildingDevelopMainViewStart, this.IsInDungeon);
  }
  OnAfterShow() {
    this.PZc.forEach(t => {
      t.SetScrollViewItem(this.GetScrollViewWithScrollbar(1).RootUIComp);
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseBuildingDevelopSelectUpdate, this.jbe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseBuildingBottomSelectUpdate, this.ZHc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseBuildingPreviewSelectUpdate, this.rmd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseOnDevelopUpdate, this.AOe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseOnDevelopResetAll, this.e$c);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseOnSlotUpdate, this.t$c);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseLevelUpPointUpdate, this.ITt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseOnBranchUpdate, this.c_d);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseBuildingDevelopSelectUpdate, this.jbe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseBuildingBottomSelectUpdate, this.ZHc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseBuildingPreviewSelectUpdate, this.rmd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseOnDevelopUpdate, this.AOe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseOnDevelopResetAll, this.e$c);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseOnSlotUpdate, this.t$c);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseLevelUpPointUpdate, this.ITt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseOnBranchUpdate, this.c_d);
  }
  OnBeforeShow() {
    this.ITt();
    this.RIc();
  }
  OnBeforeDestroy() {
    this.xZc();
    this.qZc();
    this.TabComponent = undefined;
    this.DetailInfo = undefined;
    this.BottomItem = undefined;
  }
  InitTabComponent() {
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe), this.TIc);
    this.L6e = undefined;
    this.TabComponent.SetCanChange(this.CanToggleChange);
    this.TabComponent.SetHelpButtonShowState(true);
    this.TabComponent.SetHelpButtonCallBack(() => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HELP_ID);
    });
  }
  async InitDragItem() {
    this.GetItem(7)?.SetUIActive(false);
    this.GetItem(6)?.SetUIActive(false);
    if (this.IsInDungeon) {
      this.DragItem = new TrapDefenseBuildingDevelopBottomDragItem_1.TrapDefenseBuildingDevelopNormalDragItem();
      await this.DragItem.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
      this.DragItem.SetUiActive(false);
      this.AZc = new CommonDragLogic_1.CommonDragItemLogic(this.DragItem.GetRootItem(), this.DragItem.GetDraggableComp(), -1, this.RZc);
    } else {
      this.GetItem(8)?.SetUIActive(false);
    }
  }
  T7i() {
    var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0);
    var t = Vector2D_1.Vector2D.Create(t.X, t.Y);
    t.FromUeVector2D(UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D(true)));
    var i = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetScrollerOffsetX() * ConfigManager_1.ConfigManager.TrapDefenseConfig.GetScrollerOffsetXDir();
    var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetScrollerOffsetY() * ConfigManager_1.ConfigManager.TrapDefenseConfig.GetScrollerOffsetYDir();
    var i = t.X + i;
    var t = t.Y + e;
    this.GetItem(7).SetLGUISpaceAbsolutePosition(new UE.Vector(i, t, 0));
  }
  xZc() {
    if (this.wZc !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.wZc);
      this.wZc = TickSystem_1.TickSystem.InvalidId;
    }
  }
  E7i(t) {
    this.GetItem(7)?.SetUIActive(t);
  }
  S7i(t) {
    this.GetItem(7)?.SetAlpha(t);
    this.J9i = t;
  }
  UZc(t) {
    this.GetSprite(9)?.SetFillAmount(t);
  }
  qZc() {
    if (this.LZc !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.LZc);
      this.LZc = TickSystem_1.TickSystem.InvalidId;
    }
  }
  GZc(t) {
    if (this.CurrentSelectedBottomIndex !== t) {
      this.CurrentSelectedBottomIndex = t;
      this.BottomItemList[this.CurrentSelectedBottomIndex].OnClickedItem();
      for (let t = 0; t < this.BottomItemList.length; t++) {
        this.BottomItemList[t].SetSelected(this.CurrentSelectedBottomIndex === t);
      }
    }
  }
  xKe(t = 0) {
    this.PZc.forEach(t => {
      t.ResetPosition();
      t.SetActive(true);
    });
    this.BottomItemList.forEach(t => {
      t.ResetPosition();
    });
    this.GetItem(6).SetUIActive(false);
  }
  UpdateDetail(t, i = true) {
    if (i) {
      this.PlaySequence("Switch");
    }
    this.DetailInfo.UpdateDetail(t);
  }
  async RIc() {
    var t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetTabList();
    var i = this.TabDataList.toString() !== t.toString();
    this.TabDataList = t;
    var t = this.ICi(this.TabDataList);
    await this.TabComponent.RefreshTabItemAsync(t, i);
    if (i) {
      let i = 0;
      if (this.zRu !== 0) {
        for (let t = 0; t < this.TabDataList.length; t++) {
          if (this.TabDataList[t].TabType === this.zRu) {
            i = t;
            break;
          }
        }
      }
      this.TabComponent.SelectToggleByIndex(i, true);
    } else {
      this.pqe(this.zRu);
    }
  }
  ICi(i) {
    var e = i.length;
    var s = this.TabComponent.CreateTabItemDataByLength(e);
    if (!this.IsInDungeon) {
      for (let t = 0; t < e; t++) {
        var h = i[t];
        if (h) {
          s[t].RedDotName = h.RedDot;
          s[t].NeedUnBindAllRedDot = false;
        }
      }
    }
    return s;
  }
  i$c() {
    var t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetHaveList();
    var i = [];
    var e = TrapDefenseBuildingDevelopData_1.TrapDefenseBuildingTypeData.Create(2, this.IsInDungeon, t[0]);
    if (e) {
      i.push(e);
    }
    var e = [];
    var s = TrapDefenseBuildingDevelopData_1.TrapDefenseBuildingTypeData.Create(1, this.IsInDungeon, t[1], 1);
    if (s) {
      e.push(s);
    }
    var s = TrapDefenseBuildingDevelopData_1.TrapDefenseBuildingTypeData.Create(1, this.IsInDungeon, t[2], 2);
    if (s) {
      e.push(s);
    }
    var s = TrapDefenseBuildingDevelopData_1.TrapDefenseBuildingTypeData.Create(1, this.IsInDungeon, t[4], 4);
    if (s) {
      e.push(s);
    }
    var t = [...e, ...i];
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.SetDevelopTab(t);
    this.DataListMap.set(0, t);
    this.DataListMap.set(2, i);
    this.DataListMap.set(1, e);
  }
  JHc(t) {
    this.zHc = t;
    for (const i of this.DataListMap.get(0)) {
      i.CurSelectedData = t && i.GetDataList().includes(t) ? t : undefined;
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!(t.length <= 0)) {
      var i = t[0];
      if (i === "MachineGrid") {
        if (t.length < 3) {
          return;
        }
        var e;
        var s = parseInt(t[1]);
        var s = this.ScrollView?.GetScrollItemByIndex(s);
        if (s) {
          e = s.GetRootItem();
          this.ScrollView?.LateScrollTo(e);
          return s.GetGuideUiItemAndUiItemForShowEx(t);
        }
      }
      if (i === "FirstLevelTwoGrid") {
        for (const n of this.ScrollView.GetScrollItemList()) {
          var h = n.GetGuideUiItemAndUiItemForShowEx(t);
          if (h) {
            this.ScrollView?.LateScrollTo(n.GetRootItem());
            return h;
          }
        }
      }
    }
  }
}
exports.TrapDefenseBuildingDevelopMainView = TrapDefenseBuildingDevelopMainView;
//# sourceMappingURL=TrapDefenseBuildingDevelopMainView.js.map