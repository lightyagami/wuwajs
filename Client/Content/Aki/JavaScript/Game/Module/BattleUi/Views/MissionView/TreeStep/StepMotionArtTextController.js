"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepMotionArtTextController = undefined;
const UE = require("ue");
const MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const IQuest_1 = require("../../../../../../UniverseEditor/Interface/IQuest");
const LevelGamePlayUtils_1 = require("../../../../../LevelGamePlay/LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GeneralLogicTreeController_1 = require("../../../../GeneralLogicTree/GeneralLogicTreeController");
const StepControllerBase_1 = require("./StepControllerBase");
const SCORE = "Score";
const LERP_TIME = 0.5;
class StepMotionArtTextController extends StepControllerBase_1.StepControllerBase {
  constructor(t) {
    super();
    this.UiParent = t;
    this.o2_ = false;
    this.LevelSequencePlayer = undefined;
    this.i2_ = undefined;
    this.nx = undefined;
    this.r2_ = false;
    this.n2_ = true;
    this.s2_ = 0;
    this.a2_ = 0;
    this.h2_ = 0;
    this.l2_ = 0;
    this._2_ = 0;
  }
  get Enable() {
    return this.o2_;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIArtText]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnAfterHide() {
    this.LevelSequencePlayer?.StopCurrentSequence(true, true);
    this._2_ = 0;
    this.GetArtText(1)?.SetText(this.l2_.toString());
  }
  CheckTextVisible() {
    return !this.n2_;
  }
  OnTick(t) {
    var e;
    if (this.Enable && this.i2_ && typeof (e = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(this.i2_, this.nx)) == "number") {
      this.l2_ = e;
      if (this.h2_ !== this.l2_) {
        this.c2_();
      }
      this._2_ = MathCommon_1.MathCommon.Clamp(this._2_ - t / 1000, 0, LERP_TIME);
      e = MathCommon_1.MathCommon.Lerp(this.s2_, this.l2_, (LERP_TIME - this._2_) / LERP_TIME);
      this.a2_ = Math.floor(e);
      this.GetArtText(1)?.SetText(this.a2_.toString());
      this.h2_ = this.l2_;
    }
  }
  async OnConfigRefresh(t, e) {
    await super.OnConfigRefresh(t, e);
    if (!(await this.C2_())) {
      await this.EndShow();
    }
  }
  async C2_() {
    var t;
    return !!this.Config && !!this.ShowData && this.ShowData.DataSource === 0 && this.Config.ShowSource === 0 && !!(t = this.Config.QuestScheduleType) && t.Type === IQuest_1.EQuestScheduleType.Var && !!t.ShowAsWordArt?.EffectiveTarget.ShowUiMotion && typeof LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t.Var, LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(this.ShowData.BtType, this.ShowData.Id, this.ShowData.TreeConfigId)) == "number" && !(this.nx = LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(this.ShowData.BtType, this.ShowData.Id, this.ShowData.TreeConfigId), await this.StartShow(this.ShowData, this.Config.TidTitle, t.Var, this.UiParent), 0);
  }
  async StartShow(t, e, i, s) {
    this.o2_ = true;
    if (!this.r2_) {
      await this.CreateByResourceIdAsync("UiItem_MissionScore", s);
      this.r2_ = true;
    }
    s = this.u2_(t, e, i);
    this.Slo(i, s);
    this.UpdateDescribeText();
    await this.ShowAsync();
  }
  async EndShow() {
    if (this.o2_) {
      this.o2_ = false;
      await this.HideAsync();
    }
  }
  Slo(t, e) {
    this.i2_ = t;
    t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(this.i2_, this.nx);
    if (e) {
      this.c2_();
    } else {
      this.s2_ = t;
      this.a2_ = t;
      this._2_ = 0;
    }
    this.l2_ = t;
  }
  c2_() {
    this.s2_ = this.a2_;
    this.LevelSequencePlayer?.StopCurrentSequence(true, true);
    this.LevelSequencePlayer?.PlayLevelSequenceByName(SCORE);
    this._2_ = LERP_TIME;
  }
  u2_(t, e, i) {
    return !this.Config || !this.ShowData || this.ShowData.Id !== t.Id || this.Config.TidTitle !== e || (this.i2_ === undefined || i === undefined) && this.i2_ !== i || !LevelGamePlayUtils_1.LevelGamePlayUtils.CheckVarRefSame(this.i2_, i);
  }
  UpdateDescribeText() {
    var t = this.Config !== undefined ? this.Config.TidTitle : "";
    if (this.o2_ && !StringUtils_1.StringUtils.IsBlank(t) && this.i2_ && this.ShowData) {
      t = GeneralLogicTreeController_1.GeneralLogicTreeController.FormatStepTextByVarValue(t, this.i2_, "", false);
      this.GetText(0)?.SetText(t);
      return typeof (t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(this.i2_, this.nx)) == "number" && (this.GetArtText(1)?.SetText(t.toString()), !(this.n2_ = false));
    } else {
      return !(this.n2_ = true);
    }
  }
}
exports.StepMotionArtTextController = StepMotionArtTextController;
//# sourceMappingURL=StepMotionArtTextController.js.map