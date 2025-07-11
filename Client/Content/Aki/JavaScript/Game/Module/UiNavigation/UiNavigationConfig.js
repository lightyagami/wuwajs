"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const HotKeyIconByKeyName_1 = require("../../../Core/Define/ConfigQuery/HotKeyIconByKeyName");
const HotKeyMapById_1 = require("../../../Core/Define/ConfigQuery/HotKeyMapById");
const HotKeyTextByTextId_1 = require("../../../Core/Define/ConfigQuery/HotKeyTextByTextId");
const HotKeyTypeById_1 = require("../../../Core/Define/ConfigQuery/HotKeyTypeById");
const HotKeyViewById_1 = require("../../../Core/Define/ConfigQuery/HotKeyViewById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class UiNavigationConfig extends ConfigBase_1.ConfigBase {
  GetHighlightWhenMouseMoveOut() {
    var e = CommonParamById_1.configCommonParamById.GetBoolConfig("highlight_when_mouse_moveout");
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiNavigation", 10, "鼠标移出button表现参数找不到, 请检测c.参数字段\"highlight_when_mouse_moveout\"");
    }
    return e;
  }
  GetMobileHighlight() {
    var e = CommonParamById_1.configCommonParamById.GetBoolConfig("mobile_highlight");
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiNavigation", 10, "移动端是否显示按钮高亮参数找不到, 请检测c.参数字段\"mobile_highlight\"");
    }
    return e;
  }
  GetPcPress() {
    var e = CommonParamById_1.configCommonParamById.GetBoolConfig("pc_press");
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiNavigation", 10, "PC端是否显示按钮按下参数找不到, 请检测c.参数字段\"pc_press\"");
    }
    return e;
  }
  GetNavigateTolerance() {
    var e = CommonParamById_1.configCommonParamById.GetFloatConfig("navigate_tolerance");
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiNavigation", 10, "导航组同向误差找不到, 请检测c.参数字段\"navigate_tolerance\"");
    }
    return e;
  }
  GetHotKeyViewConfig(e) {
    var o = HotKeyViewById_1.configHotKeyViewById.GetConfig(e);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "热键界面配置找不到", ["id", e]);
      }
    }
    return o;
  }
  GetHotKeyMapConfig(e) {
    var o;
    if (e !== -1) {
      if (!(o = HotKeyMapById_1.configHotKeyMapById.GetConfig(e)) && e !== -1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiNavigation", 10, "热键映射配置找不到", ["id", e]);
        }
      }
      return o;
    }
  }
  GetHotKeyTypeConfig(e) {
    return HotKeyTypeById_1.configHotKeyTypeById.GetConfig(e);
  }
  GetHotKeyIconConfig(e, o = 0) {
    var i = HotKeyIconByKeyName_1.configHotKeyIconByKeyName.GetConfig(e);
    if (!i) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiNavigation", 10, "快捷键图标配置找不到", ["keyName", e]);
      }
    }
    return i;
  }
  GetHotKeyText(e) {
    var o = HotKeyTextByTextId_1.configHotKeyTextByTextId.GetConfig(e);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "快捷键文本配置找不到", ["TextId", e]);
      }
    }
    return o?.Name;
  }
  GetHotKeyIcon(e, o = false) {
    return this.GetHotKeyIconConfig(e, o)?.Icon;
  }
}
exports.UiNavigationConfig = UiNavigationConfig;
//# sourceMappingURL=UiNavigationConfig.js.map