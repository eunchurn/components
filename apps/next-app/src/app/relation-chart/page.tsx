import React from 'react';
import { RelationChart} from '@/components';
import { ChartData } from '@/components/relation-chart/types';

const sampleData: ChartData = {
  nodes: [
    { id: "1", pcode: "001", pname: "Project A", url: "http://example.com/a" },
    { id: "2", pcode: "002", pname: "Project B", url: "http://example.com/b" },
    { id: "3", pcode: "003", pname: "Project C", url: "http://example.com/c" },
  ],
  links: [
    { source: "1", target: "2", count: 10, time_avg: 100 },
    { source: "2", target: "3", count: 5, time_avg: 50 },
    { source: "1", target: "3", count: 8, time_avg: 80 },
  ],
};

const RelationChartExample: React.FC = () => {
  return (
    <div>
      <h1>Relation Chart Example</h1>
      <RelationChart data={sampleData} width={800} height={600} />
    </div>
  );
};

export default RelationChartExample;