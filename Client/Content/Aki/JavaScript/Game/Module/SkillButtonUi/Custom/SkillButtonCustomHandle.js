"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonCustomHandleDotIndicator = exports.SkillButtonCustomHandleAimisiMobileUpDown = exports.SkillButtonCustomHandleZanNiUltimate = exports.SkillButtonCustomHandleHackFollowAttach = exports.SkillButtonCustomHandleKeLaiTaUltimate = exports.SkillButtonCustomHandleBase = undefined;
const Info_1 = require("../../../../Core/Common/Info");
class SkillButtonCustomHandleBase {
  constructor() {
    this.SkillButtonData = undefined;
    this.TagIds = [];
    this.BuffIds = [];
    this.Params = [];
    this.ForceEnable = false;
    this.SkillCdModifyMark = false;
    this.EnableModifyMark = false;
    this.CustomHdModifyMark = false;
    this.CustomHdMarkFrom = -1;
  }
  Init(t) {
    this.SkillButtonData = t;
    this.OnInit();
  }
  OnInit() {}
  Refresh() {}
  RefreshByTagChanged() {}
  RefreshOnInputControllerChange() {
    return false;
  }
  ClearModifyMark() {
    this.SkillCdModifyMark = false;
    this.EnableModifyMark = false;
  }
  GetCustomRemainingCoolDown() {
    return 0;
  }
}
class SkillButtonCustomHandleKeLaiTaUltimate extends (exports.SkillButtonCustomHandleBase = SkillButtonCustomHandleBase) {
  OnInit() {
    if (this.SkillButtonData) {
      this.SkillButtonData.HideCoolDownTextCustom = true;
    }
  }
  Refresh() {
    var t;
    var s;
    if (!!this.SkillButtonData && !(this.TagIds.length < 1) && !(this.BuffIds.length < 1)) {
      s = this.SkillButtonData.GameplayTagComponent;
      t = this.SkillButtonData.BuffComponent;
      if (s && t) {
        this.SkillButtonData.IsLimitCountCustom = false;
        this.SkillButtonData.RemainingCountCustom = 0;
        if (s.HasTag(this.TagIds[0])) {
          if (!this.ForceEnable) {
            this.ForceEnable = true;
            this.EnableModifyMark = true;
          }
          if (this.TagIds.length > 1 && (this.SkillButtonData.RemainingCountCustom = s.GetTagCount(this.TagIds[1]), this.SkillButtonData.RemainingCountCustom > 0)) {
            this.SkillButtonData.IsLimitCountCustom = true;
          }
          s = t.GetBuffById(this.BuffIds[0]);
          this.SkillButtonData.TotalCoolDownCustom = s?.Duration ?? 0;
        } else {
          this.SkillButtonData.TotalCoolDownCustom = 0;
          if (this.ForceEnable) {
            this.ForceEnable = false;
            this.EnableModifyMark = true;
          }
        }
      }
    }
  }
  GetCustomRemainingCoolDown() {
    var t;
    if (this.SkillButtonData && !(this.SkillButtonData.TotalCoolDownCustom <= 0) && (t = this.SkillButtonData.BuffComponent) && (t = t.GetBuffById(this.BuffIds[0]))) {
      return t.GetRemainDuration();
    } else {
      return 0;
    }
  }
  RefreshByTagChanged() {
    this.Refresh();
    this.SkillCdModifyMark = true;
  }
}
exports.SkillButtonCustomHandleKeLaiTaUltimate = SkillButtonCustomHandleKeLaiTaUltimate;
class SkillButtonCustomHandleHackFollowAttach extends SkillButtonCustomHandleBase {
  constructor() {
    super(...arguments);
    this.P2_ = undefined;
  }
  OnInit() {
    if (this.SkillButtonData) {
      this.P2_ = this.SkillButtonData.GetEntityHandle()?.Entity?.GetComponent(306);
    }
  }
  Refresh() {
    var t;
    if (this.SkillButtonData && this.P2_) {
      if (!(this.TagIds.length < 1)) {
        t = this.SkillButtonData.GameplayTagComponent;
        this.SkillButtonData.IsLimitCountCustom = true;
        this.SkillButtonData.RemainingCountCustom = t?.GetTagCount(this.TagIds[0]) ?? 0;
      }
    }
  }
  RefreshByTagChanged() {
    this.Refresh();
    this.SkillCdModifyMark = true;
  }
}
exports.SkillButtonCustomHandleHackFollowAttach = SkillButtonCustomHandleHackFollowAttach;
class SkillButtonCustomHandleZanNiUltimate extends SkillButtonCustomHandleBase {
  OnInit() {
    if (this.SkillButtonData) {
      this.SkillButtonData.HideCoolDownTextCustom = true;
    }
  }
  Refresh() {
    if (this.SkillButtonData && !(this.TagIds.length < 1) && !(this.BuffIds.length < 1)) {
      var i = this.SkillButtonData.GameplayTagComponent;
      var t = this.SkillButtonData.BuffComponent;
      if (i && t) {
        if (i.HasTag(this.TagIds[0])) {
          let s = true;
          for (let t = 1; t < this.TagIds.length; t++) {
            if (i.HasTag(this.TagIds[t])) {
              s = false;
              break;
            }
          }
          if (this.ForceEnable !== s) {
            this.ForceEnable = s;
            this.EnableModifyMark = true;
          }
          t = t.GetBuffById(this.BuffIds[0]);
          this.SkillButtonData.TotalCoolDownCustom = t?.Duration ?? 0;
        } else {
          this.SkillButtonData.TotalCoolDownCustom = 0;
          if (this.ForceEnable) {
            this.ForceEnable = false;
            this.EnableModifyMark = true;
          }
        }
      }
    }
  }
  RefreshByTagChanged() {
    this.Refresh();
    this.SkillCdModifyMark = true;
  }
}
exports.SkillButtonCustomHandleZanNiUltimate = SkillButtonCustomHandleZanNiUltimate;
class SkillButtonCustomHandleAimisiMobileUpDown extends SkillButtonCustomHandleBase {
  Refresh() {
    var t;
    if (!!this.SkillButtonData && !(this.TagIds.length < 1)) {
      if (Info_1.Info.IsInTouch() && (t = this.SkillButtonData.GameplayTagComponent)?.HasTag(this.TagIds[0]) && t.HasTag(this.TagIds[1])) {
        this.SkillButtonData.CustomSkillTexturePath = this.Params[0];
        this.SkillButtonData.CustomSkillIconName = this.Params[1];
        this.SkillButtonData.IsEnableSlideControl = true;
      } else {
        this.SkillButtonData.CustomSkillIconName = undefined;
        this.SkillButtonData.CustomSkillTexturePath = undefined;
        this.SkillButtonData.IsEnableSlideControl = false;
      }
    }
  }
  RefreshByTagChanged() {
    this.Refresh();
  }
  RefreshOnInputControllerChange() {
    this.Refresh();
    return true;
  }
}
exports.SkillButtonCustomHandleAimisiMobileUpDown = SkillButtonCustomHandleAimisiMobileUpDown;
class SkillButtonCustomHandleDotIndicator extends SkillButtonCustomHandleBase {
  Refresh() {
    var t;
    if (!!this.SkillButtonData && !(this.TagIds.length < 2)) {
      if (this.Params.length < 1 || this.Params[0] === "" || this.SkillButtonData.GetActionType() === Number(this.Params[0])) {
        t = this.SkillButtonData.GameplayTagComponent;
        this.SkillButtonData.IsEnableDotIndicator = t?.HasTag(this.TagIds[0]) ?? false;
        this.SkillButtonData.DotIndicatorCount = t?.GetTagCount(this.TagIds[1]) ?? 0;
        this.CustomHdModifyMark = true;
        this.CustomHdMarkFrom = 5;
      }
    }
  }
  RefreshByTagChanged() {
    this.Refresh();
  }
  RefreshOnInputControllerChange() {
    this.Refresh();
    return true;
  }
}
exports.SkillButtonCustomHandleDotIndicator = SkillButtonCustomHandleDotIndicator;
//# sourceMappingURL=SkillButtonCustomHandle.js.map