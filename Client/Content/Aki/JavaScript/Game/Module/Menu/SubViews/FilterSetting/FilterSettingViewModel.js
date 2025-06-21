"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FilterSettingViewModel = void 0;
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  FilterSettingAll_1 = require("../../../../../Core/Define/ConfigQuery/FilterSettingAll"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  MenuDefine_1 = require("../../MenuDefine");
class FilterSettingViewModel {
  constructor() {
    this.Reu = 0, this.jsu = void 0, this.Leu = void 0, this.weu = void 0, this.Aeu = void 0, this.llu = void 0, this._lu = void 0, this.Jiu = void 0, this.Ziu = void 0, this.Hsu = !1, this.$su = !1, this.ulu = !0, this.IsApplyClicked = !1, this.Wmu = !1, this.IsLeftStickHorizontalMoved = !1, this.IsLeftStickVerticalMoved = !1, this.LastMoveVector = void 0, this.UpLeftPos = void 0, this.UpRightPos = void 0, this.DownLeftPos = void 0, this.UiCameraPhotographerStructure = void 0, this.PhotographOptionMap = new Map, this.EntityDisableId = 0, this.SetDisableEntity = void 0, this.CameraRotationLock = !1, this.PadLock = !1, this.InitFilterIndex = 0, this.E_u = void 0, this.OnHideClick = void 0, this.OnResetClick = void 0, this.OnConfirmClick = void 0, this.OnCloseClick = void 0, this.OnPadChanged = void 0, this.OnPadChangeStop = void 0, this.OnSliderChanged = void 0, this.OnViewBeforeCreate = void 0, this.OnViewBeforeStart = void 0, this.OnViewBeforeShow = void 0, this.OnViewAfterHide = void 0, this.OnViewDestroy = void 0, this.OnDragMoved = void 0, this.OnDragBegin = void 0, this.OnDragEnded = void 0, this.OnInputUiLookUp = void 0, this.OnInputUiTurn = void 0, this.OnInputUiMoveForward = void 0, this.OnInputUiMoveRight = void 0, this.OnIndexChanged = void 0, this.OnLeftArrowClick = void 0, this.OnRightArrowClick = void 0
  }
  get ControlCameraRate() {
    return void 0 === this.jsu && (this.jsu = CommonParamById_1.configCommonParamById.GetIntConfig("ControlCameraRate") / CommonDefine_1.PERCENTAGE_FACTOR), this.jsu
  }
  get CoordinateTextId() {
    return MenuDefine_1.FILTER_SETTING_COORDINATE_TEXT_ID
  }
  get IntensityNormalized() {
    return this.Leu ?? MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE
  }
  set IntensityNormalized(i) {
    this.Leu !== i && (this.Leu = i, this.Reu |= FilterSettingViewModel.Flags.IntensityNormalized)
  }
  get IntensityString() {
    return Math.round(100 * this.IntensityNormalized).toString()
  }
  get HorizontalNormalized() {
    return this.weu ?? MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE
  }
  set HorizontalNormalized(i) {
    var t, e, i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
    this.clu(i), void 0 !== this.UpLeftPos && void 0 !== this.UpRightPos && (t = this.UpLeftPos.X, e = this.UpRightPos.X, this.llu = MathUtils_1.MathUtils.Lerp(t, e, i))
  }
  clu(i) {
    this.weu !== i && (this.weu = MathUtils_1.MathUtils.Clamp(i, 0, 1), this.Reu |= FilterSettingViewModel.Flags.HorizontalNormalized)
  }
  get HorizontalString() {
    return Math.round(MathUtils_1.MathUtils.Lerp(-5, 5, this.HorizontalNormalized)).toString()
  }
  get VerticalNormalized() {
    return this.Aeu ?? MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE
  }
  set VerticalNormalized(i) {
    var t, e, i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
    this.dlu(i), void 0 !== this.DownLeftPos && void 0 !== this.UpLeftPos && (t = this.DownLeftPos.Z, e = this.UpLeftPos.Z, this._lu = MathUtils_1.MathUtils.Lerp(t, e, i))
  }
  dlu(i) {
    this.Aeu !== i && (this.Aeu = MathUtils_1.MathUtils.Clamp(i, 0, 1), this.Reu |= FilterSettingViewModel.Flags.VerticalNormalized)
  }
  get VerticalString() {
    return Math.round(MathUtils_1.MathUtils.Lerp(-5, 5, this.VerticalNormalized)).toString()
  }
  get HorizontalReal() {
    var i, t;
    return void 0 === this.llu && void 0 !== this.UpLeftPos && void 0 !== this.UpRightPos && (i = this.UpLeftPos.X, t = this.UpRightPos.X, this.llu = MathUtils_1.MathUtils.Lerp(i, t, this.HorizontalNormalized)), this.llu
  }
  set HorizontalReal(i) {
    var t, e;
    void 0 !== i && void 0 !== this.UpLeftPos && void 0 !== this.UpRightPos && (t = this.UpLeftPos.X, e = this.UpRightPos.X, this.llu = MathUtils_1.MathUtils.Clamp(i, t, e), i = MathUtils_1.MathUtils.GetRoundToNDecimalPlaces(MathUtils_1.MathUtils.InverseLerp(this.llu, t, e), 1), this.clu(i))
  }
  get VerticalReal() {
    var i, t;
    return void 0 === this._lu && void 0 !== this.DownLeftPos && void 0 !== this.UpLeftPos && (i = this.DownLeftPos.Z, t = this.UpLeftPos.Z, this._lu = MathUtils_1.MathUtils.Lerp(i, t, this.VerticalNormalized)), this._lu
  }
  set VerticalReal(i) {
    var t, e;
    void 0 !== i && void 0 !== this.DownLeftPos && void 0 !== this.UpLeftPos && (t = this.DownLeftPos.Z, e = this.UpLeftPos.Z, this._lu = MathUtils_1.MathUtils.Clamp(i, t, e), i = MathUtils_1.MathUtils.GetRoundToNDecimalPlaces(MathUtils_1.MathUtils.InverseLerp(this._lu, t, e), 1), this.dlu(i))
  }
  get FilterNameTextId() {
    return this.Jiu
  }
  set FilterNameTextId(i) {
    this.Jiu !== i && (this.Jiu = i, this.Reu |= FilterSettingViewModel.Flags.FilterNameTextId)
  }
  get FilterPadTexturePath() {
    return this.Ziu
  }
  set FilterPadTexturePath(i) {
    this.Ziu !== i && (this.Ziu = i, this.Reu |= FilterSettingViewModel.Flags.FilterPadTexturePath)
  }
  get IsHideByPad() {
    return this.Hsu
  }
  set IsHideByPad(i) {
    this.Hsu !== i && (this.Hsu = i, this.Reu |= FilterSettingViewModel.Flags.IsHideByPad, ModelManager_1.ModelManager.LoadingModel.IsShowUidView = !i)
  }
  get IsHideByClick() {
    return this.$su
  }
  set IsHideByClick(i) {
    this.$su !== i && (this.$su = i, this.Reu |= FilterSettingViewModel.Flags.IsHideByClick, ModelManager_1.ModelManager.LoadingModel.IsShowUidView = !i)
  }
  get IsSliderActive() {
    return this.ulu
  }
  set IsSliderActive(i) {
    this.ulu !== i && (this.ulu = i, this.Reu |= FilterSettingViewModel.Flags.IsSliderActive)
  }
  get IsFilterChanged() {
    return this.Wmu
  }
  set IsFilterChanged(i) {
    (this.Wmu = i) && (this.IsApplyClicked = !1)
  }
  get IsOtherViewOpen() {
    return UiManager_1.UiManager.IsViewOpen("HelpView")
  }
  get TexturePathList() {
    var i;
    return void 0 === this.E_u && (i = FilterSettingAll_1.configFilterSettingAll.GetConfigList(), this.E_u = void 0 === i ? [] : i.map(i => i.SpritePath)), this.E_u
  }
  get IsDirty() {
    return 0 !== this.Reu
  }
  IsPropertyDirty(i) {
    return 0 != (this.Reu & i)
  }
  CleanDirty() {
    this.Reu = 0
  }
}(exports.FilterSettingViewModel = FilterSettingViewModel).Flags = {
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