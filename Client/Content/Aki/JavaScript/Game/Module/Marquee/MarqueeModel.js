"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarqueeModel = exports.MarqueeStorageData = exports.MarqueeDatas = exports.MarqueeData = exports.MarqueeContent = exports.MarqueeDataEx = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Json_1 = require("../../../Core/Common/Json");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const MARQUEEPLATFORMPC = 1;
const MARQUEEPLATFORMIOS = 2;
const MARQUEEPLATFORMANDROID = 3;
class MarqueeDataEx extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.contents = undefined;
    this.timeInterval = 0;
    this.times = 0;
    this.startTimeMs = -0;
    this.endTimeMs = -0;
    this.whiteList = undefined;
    this.platform = undefined;
    this.channel = undefined;
  }
}
exports.MarqueeDataEx = MarqueeDataEx;
class MarqueeContent {
  constructor() {
    this.language = "";
    this.content = "";
  }
}
exports.MarqueeContent = MarqueeContent;
class MarqueeData {
  constructor() {
    this.Id = "";
    this.WhiteLists = undefined;
    this.ModifyTime = -0;
    this.Content = "";
    this.Contents = undefined;
    this.BeginTime = -0;
    this.EndTime = -0;
    this.ScrollInterval = 0;
    this.ScrollTimes = 0;
    this.ShowInFight = 0;
    this.ShowInPhotograph = 0;
    this.Platform = undefined;
    this.Channel = undefined;
    this.IsClientMarquee = false;
    this.LocalTextKey = "";
    this.UseLocalTextKey = false;
  }
  RefreshContent() {
    if (this.Contents) {
      let e = undefined;
      for (const t of this.Contents.values()) {
        if (t.language === LanguageSystem_1.LanguageSystem.PackageLanguage) {
          e = t;
          break;
        }
      }
      if (e) {
        this.Content = e.content;
      }
      if (!this.Content) {
        if (this.Contents && this.Contents.length > 0) {
          this.Content = this.Contents[0].content;
        } else {
          this.Content = "";
        }
      }
    }
  }
  Phrase(e) {
    this.Id = e.id.toString();
    this.EndTime = e.endTimeMs / 1000;
    this.BeginTime = e.startTimeMs / 1000;
    this.WhiteLists = e.whiteList;
    this.ScrollInterval = e.timeInterval;
    this.ScrollTimes = e.times;
    this.Contents = e.contents;
    this.RefreshContent();
    this.Platform = e.platform;
    this.Channel = e.channel;
  }
  CheckPlatformAndChannelIfShow() {
    let e = "";
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      e = ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId();
    }
    if (this.Channel && this.Channel.length > 0 && !this.Channel.includes(e)) {
      return false;
    }
    let t = MARQUEEPLATFORMPC;
    if (Info_1.Info.PlatformType === 2) {
      t = MARQUEEPLATFORMIOS;
    } else if (Info_1.Info.PlatformType === 1) {
      t = MARQUEEPLATFORMANDROID;
    }
    return !this.Platform || !(this.Platform.length > 0) || !!this.Platform.includes(t);
  }
}
exports.MarqueeData = MarqueeData;
class MarqueeDatas {
  constructor() {
    this.MarqueeDataArray = undefined;
  }
}
exports.MarqueeDatas = MarqueeDatas;
class MarqueeStorageData {
  constructor(e) {
    this.ScrollingTime = 0;
    this.EndTime = 0;
    this.EndTime = e;
  }
}
exports.MarqueeStorageData = MarqueeStorageData;
class MarqueeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.$Ai = undefined;
    this.YAi = new Array();
    this.$Rl = new Map();
    this.XRl = new Map();
  }
  static get TimerId() {
    return MarqueeModel.zAi;
  }
  static set TimerId(e) {
    MarqueeModel.zAi = e;
  }
  get CurMarquee() {
    return this.$Ai;
  }
  set CurMarquee(e) {
    this.$Ai = e;
  }
  get MarqueeQueue() {
    return this.YAi;
  }
  OnClear() {
    this.RemoveAllMarqueeData();
    this.$Rl.clear();
    this.XRl.clear();
    if (MarqueeModel.TimerId !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(MarqueeModel.TimerId);
      MarqueeModel.TimerId = undefined;
    }
    return true;
  }
  InitMarqueeStorageDataMap() {
    this.$Rl = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MarqueeScrollingMap) ?? new Map();
  }
  AddOrUpdateMarqueeDate(r) {
    if (r.IsClientMarquee || r.CheckPlatformAndChannelIfShow()) {
      var e = TimeUtil_1.TimeUtil.GetServerTime();
      if (!(r.EndTime <= e)) {
        var t = this.GetScrollingTime(r);
        if (!(t >= r.ScrollTimes)) {
          let t = -1;
          for (let e = 0; e < this.YAi.length; e++) {
            if (this.YAi[e].Id === r.Id) {
              t = e;
            }
          }
          if (t >= 0) {
            this.YAi[t] = r;
            if (t === 0) {
              this.$Ai = r;
            }
          } else {
            this.YAi.push(r);
          }
          this.ZAi(r);
          this.CleanMarqueeStorageDataMap(e);
          this.ePi();
        }
      }
    }
  }
  CleanMarqueeStorageDataMap(e) {
    var t;
    var r;
    var i;
    var s;
    var a = new Array();
    for ([t, r] of this.$Rl) {
      if (r.EndTime <= e) {
        a.push(t);
      }
    }
    for (const o of a) {
      this.$Rl.delete(o);
    }
    a.length = 0;
    for ([i, s] of this.XRl) {
      if (s.EndTime <= e) {
        a.push(i);
      }
    }
    for (const h of a) {
      this.XRl.delete(h);
    }
  }
  UpdateMarqueeStorageDataByDate(e) {
    let t = this.GetMarqueeStorageData(e);
    (t = t || this.ZAi(e)).ScrollingTime++;
    this.ePi();
  }
  GetScrollingTime(e) {
    return this.GetMarqueeStorageData(e)?.ScrollingTime ?? 0;
  }
  GetMarqueeStorageData(e) {
    return (e.IsClientMarquee ? this.XRl : this.$Rl).get(e.Id);
  }
  ZAi(e) {
    let t = this.GetMarqueeStorageData(e);
    if (t) {
      t.EndTime = e.EndTime;
    } else {
      t = new MarqueeStorageData(e.EndTime);
      (e.IsClientMarquee ? this.XRl : this.$Rl).set(e.Id, t);
    }
    return t;
  }
  ePi() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MarqueeScrollingMap, this.$Rl);
  }
  PeekMarqueeData() {
    if (this.YAi && !(this.YAi.length <= 0)) {
      return this.YAi[0];
    }
  }
  GetNextMarquee() {
    if (this.YAi && !(this.YAi.length <= 1)) {
      return this.YAi[1];
    }
  }
  RemoveMarqueeData(t) {
    for (let e = 0; e < this.YAi.length; e++) {
      var r = this.YAi[e];
      if (r.Id === t) {
        this.YAi.splice(e, 1);
        return r;
      }
    }
  }
  RemoveAllMarqueeData() {
    this.$Ai = undefined;
    this.YAi = new Array();
  }
  RemoveServerMarqueeData() {
    this.$Ai = undefined;
    var e = this.YAi.filter(e => e.IsClientMarquee);
    this.YAi = e;
  }
  SortMarqueeQueue() {
    this.YAi?.sort((e, t) => e.BeginTime - t.BeginTime);
  }
  GetMarqueeDataLeftTime(e) {
    let t = Number(e.EndTime) - TimeUtil_1.TimeUtil.GetServerTime();
    return t = t <= 0 ? 1 : t;
  }
}
(exports.MarqueeModel = MarqueeModel).zAi = undefined;
//# sourceMappingURL=MarqueeModel.js.map