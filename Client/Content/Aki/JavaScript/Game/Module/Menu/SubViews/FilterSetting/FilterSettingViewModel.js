"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterSettingViewModel = undefined;
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const FilterSettingAll_1 = require("../../../../../Core/Define/ConfigQuery/FilterSettingAll");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const MenuDefine_1 = require("../../MenuDefine");
class FilterSettingViewModel {
  constructor() {
    this.Stu = 0;
    this.dcu = undefined;
    this.Mtu = undefined;
    this.Etu = undefined;
    this.Itu = undefined;
    this.igu = undefined;
    this.rgu = undefined;
    this.fsu = undefined;
    this.gsu = undefined;
    this.mcu = false;
    this.fcu = false;
    this.ogu = true;
    this.IsApplyClicked = false;
    this.zDu = false;
    this.IsLeftStickHorizontalMoved = false;
    this.IsLeftStickVerticalMoved = false;
    this.LastMoveVector = undefined;
    this.UpLeftPos = undefined;
    this.UpRightPos = undefined;
    this.DownLeftPos = undefined;
    this.UiCameraPhotographerStructure = undefined;
    this.PhotographOptionMap = new Map();
    this.EntityDisableId = 0;
    this.SetDisableEntity = undefined;
    this.CameraRotationLock = false;
    this.PadLock = false;
    this.InitFilterIndex = 0;
    this.v0u = undefined;
    this.OnHideClick = undefined;
    this.OnResetClick = undefined;
    this.OnConfirmClick = undefined;
    this.OnCloseClick = undefined;
    this.OnPadChanged = undefined;
    this.OnPadChangeStop = undefined;
    this.OnSliderChanged = undefined;
    this.OnViewBeforeCreate = undefined;
    this.OnViewBeforeStart = undefined;
    this.OnViewBeforeShow = undefined;
    this.OnViewAfterHide = undefined;
    this.OnViewDestroy = undefined;
    this.OnDragMoved = undefined;
    this.OnDragBegin = undefined;
    this.OnDragEnded = undefined;
    this.OnInputUiLookUp = undefined;
    this.OnInputUiTurn = undefined;
    this.OnInputUiMoveForward = undefined;
    this.OnInputUiMoveRight = undefined;
    this.OnIndexChanged = undefined;
    this.OnLeftArrowClick = undefined;
    this.OnRightArrowClick = undefined;
  }
  get ControlCameraRate() {
    if (this.dcu === undefined) {
      this.dcu = CommonParamById_1.configCommonParamById.GetIntConfig("ControlCameraRate") / CommonDefine_1.PERCENTAGE_FACTOR;
    }
    return this.dcu;
  }
  get CoordinateTextId() {
    return MenuDefine_1.FILTER_SETTING_COORDINATE_TEXT_ID;
  }
  get IntensityNormalized() {
    return this.Mtu ?? MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE;
  }
  set IntensityNormalized(i) {
    if (this.Mtu !== i) {
      this.Mtu = i;
      this.Stu |= FilterSettingViewModel.Flags.IntensityNormalized;
    }
  }
  get IntensityString() {
    return Math.round(this.IntensityNormalized * 100).toString();
  }
  get HorizontalNormalized() {
    return this.Etu ?? MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE;
  }
  set HorizontalNormalized(i) {
    var t;
    var e;
    var i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
    this.ngu(i);
    if (this.UpLeftPos !== undefined && this.UpRightPos !== undefined) {
      t = this.UpLeftPos.X;
      e = this.UpRightPos.X;
      this.igu = MathUtils_1.MathUtils.Lerp(t, e, i);
    }
  }
  ngu(i) {
    if (this.Etu !== i) {
      this.Etu = MathUtils_1.MathUtils.Clamp(i, 0, 1);
      this.Stu |= FilterSettingViewModel.Flags.HorizontalNormalized;
    }
  }
  get HorizontalString() {
    return Math.round(MathUtils_1.MathUtils.Lerp(-5, 5, this.HorizontalNormalized)).toString();
  }
  get VerticalNormalized() {
    return this.Itu ?? MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE;
  }
  set VerticalNormalized(i) {
    var t;
    var e;
    var i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
    this.sgu(i);
    if (this.DownLeftPos !== undefined && this.UpLeftPos !== undefined) {
      t = this.DownLeftPos.Z;
      e = this.UpLeftPos.Z;
      this.rgu = MathUtils_1.MathUtils.Lerp(t, e, i);
    }
  }
  sgu(i) {
    if (this.Itu !== i) {
      this.Itu = MathUtils_1.MathUtils.Clamp(i, 0, 1);
      this.Stu |= FilterSettingViewModel.Flags.VerticalNormalized;
    }
  }
  get VerticalString() {
    return Math.round(MathUtils_1.MathUtils.Lerp(-5, 5, this.VerticalNormalized)).toString();
  }
  get HorizontalReal() {
    var i;
    var t;
    if (this.igu === undefined && this.UpLeftPos !== undefined && this.UpRightPos !== undefined) {
      i = this.UpLeftPos.X;
      t = this.UpRightPos.X;
      this.igu = MathUtils_1.MathUtils.Lerp(i, t, this.HorizontalNormalized);
    }
    return this.igu;
  }
  set HorizontalReal(i) {
    var t;
    var e;
    if (i !== undefined && this.UpLeftPos !== undefined && this.UpRightPos !== undefined) {
      t = this.UpLeftPos.X;
      e = this.UpRightPos.X;
      this.igu = MathUtils_1.MathUtils.Clamp(i, t, e);
      i = MathUtils_1.MathUtils.GetRoundToNDecimalPlaces(MathUtils_1.MathUtils.InverseLerp(this.igu, t, e), 1);
      this.ngu(i);
    }
  }
  get VerticalReal() {
    var i;
    var t;
    if (this.rgu === undefined && this.DownLeftPos !== undefined && this.UpLeftPos !== undefined) {
      i = this.DownLeftPos.Z;
      t = this.UpLeftPos.Z;
      this.rgu = MathUtils_1.MathUtils.Lerp(i, t, this.VerticalNormalized);
    }
    return this.rgu;
  }
  set VerticalReal(i) {
    var t;
    var e;
    if (i !== undefined && this.DownLeftPos !== undefined && this.UpLeftPos !== undefined) {
      t = this.DownLeftPos.Z;
      e = this.UpLeftPos.Z;
      this.rgu = MathUtils_1.MathUtils.Clamp(i, t, e);
      i = MathUtils_1.MathUtils.GetRoundToNDecimalPlaces(MathUtils_1.MathUtils.InverseLerp(this.rgu, t, e), 1);
      this.sgu(i);
    }
  }
  get FilterNameTextId() {
    return this.fsu;
  }
  set FilterNameTextId(i) {
    if (this.fsu !== i) {
      this.fsu = i;
      this.Stu |= FilterSettingViewModel.Flags.FilterNameTextId;
    }
  }
  get FilterPadTexturePath() {
    return this.gsu;
  }
  set FilterPadTexturePath(i) {
    if (this.gsu !== i) {
      this.gsu = i;
      this.Stu |= FilterSettingViewModel.Flags.FilterPadTexturePath;
    }
  }
  get IsHideByPad() {
    return this.mcu;
  }
  set IsHideByPad(i) {
    if (this.mcu !== i) {
      this.mcu = i;
      this.Stu |= FilterSettingViewModel.Flags.IsHideByPad;
      ModelManager_1.ModelManager.LoadingModel.IsShowUidView = !i;
    }
  }
  get IsHideByClick() {
    return this.fcu;
  }
  set IsHideByClick(i) {
    if (this.fcu !== i) {
      this.fcu = i;
      this.Stu |= FilterSettingViewModel.Flags.IsHideByClick;
      ModelManager_1.ModelManager.LoadingModel.IsShowUidView = !i;
    }
  }
  get IsSliderActive() {
    return this.ogu;
  }
  set IsSliderActive(i) {
    if (this.ogu !== i) {
      this.ogu = i;
      this.Stu |= FilterSettingViewModel.Flags.IsSliderActive;
    }
  }
  get IsFilterChanged() {
    return this.zDu;
  }
  set IsFilterChanged(i) {
    if (this.zDu = i) {
      this.IsApplyClicked = false;
    }
  }
  get IsOtherViewOpen() {
    return UiManager_1.UiManager.IsViewOpen("HelpView");
  }
  get TexturePathList() {
    var i;
    if (this.v0u === undefined) {
      i = FilterSettingAll_1.configFilterSettingAll.GetConfigList();
      this.v0u = i === undefined ? [] : i.map(i => i.SpritePath);
    }
    return this.v0u;
  }
  get IsDirty() {
    return this.Stu !== 0;
  }
  IsPropertyDirty(i) {
    return (this.Stu & i) != 0;
  }
  CleanDirty() {
    this.Stu = 0;
  }
}
(exports.FilterSettingViewModel = FilterSettingViewModel).Flags = {
  PointTexturePosition: 1,
  IntensityNormalized: 2,
  HorizontalNormalized: 4,
  VerticalNormalized: 8,
  FilterNameTextId: 16,
  FilterPadTexturePath: 32,
  IsHideByPad: 64,
  IsHideByClick: 128,
  IsSliderActive: 256
};
//# sourceMappingURL=FilterSettingViewModel.js.map