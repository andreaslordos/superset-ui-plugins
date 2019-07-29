/* eslint-disable no-magic-numbers */
import React from 'react';
import { SuperChart } from '@superset-ui/chart';
import data from './data';

export default [
  {
    renderStory: () => (
      <SuperChart
        chartType="funnel"
        width={600}
        height={500}
        payload={{ data }}
        formData={{
          min_height: 5,
          font_size: '10px',
          tooltip_enabled: true,
        }}
      />
    ),
    storyName: 'Basic',
    storyPath: 'legacy-|plugin-chart-funnel|FunnelChartPlugin',
  },
];
