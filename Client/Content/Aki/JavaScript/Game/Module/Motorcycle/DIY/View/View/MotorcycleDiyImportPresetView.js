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
const MotorcycleDiyPresetItem_1 = require("../../Item/MotorcycleDiyPresetItem");
const MotorcycleDiyPresetStickerItem_1 = require("../../Item/MotorcycleDiyPresetStickerItem");
const MotorcycleDiyDefine_1 = require("../../MotorcycleDiyDefine");
class MotorcycleDiyImportPresetView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.$Pf = undefined;
    this.WPf = undefined;
    this.NCf = undefined;
    this.QPf = undefined;
    this.ebl = undefined;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.KPf = [];
    this.XPf = (e, t) => {
      if (this.ebl) {
        this.ebl.SetToggleState(0);
      }
      this.ebl = t;
      this.ebl.SetToggleState(1);
      this.YPf(e);
    };
    this.zPf = () => {
      var e = new MotorcycleDiyPresetItem_1.MotorcycleDiyPresetItem();
      e.OnClickToggleBack = this.XPf;
      return e;
    };
    this.JPf = () => new MotorcycleDiyPresetStickerItem_1.MotorcycleDiyPresetStickerItem();
    this.opf = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(404);
      e.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.MotorcycleDiyController.EquipMotorStickerRequest(this.KPf, () => {
          ModelManager_1.ModelManager.MotorcycleDiyModel.ResetSelectStickerInfo();
          this.CloseMe();
        });
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.lPe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIVerticalLayout], [3, UE.UIExtendToggle], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UIScrollViewWithScrollbarComponent], [8, UE.UIHorizontalLayout], [9, UE.UIItem], [10, UE.UIScrollViewWithScrollbarComponent], [11, UE.UIHorizontalLayout], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIDraggableComponent]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.WPf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.zPf);
    this.NCf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(7), this.JPf);
    this.QPf = new ButtonItem_1.ButtonItem();
    this.$Pf = new MotorcycleDiyPresetItem_1.MotorcycleDiyPresetItem();
    await Promise.all([this.lqe.CreateThenShowByActorAsync(this.GetItem(14).GetOwner()), this.QPf.CreateThenShowByActorAsync(this.GetItem(13).GetOwner()), this.$Pf.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())]);
    this.lqe.SetCloseCallBack(this.lPe);
    this.lqe.SetHelpBtnActive(false);
    this.$Pf.OnClickToggleBack = this.XPf;
    this.$Pf.SetUiActive(false);
    this.QPf.SetFunction(this.opf);
    this.eAf();
    this.GetItem(15).SetUIActive(false);
    this.GetItem(16).SetUIActive(true);
    this.GetItem(17).SetUIActive(false);
    this.InitCameraInputData();
  }
  OnAfterShow() {
    this.CameraInputComponent.Start();
    this.CameraInputComponent.TryActivate();
  }
  OnBeforeHide() {
    this.CameraInputComponent.End();
  }
  eAf() {
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
    this.WPf.RefreshByData(i, () => {
      this.WPf.SelectGridProxy(0);
    });
  }
  YPf(e) {
    let t = [];
    var i;
    t = e.IsSelf ? ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerIdList() : (i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorPresetConfig(e.PresetId)).Sticker.length <= 0 ? [0, 0, 0] : i.Sticker;
    this.KPf = t;
    this.tAf(t);
    this.QPf.SetUiActive(!e.IsSelf);
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ChangeMotorByParam(t);
  }
  tAf(t) {
    var i = [];
    for (let e = 0; e < t.length; e++) {
      var r = new MotorcycleDiyDefine_1.MotorcycleDiyStickerItemData(e + 1, t[e]);
      i.push(r);
    }
    this.NCf.RefreshByData(i);
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
      var e = this.WPf.GetGenericLayout()?.GetDatas();
      if (e) {
        e = e.findIndex(e => e.PresetId === t);
        if (e = this.WPf.GetGenericLayout()?.GetGridByDisplayIndex(e)) {
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