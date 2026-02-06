"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyImportPresetView = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const UiCameraInputComponent_1 = require("../../../../Common/UiCamera/UiCameraInputComponent");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const MotorcycleUiModelUtil_1 = require("../../../Model/MotorcycleUiModelUtil");
const MotorcycleDiyPresetDecorationItem_1 = require("../../Item/MotorcycleDiyPresetDecorationItem");
const MotorcycleDiyPresetItem_1 = require("../../Item/MotorcycleDiyPresetItem");
const MotorcycleDiyPresetStickerItem_1 = require("../../Item/MotorcycleDiyPresetStickerItem");
const MotorcycleDiyDefine_1 = require("../../MotorcycleDiyDefine");
class MotorcycleDiyImportPresetView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Nkf = undefined;
    this.Vkf = undefined;
    this.Iyf = undefined;
    this.QEg = undefined;
    this.Hkf = undefined;
    this.ebl = undefined;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.jkf = [];
    this.KEg = [];
    this.XEg = 0;
    this.$kf = (e, t) => {
      if (this.ebl) {
        this.ebl.SetToggleState(0);
      }
      this.ebl = t;
      this.ebl.SetToggleState(1);
      this.Wkf(e);
    };
    this.Qkf = () => {
      var e = new MotorcycleDiyPresetItem_1.MotorcycleDiyPresetItem();
      e.OnClickToggleBack = this.$kf;
      return e;
    };
    this.Kkf = () => new MotorcycleDiyPresetStickerItem_1.MotorcycleDiyPresetStickerItem();
    this.YEg = () => new MotorcycleDiyPresetDecorationItem_1.MotorcycleDiyPresetDecorationItem();
    this.Nyf = () => {
      var e = this.XEg === ModelManager_1.ModelManager.MotorcycleDiyModel.GetDefaultFrameId();
      if (ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipFrameLockedByPlayer() && !e) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorDIYWarning02");
      } else {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(404)).FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.MotorcycleDiyController.EquipMotorOutLookRequest(this.jkf, this.KEg, this.XEg, () => {
            ModelManager_1.ModelManager.MotorcycleDiyModel.ResetSelectedItemInfo();
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorDIYTips02");
            this.CloseMe();
          });
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
    this.lPe = () => {
      MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadEquippedMotor(() => {
        this.CloseMe();
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIVerticalLayout], [3, UE.UIExtendToggle], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UIScrollViewWithScrollbarComponent], [8, UE.UIHorizontalLayout], [9, UE.UIItem], [10, UE.UIScrollViewWithScrollbarComponent], [11, UE.UIHorizontalLayout], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIDraggableComponent]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.Vkf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.Qkf);
    this.Iyf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(7), this.Kkf);
    this.QEg = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(10), this.YEg);
    this.Hkf = new ButtonItem_1.ButtonItem();
    this.Nkf = new MotorcycleDiyPresetItem_1.MotorcycleDiyPresetItem();
    await Promise.all([this.lqe.CreateThenShowByActorAsync(this.GetItem(14).GetOwner()), this.Hkf.CreateThenShowByActorAsync(this.GetItem(13).GetOwner()), this.Nkf.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())]);
    this.lqe.SetCloseCallBack(this.lPe);
    this.lqe.SetHelpBtnActive(false);
    this.Nkf.OnClickToggleBack = this.$kf;
    this.Nkf.SetUiActive(false);
    this.Hkf.SetFunction(this.Nyf);
    this.Ykf();
    this.InitCameraInputData();
  }
  OnAfterShow() {
    this.CameraInputComponent.Start();
    this.CameraInputComponent.TryActivate();
  }
  OnBeforeHide() {
    this.CameraInputComponent.End();
  }
  Ykf() {
    var t;
    var i = [];
    for (const r of ConfigManager_1.ConfigManager.MotorDiyConfig.GetAllMotorPresetList()) {
      let e = r.Show;
      for (const o of r.Sticker) {
        if (!ModelManager_1.ModelManager.MotorcycleDiyModel.HasSticker(o)) {
          e = false;
          break;
        }
      }
      if (e) {
        t = {
          IsSelf: false,
          PresetId: r.Id
        };
        i.push(t);
      }
    }
    this.Vkf.RefreshByData(i, () => {
      this.Vkf.SelectGridProxy(0);
    });
  }
  Wkf(e) {
    this.JEg(e);
    this.zEg(e);
    this.ZEg(e);
    this.Hkf.SetUiActive(!e.IsSelf);
    e = {
      FrameId: this.XEg,
      StickerIds: this.jkf,
      DecorationIds: this.KEg
    };
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadMotorByParam(e);
  }
  zEg(e) {
    let t = [];
    t = e.IsSelf ? ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerIdList() : (e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorPresetConfig(e.PresetId)).Sticker.length <= 0 ? [0, 0, 0] : e.Sticker;
    var i = [];
    let r = undefined;
    for (let e = 0; e < t.length; e++) {
      var o = t[e];
      if (o > 0) {
        r = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(o);
      }
      var s = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData();
      s.Part = e + 1;
      s.ItemId = o;
      s.QualityId = r ? r.QualityId : 0;
      s.SortIndex = r ? r.SortIndex : 0;
      s.IsSticker = true;
      i.push(s);
    }
    this.Iyf.RefreshByData(i);
    this.jkf = t;
  }
  ZEg(e) {
    let t = [];
    t = e.IsSelf ? ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedDecorationIdList() : (e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorPresetConfig(e.PresetId)).Decorations.length <= 0 ? ModelManager_1.ModelManager.MotorcycleDiyModel.GetDefaultDecorationIdList() : e.Decorations;
    var i = [];
    let r = undefined;
    for (let e = 0; e < t.length; e++) {
      var o = t[e];
      if (o > 0) {
        r = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(o);
      }
      var s = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData();
      s.Part = e + 1;
      s.ItemId = o;
      s.QualityId = r ? r.QualityId : 0;
      s.SortIndex = r ? r.SortIndex : 0;
      s.IsSticker = false;
      i.push(s);
    }
    this.QEg.RefreshByData(i);
    this.KEg = t;
  }
  JEg(e) {
    var t;
    if (e.IsSelf) {
      this.XEg = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedFrameId();
    } else {
      e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorPresetConfig(e.PresetId);
      this.XEg = e.Frame;
      e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorFrameConfig(this.XEg);
      t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorFramePartConfig();
      this.SetTextureByPath(t.Icon, this.GetTexture(5));
      this.SetTextureByPath(e.ModelIconPath, this.GetTexture(6));
    }
  }
  InitCameraInputData() {
    var e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(MotorcycleDiyDefine_1.MOTORCYCLE_DIY_IMPORT_VIEW_CAMERA_CONFIG_ID);
    var t = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("RoleCase"), 1).D_K2_GetActorLocation();
    var e = {
      DragComponent: this.GetDraggable(18),
      CameraSettingConfig: e,
      SourceLocation: t
    };
    this.CameraInputComponent.InitData(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e[0] === "Preset") {
      const t = Number(e[1]);
      var e = this.Vkf.GetGenericLayout()?.GetDatas();
      if (e) {
        e = e.findIndex(e => e.PresetId === t);
        if (e = this.Vkf.GetGenericLayout()?.GetGridByDisplayIndex(e)) {
          return [e, e];
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    }
  }
}
exports.MotorcycleDiyImportPresetView = MotorcycleDiyImportPresetView;
//# sourceMappingURL=MotorcycleDiyImportPresetView.js.map