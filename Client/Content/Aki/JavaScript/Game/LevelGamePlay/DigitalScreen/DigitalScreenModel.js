"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DigitalScreenModel = undefined;
const DigitalScreenById_1 = require("../../../Core/Define/ConfigQuery/DigitalScreenById");
const DigitalScreenTextById_1 = require("../../../Core/Define/ConfigQuery/DigitalScreenTextById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class DigitalScreenModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ExistTime = 0;
    this.BackgroundPicture = "";
    this.LogoIcon = "";
    this.TextFactor = 0;
    this.StartTimes = [];
    this.Lga = [];
    this.DelayTimes = [];
    this.DuringTimes = [];
    this.TextLength = [];
    this.Font = [];
    this.ContentPos = [];
    this.During = 0;
    this.Text = "";
    this.ViewType = 0;
    this.Size = 0;
  }
  InitDigitalScreen(i) {
    this.StartTimes = [];
    this.Lga = [];
    this.DelayTimes = [];
    this.DuringTimes = [];
    this.TextLength = [];
    this.Font = [];
    this.ContentPos = [];
    this.During = 0;
    this.Text = "";
    i = DigitalScreenById_1.configDigitalScreenById.GetConfig(i);
    this.ExistTime = i.ExistTime;
    this.TextFactor = i.TextFactor;
    this.BackgroundPicture = i.BackgroundPicture;
    this.LogoIcon = i.LogoIconPath;
    this.ViewType = i.Prefab;
    i = i.TextId;
    if (i === undefined) {
      return false;
    }
    this.Size = i.length;
    for (const s of i) {
      var t = DigitalScreenTextById_1.configDigitalScreenTextById.GetConfig(s);
      this.StartTimes.push(t.ShowStartFrame);
      this.Lga.push(t.ShowEndFrame);
      var e = t.ShowEndFrame - t.ShowStartFrame;
      this.During += e >= 0 ? e : 1;
      this.DuringTimes.push(e >= 0 ? e : 1);
      var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.TextContentId);
      this.Text += e;
      var e = e.length === 0 ? 1 : e.length;
      this.TextLength.push(e);
      var e = t.FontSize === 0 ? 12 : t.FontSize;
      this.Font.push(e);
      this.ContentPos.push(t.Alignment);
    }
    for (let i = 0; i < this.StartTimes.length - 1; i++) {
      if (this.Lga[i] < this.StartTimes[i + 1]) {
        this.DelayTimes.push(this.StartTimes[i + 1] - this.Lga[i]);
      } else {
        this.DelayTimes.push(0);
      }
    }
    return true;
  }
  GetDataConfig(i) {
    return DigitalScreenById_1.configDigitalScreenById.GetConfig(i);
  }
}
exports.DigitalScreenModel = DigitalScreenModel;
//# sourceMappingURL=DigitalScreenModel.js.map