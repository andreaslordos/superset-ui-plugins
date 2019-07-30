/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* eslint-disable no-magic-numbers, react/forbid-prop-types */
import PropTypes from 'prop-types';
import D3Funnel from 'd3-funnel';
import d3 from 'd3';
import { CategoricalColorNamespace } from '@superset-ui/color';

const propTypes = {
  bottomPinch: PropTypes.number,
  colorScheme: PropTypes.string,
  curveEnabled: PropTypes.bool,
  curveHeight: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number,
    }),
  ).isRequired,
  dynamicHeight: PropTypes.bool,
  dynamicSlope: PropTypes.bool,
  fillType: PropTypes.string,
  fontSize: PropTypes.string,
  height: PropTypes.number.isRequired,
  highlight: PropTypes.bool,
  inverted: PropTypes.bool,
  labelFormat: PropTypes.string,
  minHeight: PropTypes.number,
  tooltipEnabled: PropTypes.bool,
  tooltipFormat: PropTypes.string,
  width: PropTypes.number.isRequired,
};

const defaultProps = {
  bottomPinch: 1,
  colorScheme: d3.schemeCategory10,
  curveEnabled: false,
  curveHeight: 0,
  dynamicHeight: true,
  dynamicSlope: true,
  fillType: 'gradient',
  fontSize: '13px',
  highlight: true,
  inverted: false,
  labelFormat: '{l}: {f}',
  minHeight: 0,
  tooltipEnabled: true,
  tooltipFormat: '{f}',
};

function CustomFunnel(element, props) {
  const {
    bottomPinch,
    colorScheme,
    curveEnabled,
    curveHeight,
    data,
    dynamicHeight,
    dynamicSlope,
    fillType,
    fontSize,
    height,
    highlight,
    inverted,
    labelFormat,
    minHeight,
    tooltipEnabled,
    tooltipFormat,
    width,
  } = props;

  const colorFn = CategoricalColorNamespace.getScale(colorScheme);

  const div = d3
    .select(element)
    .append('div')
    .attr('class', 'superset-legacy-chart-funnel')
    .append('div')
    .attr('id', 'funnel');

  const options = {
    block: {
      dynamicHeight,
      dynamicSlope,
      fill: {
        scale: colorFn,
        type: fillType,
      },
      highlight,
      minHeight,
    },
    chart: {
      bottomPinch,
      curve: {
        enabled: curveEnabled,
        height: curveHeight,
      },
      height,
      inverted,
      width,
    },
    label: {
      fontSize,
      format: labelFormat,
    },
    tooltip: {
      enabled: tooltipEnabled,
      format: tooltipFormat,
    },
  };

  const chart = new D3Funnel('#funnel');
  chart.draw(data, options);
}

CustomFunnel.displayName = 'funnel';
CustomFunnel.propTypes = propTypes;
CustomFunnel.defaultProps = defaultProps;

export default CustomFunnel;
