"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailParamHandlerMapDefine = undefined;
exports.mailParamHandlerMapDefine = new Map([["iconId", {
  Handler: (e, a) => {
    a = Number(a);
    if (!isNaN(a)) {
      e.SetShowSubIconId(a);
    }
  }
}], ["color", {
  Handler: (e, a) => {
    a = a.startsWith("#") ? a.substring(1) : a;
    e.SetShowSubContentColor(a);
  }
}], ["jumpId", {
  Handler: (e, a) => {
    a = Number(a);
    if (!isNaN(a)) {
      e.SetShowSubContentJumpId(a);
    }
  }
}], ["url", {
  Handler: (e, a) => {
    e.SetSubUrl(a);
  }
}], ["showNewMail", {
  Handler: e => {
    e.SetIfShowNewMail(true);
  }
}], ["useDefaultBrowser", {
  Handler: e => {
    e.SetUseDefaultBrowser(true);
  }
}], ["isWenjuanxing", {
  Handler: (e, a) => {
    a = Number(a);
    if (!isNaN(a)) {
      e.SetIsQuestion(a === 1);
    }
  }
}], ["wenjuanId", {
  Handler: (e, a) => {
    e.SetQuestionActiveId(a);
  }
}], ["wenjuanTitle", {
  Handler: (e, a) => {
    e.SetSubTitle(a);
  }
}], ["subTitle", {
  Handler: (e, a) => {
    e.SetSubTitle(a);
  }
}], ["wenjuanPass", {
  Handler: (e, a) => {
    e.SetQuestionPass(a);
  }
}], ["is_orientation", {
  Handler: (e, a) => {
    e.SetIfLandscape(a === "landscape");
  }
}], ["needPlayerInfo", {
  Handler: e => {
    e.SetNeedPlayerInfo(true);
  }
}]]); //# sourceMappingURL=MailParamHandlerDefine.js.map