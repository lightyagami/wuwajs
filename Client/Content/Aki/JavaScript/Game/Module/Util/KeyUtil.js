"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyUtil = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
class KeyUtil {
  static GetActionMappingByName(t) {
    var e = UE.InputSettings.GetInputSettings();
    var r = (0, puerts_1.$ref)(undefined);
    e.GetActionMappingByName(FNameUtil_1.FNameUtil.GetDynamicFName(t), r);
    var e = (0, puerts_1.$unref)(r);
    return e;
  }
  static GetAxisMappingByName(t) {
    var e = UE.InputSettings.GetInputSettings();
    var r = (0, puerts_1.$ref)(undefined);
    e.GetAxisMappingByName(FNameUtil_1.FNameUtil.GetDynamicFName(t), r);
    var e = (0, puerts_1.$unref)(r);
    return e;
  }
  static GetKeyName(t) {
    t = this.GetKeyNames(t);
    if (t) {
      return t[0];
    }
  }
  static GetKeyNames(e) {
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      let t = this.GetKeyNameByAction(e);
      return t = t?.length ? t : this.GetKeyNameByAxis(e);
    }
  }
  static GetKeyNameByAction(t) {
    var e = KeyUtil.GetActionMappingByName(t);
    if (e.Num() !== 0) {
      var r = [];
      for (let t = 0; t < e.Num(); t++) {
        var i;
        var a;
        var s = e.Get(t).Key;
        if (Info_1.Info.IsInKeyBoard()) {
          i = UE.KismetInputLibrary.Key_IsKeyboardKey(s);
          a = UE.KismetInputLibrary.Key_IsMouseButton(s);
          if (i || a) {
            r.push(s.KeyName.toString());
          }
        } else if (Info_1.Info.IsInGamepad() && UE.KismetInputLibrary.Key_IsGamepadKey(s)) {
          r.push(s.KeyName.toString());
        }
      }
      return r;
    }
  }
  static GetKeyNameByAxis(t) {
    var e = KeyUtil.GetAxisMappingByName(t);
    if (e.Num() !== 0) {
      var r = [];
      for (let t = 0; t < e.Num(); t++) {
        var i;
        var a;
        var s;
        var U = e.Get(t).Key;
        if (Info_1.Info.IsInKeyBoard()) {
          a = UE.KismetInputLibrary.Key_IsAxis1D(U) || UE.KismetInputLibrary.Key_IsAxis2D(U) || UE.KismetInputLibrary.Key_IsAxis3D(U);
          s = UE.KismetInputLibrary.Key_IsKeyboardKey(U);
          i = UE.KismetInputLibrary.Key_IsMouseButton(U);
          if (a && (s || i) || s || i) {
            r.push(U.KeyName.toString());
          }
        } else if (Info_1.Info.IsInGamepad() && (a = UE.KismetInputLibrary.Key_IsAxis1D(U) || UE.KismetInputLibrary.Key_IsAxis2D(U) || UE.KismetInputLibrary.Key_IsAxis3D(U), s = UE.KismetInputLibrary.Key_IsGamepadKey(U), a && s || s)) {
          r.push(U.KeyName.toString());
        }
      }
      return r;
    }
  }
  static GetPcKeyNameByAction(t) {
    if (Info_1.Info.IsInKeyBoard()) {
      var e = KeyUtil.GetActionMappingByName(t);
      if (e.Num() !== 0) {
        var t = [];
        var r = [];
        var i = [];
        for (let t = 0; t < e.Num(); t++) {
          var a = e.Get(t).Key;
          var s = UE.KismetInputLibrary.Key_IsKeyboardKey(a);
          var U = UE.KismetInputLibrary.Key_IsMouseButton(a);
          if (s) {
            r.push(a.KeyName.toString());
          } else if (U) {
            i.push(a.KeyName.toString());
          }
        }
        t.push(r, i);
        return t;
      }
    }
  }
}
exports.KeyUtil = KeyUtil;
//# sourceMappingURL=KeyUtil.js.map