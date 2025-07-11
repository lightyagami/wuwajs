"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardBackpackGrid = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const FishingDefine_1 = require("../../FishingDefine");
class DockyardBackpackGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super();
    this.x$l = undefined;
    this.A$l = undefined;
    this.R$l = undefined;
    this.P$l = 0;
    this.i0o = undefined;
    this.kzl = undefined;
    this.$pt = undefined;
    this.Yx_ = undefined;
    this.w$l = () => {
      var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(FishingDefine_1.DISABLE_SPRITE);
      this.SetSpriteByPath(i, this.i0o, false);
      this.i0o.SetUIActive(true);
    };
    this.U$l = () => {
      var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(FishingDefine_1.EMPTY_SPRITE);
      this.SetSpriteByPath(i, this.i0o, false);
      this.i0o.SetUIActive(true);
    };
    this.D$l = () => {
      var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(FishingDefine_1.PREVIEW_SPRITE);
      this.SetSpriteByPath(i, this.i0o, false);
      this.i0o.SetUIActive(true);
    };
    this.B$l = () => {
      var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(FishingDefine_1.SINGLE_OCCUPANCY_SPRITE);
      this.SetSpriteByPath(i, this.i0o, false);
      this.i0o.SetUIActive(true);
    };
    this.q$l = () => {
      var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(FishingDefine_1.MULTI_OCCUPANCY_SPRITE);
      this.SetSpriteByPath(i, this.i0o, false);
      this.i0o.SetUIActive(true);
    };
    this.k$l = () => {
      var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(FishingDefine_1.PROHIBIT_SPRITE);
      this.SetSpriteByPath(i, this.i0o, false);
      this.i0o.SetUIActive(true);
    };
    this.O$l = () => {
      var i = this.R$l.GetPreviewBackpackData(this.A$l);
      var i = this.R$l.BackpackData.GetItemBlockData(i);
      var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingQualityConfig(i.Data.Quality);
      this.SetSpriteByPath(i.GridSprite, this.i0o, false);
      this.i0o.SetUIActive(true);
    };
    this.N$l = {
      [0]: undefined,
      1: this.w$l,
      2: this.U$l,
      3: this.D$l,
      4: this.B$l,
      5: this.q$l,
      6: this.k$l,
      7: this.O$l
    };
    this.R$l = i;
  }
  set ShowType(i) {
    if (this.P$l !== i) {
      this.P$l = i;
      this.N$l[i]();
    }
  }
  get ShowType() {
    return this.P$l;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite]];
  }
  OnStart() {
    this.i0o = this.GetSprite(0);
    this.kzl = this.GetSprite(1);
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.kzl);
    this.Yx_ = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.SetSpriteMaskActive(false);
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
    this.Yx_.Clear();
  }
  G$l() {
    this.kzl.SetColor(UE.Color.FromHex("#DAC8AC"));
    this.kzl.SetUIActive(true);
    if (!this.$pt.IsSequenceInPlaying("Activate")) {
      this.$pt.PlaySequencePurely("Activate");
    }
  }
  F$l() {
    this.kzl.SetColor(UE.Color.FromHex("#F88D99"));
    this.kzl.SetUIActive(true);
    if (!this.$pt.IsSequenceInPlaying("Activate")) {
      this.$pt.PlaySequencePurely("Activate");
    }
  }
  BJl() {
    this.kzl.SetUIActive(this.x$l.IsQuicklySell);
    this.$pt.StopSequenceByKey("Activate", true, true);
    if (this.x$l.IsQuicklySell) {
      this.kzl.SetColor(UE.Color.FromHex("#FFFFFF"));
    }
  }
  InDisable() {
    return !this.x$l.IsValid;
  }
  IsQuicklySell() {
    return this.x$l.IsQuicklySell;
  }
  Refresh(i) {
    this.A$l = i;
    this.x$l = this.R$l.BackpackData.GetBackpackGridData(i);
    this.kzl.SetUIActive(this.x$l.IsQuicklySell);
    this.ShowType = this.InDisable() ? 1 : 2;
  }
  RefreshPreview(i, t) {
    if (this.InDisable()) {
      this.ShowType = 6;
    } else {
      if (this.R$l.IsInSelectState) {
        this.SetSpriteMaskActive(false);
      }
      if (t === 3) {
        this.R$l.SetPreviewBackpackData(this.A$l, i);
        this.ShowType = 3;
      } else if (t === 7) {
        this.R$l.SetPreviewBackpackData(this.A$l, i);
        this.ShowType = 7;
      } else {
        this.ShowType = t;
      }
    }
  }
  RefreshQuicklySell(i) {
    if (i === 1) {
      this.G$l();
    } else if (i === 2) {
      this.F$l();
    } else if (i === 0) {
      this.BJl();
    }
  }
  ResetQuicklySell() {
    this.RefreshQuicklySell(0);
  }
  ResetPreviewBgForce() {
    if (this.InDisable()) {
      this.ShowType = 1;
    } else {
      this.R$l.SetPreviewBackpackData(this.A$l, FishingDefine_1.UNVALID_ITEM_BLOCK_ID);
      this.ShowType = 2;
    }
  }
  ResetPreviewBg(i) {
    var t;
    if (this.InDisable()) {
      this.ShowType = 1;
    } else if ((t = this.R$l.GetPreviewBackpackData(this.A$l)) === i || t === FishingDefine_1.UNVALID_ITEM_BLOCK_ID) {
      this.R$l.SetPreviewBackpackData(this.A$l, FishingDefine_1.UNVALID_ITEM_BLOCK_ID);
      this.ShowType = 2;
      this.SetSpriteMaskActive(false);
    } else {
      this.ShowType = 7;
      this.SetSpriteMaskActive(this.R$l.IsInSelectState);
    }
  }
  SetItemBlockId(i) {
    this.R$l.SetPreviewBackpackData(this.A$l, i);
  }
  GetItemBlockId() {
    return this.R$l.GetPreviewBackpackData(this.A$l);
  }
  GetKey(i, t) {
    return i;
  }
  SetSpriteMaskActive(i) {
    this.GetSprite(2).SetUIActive(i);
  }
  PlaySequence(i) {
    this.Yx_.StopPrevSequence(false, true);
    this.Yx_.PlaySequencePurely(i);
  }
}
exports.DockyardBackpackGrid = DockyardBackpackGrid;
//# sourceMappingURL=DockyardBackpackGrid.js.map