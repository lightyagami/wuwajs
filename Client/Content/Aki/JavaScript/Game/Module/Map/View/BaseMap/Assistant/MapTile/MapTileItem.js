"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapTileItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const HD_TEXTURE_NAME = new UE.FName("HDTexture");
const HD_SCALAR_NAME = new UE.FName("UseHDPicture");
class MapTileItem {
  constructor(e) {
    this.Param = e;
    this.IsStreaming = true;
    this.IsVisible = false;
    this.Y__ = undefined;
    this.z__ = undefined;
    this.X__ = undefined;
    this.MUe = ResourceSystem_1.ResourceSystem.InvalidId;
    this.OLm = e => {
      this.MUe = ResourceSystem_1.ResourceSystem.InvalidId;
      this.Y__.LoadMapTileCallBack(e);
    };
    this.Y__ = e;
    this.z__ = Vector_1.Vector.Create(e.AnchorOffset.X, e.AnchorOffset.Y, 0);
    e = e.MapTile;
    this.X__ = Vector2D_1.Vector2D.Create(e.GetWidth() * 2, e.GetHeight() * 2);
  }
  OnLoad() {
    const t = this.Y__.AssetData;
    var e = this.Y__.MapType;
    const s = this.Y__.TileX;
    const i = this.Y__.TileY;
    const o = this.Y__.MapTile;
    var r = this.Y__.FogDefaultColor;
    const h = this.Y__.MapId;
    if (t && !StringUtils_1.StringUtils.IsEmpty(t.MapTilePath)) {
      this.MUe = ResourceSystem_1.ResourceSystem.LoadAsync(t.MapTilePath, UE.Texture, this.OLm, 102, "Ui.MapUi");
      if (Info_1.Info.IsPcOrGamepadPlatform() && !StringUtils_1.StringUtils.IsEmpty(t.HdMapTilePath) && e === 2) {
        this.MUe = ResourceSystem_1.ResourceSystem.LoadAsync(t.HdMapTilePath, UE.Texture, e => {
          if (e === undefined && Log_1.Log.CheckError()) {
            Log_1.Log.Error("Map", 63, "[地图系统]->loadHdCallback 高清切块贴图为空", ["MapId", h], ["TileX", s], ["TileY", i], ["assetData", t]);
          }
          o.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 1);
          o.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, e);
        }, 102, "Ui.MapUi");
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 63, "[地图系统]->切块贴图为空", ["MapId", h], ["TileX", s], ["TileY", i]);
      }
      o.SetTexture(undefined);
      o.SetColor(r);
    }
  }
  OnUnload() {
    var e = this.Y__.MapTile;
    var t = this.Y__.FogDefaultColor;
    e.SetTexture(undefined);
    e.SetColor(t);
  }
  GetPreloadThreshold() {
    return this.X__;
  }
  GetUiPosition() {
    return this.z__;
  }
  ReleaseLoadHandle() {
    if (this.MUe !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.MUe);
      this.MUe = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
}
exports.MapTileItem = MapTileItem;
//# sourceMappingURL=MapTileItem.js.map