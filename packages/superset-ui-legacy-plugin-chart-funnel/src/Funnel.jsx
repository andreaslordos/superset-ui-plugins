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
import React from 'react';
import PropTypes from 'prop-types';
import { t } from '@superset-ui/translation';
import D3Funnel from 'd3-funnel';
import d3 from 'd3';
import { select as d3Select } from 'd3-selection';
import { CategoricalColorNamespace } from '@superset-ui/color';

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number,
    }),
  ).isRequired,
  bottom_pinch: PropTypes.number,
  dynamic_height: PropTypes.bool,
  dynamic_slope: PropTypes.bool,
  inverted: PropTypes.bool,
  fill_type: PropTypes.string,
  min_height: PropTypes.number,
  highlight: PropTypes.bool,
  font_size: PropTypes.string,
  curve_enabled: PropTypes.bool,
  curve_height: PropTypes.number,
  tooltip_enabled: PropTypes.bool,
  tooltip_format: PropTypes.string,
  label_format: PropTypes.string,
  color_scheme: PropTypes.string,
};

const defaultProps = {
  bottom_pinch: 1,
  dynamic_height: true,
  dynamic_slope: true,
  inverted: false,
  fill_type: 'gradient',
  min_height: 0,
  highlight: true,
  font_size: '13px',
  curve_enabled: false,
  curve_height: 0,
  tooltip_enabled: true,
  tooltip_format: '{f}',
  label_format: '{l}: {p}',
  color_scheme: d3.schemeCategory10,
};

function CustomFunnel(element, props) {
  function convertToPercentage(data, categoryIncluded) {
    var returnArr = [];
    var maxValue = data[0]['value']; //biggest value in funnel chart
    var labelBuilder;
    for (var i = 0; i < data.length; i++) {
      labelBuilder = '';
      if (categoryIncluded) {
        labelBuilder += data[i]['label'] + ', ';
      }
      labelBuilder += String(Math.round((data[i]['value'] / maxValue) * 100 * 10) / 10) + '%';
      returnArr.push({ label: labelBuilder, value: data[i]['value'] });
    }
    return returnArr;
  }

  /*
  function labelTransformer(format, data) {

    var categoryIncluded = false;
    var percentageIncluded = false;
    var valueIncluded = false;

    if (format.includes("l")){
      var categoryIncluded=true;
    }
    if (format.includes("p")){
      percentageIncluded=true;
    }
    if (format.includes("f")){
      valueIncluded=true;
    }

    var returnArr = [];
    var maxValue=data[0]['value']; //biggest value in funnel chart
    var labelBuilder;
    for (var i=0; i < data.length; i++){
      labelBuilder="";
      if (categoryIncluded) {
        labelBuilder+=data[i]['label']+': ';
      }
      if (percentageIncluded) {
        labelBuilder+=String(Math.round( (data[i]['value']/maxValue*100) * 10) / 10)+"%";
      }
      else if (valueIncluded) {
        labelBuilder+=String(data[i]['value'])
      }
      returnArr.push({label:labelBuilder,value:data[i]['value']});
    }
    return returnArr;
  }
  */

  console.log('props:', props);
  console.log('element:', element);
  var width = props.width;
  var height = props.height;
  var data = props.data;
  var bottom_pinch = props.bottom_pinch;
  var dynamic_height = props.dynamic_height;
  var dynamic_slope = props.dynamic_slope;
  var inverted = props.inverted;
  var fill_type = props.fill_type;
  var min_height = props.min_height;
  var highlight = props.highlight;
  var font_size = props.font_size;
  var curve_enabled = props.curve_enabled;
  var curve_height = props.curve_height;
  var label_format = props.label_format;
  var tooltip_enabled = props.tooltip_enabled;
  var tooltip_format = props.tooltip_format;
  var color_scheme = props.color_scheme;

  const colorFn = CategoricalColorNamespace.getScale(color_scheme);

  const div = d3
    .select(element)
    .append('div')
    .attr('class', 'superset-legacy-chart-funnel')
    .append('div')
    .attr('id', 'funnel');

  if (label_format == '{p}') {
    data = convertToPercentage(data, false);
    label_format = '{l}';
  } else if (label_format == '{l}: {p}') {
    data = convertToPercentage(data, true);
    label_format = '{l}';
  }

  /*
  if (tooltip_enabled){
    if (tooltip_format=='{p}'){
      data=convertToPercentage(data,false);
      tooltip_format='{l}'
    }
    else if (tooltip_format=='{l:p}') {
      data=convertToPercentage(data,true);
      tooltip_format='{l}'
    }
  }
  */

  var options = {
    chart: {
      width: width,
      height: height,
      bottomPinch: bottom_pinch,
      inverted: inverted,
      curve: {
        enabled: curve_enabled,
        height: curve_height,
      },
    },
    block: {
      dynamicHeight: dynamic_height,
      dynamicSlope: dynamic_slope,
      fill: {
        scale: colorFn,
        type: fill_type,
      },
      minHeight: min_height,
      highlight: highlight,
    },
    label: {
      format: label_format,
      fontSize: font_size,
    },
    tooltip: {
      enabled: tooltip_enabled,
      format: tooltip_format,
    },
  };

  var chart = new D3Funnel('#funnel');
  chart.draw(data, options);
  return '';
}

CustomFunnel.displayName = 'funnel';
CustomFunnel.propTypes = propTypes;
CustomFunnel.defaultProps = defaultProps;

export default CustomFunnel;
