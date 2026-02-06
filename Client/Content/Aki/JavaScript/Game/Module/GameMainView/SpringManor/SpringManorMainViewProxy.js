"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorMainViewProxy = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const GameMainViewProxy_1 = require("../GameMainViewProxy");
const SpringManorMainHudPanel_1 = require("./ChildPanel/SpringManorMainHudPanel");
const SpringManorSkillPanel_1 = require("./ChildPanel/SpringManorSkillPanel");
class SpringManorMainViewProxy extends GameMainViewProxy_1.GameMainViewProxy {
  constructor() {
    super(...arguments);
    this.MainHudPanel = undefined;
    this.MobileSkillPanel = undefined;
    this.DesktopSkillPanel = undefined;
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.Ppg(), this.Apg(), this.Dpg()]);
  }
  async Ppg() {
    this.MainHudPanel = await this.CreateChildPanel("UiView_Spring26Hud", this.View.GetContentPanel(), SpringManorMainHudPanel_1.SpringManorMainHudPanel, true, true, 43);
  }
  async Apg() {
    if (!!Info_1.Info.IsInTouch() && !this.MobileSkillPanel) {
      await this.nXc();
    }
  }
  async Dpg() {
    if (!Info_1.Info.IsInTouch() && !this.DesktopSkillPanel) {
      await this.sXc();
    }
  }
  async nXc() {
    this.MobileSkillPanel = await this.CreateChildPanel("UiItem_Spring26HudBtn", this.View.GetContentPanel(), SpringManorSkillPanel_1.SpringManorSkillPanel, true, true, 36);
  }
  async sXc() {
    this.DesktopSkillPanel = await this.CreateChildPanel("UiItem_Spring26HudBtn", this.View.GetContentPanel(), SpringManorSkillPanel_1.SpringManorSkillPanel, true, true, 35);
  }
}
exports.SpringManorMainViewProxy = SpringManorMainViewProxy;
//# sourceMappingURL=SpringManorMainViewProxy.js.map