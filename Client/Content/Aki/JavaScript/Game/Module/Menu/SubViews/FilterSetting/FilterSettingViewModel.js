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
    this.Qtu = 0;
    this.Ycu = undefined;
    this.Ktu = undefined;
    this.Xtu = undefined;
    this.Ytu = undefined;
    this.zgu = undefined;
    this.Jgu = undefined;
    this.Nsu = undefined;
    this.Vsu = undefined;
    this.zcu = false;
    this.Jcu = false;
    this.Zgu = true;
    this.GNd = false;
    this.IsApplyClicked = false;
    this.LBu = false;
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
    this.FNd = undefined;
    this.OnHideClick = undefined;
    this.OnResetClick = undefined;
    this.OnConfirmClick = undefined;
    this.OnCloseClick = undefined;
    this.OnPadChanged = undefined;
    this.OnPadChangeStop = undefined;
    this.OnSliderChanged = undefined;
    this.OnSeniorSliderChanged = undefined;
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
    if (this.Ycu === undefined) {
      this.Ycu = CommonParamById_1.configCommonParamById.GetIntConfig("ControlCameraRate") / CommonDefine_1.PERCENTAGE_FACTOR;
    }
    return this.Ycu;
  }
  get CoordinateTextId() {
    return MenuDefine_1.FILTER_SETTING_COORDINATE_TEXT_ID;
  }
  get IntensityNormalized() {
    return this.Ktu ?? MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE;
  }
  set IntensityNormalized(i) {
    if (this.Ktu !== i) {
      this.Ktu = i;
      this.Qtu |= FilterSettingViewModel.Flags.IntensityNormalized;
    }
  }
  get IntensityString() {
    return Math.round(this.IntensityNormalized * 100).toString();
  }
  get HorizontalNormalized() {
    return this.Xtu ?? MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE;
  }
  set HorizontalNormalized(i) {
    var t;
    var e;
    var i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
    this.eCu(i);
    if (this.UpLeftPos !== undefined && this.UpRightPos !== undefined) {
      t = this.UpLeftPos.X;
      e = this.UpRightPos.X;
      this.zgu = MathUtils_1.MathUtils.Lerp(t, e, i);
    }
  }
  eCu(i) {
    if (this.Xtu !== i) {
      this.Xtu = MathUtils_1.MathUtils.Clamp(i, 0, 1);
      this.Qtu |= FilterSettingViewModel.Flags.HorizontalNormalized;
    }
  }
  get HorizontalString() {
    return Math.round(MathUtils_1.MathUtils.Lerp(-5, 5, this.HorizontalNormalized)).toString();
  }
  get VerticalNormalized() {
    return this.Ytu ?? MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE;
  }
  set VerticalNormalized(i) {
    var t;
    var e;
    var i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
    this.tCu(i);
    if (this.DownLeftPos !== undefined && this.UpLeftPos !== undefined) {
      t = this.DownLeftPos.Z;
      e = this.UpLeftPos.Z;
      this.Jgu = MathUtils_1.MathUtils.Lerp(t, e, i);
    }
  }
  tCu(i) {
    if (this.Ytu !== i) {
      this.Ytu = MathUtils_1.MathUtils.Clamp(i, 0, 1);
      this.Qtu |= FilterSettingViewModel.Flags.VerticalNormalized;
    }
  }
  get VerticalString() {
    return Math.round(MathUtils_1.MathUtils.Lerp(-5, 5, this.VerticalNormalized)).toString();
  }
  get HorizontalReal() {
    var i;
    var t;
    if (this.zgu === undefined && this.UpLeftPos !== undefined && this.UpRightPos !== undefined) {
      i = this.UpLeftPos.X;
      t = this.UpRightPos.X;
      this.zgu = MathUtils_1.MathUtils.Lerp(i, t, this.HorizontalNormalized);
    }
    return this.zgu;
  }
  set HorizontalReal(i) {
    var t;
    var e;
    if (i !== undefined && this.UpLeftPos !== undefined && this.UpRightPos !== undefined) {
      t = this.UpLeftPos.X;
      e = this.UpRightPos.X;
      this.zgu = MathUtils_1.MathUtils.Clamp(i, t, e);
      i = MathUtils_1.MathUtils.GetRoundToNDecimalPlaces(MathUtils_1.MathUtils.InverseLerp(this.zgu, t, e), 1);
      this.eCu(i);
    }
  }
  get VerticalReal() {
    var i;
    var t;
    if (this.Jgu === undefined && this.DownLeftPos !== undefined && this.UpLeftPos !== undefined) {
      i = this.DownLeftPos.Z;
      t = this.UpLeftPos.Z;
      this.Jgu = MathUtils_1.MathUtils.Lerp(i, t, this.VerticalNormalized);
    }
    return this.Jgu;
  }
  set VerticalReal(i) {
    var t;
    var e;
    if (i !== undefined && this.DownLeftPos !== undefined && this.UpLeftPos !== undefined) {
      t = this.DownLeftPos.Z;
      e = this.UpLeftPos.Z;
      this.Jgu = MathUtils_1.MathUtils.Clamp(i, t, e);
      i = MathUtils_1.MathUtils.GetRoundToNDecimalPlaces(MathUtils_1.MathUtils.InverseLerp(this.Jgu, t, e), 1);
      this.tCu(i);
    }
  }
  get FilterNameTextId() {
    return this.Nsu;
  }
  set FilterNameTextId(i) {
    if (this.Nsu !== i) {
      this.Nsu = i;
      this.Qtu |= FilterSettingViewModel.Flags.FilterNameTextId;
    }
  }
  get FilterPadTexturePath() {
    return this.Vsu;
  }
  set FilterPadTexturePath(i) {
    if (this.Vsu !== i) {
      this.Vsu = i;
      this.Qtu |= FilterSettingViewModel.Flags.FilterPadTexturePath;
    }
  }
  get IsHideByPad() {
    return this.zcu;
  }
  set IsHideByPad(i) {
    if (this.zcu !== i) {
      this.zcu = i;
      this.Qtu |= FilterSettingViewModel.Flags.IsHideByPad;
      ModelManager_1.ModelManager.LoadingModel.IsShowUidView = !i;
    }
  }
  get IsHideByClick() {
    return this.Jcu;
  }
  set IsHideByClick(i) {
    if (this.Jcu !== i) {
      this.Jcu = i;
      this.Qtu |= FilterSettingViewModel.Flags.IsHideByClick;
      ModelManager_1.ModelManager.LoadingModel.IsShowUidView = !i;
    }
  }
  get IsSliderActive() {
    return this.Zgu;
  }
  set IsSliderActive(i) {
    if (this.Zgu !== i) {
      this.Zgu = i;
      this.Qtu |= FilterSettingViewModel.Flags.IsSliderActive;
    }
  }
  get IsSeniorParamRefresh() {
    return this.GNd;
  }
  set IsSeniorParamRefresh(i) {
    if (this.GNd = i) {
      this.Qtu |= FilterSettingViewModel.Flags.IsSeniorParamRefresh;
    }
  }
  get IsFilterChanged() {
    return this.LBu;
  }
  set IsFilterChanged(i) {
    if (this.LBu = i) {
      this.IsApplyClicked = false;
    }
  }
  get IsOtherViewOpen() {
    return UiManager_1.UiManager.IsViewOpen("HelpView");
  }
  get FilterList() {
    if (this.FNd === undefined) {
      this.FNd = [...(FilterSettingAll_1.configFilterSettingAll.GetConfigList() ?? [])];
    }
    return this.FNd;
  }
  get IsDirty() {
    return this.Qtu !== 0;
  }
  IsPropertyDirty(i) {
    return (this.Qtu & i) != 0;
  }
  CleanDirty() {
    this.Qtu = 0;
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
  IsSliderActive: 256,
  IsSeniorParamRefresh: 512
};
//# sourceMappingURL=FilterSettingViewModel.js.map