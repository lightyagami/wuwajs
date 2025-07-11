"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericPromptFloatTipsBase = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class GenericPromptFloatTipsBase extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.TickDuration = 0;
    this.TickTime = 0;
    this.Data = undefined;
    this.CJt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnBeforeCreate() {
    this.Data = this.OpenParam;
    this.CJt = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(this.Data.TypeId);
  }
  OnStart() {
    var i = this.Data.MainTextParams ?? [];
    this.SetMainText(...i);
    var i = this.Data.ExtraTextParams ?? [];
    this.SetExtraText(...i);
    this.gJt();
    this.nJt();
  }
  SetMainText(...i) {
    var t = this.GetText(0);
    if (!this.Data.MainTextObj && !this.Data.PromptId && i?.length && i[0]) {
      if (StringUtils_1.StringUtils.IsEmpty(i[0])) {
        t.SetUIActive(false);
      } else {
        t.SetText(i[0]);
        t.SetUIActive(true);
      }
    } else if (this.Data.MainTextObj) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.Data.MainTextObj.TextKey, ...i);
      t.SetUIActive(true);
    } else if (StringUtils_1.StringUtils.IsBlank(this.CJt.GeneralText)) {
      t.SetUIActive(false);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.CJt.GeneralText, ...i);
      t.SetUIActive(true);
    }
  }
  SetExtraText(...i) {
    var t = this.GetText(1);
    if (!this.Data.ExtraTextObj && !this.Data.PromptId && i?.length && i[0]) {
      t.SetText(i[0]);
      t.SetUIActive(true);
    } else if (this.Data.ExtraTextObj) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.Data.ExtraTextObj.TextKey, ...i);
      t.SetUIActive(true);
    } else if (StringUtils_1.StringUtils.IsBlank(this.CJt.GeneralExtraText)) {
      t.SetUIActive(false);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.CJt.GeneralExtraText, ...i);
      t.SetUIActive(true);
    }
  }
  gJt() {
    var i;
    if (this.Data.Duration && this.Data.Duration > 0) {
      this.TickDuration = this.Data.Duration;
    } else {
      if (this.Data.PromptId) {
        i = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(this.Data.PromptId);
        this.TickDuration = i.Duration;
      }
      if (this.TickDuration === 0) {
        this.TickDuration = this.CJt.Duration;
      }
      if (this.TickDuration === 0) {
        this.TickTime = CommonDefine_1.INVALID_VALUE;
      }
    }
  }
  nJt() {
    var i;
    if (this.Data.TypeId && (i = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(this.Data.TypeId)).OffsetY !== 0) {
      this.RootItem.SetAnchorOffsetY(i.OffsetY);
    }
  }
  OnTick(i) {
    if (this.ClosePromise) {
      this.TickTime = CommonDefine_1.INVALID_VALUE;
    } else if (!(this.TickTime < 0)) {
      this.TickTime = this.TickTime + i;
      if (this.TickTime > this.TickDuration * CommonDefine_1.MILLIONSECOND_PER_SECOND) {
        this.CloseMe(i => {
          if (i) {
            this.Data.CloseCallback?.();
          }
        });
      }
    }
  }
  get MainText() {
    return this.GetText(0);
  }
  get ExtraText() {
    return this.GetText(1);
  }
}
exports.GenericPromptFloatTipsBase = GenericPromptFloatTipsBase;
//# sourceMappingURL=GenericPromptFloatTipsBase.js.map