"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryGridItemBase = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../../../Core/Common/Info");
const Time_1 = require("../../../../../../Core/Common/Time");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiEventSystemManager_1 = require("../../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const HonamiStoryDefine_1 = require("../../../HonamiStoryDefine");
const HonamiStoryGridDynamic_1 = require("./HonamiStoryGridDynamic");
const HonamiStoryItemGridItem_1 = require("./HonamiStoryItemGridItem");
const DRAG_MIN_ANGLE = 75;
const DRAG_MAX_ANGLE = 105;
const DARG_MOVE_DISTANCE = 40;
const POINTER_DOWN_DELAY = 500;
class HonamiStoryGridItemBase extends UiPanelBase_1.UiPanelBase {
  constructor(t, i = undefined, s = undefined) {
    super();
    this.Pco = t;
    this.OnEnterGridCb = undefined;
    this.OnExitGridCb = undefined;
    this.OnDownGridCb = undefined;
    this.OnClickedGridCb = undefined;
    this.Panel = undefined;
    this.Data = undefined;
    this.qqm = undefined;
    this.Dfd = false;
    this.jdm = 0;
    this.QOm = undefined;
    this.BKs = Vector_1.Vector.Create(0, 0, 0);
    this.n5t = Vector_1.Vector.Create(0, 0, 0);
    this.pBf = Vector_1.Vector.Create(0, 0, 0);
    this.vBf = Vector_1.Vector.Create(0, 0, 0);
    this.Hdm = 0;
    this.$dm = 0;
    this.Wdm = DARG_MOVE_DISTANCE;
    this.mmm = 0;
    this.ipf = false;
    this.bzt = false;
    this.rpf = false;
    this.hSf = false;
    this.Lnm = false;
    this.Kdm = 0;
    this.Ikm = 0;
    this.ItemGridItem = undefined;
    this.SpriteBg = undefined;
    this.SweepItem = undefined;
    this.uhm = () => {
      this.DoClickedGridButton();
    };
    this.OnBtnPointDown = () => {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
      if (t === 2 || t === 1) {
        ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().CloseTips();
      }
    };
    this.ySf = () => {
      ModelManager_1.ModelManager.HonamiStoryModel.GetInteractController().OnHoverItem(true, this.GetButton(2).RootUIComp);
    };
    this.SSf = () => {
      ModelManager_1.ModelManager.HonamiStoryModel.GetInteractController().OnUnHover();
    };
    this.OnPointerEnter = () => {
      if (ModelManager_1.ModelManager.HonamiStoryModel.GetInteractController().IsSellDragging) {
        this.ItemGridItem.DoSellLogic();
      }
      if (!this.bzt && this.OnEnterGridCb) {
        this.OnEnterGridCb(this.ItemGridItem);
        ModelManager_1.ModelManager.HonamiStoryModel.GetInteractController().OnHoverItem(false, this.ItemGridItem.GetPanelForHover());
      }
    };
    this.OnPointerExit = () => {
      if (!this.bzt && this.OnExitGridCb) {
        this.OnExitGridCb();
        ModelManager_1.ModelManager.HonamiStoryModel.GetInteractController().OnUnHover();
      }
    };
    this.OnPointerDown = () => {
      if (this.OnDownGridCb) {
        this.OnDownGridCb();
      }
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
      if (t !== 0) {
        if (t === 4) {
          const i = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0);
          if (i) {
            this.pBf.DeepCopy(i.pointerPosition);
          }
        }
      } else {
        this.ItemGridItem.SetCanOpenTips(true);
        const i = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0);
        if (i) {
          this.Hdm = 0;
          this.$dm = 0;
          this.BKs.DeepCopy(i.pointerPosition);
          this.Dfd = true;
          this.jdm = Time_1.Time.Now;
          this.QOm = TimerSystem_1.TimerSystem.Delay(() => {
            AudioSystem_1.AudioSystem.PostEvent("play_ui_honamistory_backpack_drag");
          }, POINTER_DOWN_DELAY);
        }
        this.rpf = ControllerHolder_1.ControllerHolder.UiNavigationNewController.IsNavigationMousePositionDragging();
        if (this.rpf) {
          if (t = ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic()) {
            t.PickUp(this);
          }
          this.opf();
          this.Panel.OnDragBegin(i, this);
          this.Panel.OnDrag(i, this);
        }
      }
    };
    this.OnPointerCancel = () => {
      if (!this.ipf) {
        this.OnPointerUp();
      }
    };
    this.OnPointerUp = () => {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
      this.gGm();
      this.ItemGridItem.SetCanOpenTips(t !== 5 && t !== 6);
      if (this.rpf) {
        if (t = ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic()) {
          t.PutDown(this);
        }
        t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0);
        this.Panel.OnDragEnd(t, this);
        this.rpf = false;
        ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
      }
    };
    this.OnDragBegin = t => {
      this.ipf = true;
      if (this.vIf(true, t)) {
        return false;
      }
      if (this.rpf) {
        return false;
      }
      if (!this.lkm(true)) {
        return false;
      }
      this.n5t.DeepCopy(t.pointerPosition);
      var i = Time_1.Time.Now - this.jdm;
      if (i >= POINTER_DOWN_DELAY) {
        this._km();
        return false;
      }
      this.gGm();
      var s = MathUtils_1.MathUtils.GetAngleByVector2D(this.n5t.SubtractionEqual(this.BKs));
      if (Math.abs(s) < DRAG_MIN_ANGLE || Math.abs(s) > DRAG_MAX_ANGLE) {
        this._km();
        return false;
      }
      this.n5t.DeepCopy(t.pointerPosition);
      s = Vector_1.Vector.Distance(this.n5t, this.BKs);
      if (this.mmm / (s * 1000 / i) > this.Kdm) {
        this._km();
        return false;
      } else {
        return !(this.Dfd = false);
      }
    };
    this.OnDrag = t => {
      if (!this.lkm(false)) {
        return true;
      }
      this.n5t.DeepCopy(t.pointerPosition);
      var i = this.n5t.X - this.BKs.X;
      this.Hdm += i;
      var i = this.n5t.Y - this.BKs.Y;
      this.$dm += i;
      this.BKs.DeepCopy(this.n5t);
      if (!this.bzt && Math.abs(this.Hdm) + Math.abs(this.$dm) > this.Wdm) {
        if (!this.rpf) {
          this.opf();
          this.Panel.OnDragBegin(t, this);
        }
        return !(this.bzt = true);
      } else {
        return !this.bzt || (this.Panel.OnDrag(t, this), false);
      }
    };
    this.OnDragEnd = t => {
      this.vIf(false, undefined);
      this.ipf = false;
      if (this.lkm(false)) {
        this.Panel.OnDragEnd(t, this);
        AudioSystem_1.AudioSystem.PostEvent("play_ui_honamistory_backpack_equip");
        ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
        this.bzt = false;
        this.rpf = false;
        return this.hSf = false;
      } else {
        return true;
      }
    };
    this.OnClickedItem = () => {
      var t;
      var i;
      if (!this.bzt && this.OnClickedGridCb) {
        t = this.RootItem.GetUIWorldPosition();
        t = new Vector2D_1.Vector2D(t.X, t.Z);
        i = new Vector2D_1.Vector2D(this.RootItem.Width, this.RootItem.Height);
        this.OnClickedGridCb(this.ItemGridItem, t, i);
      }
    };
    if (i) {
      this.Panel = i;
    }
    if (s) {
      this.Data = s;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.uhm]];
  }
  async OnBeforeStartAsync() {
    if (this.Lnm) {
      await this.InitItemGridItem(undefined, -1);
      this.ItemGridItem.SetIsForDrag(true);
    } else if (this.Pco) {
      await this.InitItemGridItem(this.fGt, -1);
    }
  }
  OnStart() {
    var t = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World);
    var i = UE.WidgetLayoutLibrary.GetViewportScale(GlobalData_1.GlobalData.World);
    this.mmm = t.Y / i;
    this.Wdm = i * DARG_MOVE_DISTANCE;
    this.Kdm = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDragThresholdSpeed();
    this.SpriteBg = this.GetSprite(1);
    this.GetButton(2)?.OnPointDownCallBack.Bind(this.OnBtnPointDown);
    this.GetButton(2)?.OnPointEnterCallBack.Bind(this.ySf);
    this.GetButton(2)?.OnPointExitCallBack.Bind(this.SSf);
  }
  OnBeforeDestroy() {
    this.GetButton(2)?.OnPointDownCallBack.Unbind();
    this.GetButton(2)?.OnPointEnterCallBack.Unbind();
    this.GetButton(2)?.OnPointExitCallBack.Unbind();
  }
  get fGt() {
    return this.Data;
  }
  GetPanel() {
    return this.Panel;
  }
  GetEmptyPosition() {
    return this.Ikm;
  }
  GetItemGridItem() {
    return this.ItemGridItem;
  }
  RegisterPanel(t) {
    this.Panel = t;
  }
  CreateGridItem(t) {
    return new HonamiStoryItemGridItem_1.HonamiStoryItemGridItem(t);
  }
  async InitItemGridItem(t, i) {
    this.ItemGridItem = this.CreateGridItem(t);
    if (this.Panel) {
      this.ItemGridItem.SetBackpackType(this.Panel.GetBackpackType());
    }
    this.ItemGridItem.OnClickedGridTipsCb = this.OnClickedItem;
    await this.ItemGridItem.CreateThenShowByResourceIdAsync("UiItem_HonamiStoryItem", this.RootItem);
    this.ItemGridItem.SetUiActive(t !== undefined);
    this.ItemGridItem.GetRootItem().SetAsLastHierarchy();
    if (t) {
      this.InitDraggable();
      this.CheckOverflowEnable(i, true);
      i = t.GetQualityConfig();
      this.SetSpriteByPath(i.GridBg, this.GetSprite(1), false);
      this.ItemGridItem.Refresh(t, false);
    }
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().RegisterItemToGrid(this.ItemGridItem.GetRootItem(), this);
  }
  async InitSweepItem(t) {
    var i;
    if (!this.SweepItem) {
      await (i = new HonamiStoryGridDynamic_1.HonamiStoryItemSweepItem()).CreateThenShowByResourceIdAsync("UiItem_HonamiStoryItemSweep", this.RootItem);
      if (this.SweepItem) {
        i.Destroy();
      } else {
        this.SweepItem = i;
      }
    }
  }
  Refresh(t, i) {
    var s;
    this.Data = t;
    if (this.Lnm) {
      this.GetSprite(1)?.SetUIActive(false);
    }
    if (t === undefined) {
      this.Ikm = i;
      this.CheckOverflowEnable(i, false);
      this.SetSpriteByPath(HonamiStoryDefine_1.HONAMI_EMPTY_GRID_BG, this.GetSprite(1), false);
      this.ItemGridItem?.SetUiActive(false);
      this.ClearSequence();
    } else if (this.ItemGridItem) {
      this.ItemGridItem.SetUiActive(true);
      this.ItemGridItem.Refresh(t, i !== -1);
      this.CheckOverflowEnable(i, true);
      s = t.GetQualityConfig();
      this.SetSpriteByPath(s.GridBg, this.GetSprite(1), false);
      this.PlayNewlyPickedUpSweepAnimation(t);
    } else {
      this.InitItemGridItem(t, i).then(() => {
        this.PlayNewlyPickedUpSweepAnimation(t);
      });
    }
  }
  GetIncId() {
    return this.fGt?.GetIncId() ?? -1;
  }
  GetData() {
    return this.Data;
  }
  SetIsForDrag(t) {
    this.Lnm = t;
  }
  async PlaySequenceByName(t) {
    if (!this.SweepItem) {
      await this.InitSweepItem(this.Data);
    }
    this.SweepItem?.SetData(this.Data, this.Panel.GetBackpackType());
    this.SweepItem?.PlaySequenceByNamePurely(t);
  }
  PlayPosChangeSweepAnimation() {
    this.PlaySequenceByName("Sweep_In");
  }
  PlayNewlyPickedUpSweepAnimation(t) {
    if (t.GetNewInBackpack()) {
      this.PlaySequenceByName("Sweep_Tips");
      t.SetNewInBackpack(false);
    }
  }
  ClearSequence() {
    this.SweepItem?.ClearSequence();
  }
  CheckOverflowEnable(t, i) {
    if (!this.Panel) {
      return false;
    }
    var s = this.Panel.GetBackpackType() === 0;
    if (t === -1 || !s) {
      return false;
    }
    const e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(1);
    if (!i) {
      if (t < e.GetCapacity()) {
        this.qqm?.SetUiActive(false);
        return false;
      } else {
        if (this.qqm && !this.qqm.InAsyncLoading()) {
          this.qqm.SetUiActive(true);
        } else {
          this.qqm = new UiPanelBase_1.UiPanelBase();
          this.qqm.CreateThenShowByResourceIdAsync("UiItem_HonamiStoryItemTagEmptyOverflow", this.RootItem).then(() => {
            var t;
            if (this.ItemGridItem !== undefined && this.ItemGridItem.IsUiActiveInHierarchy()) {
              this.qqm?.SetUiActive(false);
            } else {
              t = e.GetCapacity();
              this.qqm?.SetUiActive(this.Ikm >= t);
            }
          });
        }
        return true;
      }
    }
    this.qqm?.SetUiActive(false);
    s = e.GetHeightCount(false);
    i = this.fGt.GetRow() + this.fGt.GetGridHeight() > s;
    this.ItemGridItem?.SetOverFlowEnable(i);
    return i;
  }
  DoClickedGridButton() {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
    if (t !== 0 && (t !== 2 && t !== 1 || ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().CloseTips(), t === 3)) {
      ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
    }
  }
  CancelItemToggleSelect() {
    this.ItemGridItem?.CancelToggleSelect();
  }
  lkm(t) {
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
    if (t) {
      return this.fGt !== undefined && (i === 0 || i === 1 || i === 2);
    } else {
      return this.Dfd && (i === 0 || i === 6 || i === 5);
    }
  }
  vIf(t, i) {
    if (ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState() !== 4) {
      return false;
    }
    var s = ModelManager_1.ModelManager.HonamiStoryModel.GetInteractController();
    if (!t) {
      return !(s.IsSellDragging = false);
    }
    if (this.rpf) {
      s.IsSellDragging = true;
      this.ItemGridItem.DoSellLogic();
      return true;
    }
    this.vBf.DeepCopy(i.pointerPosition);
    t = MathUtils_1.MathUtils.GetAngleByVector2D(this.vBf.SubtractionEqual(this.pBf));
    return (Math.abs(t) < DRAG_MIN_ANGLE || Math.abs(t) > DRAG_MAX_ANGLE) && (s.IsSellDragging = true, this.ItemGridItem.DoSellLogic(), true);
  }
  _km() {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
    if (t === 1 || t === 2) {
      ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().CloseTips();
    }
  }
  PlayMoveItemSeq() {
    if (this.Lnm) {
      this.ItemGridItem.PlayMoveItemSeq();
    }
  }
  gGm() {
    if (this.QOm && this.QOm.Valid()) {
      TimerSystem_1.TimerSystem.Remove(this.QOm);
    }
    this.QOm = undefined;
  }
  MarkUseCancel() {
    this.hSf = true;
  }
  GetIsUseCancel() {
    return this.hSf;
  }
  TriggerOnEnterGridCb() {
    if (Info_1.Info.IsInGamepad()) {
      this.OnEnterGridCb?.(this.ItemGridItem);
    }
  }
  InitDraggable() {
    var t = this.ItemGridItem.DraggableComponent;
    t.OnPointEnterCallBack.Bind(this.OnPointerEnter);
    t.OnPointExitCallBack.Bind(this.OnPointerExit);
    t.OnPointDownCallBack.Bind(this.OnPointerDown);
    t.OnPointCancelCallBack.Bind(this.OnPointerCancel);
    t.OnPointUpCallBack.Bind(this.OnPointerUp);
    t.OnPointerBeginDragCallBack.Bind(this.OnDragBegin);
    t.OnPointerDragCallBack.Bind(this.OnDrag);
    t.OnPointerEndDragCallBack.Bind(this.OnDragEnd);
  }
  opf() {
    if (this.GetData().GetItemType() === 1) {
      ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(6);
    } else {
      ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(5);
    }
  }
  GetBtnItem() {
    return this.GetButton(2)?.GetRootComponent();
  }
}
exports.HonamiStoryGridItemBase = HonamiStoryGridItemBase;
//# sourceMappingURL=HonamiStoryGridItemBase.js.map