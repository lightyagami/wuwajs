"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsPureKeyHandle = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const ModelManager_1 = require("../Manager/ModelManager");
const LogReportModel_1 = require("../Module/LogReport/LogReportModel");
const HotKeyViewDefine_1 = require("../Module/UiNavigation/HotKeyViewDefine");
class TsPureKeyHandle {
  constructor() {
    this.R$e = undefined;
    this.vDa = undefined;
    this.OnPressAnyKey = e => {
      if (Info_1.Info.IsBuildShipping) {
        ModelManager_1.ModelManager.PlatformModel.OnPressAnyKey(e);
        LogReportModel_1.LogReportModel.RecordOperateTime();
        this.vDa.PressAnyKey(e);
      } else {
        this.R$e.OnPressAnyKey(e);
      }
    };
    this.OnReleaseAnyKey = e => {
      if (Info_1.Info.IsBuildShipping) {
        this.vDa.ReleaseAnyKey(e);
      } else {
        this.R$e.OnReleaseAnyKey(e);
      }
    };
  }
  Initialize(e, i) {
    this.R$e = e;
    this.vDa = i;
  }
  Reset() {
    this.R$e = undefined;
    this.vDa = undefined;
  }
  BindKey() {
    cpp_1.FKuroInputInterface.RegisterKeyBinding(new UE.InputChord(new UE.Key(FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.ANY_KEY)), false, false, false, false), 0, this.R$e, this, this.OnPressAnyKey);
    cpp_1.FKuroInputInterface.RegisterKeyBinding(new UE.InputChord(new UE.Key(FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.ANY_KEY)), false, false, false, false), 1, this.R$e, this, this.OnReleaseAnyKey);
  }
}
exports.TsPureKeyHandle = TsPureKeyHandle;
//# sourceMappingURL=TsPureKeyHandle.js.map