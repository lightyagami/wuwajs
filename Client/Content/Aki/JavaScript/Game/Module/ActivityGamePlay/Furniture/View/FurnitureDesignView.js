"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureDesignView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiTimeDilation_1 = require("../../../../Ui/Base/UiTimeDilation");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiFloatTween_1 = require("../../../Util/Lgui/LguiFloatTween");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const FurnitureCameraComponent_1 = require("../Component/FurnitureCameraComponent");
const FurnitureAreaData_1 = require("../Data/FurnitureAreaData");
const FurnitureDefine_1 = require("../FurnitureDefine");
const FurnitureAreaCameraSelectionItem_1 = require("./FurnitureAreaCameraSelectionItem");
const FurnitureAreaPointItem_1 = require("./FurnitureAreaPointItem");
const FurnitureScrollItem_1 = require("./FurnitureScrollItem");
const FurnitureSlotScrollItem_1 = require("./FurnitureSlotScrollItem");
class FurnitureDesignView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this._Ui = 0;
    this.uA_ = [];
    this.h6t = -1;
    this.hKf = 0;
    this.lKf = -1;
    this._Kf = 0;
    this.uKf = -1;
    this.cKf = 0;
    this.dKf = -1;
    this.mKf = 0;
    this.TOg = 0;
    this.X4g = 0;
    this.fKf = undefined;
    this.o1g = undefined;
    this.ngi = [];
    this.gKf = [];
    this.CKf = [];
    this.pKf = new Map();
    this.tvg = false;
    this.MOg = 0;
    this.nFg = false;
    this.TVg = false;
    this.lqe = undefined;
    this.Y4g = undefined;
    this.vKf = undefined;
    this.yKf = undefined;
    this.SKf = undefined;
    this.$pt = undefined;
    this.AtmosphereTween = undefined;
    this.J4g = new FurnitureCameraComponent_1.FurnitureCameraComponent();
    this.mBg = () => {
      var t = this.yKf?.GetItemByIndex(0);
      if (t) {
        this.yKf?.LateScrollTo(t);
      }
    };
    this.Jvt = () => {
      if (this.o1g && this.o1g.size !== 0) {
        const e = [];
        const s = [];
        for (var [t, i] of this.o1g) {
          t = ModelManager_1.ModelManager.FurnitureModel.GetAreaData(t);
          if (t && !t.Compare(i)) {
            e.push(t);
            s.push(i);
          }
        }
        if (e.length === 0) {
          this.CloseMe();
        } else {
          this.i3g(433, () => {
            this.c9g(false);
            for (let t = 0; t < e.length; t++) {
              ControllerHolder_1.ControllerHolder.FurnitureController.ChangeAreaFurnitureSceneItemsAsync(s[t], e[t]);
            }
            this.CloseMe();
          }, () => {
            this.ivg().then(() => {
              this.CloseMe();
            });
          });
        }
      } else {
        this.CloseMe();
      }
    };
    this.z4g = () => {
      var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfig(this.hKf);
      var i = t.CameraList;
      if (this.X4g === 0) {
        this.X4g = i.length - 1;
      } else {
        this.X4g--;
      }
      this.J4g.EnterAreaCamera(t.CameraList[this.X4g]);
      this.RefreshAreaCameraSelectionItem();
    };
    this.Z4g = () => {
      var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfig(this.hKf);
      var i = t.CameraList;
      if (this.X4g === i.length - 1) {
        this.X4g = 0;
      } else {
        this.X4g++;
      }
      this.J4g.EnterAreaCamera(t.CameraList[this.X4g]);
      this.RefreshAreaCameraSelectionItem();
    };
    this.Pwe = () => {
      let t = this.h6t + 1;
      if (t >= this.uA_.length) {
        t = 0;
      }
      this.TrySwitchArea(t);
    };
    this.wwe = () => {
      let t = this.h6t - 1;
      if (t < 0) {
        t = this.uA_.length - 1;
      }
      this.TrySwitchArea(t);
    };
    this.MKf = () => {
      this.ivg().then(t => {
        this.RefreshSaveBtn();
        this.bOg();
        for (const e of this.gKf) {
          e.IsCheck = e.FurnitureConfig.Id === this.TOg;
        }
        var i = this.yKf?.GetScrollItemList();
        if (i) {
          for (const s of i) {
            s.RefreshCheckItem();
          }
        }
      });
    };
    this.ivg = async () => !!this.fKf && (this.c9g(true), ControllerHolder_1.ControllerHolder.FurnitureController.FurnitureSaveRequestAsync(this.fKf));
    this.h9g = async (t, i) => {
      var e = ControllerHolder_1.ControllerHolder.BlackScreenController;
      await e.AddBlackScreenAsync("None", "SaveAndTeleport");
      if (t) {
        await this.ivg();
      }
      var t = ModelManager_1.ModelManager.FurnitureModel.GetAreaData(this.hKf);
      if (i && this.fKf && t) {
        await ControllerHolder_1.ControllerHolder.FurnitureController.ChangeAreaFurnitureSceneItemsAsync(this.fKf, t);
      }
      await ControllerHolder_1.ControllerHolder.FurnitureController.TeleportToAreaAsync(this.hKf);
      await this.P7g();
      e.RemoveBlackScreen("Close", "SaveAndTeleport");
    };
    this.P7g = async () => {
      const i = new CustomPromise_1.CustomPromise();
      UiManager_1.UiManager.ResetToBattleView(t => {
        i.SetResult(t);
      });
      return i.Promise;
    };
    this.EKf = () => {
      this.SelectAreaCameraToggle();
    };
    this.s1g = () => {
      var t;
      if (this.fKf) {
        t = {
          AreaData: this.fKf,
          OnApplyDelegate: this.a1g
        };
        UiManager_1.UiManager.OpenView("FurniturePresetView", t);
      }
    };
    this.sFg = () => false;
    this.aFg = () => false;
    this.hFg = () => false;
    this.lFg = () => {
      this.TVg = true;
      this.GetButton(23).RootUIComp.SetUIActive(true);
      this.GetExtendToggle(22)?.RootUIComp.SetUIActive(false);
      this.GetExtendToggle(21)?.RootUIComp.SetUIActive(false);
      this.RefreshAreaCameraSelectionItem();
    };
    this.Z$f = () => {
      this.TVg = false;
      this.GetButton(23).RootUIComp.SetUIActive(false);
      this.GetExtendToggle(22)?.RootUIComp.SetUIActive(true);
      this.GetExtendToggle(21)?.RootUIComp.SetUIActive(true);
      this.RefreshAreaCameraSelectionItem();
    };
    this._Fg = () => {
      this.CancelAreaCameraToggle();
    };
    this.o3g = () => {
      var t;
      if (this.fKf && (t = ModelManager_1.ModelManager.FurnitureModel.GetAreaData(this.hKf))) {
        if (!t.Compare(this.fKf)) {
          this.i3g(451, () => {
            this.h9g(false, true);
          }, () => {
            this.h9g(true, false);
          });
        } else {
          this.i3g(460, undefined, () => {
            this.h9g(false, false);
          });
        }
      }
    };
    this.a1g = t => {
      this.UKf();
      this.BKf();
      this.vKf?.RefreshByData(this.ngi);
      this.RefreshFurnitureScrollItemLayout();
      this.RefreshAtmosphereText(true);
      this.RefreshSaveBtn();
      if (this.fKf) {
        this.fKf.UsePreset = true;
      }
      var i = {
        AreaId: this.fKf.GetAreaId(),
        OperationType: 2
      };
      ControllerHolder_1.ControllerHolder.FurnitureController.FurnitureDesignReport(i);
    };
    this.IKf = t => {
      this.SelectSlot(t);
    };
    this.TKf = t => {
      this.SelectFurniture(t);
    };
    this.bKf = t => {
      this.SelectFurniture(-1);
    };
    this.yct = t => {
      if (t === "Hide") {
        this.GetItem(17).SetUIActive(false);
      }
    };
    this.RKf = t => this.LKf(t) === 0;
    this.wKf = t => {
      var i = this.LKf(t);
      if (i !== 0) {
        switch (i) {
          case 2:
            this.w6g(t);
            break;
          case 3:
            this.P6g(t);
            break;
          case 4:
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("DIY_RemoveBannedTips");
        }
      }
    };
    this.Y2g = t => {
      var i = this.gKf[t];
      if (i && i.RedDotShowState) {
        ControllerHolder_1.ControllerHolder.FurnitureController.SetFurnitureDesignItemRedDotAsRead(i.FurnitureConfig.Id);
        i.RedDotShowState = false;
        if (i = this.yKf?.GetScrollItemByIndex(t)) {
          i.RefreshRedDot();
        }
        this.RefreshAllSlotRedDot();
      }
    };
    this.rvg = i => {
      UiManager_1.UiManager.CloseView("FurnitureGetWayView", t => {
        if (t) {
          ControllerHolder_1.ControllerHolder.FurnitureController.OpenFurnitureShopViewAsync(i);
        }
      });
    };
    this.PKf = () => {
      var t = new FurnitureSlotScrollItem_1.FurnitureSlotScrollItem();
      t.OnItemSelected = this.IKf;
      return t;
    };
    this.AKf = () => {
      var t = new FurnitureScrollItem_1.FurnitureScrollItem();
      t.OnItemSelectedDelegate = this.TKf;
      t.OnItemUnSelectedDelegate = this.bKf;
      t.CanToggleChangedDelegate = this.RKf;
      t.OnPointUpCallBackDelegate = this.wKf;
      t.OnPointerEnterDelegate = this.Y2g;
      return t;
    };
    this.DKf = () => new FurnitureAreaPointItem_1.FurnitureAreaPointItem();
    this.EOg = t => {
      t = Math.floor(t);
      this.GetArtText(18).SetText("" + t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UILayoutBase], [7, UE.UIItem], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIScrollViewWithScrollbarComponent], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIExtendToggle], [17, UE.UIItem], [18, UE.UIArtText], [19, UE.UIArtText], [20, UE.UIButtonComponent], [21, UE.UIExtendToggle], [22, UE.UIExtendToggle], [23, UE.UIButtonComponent], [24, UE.UIButtonComponent], [25, UE.UIItem]];
    this.BtnBindInfo = [[4, this.Pwe], [3, this.wwe], [11, this.MKf], [20, this.s1g], [23, this.Z$f], [24, this.o3g]];
  }
  async OnBeforeStartAsync() {
    this.o1g = ControllerHolder_1.ControllerHolder.FurnitureController.StartEditArea();
    var t = this.OpenParam;
    this._Ui = t.MapId;
    this.uA_ = Array.from(this.o1g?.keys() ?? []);
    this.uA_.sort((t, i) => t - i);
    this.hKf = t.ToSelectAreaId;
    this.h6t = this.uA_.indexOf(this.hKf);
    this.lKf = 0;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.lqe.SetCloseCallBack(this.Jvt);
    this.Y4g = new FurnitureAreaCameraSelectionItem_1.FurnitureAreaCameraSelectionItem();
    this.Y4g.PreBtnClickDelegate = this.z4g;
    this.Y4g.NextBtnClickDelegate = this.Z4g;
    this.vKf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), this.PKf, this.GetItem(10).GetOwner());
    this.yKf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(12), this.AKf);
    this.SKf = new GenericLayout_1.GenericLayout(this.GetLayoutBase(6), this.DKf);
    this.fKf = this.o1g?.get(this.hKf);
    var t = ControllerHolder_1.ControllerHolder.FurnitureController;
    await Promise.all([this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), t.LoadAllFurnitureSceneItemByMapIdAsync(this._Ui, t.FurnitureEntityFilter), this.Y4g.CreateThenShowByActorAsync(this.GetItem(25).GetOwner())]);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.$pt.BindSequenceCloseEvent(this.yct);
    this.AtmosphereTween = new LguiFloatTween_1.LguiFloatTween();
    this.AtmosphereTween.SetCurrentEase(12);
    this.AtmosphereTween.BindUpdateTween(this.EOg);
    var t = this.GetExtendToggle(16);
    t.CanExecuteChange.Bind(this.sFg);
    t.OnPointUpCallBack.Bind(this.EKf);
    var t = this.GetExtendToggle(22);
    t.CanExecuteChange.Bind(this.aFg);
    t.OnPointUpCallBack.Bind(this._Fg);
    var t = this.GetExtendToggle(21);
    t.CanExecuteChange.Bind(this.hFg);
    t.OnPointUpCallBack.Bind(this.lFg);
    this.GetArtText(19).SetUIActive(false);
    var t = ModelManager_1.ModelManager.FurnitureModel.FurnitureEntityVisibleManager;
    t.DisabledAllEntities();
    t.LockFurnitureEntity();
  }
  async OnBeforeShowAsyncImplementImplement() {
    var t = this.lKf;
    this.ResetSlotSelected();
    this.UKf();
    this.xKf(t);
    this.BKf();
    this.kKf();
    this.X4g = 0;
    await Promise.all([this.vKf?.RefreshByDataAsync(this.ngi), this.yKf?.RefreshByDataAsync(this.gKf), this.SKf?.RefreshByDataAsync(this.CKf)]);
    this.RefreshFurnitureEmptyItem();
    this.RefreshAtmosphereText();
    this.RefreshAreaNameText();
    this.RefreshPresetBtn();
    this.RefreshSaveBtn();
    this.mBg();
    this.RefreshSwitchAreaBtn();
    this.RefreshAreaCameraSelectionItem();
    var t = ControllerHolder_1.ControllerHolder.BlackScreenController;
    var i = "OnFurnitureDesignViewBeforeShow";
    await t.AddBlackScreenAsync("None", i);
    this.EnterCurSelectedSceneSlotCamera(false);
    this.PauseTimeDilation();
    t.RemoveBlackScreen("Close", i);
  }
  OnBeforeHide() {
    this.ResumeTimeDilation();
  }
  OnBeforeDestroy() {
    var t = ModelManager_1.ModelManager.FurnitureModel.FurnitureEntityVisibleManager;
    t.UnlockFurnitureEntity();
    t.EnabledAllEntities();
    var t = ControllerHolder_1.ControllerHolder.FurnitureController;
    t.DoUnloadNeedUnloadedSceneItem();
    t.UnloadAllServerFurnitureSceneItem();
    t.EndEditArea();
    ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitFixSceneSubCamera();
    this.AtmosphereTween.Destroy();
  }
  PauseTimeDilation() {
    UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag("FurnitureDesignView");
  }
  ResumeTimeDilation() {
    UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag("FurnitureDesignView");
  }
  xKf(t) {
    var i;
    return !(t < 0) && !(t >= this.ngi.length) && this.lKf !== t && !(this.lKf !== -1 && (i = this.ngi[this.lKf]) && (i.IsSelected = false), this.lKf = t, (i = this.ngi[t]) && (i.IsSelected = true, this._Kf = i.SceneSlotEntityId, this.uKf = i.SubSlotIndex, this.cKf = i.SlotType, this.mKf = i.PlacedFurnitureId), 0);
  }
  qKf(t) {
    var i;
    return !(t >= this.gKf.length) && this.dKf !== t && !(this.dKf !== -1 && (i = this.gKf[this.dKf]) && (i.IsSelected = false), (this.dKf = t) === -1 ? this.mKf = 0 : ((i = this.gKf[t]) && (i.IsSelected = true, this.mKf = i.FurnitureConfig.Id), 0));
  }
  UKf() {
    this.ngi.length = 0;
    var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfig(this.hKf);
    if (t) {
      var i = this.fKf;
      if (i) {
        for (const e of t.SlotEntityIds) {
          this.OKf(e, i);
          this.GKf(e, i);
        }
        this.FKf();
        this.NKf();
        this.VKf();
        this.HKf();
      }
    }
  }
  BKf() {
    if (this.fKf) {
      this.gKf.length = 0;
      var t = this.ngi[this.lKf];
      if (t) {
        this.bOg();
        for (const i of ModelManager_1.ModelManager.FurnitureModel.GetFurnitureConfigListBySlotInfo(this.fKf, t.SceneSlotEntityId, t.SubSlotIndex) ?? []) {
          this.gKf.push(this.jKf(i));
        }
        this.$Kf();
        this.dKf = this.gKf.findIndex(t => t.FurnitureConfig.Id === this.mKf);
      }
    }
  }
  kKf() {
    this.CKf.length = 0;
    for (const t of this.uA_) {
      this.CKf.push(t === this.hKf);
    }
  }
  $Kf() {
    this.gKf.sort((t, i) => {
      var e;
      var s;
      if (t.IsSelected !== i.IsSelected) {
        if (t.IsSelected) {
          return -1;
        } else {
          return 1;
        }
      } else if (t.IsLock !== i.IsLock) {
        if (t.IsLock) {
          return 1;
        } else {
          return -1;
        }
      } else if ((e = t.FurnitureConfig.LimitCount > 0) != (s = i.FurnitureConfig.LimitCount > 0)) {
        if ((!e || t.LeftCount !== 0) && (s && i.LeftCount === 0 || e)) {
          return -1;
        } else {
          return 1;
        }
      } else if (e && t.LeftCount !== i.LeftCount) {
        return i.LeftCount - t.LeftCount;
      } else if ((s = i.FurnitureConfig.QualityId - t.FurnitureConfig.QualityId) != 0) {
        return s;
      } else {
        return i.FurnitureConfig.Id - t.FurnitureConfig.Id;
      }
    });
  }
  jKf(t) {
    var i = ModelManager_1.ModelManager.FurnitureModel;
    var e = t.Id;
    var t = {
      FurnitureConfig: t,
      RedDotShowState: ModelManager_1.ModelManager.FurnitureModel.CheckFurnitureDesignItemRedDotByConfig(t),
      IsSelected: e === this.mKf,
      LeftCount: 0,
      IsLock: !i.GetIsFurnitureUnlockById(e),
      IsCheck: e === this.TOg
    };
    this.kfg(t);
    return t;
  }
  kfg(t) {
    var i = t.FurnitureConfig.LimitCount;
    var e = t.FurnitureConfig.Id;
    let s = 0;
    if (i > 0) {
      let t = 0;
      for (const r of this.o1g.values()) {
        t += r.GetFurnitureUseCount(e);
      }
      s = i - t;
    }
    t.LeftCount = s;
  }
  bOg() {
    var t = ModelManager_1.ModelManager.FurnitureModel.GetAreaData(this.hKf);
    if (t &&= t.GetSlotData(this._Kf, this.uKf)) {
      this.TOg = t.GetPlacedFurnitureConfigId();
    }
  }
  NKf() {
    this.pKf.clear();
    for (const i of this.ngi) {
      var t = this.QKf(i.TagId);
      i.TagIndex = t;
      i.ShowTagIndex = t > 1;
    }
  }
  VKf() {
    this.lKf = this.ngi.findIndex(t => this.KKf(t));
    this.ngi.forEach((t, i) => {
      t.IsSelected = i === this.lKf;
    });
  }
  HKf() {
    var i = this.ngi.length;
    for (let t = 0; t < i; t++) {
      this.ngi[t].LineShowState = t !== i - 1;
    }
  }
  OKf(t, i) {
    var e;
    var s = ModelManager_1.ModelManager.FurnitureModel.GetSceneSlotEntitySlotInfo(this._Ui, t);
    if (s) {
      e = i.GetSceneSlotData(t);
      s = s.FurnitureTag;
      e = {
        SceneSlotEntityId: t,
        PlacedFurnitureId: e?.GetPlacedFurnitureConfigId() ?? 0,
        SubSlotIndex: -1,
        SlotType: 0,
        TagId: s,
        TagIndex: 0,
        ShowTagIndex: false,
        IsSelected: false,
        LineShowState: false,
        RedDotShowState: ModelManager_1.ModelManager.FurnitureModel.CheckFurnitureSlotRedDot(i, t, -1)
      };
      this.ngi.push(e);
    }
  }
  GKf(i, e) {
    var s = e.GetSceneSlotData(i);
    if (s?.GetPlacedFurnitureConfigId()) {
      var r = s.GetSubSlotDataListLength();
      if (!(r <= 0)) {
        for (let t = 0; t < r; t++) {
          var h;
          var a;
          var o = s.GetSubSlotData(t);
          if (o) {
            h = o.GetSlotTagId();
            a = this.QKf(h);
            o = {
              SceneSlotEntityId: i,
              PlacedFurnitureId: o.GetPlacedFurnitureConfigId(),
              SubSlotIndex: t,
              SlotType: 1,
              TagId: h,
              TagIndex: a,
              ShowTagIndex: false,
              IsSelected: false,
              LineShowState: false,
              RedDotShowState: ModelManager_1.ModelManager.FurnitureModel.CheckFurnitureSlotRedDot(e, i, t)
            };
            this.ngi.push(o);
          }
        }
      }
    }
  }
  FKf() {
    this.ngi.sort((t, i) => t.SceneSlotEntityId !== i.SceneSlotEntityId ? t.SceneSlotEntityId - i.SceneSlotEntityId : t.SubSlotIndex - i.SubSlotIndex);
  }
  QKf(t) {
    var i = (this.pKf.get(t) ?? 0) + 1;
    this.pKf.set(t, i);
    return i;
  }
  KKf(t) {
    return t.SlotType === this.cKf && t.SceneSlotEntityId === this._Kf && t.SubSlotIndex === this.uKf;
  }
  SelectSlot(t) {
    var i;
    var e = this.lKf;
    if (this.xKf(t)) {
      t = this.lKf;
      if (i = this.vKf?.GetGenericLayout()) {
        i.GetLayoutItemByIndex(e)?.RefreshItemToggle();
        i.GetLayoutItemByIndex(t)?.RefreshItemToggle();
      }
      this.BKf();
      this.RefreshFurnitureScrollItemLayout(true);
      this.EnterCurSelectedSceneSlotCamera();
    }
  }
  SelectFurniture(t) {
    var i;
    var e;
    var s;
    var r;
    var h = this.dKf;
    var a = this.gKf[this.dKf];
    if (this.qKf(t) && (t = this.dKf, i = this.gKf[this.dKf], e = this.fKf)) {
      s = ControllerHolder_1.ControllerHolder.FurnitureController;
      r = {
        AreaSlotContext: {
          AreaData: e,
          SlotContext: e = {
            SlotEntityId: this._Kf,
            SubSlotIndex: this.uKf
          }
        },
        FurnitureId: this.mKf,
        KeepSubFurniture: true
      };
      s.PlaceFurnitureAsync(r);
      if (this.cKf === 0) {
        this.UKf();
        this.vKf?.RefreshByData(this.ngi);
      } else if (s = this.ngi[this.lKf]) {
        s.PlacedFurnitureId = this.mKf;
      }
      if (r = this.yKf?.GetGenericLayout()) {
        this.qfg(h, r);
        this.qfg(t, r);
      }
      this.RefreshAtmosphereText(true);
      this.RefreshSaveBtn();
      s = this.fKf.UsePreset ? 3 : 1;
      h = a?.FurnitureConfig.Id ?? 0;
      t = i?.FurnitureConfig.Id ?? 0;
      r = {
        AreaId: this.fKf.GetAreaId(),
        OperationType: s,
        SlotContext: e,
        OldFurnitureId: h,
        NewFurnitureId: t
      };
      ControllerHolder_1.ControllerHolder.FurnitureController.FurnitureDesignReport(r);
    }
  }
  qfg(t, i) {
    var e;
    var s;
    if (t !== -1 && (e = this.gKf[t]) && (this.kfg(e), s = i.GetLayoutItemByIndex(t))) {
      s.RefreshCount();
      s.RefreshItemToggle();
    }
  }
  RefreshSwitchAreaBtn() {
    var t = this.uA_.length > 1;
    this.GetButton(3).RootUIComp.SetUIActive(t);
    this.GetButton(4).RootUIComp.SetUIActive(t);
  }
  ResetSlotSelected() {
    this.lKf = -1;
    this._Kf = 0;
    this.uKf = -1;
    this.cKf = 0;
    this.dKf = -1;
    this.mKf = 0;
    this.gKf.length = 0;
  }
  i3g(t, i, e) {
    t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(t);
    t.IsEscViewTriggerCallBack = false;
    t.FunctionMap.set(1, i);
    t.FunctionMap.set(2, e);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
  }
  TrySwitchArea(i, e = 0, s = -1, r) {
    const h = this.fKf;
    if (h) {
      const a = ModelManager_1.ModelManager.FurnitureModel.GetAreaData(this.hKf);
      if (a) {
        if (a?.Compare(h)) {
          this.SwitchArea(i, e, s);
          r?.();
        } else {
          this.i3g(443, () => {
            this.c9g(false);
            ControllerHolder_1.ControllerHolder.FurnitureController.ChangeAreaFurnitureSceneItemsAsync(h, a);
            var t = new FurnitureAreaData_1.FurnitureAreaData();
            t.DeepCopy(a);
            this.o1g?.set(a.GetAreaId(), t);
            this.SwitchArea(i, e, s);
            r?.();
          }, () => {
            this.ivg();
            this.SwitchArea(i, e, s);
            r?.();
          });
        }
      }
    }
  }
  SwitchArea(t, i = 0, e = -1) {
    var s = new UiAsyncTask_1.UiAsyncTask("SwitchArea", async () => this.SwitchAreaAsync(t, i, e));
    this.RunAsyncTask(s);
  }
  async SwitchAreaAsync(i, e = 0, s = -1) {
    if (!(i < 0) && !(i >= this.uA_.length)) {
      var r = ControllerHolder_1.ControllerHolder.BlackScreenController;
      await r.AddBlackScreenAsync("None", "SwitchArea");
      this.h6t = i;
      this.hKf = this.uA_[i];
      this.h6t = i;
      this.fKf = this.o1g?.get(this.hKf) ?? undefined;
      this.ResetSlotSelected();
      this.UKf();
      let t = 0;
      if (e > 0) {
        t = this.ngi.findIndex(t => t.SceneSlotEntityId === e && t.SubSlotIndex === s);
      }
      this.xKf(t);
      this.BKf();
      this.kKf();
      this.X4g = 0;
      this.vKf?.RefreshByData(this.ngi);
      this.RefreshFurnitureScrollItemLayout(true);
      this.SKf?.RefreshByData(this.CKf);
      this.RefreshAtmosphereText();
      this.RefreshAreaNameText();
      this.RefreshSaveBtn();
      this.RefreshAreaCameraSelectionItem();
      this.EnterCurSelectedSceneSlotCamera(false);
      r.RemoveBlackScreen("Close", "SwitchArea");
      this.$pt?.PlayOrReplaySequenceByName("Switch");
    }
  }
  SelectAreaCameraToggle() {
    this.nFg = true;
    this.GetExtendToggle(21)?.RootUIComp.SetUIActive(true);
    this.GetExtendToggle(16)?.RootUIComp.SetUIActive(false);
    this.GetExtendToggle(22)?.RootUIComp.SetUIActive(true);
    var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfig(this.hKf);
    this.J4g.EnterAreaCamera(t.CameraList[this.X4g]);
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DIY_CamEnterSuccess_Tip");
    this.$pt?.PlayOrReplaySequenceByName("Hide", true);
    this.RefreshAreaCameraSelectionItem();
  }
  CancelAreaCameraToggle() {
    this.nFg = false;
    this.GetExtendToggle(21)?.RootUIComp.SetUIActive(false);
    this.GetExtendToggle(16)?.RootUIComp.SetUIActive(true);
    this.GetExtendToggle(22)?.RootUIComp.SetUIActive(false);
    this.EnterCurSelectedSceneSlotCamera();
    this.GetItem(17).SetUIActive(true);
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DIY_CamBackSuccess_Tip");
    this.$pt?.PlayOrReplaySequenceByName("Show");
    this.RefreshAreaCameraSelectionItem();
  }
  EnterCurSelectedSceneSlotCamera(i = true) {
    if (this._Kf !== 0) {
      let t = undefined;
      if (!i) {
        t = {
          FadeInTime: 0,
          FadeInExp: 0
        };
      }
      i = {
        SlotEntityId: this._Kf,
        SubSlotIndex: this.uKf
      };
      this.J4g.EnterSlotCamera(i, t);
    }
  }
  RefreshFurnitureScrollItemLayout(t = false) {
    this.yKf?.RefreshByData(this.gKf, this.mBg, t);
    this.RefreshFurnitureEmptyItem();
  }
  RefreshAtmosphereText(t = false) {
    var i;
    if (this.fKf) {
      i = this.fKf.GetAtmosphere();
      if (t && this.MOg !== i) {
        this.GetArtText(18).SetText("" + this.MOg);
        this.AtmosphereTween.PlayTween(this.MOg, i, FurnitureDefine_1.FURNITURE_ATMOSPHERE_TWEEN_DURATION);
      } else {
        this.AtmosphereTween.KillTween();
        this.GetArtText(18).SetText("" + i);
      }
      this.MOg = i;
    }
  }
  RefreshAreaNameText() {
    var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfig(this.hKf);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.AreaName);
  }
  RefreshFurnitureEmptyItem() {
    this.GetItem(15).SetUIActive(this.gKf.length === 0);
  }
  RefreshSaveBtn() {
    var t;
    if (this.fKf && (t = ModelManager_1.ModelManager.FurnitureModel.GetAreaData(this.hKf))) {
      t = !t.Compare(this.fKf);
      this.GetButton(11).SetSelfInteractive(t);
    }
  }
  RefreshAreaCameraSelectionItem() {
    var t = this.nFg && !this.TVg;
    this.Y4g?.SetUiActive(t);
    if (t) {
      t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfig(this.hKf).CameraList[this.X4g];
      t = ConfigManager_1.ConfigManager.FurnitureConfig.GetAreaCameraConfig(t);
      this.Y4g?.Refresh(t.CameraName);
    }
  }
  RefreshPresetBtn() {
    var t = ModelManager_1.ModelManager.FurnitureModel.GetFurniturePresetFunctionIsUnlocked();
    this.GetButton(20).RootUIComp.SetUIActive(t);
  }
  RefreshAllSlotRedDot() {
    if (this.fKf) {
      for (const i of this.ngi) {
        i.RedDotShowState = ModelManager_1.ModelManager.FurnitureModel.CheckFurnitureSlotRedDot(this.fKf, i.SceneSlotEntityId, i.SubSlotIndex);
      }
      var t = this.vKf?.GetScrollItemList();
      if (t) {
        for (const e of t) {
          e.RefreshRedDot();
        }
      }
    }
  }
  LKf(t) {
    var i;
    var t = this.gKf[t];
    if (t) {
      if (t.IsLock) {
        return 2;
      } else {
        i = t.FurnitureConfig.LimitCount;
        if (!t.IsSelected && i > 0 && t.LeftCount <= 0) {
          return 3;
        } else if (!((i = t.FurnitureConfig.TagId) <= 0) && (i = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureTagConfig(i))) {
          if (!i.CanUnPlace && t.IsSelected) {
            return 4;
          } else {
            return 0;
          }
        } else {
          return 1;
        }
      }
    } else {
      return 1;
    }
  }
  w6g(t) {
    t = this.gKf[t]?.FurnitureConfig;
    if (t) {
      if (t.SourceType === 1) {
        this.A6g(t);
      } else if (t.SourceType === 2) {
        this.D6g(t);
      } else if (t.SourceType === 3) {
        this.j9g(t);
      }
    }
  }
  A6g(e) {
    const s = e.GetWayId;
    if (!(s <= 0)) {
      var r = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(s);
      if (r) {
        let t = "";
        let i = undefined;
        if (ModelManager_1.ModelManager.FurnitureModel.GetFurnitureShopFunctionIsUnlocked()) {
          h = r.IfCanBuy();
          t = h ? "" : r.GetConditionTextId();
          i = () => {
            this.rvg(s);
          };
        } else {
          t = "DIY_Furniture_Obtain_AtmoLockedState";
        }
        var h = {
          FurnitureConfig: e,
          LockReason: 2,
          LockReasonTextId: t,
          JumpFunction: i
        };
        UiManager_1.UiManager.OpenView("FurnitureGetWayView", h);
      }
    }
  }
  D6g(t) {
    var i = {
      FurnitureConfig: t,
      LockReason: 3,
      LockReasonTextId: "",
      JumpFunction: () => {
        this.ovg(t);
      }
    };
    UiManager_1.UiManager.OpenView("FurnitureGetWayView", i);
  }
  j9g(t) {
    t = {
      FurnitureConfig: t,
      LockReason: 4,
      LockReasonTextId: "DIY_Furniture_Gain_AtmoLockedState",
      LockReasonTextParams: [t.GetWayId.toString()]
    };
    UiManager_1.UiManager.OpenView("FurnitureGetWayView", t);
  }
  P6g(t) {
    if (this.o1g && this.fKf) {
      t = this.gKf[t]?.FurnitureConfig;
      if (t) {
        var i = t.Id;
        const e = ModelManager_1.ModelManager.FurnitureModel.FindFurniturePlacedSlot(i, this.o1g);
        if (e) {
          i = {
            SlotEntityId: this._Kf,
            SubSlotIndex: this.uKf
          };
          i = {
            AreaData: this.fKf,
            SlotContext: i
          };
          const s = {
            SourceContext: e,
            TargetContext: i
          };
          i = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfig(e.AreaData.GetAreaId());
          t = {
            FurnitureConfig: t,
            LockReason: 1,
            LockReasonTextId: "DIY_OccupiedWindow_OccState_1",
            LockReasonTextParams: [MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.AreaName)],
            JumpFunction: () => {
              this.nvg(e);
            },
            ConfirmFunction: () => {
              this.svg(s);
            }
          };
          UiManager_1.UiManager.OpenView("FurnitureGetWayView", t);
        }
      }
    }
  }
  ovg(i) {
    UiManager_1.UiManager.CloseView("FurnitureGetWayView", t => {
      ControllerHolder_1.ControllerHolder.FurnitureController.TryJumpToFurnitureGift(i);
    });
  }
  nvg(t) {
    var i;
    var e = t.AreaData.GetAreaId();
    var e = this.uA_.indexOf(e);
    if (e !== -1) {
      i = (t = t.SlotContext).SlotEntityId;
      t = t.SubSlotIndex;
      this.TrySwitchArea(e, i, t, () => {
        UiManager_1.UiManager.CloseView("FurnitureGetWayView");
      });
    }
  }
  svg(t) {
    this.i3g(440, undefined, () => {
      this.U6g(t);
    });
  }
  async U6g(t) {
    var i;
    var e;
    var s;
    var r;
    var h;
    var a;
    if (!this.tvg) {
      this.tvg = true;
      i = ControllerHolder_1.ControllerHolder.FurnitureController;
      s = (e = t.SourceContext).AreaData;
      a = (h = e.SlotContext).SlotEntityId;
      r = (t = t.TargetContext).AreaData;
      h = h.SubSlotIndex;
      a = {
        AreaSlotContext: t,
        FurnitureId: t = e.AreaData.GetPlacedFurnitureConfigId(a, h),
        KeepSubFurniture: true
      };
      await Promise.all([i.PlaceFurnitureAsync({
        AreaSlotContext: e,
        FurnitureId: -1,
        KeepSubFurniture: false
      }), i.PlaceFurnitureAsync(a)]);
      await ControllerHolder_1.ControllerHolder.FurnitureController.FurnitureSaveRequestAsync(s);
      await ControllerHolder_1.ControllerHolder.FurnitureController.FurnitureSaveRequestAsync(r);
      this.mKf = t;
      this.UKf();
      this.BKf();
      this.vKf?.RefreshByData(this.ngi);
      this.RefreshFurnitureScrollItemLayout();
      this.RefreshAtmosphereText(true);
      this.RefreshSaveBtn();
      UiManager_1.UiManager.CloseView("FurnitureGetWayView");
      this.tvg = false;
    }
  }
  c9g(t) {
    var i = ModelManager_1.ModelManager.FurnitureModel.GetAreaData(this.hKf);
    var e = this.fKf;
    if (i && e) {
      i = {
        AreaId: this.hKf,
        OldAreaData: i,
        NewAreaData: e,
        IsSave: t
      };
      ControllerHolder_1.ControllerHolder.FurnitureController.FurnitureSaveReport(i);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    var e = t[0];
    if (e === "Furniture") {
      i = Number(t[1]);
      if (i = this.yKf?.GetScrollItemByIndex(i)?.GetRootItem()) {
        return [i, i];
      } else {
        return undefined;
      }
    } else if (e === "FurnitureSlot" && (i = Number(t[1]), e = this.vKf?.GetScrollItemByIndex(i)?.GetRootItem())) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.FurnitureDesignView = FurnitureDesignView;
//# sourceMappingURL=FurnitureDesignView.js.map