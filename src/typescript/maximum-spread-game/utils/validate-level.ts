import { Graph } from '../../models/geometry/graph.interface';
import { IsolatedVertexLevelMaximumSpreadError } from '../models/errors/isolated-vertex-level-maximum-spread-error';
import { NonStrictlyStrightEdgeLevelMaximumSpreadError } from '../models/errors/non-strictly-stright-edge-level-maximum-spread-error';
import { WrongVertexIndexLevelMaximumSpreadError } from '../models/errors/wrong-vertex-index-level-maximum-spread-error';

export function validateLevel(level: Graph): void {
  const vertices = level.vertices;
  const verticesCount = vertices.length;
  const unusedVerticesSet = new Set(vertices.map((_, i) => i));

  level.edges.forEach((edge) => {
    if (edge[0] >= verticesCount) {
      wrongIndexError(edge[0]);
    }

    if (edge[1] >= verticesCount) {
      wrongIndexError(edge[1]);
    }

    const x0 = vertices[edge[0]].x;
    const x1 = vertices[edge[1]].x;
    const y0 = vertices[edge[0]].y;
    const y1 = vertices[edge[1]].y;
    if (x0 !== x1 && y0 !== y1) {
      throw new NonStrictlyStrightEdgeLevelMaximumSpreadError(
        `Pipe is not strictly stright. [(${x0}, ${y0}); (${x1}, ${y1})]`
      );
    }

    unusedVerticesSet.delete(edge[0]);
    unusedVerticesSet.delete(edge[1]);
  });

  const unusedVertices = Array.from(unusedVerticesSet);
  if (unusedVertices.length !== 0) {
    const str = unusedVertices
      .map((index) => vertices[index])
      .map(vertex => `(${vertex.x}, ${vertex.y})`)
      .join('; ');

    throw new IsolatedVertexLevelMaximumSpreadError(`Level has isolated vertices: [${str}]`);
  }
}

function wrongIndexError(index: number): void {
  throw new WrongVertexIndexLevelMaximumSpreadError(`No such vertex with index ${index}`);
}
