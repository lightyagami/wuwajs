"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonIndexData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
class SkillButtonIndexData {
  constructor() {
    this.IsNormalButtonTypeList = false;
    this.ButtonTypeList = [];
    this.ButtonIndexConfig = undefined;
    this.ButtonIndexConfigId = -1;
    this.ButtonIndexIsDesktop = false;
    this.ButtonIndexTagIdList = [];
    this.ButtonIndexTagIdSet = new Set();
    this.ButtonIndexTypeList = [];
    this.ButtonTypeTagMap = new Map();
    this.MotorPadButtonTypeList = [];
    this.IsRoundJoystick = false;
    this.MotorPadButtonTypeTagMap = new Map();
    this.MotorJoystickPadButtonTypeTagMap = new Map();
  }
  RefreshSkillButtonIndex(t) {
    this.IsNormalButtonTypeList = false;
    var i;
    var s;
    var h = t.Entity.GetComponent(217);
    let o = 0;
    for (const e of this.ButtonIndexTagIdList) {
      let t = true;
      for (const r of e) {
        if (!h.HasTag(r)) {
          t = false;
          break;
        }
      }
      if (t) {
        this.ButtonTypeList = this.ButtonIndexTypeList[o];
        return;
      }
      o++;
    }
    for ([i, s] of this.ButtonTypeTagMap) {
      if (h.HasTag(i)) {
        this.ButtonTypeList = s;
        return;
      }
    }
    this.ButtonTypeList = this.ButtonIndexIsDesktop ? this.ButtonIndexConfig.DesktopButtonTypeList : this.ButtonIndexConfig.PadButtonTypeList;
    this.IsNormalButtonTypeList = true;
  }
  RefreshSkillButtonIndexByTag(t, i) {
    if (!this.IsNormalButtonTypeList || (this.IsNormalButtonTypeList = false, this.ButtonIndexTagIdSet.has(i))) {
      this.RefreshSkillButtonIndex(t);
    } else if (i = this.ButtonTypeTagMap.get(i)) {
      this.ButtonTypeList = i;
    } else {
      this.ButtonTypeList = this.ButtonIndexIsDesktop ? this.ButtonIndexConfig.DesktopButtonTypeList : this.ButtonIndexConfig.PadButtonTypeList;
      this.IsNormalButtonTypeList = true;
    }
  }
  UpdateSkillButtonIndexConfig(t, i) {
    if ((this.ButtonIndexConfigId !== t?.Id || this.ButtonIndexIsDesktop !== i) && (this.ButtonIndexConfig = t, this.ButtonIndexConfigId = this.ButtonIndexConfig?.Id ?? -1, this.ButtonIndexIsDesktop = i, this.ButtonIndexTagIdList.length = 0, this.ButtonIndexTagIdSet.clear(), this.ButtonIndexTypeList.length = 0, t)) {
      for (const r of t.TagList) {
        var s = [];
        for (const a of r.ArrayString) {
          var h = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a);
          if (h) {
            s.push(h);
            this.ButtonIndexTagIdSet.add(h);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 17, "技能按钮索引配置了不存在的Tag", ["tag", a], ["Id", this.ButtonIndexConfigId]);
          }
        }
        if (s.length === 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 17, "技能按钮索引组合Tag出现空元素，请确认改数组最后一个元素后面没有逗号", ["Id", this.ButtonIndexConfigId]);
          }
          break;
        }
        this.ButtonIndexTagIdList.push(s);
      }
      var o;
      var e;
      for (const n of i ? t.TagDesktopButtonTypeList : t.TagPadButtonTypeList) {
        this.ButtonIndexTypeList.push(n.ArrayInt);
      }
      if (this.ButtonIndexTagIdList.length !== this.ButtonIndexTypeList.length && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "技能按钮索引组合Tag和按钮索引数组的数量不匹配", ["Id", this.ButtonIndexConfigId], ["TagLength", this.ButtonIndexTagIdList.length], ["ButtonLength", this.ButtonIndexTypeList.length]);
      }
      this.ButtonTypeTagMap.clear();
      for ([o, e] of i ? t.DesktopButtonTypeMap : t.PadButtonTypeMap) {
        this.ButtonTypeTagMap.set(o, e.ArrayInt);
      }
    }
  }
  RefreshMotorPadSkillButtonIndex(t, i) {
    this.IsRoundJoystick = i;
    var s;
    var h;
    var o = t.Entity.GetComponent(217);
    for ([s, h] of this.IsRoundJoystick ? this.MotorJoystickPadButtonTypeTagMap : this.MotorPadButtonTypeTagMap) {
      if (o.HasTag(s)) {
        this.MotorPadButtonTypeList = h;
        return;
      }
    }
  }
  InitMotorPadSkillButtonIndexConfig() {
    if (this.ButtonIndexConfig) {
      this.MotorPadButtonTypeTagMap.clear();
      this.MotorJoystickPadButtonTypeTagMap.clear();
      for (var [t, i] of this.ButtonIndexConfig.MotorPadButtonTypeMap) {
        this.MotorPadButtonTypeTagMap.set(t, i.ArrayInt);
      }
      for (var [s, h] of this.ButtonIndexConfig.MotorJoystickPadButtonTypeMap) {
        this.MotorJoystickPadButtonTypeTagMap.set(s, h.ArrayInt);
      }
    }
  }
}
exports.SkillButtonIndexData = SkillButtonIndexData;
//# sourceMappingURL=SkillButtonIndexData.js.map