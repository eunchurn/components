import { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';

export interface Node extends SimulationNodeDatum {
  id: string;
  pcode: string;
  pname?: string;
  url: string;
}

export interface Link extends SimulationLinkDatum<Node> {
  source: string;
  target: string;
  count: number;
  time_avg: number;
}

export interface ChartData {
  nodes: Node[];
  links: Link[];
}