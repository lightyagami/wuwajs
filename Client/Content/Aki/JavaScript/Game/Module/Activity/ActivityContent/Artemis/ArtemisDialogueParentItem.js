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
    this.Bzm = 0;
    this.kzm = 0;
    this.qzm = [];
    this.Ozm = [];
    this.G8f = [];
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
    this.Bzm = 0;
    this.kzm = 0;
    this.G8f.length = 0;
    this.Gzm();
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
      this.Bzm++;
      await this.Fzm(i);
    } else {
      this.kzm++;
      await this.Nzm(i);
    }
  }
  Gzm() {
    if (this.qzm?.length > 0) {
      for (const t of this.qzm) {
        t?.SetUiActive(false);
      }
    }
    if (this.Ozm?.length > 0) {
      for (const i of this.Ozm) {
        i?.SetUiActive(false);
      }
    }
  }
  GetFirstItem() {
    if (this.G8f?.length > 0) {
      return this.G8f[0];
    }
  }
  GetLastItem() {
    if (this.G8f?.length > 0) {
      return this.G8f[this.G8f?.length - 1];
    }
  }
  async Fzm(t) {
    var i;
    var e;
    if (t) {
      if (this.Bzm >= this.qzm?.length) {
        if (e = this.GetItem(0)) {
          i = new ArtemisChatLeftItem_1.ArtemisChatLeftItem();
          e = LguiUtil_1.LguiUtil.CopyItem(e, this.RootItem);
          this.qzm.push(i);
          this.G8f.push(e);
          await i.CreateThenShowByActorAsync(e.GetOwner());
          i.SetContent(t);
        }
      } else {
        (e = this.qzm[this.Bzm])?.SetUiActive(true);
        e?.SetContent(t);
        this.G8f?.push(e?.GetRootItem());
      }
    }
  }
  async Nzm(t) {
    var i;
    var e;
    if (this.kzm >= this.Ozm?.length) {
      if (e = this.GetItem(1)) {
        i = new ArtemisChatRightItem_1.ArtemisChatRightItem();
        e = LguiUtil_1.LguiUtil.CopyItem(e, this.RootItem);
        this.Ozm.push(i);
        this.G8f.push(e);
        await i.CreateThenShowByActorAsync(e.GetOwner());
        i.SetContent(t);
      }
    } else {
      (e = this.Ozm[this.kzm])?.SetUiActive(true);
      e?.SetContent(t);
      this.G8f?.push(e?.GetRootItem());
    }
  }
  LeftPlayFixDoneLevelSequence() {
    if (this.qzm?.length > 0) {
      for (const t of this.qzm) {
        if (t?.GetActive()) {
          t.PlayFixDoneLevelSequence();
        }
      }
    }
  }
}
exports.ArtemisDialogueParentItem = ArtemisDialogueParentItem;
//# sourceMappingURL=ArtemisDialogueParentItem.js.map