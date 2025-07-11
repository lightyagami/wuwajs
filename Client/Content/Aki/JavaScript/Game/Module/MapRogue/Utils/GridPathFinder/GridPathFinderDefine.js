"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backTrace = exports.calculateHeuristic = exports.Grids = exports.Node = undefined;
class Node {
  constructor(t) {
    this.Id = 0;
    this.Position = {
      X: 0,
      Y: 0
    };
    this.F = 0;
    this.G = 0;
    this.H = 0;
    this.Cost = 0;
    this.ParentNode = undefined;
    this.IsOnClosedList = false;
    this.IsOnOpenList = false;
    this.IsWalkable = true;
    this.Id = t.GridId;
    this.Position = t.Position;
    this.Cost = t.Cost;
    this.H = 0;
    this.G = 0;
    this.F = 0;
    this.ParentNode = undefined;
    this.IsOnClosedList = false;
    this.IsOnOpenList = false;
    this.IsWalkable = t.Walkable ?? true;
  }
  nFc() {
    this.F = this.G + this.H;
  }
  SetG(t) {
    this.G = t;
    this.nFc();
  }
  SetH(t) {
    this.H = t;
    this.nFc();
  }
  SetValueToZero() {
    this.F = this.G = this.H = 0;
  }
}
exports.Node = Node;
class Grids {
  constructor(i) {
    this.Width = 0;
    this.Height = 0;
    this.GridNodes = [];
    this.Width = i.Width;
    this.Height = i.Height;
    this.GridNodes = [];
    let e = 0;
    for (let s = 0; s < this.Height; s++) {
      var r = [];
      for (let t = 0; t < this.Width; t++) {
        var h = i.Matrix[e];
        var h = new Node({
          GridId: e,
          Position: {
            X: t,
            Y: s
          },
          Cost: h.Cost,
          Walkable: h.Walkable
        });
        r.push(h);
        e++;
      }
      this.GridNodes.push(r);
    }
  }
  GetNodeAt(t) {
    return this.GridNodes[t.Y][t.X];
  }
  GetNodeByIndex(t) {
    var s = this.Width;
    var i = t % s;
    var t = Math.floor(t / s);
    return this.GridNodes[t][i];
  }
  IsWalkableAt(t) {
    return this.GridNodes[t.Y][t.X].IsWalkable;
  }
  sFc(t) {
    return t.X >= 0 && t.X < this.Width && t.Y >= 0 && t.Y < this.Height;
  }
  GetSurroundingNodes(t) {
    var s = [];
    for (const i of [{
      X: t.X,
      Y: t.Y + 1
    }, {
      X: t.X + 1,
      Y: t.Y
    }, {
      X: t.X,
      Y: t.Y - 1
    }, {
      X: t.X - 1,
      Y: t.Y
    }]) {
      if (this.sFc(i) && this.IsWalkableAt(i)) {
        s.push(this.GetNodeAt(i));
      }
    }
    return s;
  }
  ResetGrids() {
    for (const t of this.GridNodes) {
      for (const s of t) {
        s.IsOnClosedList = false;
        s.IsOnOpenList = false;
        s.ParentNode = undefined;
        s.SetValueToZero();
      }
    }
  }
}
function calculateHeuristic(t, s, i) {
  var e = Math.abs(i.X - s.X);
  var r = Math.abs(i.Y - s.Y);
  switch (t) {
    case 0:
      return e + r;
    case 1:
      return Math.sqrt(e * e + r * r);
    case 2:
      return Math.max(e, r);
    case 3:
      return e + r - Math.min(e, r) * 0.58;
  }
  return 0;
}
function backTrace(t, s, i) {
  var e = [];
  let r = i ? t : t.ParentNode;
  while (r.ParentNode) {
    e.push(r.Id);
    r = r.ParentNode;
  }
  if (s) {
    e.push(r.Id);
  }
  return e.reverse();
}
exports.Grids = Grids;
exports.calculateHeuristic = calculateHeuristic;
exports.backTrace = backTrace; //# sourceMappingURL=GridPathFinderDefine.js.map