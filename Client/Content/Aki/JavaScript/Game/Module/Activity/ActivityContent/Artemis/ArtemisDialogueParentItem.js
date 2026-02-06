"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisDialogueParentItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ArtemisChatLeftItem_1 = require("./ArtemisChatLeftItem");
const ArtemisChatRightItem_1 = require("./ArtemisChatRightItem");
class ArtemisDialogueParentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.yef = 0;
    this.Sef = 0;
    this.Mef = [];
    this.Eef = [];
    this.JYf = [];
    this.WaitCallback = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnBeforeShow() {
    this.GetItem(0)?.SetUIActive(false);
    this.GetItem(1)?.SetUIActive(false);
  }
  RefreshChatUiItem(t, i, e) {
    this.RefreshChatUiItemAsync(t, i, e);
  }
  async RefreshChatUiItemAsync(t, i, e) {
    this.yef = 0;
    this.Sef = 0;
    this.JYf.length = 0;
    this.Ief();
    var s;
    var h;
    var a;
    var r = [];
    for (const n of t) {
      if (n > 0 && (s = ConfigManager_1.ConfigManager.ArtemisActivityConfig.GetArtemisChatConfigById(n))) {
        h = i ? s.LockChatContent : s.ChatContent;
        a = i ? s.LockChatTexture : s.ChatTexture;
        r.push(this.AddDialogueItem(s.IsLeft, {
          Content: h,
          PicturePath: a,
          IsLock: i,
          IsShowEffect: e
        }));
      }
    }
    await Promise.all(r);
    this.WaitCallback?.();
  }
  async AddDialogueItem(t, i) {
    if (t) {
      this.yef++;
      await this.Tef(i);
    } else {
      this.Sef++;
      await this.bef(i);
    }
  }
  Ief() {
    if (this.Mef?.length > 0) {
      for (const t of this.Mef) {
        t?.SetUiActive(false);
      }
    }
    if (this.Eef?.length > 0) {
      for (const i of this.Eef) {
        i?.SetUiActive(false);
      }
    }
  }
  GetFirstItem() {
    if (this.JYf?.length > 0) {
      return this.JYf[0];
    }
  }
  GetLastItem() {
    if (this.JYf?.length > 0) {
      return this.JYf[this.JYf?.length - 1];
    }
  }
  async Tef(t) {
    var i;
    var e;
    if (t) {
      if (this.yef >= this.Mef?.length) {
        if (e = this.GetItem(0)) {
          i = new ArtemisChatLeftItem_1.ArtemisChatLeftItem();
          e = LguiUtil_1.LguiUtil.CopyItem(e, this.RootItem);
          this.Mef.push(i);
          this.JYf.push(e);
          await i.CreateThenShowByActorAsync(e.GetOwner());
          i.SetContent(t);
        }
      } else {
        (e = this.Mef[this.yef])?.SetUiActive(true);
        e?.SetContent(t);
        this.JYf?.push(e?.GetRootItem());
      }
    }
  }
  async bef(t) {
    var i;
    var e;
    if (this.Sef >= this.Eef?.length) {
      if (e = this.GetItem(1)) {
        i = new ArtemisChatRightItem_1.ArtemisChatRightItem();
        e = LguiUtil_1.LguiUtil.CopyItem(e, this.RootItem);
        this.Eef.push(i);
        this.JYf.push(e);
        await i.CreateThenShowByActorAsync(e.GetOwner());
        i.SetContent(t);
      }
    } else {
      (e = this.Eef[this.Sef])?.SetUiActive(true);
      e?.SetContent(t);
      this.JYf?.push(e?.GetRootItem());
    }
  }
  LeftPlayFixDoneLevelSequence() {
    if (this.Mef?.length > 0) {
      for (const t of this.Mef) {
        if (t?.GetActive()) {
          t.PlayFixDoneLevelSequence();
        }
      }
    }
  }
}
exports.ArtemisDialogueParentItem = ArtemisDialogueParentItem;
//# sourceMappingURL=ArtemisDialogueParentItem.js.map